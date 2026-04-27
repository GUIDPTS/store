package models

import (
	"time"

	"gorm.io/gorm"
)

// Setting 系统设置
type Setting struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	Key       string    `gorm:"column:key;type:varchar(100);uniqueIndex" json:"key"`
	Value     string    `gorm:"type:text" json:"value"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

// TableName 指定表名
func (Setting) TableName() string {
	return "settings"
}

// BeforeCreate GORM hook - 在创建前执行
func (s *Setting) BeforeCreate(tx *gorm.DB) error {
	// GORM 会自动处理列名，这里不需要特殊处理
	return nil
}

// Admin 管理员
type Admin struct {
	ID           uint       `gorm:"primaryKey" json:"id"`
	Username     string     `gorm:"uniqueIndex;size:50" json:"username"`
	PasswordHash string     `gorm:"size:255" json:"-"`
	LastLoginAt  *time.Time `json:"last_login_at"`
	CreatedAt    time.Time  `json:"created_at"`
	UpdatedAt    time.Time  `json:"updated_at"`
}

// User 用户（通过OAuth登录）
type User struct {
	ID          uint       `gorm:"primaryKey" json:"id"`
	NodeLocID   int        `gorm:"uniqueIndex" json:"nodeloc_id"`
	Username    string     `gorm:"size:100" json:"username"`
	Name        string     `gorm:"size:100" json:"name"`
	Email       string     `gorm:"size:200" json:"email"`
	AvatarURL   string     `gorm:"size:500" json:"avatar_url"`
	TrustLevel  int        `json:"trust_level"`
	Balance     float64    `gorm:"default:0" json:"balance"`
	IsAdmin     bool       `gorm:"default:false;index" json:"is_admin"`
	IsBlocked   bool       `gorm:"default:false" json:"is_blocked"`
	LastLoginAt *time.Time `json:"last_login_at"`
	CreatedAt   time.Time  `json:"created_at"`
	UpdatedAt   time.Time  `json:"updated_at"`
	Orders      []Order    `gorm:"foreignKey:UserID" json:"orders,omitempty"`
}

// Category 商品分类
type Category struct {
	ID          uint      `gorm:"primaryKey" json:"id"`
	Name        string    `gorm:"size:100" json:"name"`
	Description string    `gorm:"type:text" json:"description"`
	Icon        string    `gorm:"size:50" json:"icon"`
	Sort        int       `gorm:"default:0" json:"sort"`
	IsActive    bool      `gorm:"default:true" json:"is_active"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
	Products    []Product `gorm:"foreignKey:CategoryID" json:"products,omitempty"`
}

