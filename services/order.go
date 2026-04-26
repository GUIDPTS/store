package services

import (
	"fmt"
	"time"

	"github.com/nodeloc-faka/database"
	"github.com/nodeloc-faka/models"
	"gorm.io/gorm"
)

// OrderService 订单服务
type OrderService struct{}

// NewOrderService 创建订单服务
func NewOrderService() *OrderService {
	return &OrderService{}
}

// Create 创建订单
func (s *OrderService) Create(order *models.Order) error {
	// 生成订单号
	order.OrderNo = s.generateOrderNo()
	return database.GetDB().Create(order).Error
}

// generateOrderNo 生成订单号
func (s *OrderService) generateOrderNo() string {
	return fmt.Sprintf("%s%d", time.Now().Format("20060102150405"), time.Now().UnixNano()%10000)
}

// Update 更新订单
func (s *OrderService) Update(order *models.Order) error {
	return database.GetDB().Save(order).Error
}

// FindByID 根据ID查找订单
func (s *OrderService) FindByID(id uint) (*models.Order, error) {
	var order models.Order
	if err := database.GetDB().
		Preload("User").
		Preload("Product").
		Preload("CardKeys").
		First(&order, id).Error; err != nil {
		return nil, err
	}
	return &order, nil
}

// FindByOrderNo 根据订单号查找订单
func (s *OrderService) FindByOrderNo(orderNo string) (*models.Order, error) {
	var order models.Order
	if err := database.GetDB().
		Preload("User").
		Preload("Product").
		Preload("CardKeys").
		Where("order_no = ?", orderNo).
		First(&order).Error; err != nil {
		return nil, err
	}
	return &order, nil
}

// GetByUser 获取用户的订单
func (s *OrderService) GetByUser(userID uint) ([]models.Order, error) {
	var orders []models.Order
	if err := database.GetDB().
		Preload("Product").
		Preload("CardKeys").
		Where("user_id = ?", userID).
		Order("id desc").
		Find(&orders).Error; err != nil {
		return nil, err
	}
	return orders, nil
}

// GetAll 获取所有订单
func (s *OrderService) GetAll() ([]models.Order, error) {
	var orders []models.Order
	if err := database.GetDB().
		Preload("User").
		Preload("Product").
		Order("id desc").
		Find(&orders).Error; err != nil {
		return nil, err
	}
	return orders, nil
}

// GetWithPagination 分页获取订单
func (s *OrderService) GetWithPagination(page, pageSize int, status int) ([]models.Order, int64, error) {
	var orders []models.Order
	var total int64

	db := database.GetDB().Model(&models.Order{})
	if status >= 0 {
		db = db.Where("status = ?", status)
	}
	db.Count(&total)

	offset := (page - 1) * pageSize
	if err := db.Preload("User").
		Preload("Product").
		Order("id desc").
		Offset(offset).
		Limit(pageSize).
		Find(&orders).Error; err != nil {
		return nil, 0, err
	}

	return orders, total, nil
}

// MarkAsPaid 标记订单为已支付
func (s *OrderService) MarkAsPaid(id uint) error {
	now := time.Now()
	return database.GetDB().Model(&models.Order{}).
		Where("id = ?", id).
		Updates(map[string]interface{}{
			"status":  models.OrderStatusPaid,
			"paid_at": now,
		}).Error
}

// Complete 完成订单
func (s *OrderService) Complete(id uint) error {
	return database.GetDB().Model(&models.Order{}).
		Where("id = ?", id).
		Update("status", models.OrderStatusCompleted).Error
}

// Cancel 取消订单
func (s *OrderService) Cancel(id uint) error {
	return database.GetDB().Model(&models.Order{}).
		Where("id = ?", id).
		Update("status", models.OrderStatusCancelled).Error
}

// Count 获取订单数量
func (s *OrderService) Count() int64 {
	var count int64
	database.GetDB().Model(&models.Order{}).Count(&count)
	return count
}

// CountByStatus 根据状态获取订单数量
func (s *OrderService) CountByStatus(status int) int64 {
	var count int64
	database.GetDB().Model(&models.Order{}).Where("status = ?", status).Count(&count)
	return count
}

// GetTotalSales 获取总销售额
func (s *OrderService) GetTotalSales() float64 {
	var total float64
	database.GetDB().Model(&models.Order{}).
		Where("status IN ?", []int{models.OrderStatusPaid, models.OrderStatusCompleted}).
		Select("COALESCE(SUM(total_amount), 0)").
		Scan(&total)
	return total
}

// GetTodaySales 获取今日销售额
func (s *OrderService) GetTodaySales() float64 {
	var total float64
	today := time.Now().Format("2006-01-02")
	database.GetDB().Model(&models.Order{}).
		Where("status IN ? AND DATE(created_at) = ?", []int{models.OrderStatusPaid, models.OrderStatusCompleted}, today).
		Select("COALESCE(SUM(total_amount), 0)").
		Scan(&total)
	return total
}

