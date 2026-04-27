<template>
  <!-- Mobile Menu -->
  <div class="mobile-menu scroll-sm" :class="{ active: mobileOpen }">
    <button type="button" class="close-button" @click="mobileOpen = false"><i class="ph ph-x"></i></button>
    <div class="mobile-menu__inner">
      <router-link to="/" class="mobile-menu__logo d-block mb-16" @click="mobileOpen = false">
        <span class="text-xl fw-bold text-main-600">{{ siteName }}</span>
      </router-link>
      <div class="mobile-menu__menu">
        <ul class="nav-menu">
          <li class="nav-menu__item" :class="{ activePage: $route.name === 'home' }">
            <router-link to="/" class="nav-menu__link" @click="mobileOpen = false">首页</router-link>
          </li>
          <li class="nav-menu__item" :class="{ activePage: $route.name === 'shops' }">
            <router-link to="/shops" class="nav-menu__link" @click="mobileOpen = false">全部商家</router-link>
          </li>
          <li v-for="cat in categories" :key="cat.id" class="nav-menu__item">
            <router-link :to="`/category/${cat.id}`" class="nav-menu__link" @click="mobileOpen = false">{{ cat.name }}</router-link>
          </li>
          <li class="nav-menu__item" :class="{ activePage: $route.path.startsWith('/account') }">
            <router-link to="/account" class="nav-menu__link" @click="mobileOpen = false">我的账户</router-link>
          </li>
          <li class="nav-menu__item">
            <router-link to="/shop-apply" class="nav-menu__link" @click="mobileOpen = false">申请开店</router-link>
          </li>
          <li class="nav-menu__item">
            <router-link to="/contact" class="nav-menu__link" @click="mobileOpen = false">联系我们</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <!-- Overlay -->
  <div class="overlay" :class="{ 'show-overlay': mobileOpen }" @click="mobileOpen = false"></div>

  <!-- Header Top -->
  <div class="header-top bg-main-600 flex-between">
    <div class="container container-lg">
      <div class="flex-between flex-wrap gap-8">
        <div class="d-flex align-items-center gap-10">
          <span class="text-md fw-medium text-white">{{ settings.announcement || '欢迎光临，自动发货 · 7×24小时服务' }}</span>
        </div>
        <ul class="header-top__right flex-align flex-wrap gap-16 w-auto">
          <template v-if="!auth.user">
            <li class="d-flex align-items-center gap-12">
              <a href="/auth/login" class="text-white text-sm hover-text-decoration-underline">登录</a>
              <span class="text-white text-sm" style="opacity:.5">|</span>
              <router-link to="/shop-apply" class="text-white text-sm hover-text-decoration-underline">申请开店</router-link>
            </li>
          </template>
          <template v-else>
            <li class="d-flex align-items-center gap-12">
              <span class="text-white text-sm">欢迎，<strong>{{ auth.user.username }}</strong></span>
              <router-link to="/account" class="text-white text-sm hover-text-decoration-underline">我的账户</router-link>
              <router-link v-if="auth.isAdmin" to="/admin" class="text-white text-sm hover-text-decoration-underline">管理后台</router-link>
              <a href="#" @click.prevent="auth.logout()" class="text-white text-sm hover-text-decoration-underline">退出</a>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </div>

  <!-- Middle Header -->
  <header class="header-middle bg-color-one border-bottom border-gray-100">
    <div class="container container-lg">
      <nav class="header-inner flex-between gap-8">
        <!-- Logo -->
        <div class="logo flex-shrink-0">
          <router-link to="/" class="link d-flex align-items-center">
            <img v-if="logoUrl" :src="logoUrl" alt="Logo" style="max-height:44px;">
            <span v-else class="text-xl fw-bold text-main-600">{{ siteName }}</span>
          </router-link>
        </div>

        <!-- Search -->
        <form class="flex-grow-1 d-none d-md-block" style="max-width:500px;margin:0 24px;" @submit.prevent>
          <div class="search-form__wrapper position-relative">
            <input type="text" v-model="searchQ"
              class="common-input py-13 ps-16 pe-52 rounded-pill border border-gray-200"
              style="font-weight:400;box-shadow:none;outline:none;"
              @focus="$event.target.style.borderColor='#299e60'"
              @blur="$event.target.style.borderColor=''"
              placeholder="搜索商品、商家...">
            <button type="submit"
              class="w-32 h-32 bg-main-600 hover-bg-main-800 rounded-circle flex-center text-white position-absolute top-50 translate-middle-y inset-inline-end-0 me-8"
              style="border:0;font-size:15px;">
              <i class="ph ph-magnifying-glass"></i>
            </button>
          </div>
        </form>

        <!-- Right icons -->
        <div class="header-right flex-align gap-16 flex-shrink-0">
          <template v-if="auth.user">
            <router-link to="/account" class="flex-align gap-6 item-hover text-gray-700 hover-text-main-600" style="text-decoration:none;font-size:14px;">
              <span class="text-2xl d-flex item-hover__text"><i class="ph ph-user"></i></span>
              <span class="d-none d-xl-flex item-hover__text">{{ auth.user.username }}</span>
            </router-link>
          </template>
          <template v-else>
            <a href="/auth/login" class="flex-align gap-6 item-hover text-gray-700" style="text-decoration:none;font-size:14px;">
              <span class="text-2xl d-flex item-hover__text"><i class="ph ph-user"></i></span>
              <span class="d-none d-xl-flex item-hover__text">登录 / 注册</span>
            </a>
          </template>

          <router-link to="/account/orders" class="flex-align gap-6 item-hover text-gray-700" style="text-decoration:none;font-size:14px;">
            <span class="text-2xl d-flex item-hover__text"><i class="ph ph-receipt"></i></span>
            <span class="d-none d-xl-flex item-hover__text">我的订单</span>
          </router-link>

          <router-link to="/account/balance" class="flex-align gap-6 item-hover text-gray-700" style="text-decoration:none;font-size:14px;">
            <span class="text-2xl d-flex item-hover__text"><i class="ph ph-wallet"></i></span>
            <span class="d-none d-xl-flex item-hover__text">我的余额</span>
          </router-link>

          <router-link to="/cart" class="flex-align gap-6 item-hover text-gray-700 position-relative" style="text-decoration:none;font-size:14px;">
            <span class="text-2xl d-flex item-hover__text"><i class="ph ph-shopping-cart"></i></span>
            <span v-if="cart.count > 0"
                  class="position-absolute bg-main-600 text-white rounded-circle d-flex align-items-center justify-content-center"
                  style="min-width:18px;height:18px;font-size:10px;top:-6px;right:-6px;padding:0 3px;">
              {{ cart.count }}
            </span>
            <span class="d-none d-xl-flex item-hover__text">购物车</span>
          </router-link>
        </div>
      </nav>
    </div>
  </header>

  <!-- Sticky Header -->
  <header class="header bg-white py-10">
    <div class="container container-lg">
      <nav class="header-inner d-flex justify-content-between gap-8">
        <div class="flex-align menu-category-wrapper">

          <!-- Category Dropdown -->
          <div class="on-hover-item">
            <button type="button" class="category-button d-flex align-items-center gap-8 text-white bg-main-600 px-16 py-12 rounded-6 hover-bg-main-800 transition-2" style="font-size:14px;font-weight:500;border:0;">
              <span class="text-lg line-height-1"><i class="ph ph-squares-four"></i></span>
              <span class="d-md-inline d-none">全部分类</span>
              <span class="line-height-1"><i class="ph-bold ph-caret-down"></i></span>
            </button>
            <div class="on-hover-dropdown common-dropdown category-big-dropdown p-16" style="box-shadow:0 8px 32px rgba(0,0,0,.12);border-radius:12px;">
              <div class="d-grid gap-4" style="grid-template-columns:repeat(3,1fr);max-height:350px;overflow-y:auto;">
                <router-link v-for="(cat, i) in categories" :key="cat.id"
                  :to="`/category/${cat.id}`"
                  class="d-flex flex-column align-items-center text-center py-16 px-8 rounded-8 hover-bg-main-50 border border-white hover-border-main-100"
                  style="text-decoration:none;">
                  <img :src="`/marketpro/images/icon/category-${(i % 9) + 1}.png`" alt="" style="width:40px;height:40px;object-fit:contain;">
                  <span class="fw-semibold text-heading mt-8" style="font-size:13px;line-height:1.3;">{{ cat.name }}</span>
                </router-link>
                <span v-if="!categories.length" class="text-gray-400 text-sm p-16">暂无分类</span>
              </div>
            </div>
          </div>

          <!-- Nav Menu -->
          <div class="header-menu d-lg-block d-none ms-8">
            <ul class="nav-menu flex-align">
              <li class="nav-menu__item" :class="{ activePage: $route.name === 'home' }">
                <router-link to="/" class="nav-menu__link">首页</router-link>
              </li>
              <li class="on-hover-item nav-menu__item has-submenu" :class="{ activePage: $route.name === 'shops' }">
                <router-link to="/shops" class="nav-menu__link">全部商家</router-link>
                <ul class="on-hover-dropdown common-dropdown nav-submenu" style="min-width:160px;">
                  <li class="common-dropdown__item"><router-link to="/shops" class="common-dropdown__link">商家列表</router-link></li>
                  <li class="common-dropdown__item"><router-link to="/shop-apply" class="common-dropdown__link">申请开店</router-link></li>
                </ul>
              </li>
              <li class="on-hover-item nav-menu__item has-submenu">
                <a href="javascript:void(0)" class="nav-menu__link">商品分类</a>
                <ul class="on-hover-dropdown common-dropdown nav-submenu scroll-sm" style="min-width:180px;max-height:320px;overflow-y:auto;">
                  <li v-for="cat in categories" :key="cat.id" class="common-dropdown__item">
                    <router-link :to="`/category/${cat.id}`" class="common-dropdown__link">{{ cat.name }}</router-link>
                  </li>
                </ul>
              </li>
              <li class="nav-menu__item" :class="{ activePage: $route.path.startsWith('/account') }">
                <router-link to="/account" class="nav-menu__link">我的账户</router-link>
              </li>
              <li class="nav-menu__item">
                <router-link to="/shop-apply" class="nav-menu__link">申请开店</router-link>
              </li>
              <li class="nav-menu__item">
                <router-link to="/contact" class="nav-menu__link">联系我们</router-link>
              </li>
            </ul>
          </div>
        </div>

        <div class="header-right flex-align gap-20">
          <a v-if="settings.contact_qq" href="javascript:void(0)" class="d-sm-flex align-items-center gap-16 d-none">
            <span class="d-flex text-32"><img src="/marketpro/images/icon/mobile.png" alt=""></span>
            <span>
              <span class="d-block text-heading fw-medium">客服 QQ</span>
              <span class="d-block fw-bold text-main-600">{{ settings.contact_qq }}</span>
            </span>
          </a>
          <button type="button" class="toggle-mobileMenu d-lg-none" @click="mobileOpen = true" style="background:transparent;border:0;font-size:28px;color:#333;"><i class="ph ph-list"></i></button>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useSiteStore } from '@/stores/site'
