<template>
  <!-- Reuse MainLayout-style header by including its template through a wrapper -->
  <MainHeader />

  <section class="py-80 bg-color-one min-h-[60vh]">
    <div class="container container-lg">
      <div class="flex flex-wrap gap-24">
        <!-- Sidebar -->
        <aside class="w-full lg:w-[280px] flex-shrink-0">
          <div class="border border-gray-100 rounded-16 bg-white overflow-hidden">
            <div class="p-24 border-b border-gray-100 flex items-center gap-12">
              <img
                v-if="auth.user?.avatar_url"
                :src="auth.user.avatar_url"
                alt=""
                class="w-48 h-48 rounded-[50%] object-cover"
              >
              <span v-else class="w-48 h-48 rounded-[50%] bg-main-100 text-main-600 flex items-center justify-center text-2xl">
                <i class="ph ph-user"></i>
              </span>
              <div class="min-w-0">
                <h6 class="text-md mb-0 truncate">{{ auth.user?.username || auth.user?.name || '游客' }}</h6>
                <p class="text-sm text-gray-500 mb-0 truncate">{{ auth.user?.email }}</p>
              </div>
            </div>
            <ul class="py-8">
              <li v-for="m in menu" :key="m.name">
                <router-link
                  :to="{ name: m.name }"
                  class="flex items-center gap-12 py-12 px-24 text-gray-700 hover-bg-main-50 hover-text-main-600"
                  :class="{ 'bg-main-50 text-main-600 fw-bold': $route.name === m.name }"
                >
                  <i :class="m.icon" class="text-xl"></i>
                  <span>{{ m.label }}</span>
                </router-link>
              </li>
              <li class="border-t border-gray-100 mt-8 pt-8">
                <a href="#" @click.prevent="auth.logout"
                   class="flex items-center gap-12 py-12 px-24 text-danger-600 hover-bg-danger-50">
                  <i class="ph ph-sign-out text-xl"></i>
                  <span>退出登录</span>
                </a>
              </li>
            </ul>
          </div>
        </aside>

        <!-- Content -->
        <div class="flex-1 min-w-0">
          <div class="bg-white border border-gray-100 rounded-16 p-24 lg:p-32">
            <router-view v-slot="{ Component }">
              <transition name="page" mode="out-in">
                <component :is="Component" />
              </transition>
            </router-view>
          </div>
        </div>
      </div>
    </div>
  </section>

  <MainFooter />
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import MainHeader from '@/components/layout/MainHeader.vue'
import MainFooter from '@/components/layout/MainFooter.vue'

const auth = useAuthStore()

const menu = computed(() => {
  const items = [
    { name: 'account-dashboard', label: '账户概览', icon: 'ph ph-squares-four' },
    { name: 'account-orders', label: '我的订单', icon: 'ph ph-receipt' },
    { name: 'account-balance', label: '我的余额', icon: 'ph ph-wallet' },
    { name: 'account-withdrawals', label: '提现记录', icon: 'ph ph-arrow-square-out' },
    { name: 'account-shop', label: '我的店铺', icon: 'ph ph-storefront' },
    { name: 'account-profile', label: '个人资料', icon: 'ph ph-user-gear' },
  ]
  return items
})
</script>
