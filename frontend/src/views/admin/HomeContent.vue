<template>
  <h5 class="mb-24">首页内容配置</h5>

  <div v-if="loading" class="py-40 text-center text-gray-400">
    <i class="ph ph-circle-notch text-3xl animate-spin"></i>
  </div>

  <form v-else @submit.prevent="save">
    <!-- 主轮播图 -->
    <div class="border border-gray-100 rounded-12 p-24 mb-24">
      <div class="flex items-center justify-between mb-16">
        <h6 class="text-md flex items-center gap-8 mb-0">
          <i class="ph ph-images text-main-600"></i> 主轮播图
        </h6>
        <button type="button" @click="addItem(banners, defaultBanner)"
          class="btn bg-main-50 text-main-600 rounded-pill px-12 py-4 text-sm hover-bg-main-600 hover-text-white">
          <i class="ph ph-plus me-4"></i>添加
        </button>
      </div>
      <div v-if="!banners.length" class="text-sm text-gray-400 py-8">暂无轮播图，点击上方添加</div>
      <div v-for="(item, i) in banners" :key="i" class="border border-gray-100 rounded-8 p-16 mb-12">
        <div class="flex items-center justify-between mb-12">
          <span class="text-sm font-[500] text-gray-600">轮播图 {{ i + 1 }}</span>
          <button type="button" @click="removeItem(banners, i)"
            class="text-danger-600 hover-text-danger-700 text-sm">
            <i class="ph ph-trash me-4"></i>删除
          </button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <label class="text-sm mb-4 block text-gray-600">副标题</label>
            <input v-model="item.subtitle" type="text" class="common-input text-sm" placeholder="如：官方认证 · 安全可靠">
          </div>
          <div>
            <label class="text-sm mb-4 block text-gray-600">按钮文字</label>
            <input v-model="item.btn_text" type="text" class="common-input text-sm" placeholder="如：浏览商家">
          </div>
          <div class="md:col-span-2">
            <label class="text-sm mb-4 block text-gray-600">主标题</label>
            <input v-model="item.title" type="text" class="common-input text-sm" placeholder="如：正版软件 · 游戏充值 · 卡密发货">
          </div>
          <div>
            <label class="text-sm mb-4 block text-gray-600">跳转链接（站内路径）</label>
            <input v-model="item.btn_link_internal" type="text" class="common-input text-sm" placeholder="/shops">
          </div>
          <div>
            <label class="text-sm mb-4 block text-gray-600">右侧图片 URL</label>
            <input v-model="item.image" type="text" class="common-input text-sm" placeholder="/marketpro/images/thumbs/banner-img1.png">
          </div>
        </div>
      </div>
    </div>

    <!-- 促销横幅（4格） -->
    <div class="border border-gray-100 rounded-12 p-24 mb-24">
      <div class="flex items-center justify-between mb-16">
        <h6 class="text-md flex items-center gap-8 mb-0">
          <i class="ph ph-flag-banner text-main-600"></i> 促销横幅（最多 4 格）
        </h6>
        <button type="button" @click="addItem(promoBanners, defaultPromo)"
          class="btn bg-main-50 text-main-600 rounded-pill px-12 py-4 text-sm hover-bg-main-600 hover-text-white">
          <i class="ph ph-plus me-4"></i>添加
        </button>
      </div>
      <div v-if="!promoBanners.length" class="text-sm text-gray-400 py-8">暂无促销横幅，点击上方添加</div>
      <div v-for="(item, i) in promoBanners" :key="i" class="border border-gray-100 rounded-8 p-16 mb-12">
        <div class="flex items-center justify-between mb-12">
          <span class="text-sm font-[500] text-gray-600">促销格 {{ i + 1 }}</span>
          <button type="button" @click="removeItem(promoBanners, i)"
            class="text-danger-600 hover-text-danger-700 text-sm">
            <i class="ph ph-trash me-4"></i>删除
          </button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <label class="text-sm mb-4 block text-gray-600">标题</label>
            <input v-model="item.title" type="text" class="common-input text-sm" placeholder="如：官方正版授权">
          </div>
          <div>
            <label class="text-sm mb-4 block text-gray-600">按钮文字</label>
            <input v-model="item.btn_text" type="text" class="common-input text-sm" placeholder="如：立即选购">
          </div>
          <div>
            <label class="text-sm mb-4 block text-gray-600">跳转链接（站内路径）</label>
            <input v-model="item.btn_link_internal" type="text" class="common-input text-sm" placeholder="/shops">
          </div>
          <div>
            <label class="text-sm mb-4 block text-gray-600">背景图 URL</label>
            <input v-model="item.image" type="text" class="common-input text-sm" placeholder="/marketpro/images/thumbs/promotional-banner-img1.png">
          </div>
        </div>
      </div>
    </div>

    <!-- 闪购横幅（2格） -->
    <div class="border border-gray-100 rounded-12 p-24 mb-24">
      <div class="flex items-center justify-between mb-16">
        <h6 class="text-md flex items-center gap-8 mb-0">
          <i class="ph ph-lightning text-main-600"></i> 闪购横幅（最多 2 格）
        </h6>
        <button type="button" @click="addItem(flashBanners, defaultFlash)"
          class="btn bg-main-50 text-main-600 rounded-pill px-12 py-4 text-sm hover-bg-main-600 hover-text-white">
          <i class="ph ph-plus me-4"></i>添加
        </button>
      </div>
      <div v-if="!flashBanners.length" class="text-sm text-gray-400 py-8">暂无闪购横幅，点击上方添加</div>
      <div v-for="(item, i) in flashBanners" :key="i" class="border border-gray-100 rounded-8 p-16 mb-12">
        <div class="flex items-center justify-between mb-12">
          <span class="text-sm font-[500] text-gray-600">闪购格 {{ i + 1 }}</span>
          <button type="button" @click="removeItem(flashBanners, i)"
            class="text-danger-600 hover-text-danger-700 text-sm">
            <i class="ph ph-trash me-4"></i>删除
          </button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <label class="text-sm mb-4 block text-gray-600">主标题</label>
            <input v-model="item.title" type="text" class="common-input text-sm" placeholder="如：新人专享福利">
          </div>
          <div>
            <label class="text-sm mb-4 block text-gray-600">副标题</label>
            <input v-model="item.subtitle" type="text" class="common-input text-sm" placeholder="如：注册即享首单优惠">
          </div>
          <div>
            <label class="text-sm mb-4 block text-gray-600">按钮文字</label>
            <input v-model="item.btn_text" type="text" class="common-input text-sm" placeholder="如：立即注册">
          </div>
          <div>
            <label class="text-sm mb-4 block text-gray-600">跳转链接（站内路径）</label>
            <input v-model="item.btn_link_internal" type="text" class="common-input text-sm" placeholder="/shop-apply">
          </div>
          <div class="md:col-span-2">
            <label class="text-sm mb-4 block text-gray-600">背景图 URL</label>
            <input v-model="item.bg_image" type="text" class="common-input text-sm" placeholder="/marketpro/images/bg/flash-sale-bg1.png">
          </div>
        </div>
      </div>
    </div>

    <!-- 特惠卡片（2格） -->
    <div class="border border-gray-100 rounded-12 p-24 mb-24">
      <div class="flex items-center justify-between mb-16">
        <h6 class="text-md flex items-center gap-8 mb-0">
          <i class="ph ph-gift text-main-600"></i> 特惠卡片（最多 2 格）
        </h6>
        <button type="button" @click="addItem(offerCards, defaultOffer)"
          class="btn bg-main-50 text-main-600 rounded-pill px-12 py-4 text-sm hover-bg-main-600 hover-text-white">
          <i class="ph ph-plus me-4"></i>添加
        </button>
      </div>
      <div v-if="!offerCards.length" class="text-sm text-gray-400 py-8">暂无特惠卡片，点击上方添加</div>
      <div v-for="(item, i) in offerCards" :key="i" class="border border-gray-100 rounded-8 p-16 mb-12">
        <div class="flex items-center justify-between mb-12">
          <span class="text-sm font-[500] text-gray-600">特惠卡片 {{ i + 1 }}</span>
          <button type="button" @click="removeItem(offerCards, i)"
            class="text-danger-600 hover-text-danger-700 text-sm">
            <i class="ph ph-trash me-4"></i>删除
          </button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <label class="text-sm mb-4 block text-gray-600">标题</label>
            <input v-model="item.title" type="text" class="common-input text-sm" placeholder="如：首单立减">
          </div>
          <div>
            <label class="text-sm mb-4 block text-gray-600">按钮文字</label>
            <input v-model="item.btn_text" type="text" class="common-input text-sm" placeholder="如：立即选购">
          </div>
          <div>
            <label class="text-sm mb-4 block text-gray-600">标签1</label>
            <input v-model="item.tag1" type="text" class="common-input text-sm" placeholder="如：即时发货">
          </div>
          <div>
            <label class="text-sm mb-4 block text-gray-600">标签2</label>
            <input v-model="item.tag2" type="text" class="common-input text-sm" placeholder="如：长期有效">
          </div>
          <div>
            <label class="text-sm mb-4 block text-gray-600">跳转链接（站内路径）</label>
            <input v-model="item.btn_link_internal" type="text" class="common-input text-sm" placeholder="/shops">
          </div>
          <div>
            <label class="text-sm mb-4 block text-gray-600">Logo 图片 URL</label>
            <input v-model="item.logo" type="text" class="common-input text-sm" placeholder="/marketpro/images/thumbs/offer-logo.png">
          </div>
          <div class="md:col-span-2">
            <label class="text-sm mb-4 block text-gray-600">背景图 URL</label>
            <input v-model="item.bg_image" type="text" class="common-input text-sm" placeholder="/marketpro/images/bg/promo-bg-img1.png">
          </div>
        </div>
      </div>
    </div>

    <button type="submit" class="btn btn-main rounded-pill py-12 px-32" :disabled="saving">
      <i class="ph ph-floppy-disk me-4"></i> {{ saving ? '保存中…' : '保存首页配置' }}
    </button>
  </form>

  <!-- ===== 商品分区配置（独立保存） ===== -->
  <div class="mt-32">
    <h6 class="mb-16 flex items-center gap-8 text-md font-[600]">
      <i class="ph ph-squares-four text-main-600"></i> 商品展示分区配置
      <span class="text-xs text-gray-400 font-normal">（留空则自动从分类数据中推导）</span>
    </h6>

    <!-- 搜索商品弹层 -->
    <div v-if="picker.visible" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50" @click.self="picker.visible = false">
      <div class="bg-white rounded-16 shadow-xl w-full max-w-lg p-24 max-h-[80vh] flex flex-col">
        <div class="flex items-center justify-between mb-16">
          <h6 class="text-md mb-0">选择商品 → {{ picker.sectionLabel }}</h6>
          <button type="button" @click="picker.visible = false" class="text-gray-400 hover-text-gray-700"><i class="ph ph-x text-xl"></i></button>
        </div>
        <input v-model="picker.keyword" @input="searchProducts" type="text"
          class="common-input text-sm mb-12" placeholder="搜索商品名称…">
        <div class="overflow-y-auto flex-1">
          <div v-if="picker.loading" class="text-center py-20 text-gray-400 text-sm">加载中…</div>
          <div v-else-if="!picker.results.length" class="text-center py-20 text-gray-400 text-sm">暂无商品</div>
          <div v-for="p in picker.results" :key="p.id"
            class="flex items-center gap-12 py-8 px-4 rounded-8 hover-bg-main-50 cursor-pointer"
            :class="isInSection(picker.target, p.id) ? 'opacity-40 pointer-events-none' : ''"
            @click="addToSection(picker.target, p)">
            <img :src="p.image || '/marketpro/images/thumbs/product-img7.png'"
              class="w-40 h-40 object-cover rounded-8 flex-shrink-0" alt="">
            <div class="flex-1 min-w-0">
              <p class="text-sm fw-medium text-heading mb-0 truncate">{{ p.name }}</p>
              <p class="text-xs text-gray-400 mb-0">¥{{ Number(p.price || 0).toFixed(2) }} · {{ p.shop?.name || '' }}</p>
            </div>
            <span v-if="isInSection(picker.target, p.id)" class="text-xs text-success-600">已添加</span>
            <i v-else class="ph ph-plus text-main-600 text-lg flex-shrink-0"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-24">
      <!-- 今日热卖 -->
      <div class="border border-gray-100 rounded-12 p-24">
        <div class="flex items-center justify-between mb-16">
          <h6 class="text-md flex items-center gap-8 mb-0">
            <i class="ph ph-fire text-orange-500"></i> 今日热卖（Flash Sales Today）
          </h6>
          <button type="button" @click="openPicker('flash', '今日热卖')"
            class="btn bg-main-50 text-main-600 rounded-pill px-12 py-4 text-sm hover-bg-main-600 hover-text-white">
            <i class="ph ph-plus me-4"></i>添加商品
          </button>
        </div>
        <div v-if="!sections.flash.length" class="text-sm text-gray-400 py-8">暂未配置，将自动从分类数据推导</div>
        <div v-else class="flex flex-wrap gap-8">
          <div v-for="(p, i) in sections.flash" :key="p.id"
            class="flex items-center gap-8 border border-gray-100 rounded-8 p-8 bg-gray-50 group">
            <img :src="p.image || '/marketpro/images/thumbs/product-img7.png'"
              class="w-36 h-36 object-cover rounded-6 flex-shrink-0" alt="">
            <div class="min-w-0">
              <p class="text-xs fw-medium text-heading mb-0 truncate max-w-[120px]">{{ p.name }}</p>
              <p class="text-xs text-gray-400 mb-0">¥{{ Number(p.price || 0).toFixed(2) }}</p>
            </div>
            <button type="button" @click="removeFromSection('flash', i)"
              class="text-danger-600 opacity-0 group-hover:opacity-100 transition-opacity ml-4">
              <i class="ph ph-x-circle text-lg"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- 每日特惠 -->
      <div class="border border-gray-100 rounded-12 p-24">
        <div class="flex items-center justify-between mb-16">
          <h6 class="text-md flex items-center gap-8 mb-0">
            <i class="ph ph-tag text-purple-500"></i> 每日特惠（Hot Deals）
          </h6>
          <button type="button" @click="openPicker('hot', '每日特惠')"
            class="btn bg-main-50 text-main-600 rounded-pill px-12 py-4 text-sm hover-bg-main-600 hover-text-white">
            <i class="ph ph-plus me-4"></i>添加商品
          </button>
        </div>
        <div v-if="!sections.hot.length" class="text-sm text-gray-400 py-8">暂未配置，将自动从分类数据推导</div>
        <div v-else class="flex flex-wrap gap-8">
          <div v-for="(p, i) in sections.hot" :key="p.id"
            class="flex items-center gap-8 border border-gray-100 rounded-8 p-8 bg-gray-50 group">
            <img :src="p.image || '/marketpro/images/thumbs/product-img7.png'"
              class="w-36 h-36 object-cover rounded-6 flex-shrink-0" alt="">
            <div class="min-w-0">
              <p class="text-xs fw-medium text-heading mb-0 truncate max-w-[120px]">{{ p.name }}</p>
              <p class="text-xs text-gray-400 mb-0">¥{{ Number(p.price || 0).toFixed(2) }}</p>
            </div>
            <button type="button" @click="removeFromSection('hot', i)"
              class="text-danger-600 opacity-0 group-hover:opacity-100 transition-opacity ml-4">
              <i class="ph ph-x-circle text-lg"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- 每日精选 -->
      <div class="border border-gray-100 rounded-12 p-24">
        <div class="flex items-center justify-between mb-16">
          <h6 class="text-md flex items-center gap-8 mb-0">
            <i class="ph ph-star text-yellow-500"></i> 每日精选（Best Sells）
          </h6>
          <button type="button" @click="openPicker('best', '每日精选')"
            class="btn bg-main-50 text-main-600 rounded-pill px-12 py-4 text-sm hover-bg-main-600 hover-text-white">
            <i class="ph ph-plus me-4"></i>添加商品
          </button>
        </div>
        <div v-if="!sections.best.length" class="text-sm text-gray-400 py-8">暂未配置，将自动从分类数据推导</div>
        <div v-else class="flex flex-wrap gap-8">
          <div v-for="(p, i) in sections.best" :key="p.id"
            class="flex items-center gap-8 border border-gray-100 rounded-8 p-8 bg-gray-50 group">
            <img :src="p.image || '/marketpro/images/thumbs/product-img7.png'"
              class="w-36 h-36 object-cover rounded-6 flex-shrink-0" alt="">
            <div class="min-w-0">
              <p class="text-xs fw-medium text-heading mb-0 truncate max-w-[120px]">{{ p.name }}</p>
              <p class="text-xs text-gray-400 mb-0">¥{{ Number(p.price || 0).toFixed(2) }}</p>
            </div>
            <button type="button" @click="removeFromSection('best', i)"
              class="text-danger-600 opacity-0 group-hover:opacity-100 transition-opacity ml-4">
              <i class="ph ph-x-circle text-lg"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <button type="button" @click="saveSections" :disabled="savingSections"
      class="btn btn-main rounded-pill py-12 px-32 mt-20">
      <i class="ph ph-floppy-disk me-4"></i> {{ savingSections ? '保存中…' : '保存商品分区配置' }}
    </button>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import api from '@/utils/api'
