package services

import (
	"fmt"
	"regexp"
	"strings"
	"time"

	"github.com/nodeloc-faka/database"
	"github.com/nodeloc-faka/models"
)

type BlogService struct{}

func NewBlogService() *BlogService { return &BlogService{} }

// ── 公开查询 ──────────────────────────────────────────────────────────────

func (s *BlogService) ListPublished(page, pageSize int, category, keyword string) ([]models.BlogPost, int64, error) {
	var posts []models.BlogPost
	var total int64

	db := database.GetDB().Model(&models.BlogPost{}).Where("is_published = ?", true)
	if category != "" {
		db = db.Where("category = ?", category)
	}
	if keyword != "" {
		like := "%" + keyword + "%"
		db = db.Where("title LIKE ? OR excerpt LIKE ?", like, like)
	}
	db.Count(&total)

	offset := (page - 1) * pageSize
	if err := db.Order("published_at desc, id desc").Offset(offset).Limit(pageSize).Find(&posts).Error; err != nil {
		return nil, 0, err
	}
	return posts, total, nil
}

func (s *BlogService) GetBySlug(slug string) (*models.BlogPost, error) {
	var post models.BlogPost
	if err := database.GetDB().Where("slug = ? AND is_published = ?", slug, true).First(&post).Error; err != nil {
		return nil, err
	}
	// 增加浏览量
	database.GetDB().Model(&post).UpdateColumn("views", post.Views+1)
	return &post, nil
}

func (s *BlogService) GetCategories() ([]map[string]interface{}, error) {
	type row struct {
		Category string
		Count    int64
	}
	var rows []row
	if err := database.GetDB().Model(&models.BlogPost{}).
		Select("category, COUNT(*) as count").
		Where("is_published = ? AND category != ?", true, "").
		Group("category").
		Order("count desc").
		Scan(&rows).Error; err != nil {
		return nil, err
	}
	result := make([]map[string]interface{}, len(rows))
	for i, r := range rows {
		result[i] = map[string]interface{}{"name": r.Category, "count": r.Count}
	}
	return result, nil
}

func (s *BlogService) RecentPosts(n int) ([]models.BlogPost, error) {
	var posts []models.BlogPost
	if err := database.GetDB().Where("is_published = ?", true).
		Order("published_at desc, id desc").Limit(n).Find(&posts).Error; err != nil {
		return nil, err
	}
	return posts, nil
}

// ── 管理端 CRUD ──────────────────────────────────────────────────────────

func (s *BlogService) AdminList(page, pageSize int) ([]models.BlogPost, int64, error) {
	var posts []models.BlogPost
	var total int64
	database.GetDB().Model(&models.BlogPost{}).Count(&total)
	offset := (page - 1) * pageSize
	if err := database.GetDB().Order("id desc").Offset(offset).Limit(pageSize).Find(&posts).Error; err != nil {
		return nil, 0, err
	}
	return posts, total, nil
}

func (s *BlogService) FindByID(id uint) (*models.BlogPost, error) {
	var post models.BlogPost
	if err := database.GetDB().First(&post, id).Error; err != nil {
		return nil, err
	}
	return &post, nil
}

func (s *BlogService) Create(post *models.BlogPost) error {
	post.Slug = s.uniqueSlug(post.Title, 0)
	if post.IsPublished && post.PublishedAt == nil {
		now := time.Now()
		post.PublishedAt = &now
	}
	return database.GetDB().Create(post).Error
}

func (s *BlogService) Update(post *models.BlogPost) error {
	if post.IsPublished && post.PublishedAt == nil {
		now := time.Now()
		post.PublishedAt = &now
	}
	return database.GetDB().Save(post).Error
}

func (s *BlogService) Delete(id uint) error {
	return database.GetDB().Delete(&models.BlogPost{}, id).Error
}

// ── 内部工具 ──────────────────────────────────────────────────────────────

func (s *BlogService) uniqueSlug(title string, id uint) string {
	base := slugify(title)
	if base == "" {
		base = fmt.Sprintf("post-%d", time.Now().UnixMilli())
	}
	candidate := base
	for i := 1; ; i++ {
		var count int64
		q := database.GetDB().Model(&models.BlogPost{}).Where("slug = ?", candidate)
		if id > 0 {
			q = q.Where("id != ?", id)
		}
		q.Count(&count)
		if count == 0 {
			return candidate
		}
		candidate = fmt.Sprintf("%s-%d", base, i)
	}
}

var reNonAlnum = regexp.MustCompile(`[^a-z0-9]+`)

func slugify(s string) string {
	s = strings.ToLower(s)
	s = reNonAlnum.ReplaceAllString(s, "-")
	s = strings.Trim(s, "-")
	return s
}
