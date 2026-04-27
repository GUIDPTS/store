<template>
  <div
    class="product-card h-100 d-flex gap-16 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2"
  >
    <NuxtLink
      :to="product.link"
      class="product-card__thumb flex-center h-unset rounded-8 bg-gray-50 position-relative w-unset flex-shrink-0 p-24"
      tabindex="0"
    >
      <NuxtImg :src="product.image" :alt="product.title" class="w-auto max-w-unset" />
    </NuxtLink>

    <div class="product-card__content flex-grow-1">
      <h6 class="title text-lg fw-semibold mb-12">
        <NuxtLink :to="product.link" class="link text-line-2" tabindex="0">
          {{ product.title }}
        </NuxtLink>
      </h6>

      <div v-for="(category, index) in product.categories" :key="index">
        <span
          class="text-gray-600 text-sm"
          :class="{
            'mb-4': index !== product.categories.length - 1,
            'mb-0': index === product.categories.length - 1,
          }"
        >
          {{ category }}
        </span>
      </div>

      <NuxtLink to="/shop" class="text-tertiary-600 flex-align gap-8 mt-24">
        All Categories
        <i class="ph ph-arrow-right d-flex"></i>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from "~/data/popular-products-two";

defineProps<{
  product: Product;
}>();
</script>