import { useToastStore } from '@/stores/toast'

const toast = useToastStore()
const loading = ref(true)
const saving = ref(false)
const savingSections = ref(false)

const banners = ref([])
const promoBanners = ref([])
const flashBanners = ref([])
const offerCards = ref([])

const defaultBanner = () => ({ subtitle: '', title: '', btn_text: '立即查看', btn_link_internal: '/shops', image: '' })
const defaultPromo = () => ({ title: '', btn_text: '立即选购', btn_link_internal: '/shops', image: '' })
const defaultFlash = () => ({ title: '', subtitle: '', btn_text: '立即查看', btn_link_internal: '/shops', bg_image: '' })
const defaultOffer = () => ({ title: '', tag1: '', tag2: '', btn_text: '立即查看', btn_link_internal: '/shops', bg_image: '', logo: '' })

function tryParse(s, fallback) {
  try { const v = JSON.parse(s || ''); if (Array.isArray(v)) return v } catch (_) {}
  return fallback
}

function addItem(arr, factory) {
  arr.value.push(factory())
}

function removeItem(arr, index) {
  arr.value.splice(index, 1)
}

// ---- 商品分区 ----
// sections 存储完整商品对象（用于展示），保存时只存 IDs
const sections = reactive({ flash: [], hot: [], best: [] })

