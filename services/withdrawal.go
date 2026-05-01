package services

import (
	"fmt"
	"os"
	"time"

	"github.com/nodeloc-faka/database"
	"github.com/nodeloc-faka/models"
	"github.com/nodeloc-faka/payment"
	"gorm.io/gorm"
)

// getAppConfig 辅助：从环境变量读取 payment 配置（fallback）
type appPaymentCfg struct {
	PaymentID     string
	PaymentSecret string
	NodeLocURL    string
}

func getAppConfig() *appPaymentCfg {
	return &appPaymentCfg{
		PaymentID:     os.Getenv("PAYMENT_ID"),
		PaymentSecret: os.Getenv("PAYMENT_SECRET"),
		NodeLocURL:    os.Getenv("NODELOC_URL"),
	}
}

// WithdrawalService 提现服务
type WithdrawalService struct {
	settingService *SettingService
	balanceService *BalanceService
}

// NewWithdrawalService 创建提现服务
func NewWithdrawalService() *WithdrawalService {
	return &WithdrawalService{
		settingService: NewSettingService(),
		balanceService: NewBalanceService(),
	}
}

var (
	ErrWithdrawalDisabled    = &ServiceError{Message: "提现功能未开放"}
	ErrWithdrawalAmountLow   = &ServiceError{Message: "提现金额低于最低限额"}
	ErrWithdrawalNotPending  = &ServiceError{Message: "该提现申请不在待审核状态"}
	ErrWithdrawalShopMissing = &ServiceError{Message: "请先开通店铺"}
)

// GetFeeRate 获取手续费率（百分比，例如 2 表示 2%）
func (s *WithdrawalService) GetFeeRate() float64 {
	return StringToFloat(s.settingService.Get(SettingWithdrawalFeeRate), 2.0)
}

// GetMinAmount 获取最低提现金额
func (s *WithdrawalService) GetMinAmount() float64 {
	return StringToFloat(s.settingService.Get(SettingWithdrawalMinAmount), 1.0)
}

// IsEnabled 提现是否开放
func (s *WithdrawalService) IsEnabled() bool {
	return s.settingService.Get(SettingWithdrawalEnabled) != "false"
}

// CalcFee 计算手续费
func (s *WithdrawalService) CalcFee(amount float64) (fee, actual, rate float64) {
	rate = s.GetFeeRate()
	fee = amount * rate / 100.0
	// 保留两位
	fee = float64(int(fee*100+0.5)) / 100.0
	actual = amount - fee
	return
}

// Apply 用户提交提现申请
func (s *WithdrawalService) Apply(userID, shopID uint, amount float64, remark string) (*models.WithdrawalRequest, error) {
	if !s.IsEnabled() {
		return nil, ErrWithdrawalDisabled
	}
	if amount < s.GetMinAmount() {
		return nil, ErrWithdrawalAmountLow
	}

	fee, actual, rate := s.CalcFee(amount)
	var req *models.WithdrawalRequest

	err := database.GetDB().Transaction(func(tx *gorm.DB) error {
		// 扣减用户余额（先冻结到提现单上）
		if err := s.balanceService.DeductBalance(tx, userID, amount,
			models.BalanceTxWithdrawal,
			fmt.Sprintf("提现申请 ¥%.2f（手续费 ¥%.2f）", amount, fee),
			"withdrawal", 0,
		); err != nil {
			return err
		}

		req = &models.WithdrawalRequest{
			UserID:       userID,
			ShopID:       shopID,
			Amount:       amount,
			Fee:          fee,
			ActualAmount: actual,
			FeeRate:      rate,
			Status:       models.WithdrawalStatusPending,
			Remark:       remark,
		}
		if err := tx.Create(req).Error; err != nil {
			return err
		}

		// 回填流水的 ref_id
		return tx.Model(&models.BalanceTx{}).
			Where("user_id = ? AND ref_type = ? AND ref_id = 0", userID, "withdrawal").
			Order("id desc").Limit(1).
			Update("ref_id", req.ID).Error
	})

	if err != nil {
		return nil, err
	}

	// 通知管理员有新提现申请
	NewEmailService().SendWithdrawalNotify(req)

	return req, nil
}

