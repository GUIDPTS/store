<template>
  <section class="become-seller py-80">
    <div class="container container-lg">
      <div class="row justify-content-center">
        <div class="col-xl-6 col-lg-8">
          <div class="border border-gray-100 rounded-16 p-40">
            <div class="text-center mb-40">
              <i class="ph ph-storefront text-main-600 mb-16 d-block" style="font-size:3rem;"></i>
              <h3 class="fw-semibold mb-8">申请开店</h3>
              <p class="text-gray-500">填写以下信息，申请成为平台商家</p>
            </div>

            <div v-if="!auth.user" class="text-center">
              <p class="text-gray-500 mb-24">请先登录后再申请开店</p>
              <a href="/auth/login" class="btn btn-main rounded-pill px-32 py-12">立即登录</a>
            </div>

            <form v-else @submit.prevent="submit">
              <div class="mb-20">
                <label class="fw-medium text-sm mb-8 d-block">店铺名称 <span class="text-danger-600">*</span></label>
                <input type="text" v-model="form.name" required class="common-input py-14 px-16 rounded-8 w-100 border border-gray-200" placeholder="请输入店铺名称">
              </div>
              <div class="mb-20">
                <label class="fw-medium text-sm mb-8 d-block">店铺简介</label>
                <textarea v-model="form.description" rows="4" class="common-input py-14 px-16 rounded-8 w-100 border border-gray-200" placeholder="简单介绍一下您的店铺..." style="resize:vertical;"></textarea>
              </div>
              <div class="mb-20">
                <label class="fw-medium text-sm mb-8 d-block">联系方式</label>
                <input type="text" v-model="form.contact" class="common-input py-14 px-16 rounded-8 w-100 border border-gray-200" placeholder="QQ / 微信 / 邮箱">
              </div>
              <button type="submit" :disabled="loading" class="btn btn-main w-100 py-14 px-32 rounded-pill fw-semibold text-md">
                {{ loading ? '提交中...' : '提交申请' }}
              </button>
            </form>

            <div v-if="success" class="mt-24 text-center">
              <i class="ph-fill ph-check-circle text-main-600 d-block mb-8" style="font-size:2.5rem;"></i>
              <p class="text-gray-700 fw-medium">申请已提交，请等待审核</p>
              <router-link to="/" class="btn btn-outline-main rounded-pill px-24 py-10 mt-12">返回首页</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useToastStore } from '@/stores/toast'
import api from '@/utils/api'

const auth = useAuthStore()
const toast = useToastStore()
const loading = ref(false)
const success = ref(false)
const form = ref({ name: '', description: '', contact: '' })

async function submit() {
  if (!form.value.name.trim()) { toast.show('请填写店铺名称', 'error'); return }
  loading.value = true
  try {
    await api.post('/api/shop/apply', form.value)
    success.value = true
    toast.show('申请已提交！', 'success')
  } catch (e) {
    toast.show(e.response?.data?.error || '提交失败，请稍后重试', 'error')
  } finally {
    loading.value = false
  }
}
</script>
