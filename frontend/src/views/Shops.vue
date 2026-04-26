<template>
  <section class="py-40 bg-color-one">
    <div class="container container-lg">
      <ul class="flex items-center gap-8 text-sm text-gray-500">
        <li><router-link :to="{ name: 'home' }" class="hover-text-main-600">首页</router-link></li>
        <li><i class="ph ph-caret-right text-xs"></i></li>
        <li class="text-heading">所有店铺</li>
      </ul>
    </div>
  </section>

  <section class="py-40">
    <div class="container container-lg">
      <div class="flex-between flex-wrap gap-16 mb-32">
        <h4 class="mb-0">店铺列表</h4>
        <div class="flex items-center gap-8">
          <input
            v-model="keyword"
            type="text"
            class="common-input rounded-pill py-10 px-20"
            placeholder="搜索店铺名…"
            style="min-width:240px"
          >
        </div>
      </div>

      <div v-if="loading" class="py-80 text-center text-gray-400">
        <i class="ph ph-circle-notch text-3xl animate-spin"></i>
      </div>

      <EmptyState v-else-if="!filtered.length" icon="ph ph-storefront" title="暂无店铺" />

      <div v-else class="grid gap-16" style="grid-template-columns: repeat(auto-fill, minmax(260px, 1fr))">
        <ShopCard v-for="s in filtered" :key="s.id" :shop="s" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '@/utils/api'
import ShopCard from '@/components/ShopCard.vue'
import EmptyState from '@/components/EmptyState.vue'

const shops = ref([])
const loading = ref(true)
const keyword = ref('')

const filtered = computed(() => {
  const k = keyword.value.trim().toLowerCase()
  if (!k) return shops.value
  return shops.value.filter(s => (s.name || '').toLowerCase().includes(k))
})

onMounted(async () => {
  loading.value = true
  try {
    const r = await api.get('/api/shops')
    shops.value = r.data?.data || []
  } finally {
    loading.value = false
  }
})
</script>
