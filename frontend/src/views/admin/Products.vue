<template>
  <div class="flex-between flex-wrap gap-12 mb-24">
    <h5 class="mb-0">商品管理</h5>
    <button type="button" class="btn btn-main rounded-pill py-8 px-20 inline-flex items-center gap-8" @click="openNew">
      <i class="ph ph-plus"></i> 新建商品
    </button>
  </div>

  <div v-if="loading" class="py-40 text-center text-gray-400">
    <i class="ph ph-circle-notch text-3xl animate-spin"></i>
  </div>

  <table v-else class="w-full text-sm">
    <thead>
      <tr class="border-b border-gray-100 text-left text-gray-500">
        <th class="py-12 px-8">ID</th>
        <th class="py-12 px-8">商品</th>
        <th class="py-12 px-8">分类</th>
        <th class="py-12 px-8">价格</th>
        <th class="py-12 px-8">库存</th>
        <th class="py-12 px-8">已售</th>
        <th class="py-12 px-8">状态</th>
        <th class="py-12 px-8 text-right">操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="p in list" :key="p.id" class="border-b border-gray-100 hover-bg-color-one">
        <td class="py-12 px-8 font-mono text-xs">{{ p.id }}</td>
        <td class="py-12 px-8">
          <div class="flex items-center gap-8">
            <div class="w-32 h-32 rounded-8 bg-color-one flex items-center justify-center overflow-hidden flex-shrink-0">
              <img v-if="p.image" :src="p.image" alt="" class="w-full h-full object-cover">
              <i v-else class="ph ph-package text-gray-400 text-md"></i>
            </div>
            <span class="text-line-1">{{ p.name }}</span>
          </div>
        </td>
        <td class="py-12 px-8">{{ categoryName(p.category_id) }}</td>
        <td class="py-12 px-8">¥{{ Number(p.price).toFixed(2) }}</td>
        <td class="py-12 px-8">{{ p.stock_count || 0 }}</td>
        <td class="py-12 px-8">{{ p.sales_count || 0 }}</td>
        <td class="py-12 px-8">
          <span :class="p.is_active ? 'bg-main-50 text-main-600' : 'bg-gray-100 text-gray-500'"
                class="text-xs py-2 px-8 rounded-pill">{{ p.is_active ? '上架' : '下架' }}</span>
        </td>
        <td class="py-12 px-8 text-right whitespace-nowrap">
          <button type="button" class="text-main-600 me-12" @click="openEdit(p)"><i class="ph ph-pencil"></i></button>
          <router-link :to="{ name: 'admin-cards', query: { product_id: p.id } }" class="text-main-600 me-12"><i class="ph ph-key"></i> 卡密</router-link>
          <button type="button" class="text-danger-600" @click="del(p)"><i class="ph ph-trash"></i></button>
        </td>
      </tr>
    </tbody>
  </table>

  <Pagination v-model="page" :total="total" :page-size="pageSize" />

  <Transition name="page">
    <div v-if="modal" class="fixed inset-0 z-[10000] flex items-center justify-center" style="background:rgba(0,0,0,.4)" @click.self="modal = false">
      <div class="bg-white rounded-16 p-32 w-full max-w-[560px] max-h-[90vh] overflow-y-auto">
        <h6 class="text-lg mb-16">{{ form.id ? '编辑商品' : '新建商品' }}</h6>
        <form @submit.prevent="save">
          <div class="mb-16">
            <label class="text-md mb-8 font-[500] block">商品名称 <span class="text-danger">*</span></label>
            <input v-model="form.name" required type="text" class="common-input">
          </div>
          <div class="mb-16">
            <label class="text-md mb-8 font-[500] block">分类 <span class="text-danger">*</span></label>
            <select v-model.number="form.category_id" required class="common-input">
              <option :value="0">— 选择分类 —</option>
              <option v-for="c in categories" :key="c.id" :value="c.id">{{ c.name }}</option>
            </select>
          </div>
          <div class="flex gap-16 mb-16">
            <div class="flex-1">
              <label class="text-md mb-8 font-[500] block">售价 <span class="text-danger">*</span></label>
              <input v-model.number="form.price" required type="number" step="0.01" class="common-input">
            </div>
            <div class="flex-1">
              <label class="text-md mb-8 font-[500] block">原价</label>
              <input v-model.number="form.orig_price" type="number" step="0.01" class="common-input">
            </div>
          </div>
          <div class="mb-16">
            <label class="text-md mb-8 font-[500] block">商品图片 URL</label>
            <input v-model="form.image" type="url" class="common-input" placeholder="https://...">
          </div>
          <div class="mb-16">
            <label class="text-md mb-8 font-[500] block">商品描述</label>
            <textarea v-model="form.description" class="common-input" rows="4"></textarea>
          </div>
          <div class="flex gap-16 mb-16">
            <div class="flex-1">
              <label class="text-md mb-8 font-[500] block">排序</label>
              <input v-model.number="form.sort" type="number" class="common-input">
            </div>
            <div class="flex-1">
              <label class="text-md mb-8 font-[500] block">状态</label>
              <select v-model="form.is_active" class="common-input">
                <option :value="true">上架</option>
                <option :value="false">下架</option>
              </select>
            </div>
          </div>
          <div class="flex items-center gap-12 mt-24">
            <button type="submit" class="btn btn-main rounded-pill py-10 px-24" :disabled="saving">{{ saving ? '保存中…' : '保存' }}</button>
            <button type="button" class="btn rounded-pill py-10 px-24 border border-gray-100" @click="modal = false">取消</button>
          </div>
        </form>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import api from '@/utils/api'
import { useToastStore } from '@/stores/toast'
import Pagination from '@/components/Pagination.vue'

const toast = useToastStore()
const list = ref([])
const total = ref(0)
const page = ref(1)
const pageSize = 20
const loading = ref(true)
const modal = ref(false)
const saving = ref(false)
const categories = ref([])
const form = ref(blankForm())

function blankForm() {
  return { id: 0, category_id: 0, name: '', description: '', price: 0, orig_price: 0, image: '', sort: 0, is_active: true }
}

function categoryName(id) {
  return categories.value.find(c => c.id === id)?.name || '—'
}

async function load() {
  loading.value = true
  try {
    const r = await api.get('/api/admin/products', { params: { page: page.value, page_size: pageSize } })
    list.value = r.data?.products || []
    total.value = r.data?.total || 0
  } finally { loading.value = false }
}

async function loadCats() {
  const r = await api.get('/api/admin/categories')
  categories.value = r.data?.categories || []
}

function openNew() { form.value = blankForm(); modal.value = true }
function openEdit(p) { form.value = { ...p }; modal.value = true }

async function save() {
  saving.value = true
  try {
    if (form.value.id) await api.put(`/api/admin/products/${form.value.id}`, form.value)
    else await api.post('/api/admin/products', form.value)
    toast.success('保存成功')
    modal.value = false
    load()
  } catch (e) { toast.error(e.response?.data?.error || '保存失败') }
  finally { saving.value = false }
}

async function del(p) {
  if (!confirm(`删除商品 ${p.name}？`)) return
  try {
    await api.delete(`/api/admin/products/${p.id}`)
    toast.success('已删除')
    load()
  } catch (e) { toast.error(e.response?.data?.error || '删除失败') }
}

watch(page, load)
onMounted(() => { loadCats(); load() })
</script>
