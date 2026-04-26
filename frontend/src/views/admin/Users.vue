<template>
  <h5 class="mb-24">用户管理</h5>


  <div v-if="loading" class="py-40 text-center text-gray-400">
    <i class="ph ph-circle-notch text-3xl animate-spin"></i>
  </div>

  <table v-else class="w-full text-sm">
    <thead>
      <tr class="border-b border-gray-100 text-left text-gray-500">
        <th class="py-12 px-8">ID</th>
        <th class="py-12 px-8">头像</th>
        <th class="py-12 px-8">用户名</th>
        <th class="py-12 px-8">邮箱</th>
        <th class="py-12 px-8">角色</th>
        <th class="py-12 px-8">状态</th>
        <th class="py-12 px-8">注册时间</th>
        <th class="py-12 px-8 text-right">操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="u in list" :key="u.id" class="border-b border-gray-100 hover-bg-color-one">
        <td class="py-12 px-8 font-mono text-xs">{{ u.id }}</td>
        <td class="py-12 px-8">
          <img v-if="u.avatar_url" :src="u.avatar_url" alt="" class="w-32 h-32 rounded-[50%] object-cover">
          <div v-else class="w-32 h-32 rounded-[50%] bg-main-100 text-main-600 flex items-center justify-center"><i class="ph ph-user"></i></div>
        </td>
        <td class="py-12 px-8">{{ u.username || u.name }}</td>
        <td class="py-12 px-8 text-xs">{{ u.email || '—' }}</td>
        <td class="py-12 px-8">
          <span :class="u.is_admin ? 'bg-main-50 text-main-600' : 'bg-gray-50 text-gray-500'"
                class="text-xs py-2 px-8 rounded-pill">{{ u.is_admin ? '管理员' : '用户' }}</span>
        </td>
        <td class="py-12 px-8">
          <span :class="u.is_blocked ? 'bg-danger-50 text-danger-600' : 'bg-main-50 text-main-600'"
                class="text-xs py-2 px-8 rounded-pill">{{ u.is_blocked ? '封禁' : '正常' }}</span>
        </td>
        <td class="py-12 px-8 text-xs text-gray-400">{{ formatDate(u.created_at) }}</td>
        <td class="py-12 px-8 text-right">
          <button type="button" :class="u.is_blocked ? 'text-main-600' : 'text-danger-600'" @click="toggleBlock(u)">
            <i :class="u.is_blocked ? 'ph ph-check-circle' : 'ph ph-prohibit'"></i>
            {{ u.is_blocked ? '解封' : '封禁' }}
          </button>
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

async function load() {
  loading.value = true
  try {
    const params = { page: page.value, page_size: pageSize }
    const r = await api.get('/api/admin/users', { params })
    list.value = r.data?.users || []
    total.value = r.data?.total || 0
  } finally { loading.value = false }
}

async function toggleBlock(u) {
  const action = u.is_blocked ? '解封' : '封禁'
  if (!confirm(`${action}用户 ${u.username || u.name}？`)) return
  try {
    await api.put(`/api/admin/users/${u.id}`, { is_blocked: !u.is_blocked })
    toast.success(action + '成功')
    load()
  } catch (e) { toast.error(e.response?.data?.error || '操作失败') }
}

watch(page, load)
onMounted(load)
</script>
