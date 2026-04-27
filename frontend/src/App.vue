<template>
  <!-- Preloader -->
  <div v-if="!siteLoaded" class="preloader">
    <img src="/marketpro/images/icon/preloader.gif" alt="">
  </div>

  <!-- Toast -->
  <Transition name="toast">
    <div v-if="toast.show"
         class="position-fixed px-16 py-12 rounded-8 text-white text-sm"
         :class="toast.type === 'error' ? 'bg-danger-600' : 'bg-main-600'"
         style="top:20px;right:20px;z-index:9999;">
      {{ toast.message }}
    </div>
  </Transition>

  <!-- Page -->
  <router-view v-slot="{ Component }">
    <transition name="page" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>

  <!-- Scroll to Top -->
  <div class="progress-wrap" :class="{ 'active-progress': showScrollTop }" @click="scrollTop">
    <svg class="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
      <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
    </svg>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useToastStore } from '@/stores/toast'
import { useAuthStore } from '@/stores/auth'
import { useSiteStore } from '@/stores/site'

const toast = useToastStore()
const auth = useAuthStore()
const site = useSiteStore()
const siteLoaded = ref(false)
const showScrollTop = ref(false)

onMounted(async () => {
  // Load site data and user in parallel
  await Promise.allSettled([
    site.ensureLoaded(),
    auth.fetchUser().catch(() => {}),
  ])
  siteLoaded.value = true

  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

function onScroll() {
  showScrollTop.value = window.scrollY > 300
}

function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<style>
.preloader { position:fixed;inset:0;background:#fff;z-index:9999;display:flex;align-items:center;justify-content:center; }
.progress-wrap { position:fixed;right:24px;bottom:24px;width:46px;height:46px;border-radius:50%;background:#fff;box-shadow:0 4px 12px rgba(0,0,0,.12);cursor:pointer;opacity:0;visibility:hidden;transform:translateY(20px);transition:all .2s ease;z-index:90;display:flex;align-items:center;justify-content:center; }
.progress-wrap.active-progress { opacity:1 !important;visibility:visible !important;transform:translateY(0) !important; }
.progress-wrap svg { display:block;width:100%;height:100%; }
.toast-enter-active, .toast-leave-active { transition: all 0.25s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(-8px); }
.page-enter-active, .page-leave-active { transition: opacity 0.15s ease; }
.page-enter-from, .page-leave-to { opacity: 0; }
html { scroll-behavior: smooth; }
body { font-family: 'Quicksand', 'Inter', system-ui, -apple-system, sans-serif; }
</style>

