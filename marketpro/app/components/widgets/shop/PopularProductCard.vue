<template>
  <div
    class="col-xxl-3 col-xl-4 col-sm-6"
    :data-aos="'fade-up'"
    :data-aos-duration="animationDuration"
  >
    <div
      class="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2"
    >
      <div class="product-card__thumb rounded-8 bg-gray-50 position-relative">
        <NuxtLink :to="product.link" class="w-100 h-100 flex-center">
          <img :src="product.image" alt="" class="w-auto max-w-unset" />
        </NuxtLink>

        <div
          class="position-absolute inset-block-start-0 inset-inline-start-0 mt-16 ms-16 z-1 d-flex flex-column gap-8"
        >
          <span
            class="text-main-two-600 w-40 h-40 d-flex justify-content-center align-items-center bg-white rounded-circle shadow-sm text-xs fw-semibold"
          >
            {{ product.discount }}
          </span>
          <span
            class="text-neutral-600 w-40 h-40 d-flex justify-content-center align-items-center bg-white rounded-circle shadow-sm text-xs fw-semibold"
          >
            {{ product.tag }}
          </span>
        </div>

        <div
          class="bg-white p-2 rounded-pill z-1 position-absolute inset-inline-end-0 inset-block-start-0 me-16 mt-16 shadow-sm"
        >
          <button
            type="button"
            :class="[
              'expand-btn',
              'w-40',
              'h-40',
              'text-md',
              'd-flex',
              'justify-content-center',
              'align-items-center',
              'rounded-circle',
              'hover-bg-main-two-600',
              'hover-text-white',
              { 'bg-main-two-600 text-white': isExpanded },
            ]"
            @click="toggleExpand"
          >
            <i :class="isExpanded ? 'ph ph-x' : 'ph ph-plus'"></i>
          </button>

          <div
            class="expand-icons gap-20 my-20"
            :class="{ 'd-flex': isExpanded, 'd-none': !isExpanded }"
          >
            <button
              type="button"
              :class="[
                'text-xl',
                'flex-center',
                'wishlist-btn',
                isWishlisted ? 'text-main-two-600' : 'text-neutral-600',
              ]"
              @click="toggleWishlist"
            >
              <i :class="isWishlisted ? 'ph-fill ph-heart' : 'ph ph-heart'"></i>
            </button>

            <button
              type="button"
              class="text-neutral-600 text-xl flex-center hover-text-main-two-600"
            >
              <i class="ph ph-eye"></i>
            </button>
            <button
              type="button"
              class="text-neutral-600 text-xl flex-center hover-text-main-two-600"
            >
              <i class="ph ph-shuffle"></i>
            </button>
          </div>
        </div>
      </div>

      <div class="product-card__content mt-16 w-100">
        <h6 class="title text-lg fw-semibold my-16">
          <NuxtLink :to="product.link" class="link text-line-2">
            {{ product.title }}
          </NuxtLink>
        </h6>

        <div class="flex-align gap-6">
          <div class="flex-align gap-8">
            <span v-for="n in 5" :key="n" class="text-xs fw-medium text-warning-600 d-flex">
              <i class="ph-fill ph-star"></i>
            </span>
          </div>
          <span class="text-xs fw-medium text-gray-500">{{ product.rating }}</span>
          <span class="text-xs fw-medium text-gray-500">({{ product.reviews }})</span>
        </div>

        <span
          class="py-2 px-8 text-xs rounded-pill text-main-two-600 bg-main-two-50 mt-16 d-inline-block"
        >
          {{ product.fulfilledBy }}
        </span>

        <div class="product-card__price mt-16 mb-30">
          <span class="text-gray-400 text-md fw-semibold text-decoration-line-through">
            {{ product.oldPrice }}
          </span>
          <span class="text-heading text-md fw-semibold">
            {{ product.newPrice }} <span class="text-gray-500 fw-normal">/Qty</span>
          </span>
        </div>

        <NuxtLink
          to="/cart"
          class="product-card__cart btn bg-gray-50 text-heading hover-bg-main-600 hover-text-white py-11 px-24 rounded-8 flex-center gap-8 fw-medium"
        >
          Add To Cart <i class="ph ph-shopping-cart"></i>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { Product } from "~/data/popular-products";

defineProps<{
  product: Product;
  animationDuration: number;
}>();

const isExpanded = ref(false);
const isWishlisted = ref(false);

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value;
};

const toggleWishlist = () => {
  isWishlisted.value = !isWishlisted.value;
};
</script>
