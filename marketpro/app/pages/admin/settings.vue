<template>
  <div>
    <div class="page-title">系统设置</div>

    <el-card shadow="never" v-loading="loading">
      <el-tabs model-value="site">
        <!-- ── 站点信息 ── -->
        <el-tab-pane label="站点信息" name="site">
          <el-form :model="form" label-width="110px" style="max-width:580px;margin-top:12px">
            <el-form-item label="站点 Logo">
              <div class="d-flex align-items-center gap-16">
                <img v-if="form.site_logo" :src="form.site_logo" style="height:48px;max-width:160px;object-fit:contain;border:1px solid #eee;border-radius:6px;padding:4px" alt="logo" />
                <AdminImageUpload v-model="form.site_logo" />
              </div>
            </el-form-item>
            <el-form-item label="站点名称">
              <el-input v-model="form.site_name" />
            </el-form-item>
            <el-form-item label="站点描述">
              <el-input v-model="form.site_description" type="textarea" :rows="2" />
            </el-form-item>
            <el-form-item label="联系电话">
              <el-input v-model="form.contact_tel" placeholder="+00 123 456 789" />
            </el-form-item>
            <el-form-item label="电话提示文字">
              <el-input v-model="form.contact_tel_label" placeholder="如：需要帮助？联系我们" />
              <el-text type="info" size="small" style="margin-top:4px;display:block">显示在 header 电话号码上方，留空则显示默认文字</el-text>
            </el-form-item>
            <el-form-item label="联系邮箱">
              <el-input v-model="form.contact_email" placeholder="support@example.com" />
            </el-form-item>
            <el-form-item label="联系地址">
              <el-input v-model="form.contact_address" placeholder="789 Inner Lane, California, USA" />
            </el-form-item>
            <el-form-item label="页脚文字">
              <el-input v-model="form.footer_text" />
            </el-form-item>
            <el-form-item label="公告">
              <el-input v-model="form.announcement" type="textarea" :rows="3" />
            </el-form-item>
            <el-divider />
            <div class="section-label" style="margin-bottom:16px">商铺设置</div>
            <el-form-item label="允许开店申请">
              <el-switch v-model="form.shop_apply_enabled" />
              <el-text type="info" size="small" style="margin-left:12px">
                关闭后用户将无法提交开店申请
              </el-text>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <!-- ── 页脚配置 ── -->
        <el-tab-pane label="页脚配置" name="footer">
          <el-tabs tab-position="left" style="margin-top:12px">

            <!-- 基本信息 -->
            <el-tab-pane label="基本信息">
              <div class="section-label">页脚左侧简介（Logo 使用站点信息中的 Logo）</div>
              <el-form label-width="100px" style="max-width:560px;margin-top:12px">
                <el-form-item label="简介文字">
                  <el-input v-model="footerDesc" type="textarea" :rows="3"
                    placeholder="如：我们是一个专注于数字商品的平台" />
                </el-form-item>
                <el-form-item label="版权文字">
                  <el-input v-model="footerCopyright"
                    placeholder="Copyright &copy; {year} All Rights Reserved" />
                  <el-text type="info" size="small" style="margin-top:4px;display:block">
                    使用 {year} 自动替换为当前年份
                  </el-text>
                </el-form-item>
              </el-form>
            </el-tab-pane>

            <!-- 链接列 -->
            <el-tab-pane label="链接列">
              <div class="section-label">页脚链接列（最多 4 列）</div>
              <div v-for="(section, si) in footerSections" :key="si" class="item-card">
                <div class="item-header">
                  <el-input v-model="section.title" placeholder="列标题，如：关于我们" style="width:200px" />
                  <el-button type="danger" size="small" text @click="footerSections.splice(si, 1)">删除此列</el-button>
                </div>
                <div v-for="(link, li) in section.links" :key="li"
                  class="d-flex gap-8 align-items-center mb-8">
                  <el-input v-model="link.label" placeholder="链接文字" style="width:160px" />
                  <el-input v-model="link.url" placeholder="链接地址，如：/shop" style="flex:1" />
                  <el-button type="danger" size="small" text @click="section.links.splice(li, 1)">✕</el-button>
                </div>
                <el-button size="small" plain @click="addFooterLink(si)">
                  <i class="ph ph-plus me-4"></i> 添加链接
                </el-button>
              </div>
              <el-button
                v-if="footerSections.length < 4"
                type="primary" plain
                @click="addFooterSection"
              >
                <i class="ph ph-plus me-4"></i> 添加链接列
              </el-button>
            </el-tab-pane>

            <!-- 社交媒体 -->
            <el-tab-pane label="社交媒体">
              <div class="section-label">底部社交媒体图标</div>
              <div v-for="(s, si) in footerSocials" :key="si" class="item-card">
                <div class="item-header">
                  <span class="item-num">第 {{ si + 1 }} 项</span>
                  <el-button type="danger" size="small" text @click="footerSocials.splice(si, 1)">删除</el-button>
                </div>
                <el-form :model="s" label-width="80px">
                  <el-form-item label="图标">
                    <el-input v-model="s.icon" placeholder="如：ph-fill ph-facebook-logo" style="width:260px" />
                    <span v-if="s.icon" style="margin-left:12px;font-size:20px"><i :class="s.icon"></i></span>
                  </el-form-item>
                  <el-form-item label="链接"><el-input v-model="s.url" placeholder="https://..." /></el-form-item>
                  <el-form-item label="标签"><el-input v-model="s.label" placeholder="如：Facebook" /></el-form-item>
                </el-form>
              </div>
              <el-button type="primary" plain @click="addFooterSocial">
                <i class="ph ph-plus me-4"></i> 添加社交媒体
              </el-button>
            </el-tab-pane>

            <!-- App 下载 -->
            <el-tab-pane label="App 下载">
              <div class="section-label">页脚右侧 App 下载区域</div>
              <el-form :model="footerApp" label-width="110px" style="max-width:560px;margin-top:12px">
                <el-form-item label="标题">
                  <el-input v-model="footerApp.title" placeholder="如：Shop on The Go" />
                </el-form-item>
                <el-form-item label="副标题">
                  <el-input v-model="footerApp.subtitle" placeholder="如：App is available. Get it now" />
                </el-form-item>
                <el-form-item label="QR 码图片">
                  <AdminImageUpload v-model="footerApp.qr_code" />
                </el-form-item>
                <el-form-item label="App Store 链接">
                  <el-input v-model="footerApp.appstore_url" placeholder="https://www.apple.com/app-store" />
                  <el-text type="info" size="small" style="margin-top:4px;display:block">留空则不显示 App Store 按钮</el-text>
                </el-form-item>
                <el-form-item label="Google Play 链接">
                  <el-input v-model="footerApp.googleplay_url" placeholder="https://play.google.com" />
                  <el-text type="info" size="small" style="margin-top:4px;display:block">留空则不显示 Google Play 按钮</el-text>
                </el-form-item>
                <el-form-item label="支付方式图片">
                  <AdminImageUpload v-model="footerApp.payment_img" />
                </el-form-item>
              </el-form>
            </el-tab-pane>

          </el-tabs>
        </el-tab-pane>

        <!-- ── 特色功能 ── -->
        <el-tab-pane label="特色功能" name="features">
          <div class="section-label" style="margin:12px 0 16px">首页特色功能区（商品详情页下方横幅，最多 4 项）</div>
          <div v-for="(item, i) in featureItems" :key="i" class="item-card">
            <div class="item-header">
              <span class="item-num">第 {{ i + 1 }} 项</span>
              <el-button type="danger" size="small" text @click="featureItems.splice(i, 1)">删除</el-button>
            </div>
            <el-form :model="item" label-width="80px">
              <el-form-item label="图标">
                <el-input v-model="item.icon" placeholder="如：ph-fill ph-car-profile" style="width:260px" />
                <span v-if="item.icon" style="margin-left:12px;font-size:22px"><i :class="item.icon"></i></span>
                <el-text type="info" size="small" style="margin-left:8px">Phosphor 图标类名</el-text>
              </el-form-item>
              <el-form-item label="标题"><el-input v-model="item.title" placeholder="如：极速发货" /></el-form-item>
              <el-form-item label="描述"><el-input v-model="item.description" placeholder="如：付款后卡密自动发送" /></el-form-item>
            </el-form>
          </div>
          <el-button
            v-if="featureItems.length < 4"
            type="primary" plain
            @click="featureItems.push({ icon: 'ph-fill ph-seal-check', title: '', description: '' })"
          >
            <i class="ph ph-plus me-4"></i> 添加功能项
          </el-button>
          <div v-if="featureItems.length === 0" class="text-center py-20" style="color:#86909c;font-size:13px">
            暂未配置，将显示默认内容
          </div>
        </el-tab-pane>

        <!-- ── 首页内容 ── -->
        <el-tab-pane label="首页内容" name="home">
          <el-tabs tab-position="left" style="margin-top:12px">

            <!-- 主轮播 Banner -->
            <el-tab-pane label="主 Banner">
              <div class="section-label">主轮播横幅（Hero Section）</div>
              <div v-for="(item, i) in banners" :key="i" class="item-card">
                <div class="item-header">
                  <span class="item-num">第 {{ i + 1 }} 项</span>
                  <el-button type="danger" size="small" text @click="banners.splice(i, 1)">删除</el-button>
                </div>
                <el-form :model="item" label-width="90px">
                  <el-form-item label="副标题"><el-input v-model="item.subtitle" /></el-form-item>
                  <el-form-item label="主标题"><el-input v-model="item.title" /></el-form-item>
                  <el-form-item label="按钮文字"><el-input v-model="item.btn_text" /></el-form-item>
                  <el-form-item label="按钮链接"><el-input v-model="item.btn_link" /></el-form-item>
                  <el-form-item label="图片">
                    <AdminImageUpload v-model="item.image" />
                  </el-form-item>
                </el-form>
              </div>
              <el-button type="primary" plain @click="banners.push({ subtitle: '', title: '', btn_text: '立即选购', btn_link: '/shop', image: '' })">
                <i class="ph ph-plus me-4"></i> 添加横幅
              </el-button>
            </el-tab-pane>

            <!-- 促销横幅 -->
            <el-tab-pane label="促销横幅">
              <div class="section-label">促销横幅（Promotional Banner，建议 4 项）</div>
              <div v-for="(item, i) in promoBanners" :key="i" class="item-card">
                <div class="item-header">
                  <span class="item-num">第 {{ i + 1 }} 项</span>
                  <el-button type="danger" size="small" text @click="promoBanners.splice(i, 1)">删除</el-button>
                </div>
                <el-form :model="item" label-width="90px">
                  <el-form-item label="标题"><el-input v-model="item.title" /></el-form-item>
                  <el-form-item label="按钮文字"><el-input v-model="item.btn_text" /></el-form-item>
                  <el-form-item label="按钮链接"><el-input v-model="item.btn_link" /></el-form-item>
                  <el-form-item label="背景图片"><AdminImageUpload v-model="item.image" /></el-form-item>
                </el-form>
              </div>
              <el-button type="primary" plain @click="promoBanners.push({ title: '', btn_text: '立即选购', btn_link: '/shop', image: '' })">
                <i class="ph ph-plus me-4"></i> 添加横幅
              </el-button>
            </el-tab-pane>

            <!-- Flash 横幅 -->
            <el-tab-pane label="Flash 横幅">
              <div class="section-label">Flash 促销横幅（Flash Overview，建议 2 项）</div>
              <div v-for="(item, i) in flashBanners" :key="i" class="item-card">
                <div class="item-header">
                  <span class="item-num">第 {{ i + 1 }} 项</span>
                  <el-button type="danger" size="small" text @click="flashBanners.splice(i, 1)">删除</el-button>
                </div>
                <el-form :model="item" label-width="90px">
                  <el-form-item label="标题"><el-input v-model="item.title" /></el-form-item>
                  <el-form-item label="副标题"><el-input v-model="item.subtitle" /></el-form-item>
                  <el-form-item label="按钮文字"><el-input v-model="item.btn_text" /></el-form-item>
                  <el-form-item label="按钮链接"><el-input v-model="item.btn_link" /></el-form-item>
                  <el-form-item label="背景图片"><AdminImageUpload v-model="item.bg_image" /></el-form-item>
                </el-form>
              </div>
              <el-button type="primary" plain @click="flashBanners.push({ title: '', subtitle: '', btn_text: '立即查看', btn_link: '/shop', bg_image: '' })">
                <i class="ph ph-plus me-4"></i> 添加
              </el-button>
            </el-tab-pane>

            <!-- 特惠卡片 -->
            <el-tab-pane label="特惠卡片">
              <div class="section-label">首页特惠卡片（Offer Section，建议 2 项）</div>
              <div v-for="(item, i) in offerCards" :key="i" class="item-card">
                <div class="item-header">
                  <span class="item-num">第 {{ i + 1 }} 项</span>
                  <el-button type="danger" size="small" text @click="offerCards.splice(i, 1)">删除</el-button>
                </div>
                <el-form :model="item" label-width="90px">
                  <el-form-item label="标题"><el-input v-model="item.title" /></el-form-item>
                  <el-form-item label="标签1"><el-input v-model="item.tag1" /></el-form-item>
                  <el-form-item label="标签2"><el-input v-model="item.tag2" /></el-form-item>
                  <el-form-item label="按钮文字"><el-input v-model="item.btn_text" /></el-form-item>
                  <el-form-item label="按钮链接"><el-input v-model="item.btn_link" /></el-form-item>
                  <el-form-item label="背景图片"><AdminImageUpload v-model="item.bg_image" /></el-form-item>
                  <el-form-item label="Logo 图片"><AdminImageUpload v-model="item.logo" /></el-form-item>
                </el-form>
              </div>
              <el-button type="primary" plain @click="offerCards.push({ title: '', tag1: '', tag2: '', btn_text: '立即选购', btn_link: '/shop', bg_image: '', logo: '' })">
                <i class="ph ph-plus me-4"></i> 添加
              </el-button>
            </el-tab-pane>

            <!-- Hot Deals 横幅 -->
            <el-tab-pane label="Hot Deals 横幅">
              <div class="section-label">首页 Hot Deals Today 左侧横幅内容</div>
              <el-form :model="hotDealForm" label-width="110px" style="max-width:560px;margin-top:12px">
                <el-form-item label="标签文字">
                  <el-input v-model="hotDealForm.tag" placeholder="如：限时特惠" />
                </el-form-item>
                <el-form-item label="标题">
                  <el-input v-model="hotDealForm.title" placeholder="如：今日特惠" />
                </el-form-item>
                <el-form-item label="副标题">
                  <el-input v-model="hotDealForm.subtitle" placeholder="如：首单立减50%" />
                </el-form-item>
                <el-form-item label="按钮文字">
                  <el-input v-model="hotDealForm.btn_text" placeholder="如：立即选购" />
                </el-form-item>
                <el-form-item label="按钮链接">
                  <el-input v-model="hotDealForm.btn_link" placeholder="/shop" />
                </el-form-item>
                <el-form-item label="倒计时结束">
                  <el-date-picker
                    v-model="hotDealForm.countdown"
                    type="datetime"
                    placeholder="选择倒计时结束时间"
                    format="YYYY-MM-DD HH:mm"
                    value-format="YYYY-MM-DDTHH:mm:ssZ"
                    style="width:100%"
                  />
                </el-form-item>
              </el-form>
            </el-tab-pane>

            <!-- 本周精选 -->
            <el-tab-pane label="本周精选">              <div class="section-label">Deals of the Week — 首页精选商品展示</div>
              <el-form label-width="110px" style="max-width:560px;margin-top:12px">
                <el-form-item label="精选商品 ID">
                  <el-input
                    v-model="form.deals_of_week_product_id"
                    placeholder="输入商品 ID（留空则不显示）"
                    clearable
                    style="width:200px"
                    @change="loadDealsProduct"
                  />
                  <el-button style="margin-left:8px" @click="loadDealsProduct">查询</el-button>
                </el-form-item>
                <el-form-item v-if="dealsProduct" label=" ">
                  <div style="display:flex;align-items:center;gap:12px;padding:12px;background:#f7f8fa;border-radius:8px">
                    <img v-if="dealsProduct.image" :src="dealsProduct.image"
                      style="width:56px;height:56px;border-radius:8px;object-fit:contain;border:1px solid #eee" />
                    <div>
                      <div style="font-weight:600">{{ dealsProduct.name }}</div>
                      <div style="font-size:12px;color:#86909c;margin-top:2px">
                        价格：{{ dealsProduct.price }} 能量
                        <span v-if="dealsProduct.stock_count !== undefined">· 库存：{{ dealsProduct.stock_count }}</span>
                      </div>
                    </div>
                  </div>
                </el-form-item>
                <el-form-item v-if="form.deals_of_week_product_id && !dealsProduct" label=" ">
                  <el-text type="danger" size="small">未找到该商品，请确认 ID 是否正确</el-text>
                </el-form-item>
                <el-form-item label=" ">
                  <el-text type="info" size="small">
                    设置后，首页"最新/热销/特价商品"区域的第四个卡片将展示该商品。
                  </el-text>
                </el-form-item>
              </el-form>
            </el-tab-pane>

            <!-- 每日精选 CTA -->
            <el-tab-pane label="每日精选 CTA">
              <div class="section-label">每日精选侧边栏 CTA（Best Sells 右侧）</div>
              <el-form :model="bestsellCTA" label-width="90px" style="max-width:500px">
                <el-form-item label="标题"><el-input v-model="bestsellCTA.title" /></el-form-item>
                <el-form-item label="标签1"><el-input v-model="bestsellCTA.tag1" /></el-form-item>
                <el-form-item label="标签2"><el-input v-model="bestsellCTA.tag2" /></el-form-item>
                <el-form-item label="按钮文字"><el-input v-model="bestsellCTA.btn_text" /></el-form-item>
                <el-form-item label="按钮链接"><el-input v-model="bestsellCTA.btn_link" /></el-form-item>
                <el-form-item label="背景图片"><AdminImageUpload v-model="bestsellCTA.bg_image" /></el-form-item>
                <el-form-item label="Logo 图片"><AdminImageUpload v-model="bestsellCTA.logo" /></el-form-item>
              </el-form>
            </el-tab-pane>

            <!-- Newsletter -->
            <el-tab-pane label="订阅区">
              <div class="section-label">订阅区图片（Newsletter 右侧）</div>
              <el-form label-width="90px" style="max-width:500px;margin-top:12px">
                <el-form-item label="图片">
                  <AdminImageUpload v-model="form.home_newsletter_img" />
                </el-form-item>
              </el-form>
            </el-tab-pane>

          </el-tabs>
        </el-tab-pane>
      </el-tabs>

      <el-divider />
      <el-button type="primary" :loading="saving" @click="saveSettings">保存设置</el-button>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";

