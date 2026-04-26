<template>
  <router-view v-slot="{ Component }">
    <transition name="page" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>

  <!-- Global toast -->
  <Transition name="toast">
    <div
      v-if="toast.show"
      class="fixed bottom-24 right-24 z-[10001] py-12 px-20 rounded-8 shadow-lg text-white flex items-center gap-8 text-md"
      :class="toast.type === 'error' ? 'bg-danger-600' : 'bg-main-600'"
    >
      <i :class="toast.type === 'error' ? 'ph-fill ph-warning-circle' : 'ph-fill ph-check-circle'" class="text-xl"></i>
      <span>{{ toast.message }}</span>
    </div>
  </Transition>
</template>

<script setup>
import { onMounted } from 'vue'
import { useToastStore } from '@/stores/toast'
import { useAuthStore } from '@/stores/auth'

const toast = useToastStore()
const auth = useAuthStore()

// Try to load current user (silent fail if not logged in)
onMounted(async () => {
  try { await auth.fetchUser() } catch (_) { /* not logged in */ }
})
</script>
