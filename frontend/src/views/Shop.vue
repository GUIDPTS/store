<template>
  <div v-if="loading" class="py-80 text-center text-gray-400">
    <i class="ph ph-circle-notch text-3xl animate-spin"></i>
  </div>

  <template v-else-if="shop">
    <!-- Banner -->
    <section class="py-40 bg-gradient-to-r from-main-50 to-main-100">
      <div class="container container-lg">
        <div class="flex items-center gap-24 flex-wrap">
          <div class="w-[120px] h-[120px] rounded-[50%] bg-white border-4 border-white shadow-md flex items-center justify-center overflow-hidden flex-shrink-0">
            <img v-if="shop.logo" :src="shop.logo" :alt="shop.name" class="w-full h-full object-cover">
            <i v-else class="ph-fill ph-storefront text-main-600" style="font-size:64px"></i>
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="mb-8">{{ shop.name }}</h3>
            <p class="text-gray-700 mb-12">{{ shop.description || '欢迎光临本店' }}</p>
            <div class="flex items-center gap-16 flex-wrap text-sm text-gray-600">
              <span class="flex items-center gap-4">
                <i class="ph ph-package text-main-600"></i>
                {{ products.length }} 件商品
              </span>
              <span class="flex items-center gap-4">
                <i class="ph ph-fire text-main-600"></i>
                销量 {{ totalSales }}
              </span>
              <span v-if="shop.created_at" class="flex items-center gap-4">
                <i class="ph ph-calendar text-main-600"></i>
                入驻 {{ formatDate(shop.created_at, 'YYYY-MM-DD') }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Products -->
    <section class="py-40">
      <div class="container container-lg">
        <div class="flex-between flex-wrap gap-16 mb-24">
          <h5 class="mb-0">店铺商品</h5>
          <span class="text-gray-500 text-sm">共 {{ products.length }} 件</span>
        </div>
        <EmptyState v-if="!products.length" icon="ph ph-package" title="该店铺暂无商品" />
        <div v-else class="grid gap-16" style="grid-template-columns: repeat(auto-fill, minmax(220px, 1fr))">
          <ProductCard v-for="p in products" :key="p.id" :product="p" />
        </div>
      </div>
    </section>
  </template>

  <EmptyState v-else icon="ph ph-warning-circle" title="店铺不存在">
    <router-link :to="{ name: 'shops' }" class="btn btn-main rounded-pill px-24 py-10">返回店铺列表</router-link>
  </EmptyState>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/utils/api'
import ProductCard from '@/components/ProductCard.vue'
import EmptyState from '@/components/EmptyState.vue'
import { formatDate } from '@/utils/helpers'

const route = useRoute()
const shop = ref(null)
const products = ref([])
const loading = ref(true)

const totalSales = computed(() => products.value.reduce((s, p) => s + (Number(p.sales_count) || 0), 0))

async function load(id) {
  loading.value = true
  try {
    const [s, p] = await Promise.all([
      api.get(`/api/shops/${id}`),
      api.get(`/api/shops/${id}/products`),
    ])
    shop.value = s.data?.shop || s.data
    products.value = p.data?.products || p.data || []
  } catch (_) {
    shop.value = null
  } finally {
    loading.value = false
  }
}

watch(() => route.params.id, id => id && load(id))
onMounted(() => load(route.params.id))
</script>
