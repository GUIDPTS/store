<template>
  <div class="flex-between flex-wrap gap-12 mb-24">
    <h5 class="mb-0">我的店铺</h5>
    <router-link v-if="!shop" :to="{ name: 'shop-apply' }" class="btn btn-main rounded-pill py-8 px-20">申请入驻</router-link>
  </div>

  <div v-if="loading" class="py-40 text-center text-gray-400">
    <i class="ph ph-circle-notch text-3xl animate-spin"></i>
  </div>

  <EmptyState
    v-else-if="!shop"
    icon="ph ph-storefront"
    title="您还没有店铺"
    description="申请入驻后即可上架商品销售"
  >
    <router-link :to="{ name: 'shop-apply' }" class="btn btn-main rounded-pill py-10 px-24">立即申请</router-link>
  </EmptyState>

  <template v-else>
    <div class="border border-gray-100 rounded-12 p-24 mb-24 flex flex-wrap items-center gap-24">
      <img v-if="shop.logo" :src="shop.logo" alt="" class="w-[80px] h-[80px] rounded-12 object-cover">
      <div v-else class="w-[80px] h-[80px] rounded-12 bg-main-100 text-main-600 flex items-center justify-center text-3xl">
        <i class="ph-fill ph-storefront"></i>
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-12 mb-4">
          <h6 class="mb-0">{{ shop.name }}</h6>
          <span :class="STATUS[shop.status]?.cls" class="text-xs py-2 px-8 rounded-pill">{{ STATUS[shop.status]?.text }}</span>
        </div>
        <p class="text-sm text-gray-500 mb-0">{{ shop.description || '—' }}</p>
      </div>
      <router-link
        v-if="shop.status === 1"
        :to="{ name: 'shop', params: { id: shop.id } }"
        class="btn btn-outline-main rounded-pill py-8 px-20 inline-flex items-center gap-8"
      >
        访问店铺 <i class="ph ph-arrow-square-out"></i>
      </router-link>
    </div>

    <h6 class="mb-12 flex items-center gap-12">
      <i class="ph ph-package text-main-600"></i> 店铺商品（{{ products.length }}）
    </h6>
    <EmptyState v-if="!products.length" icon="ph ph-package" title="暂无商品" />
    <ul v-else class="flex flex-col gap-8">
      <li v-for="p in products" :key="p.id"
          class="border border-gray-100 rounded-12 p-12 flex items-center gap-12 flex-wrap">
        <div class="w-48 h-48 rounded-8 bg-color-one flex items-center justify-center overflow-hidden flex-shrink-0">
          <img v-if="p.image" :src="p.image" :alt="p.name" class="w-full h-full object-cover">
          <i v-else class="ph ph-package text-gray-400 text-xl"></i>
        </div>
        <div class="flex-1 min-w-0">
          <h6 class="text-sm mb-0 text-line-1">{{ p.name }}</h6>
          <span class="text-xs text-gray-500">¥{{ Number(p.price).toFixed(2) }} · 库存 {{ p.stock_count || 0 }} · 已售 {{ p.sales_count || 0 }}</span>
        </div>
        <span :class="p.is_active ? 'text-main-600' : 'text-gray-400'" class="text-xs">
          <i :class="p.is_active ? 'ph ph-check-circle' : 'ph ph-x-circle'"></i>
          {{ p.is_active ? '上架中' : '已下架' }}
        </span>
      </li>
    </ul>
  </template>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/utils/api'
import EmptyState from '@/components/EmptyState.vue'

const shop = ref(null)
const products = ref([])
const loading = ref(true)

// Status is int: 0=pending, 1=approved, 2=rejected, 3=blocked
const STATUS = {
  0: { text: '审核中', cls: 'bg-warning-50 text-warning-600' },
  1: { text: '已通过', cls: 'bg-main-50 text-main-600' },
  2: { text: '已驳回', cls: 'bg-danger-50 text-danger-600' },
  3: { text: '已封禁', cls: 'bg-danger-50 text-danger-600' },
}

onMounted(async () => {
  loading.value = true
  try {
    const r = await api.get('/api/shop/me')
    shop.value = r.data?.shop || r.data
    if (shop.value) {
      const pr = await api.get('/api/shop/me/products')
      products.value = pr.data || []
    }
  } catch (_) { shop.value = null }
  finally { loading.value = false }
})
</script>
