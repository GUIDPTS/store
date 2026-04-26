<template>
  <section class="py-40 bg-color-one">
    <div class="container container-lg">
      <ul class="flex items-center gap-8 text-sm text-gray-500">
        <li><router-link :to="{ name: 'home' }" class="hover-text-main-600">首页</router-link></li>
        <li><i class="ph ph-caret-right text-xs"></i></li>
        <li class="text-heading">{{ category?.name || '分类' }}</li>
      </ul>
    </div>
  </section>

  <section class="py-40">
    <div class="container container-lg">
      <div class="flex-between flex-wrap gap-16 mb-32">
        <div>
          <h4 class="mb-4 flex items-center gap-12">
            <i :class="category?.icon || 'ph ph-tag'" class="text-main-600"></i>
            {{ category?.name || '加载中…' }}
          </h4>
          <p v-if="category?.description" class="text-gray-500 mb-0">{{ category.description }}</p>
        </div>
        <span class="text-gray-500">共 {{ products.length }} 件商品</span>
      </div>

      <div v-if="loading" class="text-center py-80 text-gray-400">
        <i class="ph ph-circle-notch text-3xl animate-spin"></i>
      </div>

      <EmptyState v-else-if="!products.length" icon="ph ph-package" title="该分类暂无商品" />

      <div v-else class="grid gap-16" style="grid-template-columns: repeat(auto-fill, minmax(220px, 1fr))">
        <ProductCard v-for="p in products" :key="p.id" :product="p" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/utils/api'
import ProductCard from '@/components/ProductCard.vue'
import EmptyState from '@/components/EmptyState.vue'

const route = useRoute()
const category = ref(null)
const products = ref([])
const loading = ref(true)

async function load(id) {
  loading.value = true
  try {
    const [c, p] = await Promise.all([
      api.get(`/api/categories/${id}`),
      api.get(`/api/products`, { params: { category_id: id } }),
    ])
    category.value = c.data
    products.value = p.data || []
  } catch (e) {
    products.value = []
  } finally {
    loading.value = false
  }
}

watch(() => route.params.id, (id) => id && load(id))
onMounted(() => load(route.params.id))
</script>
