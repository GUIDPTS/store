<template>
  <div class="border border-gray-100 rounded-8 overflow-hidden">
    <div class="bg-main-600 p-24 text-center">
      <div class="mb-12">
        <img v-if="auth.user?.avatar_url" :src="auth.user.avatar_url"
          class="rounded-circle mx-auto d-block"
          style="width:64px;height:64px;object-fit:cover;border:3px solid rgba(255,255,255,0.3)"
          :alt="auth.user?.username" />
        <div v-else class="rounded-circle bg-white bg-opacity-25 d-flex align-items-center justify-content-center mx-auto"
          style="width:64px;height:64px;font-size:28px;color:rgba(255,255,255,0.8)">
          <i class="ph ph-user"></i>
        </div>
      </div>
      <div class="text-white fw-semibold text-lg">{{ auth.user?.username || "用户" }}</div>
    </div>
    <nav class="p-16">
      <NuxtLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="d-flex align-items-center gap-12 px-16 py-12 rounded-8 text-gray-700 mb-4 account-nav-link"
        active-class="bg-main-50 text-main-600 fw-semibold"
      >
        <i :class="item.icon + ' text-xl'"></i>
        <span>{{ item.label }}</span>
      </NuxtLink>
      <button
        type="button"
        class="d-flex align-items-center gap-12 px-16 py-12 rounded-8 text-danger-600 w-100 border-0 bg-transparent mt-8"
        @click="auth.logout()"
      >
        <i class="ph ph-sign-out text-xl"></i>
        <span>退出登录</span>
      </button>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";

const auth = useAuthStore();

const navItems = [
  { to: "/account", label: "账户概览", icon: "ph ph-user" },
  { to: "/account/orders", label: "我的订单", icon: "ph ph-receipt" },
  { to: "/account/balance", label: "余额管理", icon: "ph ph-wallet" },
  { to: "/account/shop", label: "我的店铺", icon: "ph ph-storefront" },
  { to: "/account/withdrawals", label: "提现管理", icon: "ph ph-money" },
];
</script>

<style scoped>
.account-nav-link:hover {
  background: var(--bs-light);
}
</style>
