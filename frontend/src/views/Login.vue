<template>
  <section class="py-80 bg-color-one min-h-[60vh] flex items-center">
    <div class="container container-lg">
      <div class="max-w-[480px] mx-auto bg-white border border-gray-100 rounded-16 p-40 text-center">
        <div class="w-80 h-80 mx-auto rounded-[50%] bg-main-50 text-main-600 flex items-center justify-center text-5xl mb-16">
          <i class="ph-fill ph-user-circle"></i>
        </div>
        <h4 class="mb-12">登录</h4>
        <p class="text-gray-500 mb-32">使用 NodeLoc 社区账号一键登录</p>
        <a :href="loginUrl" class="btn btn-main rounded-pill py-14 px-40 inline-flex items-center gap-8">
          <i class="ph-fill ph-sign-in"></i> NodeLoc 登录
        </a>
        <p class="text-sm text-gray-500 mt-24">
          登录即代表您同意我们的服务条款。
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const loginUrl = computed(() => {
  const redirect = route.query.redirect || '/'
  return '/auth/login?redirect=' + encodeURIComponent(redirect)
})
</script>