// CreatePendingOrder 创建待支付订单
func (s *OrderService) CreatePendingOrder(userID, productID uint, quantity int, contact, remark string) (*models.Order, error) {
	// 获取商品信息
	productService := NewProductService()
	product, err := productService.FindByID(productID)
	if err != nil {
		return nil, ErrProductNotFound
	}

	// 检查库存
	cardKeyService := NewCardKeyService()
	count := cardKeyService.CountByProduct(productID, models.CardKeyStatusAvailable)
	if int(count) < quantity {
		return nil, ErrInsufficientStock
	}

	// 创建待支付订单
	expiredAt := time.Now().Add(30 * time.Minute) // 30分钟过期
	order := &models.Order{
		UserID:      userID,
		ProductID:   productID,
		ShopID:      product.ShopID,
		Quantity:    quantity,
		TotalAmount: product.Price * float64(quantity),
		Status:      models.OrderStatusPending,
		PayMethod:   models.PayMethodNodeLoc,
		Contact:     contact,
		Remark:      remark,
		ExpiredAt:   &expiredAt,
	}

	if err := s.Create(order); err != nil {
		return nil, err
	}

	return order, nil
}

// SetPaymentInfo 设置支付信息
func (s *OrderService) SetPaymentInfo(orderID uint, transactionID, paymentURL string) error {
	return database.GetDB().Model(&models.Order{}).
		Where("id = ?", orderID).
		Updates(map[string]interface{}{
			"transaction_id": transactionID,
			"payment_url":    paymentURL,
		}).Error
}

// FindByTransactionID 根据交易ID查找订单
func (s *OrderService) FindByTransactionID(transactionID string) (*models.Order, error) {
	var order models.Order
	if err := database.GetDB().
		Preload("User").
		Preload("Product").
		Preload("CardKeys").
		Where("transaction_id = ?", transactionID).
		First(&order).Error; err != nil {
		return nil, err
	}
	return &order, nil
}

// ProcessPaymentCallback 处理支付回调（NodeLoc 支付完成后调用）
func (s *OrderService) ProcessPaymentCallback(transactionID string, amount, platformFee, merchantPoints int) (*models.Order, error) {
	// 查找订单
	order, err := s.FindByTransactionID(transactionID)
	if err != nil {
		return nil, ErrOrderNotFound
	}

	// 检查订单状态（防止重复处理）
	if order.Status != models.OrderStatusPending {
		// 已处理过，直接返回
		return order, nil
	}

	// 验证金额（转换为积分比较）
	expectedAmount := int(order.TotalAmount)
	if amount != expectedAmount {
		return nil, ErrAmountMismatch
	}

	// 获取可用卡密
	cardKeyService := NewCardKeyService()
	availableCards, err := cardKeyService.GetAvailableByProduct(order.ProductID, order.Quantity)
	if err != nil {
		return nil, err
	}
	if len(availableCards) < order.Quantity {
		return nil, ErrInsufficientStock
	}

	// 完成订单（含店主结算）
	now := time.Now()
	order.Status = models.OrderStatusCompleted
	order.PaidAt = &now
	order.PlatformFee = platformFee
	order.MerchantPoints = merchantPoints
	if order.PayMethod == "" {
		order.PayMethod = models.PayMethodNodeLoc
	}

	if err := s.completeOrderTx(order, availableCards); err != nil {
		return nil, err
	}

	// 重新加载订单（包含卡密）
	return s.FindByID(order.ID)
}

// CreateAndProcess 创建并处理订单（免费模式，直接完成）
func (s *OrderService) CreateAndProcess(userID, productID uint, quantity int, contact, remark string) (*models.Order, error) {
	// 获取商品信息
	productService := NewProductService()
	product, err := productService.FindByID(productID)
	if err != nil {
		return nil, ErrProductNotFound
	}

	// 检查库存
	cardKeyService := NewCardKeyService()
	availableCards, err := cardKeyService.GetAvailableByProduct(productID, quantity)
	if err != nil {
		return nil, err
	}
	if len(availableCards) < quantity {
		return nil, ErrInsufficientStock
	}

	// 创建订单
	now := time.Now()
	order := &models.Order{
		UserID:      userID,
		ProductID:   productID,
		ShopID:      product.ShopID,
		Quantity:    quantity,
		TotalAmount: product.Price * float64(quantity),
		Status:      models.OrderStatusCompleted,
		PayMethod:   models.PayMethodFree,
		Contact:     contact,
		Remark:      remark,
		PaidAt:      &now,
	}

	if err := s.Create(order); err != nil {
		return nil, err
	}

	if err := s.completeOrderTx(order, availableCards); err != nil {
		return nil, err
	}

	return s.FindByID(order.ID)
}