import { useCartStore } from '@/stores/cart'

const auth = useAuthStore()
const site = useSiteStore()
const cart = useCartStore()

const route = useRoute()
const mobileOpen = ref(false)
const searchQ = ref('')

// Close mobile menu whenever route changes
watch(route, () => { mobileOpen.value = false })

const settings = computed(() => site.settings || {})
const categories = computed(() => site.categories || [])
const siteName = computed(() => settings.value.site_name || '发卡平台')
const logoUrl = computed(() => settings.value.site_logo || '')
</script>

<style scoped>
.nav-menu__link { font-size:14px !important; font-weight:500; color:#333; padding:12px 16px; line-height:1.4; white-space:nowrap; }
.nav-menu__link:hover { color:#299e60; }
.nav-menu { list-style:none; padding:0; margin:0; }
.nav-menu__item { position:relative; }
.nav-menu__item.activePage > .nav-menu__link { color:#299e60; }
.header-inner { min-height:64px; }
.header-middle { padding:18px 0; }
.common-input:focus { box-shadow:none !important; outline:none !important; font-weight:400 !important; }
.header { box-shadow:0 4px 20px rgba(0,0,0,.08) !important; }
.on-hover-dropdown { transition:opacity .2s ease,visibility .2s ease,margin-top .2s ease !important; }
/* Prevent invisible fading-out dropdown from blocking clicks on page content */
.on-hover-item:not(:hover) .on-hover-dropdown { pointer-events: none !important; }
.header .category-big-dropdown { min-width:480px; }
.header { padding:8px 0; }
.overlay { position:fixed;inset:0;background:rgba(18,21,53,.6);opacity:0;visibility:hidden;transition:.2s;z-index:80; }
.overlay.show-overlay { opacity:1;visibility:visible; }
@media (min-width:992px) { .mobile-menu { display:none !important; } .toggle-mobileMenu { display:none !important; } }
</style>
