<template>
  <h5 class="mb-24">订单管理</h5>

  <div class="border border-gray-100 rounded-12 p-16 mb-24 flex flex-wrap items-center gap-12">
    <select v-model.number="filterStatus" class="common-input w-[180px]">
      <option :value="-1">全部状态</option>
      <option :value="0">待支付</option>
      <option :value="1">已支付</option>
      <option :value="2">已完成</option>
      <option :value="3">已取消</option>
      <option :value="4">已退款</option>
    </select>
    <button type="button" class="btn btn-main rounded-pill py-8 px-20" @click="page = 1; load()">查询</button>
  </div>

  <div v-if="loading" class="py-40 text-center text-gray-400">
    <i class="ph ph-circle-notch text-3xl animate-spin"></i>
  </div>

  <table v-else class="w-full text-sm">
    <thead>
      <tr class="border-b border-gray-100 text-left text-gray-500">
        <th class="py-12 px-8">订单号</th>
        <th class="py-12 px-8">用户</th>
        <th class="py-12 px-8">商品</th>
        <th class="py-12 px-8">数量</th>
        <th class="py-12 px-8">金额</th>
        <th class="py-12 px-8">状态</th>
        <th class="py-12 px-8">时间</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="o in list" :key="o.id" class="border-b border-gray-100 hover-bg-color-one">
        <td class="py-12 px-8 font-mono text-xs">
          <router-link :to="{ name: 'order-detail', params: { orderNo: o.order_no } }" class="text-main-600 hover-text-main-800">
            {{ o.order_no }}
          </router-link>
        </td>
        <td class="py-12 px-8">{{ o.username || o.user_id }}</td>
        <td class="py-12 px-8 text-line-1 max-w-[180px]">{{ o.product_name }}</td>
        <td class="py-12 px-8">{{ o.quantity }}</td>
        <td class="py-12 px-8 text-main-600 fw-bold">¥{{ Number(o.total_amount || 0).toFixed(2) }}</td>
        <td class="py-12 px-8">
          <span :class="STATUS[o.status]?.cls || 'bg-gray-100 text-gray-500'"
                class="text-xs py-2 px-8 rounded-pill">{{ STATUS[o.status]?.text || o.status }}</span>
        </td>
        <td class="py-12 px-8 text-xs text-gray-400">{{ formatDate(o.created_at) }}</td>
      </tr>
    </tbody>
  </table>

  <Pagination v-model="page" :total="total" :page-size="pageSize" />
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import api from '@/utils/api'
import Pagination from '@/components/Pagination.vue'
import { formatDate } from '@/utils/helpers'

const list = ref([])
const total = ref(0)
const page = ref(1)
const pageSize = 20
const loading = ref(true)
const filterStatus = ref(-1)

const STATUS = {
  0: { text: '待支付', cls: 'bg-warning-50 text-warning-600' },
  1: { text: '已支付', cls: 'bg-main-50 text-main-600' },
  2: { text: '已完成', cls: 'bg-main-50 text-main-600' },
  3: { text: '已取消', cls: 'bg-gray-100 text-gray-500' },
  4: { text: '已退款', cls: 'bg-danger-50 text-danger-600' },
}

async function load() {
  loading.value = true
  try {
    const params = { page: page.value, page_size: pageSize }
    if (filterStatus.value >= 0) params.status = filterStatus.value
    const r = await api.get('/api/admin/orders', { params })
    list.value = r.data?.orders || []
    total.value = r.data?.total || 0
  } finally { loading.value = false }
}

watch(page, load)
onMounted(load)
</script>
