<template>
  <h5 class="mb-24">账户概览</h5>
  <div class="grid gap-16 mb-32" style="grid-template-columns: repeat(auto-fit, minmax(180px, 1fr))">
    <div class="border border-gray-100 rounded-12 p-20">
      <div class="flex items-center justify-between mb-8">
        <span class="text-sm text-gray-500">余额</span>
        <i class="ph ph-wallet text-main-600 text-2xl"></i>
      </div>
      <h4 class="mb-0 text-main-600">¥{{ balance.toFixed(2) }}</h4>
    </div>
    <div class="border border-gray-100 rounded-12 p-20">
      <div class="flex items-center justify-between mb-8">
        <span class="text-sm text-gray-500">订单总数</span>
        <i class="ph ph-receipt text-main-600 text-2xl"></i>
      </div>
      <h4 class="mb-0">{{ orders.length }}</h4>
    </div>
    <div class="border border-gray-100 rounded-12 p-20">
      <div class="flex items-center justify-between mb-8">
        <span class="text-sm text-gray-500">已完成订单</span>
        <i class="ph ph-check-circle text-main-600 text-2xl"></i>
      </div>
      <h4 class="mb-0">{{ completedCount }}</h4>
    </div>
    <div class="border border-gray-100 rounded-12 p-20">
      <div class="flex items-center justify-between mb-8">
        <span class="text-sm text-gray-500">累计消费</span>
        <i class="ph ph-currency-circle-dollar text-main-600 text-2xl"></i>
      </div>
      <h4 class="mb-0">¥{{ totalSpent.toFixed(2) }}</h4>
    </div>
  </div>

  <h6 class="mb-16 flex items-center gap-12">
    <i class="ph ph-clock-counter-clockwise text-main-600"></i> 最近订单
  </h6>
  <EmptyState v-if="!recent.length" icon="ph ph-receipt" title="还没有订单">
    <router-link :to="{ name: 'home' }" class="btn btn-main rounded-pill py-10 px-24">去逛逛</router-link>
  </EmptyState>
  <ul v-else class="flex flex-col gap-12">
    <li v-for="o in recent" :key="o.id" class="border border-gray-100 rounded-12 p-16 flex items-center justify-between gap-12 flex-wrap">
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-12 mb-4 flex-wrap">
          <span class="font-mono text-sm text-gray-700">{{ o.order_no }}</span>
          <span :class="statusOf(o).cls" class="text-xs py-2 px-8 rounded-pill">{{ statusOf(o).text }}</span>
        </div>
        <span class="text-sm text-gray-500 text-line-1">{{ o.product?.name || '商品' }} × {{ o.quantity }}</span>
      </div>
      <div class="flex items-center gap-12">
        <span class="text-md fw-bold text-main-600">¥{{ Number(o.total_amount || 0).toFixed(2) }}</span>
        <router-link :to="{ name: 'order-detail', params: { orderNo: o.order_no } }" class="btn btn-outline-main rounded-pill py-6 px-16 text-sm">查看</router-link>
      </div>
    </li>
  </ul>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '@/utils/api'
import EmptyState from '@/components/EmptyState.vue'

const orders = ref([])
const balance = ref(0)

const completedCount = computed(() => orders.value.filter(o => o.status === 1 || o.status === 2).length)
const totalSpent = computed(() => orders.value.filter(o => o.status === 1 || o.status === 2)
  .reduce((s, o) => s + Number(o.total_amount || 0), 0))
const recent = computed(() => orders.value.slice(0, 5))

const STATUS = {
  0: { text: '待支付', cls: 'bg-warning-50 text-warning-600' },
  1: { text: '已支付', cls: 'bg-main-50 text-main-600' },
  2: { text: '已完成', cls: 'bg-main-50 text-main-600' },
  3: { text: '已取消', cls: 'bg-gray-100 text-gray-600' },
  4: { text: '已退款', cls: 'bg-gray-100 text-gray-600' },
}
function statusOf(o) { return STATUS[o.status] || STATUS[0] }

onMounted(async () => {
  try {
    const [o, b] = await Promise.all([
      api.get('/api/orders'),
      api.get('/api/balance').catch(() => ({ data: { balance: 0 } })),
    ])
    orders.value = o.data || []
    balance.value = Number(b.data?.balance || 0)
  } catch (_) { /* tolerate */ }
})
</script>
