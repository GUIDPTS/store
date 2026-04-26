<template>
  <h5 class="mb-24">个人资料</h5>
  <div v-if="!auth.user" class="py-80 text-center text-gray-400">
    <i class="ph ph-circle-notch text-3xl animate-spin"></i>
  </div>
  <div v-else class="flex flex-wrap gap-32">
    <div class="flex-shrink-0 text-center">
      <img v-if="auth.user.avatar_url"
           :src="auth.user.avatar_url"
           :alt="auth.user.username"
           class="w-[140px] h-[140px] rounded-[50%] object-cover border-4 border-main-50">
      <div v-else class="w-[140px] h-[140px] rounded-[50%] bg-main-100 text-main-600 flex items-center justify-center text-6xl border-4 border-main-50">
        <i class="ph ph-user"></i>
      </div>
      <div class="mt-12">
        <span class="bg-main-50 text-main-600 px-12 py-4 rounded-pill text-sm">
          信任等级 {{ auth.user.trust_level ?? 0 }}
        </span>
      </div>
    </div>

    <div class="flex-1 min-w-0">
      <ul class="flex flex-col gap-16">
        <li class="flex items-center justify-between border-b border-gray-100 pb-12">
          <span class="text-gray-500 text-sm">用户名</span>
          <span class="text-md">{{ auth.user.username || '—' }}</span>
        </li>
        <li class="flex items-center justify-between border-b border-gray-100 pb-12">
          <span class="text-gray-500 text-sm">显示名称</span>
          <span class="text-md">{{ auth.user.name || '—' }}</span>
        </li>
        <li class="flex items-center justify-between border-b border-gray-100 pb-12">
          <span class="text-gray-500 text-sm">邮箱</span>
          <span class="text-md">{{ auth.user.email || '—' }}</span>
        </li>
        <li class="flex items-center justify-between border-b border-gray-100 pb-12">
          <span class="text-gray-500 text-sm">NodeLoc ID</span>
          <span class="text-md font-mono">{{ auth.user.nodeloc_id || '—' }}</span>
        </li>
        <li class="flex items-center justify-between border-b border-gray-100 pb-12">
          <span class="text-gray-500 text-sm">注册时间</span>
          <span class="text-md">{{ formatDate(auth.user.created_at) }}</span>
        </li>
      </ul>

      <p class="text-sm text-gray-500 mt-24">
        <i class="ph ph-info text-main-600 me-4"></i>
        账号信息通过 NodeLoc 社区同步，如需修改请前往 NodeLoc 社区。
      </p>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { formatDate } from '@/utils/helpers'

const auth = useAuthStore()
</script>
