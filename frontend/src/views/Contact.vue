<template>
  <section class="contact py-80">
    <div class="container container-lg">
      <div class="row g-4 justify-content-center">
        <div class="col-xl-5 col-lg-6">
          <div class="border border-gray-100 rounded-16 p-32">
            <h4 class="fw-semibold mb-8">联系我们</h4>
            <p class="text-gray-500 mb-32">如有任何问题，请通过以下方式联系我们</p>
            <div class="d-flex align-items-start gap-20 mb-24" v-if="settings.contact_qq">
              <span class="w-52 h-52 bg-main-50 text-main-600 rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style="font-size:1.5rem;">
                <i class="ph-fill ph-chat-circle-dots"></i>
              </span>
              <div>
                <h6 class="fw-semibold mb-4">客服 QQ</h6>
                <p class="text-gray-600 mb-0">{{ settings.contact_qq }}</p>
              </div>
            </div>
            <div class="d-flex align-items-start gap-20 mb-24" v-if="settings.contact_email">
              <span class="w-52 h-52 bg-main-50 text-main-600 rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style="font-size:1.5rem;">
                <i class="ph-fill ph-envelope"></i>
              </span>
              <div>
                <h6 class="fw-semibold mb-4">电子邮件</h6>
                <a :href="'mailto:' + settings.contact_email" class="text-gray-600 hover-text-main-600">{{ settings.contact_email }}</a>
              </div>
            </div>
            <div class="d-flex align-items-start gap-20 mb-24">
              <span class="w-52 h-52 bg-main-50 text-main-600 rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style="font-size:1.5rem;">
                <i class="ph-fill ph-clock"></i>
              </span>
              <div>
                <h6 class="fw-semibold mb-4">服务时间</h6>
                <p class="text-gray-600 mb-0">7 × 24 小时在线服务</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-7 col-lg-6">
          <div class="border border-gray-100 rounded-16 p-32">
            <h5 class="fw-semibold mb-24">发送消息</h5>
            <form @submit.prevent="submitForm">
              <div class="row g-20">
                <div class="col-sm-6 mb-20">
                  <label class="fw-medium text-sm mb-8 d-block">姓名</label>
                  <input type="text" v-model="form.name" required class="common-input py-14 px-16 rounded-8 w-100 border border-gray-200" placeholder="您的姓名">
                </div>
                <div class="col-sm-6 mb-20">
                  <label class="fw-medium text-sm mb-8 d-block">联系方式</label>
                  <input type="text" v-model="form.contact" class="common-input py-14 px-16 rounded-8 w-100 border border-gray-200" placeholder="QQ / 邮箱">
                </div>
                <div class="col-12 mb-20">
                  <label class="fw-medium text-sm mb-8 d-block">主题</label>
                  <input type="text" v-model="form.subject" class="common-input py-14 px-16 rounded-8 w-100 border border-gray-200" placeholder="消息主题">
                </div>
                <div class="col-12 mb-24">
                  <label class="fw-medium text-sm mb-8 d-block">内容 <span class="text-danger-600">*</span></label>
                  <textarea v-model="form.message" required rows="5" class="common-input py-14 px-16 rounded-8 w-100 border border-gray-200" placeholder="请描述您的问题..." style="resize:vertical;"></textarea>
                </div>
                <div class="col-12">
                  <button type="submit" :disabled="loading" class="btn btn-main rounded-pill px-40 py-14 fw-semibold">{{ loading ? '发送中...' : '发送消息' }}</button>
                </div>
              </div>
            </form>
            <div v-if="sent" class="mt-20 d-flex align-items-center gap-12 text-main-600">
              <i class="ph-fill ph-check-circle text-xl"></i>
              <span class="fw-medium">消息已发送，我们会尽快回复！</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useSiteStore } from '@/stores/site'
import { useToastStore } from '@/stores/toast'
import api from '@/utils/api'

const site = useSiteStore()
const toast = useToastStore()
const settings = computed(() => site.settings || {})
const loading = ref(false)
const sent = ref(false)
const form = ref({ name: '', contact: '', subject: '', message: '' })

async function submitForm() {
  loading.value = true
  try {
    await api.post('/api/contact', form.value)
    sent.value = true
    form.value = { name: '', contact: '', subject: '', message: '' }
    toast.show('消息已发送！', 'success')
  } catch (_) {
    toast.show('发送失败，请稍后重试', 'error')
  } finally {
    loading.value = false
  }
}
</script>
