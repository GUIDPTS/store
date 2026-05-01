package api

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/nodeloc-faka/models"
	"github.com/nodeloc-faka/services"
)

// CouponHandler 优惠券处理器
type CouponHandler struct {
	couponService *services.CouponService
	shopService   *services.ShopService
}

// NewCouponHandler 创建优惠券处理器
func NewCouponHandler() *CouponHandler {
	return &CouponHandler{
		couponService: services.NewCouponService(),
		shopService:   services.NewShopService(),
	}
}

// ValidateCoupon 校验优惠券（公开，需登录）
func (h *CouponHandler) ValidateCoupon(c *gin.Context) {
	var req struct {
		Code    string  `json:"code" binding:"required"`
		ShopID  uint    `json:"shop_id"`
		Amount  float64 `json:"amount" binding:"required,gt=0"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "参数错误"})
		return
	}

	result, err := h.couponService.Validate(req.Code, req.ShopID, req.Amount)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"valid":        true,
		"coupon_id":    result.Coupon.ID,
		"code":         result.Coupon.Code,
		"discount":     result.Discount,
		"final_amount": result.FinalAmount,
		"description":  result.Coupon.Description,
	})
}

// ============================== 店主：管理自己的优惠券 ==============================

// MyShopCoupons 获取我的店铺优惠券列表
func (h *CouponHandler) MyShopCoupons(c *gin.Context) {
	u, ok := currentUser(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "请先登录"})
		return
	}
	shop, err := h.shopService.GetByUser(u.ID)
	if err != nil || shop.Status != models.ShopStatusApproved {
		c.JSON(http.StatusForbidden, gin.H{"error": "店铺未通过审核"})
		return
	}

	page, pageSize := parsePage(c)
	list, total, err := h.couponService.GetByShop(shop.ID, page, pageSize)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": list, "total": total})
}

// MyShopCreateCoupon 店主创建优惠券
func (h *CouponHandler) MyShopCreateCoupon(c *gin.Context) {
	u, ok := currentUser(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "请先登录"})
		return
	}
	shop, err := h.shopService.GetByUser(u.ID)
	if err != nil || shop.Status != models.ShopStatusApproved {
		c.JSON(http.StatusForbidden, gin.H{"error": "店铺未通过审核"})
		return
	}

	var req struct {
		Code          string     `json:"code" binding:"required"`
		DiscountType  string     `json:"discount_type" binding:"required"`
		DiscountValue float64    `json:"discount_value" binding:"required,gt=0"`
		MinAmount     float64    `json:"min_amount"`
		MaxUses       int        `json:"max_uses"`
		Description   string     `json:"description"`
		ExpiresAt     *time.Time `json:"expires_at"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "参数错误"})
		return
	}

	coupon := &models.Coupon{
		Code:          req.Code,
		Type:          "shop",
		ShopID:        shop.ID,
		DiscountType:  req.DiscountType,
		DiscountValue: req.DiscountValue,
		MinAmount:     req.MinAmount,
		MaxUses:       req.MaxUses,
		Description:   req.Description,
		ExpiresAt:     req.ExpiresAt,
		IsActive:      true,
	}
	if err := h.couponService.Create(coupon); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "创建失败，券码可能已存在"})
		return
	}
	c.JSON(http.StatusOK, coupon)
}

// MyShopUpdateCoupon 店主更新优惠券
func (h *CouponHandler) MyShopUpdateCoupon(c *gin.Context) {
	u, ok := currentUser(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "请先登录"})
		return
	}
	shop, err := h.shopService.GetByUser(u.ID)
	if err != nil || shop.Status != models.ShopStatusApproved {
		c.JSON(http.StatusForbidden, gin.H{"error": "店铺未通过审核"})
		return
	}

	id := ParseUint(c.Param("id"))
	coupon, err := h.couponService.FindByID(id)
	if err != nil || coupon.ShopID != shop.ID {
		c.JSON(http.StatusNotFound, gin.H{"error": "优惠券不存在"})
		return
	}

	var req struct {
		IsActive      *bool      `json:"is_active"`
		Description   string     `json:"description"`
		MaxUses       *int       `json:"max_uses"`
		ExpiresAt     *time.Time `json:"expires_at"`
	}
	c.ShouldBindJSON(&req)
	if req.IsActive != nil { coupon.IsActive = *req.IsActive }
	if req.Description != "" { coupon.Description = req.Description }
	if req.MaxUses != nil { coupon.MaxUses = *req.MaxUses }
	coupon.ExpiresAt = req.ExpiresAt

	if err := h.couponService.Update(coupon); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "更新失败"})
		return
	}
	c.JSON(http.StatusOK, coupon)
}

// MyShopDeleteCoupon 店主删除优惠券
func (h *CouponHandler) MyShopDeleteCoupon(c *gin.Context) {
	u, ok := currentUser(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "请先登录"})
		return
	}
	shop, err := h.shopService.GetByUser(u.ID)
	if err != nil || shop.Status != models.ShopStatusApproved {
		c.JSON(http.StatusForbidden, gin.H{"error": "店铺未通过审核"})
		return
	}

	id := ParseUint(c.Param("id"))
	coupon, err := h.couponService.FindByID(id)
	if err != nil || coupon.ShopID != shop.ID {
		c.JSON(http.StatusNotFound, gin.H{"error": "优惠券不存在"})
		return
	}
	h.couponService.Delete(id)
	c.JSON(http.StatusOK, gin.H{"success": true})
}
