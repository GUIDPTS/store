<template>
  <div
    class="product-card style-two h-100 p-8 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2 flex-align gap-16"
  >
    <div>
      <span
        v-if="product.badge"
        class="product-card__badge bg-danger-600 px-8 py-4 text-sm text-white"
      >
        {{ product.badge }}
      </span>
      <NuxtLink to="product-details-two" class="product-card__thumb flex-center overflow-hidden">
        <NuxtImg :src="product.image" :alt="product.title" />
      </NuxtLink>
      <div :id="`countdown-${product.id}`" class="countdown">
        <ul class="countdown-list style-three flex-align flex-wrap">
          <li class="countdown-list__item text-heading flex-align gap-4 text-sm fw-medium">
            <span class="days"></span>Days
          </li>
          <li class="countdown-list__item text-heading flex-align gap-4 text-sm fw-medium">
            <span class="hours"></span>Hours
          </li>
          <li class="countdown-list__item text-heading flex-align gap-4 text-sm fw-medium">
            <span class="minutes"></span>Min
          </li>
          <li class="countdown-list__item text-heading flex-align gap-4 text-sm fw-medium">
            <span class="seconds"></span>Sec
          </li>
        </ul>
      </div>
    </div>

    <div class="product-card__content">
      <div class="product-card__price mb-16">
        <span class="text-gray-400 text-md fw-semibold text-decoration-line-through">
          ${{ product.oldPrice.toFixed(2) }}
        </span>
        <span class="text-heading text-md fw-semibold">
          ${{ product.price.toFixed(2) }} <span class="text-gray-500 fw-normal">/Qty</span>
        </span>
      </div>

      <div class="flex-align gap-6">
        <span class="text-xs fw-bold text-gray-600">{{ product.rating.toFixed(1) }}</span>
        <span class="text-15 fw-bold text-warning-600 d-flex"><i class="ph-fill ph-star"></i></span>
        <span class="text-xs fw-bold text-gray-600">({{ product.reviews }})</span>
      </div>

      <h6 class="title text-lg fw-semibold mt-12 mb-8">
        <NuxtLink to="product-details-two" class="link text-line-2">
          {{ product.title }}
        </NuxtLink>
      </h6>

      <div v-if="product.sellerName" class="flex-align gap-4">
        <span class="text-main-600 text-md d-flex"><i class="ph-fill ph-storefront"></i></span>
        <span class="text-gray-500 text-xs">By {{ product.sellerName }}</span>
      </div>

      <div class="mt-12">
        <div
          class="progress w-100 bg-color-three rounded-pill h-4"
          role="progressbar"
          :aria-valuenow="progress"
          aria-valuemin="0"
          aria-valuemax="100"
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

      <NuxtLink
        to="/cart"
        class="product-card__cart btn bg-main-50 text-main-600 hover-bg-main-600 hover-text-white py-11 px-24 rounded-pill flex-align gap-8 mt-24 w-100 justify-content-center"
      >
        Add To Cart <i class="ph ph-shopping-cart"></i>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { BestSellProduct } from "~/data/best-sells";

const props = defineProps<{
  product: BestSellProduct;
}>();

const progress = computed(() => {
  return Math.round((props.product.sold.current / props.product.sold.total) * 100);
});
</script>
