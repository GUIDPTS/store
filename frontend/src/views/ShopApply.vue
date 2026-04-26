<template>
  <section class="py-40 bg-color-one">
    <div class="container container-lg">
      <ul class="flex items-center gap-8 text-sm text-gray-500">
        <li><router-link :to="{ name: 'home' }" class="hover-text-main-600">首页</router-link></li>
        <li><i class="ph ph-caret-right text-xs"></i></li>
        <li class="text-heading">入驻申请</li>
      </ul>
    </div>
  </section>

  <section class="py-40">
    <div class="container container-lg">
      <div class="max-w-[720px] mx-auto">
        <div class="text-center mb-32">
          <div class="w-80 h-80 mx-auto rounded-[50%] bg-main-50 text-main-600 flex items-center justify-center text-5xl mb-16">
            <i class="ph-fill ph-storefront"></i>
          </div>
          <h4 class="mb-8">成为商家</h4>
          <p class="text-gray-500">填写下方表单提交店铺入驻申请，审核通过后即可上架商品</p>
        </div>

        <div v-if="existing" class="border border-gray-100 rounded-16 bg-white p-32 text-center">
          <i class="ph-fill ph-info text-main-600 text-5xl mb-12"></i>
          <h6 class="text-lg mb-8">您已提交申请</h6>
          <p class="text-gray-500 mb-16">当前状态：<span :class="statusClass">{{ statusText }}</span></p>
          <router-link :to="{ name: 'account-shop' }" class="btn btn-main rounded-pill py-10 px-24">查看店铺信息</router-link>
        </div>

        <form v-else class="border border-gray-100 rounded-16 bg-white p-32" @submit.prevent="submit">
          <div class="mb-24">
            <label class="text-neutral-900 text-md mb-8 font-[500] block">店铺名称 <span class="text-danger">*</span></label>
            <input v-model="form.name" type="text" required class="common-input" placeholder="请输入店铺名称">
          </div>
          <div class="mb-24">
            <label class="text-neutral-900 text-md mb-8 font-[500] block">店铺简介</label>
            <textarea v-model="form.description" class="common-input" rows="4" placeholder="一句话描述您的店铺"></textarea>
          </div>
          <div class="mb-24">
            <label class="text-neutral-900 text-md mb-8 font-[500] block">店铺 LOGO URL</label>
            <input v-model="form.logo" type="url" class="common-input" placeholder="https://...">
          </div>
          <div class="mb-24">
            <label class="text-neutral-900 text-md mb-8 font-[500] block">联系方式 <span class="text-danger">*</span></label>
            <input v-model="form.contact" type="text" required class="common-input" placeholder="邮箱 / Telegram / QQ">
          </div>
          <button type="submit" class="btn btn-main rounded-pill py-12 px-32 inline-flex items-center gap-8" :disabled="submitting">
            <i v-if="submitting" class="ph ph-circle-notch animate-spin"></i>
            <i v-else class="ph ph-paper-plane-tilt"></i>
            提交申请
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '@/utils/api'
import { useToastStore } from '@/stores/toast'

const toast = useToastStore()
const form = ref({ name: '', description: '', logo: '', contact: '' })
const existing = ref(null)
const submitting = ref(false)

const STATUS = {
  pending: { text: '审核中', cls: 'text-warning-600' },
  approved: { text: '已通过', cls: 'text-main-600' },
  rejected: { text: '已驳回', cls: 'text-danger-600' },
  blocked: { text: '已封禁', cls: 'text-danger-600' },
}
const statusText = computed(() => STATUS[existing.value?.status]?.text || existing.value?.status)
const statusClass = computed(() => STATUS[existing.value?.status]?.cls || '')

async function load() {
  try {
    const r = await api.get('/api/shop/me')
    if (r.data && (r.data.shop || r.data.id)) {
      existing.value = r.data.shop || r.data
    }
  } catch (_) { /* 没有店铺就保持表单 */ }
}

async function submit() {
  submitting.value = true
  try {
    await api.post('/api/shop/apply', form.value)
    toast.success('申请已提交，请等待审核')
    load()
  } catch (e) {
    toast.error(e.response?.data?.error || '提交失败')
  } finally {
    submitting.value = false
  }
}

onMounted(load)
</script>