definePageMeta({ layout: "admin" });

const { get, put } = useApi();
const loading = ref(true);
const saving = ref(false);

const form = ref({
  site_logo: "", site_name: "", site_description: "",
  contact_tel: "", contact_tel_label: "", contact_email: "", contact_address: "",
  footer_text: "", announcement: "",
  home_newsletter_img: "",
  deals_of_week_product_id: "",
  shop_apply_enabled: true,
  footer_config: "",
});

// 本周精选商品预览
const dealsProduct = ref<any>(null);

// 页脚配置
type FooterLink = { label: string; url: string }
type FooterSection = { title: string; links: FooterLink[] }
type FooterSocial = { icon: string; url: string; label: string }
const footerDesc = ref("")
const footerCopyright = ref("Copyright &copy; {year} All Rights Reserved")
const footerSections = ref<FooterSection[]>([])
const footerSocials = ref<FooterSocial[]>([
  { icon: "ph-fill ph-facebook-logo",  url: "https://www.facebook.com",  label: "Facebook" },
  { icon: "ph-fill ph-twitter-logo",   url: "https://www.twitter.com",   label: "Twitter" },
  { icon: "ph-fill ph-linkedin-logo",  url: "https://www.linkedin.com",  label: "LinkedIn" },
  { icon: "ph-fill ph-pinterest-logo", url: "https://www.pinterest.com", label: "Pinterest" },
])
const footerApp = ref({
  title: "Shop on The Go",
  subtitle: "MarketPro App is available. Get it now",
  qr_code: "/images/thumbs/qr-code.png",
  appstore_url: "https://www.apple.com/app-store",
  googleplay_url: "https://play.google.com",
  payment_img: "/images/thumbs/method.png",
})

