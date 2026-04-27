<template>
  <div
    class="product-card px-20 pt-16 pb-40 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2"
  >
    <NuxtLink
      to="/cart"
      class="product-card__cart btn bg-main-50 text-main-600 hover-bg-main-600 hover-text-white py-11 px-24 rounded-pill flex-align gap-8 position-absolute inset-block-start-0 inset-inline-end-0 me-16 mt-16"
    >
      Add <i class="ph ph-shopping-cart"></i>
    </NuxtLink>

    <NuxtLink to="/product-details" class="product-card__thumb flex-center overflow-hidden">
      <NuxtImg :src="product.image" :alt="product.title" />
    </NuxtLink>

    <div class="product-card__content mt-12">
      <div class="product-card__price mb-8 d-flex align-items-center gap-8">
        <span class="text-heading text-md fw-semibold">
          ${{ product.price.toFixed(2) }} <span class="text-gray-500 fw-normal">/Qty</span>
        </span>
        <span class="text-gray-400 text-md fw-semibold text-decoration-line-through">
          ${{ product.oldPrice.toFixed(2) }}
        </span>
      </div>

      <div class="flex-align gap-6">
        <span class="text-xs fw-bold text-gray-600">{{ product.rating }}</span>
        <span class="text-15 fw-bold text-warning-600 d-flex"><i class="ph-fill ph-star"></i></span>
        <span class="text-xs fw-bold text-gray-600">({{ product.reviews }})</span>
      </div>

      <h6 class="title text-lg fw-semibold mt-12 mb-20">
        <NuxtLink to="/product-details" class="link text-line-2">
          {{ product.title }}
        </NuxtLink>
      </h6>

      <div class="mt-12">
        <div
          class="progress w-100 bg-color-three rounded-pill h-4"
          role="progressbar"
          :aria-valuenow="progress"
          aria-valuemin="0"
          :aria-valuemax="100"
        >
          <div
            class="progress-bar bg-main-600 rounded-pill"
            :style="{ width: `${progress}%` }"
          ></div>
        </div>
        <span class="text-gray-900 text-xs fw-medium mt-8 d-block">
          Sold: {{ product.sold.current }}/{{ product.sold.total }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { HotDealProduct } from "~/data/hot-deals";

const props = defineProps<{
  product: HotDealProduct;
}>();

const progress = computed(() =>
  Math.round((props.product.sold.current / props.product.sold.total) * 100)
);
</script>
