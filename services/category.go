package services

import (
	"github.com/nodeloc-faka/database"
	"github.com/nodeloc-faka/models"
	"gorm.io/gorm"
)

// CategoryService 分类服务
type CategoryService struct{}

// NewCategoryService 创建分类服务
func NewCategoryService() *CategoryService {
	return &CategoryService{}
}

// Create 创建分类
func (s *CategoryService) Create(category *models.Category) error {
	return database.GetDB().Create(category).Error
}

// Update 更新分类
func (s *CategoryService) Update(category *models.Category) error {
	return database.GetDB().Save(category).Error
}

// Delete 删除分类
func (s *CategoryService) Delete(id uint) error {
	// 检查是否有关联商品
	var count int64
	database.GetDB().Model(&models.Product{}).Where("category_id = ?", id).Count(&count)
	if count > 0 {
		return ErrCategoryHasProducts
	}
	return database.GetDB().Delete(&models.Category{}, id).Error
}

// FindByID 根据ID查找分类
func (s *CategoryService) FindByID(id uint) (*models.Category, error) {
	var category models.Category
	if err := database.GetDB().First(&category, id).Error; err != nil {
		return nil, err
	}
	return &category, nil
}

// GetAll 获取所有分类
func (s *CategoryService) GetAll() ([]models.Category, error) {
	var categories []models.Category
	if err := database.GetDB().Order("sort asc, id asc").Find(&categories).Error; err != nil {
		return nil, err
	}
	return categories, nil
}

// GetActive 获取启用的分类
func (s *CategoryService) GetActive() ([]models.Category, error) {
	var categories []models.Category
	if err := database.GetDB().Where("is_active = ?", true).Order("sort asc, id asc").Find(&categories).Error; err != nil {
		return nil, err
	}
	return categories, nil
}

// GetWithProducts 获取分类及其商品（仅来自已批准店铺的上架商品）
// ProductCount 字段统计所有上架商品（不限店铺状态），用于前端展示真实数量
func (s *CategoryService) GetWithProducts() ([]models.Category, error) {
	var categories []models.Category
	db := database.GetDB()
	if err := db.
		Preload("Products", func(tx *gorm.DB) *gorm.DB {
			return tx.
				Joins("JOIN shops ON shops.id = products.shop_id AND shops.status = ?", models.ShopStatusApproved).
				Where("products.is_active = ?", true).
				Preload("Shop")
		}).
		Where("is_active = ?", true).
		Order("sort asc, id asc").
		Find(&categories).Error; err != nil {
		return nil, err
	}

	// 批量查询各分类的实际上架商品总数（不过滤店铺状态）
	type countRow struct {
		CategoryID uint
		Total      int
	}
	var rows []countRow
	db.Model(&models.Product{}).
		Select("category_id, COUNT(*) as total").
		Where("is_active = ?", true).
		Group("category_id").
		Scan(&rows)

	countMap := make(map[uint]int, len(rows))
	for _, r := range rows {
		countMap[r.CategoryID] = r.Total
	}
	for i := range categories {
		categories[i].ProductCount = countMap[categories[i].ID]
	}

	return categories, nil
}

// Count 获取分类数量
func (s *CategoryService) Count() int64 {
	var count int64
	database.GetDB().Model(&models.Category{}).Count(&count)
	return count
}

// 错误定义
var ErrCategoryHasProducts = &ServiceError{Message: "该分类下有商品，无法删除"}
