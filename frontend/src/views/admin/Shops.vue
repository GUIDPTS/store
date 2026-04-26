<template>
  <h5 class="mb-24">店铺审核</h5>

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
        <th class="py-12 px-8">店铺</th>
        <th class="py-12 px-8">店主</th>
        <th class="py-12 px-8">联系方式</th>
        <th class="py-12 px-8">状态</th>
        <th class="py-12 px-8">申请时间</th>
        <th class="py-12 px-8 text-right">操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="s in list" :key="s.id" class="border-b border-gray-100 hover-bg-color-one">
        <td class="py-12 px-8 font-mono text-xs">{{ s.id }}</td>
        <td class="py-12 px-8">
          <div class="flex items-center gap-8">
            <img v-if="s.logo" :src="s.logo" alt="" class="w-32 h-32 rounded-8 object-cover">
            <div v-else class="w-32 h-32 rounded-8 bg-main-100 text-main-600 flex items-center justify-center"><i class="ph-fill ph-storefront"></i></div>
            <span class="text-line-1">{{ s.name }}</span>
          </div>
        </td>
        <td class="py-12 px-8">{{ s.owner_name || s.user_id }}</td>
        <td class="py-12 px-8 text-xs">{{ s.contact || '—' }}</td>
        <td class="py-12 px-8">
          <span :class="STATUS[s.status]?.cls" class="text-xs py-2 px-8 rounded-pill">{{ STATUS[s.status]?.text || s.status }}</span>
        </td>
        <td class="py-12 px-8 text-xs text-gray-400">{{ formatDate(s.created_at) }}</td>
        <td class="py-12 px-8 text-right whitespace-nowrap">
          <template v-if="s.status === 0">
            <button type="button" class="text-main-600 me-12" @click="act(s, 'approve')"><i class="ph ph-check"></i> 通过</button>
            <button type="button" class="text-danger-600" @click="act(s, 'reject')"><i class="ph ph-x"></i> 驳回</button>
          </template>
          <template v-else-if="s.status === 1">
            <button type="button" class="text-danger-600" @click="act(s, 'block')"><i class="ph ph-prohibit"></i> 封禁</button>
          </template>
          <template v-else-if="s.status === 3">
            <button type="button" class="text-main-600" @click="act(s, 'approve')"><i class="ph ph-check-circle"></i> 解封</button>
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
  { value: 1, label: '已通过' },
  { value: 2, label: '已驳回' },
  { value: 3, label: '已封禁' },
  { value: -1, label: '全部' },
]

// Status is int: 0=pending, 1=approved, 2=rejected, 3=blocked
const STATUS = {
  0: { text: '审核中', cls: 'bg-warning-50 text-warning-600' },
  1: { text: '已通过', cls: 'bg-main-50 text-main-600' },
  2: { text: '已驳回', cls: 'bg-danger-50 text-danger-600' },
  3: { text: '已封禁', cls: 'bg-danger-50 text-danger-600' },
}

async function load() {
  loading.value = true
  try {
    const params = { page: page.value, page_size: pageSize }
    if (filterStatus.value >= 0) params.status = filterStatus.value
    const r = await api.get('/api/admin/shops', { params })
    list.value = r.data?.data || []
    total.value = r.data?.total || 0
  } finally { loading.value = false }
}

async function act(s, action) {
  if (!confirm('确认操作？')) return
  try {
    await api.post(`/api/admin/shops/${s.id}/${action}`)
    toast.success('操作成功')
    load()
  } catch (e) { toast.error(e.response?.data?.error || '操作失败') }
}

watch([page, filterStatus], () => { page.value = page.value; load() })
onMounted(load)
</script>