// Approve 管理员批准提现（标记完成 + 自动调用 NodeLoc Payment 转账）
func (s *WithdrawalService) Approve(id uint, transferTxID string) error {
	var req models.WithdrawalRequest
	if err := database.GetDB().Preload("User").First(&req, id).Error; err != nil {
		return err
	}
	if req.Status != models.WithdrawalStatusPending {
		return ErrWithdrawalNotPending
	}

	// 自动转账：使用 NodeLoc Payment Transfer API
	// payment_id / payment_secret 优先从 settings 读，fallback 到 AppConfig（环境变量）
	paymentID := s.settingService.Get(SettingPaymentID)
	paymentSecret := s.settingService.Get(SettingPaymentSecret)
	nodeLoc_URL := s.settingService.Get(SettingNodeLocURL)

	// fallback 到 AppConfig（环境变量）
	if paymentID == "" || paymentSecret == "" {
		cfg := getAppConfig()
		if cfg != nil {
			if paymentID == "" {
				paymentID = cfg.PaymentID
			}
			if paymentSecret == "" {
				paymentSecret = cfg.PaymentSecret
			}
			if nodeLoc_URL == "" {
				nodeLoc_URL = cfg.NodeLocURL
			}
		}
	}
	if nodeLoc_URL == "" {
		nodeLoc_URL = "https://www.nodeloc.com"
	}

	if paymentID != "" && paymentSecret != "" && req.User.ID > 0 {
		client := payment.NewClient(nodeLoc_URL, paymentID, paymentSecret)
		orderID := fmt.Sprintf("withdrawal_%d", req.ID)
		// ActualAmount 是扣除手续费后的到账金额（整数能量）
		amount := int(req.ActualAmount)
		if amount <= 0 {
			amount = int(req.Amount)
		}
		tr, err := client.Transfer(&payment.TransferRequest{
			ToUserID:   req.User.NodeLocID,
			ToUsername: req.User.Username,
			Amount:     amount,
			OrderID:    orderID,
		})
		if err != nil {
			return fmt.Errorf("NodeLoc 转账失败: %v", err)
		}
		if transferTxID == "" {
			transferTxID = tr.TransactionID
		}
	}

	now := time.Now()
	return database.GetDB().Model(&models.WithdrawalRequest{}).
		Where("id = ? AND status = ?", id, models.WithdrawalStatusPending).
		Updates(map[string]interface{}{
			"status":         models.WithdrawalStatusCompleted,
			"transfer_tx_id": transferTxID,
			"reviewed_at":    &now,
		}).Error
}

// Reject 管理员拒绝提现 → 把扣的余额退回去
func (s *WithdrawalService) Reject(id uint, reason string) error {
	return database.GetDB().Transaction(func(tx *gorm.DB) error {
		var req models.WithdrawalRequest
		if err := tx.First(&req, id).Error; err != nil {
			return err
		}
		if req.Status != models.WithdrawalStatusPending {
			return ErrWithdrawalNotPending
		}

		// 退回余额
		if err := s.balanceService.AddBalance(tx, req.UserID, req.Amount,
			models.BalanceTxWithdrawalRefund,
			fmt.Sprintf("提现 #%d 被拒绝，退回余额", req.ID),
			"withdrawal", req.ID,
		); err != nil {
			return err
		}

		now := time.Now()
		return tx.Model(&models.WithdrawalRequest{}).Where("id = ?", id).Updates(map[string]interface{}{
			"status":        models.WithdrawalStatusRejected,
			"reject_reason": reason,
			"reviewed_at":   &now,
		}).Error
	})
}

// FindByID 根据 ID 查询
func (s *WithdrawalService) FindByID(id uint) (*models.WithdrawalRequest, error) {
	var req models.WithdrawalRequest
	if err := database.GetDB().Preload("User").Preload("Shop").First(&req, id).Error; err != nil {
		return nil, err
	}
	return &req, nil
}

// GetByUser 用户的提现记录
func (s *WithdrawalService) GetByUser(userID uint, page, pageSize int) ([]models.WithdrawalRequest, int64, error) {
	var list []models.WithdrawalRequest
	var total int64
	db := database.GetDB().Model(&models.WithdrawalRequest{}).Where("user_id = ?", userID)
	db.Count(&total)
	offset := (page - 1) * pageSize
	if err := db.Order("id desc").Offset(offset).Limit(pageSize).Find(&list).Error; err != nil {
		return nil, 0, err
	}
	return list, total, nil
}

// GetAll 后台查询所有提现申请
func (s *WithdrawalService) GetAll(page, pageSize, status int) ([]models.WithdrawalRequest, int64, error) {
	var list []models.WithdrawalRequest
	var total int64
	db := database.GetDB().Model(&models.WithdrawalRequest{})
	if status >= 0 {
		db = db.Where("status = ?", status)
	}
	db.Count(&total)
	offset := (page - 1) * pageSize
	if err := db.Preload("User").Preload("Shop").
		Order("id desc").Offset(offset).Limit(pageSize).Find(&list).Error; err != nil {
		return nil, 0, err
	}
	return list, total, nil
}