function addFooterSection() {
  footerSections.value.push({ title: "", links: [] })
}
function addFooterLink(si: number) {
  footerSections.value[si].links.push({ label: "", url: "" })
}
function addFooterSocial() {
  footerSocials.value.push({ icon: "ph-fill ph-globe", url: "", label: "" })
}async function loadDealsProduct() {
  const id = form.value.deals_of_week_product_id?.trim();
  if (!id) { dealsProduct.value = null; return; }
  try {
    const res = await get<any>(`/api/products/${id}`);
    dealsProduct.value = res || null;
  } catch { dealsProduct.value = null; }
}

type Banner = { subtitle: string; title: string; btn_text: string; btn_link: string; image: string };
type PromoBanner = { title: string; btn_text: string; btn_link: string; image: string };
type FlashBanner = { title: string; subtitle: string; btn_text: string; btn_link: string; bg_image: string };
type OfferCard = { title: string; tag1: string; tag2: string; btn_text: string; btn_link: string; bg_image: string; logo: string };
type BestsellCTA = { title: string; tag1: string; tag2: string; btn_text: string; btn_link: string; bg_image: string; logo: string };

const banners = ref<Banner[]>([]);
const promoBanners = ref<PromoBanner[]>([]);
const flashBanners = ref<FlashBanner[]>([]);
const offerCards = ref<OfferCard[]>([]);
const bestsellCTA = ref<BestsellCTA>({ title: "", tag1: "", tag2: "", btn_text: "", btn_link: "", bg_image: "", logo: "" });
const featureItems = ref<{ icon: string; title: string; description: string }[]>([]);

