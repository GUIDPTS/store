package admin

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/nodeloc-faka/services"
)

// ShopAdminHandler 后台店铺/提现管理
type ShopAdminHandler struct {
	shopService       *services.ShopService
	withdrawalService *services.WithdrawalService
}

// NewShopAdminHandler 创建后台店铺管理处理器
func NewShopAdminHandler() *ShopAdminHandler {
	return &ShopAdminHandler{
		shopService:       services.NewShopService(),
		withdrawalService: services.NewWithdrawalService(),
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

// ============================== 店铺审核 ==============================

// ListShops 后台店铺列表，可按 status 过滤
func (h *ShopAdminHandler) ListShops(c *gin.Context) {
	page, pageSize := parsePage(c)
	status := -1
	if s := c.Query("status"); s != "" {
		if n, err := strconv.Atoi(s); err == nil {
			status = n
		}
	}
	shops, total, err := h.shopService.GetAll(page, pageSize, status)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": shops, "total": total, "page": page, "page_size": pageSize})
}

// ApproveShop 批准店铺
func (h *ShopAdminHandler) ApproveShop(c *gin.Context) {
	id, _ := strconv.ParseUint(c.Param("id"), 10, 32)
	if err := h.shopService.Approve(uint(id)); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true})
}

// RejectShop 拒绝店铺
func (h *ShopAdminHandler) RejectShop(c *gin.Context) {
	id, _ := strconv.ParseUint(c.Param("id"), 10, 32)
	var req struct {
		Reason string `json:"reason"`
	}
	c.ShouldBindJSON(&req)
	if err := h.shopService.Reject(uint(id), req.Reason); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true})
}

// UpdateShop 后台编辑店铺信息
func (h *ShopAdminHandler) UpdateShop(c *gin.Context) {
	id, _ := strconv.ParseUint(c.Param("id"), 10, 32)
	shop, err := h.shopService.FindByID(uint(id))
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
		c.JSON(http.StatusInternalServerError, gin.H{"error": "更新失败"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true, "shop": shop})
}

// BlockShop 封禁店铺
func (h *ShopAdminHandler) BlockShop(c *gin.Context) {
	id, _ := strconv.ParseUint(c.Param("id"), 10, 32)
	var req struct {
		Reason string `json:"reason"`
	}
	c.ShouldBindJSON(&req)
	if err := h.shopService.Block(uint(id), req.Reason); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true})
}

// ============================== 提现审核 ==============================

// ListWithdrawals 后台提现列表
func (h *ShopAdminHandler) ListWithdrawals(c *gin.Context) {
	page, pageSize := parsePage(c)
	status := -1
	if s := c.Query("status"); s != "" {
		if n, err := strconv.Atoi(s); err == nil {
			status = n
		}
	}
	list, total, err := h.withdrawalService.GetAll(page, pageSize, status)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": list, "total": total, "page": page, "page_size": pageSize})
}

// ApproveWithdrawal 批准提现
func (h *ShopAdminHandler) ApproveWithdrawal(c *gin.Context) {
	id, _ := strconv.ParseUint(c.Param("id"), 10, 32)
	var req struct {
		TxID string `json:"tx_id"`
	}
	c.ShouldBindJSON(&req)
	if err := h.withdrawalService.Approve(uint(id), req.TxID); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true})
}

// RejectWithdrawal 拒绝提现（自动退还余额）
func (h *ShopAdminHandler) RejectWithdrawal(c *gin.Context) {
	id, _ := strconv.ParseUint(c.Param("id"), 10, 32)
	var req struct {
		Reason string `json:"reason"`
	}
	c.ShouldBindJSON(&req)
	if err := h.withdrawalService.Reject(uint(id), req.Reason); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": true})
}
