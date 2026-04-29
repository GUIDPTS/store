package api

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/nodeloc-faka/services"
)

type BlogHandler struct {
	svc *services.BlogService
}

func NewBlogHandler() *BlogHandler {
	return &BlogHandler{svc: services.NewBlogService()}
}

func (h *BlogHandler) ListPosts(c *gin.Context) {
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	pageSize, _ := strconv.Atoi(c.DefaultQuery("page_size", "10"))
	if page < 1 { page = 1 }
	if pageSize < 1 || pageSize > 50 { pageSize = 10 }

	posts, total, err := h.svc.ListPublished(page, pageSize, c.Query("category"), c.Query("q"))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "获取文章失败"})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"posts": posts, "total": total,
		"page": page, "page_size": pageSize,
		"total_pages": (total + int64(pageSize) - 1) / int64(pageSize),
	})
}

func (h *BlogHandler) GetPost(c *gin.Context) {
	post, err := h.svc.GetBySlug(c.Param("slug"))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "文章不存在"})
		return
	}
	c.JSON(http.StatusOK, post)
}

func (h *BlogHandler) GetCategories(c *gin.Context) {
	cats, err := h.svc.GetCategories()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "获取分类失败"})
		return
	}
	c.JSON(http.StatusOK, cats)
}

func (h *BlogHandler) RecentPosts(c *gin.Context) {
	n, _ := strconv.Atoi(c.DefaultQuery("n", "5"))
	posts, err := h.svc.RecentPosts(n)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "获取最新文章失败"})
		return
	}
	c.JSON(http.StatusOK, posts)
}
