<template>
  <header class="header bg-white border-b border-gray-100">
    <div class="container container-lg">
      <nav class="header-inner flex justify-between gap-8">
        <div class="flex items-center menu-category-wrapper">
          <router-link :to="{ name: 'home' }" class="link py-12 pe-24 flex items-center gap-8">
            <span class="w-40 h-40 rounded-[50%] bg-main-600 text-white flex items-center justify-center text-2xl">
              <i class="ph-fill ph-storefront"></i>
            </span>
            <span class="text-xl fw-bold text-heading">{{ siteName }}</span>
          </router-link>

          <div class="header-menu xl:block hidden">
            <ul class="nav-menu flex items-center">
              <li class="nav-menu__item" :class="{ activePage: $route.name === 'home' }">
                <router-link :to="{ name: 'home' }" class="nav-menu__link">首页</router-link>
              </li>
              <li class="on-hover-item nav-menu__item has-submenu">
                <a href="javascript:void(0)" class="nav-menu__link">分类</a>
                <ul v-if="categories.length" class="on-hover-dropdown common-dropdown nav-submenu scroll-sm">
                  <li v-for="c in categories" :key="c.id" class="common-dropdown__item nav-submenu__item">
                    <router-link
                      :to="{ name: 'category', params: { id: c.id } }"
                      class="common-dropdown__link nav-submenu__link hover-bg-neutral-100"
                    >{{ c.name }}</router-link>
                  </li>
                </ul>
              </li>
              <li class="nav-menu__item" :class="{ activePage: $route.name === 'shops' }">
                <router-link :to="{ name: 'shops' }" class="nav-menu__link">店铺</router-link>
              </li>
              <li class="nav-menu__item">
                <router-link :to="{ name: 'shop-apply' }" class="nav-menu__link">入驻申请</router-link>
              </li>
            </ul>
          </div>
        </div>

        <div class="header-right flex items-center gap-16">
          <template v-if="auth.user">
            <div class="on-hover-item relative">
              <button type="button" class="flex items-center gap-8 py-12 text-heading">
                <img
                  v-if="auth.user.avatar_url"
                  :src="auth.user.avatar_url"
                  alt=""
                  class="w-32 h-32 rounded-[50%] object-cover"
                >
                <span v-else class="w-32 h-32 rounded-[50%] bg-main-100 text-main-600 flex items-center justify-center">
                  <i class="ph ph-user"></i>
                </span>
                <span class="hidden md:inline text-md">{{ auth.user.username || auth.user.name }}</span>
                <i class="ph ph-caret-down text-md"></i>
              </button>
              <ul class="on-hover-dropdown common-dropdown py-8 right-0" style="min-width:180px">
                <li class="common-dropdown__item">
                  <router-link :to="{ name: 'account-dashboard' }" class="common-dropdown__link hover-bg-neutral-100 px-16 py-8 flex items-center gap-8">
                    <i class="ph ph-squares-four"></i> 个人中心
                  </router-link>
                </li>
                <li class="common-dropdown__item">
                  <router-link :to="{ name: 'account-orders' }" class="common-dropdown__link hover-bg-neutral-100 px-16 py-8 flex items-center gap-8">
                    <i class="ph ph-receipt"></i> 我的订单
                  </router-link>
                </li>
                <li v-if="auth.isAdmin" class="common-dropdown__item">
                  <router-link :to="{ name: 'admin-dashboard' }" class="common-dropdown__link hover-bg-neutral-100 px-16 py-8 flex items-center gap-8">
                    <i class="ph ph-shield-check"></i> 管理后台
                  </router-link>
                </li>
                <li class="common-dropdown__item border-t border-gray-100 mt-8 pt-8">
                  <a href="#" @click.prevent="auth.logout" class="common-dropdown__link hover-bg-neutral-100 px-16 py-8 flex items-center gap-8 text-danger-600">
                    <i class="ph ph-sign-out"></i> 退出登录
                  </a>
                </li>
              </ul>
            </div>
          </template>
          <template v-else>
            <a href="/auth/login" class="btn bg-main-600 hover-bg-main-800 text-white py-10 px-20 rounded-pill flex items-center gap-8">
              <i class="ph ph-sign-in"></i> 登录
            </a>
          </template>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useSiteStore } from '@/stores/site'

const auth = useAuthStore()
const site = useSiteStore()

const siteName = computed(() => site.settings?.site_name || '社区发卡')
const categories = computed(() => site.categories || [])

onMounted(() => site.ensureLoaded())
</script>
