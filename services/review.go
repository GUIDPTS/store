package services

import (
	"github.com/nodeloc-faka/database"
	"github.com/nodeloc-faka/models"
)

// ReviewService 评价服务
type ReviewService struct{}

// NewReviewService 创建评价服务
func NewReviewService() *ReviewService {
	return &ReviewService{}
}

// ReviewStats 评价统计
type ReviewStats struct {
	Total            int                `json:"total"`
	AvgRating        float64            `json:"avg_rating"`
	RatingDistribution map[int]int      `json:"rating_distribution"`
}

// ReviewResponse 评价列表响应
type ReviewResponse struct {
	Reviews []models.ProductReview `json:"reviews"`
	Stats   ReviewStats            `json:"stats"`
}

// GetByProduct 获取商品评价列表（含用户信息）
func (s *ReviewService) GetByProduct(productID uint) (ReviewResponse, error) {
	db := database.GetDB()

	var reviews []models.ProductReview
	if err := db.Preload("User").
		Where("product_id = ?", productID).
		Order("created_at DESC").
		Find(&reviews).Error; err != nil {
		return ReviewResponse{}, err
	}

	// 计算统计
	stats := ReviewStats{
		Total:              len(reviews),
		RatingDistribution: map[int]int{1: 0, 2: 0, 3: 0, 4: 0, 5: 0},
	}
	if len(reviews) > 0 {
		sum := 0
		for _, r := range reviews {
			sum += r.Rating
			if r.Rating >= 1 && r.Rating <= 5 {
				stats.RatingDistribution[r.Rating]++
			}
		}
		stats.AvgRating = float64(sum) / float64(len(reviews))
	}

	return ReviewResponse{Reviews: reviews, Stats: stats}, nil
}

// CanReview 检查用户是否有权评价（已完成订单）
func (s *ReviewService) CanReview(userID, productID uint) bool {
	db := database.GetDB()
	var count int64
	db.Model(&models.Order{}).
		Where("user_id = ? AND product_id = ? AND status = ?", userID, productID, models.OrderStatusCompleted).
		Count(&count)
	return count > 0
}

// HasReviewed 检查用户是否已评价
func (s *ReviewService) HasReviewed(userID, productID uint) bool {
	db := database.GetDB()
	var count int64
	db.Model(&models.ProductReview{}).
		Where("user_id = ? AND product_id = ?", userID, productID).
		Count(&count)
	return count > 0
}

// Create 创建评价
func (s *ReviewService) Create(review *models.ProductReview) error {
	db := database.GetDB()
	return db.Create(review).Error
}
