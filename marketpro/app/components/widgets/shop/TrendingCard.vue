<template>
  <div class="col-xl-3 col-lg-4 col-sm-6" :data-aos="'fade-up'" data-aos-duration="200">
    <div
      class="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2"
    >
      <div class="product-card__thumb rounded-8 bg-gray-50 position-relative">
        <NuxtLink :to="product.linkProduct" class="w-100 h-100 flex-center">
          <img
            :src="product.imageSrc"
            :alt="product.altText || product.title"
            class="w-auto max-w-unset"
          />
        </NuxtLink>

        <div
          class="position-absolute inset-block-start-0 inset-inline-start-0 mt-16 ms-16 z-1 d-flex flex-column gap-8"
        >
          <span
            v-if="product.discountPercent"
            class="text-main-two-600 w-40 h-40 d-flex justify-content-center align-items-center bg-white rounded-circle shadow-sm text-xs fw-semibold"
            >-{{ product.discountPercent }}%</span
          >
          <span
            v-if="product.label"
            class="text-neutral-600 w-40 h-40 d-flex justify-content-center align-items-center bg-white rounded-circle shadow-sm text-xs fw-semibold"
            >{{ product.label }}</span
          >
        </div>
        <div
          class="bg-white p-2 rounded-pill z-1 position-absolute inset-inline-end-0 inset-block-start-0 me-16 mt-16 shadow-sm"
        >
          <button
            type="button"
            class="expand-btn w-40 h-40 text-md d-flex justify-content-center align-items-center rounded-circle"
            :class="{ 'bg-main-two-600 text-white': isExpanded }"
            @click="toggleExpand"
          >
            <i :class="isExpanded ? 'ph ph-x' : 'ph ph-plus'"></i>
          </button>

          <div class="expand-icons gap-20 my-20" :class="{ 'd-flex': isExpanded }">
            <button
              type="button"
              class="text-neutral-600 text-xl flex-center hover-text-main-two-600 wishlist-btn"
              @click="toggleWishlist"
            >
              <i :class="isWishlisted ? 'ph-fill ph-heart text-main-two-600' : 'ph ph-heart'"></i>
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

        <div
          :id="countdownId"
          class="countdown position-absolute start-50 inset-block-end-0 mb-20 translate-middle-x w-100"
        >
          <ul class="countdown-list style-four flex-center flex-wrap gap-8">
            <li
              class="countdown-list__item flex-align flex-column text-sm fw-medium text-white rounded-lg bg-neutral-600"
            >
              <span class="days text-2xl text-main-two-600 fw-medium"></span>Days
            </li>
            <li
              class="countdown-list__item flex-align flex-column text-sm fw-medium text-white rounded-lg bg-neutral-600"
            >
              <span class="hours text-2xl text-main-two-600 fw-medium"></span>Hour
            </li>
            <li
              class="countdown-list__item flex-align flex-column text-sm fw-medium text-white rounded-lg bg-neutral-600"
            >
              <span class="minutes text-2xl text-main-two-600 fw-medium"></span>Min
            </li>
            <li
              class="countdown-list__item flex-align flex-column text-sm fw-medium text-white rounded-lg bg-neutral-600"
            >
              <span class="seconds text-2xl text-main-two-600 fw-medium"></span>Sec
            </li>
          </ul>
        </div>
      </div>

      <div class="product-card__content mt-16 w-100">
        <h6 class="title text-lg fw-semibold my-16">
          <NuxtLink :to="product.linkProduct" class="link text-line-2">{{
            product.title
          }}</NuxtLink>
        </h6>

        <div class="flex-align gap-6">
          <div class="flex-align gap-8">
            <span v-for="n in 5" :key="n" class="text-xs fw-medium text-warning-600 d-flex">
              <i :class="['ph-fill ph-star', { 'opacity-30': n > product.rating }]"></i>
            </span>
          </div>
          <span class="text-xs fw-medium text-gray-500">{{ product.rating.toFixed(1) }}</span>
          <span class="text-xs fw-medium text-gray-500">({{ product.reviewsCount }})</span>
        </div>

        <span
          v-if="product.fulfilledBy"
          class="py-2 px-8 text-xs rounded-pill text-main-two-600 bg-main-two-50 mt-16"
          >Fulfilled by {{ product.fulfilledBy }}</span
        >

        <div class="product-card__price mt-16 mb-30">
          <span
            v-if="product.priceOriginal"
            class="text-gray-400 text-md fw-semibold text-decoration-line-through"
            >${{ product.priceOriginal.toFixed(2) }}</span
          >
          <span class="text-heading text-md fw-semibold">
            ${{ product.priceSale.toFixed(2) }} <span class="text-gray-500 fw-normal">/Qty</span>
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
import { ref, onMounted } from "vue";
import type { TrendingProduct } from "~/data/trending-proudcts";
import { initializeCountdown } from "~/utils/countdown";

const props = defineProps<{ product: TrendingProduct }>();

const isExpanded = ref(false);
const isWishlisted = ref(false);

const countdownId = `countdown-${props.product.id}`;

onMounted(() => {
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 96);

  initializeCountdown(countdownId, endDate.toISOString());
});

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value;
};

const toggleWishlist = () => {
  isWishlisted.value = !isWishlisted.value;
};
</script>