// Hot Deals 横幅配置
const hotDealForm = ref({
  tag: "Medical equipment",
  title: "Deals of the day",
  subtitle: "Save up to 50% off on your first order",
  btn_text: "Explore Shop",
  btn_link: "/shop",
  countdown: "2027-12-30T23:59:59",
});

function safeParse<T>(val: unknown, fallback: T): T {
  if (!val || typeof val !== "string") return fallback;
  try { return JSON.parse(val) as T; } catch { return fallback; }
}

onMounted(async () => {
  try {
    const res = await get<{ settings: Record<string, string> }>("/api/admin/settings");
    const s = res.settings;
    form.value.site_logo = s.site_logo || "";
    form.value.site_name = s.site_name || "";
    form.value.site_description = s.site_description || "";
    form.value.contact_tel = s.contact_tel || "";
    form.value.contact_tel_label = s.contact_tel_label || "";
    form.value.contact_email = s.contact_email || "";
    form.value.contact_address = s.contact_address || "";
    form.value.footer_text = s.footer_text || "";
    form.value.announcement = s.announcement || "";
    form.value.home_newsletter_img = s.home_newsletter_img || "";
    form.value.deals_of_week_product_id = s.deals_of_week_product_id || "";
    form.value.shop_apply_enabled = s.shop_apply_enabled !== "false";
    // 加载页脚配置
    if (s.footer_config) {
      try {
        const fc = JSON.parse(s.footer_config)
        footerDesc.value = fc.description || ""
        footerCopyright.value = fc.copyright || "Copyright &copy; {year} All Rights Reserved"
        if (Array.isArray(fc.sections)) footerSections.value = fc.sections
        if (Array.isArray(fc.socials) && fc.socials.length > 0) footerSocials.value = fc.socials
        if (fc.app) footerApp.value = { ...footerApp.value, ...fc.app }
      } catch { /* ignore */ }
    }
    banners.value = safeParse<Banner[]>(s.home_banners, []);
    promoBanners.value = safeParse<PromoBanner[]>(s.home_promo_banners, []);
    flashBanners.value = safeParse<FlashBanner[]>(s.home_flash_banners, []);
    offerCards.value = safeParse<OfferCard[]>(s.home_offer_cards, []);
    bestsellCTA.value = safeParse<BestsellCTA>(s.home_bestsell_cta, bestsellCTA.value);
    featureItems.value = safeParse<{ icon: string; title: string; description: string }[]>(s.home_features, []);
    if (s.home_hot_deal) {
      try { hotDealForm.value = { ...hotDealForm.value, ...JSON.parse(s.home_hot_deal) }; } catch { /* ignore */ }
    }
    // 预加载本周精选商品
    await loadDealsProduct();
  } finally { loading.value = false; }
});

