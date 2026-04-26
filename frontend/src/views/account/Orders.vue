<template>
  <h5 class="mb-24">我的订单</h5>

  <div class="flex items-center gap-8 mb-24 flex-wrap">
    <button
      v-for="t in tabs"
      :key="t.value"
      type="button"
      class="py-8 px-20 rounded-pill text-sm border"
      :class="filter === t.value ? 'bg-main-600 text-white border-main-600' : 'bg-white text-gray-700 border-gray-100 hover-border-main-600'"
      @click="filter = t.value"
    >{{ t.label }}</button>
  </div>

  <div v-if="loading" class="py-40 text-center text-gray-400">
    <i class="ph ph-circle-notch text-3xl animate-spin"></i>
  </div>

  <EmptyState v-else-if="!visible.length" icon="ph ph-receipt" title="暂无订单" />

  <ul v-else class="flex flex-col gap-12">
    <li v-for="o in visible" :key="o.id"
        class="border border-gray-100 rounded-12 p-16 flex items-center justify-between gap-12 flex-wrap hover-border-main-600 transition-2">
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-12 mb-4 flex-wrap">
          <span class="font-mono text-sm text-gray-700">{{ o.order_no }}</span>
          <span :class="statusOf(o).cls" class="text-xs py-2 px-8 rounded-pill">{{ statusOf(o).text }}</span>
          <span class="text-xs text-gray-400">{{ formatDate(o.created_at) }}</span>
        </div>
        <span class="text-sm text-gray-500 text-line-1">{{ o.product?.name || '商品' }} × {{ o.quantity }}</span>
      </div>
      <div class="flex items-center gap-12">
        <span class="text-md fw-bold text-main-600">¥{{ Number(o.total_amount || 0).toFixed(2) }}</span>
        <router-link :to="{ name: 'order-detail', params: { orderNo: o.order_no } }"
                     class="btn btn-outline-main rounded-pill py-6 px-16 text-sm">详情</router-link>
      </div>
    </li>
  </ul>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '@/utils/api'
import EmptyState from '@/components/EmptyState.vue'
import { formatDate } from '@/utils/helpers'

const orders = ref([])
const loading = ref(true)
const filter = ref('all')

const tabs = [
  { label: '全部', value: 'all' },
  { label: '待支付', value: '0' },
  { label: '已支付', value: '1' },
  { label: '已完成', value: '2' },
  { label: '已取消', value: '3' },
]

const STATUS = {
  0: { text: '待支付', cls: 'bg-warning-50 text-warning-600' },
  1: { text: '已支付', cls: 'bg-main-50 text-main-600' },
  2: { text: '已完成', cls: 'bg-main-50 text-main-600' },
  3: { text: '已取消', cls: 'bg-gray-100 text-gray-600' },
  4: { text: '已退款', cls: 'bg-gray-100 text-gray-600' },
}
function statusOf(o) { return STATUS[o.status] || STATUS[0] }

const visible = computed(() => {
  if (filter.value === 'all') return orders.value
  return orders.value.filter(o => String(o.status) === filter.value)
})

onMounted(async () => {
  loading.value = true
  try {
    const r = await api.get('/api/orders')
    orders.value = r.data || []
  } finally { loading.value = false }
})
</script>
