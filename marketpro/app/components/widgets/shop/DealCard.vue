<template>
  <div
    class="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2"
  >
    <NuxtLink
      to="/product-details-two"
      class="product-card__thumb flex-center rounded-8 position-relative"
    >
      <span
        v-if="product.badge"
        :class="`product-card__badge bg-${product.badge.type}-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0`"
      >
        {{ product.badge.label }}
      </span>
      <NuxtImg :src="product.image" alt="" class="w-auto max-w-unset" />
    </NuxtLink>

    <div class="product-card__content mt-16">
      <h6 class="title text-lg fw-semibold mt-12 mb-8">
        <NuxtLink to="/product-details-two" class="link text-line-2">
          {{ product.title }}
        </NuxtLink>
      </h6>

      <div class="flex-align gap-6">
        <span class="text-xs fw-medium text-gray-500">{{ product.rating }}</span>
        <span class="text-xs fw-medium text-warning-600 d-flex">
          <i class="ph-fill ph-star"></i>
        </span>
        <span class="text-xs fw-medium text-gray-500">({{ product.reviews }})</span>
      </div>

      <div class="mt-8">
        <div
          class="progress w-100 bg-color-three rounded-pill h-4"
          role="progressbar"
          :aria-valuenow="product.progress"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <div
            class="progress-bar bg-tertiary-600 rounded-pill"
            :style="{ width: `${product.progress}%` }"
          ></div>
        </div>
        <span class="text-gray-900 text-xs fw-medium mt-8">Sold: {{ product.sold }}</span>
      </div>

      <div class="product-card__price my-20">
        <span class="text-gray-400 text-md fw-semibold text-decoration-line-through">
          {{ product.oldPrice }}
        </span>
        <span class="text-heading text-md fw-semibold">
          {{ product.newPrice }}
          <span class="text-gray-500 fw-normal">/Qty</span>
        </span>
      </div>

      <NuxtLink
        to="/cart"
        class="product-card__cart btn bg-gray-50 text-heading hover-bg-main-600 hover-text-white py-11 px-24 rounded-pill flex-center gap-8 fw-medium"
      >
        Add To Cart <i class="ph ph-shopping-cart"></i>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DealProduct } from "~/data/deal-week";

defineProps<{ product: DealProduct }>();
</script>
