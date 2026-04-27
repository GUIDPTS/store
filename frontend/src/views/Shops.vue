<template>
  <section class="shop-page py-80">
    <div class="container container-lg">
      <div class="section-heading">
        <div class="flex-between flex-wrap gap-16">
          <h4 class="fw-semibold mb-4">全部商家</h4>
          <div class="d-flex align-items-center gap-12">
            <input type="text" v-model="searchQ" placeholder="搜索商家..."
              class="common-input py-8 px-16 rounded-pill border border-gray-200" style="font-size:14px;min-width:200px;">
            <select v-model="sortBy" class="common-input py-8 px-16 rounded-8 border border-gray-200" style="font-size:14px;cursor:pointer;">
              <option value="default">默认排序</option>
              <option value="products">商品数量</option>
            </select>
          </div>
        </div>
      </div>

      <div v-if="loading" class="text-center py-60">
        <p class="text-gray-400 text-sm">加载中...</p>
      </div>

      <div v-else-if="!sortedShops.length" class="text-center py-60">
        <i class="ph ph-storefront d-block mb-16 text-gray-200" style="font-size:4rem;"></i>
        <p class="text-gray-400">暂无商家入驻</p>
      </div>

      <div v-else class="row g-4 vendor-card-wrapper">
        <div v-for="(shop, i) in sortedShops" :key="shop.id" class="col-xxl-3 col-xl-4 col-md-6">
          <div class="vendor-card text-center px-16 pb-24">
            <div>
              <router-link :to="`/shop/${shop.id}`" class="d-block">
                <img v-if="shop.logo" :src="shop.logo" :alt="shop.name" class="vendor-card__logo m-12">
                <div v-else style="width:66px;height:66px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;margin:12px auto;">
                  <i class="ph ph-storefront text-main-600" style="font-size:1.75rem;"></i>
                </div>
              </router-link>
              <h6 class="title mt-32">
                <router-link :to="`/shop/${shop.id}`" class="hover-text-main-600">{{ shop.name }}</router-link>
              </h6>
              <span class="text-heading text-sm d-block text-line-2 mt-4">{{ shop.description || "欢迎光临本店" }}</span>
              <span v-if="shop.is_official" class="bg-white text-neutral-600 hover-bg-main-600 hover-text-white rounded-pill py-6 px-16 text-12 d-inline-block mt-8">
                <i class="ph ph-seal-check me-4"></i>官方认证
              </span>
              <router-link v-else :to="`/shop/${shop.id}`"
                class="bg-white text-neutral-600 hover-bg-main-600 hover-text-white rounded-pill py-6 px-16 text-12 d-inline-block mt-8" style="text-decoration:none;">
                {{ shop.products && shop.products.length > 0 ? (shop.products.length + " 件商品") : "进入店铺" }}
              </router-link>
            </div>
            <div class="vendor-card__list mt-22 d-flex align-items-center justify-content-center gap-8 overflow-hidden">
              <template v-if="shop.products && shop.products.length > 0">
                <div v-for="p in shop.products.slice(0,5)" :key="p.id" class="vendor-card__item bg-white d-flex align-items-center justify-content-center overflow-hidden" style="border-radius:50%;">
                  <img v-if="p.image" :src="p.image" :alt="p.name" style="width:100%;height:100%;object-fit:contain;">
                  <i v-else class="ph ph-package text-main-600" style="font-size:1.1rem;"></i>
                </div>
              </template>
              <span v-else class="text-gray-400 text-xs py-8">暂无商品</span>
            </div>
          </div>
        </div>
      </div>

      <div v-if="total > pageSize" class="d-flex align-items-center justify-content-center gap-8 mt-40">
        <button type="button" @click="changePage(page - 1)" :disabled="page === 1"
          class="w-40 h-40 d-flex align-items-center justify-content-center border border-gray-200 rounded-8 hover-border-main-600 hover-text-main-600"
          :style="page===1 ? 'opacity:.4;cursor:not-allowed;background:none' : 'background:none'">
          <i class="ph ph-caret-left"></i>
        </button>
        <span class="text-sm text-gray-500">第 {{ page }} 页，共 {{ Math.ceil(total/pageSize) }} 页</span>
        <button type="button" @click="changePage(page + 1)" :disabled="page >= Math.ceil(total/pageSize)"
          class="w-40 h-40 d-flex align-items-center justify-content-center border border-gray-200 rounded-8 hover-border-main-600 hover-text-main-600"
          :style="page>=Math.ceil(total/pageSize) ? 'opacity:.4;cursor:not-allowed;background:none' : 'background:none'">
          <i class="ph ph-caret-right"></i>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useSiteStore } from '@/stores/site'
import api from '@/utils/api'

const site = useSiteStore()
const shops = ref([])
const loading = ref(true)
const sortBy = ref('default')
const searchQ = ref('')
const page = ref(1)
const pageSize = 20
const total = ref(0)

const sortedShops = computed(() => {
  let arr = shops.value
  if (searchQ.value.trim()) {
    const q = searchQ.value.trim().toLowerCase()
    arr = arr.filter(s => s.name?.toLowerCase().includes(q) || s.description?.toLowerCase().includes(q))
  }
  if (sortBy.value === 'products') return [...arr].sort((a, b) => (b.products?.length || 0) - (a.products?.length || 0))
  return arr
})

async function loadShops() {
  loading.value = true
  try {
    const res = await api.get(`/api/shops?page=${page.value}&page_size=${pageSize}`)
    const data = res.data
    shops.value = (data.data || []).filter(s => s.status === 1 || s.status === undefined)
    total.value = data.total || shops.value.length
  } catch (_) {
    shops.value = []
  } finally {
    loading.value = false
  }
}

function changePage(p) {
  const max = Math.ceil(total.value / pageSize)
  if (p < 1 || p > max) return
  page.value = p
  loadShops()
}

onMounted(async () => {
  await site.ensureLoaded()
  await loadShops()
})
</script>
