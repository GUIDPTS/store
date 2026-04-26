<template>
  <MainHeader />
  <section class="py-40 bg-color-one min-h-[60vh]">
    <div class="container container-lg">
      <div class="flex flex-wrap gap-24">
        <aside class="w-full lg:w-[240px] flex-shrink-0">
          <div class="border border-gray-100 rounded-16 bg-white overflow-hidden">
            <div class="p-20 border-b border-gray-100 flex items-center gap-12 bg-gradient-to-r from-main-600 to-main-800 text-white">
              <i class="ph-fill ph-shield-check text-3xl"></i>
              <div class="min-w-0">
                <h6 class="text-md mb-0 text-white truncate">管理后台</h6>
                <p class="text-sm mb-0 text-white opacity-75 truncate">{{ auth.user?.username || '' }}</p>
              </div>
            </div>
            <ul class="py-8">
              <li v-for="m in menu" :key="m.name">
                <router-link
                  :to="{ name: m.name }"
                  class="flex items-center gap-12 py-12 px-20 text-gray-700 hover-bg-main-50 hover-text-main-600"
                  :class="{ 'bg-main-50 text-main-600 fw-bold': $route.name === m.name }"
                >
                  <i :class="m.icon" class="text-xl"></i>
                  <span>{{ m.label }}</span>
                </router-link>
              </li>
              <li class="border-t border-gray-100 mt-8 pt-8">
                <router-link :to="{ name: 'home' }"
                   class="flex items-center gap-12 py-12 px-20 text-gray-700 hover-bg-neutral-100">
                  <i class="ph ph-arrow-left text-xl"></i>
                  <span>返回前台</span>
                </router-link>
              </li>
            </ul>
          </div>
        </aside>

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

const menu = computed(() => ([
  { name: 'admin-dashboard', label: '仪表板', icon: 'ph ph-chart-line-up' },
  { name: 'admin-categories', label: '分类管理', icon: 'ph ph-tag' },
  { name: 'admin-products', label: '商品管理', icon: 'ph ph-package' },
  { name: 'admin-cards', label: '卡密管理', icon: 'ph ph-key' },
  { name: 'admin-orders', label: '订单管理', icon: 'ph ph-receipt' },
  { name: 'admin-shops', label: '店铺审核', icon: 'ph ph-storefront' },
  { name: 'admin-withdrawals', label: '提现审核', icon: 'ph ph-arrow-square-out' },
  { name: 'admin-users', label: '用户管理', icon: 'ph ph-users' },
  { name: 'admin-settings', label: '系统设置', icon: 'ph ph-gear' },
]))
</script>
