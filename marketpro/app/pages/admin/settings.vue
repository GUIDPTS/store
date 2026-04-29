<template>
  <div>
    <div class="page-title">系统设置</div>

    <el-card shadow="never" v-loading="loading">
      <el-tabs>
        <!-- ── 站点信息 ── -->
        <el-tab-pane label="站点信息" name="site">
          <el-form :model="form" label-width="100px" style="max-width:580px;margin-top:12px">
            <el-form-item label="站点名称">
              <el-input v-model="form.site_name" />
            </el-form-item>
            <el-form-item label="站点描述">
              <el-input v-model="form.site_description" type="textarea" :rows="2" />
            </el-form-item>
            <el-form-item label="页脚文字">
              <el-input v-model="form.footer_text" />
            </el-form-item>
            <el-form-item label="公告">
              <el-input v-model="form.announcement" type="textarea" :rows="3" />
            </el-form-item>
          </el-form>
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
  site_name: "", site_description: "", footer_text: "", announcement: "",
  home_newsletter_img: "",
});

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

function safeParse<T>(val: unknown, fallback: T): T {
  if (!val || typeof val !== "string") return fallback;
  try { return JSON.parse(val) as T; } catch { return fallback; }
}

onMounted(async () => {
  try {
    const res = await get<{ settings: Record<string, string> }>("/api/admin/settings");
    const s = res.settings;
    form.value.site_name = s.site_name || "";
    form.value.site_description = s.site_description || "";
    form.value.footer_text = s.footer_text || "";
    form.value.announcement = s.announcement || "";
    form.value.home_newsletter_img = s.home_newsletter_img || "";
    banners.value = safeParse<Banner[]>(s.home_banners, []);
    promoBanners.value = safeParse<PromoBanner[]>(s.home_promo_banners, []);
    flashBanners.value = safeParse<FlashBanner[]>(s.home_flash_banners, []);
    offerCards.value = safeParse<OfferCard[]>(s.home_offer_cards, []);
    bestsellCTA.value = safeParse<BestsellCTA>(s.home_bestsell_cta, bestsellCTA.value);
  } finally { loading.value = false; }
});

async function saveSettings() {
  saving.value = true;
  try {
    await put("/api/admin/settings", {
      ...form.value,
      home_banners: JSON.stringify(banners.value),
      home_promo_banners: JSON.stringify(promoBanners.value),
      home_flash_banners: JSON.stringify(flashBanners.value),
      home_offer_cards: JSON.stringify(offerCards.value),
      home_bestsell_cta: JSON.stringify(bestsellCTA.value),
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
