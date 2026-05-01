package admin

import (
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/nodeloc-faka/models"
	"github.com/nodeloc-faka/services"
)

// CouponAdminHandler 后台优惠券管理
type CouponAdminHandler struct {
	couponService *services.CouponService
}

// NewCouponAdminHandler 创建后台优惠券处理器
func NewCouponAdminHandler() *CouponAdminHandler {
	return &CouponAdminHandler{couponService: services.NewCouponService()}
}

// List 获取优惠券列表
func (h *CouponAdminHandler) List(c *gin.Context) {
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	pageSize, _ := strconv.Atoi(c.DefaultQuery("page_size", "20"))
	couponType := c.Query("type")
	shopID, _ := strconv.ParseUint(c.Query("shop_id"), 10, 32)

	list, total, err := h.couponService.GetAll(page, pageSize, couponType, uint(shopID))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": list, "total": total, "page": page, "page_size": pageSize})
}

// Create 创建优惠券
func (h *CouponAdminHandler) Create(c *gin.Context) {
	var req struct {
		Code          string     `json:"code" binding:"required"`
		Type          string     `json:"type" binding:"required"`
		ShopID        uint       `json:"shop_id"`
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
		Type:          req.Type,
		ShopID:        req.ShopID,
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

// Update 更新优惠券
func (h *CouponAdminHandler) Update(c *gin.Context) {
	id, _ := strconv.ParseUint(c.Param("id"), 10, 32)
	coupon, err := h.couponService.FindByID(uint(id))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "优惠券不存在"})
		return
	}

	var req struct {
		IsActive      *bool      `json:"is_active"`
		Description   string     `json:"description"`
		MaxUses       *int       `json:"max_uses"`
		MinAmount     *float64   `json:"min_amount"`
		ExpiresAt     *time.Time `json:"expires_at"`
	}
	c.ShouldBindJSON(&req)
	if req.IsActive != nil { coupon.IsActive = *req.IsActive }
	if req.Description != "" { coupon.Description = req.Description }
	if req.MaxUses != nil { coupon.MaxUses = *req.MaxUses }
	if req.MinAmount != nil { coupon.MinAmount = *req.MinAmount }
	coupon.ExpiresAt = req.ExpiresAt

	if err := h.couponService.Update(coupon); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "更新失败"})
		return
	}
	c.JSON(http.StatusOK, coupon)
}

// Delete 删除优惠券
func (h *CouponAdminHandler) Delete(c *gin.Context) {
	id, _ := strconv.ParseUint(c.Param("id"), 10, 32)
	h.couponService.Delete(uint(id))
	c.JSON(http.StatusOK, gin.H{"success": true})
}
