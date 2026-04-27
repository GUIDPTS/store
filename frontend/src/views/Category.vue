<template>
  <section class="shop-page py-80">
    <div class="container container-lg">
      <!-- Breadcrumb -->
      <div class="mb-32 d-flex align-items-center gap-8 text-sm text-gray-500">
        <router-link to="/" class="hover-text-main-600">首页</router-link>
        <i class="ph ph-caret-right"></i>
        <span class="text-gray-800">{{ category?.name || '分类' }}</span>
      </div>

      <!-- Header -->
      <div class="flex-between flex-wrap gap-16 mb-24">
        <div>
          <h4 class="fw-semibold mb-4">{{ category?.name || '商品列表' }}</h4>
          <span class="text-sm text-gray-500">{{ loading ? '加载中...' : (sortedProducts.length + ' 件商品') }}</span>
        </div>
        <div class="d-flex align-items-center gap-12">
          <select v-model="sortBy" class="common-input py-8 px-16 rounded-8 border border-gray-200" style="font-size:14px;cursor:pointer;">
            <option value="default">默认排序</option>
            <option value="price_asc">价格从低到高</option>
            <option value="price_desc">价格从高到低</option>
            <option value="sales">销量优先</option>
          </select>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="text-center py-60">
        <div class="w-48 h-48 border border-main-600 rounded-circle d-flex align-items-center justify-content-center mx-auto mb-16 animate-spin" style="border-top-color:transparent !important;"></div>
        <p class="text-gray-400 text-sm">加载中...</p>
      </div>

      <!-- Empty -->
      <div v-else-if="!sortedProducts.length" class="text-center py-60">
        <i class="ph ph-package d-block mb-16 text-gray-200" style="font-size:4rem;"></i>
        <p class="text-gray-400">该分类暂无商品</p>
        <router-link to="/" class="btn btn-main rounded-pill py-8 px-24 mt-16">返回首页</router-link>
      </div>

      <!-- Grid -->
      <div v-else class="row g-12">
        <div v-for="(p, i) in sortedProducts" :key="p.id" class="col-xxl-2 col-xl-3 col-md-4 col-sm-6 col-6">
          <div class="product-card h-100 p-12 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2 group-item">
            <span v-if="p.orig_price > p.price" class="product-card__badge bg-danger-600 px-8 py-4 text-sm text-white">特价</span>
            <router-link :to="`/product/${p.id}`" class="product-card__thumb flex-center overflow-hidden">
              <img :src="p.image || `/marketpro/images/thumbs/product-img${((i % 24) + 7)}.png`" :alt="p.name">
            </router-link>
            <div class="product-card__content p-sm-2 w-100">
              <h6 class="title text-lg fw-semibold my-12">
                <router-link :to="`/product/${p.id}`" class="link text-line-2">{{ p.name }}</router-link>
              </h6>
              <div v-if="p.shop" class="flex-align gap-4 mb-8">
                <span class="text-main-600 text-md d-flex"><i class="ph-fill ph-storefront"></i></span>
                <span class="text-gray-500 text-xs text-line-1">{{ p.shop.name }}</span>
              </div>
              <div class="product-card__price mb-8">
                <span class="text-heading text-md fw-semibold">{{ fmtPrice(p.price) }}</span>
                <span v-if="p.orig_price > p.price" class="text-gray-400 text-md fw-semibold text-decoration-line-through ms-4">{{ fmtPrice(p.orig_price) }}</span>
              </div>
              <div class="flex-align gap-6 mb-12">
                <span class="text-xs fw-bold text-gray-600">5.0</span>
                <span class="text-warning-600 d-flex"><i class="ph-fill ph-star"></i></span>
                <span class="text-xs fw-bold text-gray-600">({{ p.sales_count || 0 }})</span>
              </div>
              <router-link :to="`/product/${p.id}`" class="product-card__cart btn bg-main-50 text-main-600 hover-bg-main-600 hover-text-white py-11 px-24 rounded-pill flex-align gap-8 w-100 justify-content-center">
                立即购买 <i class="ph ph-shopping-cart"></i>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useSiteStore } from '@/stores/site'
import api from '@/utils/api'

const route = useRoute()
const site = useSiteStore()

const products = ref([])
const loading = ref(true)
const sortBy = ref('default')

const category = computed(() => site.categories.find(c => c.id == route.params.id))

const sortedProducts = computed(() => {
  const arr = [...products.value]
  if (sortBy.value === 'price_asc') return arr.sort((a, b) => a.price - b.price)
  if (sortBy.value === 'price_desc') return arr.sort((a, b) => b.price - a.price)
  if (sortBy.value === 'sales') return arr.sort((a, b) => (b.sales_count || 0) - (a.sales_count || 0))
  return arr
})

function fmtPrice(n) { return '¥' + Number(n || 0).toFixed(2) }

async function loadProducts() {
  loading.value = true
  try {
    const res = await api.get(`/api/products?category_id=${route.params.id}&page_size=100`)
    products.value = (Array.isArray(res.data) ? res.data : res.data.data || []).filter(p => p.is_active !== false)
  } catch (_) {
    products.value = []
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await site.ensureLoaded()
  await loadProducts()
})
watch(() => route.params.id, loadProducts)
</script>
