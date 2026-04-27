<template>
  <section class="wishlist py-80">
    <div class="container container-lg">
      <h4 class="fw-semibold mb-32">我的收藏</h4>

      <div v-if="!items.length" class="text-center py-60">
        <i class="ph ph-heart d-block mb-16 text-gray-200" style="font-size:4rem;"></i>
        <p class="text-gray-400 mb-24">收藏夹为空</p>
        <router-link to="/" class="btn btn-main rounded-pill px-32 py-12">去逛逛</router-link>
      </div>

      <div v-else class="row g-12">
        <div v-for="(p, i) in items" :key="p.id" class="col-xxl-2 col-xl-3 col-md-4 col-sm-6 col-6">
          <div class="product-card h-100 p-12 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2 group-item">
            <button type="button" @click="wishlist.remove(p.id)" class="wishlist-btn-two" title="移除收藏">
              <i class="ph-fill ph-heart text-danger-600"></i>
            </button>
            <router-link :to="`/product/${p.id}`" class="product-card__thumb flex-center overflow-hidden">
              <img :src="p.image || `/marketpro/images/thumbs/product-img${((i % 24) + 7)}.png`" :alt="p.name">
            </router-link>
            <div class="product-card__content p-sm-2 w-100">
              <h6 class="title text-lg fw-semibold my-12"><router-link :to="`/product/${p.id}`" class="link text-line-2">{{ p.name }}</router-link></h6>
              <div class="product-card__price mb-8">
                <span class="text-heading text-md fw-semibold">{{ fmtPrice(p.price) }}</span>
              </div>
              <router-link :to="`/product/${p.id}`" class="product-card__cart btn bg-main-50 text-main-600 hover-bg-main-600 hover-text-white py-11 px-24 rounded-pill flex-align gap-8 w-100 justify-content-center">立即购买 <i class="ph ph-shopping-cart"></i></router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useWishlistStore } from '@/stores/wishlist'

const wishlist = useWishlistStore()
const items = computed(() => wishlist.items)
function fmtPrice(n) { return '¥' + Number(n || 0).toFixed(2) }
</script>
