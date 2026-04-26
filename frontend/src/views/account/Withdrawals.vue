<template>
  <div class="flex-between flex-wrap gap-12 mb-24">
    <h5 class="mb-0">提现记录</h5>
    <button type="button" class="btn btn-main rounded-pill py-8 px-20 inline-flex items-center gap-8" @click="showForm = true">
      <i class="ph ph-plus"></i> 申请提现
    </button>
  </div>

  <Transition name="page">
    <div v-if="showForm" class="border border-gray-100 rounded-12 p-24 mb-24 bg-color-one">
      <h6 class="text-md mb-16">提现申请</h6>
      <form @submit.prevent="submit">
        <div class="mb-16">
          <label class="text-md mb-8 font-[500] block">提现金额（元） <span class="text-danger">*</span></label>
          <input v-model.number="form.amount" type="number" step="0.01" min="0.01" required class="common-input">
        </div>
        <div class="mb-16">
          <label class="text-md mb-8 font-[500] block">备注</label>
          <textarea v-model="form.remark" class="common-input" rows="2" placeholder="填写收款方式和账号等信息"></textarea>
        </div>
        <div class="flex items-center gap-12">
          <button type="submit" class="btn btn-main rounded-pill py-10 px-24" :disabled="submitting">
            {{ submitting ? '提交中…' : '提交申请' }}
          </button>
          <button type="button" class="btn rounded-pill py-10 px-24 border border-gray-100" @click="showForm = false">取消</button>
        </div>
      </form>
    </div>
  </Transition>

  <EmptyState v-if="!list.length" icon="ph ph-arrow-square-out" title="暂无提现记录" />

  <ul v-else class="flex flex-col gap-8">
    <li v-for="w in list" :key="w.id"
        class="border border-gray-100 rounded-12 p-16 flex items-center justify-between gap-12 flex-wrap">
      <div class="min-w-0">
        <div class="flex items-center gap-12 mb-4 flex-wrap">
          <span class="font-mono text-sm text-gray-700">#{{ w.id }}</span>
          <span :class="STATUS[w.status]?.cls" class="text-xs py-2 px-8 rounded-pill">{{ STATUS[w.status]?.text || w.status }}</span>
          <span class="text-xs text-gray-400">{{ formatDate(w.created_at) }}</span>
        </div>
        <span v-if="w.remark" class="text-sm text-gray-500">{{ w.remark }}</span>
        <span v-if="w.reject_reason" class="text-sm text-danger-600 block">驳回原因：{{ w.reject_reason }}</span>
      </div>
      <span class="text-md fw-bold text-main-600">¥{{ Number(w.amount || 0).toFixed(2) }}</span>
    </li>
  </ul>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/utils/api'
import EmptyState from '@/components/EmptyState.vue'
import { useToastStore } from '@/stores/toast'
import { formatDate } from '@/utils/helpers'

const toast = useToastStore()
const list = ref([])
const showForm = ref(false)
const submitting = ref(false)
const form = ref({ amount: 0, remark: '' })

// Status is int: 0=pending, 1=completed, 2=rejected, 3=processing
const STATUS = {
  0: { text: '审核中', cls: 'bg-warning-50 text-warning-600' },
  1: { text: '已完成', cls: 'bg-main-50 text-main-600' },
  2: { text: '已驳回', cls: 'bg-danger-50 text-danger-600' },
  3: { text: '处理中', cls: 'bg-main-50 text-main-600' },
}

async function load() {
  try {
    const r = await api.get('/api/withdrawals')
    list.value = r.data?.data || []
  } catch (_) { list.value = [] }
}

async function submit() {
  submitting.value = true
  try {
    await api.post('/api/withdrawals/apply', { amount: form.value.amount, remark: form.value.remark })
    toast.success('申请已提交')
    showForm.value = false
    form.value = { amount: 0, remark: '' }
    load()
  } catch (e) { toast.error(e.response?.data?.error || '提交失败') }
  finally { submitting.value = false }
}

onMounted(load)
</script>
