package services

import (
	"github.com/nodeloc-faka/database"
	"github.com/nodeloc-faka/models"
)

// SettingService 设置服务
type SettingService struct{}

// NewSettingService 创建设置服务
func NewSettingService() *SettingService {
	return &SettingService{}
}

// Get 获取设置值
func (s *SettingService) Get(key string) string {
	var setting models.Setting
	// 使用原生 SQL 查询，避免保留字问题
	result := database.GetDB().Raw("SELECT id, `key`, value, created_at, updated_at FROM settings WHERE `key` = ? LIMIT 1", key).Scan(&setting)
	if result.Error != nil || result.RowsAffected == 0 {
		return ""
	}
	return setting.Value
}

// Set 设置值
func (s *SettingService) Set(key, value string) error {
	var setting models.Setting
	// 先查询是否存在
	result := database.GetDB().Raw("SELECT id, `key`, value, created_at, updated_at FROM settings WHERE `key` = ? LIMIT 1", key).Scan(&setting)
	
	if result.Error != nil || result.RowsAffected == 0 {
		// 不存在，创建新的
		insertResult := database.GetDB().Exec("INSERT INTO settings (`key`, value, created_at, updated_at) VALUES (?, ?, NOW(), NOW())", key, value)
		return insertResult.Error
	}
	
	// 存在，更新
	updateResult := database.GetDB().Exec("UPDATE settings SET value = ?, updated_at = NOW() WHERE `key` = ?", value, key)
	return updateResult.Error
}

// GetAll 获取所有设置
func (s *SettingService) GetAll() map[string]string {
	var settings []models.Setting
	database.GetDB().Raw("SELECT id, `key`, value, created_at, updated_at FROM settings").Scan(&settings)
	
	result := make(map[string]string)
	for _, setting := range settings {
		result[setting.Key] = setting.Value
	}
	return result
}

// SetMultiple 批量设置
func (s *SettingService) SetMultiple(settings map[string]string) error {
	for key, value := range settings {
		if err := s.Set(key, value); err != nil {
			return err
		}
	}
	return nil
}

// 常用设置键
const (
	SettingSiteName        = "site_name"
	SettingSiteDescription = "site_description"
	SettingSiteLogo        = "site_logo"
	SettingSiteKeywords    = "site_keywords"
	SettingAdminPath       = "admin_path"
	SettingNodeLocClientID     = "nodeloc_client_id"
	SettingNodeLocClientSecret = "nodeloc_client_secret"
	SettingNodeLocRedirectURI  = "nodeloc_redirect_uri"
	SettingSessionSecret   = "session_secret"
	SettingContactEmail    = "contact_email"
	SettingContactQQ       = "contact_qq"
	SettingAnnouncement    = "announcement"
	SettingFooterText      = "footer_text"
	SettingInitialized     = "initialized"
	// 支付相关设置
	SettingPaymentID       = "payment_id"
	SettingPaymentSecret   = "payment_secret"
	SettingPaymentEnabled  = "payment_enabled"
	SettingPaymentCallback = "payment_callback"

	// 店铺/提现相关设置
	SettingOfficialShopID       = "official_shop_id"        // 平台官方店铺 ID
	SettingShopApplyEnabled     = "shop_apply_enabled"      // 是否开放申请开店（true/false）
	SettingPlatformCommission   = "platform_commission"     // 平台抽成比例（%），暂未启用，预留
	SettingWithdrawalEnabled    = "withdrawal_enabled"      // 是否允许提现
	SettingWithdrawalFeeRate    = "withdrawal_fee_rate"     // 提现手续费率（%），如 "2"
	SettingWithdrawalMinAmount  = "withdrawal_min_amount"   // 最低提现金额
	SettingWithdrawalAutoMode   = "withdrawal_auto_mode"    // 提现处理模式：auto / manual（默认 manual）
	SettingNodelocTransferAPI   = "nodeloc_transfer_api"    // NodeLoc 转账 API 地址（预留）

	// 首页配置
	SettingHomeBanners      = "home_banners"       // 首页主轮播（JSON 数组字符串）
	SettingHomePromoBanners = "home_promo_banners" // 首页促销横幅（JSON 数组字符串）
	SettingHomeFlashBanners = "home_flash_banners" // 首页闪购横幅（JSON 数组字符串）
	SettingHomeOfferCards   = "home_offer_cards"   // 首页特惠卡片（JSON 数组字符串，2张）
	SettingHomeBestsellCTA  = "home_bestsell_cta"  // 每日精选侧边 CTA（JSON 对象字符串）
	SettingHomeNewsletterImg = "home_newsletter_img" // 订阅区右侧图片 URL
)

// GetSiteSettings 获取网站设置
func (s *SettingService) GetSiteSettings() map[string]string {
	keys := []string{
		SettingSiteName,
		SettingSiteDescription,
		SettingSiteLogo,
		SettingSiteKeywords,
		SettingContactEmail,
		SettingContactQQ,
		SettingAnnouncement,
		SettingFooterText,
		SettingHomeBanners,
		SettingHomePromoBanners,
		SettingHomeFlashBanners,
		SettingHomeOfferCards,
		SettingHomeBestsellCTA,
		SettingHomeNewsletterImg,
	}
	
	result := make(map[string]string)
	for _, key := range keys {
		result[key] = s.Get(key)
	}
	return result
}
