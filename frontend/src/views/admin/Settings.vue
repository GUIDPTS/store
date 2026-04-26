<template>
  <h5 class="mb-24">系统设置</h5>

  <div v-if="loading" class="py-40 text-center text-gray-400">
    <i class="ph ph-circle-notch text-3xl animate-spin"></i>
  </div>

  <form v-else @submit.prevent="save" class="max-w-[720px]">
    <div class="border border-gray-100 rounded-12 p-24 mb-24">
      <h6 class="text-md mb-16 flex items-center gap-12"><i class="ph ph-storefront text-main-600"></i> 站点信息</h6>
      <div class="mb-16">
        <label class="text-md mb-8 font-[500] block">站点名称</label>
        <input v-model="form.site_name" type="text" class="common-input">
      </div>
      <div class="mb-16">
        <label class="text-md mb-8 font-[500] block">站点描述</label>
        <textarea v-model="form.site_description" class="common-input" rows="2"></textarea>
      </div>
      <div class="mb-16">
        <label class="text-md mb-8 font-[500] block">Logo URL</label>
        <input v-model="form.site_logo" type="url" class="common-input">
      </div>
      <div class="flex gap-16 mb-16">
        <div class="flex-1">
          <label class="text-md mb-8 font-[500] block">客服邮筱</label>
          <input v-model="form.contact_email" type="email" class="common-input">
        </div>
        <div class="flex-1">
          <label class="text-md mb-8 font-[500] block">客服 QQ</label>
          <input v-model="form.contact_qq" type="text" class="common-input">
        </div>
      </div>
      <div class="mb-16">
        <label class="text-md mb-8 font-[500] block">页脚文字</label>
        <input v-model="form.footer_text" type="text" class="common-input">
      </div>
    </div>

    <div class="border border-gray-100 rounded-12 p-24 mb-24">
      <h6 class="text-md mb-16 flex items-center gap-12"><i class="ph ph-credit-card text-main-600"></i> 支付与提现</h6>
      <div class="flex gap-16 mb-16">
        <div class="flex-1">
          <label class="text-md mb-8 font-[500] block">平台佣金率（%）</label>
          <input v-model="form.platform_commission" type="number" step="0.01" min="0" max="100" class="common-input">
        </div>
        <div class="flex-1">
          <label class="text-md mb-8 font-[500] block">最低提现金额</label>
          <input v-model="form.withdrawal_min_amount" type="number" step="0.01" min="0" class="common-input">
        </div>
        <div class="flex-1">
          <label class="text-md mb-8 font-[500] block">提现手续费率（%）</label>
          <input v-model="form.withdrawal_fee_rate" type="number" step="0.01" min="0" class="common-input">
        </div>
      </div>
      <div class="flex gap-16 mb-16">
        <div class="flex-1">
          <label class="text-md mb-8 font-[500] block">支付功能</label>
          <select v-model="form.payment_enabled" class="common-input">
            <option value="true">启用</option>
            <option value="false">禁用</option>
          </select>
        </div>
        <div class="flex-1">
          <label class="text-md mb-8 font-[500] block">提现功能</label>
          <select v-model="form.withdrawal_enabled" class="common-input">
            <option value="true">启用</option>
            <option value="false">禁用</option>
          </select>
        </div>
        <div class="flex-1">
          <label class="text-md mb-8 font-[500] block">开店申请</label>
          <select v-model="form.shop_apply_enabled" class="common-input">
            <option value="true">启用</option>
            <option value="false">禁用</option>
          </select>
        </div>
      </div>
    </div>

    <div class="border border-gray-100 rounded-12 p-24 mb-24">
      <h6 class="text-md mb-16 flex items-center gap-12"><i class="ph ph-info text-main-600"></i> 公告</h6>
      <textarea v-model="form.announcement" class="common-input" rows="4" placeholder="首页顶部公告内容"></textarea>
    </div>

    <button type="submit" class="btn btn-main rounded-pill py-12 px-32" :disabled="saving">
      <i class="ph ph-floppy-disk me-4"></i> {{ saving ? '保存中…' : '保存设置' }}
    </button>
  </form>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/utils/api'
import { useToastStore } from '@/stores/toast'

const toast = useToastStore()
const form = ref({})
const loading = ref(true)
const saving = ref(false)

async function load() {
  loading.value = true
  try {
    const r = await api.get('/api/admin/settings')
    form.value = r.data?.settings || r.data || {}
  } finally { loading.value = false }
}

async function save() {
  saving.value = true
  try {
    await api.put('/api/admin/settings', form.value)
    toast.success('设置已保存')
  } catch (e) { toast.error(e.response?.data?.error || '保存失败') }
  finally { saving.value = false }
}

onMounted(load)
</script>
