<template>
  <h5 class="mb-24">提现审核</h5>

  <div class="flex flex-wrap items-center gap-8 mb-24">
    <button v-for="s in TABS" :key="s.value" type="button"
            :class="filterStatus === s.value ? 'btn-main' : 'btn-outline-main'"
            class="btn rounded-pill py-6 px-16 text-sm"
            @click="filterStatus = s.value">{{ s.label }}</button>
  </div>

  <div v-if="loading" class="py-40 text-center text-gray-400">
    <i class="ph ph-circle-notch text-3xl animate-spin"></i>
  </div>

  <table v-else class="w-full text-sm">
    <thead>
      <tr class="border-b border-gray-100 text-left text-gray-500">
        <th class="py-12 px-8">ID</th>
        <th class="py-12 px-8">用户</th>
        <th class="py-12 px-8">金额</th>
        <th class="py-12 px-8">收款方式</th>
        <th class="py-12 px-8">收款账号</th>
        <th class="py-12 px-8">状态</th>
        <th class="py-12 px-8">申请时间</th>
        <th class="py-12 px-8 text-right">操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="w in list" :key="w.id" class="border-b border-gray-100 hover-bg-color-one">
        <td class="py-12 px-8 font-mono text-xs">{{ w.id }}</td>
        <td class="py-12 px-8">{{ w.username || w.user_id }}</td>
        <td class="py-12 px-8 text-main-600 fw-bold">¥{{ Number(w.amount).toFixed(2) }}</td>
        <td class="py-12 px-8">{{ w.method }}</td>
        <td class="py-12 px-8 text-xs">{{ w.account }}</td>
        <td class="py-12 px-8">
          <span :class="STATUS[w.status]?.cls" class="text-xs py-2 px-8 rounded-pill">{{ STATUS[w.status]?.text || w.status }}</span>
        </td>
        <td class="py-12 px-8 text-xs text-gray-400">{{ formatDate(w.created_at) }}</td>
        <td class="py-12 px-8 text-right whitespace-nowrap">
          <template v-if="w.status === 0">
            <button type="button" class="text-main-600 me-12" @click="act(w, 'approve')"><i class="ph ph-check"></i> 通过</button>
            <button type="button" class="text-danger-600" @click="act(w, 'reject')"><i class="ph ph-x"></i> 驳回</button>
          </template>
        </td>
      </tr>
    </tbody>
  </table>

  <Pagination v-model="page" :total="total" :page-size="pageSize" />
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import api from '@/utils/api'
import Pagination from '@/components/Pagination.vue'
import { useToastStore } from '@/stores/toast'
import { formatDate } from '@/utils/helpers'

const toast = useToastStore()
const list = ref([])
const total = ref(0)
const page = ref(1)
const pageSize = 20
const loading = ref(true)
const filterStatus = ref(-1)

const TABS = [
  { value: 0, label: '待审核' },
  { value: 1, label: '已完成' },
  { value: 2, label: '已驳回' },
  { value: 3, label: '处理中' },
  { value: -1, label: '全部' },
]

// Status is int: 0=pending, 1=completed, 2=rejected, 3=processing
const STATUS = {
  0: { text: '审核中', cls: 'bg-warning-50 text-warning-600' },
  1: { text: '已完成', cls: 'bg-main-50 text-main-600' },
  2: { text: '已驳回', cls: 'bg-danger-50 text-danger-600' },
  3: { text: '处理中', cls: 'bg-main-50 text-main-600' },
}

async function load() {
  loading.value = true
  try {
    const params = { page: page.value, page_size: pageSize }
    if (filterStatus.value >= 0) params.status = filterStatus.value
    const r = await api.get('/api/admin/withdrawals', { params })
    list.value = r.data?.data || []
    total.value = r.data?.total || 0
  } finally { loading.value = false }
}

async function act(w, action) {
  if (!confirm('确认操作？')) return
  try {
    await api.post(`/api/admin/withdrawals/${w.id}/${action}`)
    toast.success('操作成功')
    load()
  } catch (e) { toast.error(e.response?.data?.error || '操作失败') }
}

watch([page, filterStatus], () => { load() })
onMounted(load)
</script>