async function saveSettings() {
  saving.value = true;
  try {
    await put("/api/admin/settings", {
      ...form.value,
      shop_apply_enabled: form.value.shop_apply_enabled ? "true" : "false",
      home_banners: JSON.stringify(banners.value),
      home_promo_banners: JSON.stringify(promoBanners.value),
      home_flash_banners: JSON.stringify(flashBanners.value),
      home_offer_cards: JSON.stringify(offerCards.value),
      home_bestsell_cta: JSON.stringify(bestsellCTA.value),
      home_features: JSON.stringify(featureItems.value),
      home_hot_deal: JSON.stringify(hotDealForm.value),
      footer_config: JSON.stringify({
        description: footerDesc.value,
        copyright: footerCopyright.value,
        sections: footerSections.value,
        socials: footerSocials.value,
        app: footerApp.value,
      }),
    });
    ElMessage.success("设置保存成功");
  } catch { ElMessage.error("保存失败"); } finally { saving.value = false; }
}
</script>

<style scoped>
.page-title { font-size: 20px; font-weight: 600; color: #1d2129; margin-bottom: 16px; }
.section-label { font-size: 13px; font-weight: 600; color: #606266; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 1px solid #ebeef5; }
.item-card { background: #f8f9fa; border: 1px solid #ebeef5; border-radius: 8px; padding: 16px; margin-bottom: 12px; }
.item-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.item-num { font-size: 13px; font-weight: 600; color: #303133; }
</style>
