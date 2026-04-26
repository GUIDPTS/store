<template>
  <div class="flex-between flex-wrap gap-12 mb-24">
    <h5 class="mb-0">分类管理</h5>
    <button type="button" class="btn btn-main rounded-pill py-8 px-20 inline-flex items-center gap-8" @click="openNew">
      <i class="ph ph-plus"></i> 新建分类
    </button>
  </div>

  <div v-if="loading" class="py-40 text-center text-gray-400">
    <i class="ph ph-circle-notch text-3xl animate-spin"></i>
  </div>

  <table v-else class="w-full text-sm">
    <thead>
      <tr class="border-b border-gray-100 text-left text-gray-500">
        <th class="py-12 px-8">ID</th>
        <th class="py-12 px-8">名称</th>
        <th class="py-12 px-8">图标</th>
        <th class="py-12 px-8">排序</th>
        <th class="py-12 px-8">状态</th>
        <th class="py-12 px-8 text-right">操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="c in list" :key="c.id" class="border-b border-gray-100 hover-bg-color-one">
        <td class="py-12 px-8 font-mono text-xs">{{ c.id }}</td>
        <td class="py-12 px-8">{{ c.name }}</td>
        <td class="py-12 px-8"><i :class="c.icon || 'ph ph-tag'" class="text-main-600 text-xl"></i></td>
        <td class="py-12 px-8">{{ c.sort }}</td>
        <td class="py-12 px-8">
          <span :class="c.is_active ? 'bg-main-50 text-main-600' : 'bg-gray-100 text-gray-500'"
                class="text-xs py-2 px-8 rounded-pill">{{ c.is_active ? '启用' : '禁用' }}</span>
        </td>
        <td class="py-12 px-8 text-right">
          <button type="button" class="text-main-600 hover-text-main-800 me-12" @click="openEdit(c)"><i class="ph ph-pencil"></i> 编辑</button>
          <button type="button" class="text-danger-600 hover-text-danger-800" @click="del(c)"><i class="ph ph-trash"></i> 删除</button>
        </td>
      </tr>
    </tbody>
  </table>

  <!-- Modal -->
  <Transition name="page">
    <div v-if="modal" class="fixed inset-0 z-[10000] flex items-center justify-center" style="background:rgba(0,0,0,.4)" @click.self="modal = false">
      <div class="bg-white rounded-16 p-32 w-full max-w-[480px]">
        <h6 class="text-lg mb-16">{{ form.id ? '编辑分类' : '新建分类' }}</h6>
        <form @submit.prevent="save">
          <div class="mb-16">
            <label class="text-md mb-8 font-[500] block">名称 <span class="text-danger">*</span></label>
            <input v-model="form.name" required type="text" class="common-input">
          </div>
          <div class="mb-16">
            <label class="text-md mb-8 font-[500] block">图标 (Phosphor class)</label>
            <input v-model="form.icon" type="text" class="common-input" placeholder="ph ph-tag">
          </div>
          <div class="mb-16">
            <label class="text-md mb-8 font-[500] block">描述</label>
            <textarea v-model="form.description" class="common-input" rows="2"></textarea>
          </div>
          <div class="flex gap-16 mb-16">
            <div class="flex-1">
              <label class="text-md mb-8 font-[500] block">排序</label>
              <input v-model.number="form.sort" type="number" class="common-input">
            </div>
            <div class="flex-1">
              <label class="text-md mb-8 font-[500] block">状态</label>
              <select v-model="form.is_active" class="common-input">
                <option :value="true">启用</option>
                <option :value="false">禁用</option>
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
import { ref, onMounted } from 'vue'
import api from '@/utils/api'
import { useToastStore } from '@/stores/toast'

const toast = useToastStore()
const list = ref([])
const loading = ref(true)
const modal = ref(false)
const saving = ref(false)
const form = ref({ id: 0, name: '', icon: '', description: '', sort: 0, is_active: true })

async function load() {
  loading.value = true
  try {
    const r = await api.get('/api/admin/categories')
    list.value = r.data?.categories || []
  } finally { loading.value = false }
}

function openNew() {
  form.value = { id: 0, name: '', icon: 'ph ph-tag', description: '', sort: 0, is_active: true }
  modal.value = true
}
function openEdit(c) {
  form.value = { ...c }
  modal.value = true
}

async function save() {
  saving.value = true
  try {
    if (form.value.id) {
      await api.put(`/api/admin/categories/${form.value.id}`, form.value)
    } else {
      await api.post('/api/admin/categories', form.value)
    }
    toast.success('保存成功')
    modal.value = false
    load()
  } catch (e) { toast.error(e.response?.data?.error || '保存失败') }
  finally { saving.value = false }
}

async function del(c) {
  if (!confirm(`删除分类 ${c.name}？`)) return
  try {
    await api.delete(`/api/admin/categories/${c.id}`)
    toast.success('已删除')
    load()
  } catch (e) { toast.error(e.response?.data?.error || '删除失败') }
}

onMounted(load)
</script>
