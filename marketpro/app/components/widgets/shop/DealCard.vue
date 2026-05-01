<template>
  <div class="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
    <NuxtLink :to="`/product/${product.id}`"
      class="product-card__thumb flex-center rounded-8 position-relative">
      <img :src="product.image || '/images/thumbs/product-two-img1.png'" :alt="product.name"
        style="max-height:140px;object-fit:contain;width:100%" />
    </NuxtLink>

    <div class="product-card__content mt-16">
      <h6 class="title text-lg fw-semibold mt-12 mb-8">
        <NuxtLink :to="`/product/${product.id}`" class="link text-line-2">
          {{ product.name }}
        </NuxtLink>
      </h6>

      <div class="mt-8">
        <div class="progress w-100 bg-color-three rounded-pill h-4"
          role="progressbar" :aria-valuenow="soldPct" aria-valuemin="0" aria-valuemax="100">
          <div class="progress-bar bg-tertiary-600 rounded-pill" :style="{ width: `${soldPct}%` }"></div>
        </div>
        <span class="text-gray-900 text-xs fw-medium mt-8 d-block">
          Sold: {{ product.sales_count || 0 }}
        </span>
      </div>

      <div class="product-card__price my-20">
        <span v-if="product.orig_price > product.price"
          class="text-gray-400 text-md fw-semibold text-decoration-line-through">
          ¥{{ product.orig_price }}
        </span>
        <span class="text-heading text-md fw-semibold">
          ¥{{ product.is_promo_active ? product.promo_price : product.price }}
          <span class="text-gray-500 fw-normal">/件</span>
        </span>
      </div>

      <NuxtLink :to="`/product/${product.id}`"
        class="product-card__cart btn bg-gray-50 text-heading hover-bg-main-600 hover-text-white py-11 px-24 rounded-pill flex-center gap-8 fw-medium">
        立即购买 <i class="ph ph-arrow-right"></i>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{ product: any }>();

const soldPct = computed(() => {
  const total = (props.product.sales_count || 0) + (props.product.stock_count || 0);
  if (!total) return 0;
  return Math.min(Math.round(((props.product.sales_count || 0) / total) * 100), 100);
});
</script>
