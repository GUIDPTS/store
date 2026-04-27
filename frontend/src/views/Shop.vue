<template>
  <div>
    <!-- Breadcrumb -->
    <div class="breadcrumb mb-0 py-26 bg-main-50">
      <div class="container container-lg">
        <div class="flex-between flex-wrap gap-16">
          <h6 class="mb-0">店铺详情</h6>
          <ul class="flex items-center gap-8 flex-wrap">
            <li class="text-sm">
              <router-link to="/" class="text-gray-900 flex items-center gap-8 hover-text-main-600">
                <i class="ph ph-house"></i> 首页
              </router-link>
            </li>
            <li class="flex items-center"><i class="ph ph-caret-right"></i></li>
            <li class="text-sm">
              <router-link to="/shops" class="text-gray-900 hover-text-main-600">店铺列表</router-link>
            </li>
            <li class="flex items-center"><i class="ph ph-caret-right"></i></li>
            <li class="text-sm text-main-600">{{ shop ? shop.name : '店铺详情' }}</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Main -->
    <section class="vendors-list py-80">
      <div class="container container-lg">

        <!-- Loading -->
        <div v-if="loading" class="text-center py-60">
          <div style="width:48px;height:48px;border:2px solid;border-top-color:transparent;border-radius:50%;animation:spin 0.8s linear infinite;margin:0 auto 16px;"
               class="border-main-600"></div>
          <p class="text-gray-400 text-sm">加载中...</p>
        </div>

        <!-- Not found -->
        <div v-else-if="!shop" class="text-center py-60">
          <i class="ph ph-warning text-gray-200 text-[4rem] block mb-16"></i>
          <p class="text-gray-400">店铺不存在</p>
          <router-link to="/" class="btn btn-main rounded-[50rem] py-8 px-24 mt-16">返回首页</router-link>
        </div>

        <!-- Content -->
        <div v-else class="row g-4">

          <!-- ===== Sidebar ===== -->
          <div class="col-xxl-3 col-xl-4">
            <div class="shop-sidebar d-flex flex-column" style="gap:12px;">

              <!-- Vendor Info Card -->
              <div class="vendor-card style-two text-center px-16 pb-24 bg-main-50 rounded-8">
                <div style="width:80px;height:80px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;margin:24px auto 12px;overflow:hidden;border:1px solid #e6e6e6;flex-shrink:0;">
                  <img v-if="shop.logo" :src="shop.logo" :alt="shop.name" style="width:100%;height:100%;object-fit:cover;">
                  <i v-else class="ph ph-storefront text-main-600" style="font-size:2rem;"></i>
                </div>
                <h6 class="title">{{ shop.name }}</h6>
                <span v-if="shop.contact" class="text-neutral-600 text-sm d-block fw-semibold">
                  <i class="ph ph-phone"></i> {{ shop.contact }}
                </span>
                <span v-if="shop.is_official" class="bg-white text-main-600 rounded-[50rem] py-6 px-16 text-xs d-inline-flex align-items-center gap-4 mt-8">
                  <i class="ph ph-seal-check"></i> 官方认证
                </span>
                <p v-if="shop.description" class="text-neutral-600 text-sm text-start mt-16 mb-16">{{ shop.description }}</p>
                <div class="d-flex align-items-center justify-content-center mt-12">
                  <span class="text-neutral-600 text-sm">
                    <i class="ph ph-package text-main-600"></i> {{ products.length }} 件商品
                  </span>
                </div>
              </div>

              <!-- Category Filter -->
              <div v-if="categories.length" class="border border-gray-50 rounded-8 p-24">
                <h6 class="text-xl border-b border-gray-100 pb-24 mb-24">商品分类</h6>
                <ul>
                  <li class="mb-20">
                    <a href="javascript:void(0)"
                       @click="filterCategory = ''"
                       class="hover-text-main-600 cursor-pointer"
                       :class="filterCategory === '' ? 'text-main-600 font-[600]' : 'text-gray-900'">
                      全部商品 ({{ products.length }})
                    </a>
                  </li>
                  <li v-for="cat in categories" :key="cat.name" class="mb-20">
                    <a href="javascript:void(0)"
                       @click="filterCategory = cat.name"
                       class="hover-text-main-600 cursor-pointer"
                       :class="filterCategory === cat.name ? 'text-main-600 font-[600]' : 'text-gray-900'">
                      {{ cat.name }} ({{ cat.count }})
                    </a>
                  </li>
                </ul>
              </div>

            </div>
          </div>

          <!-- ===== Main Area ===== -->
          <div class="col-xxl-9 col-xl-8">

            <!-- Sort Bar -->
            <div class="flex-between flex-wrap gap-8 mb-40">
              <span class="text-neutral-600 font-[500] px-40 py-12 rounded-[50rem] border border-neutral-100 lg:block hidden">
                共 {{ filteredProducts.length }} 件商品
              </span>
              <div class="flex items-center gap-8">
                <span class="text-gray-900 flex-shrink-0">排序:</span>
                <select v-model="sortBy"
                        class="common-input form-select !rounded-[50rem] border border-gray-100 inline-block ps-20 pe-36 h-48 !py-0 font-[500]">
                  <option value="default">默认</option>
                  <option value="price_asc">价格从低到高</option>
                  <option value="price_desc">价格从高到低</option>
                  <option value="sales">销量优先</option>
                </select>
              </div>
            </div>

            <!-- Empty -->
            <div v-if="!sortedProducts.length" class="text-center py-60">
              <i class="ph ph-package text-gray-200 text-[4rem] block mb-16"></i>
              <p class="text-gray-400">{{ filterCategory ? '该分类暂无商品' : '该店铺暂无商品' }}</p>
              <button v-if="filterCategory" @click="filterCategory = ''"
                      class="btn btn-outline-main rounded-[50rem] py-8 px-24 mt-16">
                查看全部商品
              </button>
            </div>

            <!-- Product Grid -->
            <div v-else class="row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-xl-3 row-cols-xxl-4 g-12">
              <div v-for="p in sortedProducts" :key="p.id" class="col">
                <div class="product-card h-full p-8 border border-gray-100 hover-border-main-600 rounded-16 relative transition-2">
                  <span v-if="p.orig_price > p.price" class="product-card__badge bg-danger-600 px-8 py-4 text-sm text-white">特价</span>
                  <router-link :to="`/product/${p.id}`" class="product-card__thumb flex items-center justify-center">
                    <img v-if="p.image" :src="p.image" :alt="p.name" style="max-height:160px;object-fit:contain;">
                    <div v-else style="width:100%;aspect-ratio:4/3;display:flex;align-items:center;justify-content:center;font-size:3rem;" class="bg-color-one rounded-12 text-gray-300">
                      <i class="ph ph-package"></i>
                    </div>
                  </router-link>
                  <div class="product-card__content p-sm-2" style="width:100%;">
                    <h6 class="title text-lg font-[600]" style="margin-top:12px;margin-bottom:8px;">
                      <router-link :to="`/product/${p.id}`" class="link text-line-2">{{ p.name }}</router-link>
                    </h6>
                    <div v-if="p.category" class="flex items-center" style="gap:4px;margin-bottom:6px;">
                      <span class="text-main-600 text-md flex"><i class="ph-fill ph-tag"></i></span>
                      <span class="text-gray-500 text-xs">{{ p.category }}</span>
                    </div>
                    <div class="product-card__price" style="margin-bottom:8px;">
                      <span class="text-heading text-md font-[600]">{{ fmtPrice(p.price) }}</span>
                      <span v-if="p.orig_price > p.price" class="text-gray-400 text-md font-[600] text-decoration-line-through ms-4">{{ fmtPrice(p.orig_price) }}</span>
                    </div>
                    <div v-if="p.sales_count" class="flex items-center" style="gap:6px;margin-bottom:8px;">
                      <span class="text-xs font-[700] text-gray-600">{{ p.sales_count }}</span>
                      <span class="text-15 font-[700] text-warning-600 flex"><i class="ph-fill ph-fire"></i></span>
                      <span class="text-xs text-gray-500">已售</span>
                    </div>
                    <router-link :to="`/product/${p.id}`"
                                 class="product-card__cart btn bg-main-50 text-main-600 hover-bg-main-600 hover-text-white py-11 px-24 !rounded-[50rem] flex items-center gap-8 justify-center"
                                 style="margin-top:16px;width:100%;">
                      立即购买 <i class="ph ph-shopping-cart"></i>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/utils/api'

