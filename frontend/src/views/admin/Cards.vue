<template>
  <div class="flex-between flex-wrap gap-12 mb-24">
    <h5 class="mb-0">卡密管理</h5>
    <button type="button" class="btn btn-main rounded-pill py-8 px-20 inline-flex items-center gap-8" @click="openImport">
      <i class="ph ph-upload"></i> 批量导入
    </button>
  </div>

  <div class="border border-gray-100 rounded-12 p-16 mb-24 flex flex-wrap items-center gap-12">
    <label class="text-sm text-gray-500">商品筛选：</label>
    <select v-model.number="filterProduct" class="common-input flex-1 min-w-[200px]">
      <option :value="0">全部商品</option>
      <option v-for="p in products" :key="p.id" :value="p.id">{{ p.name }}</option>
    </select>
    <select v-model="filterStatus" class="common-input w-[160px]">
      <option value="">全部状态</option>
      <option value="unused">未使用</option>
      <option value="used">已使用</option>
    </select>
  </div>

  <div v-if="loading" class="py-40 text-center text-gray-400">
    <i class="ph ph-circle-notch text-3xl animate-spin"></i>
  </div>

  <table v-else class="w-full text-sm">
    <thead>
      <tr class="border-b border-gray-100 text-left text-gray-500">
        <th class="py-12 px-8">ID</th>
        <th class="py-12 px-8">商品</th>
        <th class="py-12 px-8">卡密</th>
        <th class="py-12 px-8">状态</th>
        <th class="py-12 px-8">使用时间</th>
        <th class="py-12 px-8 text-right">操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="k in list" :key="k.id" class="border-b border-gray-100 hover-bg-color-one">
        <td class="py-12 px-8 font-mono text-xs">{{ k.id }}</td>
        <td class="py-12 px-8 text-line-1">{{ productName(k.product_id) }}</td>
        <td class="py-12 px-8 font-mono text-xs">{{ k.content }}</td>
        <td class="py-12 px-8">
          <span :class="k.status === 'used' ? 'bg-gray-100 text-gray-500' : 'bg-main-50 text-main-600'"
                class="text-xs py-2 px-8 rounded-pill">{{ k.status === 'used' ? '已使用' : '未使用' }}</span>
        </td>
        <td class="py-12 px-8 text-xs text-gray-400">{{ k.used_at ? formatDate(k.used_at) : '—' }}</td>
        <td class="py-12 px-8 text-right">
          <button v-if="k.status !== 'used'" type="button" class="text-danger-600" @click="del(k)"><i class="ph ph-trash"></i></button>
        </td>
      </tr>
    </tbody>
  </table>

  <Pagination v-model="page" :total="total" :page-size="pageSize" />

  <Transition name="page">
    <div v-if="modal" class="fixed inset-0 z-[10000] flex items-center justify-center" style="background:rgba(0,0,0,.4)" @click.self="modal = false">
      <div class="bg-white rounded-16 p-32 w-full max-w-[560px]">
        <h6 class="text-lg mb-16">批量导入卡密</h6>
        <form @submit.prevent="doImport">
          <div class="mb-16">
            <label class="text-md mb-8 font-[500] block">商品 <span class="text-danger">*</span></label>
            <select v-model.number="importForm.product_id" required class="common-input">
              <option :value="0">— 选择商品 —</option>
              <option v-for="p in products" :key="p.id" :value="p.id">{{ p.name }}</option>
            </select>
          </div>
          <div class="mb-16">
            <label class="text-md mb-8 font-[500] block">卡密内容（每行一条）<span class="text-danger">*</span></label>
            <textarea v-model="importForm.content" required class="common-input font-mono text-xs" rows="10" placeholder="ABC-DEF-123&#10;XYZ-789-456"></textarea>
          </div>
          <div class="flex items-center gap-12 mt-24">
            <button type="submit" class="btn btn-main rounded-pill py-10 px-24" :disabled="saving">{{ saving ? '导入中…' : '导入' }}</button>
            <button type="button" class="btn rounded-pill py-10 px-24 border border-gray-100" @click="modal = false">取消</button>
          </div>
        </form>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/utils/api'
import { useToastStore } from '@/stores/toast'
import Pagination from '@/components/Pagination.vue'
import { formatDate } from '@/utils/helpers'

const route = useRoute()
const toast = useToastStore()
const list = ref([])
const total = ref(0)
const page = ref(1)
const pageSize = 30
const loading = ref(true)
const modal = ref(false)
const saving = ref(false)
const products = ref([])
const filterProduct = ref(Number(route.query.product_id) || 0)
const filterStatus = ref('')
const importForm = ref({ product_id: 0, content: '' })

function productName(id) { return products.value.find(p => p.id === id)?.name || '—' }

async function load() {
  loading.value = true
  try {
    const params = { page: page.value, page_size: pageSize }
    if (filterProduct.value) params.product_id = filterProduct.value
    if (filterStatus.value) params.status = filterStatus.value
    const r = await api.get('/api/admin/card-keys', { params })
    list.value = r.data?.card_keys || r.data?.cards || []
    total.value = r.data?.total || 0
  } finally { loading.value = false }
}

async function loadProducts() {
  const r = await api.get('/api/admin/products', { params: { page_size: 1000 } })
  products.value = r.data?.products || []
}

function openImport() {
  importForm.value = { product_id: filterProduct.value || 0, content: '' }
  modal.value = true
}

async function doImport() {
  saving.value = true
  try {
    const lines = importForm.value.content.split('\n').map(s => s.trim()).filter(Boolean)
    await api.post('/api/admin/card-keys', { product_id: importForm.value.product_id, cards: lines })
    toast.success(`已导入 ${lines.length} 条`)
    modal.value = false
    load()
  } catch (e) { toast.error(e.response?.data?.error || '导入失败') }
  finally { saving.value = false }
}

async function del(k) {
  if (!confirm('确认删除？')) return
  try {
    await api.delete(`/api/admin/card-keys/${k.id}`)
    toast.success('已删除')
    load()
  } catch (e) { toast.error(e.response?.data?.error || '删除失败') }
}

watch([page, filterProduct, filterStatus], load)
onMounted(() => { loadProducts(); load() })
</script>
