<template>
  <h5 class="mb-24">管理仪表板</h5>

  <div v-if="loading" class="py-40 text-center text-gray-400">
    <i class="ph ph-circle-notch text-3xl animate-spin"></i>
  </div>

  <template v-else>
    <div class="grid gap-16 mb-32" style="grid-template-columns: repeat(auto-fit, minmax(180px, 1fr))">
      <div v-for="s in stats" :key="s.label"
           class="border border-gray-100 rounded-12 p-20 hover-border-main-600 transition-2">
        <div class="flex items-center justify-between mb-8">
          <span class="text-sm text-gray-500">{{ s.label }}</span>
          <i :class="s.icon" class="text-main-600 text-2xl"></i>
        </div>
        <h4 class="mb-0">{{ s.value }}</h4>
      </div>
    </div>
  </template>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '@/utils/api'

const data = ref({})
const loading = ref(true)

const stats = computed(() => {
  const s = data.value.stats || {}
  return [
    { label: '商品总数', value: s.products || 0, icon: 'ph ph-package' },
    { label: '订单总数', value: s.orders || 0, icon: 'ph ph-receipt' },
    { label: '用户总数', value: s.users || 0, icon: 'ph ph-users' },
    { label: '分类总数', value: s.categories || 0, icon: 'ph ph-tag' },
  ]
})

onMounted(async () => {
  try {
    const r = await api.get('/api/admin/dashboard')
    data.value = r.data || {}
  } finally { loading.value = false }
})
</script>
