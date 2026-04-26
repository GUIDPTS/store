<template>
  <!-- Banner -->
  <div class="banner">
    <div class="container container-lg">
      <div class="banner-item rounded-24 overflow-hidden relative bg-main-50">
        <img src="/marketpro/images/bg/banner-bg.png" alt=""
             class="banner-img absolute inset-block-start-0 inset-inline-start-0 w-full h-full z-[-1] object-fit-cover rounded-24">
        <div class="banner-slider__inner flex-between relative px-32 py-64 flex-wrap gap-24">
          <div class="banner-item__content max-w-[640px]">
            <h1 class="banner-item__title">{{ siteName }}</h1>
            <p class="text-lg text-heading mb-32">
              {{ site.settings?.site_description || '专业、安全、便捷的多商户卡密交易平台 — 即买即用，自动发卡。' }}
            </p>
            <router-link
              :to="{ name: 'shops' }"
              class="btn btn-main inline-flex items-center rounded-[50rem] gap-8 px-32 py-16"
            >
              浏览店铺 <span class="icon text-xl flex"><i class="ph ph-shopping-cart-simple"></i></span>
            </router-link>
          </div>
          <div class="banner-item__thumb hidden md:block">
            <i class="ph-fill ph-storefront text-main-600" style="font-size:200px;opacity:.5"></i>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Categories -->
  <section class="category py-80" id="featureSection">
    <div class="container container-lg">
      <div class="section-heading mb-32 text-center">
        <h5 class="mb-8">商品分类</h5>
        <p class="text-gray-500">浏览所有可用分类</p>
      </div>
      <div v-if="categories.length" class="flex flex-wrap gap-16 justify-center">
        <router-link
          v-for="c in categories"
          :key="c.id"
          :to="{ name: 'category', params: { id: c.id } }"
          class="category-item border border-gray-100 hover-border-main-600 rounded-16 p-24 text-center transition-2 bg-white block"
          style="width:160px"
        >
          <span class="w-64 h-64 mx-auto rounded-[50%] bg-main-50 text-main-600 flex items-center justify-center text-4xl mb-12">
            <i :class="c.icon || 'ph ph-tag'"></i>
          </span>
          <h6 class="text-md mb-4 text-line-1">{{ c.name }}</h6>
          <span class="text-xs text-gray-500">{{ (c.products || []).length }} 件商品</span>
        </router-link>
      </div>
      <EmptyState v-else icon="ph ph-tag" title="暂无分类" />
    </div>
  </section>

  <!-- Featured products by category -->
  <section
    v-for="cat in categoriesWithProducts"
    :key="cat.id"
    class="popular-products py-40"
  >
    <div class="container container-lg">
      <div class="section-heading flex-between flex-wrap gap-16 mb-24">
        <div>
          <h5 class="mb-4 flex items-center gap-12">
            <i :class="cat.icon || 'ph ph-tag'" class="text-main-600"></i>
            {{ cat.name }}
          </h5>
          <p class="text-gray-500 mb-0 text-sm">{{ cat.description || '热销商品' }}</p>
        </div>
        <router-link
          :to="{ name: 'category', params: { id: cat.id } }"
          class="btn btn-outline-main rounded-pill py-8 px-20 inline-flex items-center gap-8"
        >
          查看全部 <i class="ph ph-arrow-right"></i>
        </router-link>
      </div>
      <div class="grid gap-16" style="grid-template-columns: repeat(auto-fill, minmax(220px, 1fr))">
        <ProductCard v-for="p in (cat.products || []).slice(0, 10)" :key="p.id" :product="p" />
      </div>
    </div>
  </section>

  <!-- Top vendors -->
  <section v-if="topShops.length" class="top-vendors py-80 bg-color-one">
    <div class="container container-lg">
      <div class="section-heading flex-between flex-wrap gap-16 mb-32">
        <div>
          <h5 class="mb-4">热门店铺</h5>
          <p class="text-gray-500 mb-0 text-sm">优质卖家精选</p>
        </div>
        <router-link
          :to="{ name: 'shops' }"
          class="btn btn-outline-main rounded-pill py-8 px-20 inline-flex items-center gap-8"
        >
          全部店铺 <i class="ph ph-arrow-right"></i>
        </router-link>
      </div>
      <div class="grid gap-16" style="grid-template-columns: repeat(auto-fill, minmax(260px, 1fr))">
        <ShopCard v-for="s in topShops" :key="s.id" :shop="s" />
      </div>
    </div>
  </section>

  <!-- Trust / Shipping section -->
  <section class="shipping py-60">
    <div class="container container-lg">
      <div class="grid gap-16" style="grid-template-columns: repeat(auto-fit, minmax(220px, 1fr))">
        <div class="flex items-center gap-16 p-24 border border-gray-100 rounded-16 bg-white">
          <span class="w-56 h-56 flex-shrink-0 rounded-[50%] bg-main-50 text-main-600 flex items-center justify-center text-3xl">
            <i class="ph-fill ph-lightning"></i>
          </span>
          <div>
            <h6 class="text-md mb-4">即时发卡</h6>
            <p class="text-sm text-gray-500 mb-0">支付完成自动交付</p>
          </div>
        </div>
        <div class="flex items-center gap-16 p-24 border border-gray-100 rounded-16 bg-white">
          <span class="w-56 h-56 flex-shrink-0 rounded-[50%] bg-main-50 text-main-600 flex items-center justify-center text-3xl">
            <i class="ph-fill ph-shield-check"></i>
          </span>
          <div>
            <h6 class="text-md mb-4">安全保障</h6>
            <p class="text-sm text-gray-500 mb-0">商家审核 资金托管</p>
          </div>
        </div>
        <div class="flex items-center gap-16 p-24 border border-gray-100 rounded-16 bg-white">
          <span class="w-56 h-56 flex-shrink-0 rounded-[50%] bg-main-50 text-main-600 flex items-center justify-center text-3xl">
            <i class="ph-fill ph-headset"></i>
          </span>
          <div>
            <h6 class="text-md mb-4">7×24 客服</h6>
            <p class="text-sm text-gray-500 mb-0">订单问题随时响应</p>
          </div>
        </div>
        <div class="flex items-center gap-16 p-24 border border-gray-100 rounded-16 bg-white">
          <span class="w-56 h-56 flex-shrink-0 rounded-[50%] bg-main-50 text-main-600 flex items-center justify-center text-3xl">
            <i class="ph-fill ph-credit-card"></i>
          </span>
          <div>
            <h6 class="text-md mb-4">多种支付</h6>
            <p class="text-sm text-gray-500 mb-0">主流支付方式支持</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '@/utils/api'
import { useSiteStore } from '@/stores/site'
import ProductCard from '@/components/ProductCard.vue'
import ShopCard from '@/components/ShopCard.vue'
import EmptyState from '@/components/EmptyState.vue'

const site = useSiteStore()
const topShops = ref([])

const siteName = computed(() => site.settings?.site_name || '社区发卡')
const categories = computed(() => site.categories || [])
const categoriesWithProducts = computed(() =>
  categories.value.filter(c => (c.products || []).length > 0).slice(0, 5)
)

onMounted(async () => {
  await site.ensureLoaded()
  try {
    const r = await api.get('/api/shops')
    const list = r.data?.data || []
    topShops.value = list.slice(0, 8)
  } catch (_) { /* tolerate */ }
})
</script>
