package api

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/nodeloc-faka/models"
	"github.com/nodeloc-faka/services"
)

// ShopHandler 店铺相关 API 处理器
type ShopHandler struct {
	shopService       *services.ShopService
	productService    *services.ProductService
	balanceService    *services.BalanceService
	withdrawalService *services.WithdrawalService
	settingService    *services.SettingService
}

// NewShopHandler 创建店铺处理器
func NewShopHandler() *ShopHandler {
	return &ShopHandler{
		shopService:       services.NewShopService(),
		productService:    services.NewProductService(),
		balanceService:    services.NewBalanceService(),
		withdrawalService: services.NewWithdrawalService(),
		settingService:    services.NewSettingService(),
	}
}

func parsePage(c *gin.Context) (int, int) {
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	if page < 1 {
		page = 1
	}
	pageSize, _ := strconv.Atoi(c.DefaultQuery("page_size", "20"))
	if pageSize < 1 || pageSize > 100 {
		pageSize = 20
	}
	return page, pageSize
}

func currentUser(c *gin.Context) (*models.User, bool) {
	v, ok := c.Get("user")
	if !ok || v == nil {
		return nil, false
	}
	u, ok := v.(*models.User)
	if !ok || u == nil {
		return nil, false
	}
	return u, true
}

// ============================== 公开接口 ==============================

// ListShops 公开店铺列表（仅已批准）
func (h *ShopHandler) ListShops(c *gin.Context) {
	page, pageSize := parsePage(c)
	shops, total, err := h.shopService.GetApproved(page, pageSize)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": shops, "total": total, "page": page, "page_size": pageSize})
}

// GetShop 获取店铺详情
func (h *ShopHandler) GetShop(c *gin.Context) {
	id := ParseUint(c.Param("id"))
	shop, err := h.shopService.FindByID(id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "店铺不存在"})
		return
	}
	if shop.Status != models.ShopStatusApproved {
		c.JSON(http.StatusNotFound, gin.H{"error": "店铺不存在"})
		return
	}
	c.JSON(http.StatusOK, shop)
}

// GetShopProducts 获取店铺的商品
func (h *ShopHandler) GetShopProducts(c *gin.Context) {
	id := ParseUint(c.Param("id"))
	shop, err := h.shopService.FindByID(id)
	if err != nil || shop.Status != models.ShopStatusApproved {
		c.JSON(http.StatusNotFound, gin.H{"error": "店铺不存在"})
		return
	}
	products, err := h.productService.GetByShop(id, true)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, products)
}

// ============================== 用户：开店申请 ==============================

// Apply 申请开店
func (h *ShopHandler) Apply(c *gin.Context) {
	u, ok := currentUser(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "请先登录"})
		return
	}
	if h.settingService.Get(services.SettingShopApplyEnabled) == "false" {
		c.JSON(http.StatusForbidden, gin.H{"error": "开店申请已关闭"})
		return
	}
	var req struct {
		Name        string `json:"name" binding:"required"`
		Description string `json:"description"`
		Logo        string `json:"logo"`
		Contact     string `json:"contact"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "参数错误"})
		return
	}
	shop := &models.Shop{
		UserID:      u.ID,
		Name:        req.Name,
		Description: req.Description,
		Logo:        req.Logo,
		Contact:     req.Contact,
	}
	if err := h.shopService.Apply(shop); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, shop)
}

// MyShop 我的店铺
func (h *ShopHandler) MyShop(c *gin.Context) {
	u, ok := currentUser(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "请先登录"})
		return
	}
	shop, err := h.shopService.GetByUser(u.ID)
	if err != nil {
		c.JSON(http.StatusOK, gin.H{"shop": nil})
		return
	}
	c.JSON(http.StatusOK, gin.H{"shop": shop})
}

// UpdateMyShop 更新我的店铺信息
func (h *ShopHandler) UpdateMyShop(c *gin.Context) {
	u, ok := currentUser(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "请先登录"})
		return
	}
	shop, err := h.shopService.GetByUser(u.ID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "店铺不存在"})
		return
	}
	var req struct {
		Name        string `json:"name"`
		Description string `json:"description"`
		Logo        string `json:"logo"`
		Contact     string `json:"contact"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "参数错误"})
		return
	}
	if req.Name != "" {
		shop.Name = req.Name
	}
	shop.Description = req.Description
	shop.Logo = req.Logo
	shop.Contact = req.Contact
	if err := h.shopService.Update(shop); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, shop)
}

// ============================== 余额 / 提现 ==============================

// Balance 我的余额 + 提现配置
func (h *ShopHandler) Balance(c *gin.Context) {
	u, ok := currentUser(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "请先登录"})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"balance":            u.Balance,
		"withdrawal_enabled": h.withdrawalService.IsEnabled(),
		"fee_rate":           h.withdrawalService.GetFeeRate(),
		"min_amount":         h.withdrawalService.GetMinAmount(),
	})
}

// BalanceTxs 余额流水
func (h *ShopHandler) BalanceTxs(c *gin.Context) {
	u, ok := currentUser(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "请先登录"})
		return
	}
	page, pageSize := parsePage(c)
	list, total, err := h.balanceService.GetUserTxs(u.ID, page, pageSize)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": list, "total": total, "page": page, "page_size": pageSize})
}

// ApplyWithdrawal 提现申请
func (h *ShopHandler) ApplyWithdrawal(c *gin.Context) {
	u, ok := currentUser(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "请先登录"})
		return
	}
	shop, err := h.shopService.GetByUser(u.ID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "请先开通店铺"})
		return
	}
	if shop.Status != models.ShopStatusApproved {
		c.JSON(http.StatusBadRequest, gin.H{"error": "店铺未通过审核"})
		return
	}
	var req struct {
		Amount float64 `json:"amount" binding:"required,gt=0"`
		Remark string  `json:"remark"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "参数错误"})
		return
	}
	wreq, err := h.withdrawalService.Apply(u.ID, shop.ID, req.Amount, req.Remark)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, wreq)
}

// MyWithdrawals 我的提现记录
func (h *ShopHandler) MyWithdrawals(c *gin.Context) {
	u, ok := currentUser(c)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "请先登录"})
		return
	}
	page, pageSize := parsePage(c)
	list, total, err := h.withdrawalService.GetByUser(u.ID, page, pageSize)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": list, "total": total, "page": page, "page_size": pageSize})
}

// ============================== 店主：商品/订单管理 ==============================

// MyShopProducts 店铺自己的商品（包括下架的）
func (h *ShopHandler) MyShopProducts(c *gin.Context) {
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
	products, err := h.productService.GetByShop(shop.ID, false)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, products)
}