// Product 商品
type Product struct {
	ID          uint      `gorm:"primaryKey" json:"id"`
	CategoryID  uint      `gorm:"index" json:"category_id"`
	Category    *Category `gorm:"foreignKey:CategoryID" json:"category,omitempty"`
	ShopID      uint      `gorm:"index;default:0" json:"shop_id"`
	Shop        *Shop     `gorm:"foreignKey:ShopID" json:"shop,omitempty"`
	Name        string    `gorm:"size:200" json:"name"`
	Description string    `gorm:"type:text" json:"description"`
	Price       float64   `json:"price"`
	OrigPrice   float64   `json:"orig_price"`
	Image       string    `gorm:"size:500" json:"image"`
	Images      string    `gorm:"type:varchar(2000)" json:"images"` // JSON array of image URLs
	StockCount  int       `gorm:"default:0" json:"stock_count"`
	SalesCount  int       `gorm:"default:0" json:"sales_count"`
	Sort        int       `gorm:"default:0" json:"sort"`
	IsActive    bool      `gorm:"default:true" json:"is_active"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
	CardKeys    []CardKey `gorm:"foreignKey:ProductID" json:"card_keys,omitempty"`
}

// CardKey 卡密
type CardKey struct {
	ID        uint       `gorm:"primaryKey" json:"id"`
	ProductID uint       `gorm:"index" json:"product_id"`
	Product   *Product   `gorm:"foreignKey:ProductID" json:"product,omitempty"`
	CardNo    string     `gorm:"size:500" json:"card_no"`
	CardPwd   string     `gorm:"size:500" json:"card_pwd"`
	Status    int        `gorm:"default:0" json:"status"` // 0: 未售出, 1: 已售出, 2: 已锁定
	OrderID   *uint      `gorm:"index" json:"order_id"`
	Order     *Order     `gorm:"foreignKey:OrderID" json:"order,omitempty"`
	SoldAt    *time.Time `json:"sold_at"`
	CreatedAt time.Time  `json:"created_at"`
	UpdatedAt time.Time  `json:"updated_at"`
}

// CardKeyStatus 卡密状态
const (
	CardKeyStatusAvailable = 0 // 可售
	CardKeyStatusSold      = 1 // 已售出
	CardKeyStatusLocked    = 2 // 已锁定
)

// Order 订单
type Order struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	OrderNo   string    `gorm:"uniqueIndex;size:50" json:"order_no"`
	UserID    uint      `gorm:"index" json:"user_id"`
	User      *User     `gorm:"foreignKey:UserID" json:"user,omitempty"`
	ProductID uint      `gorm:"index" json:"product_id"`
	Product   *Product  `gorm:"foreignKey:ProductID" json:"product,omitempty"`
	ShopID    uint      `gorm:"index;default:0" json:"shop_id"`
	Shop      *Shop     `gorm:"foreignKey:ShopID" json:"shop,omitempty"`
	Quantity  int       `json:"quantity"`
	TotalAmount float64 `json:"total_amount"`
	Status    int       `gorm:"default:0" json:"status"` // 0: 待支付, 1: 已支付, 2: 已完成, 3: 已取消
	PayMethod string    `gorm:"size:50" json:"pay_method"` // nodeloc / balance / free
	PaidAt    *time.Time `json:"paid_at"`
	Contact   string    `gorm:"size:200" json:"contact"`
	Remark    string    `gorm:"type:text" json:"remark"`
	
	// NodeLoc Payment 支付字段
	TransactionID  string     `gorm:"size:100;index" json:"transaction_id"`  // 支付交易ID
	PaymentURL     string     `gorm:"size:500" json:"payment_url"`           // 支付链接
	PlatformFee    int        `gorm:"default:0" json:"platform_fee"`         // 平台手续费
	MerchantPoints int        `gorm:"default:0" json:"merchant_points"`      // 商家实收积分
	ExpiredAt      *time.Time `json:"expired_at"`                            // 订单过期时间
	
	// 店主结算字段
	ShopSettled bool    `gorm:"default:false;index" json:"shop_settled"` // 是否已结算给店主
	ShopIncome  float64 `gorm:"default:0" json:"shop_income"`            // 店主实际所得（扣除平台抽成）
	
	CreatedAt time.Time  `json:"created_at"`
	UpdatedAt time.Time  `json:"updated_at"`
	CardKeys  []CardKey  `gorm:"foreignKey:OrderID" json:"card_keys,omitempty"`
}

// OrderStatus 订单状态
const (
	OrderStatusPending   = 0 // 待支付
	OrderStatusPaid      = 1 // 已支付
	OrderStatusCompleted = 2 // 已完成
	OrderStatusCancelled = 3 // 已取消
)

// 支付方式
const (
	PayMethodNodeLoc = "nodeloc" // NodeLoc Payment（积分）
	PayMethodBalance = "balance" // 站内余额支付
	PayMethodFree    = "free"    // 免费/未配置支付
)

// Shop 店铺
type Shop struct {
	ID          uint       `gorm:"primaryKey" json:"id"`
	UserID      uint       `gorm:"uniqueIndex" json:"user_id"`              // 店主用户ID（每个用户最多1个店铺）
	User        *User      `gorm:"foreignKey:UserID" json:"user,omitempty"`
	Name        string     `gorm:"size:100" json:"name"`
	Description string     `gorm:"type:text" json:"description"`
	Logo        string     `gorm:"size:500" json:"logo"`
	Contact     string     `gorm:"size:200" json:"contact"`
	Status      int        `gorm:"default:0;index" json:"status"` // 0: 待审核, 1: 已批准, 2: 已拒绝, 3: 已封禁
	IsOfficial  bool       `gorm:"default:false;index" json:"is_official"`  // 平台官方店
	RejectReason string    `gorm:"type:text" json:"reject_reason"`
	ReviewedAt  *time.Time `json:"reviewed_at"`
	CreatedAt   time.Time  `json:"created_at"`
	UpdatedAt   time.Time  `json:"updated_at"`
	Products    []Product  `gorm:"foreignKey:ShopID" json:"products,omitempty"`
}

// ShopStatus 店铺状态
const (
	ShopStatusPending  = 0 // 待审核
	ShopStatusApproved = 1 // 已批准
	ShopStatusRejected = 2 // 已拒绝
	ShopStatusBlocked  = 3 // 已封禁
)

// WithdrawalRequest 提现申请
type WithdrawalRequest struct {
	ID            uint       `gorm:"primaryKey" json:"id"`
	UserID        uint       `gorm:"index" json:"user_id"`
	User          *User      `gorm:"foreignKey:UserID" json:"user,omitempty"`
	ShopID        uint       `gorm:"index" json:"shop_id"`
	Shop          *Shop      `gorm:"foreignKey:ShopID" json:"shop,omitempty"`
	Amount        float64    `json:"amount"`         // 申请提现金额（毛）
	Fee           float64    `json:"fee"`            // 手续费
	ActualAmount  float64    `json:"actual_amount"`  // 实际到账（amount - fee）
	FeeRate       float64    `json:"fee_rate"`       // 申请时的手续费率（%）
	Status        int        `gorm:"default:0;index" json:"status"` // 0: 待审核, 1: 已批准/已打款, 2: 已拒绝, 3: 处理中
	RejectReason  string     `gorm:"type:text" json:"reject_reason"`
	TransferTxID  string     `gorm:"size:100" json:"transfer_tx_id"` // NodeLoc 转账交易ID
	Remark        string     `gorm:"type:text" json:"remark"`        // 用户备注
	ReviewedAt    *time.Time `json:"reviewed_at"`
	CreatedAt     time.Time  `json:"created_at"`
	UpdatedAt     time.Time  `json:"updated_at"`
}

// WithdrawalStatus 提现状态
const (
	WithdrawalStatusPending    = 0 // 待审核
	WithdrawalStatusCompleted  = 1 // 已完成（已打款）
	WithdrawalStatusRejected   = 2 // 已拒绝
	WithdrawalStatusProcessing = 3 // 处理中
)

// BalanceTx 余额流水
type BalanceTx struct {
	ID         uint      `gorm:"primaryKey" json:"id"`
	UserID     uint      `gorm:"index" json:"user_id"`
	Type       string    `gorm:"size:30;index" json:"type"`       // sale_income / withdrawal / withdrawal_refund / purchase / admin_adjust
	Amount     float64   `json:"amount"`                          // 正数=收入，负数=支出
	BalanceAfter float64 `json:"balance_after"`                   // 操作后余额
	RefType    string    `gorm:"size:30" json:"ref_type"`         // order / withdrawal
	RefID      uint      `gorm:"index" json:"ref_id"`
	Description string   `gorm:"size:255" json:"description"`
	CreatedAt  time.Time `json:"created_at"`
}

// 余额流水类型
const (
	BalanceTxSaleIncome        = "sale_income"        // 销售收入
	BalanceTxWithdrawal        = "withdrawal"         // 提现扣款
	BalanceTxWithdrawalRefund  = "withdrawal_refund"  // 提现拒绝退款
	BalanceTxPurchase          = "purchase"           // 余额支付商品
	BalanceTxAdminAdjust       = "admin_adjust"       // 后台调整
)

// ProductReview 商品评价
type ProductReview struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	ProductID uint      `gorm:"index" json:"product_id"`
	Product   *Product  `gorm:"foreignKey:ProductID" json:"product,omitempty"`
	UserID    uint      `gorm:"index" json:"user_id"`
	User      *User     `gorm:"foreignKey:UserID" json:"user,omitempty"`
	OrderID   uint      `gorm:"index" json:"order_id"`
	Rating    int       `gorm:"default:5" json:"rating"` // 1-5
	Title     string    `gorm:"size:200" json:"title"`
	Content   string    `gorm:"type:text" json:"content"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

// AutoMigrate 自动迁移数据库
func AutoMigrate(db *gorm.DB) error {
	return db.AutoMigrate(
		&Setting{},
		&Admin{},
		&User{},
		&Shop{},
		&Category{},
		&Product{},
		&CardKey{},
		&Order{},
		&WithdrawalRequest{},
		&BalanceTx{},
		&ProductReview{},
	)
}