// 弹层 picker 状态
const picker = reactive({
  visible: false,
  target: '',
  sectionLabel: '',
  keyword: '',
  loading: false,
  results: [],
  _timer: null,
})

function openPicker(target, label) {
  picker.target = target
  picker.sectionLabel = label
  picker.keyword = ''
  picker.results = []
  picker.visible = true
  searchProducts()
}

function isInSection(target, id) {
  return sections[target]?.some(p => p.id === id)
}

function addToSection(target, product) {
  if (!isInSection(target, product.id)) {
    sections[target].push(product)
  }
}

function removeFromSection(target, index) {
  sections[target].splice(index, 1)
}

async function searchProducts() {
  clearTimeout(picker._timer)
  picker._timer = setTimeout(async () => {
    picker.loading = true
    try {
      const r = await api.get('/api/admin/products', {
        params: { page: 1, page_size: 20, keyword: picker.keyword || '' },
      })
      picker.results = r.data.products || []
    } catch (_) {
      picker.results = []
    } finally {
      picker.loading = false
    }
  }, 300)
}

async function loadSectionProducts(ids, target) {
  if (!ids || !ids.length) { sections[target] = []; return }
  try {
    // Fetch each product by ID — use search with known IDs via existing products endpoint
    // We batch-fetch by requesting all products matching these IDs via the admin endpoint
    const r = await api.get('/api/admin/products', { params: { page: 1, page_size: 100 } })
    const all = r.data.products || []
    const idSet = new Set(ids)
    const byId = Object.fromEntries(all.filter(p => idSet.has(p.id)).map(p => [p.id, p]))
    sections[target] = ids.map(id => byId[id]).filter(Boolean)
  } catch (_) {
    sections[target] = []
  }
}

