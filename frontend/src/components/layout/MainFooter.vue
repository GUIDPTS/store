<template>
  <footer class="footer py-120">
    <div class="container container-lg">
      <div class="footer-item-wrapper d-flex align-items-start flex-wrap">

        <!-- Brand -->
        <div class="footer-item">
          <div class="max-w-340">
            <div class="footer-item__logo">
              <router-link to="/">
                <span class="text-2xl fw-bold text-main-600">{{ siteName }}</span>
              </router-link>
            </div>
            <p class="mb-28 text-heading mt-12">{{ siteDesc || '正版软件 · 游戏充值 · 卡密发货平台' }}</p>
            <div class="d-flex flex-column gap-8">
              <a v-if="settings.contact_email"
                :href="'mailto:' + settings.contact_email"
                class="text-heading fw-medium hover-text-main-600">
                <i class="ph-fill ph-envelope me-4"></i>{{ settings.contact_email }}
              </a>
              <span v-if="settings.contact_qq" class="text-heading fw-medium">
                <i class="ph-fill ph-chat-circle-dots me-4"></i>QQ: {{ settings.contact_qq }}
              </span>
            </div>
          </div>
        </div>

        <!-- Quick Nav -->
        <div class="footer-item">
          <h6 class="footer-item__title">快速导航</h6>
          <ul class="footer-menu">
            <li class="mb-16"><router-link to="/" class="text-heading hover-text-main-600">首页</router-link></li>
            <li class="mb-16"><router-link to="/shops" class="text-heading hover-text-main-600">全部商家</router-link></li>
            <li class="mb-16"><router-link to="/shop-apply" class="text-heading hover-text-main-600">申请开店</router-link></li>
            <li class="mb-16"><router-link to="/account" class="text-heading hover-text-main-600">我的账户</router-link></li>
          </ul>
        </div>

        <!-- Customer Service -->
        <div class="footer-item">
          <h6 class="footer-item__title">客户服务</h6>
          <ul class="footer-menu">
            <li class="mb-16"><router-link to="/account/orders" class="text-heading hover-text-main-600">我的订单</router-link></li>
            <li class="mb-16"><router-link to="/account/balance" class="text-heading hover-text-main-600">账户余额</router-link></li>
            <li class="mb-16"><router-link to="/contact" class="text-heading hover-text-main-600">联系我们</router-link></li>
          </ul>
        </div>

        <!-- Hot Categories -->
        <div class="footer-item">
          <h6 class="footer-item__title">热门分类</h6>
          <ul class="footer-menu">
            <li v-for="cat in categories.slice(0, 6)" :key="cat.id" class="mb-16">
              <router-link :to="`/category/${cat.id}`" class="text-heading hover-text-main-600">{{ cat.name }}</router-link>
            </li>
            <li v-if="!categories.length" class="mb-16"><span class="text-gray-400">暂无分类</span></li>
          </ul>
        </div>

        <!-- QR / Payment -->
        <div class="footer-item">
          <h6 class="footer-item__title">移动端访问</h6>
          <p class="mb-16">扫码访问，便捷购物</p>
          <div class="my-32">
            <div class="flex-align gap-8">
              <div class="bg-white rounded-10 p-1 box-shadow-5xl">
                <img src="/marketpro/images/thumbs/qr-code.png" alt="QR Code">
              </div>
            </div>
            <div class="mt-24">
              <img src="/marketpro/images/thumbs/method.png" alt="支付方式">
            </div>
          </div>
        </div>

      </div>
    </div>
  </footer>

  <div class="bottom-footer py-8">
    <div class="container container-lg">
      <div class="bottom-footer__inner flex-between flex-wrap gap-16 py-16 border-top border-neutral-50">
        <p class="bottom-footer__text text-heading fw-medium">
          {{ siteName }} &copy; <span class="text-success-600 fw-semibold">{{ year }}</span> 版权所有
          <span v-if="settings.footer_text"> {{ settings.footer_text }}</span>
        </p>
        <div class="flex-align gap-8 flex-wrap">
          <ul class="flex-align gap-16">
            <li><a href="javascript:void(0)" class="w-44 h-44 flex-center bg-white shadow-sm text-main-600 text-xl rounded-circle hover-bg-main-600 hover-text-white"><i class="ph-fill ph-wechat-logo"></i></a></li>
            <li><a href="javascript:void(0)" class="w-44 h-44 flex-center bg-white shadow-sm text-main-600 text-xl rounded-circle hover-bg-main-600 hover-text-white"><i class="ph-fill ph-chat-circle-dots"></i></a></li>
            <li><a href="javascript:void(0)" class="w-44 h-44 flex-center bg-white shadow-sm text-main-600 text-xl rounded-circle hover-bg-main-600 hover-text-white"><i class="ph-fill ph-envelope"></i></a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useSiteStore } from '@/stores/site'

const site = useSiteStore()
const settings = computed(() => site.settings || {})
const siteName = computed(() => settings.value.site_name || '发卡平台')
const siteDesc = computed(() => settings.value.site_description || '')
const categories = computed(() => site.categories || [])
const year = new Date().getFullYear()
</script>
