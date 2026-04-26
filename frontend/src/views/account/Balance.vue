<template>
  <h5 class="mb-24">我的余额</h5>

  <div class="grid gap-16 mb-32" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))">
    <div class="border border-gray-100 rounded-12 p-24 bg-gradient-to-r from-main-600 to-main-800 text-white">
      <span class="text-sm opacity-75 block mb-8">可用余额</span>
      <h3 class="mb-0 text-white">¥{{ Number(balance.balance || 0).toFixed(2) }}</h3>
    </div>
    <div class="border border-gray-100 rounded-12 p-24">
      <span class="text-sm text-gray-500 block mb-8">累计收入</span>
      <h4 class="mb-0">¥{{ Number(balance.total_income || 0).toFixed(2) }}</h4>
    </div>
    <div class="border border-gray-100 rounded-12 p-24">
      <span class="text-sm text-gray-500 block mb-8">累计提现</span>
      <h4 class="mb-0">¥{{ Number(balance.total_withdrawn || 0).toFixed(2) }}</h4>
    </div>
  </div>

  <div class="flex items-center gap-12 mb-24">
    <router-link :to="{ name: 'account-withdrawals' }" class="btn btn-main rounded-pill py-10 px-24 inline-flex items-center gap-8">
      <i class="ph ph-arrow-square-out"></i> 申请提现
    </router-link>
  </div>

  <h6 class="mb-12 flex items-center gap-12">
    <i class="ph ph-clock-counter-clockwise text-main-600"></i> 资金流水
  </h6>

  <EmptyState v-if="!txs.length" icon="ph ph-coins" title="暂无流水" />

  <ul v-else class="flex flex-col gap-8">
    <li v-for="t in txs" :key="t.id"
        class="border border-gray-100 rounded-12 p-12 flex items-center justify-between gap-12 flex-wrap">
      <div class="min-w-0">
        <h6 class="text-sm mb-4">{{ t.description || t.type }}</h6>
        <span class="text-xs text-gray-400">{{ formatDate(t.created_at) }}</span>
      </div>
      <span class="text-md fw-bold" :class="(Number(t.amount) >= 0) ? 'text-main-600' : 'text-danger-600'">
        {{ Number(t.amount) >= 0 ? '+' : '' }}¥{{ Number(t.amount || 0).toFixed(2) }}
      </span>
    </li>
  </ul>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/utils/api'
import EmptyState from '@/components/EmptyState.vue'
import { formatDate } from '@/utils/helpers'

const balance = ref({})
const txs = ref([])

onMounted(async () => {
  try {
    const [b, t] = await Promise.all([
      api.get('/api/balance'),
      api.get('/api/balance/txs').catch(() => ({ data: [] })),
    ])
    balance.value = b.data || {}
    txs.value = t.data?.data || []
  } catch (_) { /* tolerate */ }
})
</script>