async function saveSections() {
  savingSections.value = true
  try {
    await api.put('/api/admin/settings', {
      home_flash_product_ids: JSON.stringify(sections.flash.map(p => p.id)),
      home_hot_deal_ids: JSON.stringify(sections.hot.map(p => p.id)),
      home_bestsell_ids: JSON.stringify(sections.best.map(p => p.id)),
    })
    toast.success('商品分区配置已保存')
  } catch (e) {
    toast.error(e.response?.data?.error || '保存失败')
  } finally {
    savingSections.value = false
  }
}

async function load() {
  loading.value = true
  try {
    const r = await api.get('/api/admin/settings')
    const s = r.data?.settings || r.data || {}
    banners.value = tryParse(s.home_banners, [])
    promoBanners.value = tryParse(s.home_promo_banners, [])
    flashBanners.value = tryParse(s.home_flash_banners, [])
    offerCards.value = tryParse(s.home_offer_cards, [])

    const flashIDs = tryParse(s.home_flash_product_ids, [])
    const hotIDs = tryParse(s.home_hot_deal_ids, [])
    const bestIDs = tryParse(s.home_bestsell_ids, [])
    await Promise.all([
      loadSectionProducts(flashIDs, 'flash'),
      loadSectionProducts(hotIDs, 'hot'),
      loadSectionProducts(bestIDs, 'best'),
    ])
  } catch (_) {
    toast.error('加载失败')
  } finally {
    loading.value = false
  }
}

async function save() {
  saving.value = true
  try {
    await api.put('/api/admin/settings', {
      home_banners: JSON.stringify(banners.value),
      home_promo_banners: JSON.stringify(promoBanners.value),
      home_flash_banners: JSON.stringify(flashBanners.value),
      home_offer_cards: JSON.stringify(offerCards.value),
    })
    toast.success('首页配置已保存')
  } catch (e) {
    toast.error(e.response?.data?.error || '保存失败')
  } finally {
    saving.value = false
  }
}

onMounted(load)
</script>