const route = useRoute()
const shop = ref(null)
const products = ref([])
const loading = ref(true)
const sortBy = ref('default')
const filterCategory = ref('')

const categories = computed(() => {
  const map = {}
  products.value.forEach(p => {
    const name = p.category || '其他'
    map[name] = (map[name] || 0) + 1
  })
  return Object.entries(map).map(([name, count]) => ({ name, count }))
})

const filteredProducts = computed(() => {
  if (!filterCategory.value) return products.value
  return products.value.filter(p => (p.category || '其他') === filterCategory.value)
})

const sortedProducts = computed(() => {
  const arr = [...filteredProducts.value]
  if (sortBy.value === 'price_asc') return arr.sort((a, b) => a.price - b.price)
  if (sortBy.value === 'price_desc') return arr.sort((a, b) => b.price - a.price)
  if (sortBy.value === 'sales') return arr.sort((a, b) => (b.sales_count || 0) - (a.sales_count || 0))
  return arr
})

function fmtPrice(n) { return '¥' + Number(n || 0).toFixed(2) }

async function loadShop() {
  loading.value = true
  filterCategory.value = ''
  try {
    const res = await api.get(`/api/shops/${route.params.id}`)
    shop.value = res.data
    const prodRes = await api.get(`/api/shops/${route.params.id}/products`)
    products.value = (Array.isArray(prodRes.data) ? prodRes.data : []).filter(p => p.is_active !== false)
  } catch (_) {
    shop.value = null
  } finally {
    loading.value = false
  }
}

onMounted(loadShop)
watch(() => route.params.id, loadShop)
</script>
