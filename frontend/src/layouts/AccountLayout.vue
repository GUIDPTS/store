<template>
  <MainHeader />

  <section class="account py-80">
    <div class="container container-lg">

      <!-- Not Logged In -->
      <div v-if="!auth.user && !accountLoading">
        <div class="row g-4 justify-content-center">
          <div class="col-xl-5 col-lg-7">
            <div class="border border-gray-100 hover-border-main-600 transition-1 rounded-16 px-24 py-40 h-full text-center">
              <div class="w-80 h-80 rounded-circle bg-main-50 d-flex align-items-center justify-content-center mx-auto mb-24">
                <i class="ph ph-user text-main-600" style="font-size:2.5rem;"></i>
              </div>
              <h6 class="text-xl mb-8">欢迎登录</h6>
              <p class="text-gray-500 mb-32">登录后可查看订单、账户余额和店铺管理</p>
              <a href="/auth/login" class="btn btn-main py-18 px-40">立即登录</a>
            </div>
          </div>
          <div class="col-xl-5 col-lg-7 mt-4 mt-xl-0">
            <div class="border border-gray-100 hover-border-main-600 transition-1 rounded-16 px-24 py-40 h-full">
              <h6 class="text-xl mb-32">为什么注册？</h6>
              <ul class="list-unstyled mb-0">
                <li class="d-flex align-items-start gap-16 mb-24">
                  <span class="w-44 h-44 bg-main-50 text-main-600 rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style="font-size:1.25rem;"><i class="ph-fill ph-lightning"></i></span>
                  <div><h6 class="text-sm fw-semibold mb-4">自动发货</h6><p class="text-gray-500 text-sm mb-0">购买后立即收到卡密，无需等待</p></div>
                </li>
                <li class="d-flex align-items-start gap-16 mb-24">
                  <span class="w-44 h-44 bg-main-50 text-main-600 rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style="font-size:1.25rem;"><i class="ph-fill ph-wallet"></i></span>
                  <div><h6 class="text-sm fw-semibold mb-4">账户余额</h6><p class="text-gray-500 text-sm mb-0">充值余额，更方便的支付方式</p></div>
                </li>
                <li class="d-flex align-items-start gap-16">
                  <span class="w-44 h-44 bg-main-50 text-main-600 rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style="font-size:1.25rem;"><i class="ph-fill ph-storefront"></i></span>
                  <div><h6 class="text-sm fw-semibold mb-4">申请开店</h6><p class="text-gray-500 text-sm mb-0">成为商家，自动发卡轻松赚钱</p></div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading -->
      <div v-else-if="accountLoading" class="text-center py-60">
        <div class="w-48 h-48 border border-main-600 rounded-circle d-flex align-items-center justify-content-center mx-auto mb-16 animate-spin" style="border-top-color:transparent !important;"></div>
        <p class="text-gray-400 text-sm">加载中...</p>
      </div>

      <!-- Logged In -->
      <div v-else class="row g-4">
        <!-- Sidebar -->
        <div class="col-xl-3">
          <div class="border border-gray-100 rounded-16 px-24 py-40 text-center mb-24 hover-border-main-600 transition-1">
            <div class="w-80 h-80 rounded-circle bg-main-50 d-flex align-items-center justify-content-center mx-auto mb-16">
              <i class="ph ph-user text-main-600" style="font-size:2rem;"></i>
            </div>
            <h6 class="fw-semibold mb-4">{{ auth.user.username }}</h6>
            <p class="text-gray-500 text-sm mb-12">{{ auth.user.email || '' }}</p>
            <span v-if="auth.isAdmin" class="d-inline-block bg-warning-50 text-warning-600 text-xs px-10 py-4 rounded-pill mb-12">
              <i class="ph ph-crown me-4"></i>管理员
            </span>
          </div>
          <div class="border border-gray-100 rounded-16 overflow-hidden">
            <router-link v-for="m in menu" :key="m.name" :to="{ name: m.name }"
              class="d-flex align-items-center gap-12 w-100 px-24 py-16 border-bottom border-gray-100 transition-1"
              :class="$route.name === m.name ? 'bg-main-600 text-white' : 'text-gray-900 hover-bg-main-50'"
              style="text-decoration:none;font-size:.875rem;font-weight:500;">
              <i :class="m.icon" style="font-size:1.1rem;"></i>
              <span>{{ m.label }}</span>
            </router-link>
            <a href="#" @click.prevent="auth.logout()"
               class="d-flex align-items-center gap-12 w-100 px-24 py-16 text-danger-600 hover-bg-danger-50 transition-1"
               style="text-decoration:none;font-size:.875rem;font-weight:500;">
              <i class="ph ph-sign-out" style="font-size:1.1rem;"></i>
              <span>退出登录</span>
            </a>
          </div>
        </div>

        <!-- Content -->
        <div class="col-xl-9">
          <router-view v-slot="{ Component }">
            <transition name="page" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
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
const accountLoading = computed(() => !auth.initialized)

const menu = [
  { name: 'account-orders',      label: '我的订单', icon: 'ph ph-shopping-bag' },
  { name: 'account-balance',     label: '账户余额', icon: 'ph ph-wallet' },
  { name: 'account-withdrawals', label: '提现记录', icon: 'ph ph-arrow-square-out' },
  { name: 'account-shop',        label: '我的店铺', icon: 'ph ph-storefront' },
  { name: 'account-profile',     label: '个人资料', icon: 'ph ph-user' },
]
</script>
