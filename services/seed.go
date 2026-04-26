package services

import (
	"fmt"
	"log"
	"math/rand"
	"time"

	"github.com/nodeloc-faka/database"
	"github.com/nodeloc-faka/models"
)

// SeedDemoData 在数据库为空时插入演示用 mock 数据。
// 若 SettingDemoSeeded 已为 "true"，或检测到任意分类/商品/非官方店铺，则跳过。
const SettingDemoSeeded = "demo_seeded"

// SeedDemoData inserts demo categories, products, shops, and card-keys when the
// database has no real content. Idempotent: safe to call on every boot.
func SeedDemoData() {
	db := database.GetDB()
	if db == nil {
		return
	}
	settingService := NewSettingService()

	if settingService.Get(SettingDemoSeeded) == "true" {
		return
	}

	log.Println("正在插入演示数据 (mock)...")

	// 1) Categories
	catNames := []string{
		"游戏充值", "正版软件", "影音会员", "云服务", "游戏点卡",
		"账号代充", "虚拟卡密", "订阅服务", "学习教育", "工具效率",
	}
	icons := []string{"GameController", "Code", "FilmStrip", "Cloud", "Joystick",
		"User", "Key", "Bell", "GraduationCap", "Wrench"}
	categories := make([]models.Category, 0, len(catNames))
	for i, n := range catNames {
		c := models.Category{
			Name:        n,
			Description: n + " 相关商品",
			Icon:        icons[i],
			Sort:        i,
			IsActive:    true,
		}
		if err := db.Create(&c).Error; err != nil {
			log.Printf("⚠️  创建分类失败: %v", err)
			return
		}
		categories = append(categories, c)
	}

	// 2) Demo shops (non-official). 不绑定 user_id (保持 0 + 唯一索引允许？请通过递增伪 id 避免冲突)。
	// UserID 是 uniqueIndex，所以多个 shop 不能共用 0. 用递增的 9000+ 作为伪 user_id。
	shopNames := []string{"极速发卡店", "正品云商店", "老牌数码", "云上虚拟", "快充小铺", "会员超市"}
	now := time.Now()
	shops := make([]models.Shop, 0, len(shopNames))
	for i, n := range shopNames {
		sh := models.Shop{
			UserID:      uint(9000 + i),
			Name:        n,
			Description: n + " — 演示商家，提供海量虚拟商品",
			Status:      models.ShopStatusApproved,
			IsOfficial:  false,
			ReviewedAt:  &now,
		}
		if err := db.Create(&sh).Error; err != nil {
			log.Printf("⚠️  创建商家失败: %v", err)
			continue
		}
		shops = append(shops, sh)
	}

	// 3) Products: 6 per category, 总计 60. 随机价格/原价/销量/库存。
	productNames := []string{
		"腾讯视频会员 月卡", "爱奇艺黄金VIP 季卡", "Steam 钱包充值卡 ¥100",
		"Netflix 高级会员", "ChatGPT Plus 月卡", "Spotify Premium 个人版",
		"Adobe Creative Cloud 年卡", "Office 365 个人版", "JetBrains 全家桶",
		"Notion AI 月度订阅", "哔哩哔哩大会员", "云盘超级会员",
		"王者荣耀点券 100", "PlayStation Plus 季卡", "iCloud 50GB 月卡",
		"YouTube Premium 月卡",
	}
	rng := rand.New(rand.NewSource(time.Now().UnixNano()))

	createdProducts := 0
	for ci, cat := range categories {
		for pi := 0; pi < 6; pi++ {
			name := productNames[(ci*6+pi)%len(productNames)]
			price := float64(rng.Intn(90)+10) + 0.9
			origPrice := 0.0
			if rng.Float64() > 0.4 {
				origPrice = price + float64(rng.Intn(30)+10)
			}
			var shopID uint
			if len(shops) > 0 {
				shopID = shops[(ci*6+pi)%len(shops)].ID
			}
			p := models.Product{
				CategoryID:  cat.ID,
				ShopID:      shopID,
				Name:        name,
				Description: fmt.Sprintf("【演示商品】%s — 自动发货，售出后秒到。", name),
				Price:       price,
				OrigPrice:   origPrice,
				StockCount:  rng.Intn(500) + 50,
				SalesCount:  rng.Intn(1500) + 50,
				Sort:        pi,
				IsActive:    true,
			}
			if err := db.Create(&p).Error; err != nil {
				log.Printf("⚠️  创建商品失败: %v", err)
				continue
			}
			createdProducts++

			// 给每个商品准备 5 条卡密
			for k := 0; k < 5; k++ {
				ck := models.CardKey{
					ProductID: p.ID,
					CardNo:    fmt.Sprintf("DEMO-%d-%d-%04d", p.ID, k, rng.Intn(10000)),
					CardPwd:   fmt.Sprintf("PWD%06d", rng.Intn(1000000)),
					Status:    models.CardKeyStatusAvailable,
				}
				_ = db.Create(&ck).Error
			}
		}
	}

	settingService.Set(SettingDemoSeeded, "true")
	log.Printf("✓ 演示数据已插入: %d 分类, %d 商家, %d 商品", len(categories), len(shops), createdProducts)
}
