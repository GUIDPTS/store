<template>
  <section class="cart py-80">
    <div class="container container-lg">
      <h4 class="fw-semibold mb-32">购物车</h4>

      <div v-if="!items.length" class="text-center py-60">
        <i class="ph ph-shopping-cart d-block mb-16 text-gray-200" style="font-size:4rem;"></i>
        <p class="text-gray-400 mb-24">购物车为空</p>
        <router-link to="/" class="btn btn-main rounded-pill px-32 py-12">去逛逛</router-link>
      </div>

      <div v-else class="row g-4">
        <div class="col-lg-8">
          <div class="border border-gray-100 rounded-16 overflow-hidden">
            <div v-for="item in items" :key="item.id" class="d-flex align-items-center gap-16 p-20 border-bottom border-gray-100">
              <router-link :to="`/product/${item.id}`" class="flex-shrink-0">
                <img :src="item.image || '/marketpro/images/thumbs/product-img7.png'" :alt="item.name" style="width:72px;height:72px;object-fit:contain;border-radius:8px;">
              </router-link>
              <div class="flex-1 min-w-0">
                <h6 class="fw-semibold mb-4 text-line-2">
                  <router-link :to="`/product/${item.id}`" class="text-heading hover-text-main-600">{{ item.name }}</router-link>
                </h6>
                <p class="text-main-600 fw-bold mb-0">{{ fmtPrice(item.price) }}</p>
              </div>
              <div class="d-flex align-items-center gap-8 flex-shrink-0">
                <div class="border border-gray-100 rounded-pill py-6 px-12 d-flex align-items-center gap-4">
                  <button type="button" @click="cart.updateQty(item.id, item.qty - 1)" style="background:none;border:none;cursor:pointer;"><i class="ph ph-minus text-sm"></i></button>
                  <span class="text-sm fw-medium" style="min-width:24px;text-align:center;">{{ item.qty }}</span>
                  <button type="button" @click="cart.updateQty(item.id, item.qty + 1)" style="background:none;border:none;cursor:pointer;"><i class="ph ph-plus text-sm"></i></button>
                </div>
                <button type="button" @click="cart.remove(item.id)" class="w-32 h-32 rounded-circle bg-danger-50 text-danger-600 d-flex align-items-center justify-content-center" style="border:0;"><i class="ph ph-trash"></i></button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="border border-gray-100 rounded-16 p-24">
            <h6 class="fw-semibold mb-20">订单摘要</h6>
            <div class="d-flex justify-content-between mb-12">
              <span class="text-sm text-gray-600">商品总数</span>
              <span class="text-sm fw-medium">{{ cart.count }} 件</span>
            </div>
            <div class="d-flex justify-content-between mb-24 border-top border-gray-100 pt-12">
              <span class="fw-semibold">合计</span>
              <span class="fw-bold text-main-600 text-xl">{{ fmtPrice(cart.total) }}</span>
            </div>
            <router-link v-if="auth.user" to="/checkout" class="btn btn-main w-100 py-14 rounded-pill fw-semibold">前往结算</router-link>
            <a v-else href="/auth/login" class="btn btn-main w-100 py-14 rounded-pill fw-semibold">登录后结算</a>
            <router-link to="/" class="btn btn-white w-100 py-14 rounded-pill fw-semibold mt-12 border border-gray-200">继续购物</router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'

const cart = useCartStore()
const auth = useAuthStore()
const items = computed(() => cart.items)

function fmtPrice(n) { return '¥' + Number(n || 0).toFixed(2) }
</script>
