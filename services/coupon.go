package services

import (
	"fmt"
	"strings"
	"time"

	"github.com/nodeloc-faka/database"
	"github.com/nodeloc-faka/models"
)

// CouponService 优惠券服务
type CouponService struct{}

// NewCouponService 创建优惠券服务
func NewCouponService() *CouponService {
	return &CouponService{}
}

var (
	ErrCouponNotFound   = &ServiceError{Message: "优惠券不存在"}
	ErrCouponExpired    = &ServiceError{Message: "优惠券已过期"}
	ErrCouponDisabled   = &ServiceError{Message: "优惠券已停用"}
	ErrCouponUsedUp     = &ServiceError{Message: "优惠券已达使用上限"}
	ErrCouponMinAmount  = &ServiceError{Message: "订单金额未达到优惠券最低使用要求"}
	ErrCouponShopLimit  = &ServiceError{Message: "该优惠券仅限指定店铺使用"}
)

// ValidateResult 校验结果
type ValidateResult struct {
	Coupon      *models.Coupon
	Discount    float64 // 实际减免金额
	FinalAmount float64 // 最终金额
}

// Validate 校验优惠券（不消耗次数）
// shopID: 购物车中商品所属店铺（0=平台/多店铺混合）
// amount: 订单原始金额
func (s *CouponService) Validate(code string, shopID uint, amount float64) (*ValidateResult, error) {
	code = strings.TrimSpace(strings.ToUpper(code))
	if code == "" {
		return nil, ErrCouponNotFound
	}

	var coupon models.Coupon
	if err := database.GetDB().Where("code = ?", code).First(&coupon).Error; err != nil {
		return nil, ErrCouponNotFound
	}

	if !coupon.IsActive {
		return nil, ErrCouponDisabled
	}
	if coupon.ExpiresAt != nil && time.Now().After(*coupon.ExpiresAt) {
		return nil, ErrCouponExpired
	}
	if coupon.MaxUses > 0 && coupon.UsedCount >= coupon.MaxUses {
		return nil, ErrCouponUsedUp
	}
	if amount < coupon.MinAmount {
		return nil, &ServiceError{Message: fmt.Sprintf("订单金额需满 %.0f 能量才可使用此优惠券", coupon.MinAmount)}
	}

	// 店铺券：只能用于该店铺的商品
	if coupon.Type == "shop" && coupon.ShopID > 0 && shopID != coupon.ShopID {
		return nil, ErrCouponShopLimit
	}

	// 计算折扣
	var discount float64
	switch coupon.DiscountType {
	case "percent":
		discount = amount * coupon.DiscountValue / 100.0
	case "fixed":
		discount = coupon.DiscountValue
		if discount > amount {
			discount = amount
		}
	}
	discount = float64(int(discount*100+0.5)) / 100.0 // 保留两位

	return &ValidateResult{
		Coupon:      &coupon,
		Discount:    discount,
		FinalAmount: amount - discount,
	}, nil
}

// Use 使用优惠券（增加 used_count）
func (s *CouponService) Use(couponID uint) error {
	return database.GetDB().Model(&models.Coupon{}).
		Where("id = ?", couponID).
		UpdateColumn("used_count", database.GetDB().Raw("used_count + 1")).Error
}

// Create 创建优惠券
func (s *CouponService) Create(coupon *models.Coupon) error {
	coupon.Code = strings.ToUpper(strings.TrimSpace(coupon.Code))
	return database.GetDB().Create(coupon).Error
}

// Update 更新优惠券
func (s *CouponService) Update(coupon *models.Coupon) error {
	return database.GetDB().Save(coupon).Error
}

// Delete 删除优惠券
func (s *CouponService) Delete(id uint) error {
	return database.GetDB().Delete(&models.Coupon{}, id).Error
}

// GetAll 后台获取所有优惠券（分页）
func (s *CouponService) GetAll(page, pageSize int, couponType string, shopID uint) ([]models.Coupon, int64, error) {
	var list []models.Coupon
	var total int64
	db := database.GetDB().Model(&models.Coupon{})
	if couponType != "" {
		db = db.Where("type = ?", couponType)
	}
	if shopID > 0 {
		db = db.Where("shop_id = ?", shopID)
	}
	db.Count(&total)
	offset := (page - 1) * pageSize
	if err := db.Preload("Shop").Order("id desc").Offset(offset).Limit(pageSize).Find(&list).Error; err != nil {
		return nil, 0, err
	}
	return list, total, nil
}

// GetByShop 店主获取自己店铺的优惠券
func (s *CouponService) GetByShop(shopID uint, page, pageSize int) ([]models.Coupon, int64, error) {
	var list []models.Coupon
	var total int64
	db := database.GetDB().Model(&models.Coupon{}).Where("shop_id = ? AND type = ?", shopID, "shop")
	db.Count(&total)
	offset := (page - 1) * pageSize
	if err := db.Order("id desc").Offset(offset).Limit(pageSize).Find(&list).Error; err != nil {
		return nil, 0, err
	}
	return list, total, nil
}

// FindByID 根据ID查询
func (s *CouponService) FindByID(id uint) (*models.Coupon, error) {
	var coupon models.Coupon
	if err := database.GetDB().First(&coupon, id).Error; err != nil {
		return nil, ErrCouponNotFound
	}
	return &coupon, nil
}