// CreateAndProcessByBalance 使用买家余额支付下单（直接完成订单）
// 注：买家余额仅来自销售收入。这里在事务里扣买家余额、加店主余额、发卡。
func (s *OrderService) CreateAndProcessByBalance(userID, productID uint, quantity int, contact, remark string) (*models.Order, error) {
	productService := NewProductService()
	product, err := productService.FindByID(productID)
	if err != nil {
		return nil, ErrProductNotFound
	}

	cardKeyService := NewCardKeyService()
	availableCards, err := cardKeyService.GetAvailableByProduct(productID, quantity)
	if err != nil {
		return nil, err
	}
	if len(availableCards) < quantity {
		return nil, ErrInsufficientStock
	}

	totalAmount := product.Price * float64(quantity)
	balanceService := NewBalanceService()

	now := time.Now()
	order := &models.Order{
		UserID:      userID,
		ProductID:   productID,
		ShopID:      product.ShopID,
		Quantity:    quantity,
		TotalAmount: totalAmount,
		Status:      models.OrderStatusPending,
		PayMethod:   models.PayMethodBalance,
		Contact:     contact,
		Remark:      remark,
	}
	if err := s.Create(order); err != nil {
		return nil, err
	}

	// 在事务中：扣买家余额 → 完成订单（加店主余额 + 发卡）
	if err := database.GetDB().Transaction(func(tx *gorm.DB) error {
		if err := balanceService.DeductBalance(tx, userID, totalAmount,
			models.BalanceTxPurchase,
			fmt.Sprintf("余额支付订单 %s", order.OrderNo),
			"order", order.ID,
		); err != nil {
			return err
		}
		// 完成订单（在同事务中）
		order.Status = models.OrderStatusCompleted
		order.PaidAt = &now
		if err := s.completeOrderTxWithDB(tx, order, availableCards); err != nil {
			return err
		}
		return nil
	}); err != nil {
		// 失败：撤销订单
		s.Cancel(order.ID)
		return nil, err
	}

	return s.FindByID(order.ID)
}

// completeOrderTx 完成订单：开启事务 → 发卡 + 库存 + 销量 + 店主余额结算
func (s *OrderService) completeOrderTx(order *models.Order, availableCards []models.CardKey) error {
	return database.GetDB().Transaction(func(tx *gorm.DB) error {
		return s.completeOrderTxWithDB(tx, order, availableCards)
	})
}

// completeOrderTxWithDB 在指定事务中完成订单
func (s *OrderService) completeOrderTxWithDB(tx *gorm.DB, order *models.Order, availableCards []models.CardKey) error {
	productService := NewProductService()
	cardKeyService := NewCardKeyService()
	balanceService := NewBalanceService()

	// 保存订单
	if err := tx.Save(order).Error; err != nil {
		return err
	}

	// 分配卡密
	cardIDs := make([]uint, len(availableCards))
	for i, card := range availableCards {
		cardIDs[i] = card.ID
	}
	if err := cardKeyService.MarkAsSoldTx(tx, cardIDs, order.ID); err != nil {
		return err
	}

	// 更新商品库存和销量（直接 SQL，无需重新查询）
	if err := tx.Model(&models.Product{}).Where("id = ?", order.ProductID).
		UpdateColumn("sales_count", gorm.Expr("sales_count + ?", order.Quantity)).Error; err != nil {
		return err
	}
	// 重新计算库存
	productService.UpdateStock(order.ProductID)

	// 店主结算
	if order.ShopID > 0 {
		var shop models.Shop
		if err := tx.First(&shop, order.ShopID).Error; err != nil {
			return err
		}
		// 平台官方店或没有 user_id 的店铺不结算到余额
		if !shop.IsOfficial && shop.UserID > 0 {
			income := order.TotalAmount // 当前不抽成，后续若启用 commission，按比例
			if err := balanceService.AddBalance(tx, shop.UserID, income,
				models.BalanceTxSaleIncome,
				fmt.Sprintf("订单 %s 销售收入", order.OrderNo),
				"order", order.ID,
			); err != nil {
				return err
			}
			if err := tx.Model(&models.Order{}).Where("id = ?", order.ID).Updates(map[string]interface{}{
				"shop_settled": true,
				"shop_income":  income,
			}).Error; err != nil {
				return err
			}
		}
	}
	return nil
}

// CancelExpiredOrders 取消过期订单
func (s *OrderService) CancelExpiredOrders() (int64, error) {
	result := database.GetDB().Model(&models.Order{}).
		Where("status = ? AND expired_at < ?", models.OrderStatusPending, time.Now()).
		Update("status", models.OrderStatusCancelled)
	return result.RowsAffected, result.Error
}

// 错误定义
var (
	ErrProductNotFound   = &ServiceError{Message: "商品不存在"}
	ErrInsufficientStock = &ServiceError{Message: "库存不足"}
	ErrOrderNotFound     = &ServiceError{Message: "订单不存在"}
	ErrAmountMismatch    = &ServiceError{Message: "支付金额不匹配"}
	ErrOrderExpired      = &ServiceError{Message: "订单已过期"}
)
