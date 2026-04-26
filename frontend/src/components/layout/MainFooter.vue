<template>
  <footer class="footer py-80 bg-white border-t border-gray-100">
    <div class="container container-lg">
      <div class="footer-item-wrapper flex items-start flex-wrap gap-32">
        <div class="footer-item flex-1 min-w-[260px]">
          <div class="footer-item__logo mb-16">
            <span class="text-3xl fw-bold text-heading flex items-center gap-12">
              <span class="w-44 h-44 rounded-[50%] bg-main-600 text-white flex items-center justify-center text-2xl">
                <i class="ph-fill ph-storefront"></i>
              </span>
              {{ siteName }}
            </span>
          </div>
          <p class="mb-16 text-gray-600">{{ siteDesc || '专业、安全、便捷的多商户卡密交易平台。' }}</p>
        </div>

        <div class="footer-item">
          <h6 class="footer-item__title">导航</h6>
          <ul class="footer-menu">
            <li class="mb-12"><router-link :to="{ name: 'home' }" class="text-gray-600 hover-text-main-600">首页</router-link></li>
            <li class="mb-12"><router-link :to="{ name: 'shops' }" class="text-gray-600 hover-text-main-600">店铺</router-link></li>
            <li class="mb-12"><router-link :to="{ name: 'shop-apply' }" class="text-gray-600 hover-text-main-600">入驻申请</router-link></li>
          </ul>
        </div>

        <div class="footer-item">
          <h6 class="footer-item__title">用户</h6>
          <ul class="footer-menu">
            <li class="mb-12"><router-link :to="{ name: 'account-orders' }" class="text-gray-600 hover-text-main-600">我的订单</router-link></li>
            <li class="mb-12"><router-link :to="{ name: 'account-balance' }" class="text-gray-600 hover-text-main-600">我的余额</router-link></li>
            <li class="mb-12"><router-link :to="{ name: 'account-profile' }" class="text-gray-600 hover-text-main-600">个人资料</router-link></li>
          </ul>
        </div>

        <div class="footer-item">
          <h6 class="footer-item__title">分类</h6>
          <ul class="footer-menu">
            <li v-for="c in categories.slice(0, 6)" :key="c.id" class="mb-12">
              <router-link :to="{ name: 'category', params: { id: c.id } }" class="text-gray-600 hover-text-main-600">
                {{ c.name }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
  <div class="bottom-footer bg-color-one py-8">
    <div class="container container-lg">
      <div class="bottom-footer__inner flex-between flex-wrap gap-16 py-16">
        <p class="bottom-footer__text">{{ siteName }} &copy; {{ year }} · All Rights Reserved</p>
        <div class="flex items-center gap-8 flex-wrap">
          <span class="text-heading text-sm">Powered by NodeLoc</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useSiteStore } from '@/stores/site'

const site = useSiteStore()
const siteName = computed(() => site.settings?.site_name || '社区发卡')
const siteDesc = computed(() => site.settings?.site_description || '')
const categories = computed(() => site.categories || [])
const year = new Date().getFullYear()
</script>
