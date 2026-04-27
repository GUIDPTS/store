<template>
  <section class="product-details py-80">
    <div class="container container-lg">
      <div class="row gy-4">
        <div class="col-lg-9">
          <div class="row gy-4">
            <div class="col-xl-6">
              <div class="product-details__left">
                <div
                  class="product-details__thumb-slider-wrapper pr-1 border border-gray-100 rounded-16"
                >
                  <Swiper
                    ref="thumbsSwiperRef"
                    class="product-details__thumb-slider"
                    :modules="modules"
                    :slides-per-view="1"
                    :controller="{ control: imagesSwiper }"
                    effect="fade"
                    :fade-effect="{ crossFade: true }"
                    @swiper="onThumbsSwiper"
                  >
                    <SwiperSlide v-for="(thumb, i) in details.thumbs" :key="`thumb-${i}`">
                      <div class="product-details__thumb flex-center h-100">
                        <NuxtImg :src="thumb" :alt="`${details.title} thumb ${i + 1}`" />
                      </div>
                    </SwiperSlide>
                  </Swiper>
                </div>

                <div class="mt-24">
                  <Swiper
                    ref="imagesSwiperRef"
                    class="product-details__images-slider pr-2"
                    :modules="modules"
                    :slides-per-view="4"
                    :space-between="16"
                    :watch-slides-progress="true"
                    :watch-slides-visibility="true"
                    :controller="{ control: thumbsSwiper }"
                    @swiper="onImagesSwiper"
                  >
                    <SwiperSlide
                      v-for="(img, j) in details.images"
                      :key="`img-${j}`"
                      style="cursor: pointer"
                      @click="onImageClick(j)"
                    >
                      <div
                        class="max-h-120 h-100 flex-center border border-gray-100 rounded-16 p-8"
                      >
                        <NuxtImg :src="img" :alt="`${details.title} image ${j + 1}`" />
                      </div>
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>
            </div>

            <div class="col-xl-6">
              <div class="product-details__content">
                <h5 class="mb-12">{{ details.title }}</h5>
                <div class="flex-align flex-wrap gap-12">
                  <div class="flex-align gap-12 flex-wrap">
                    <div class="flex-align gap-8">
                      <span
                        v-for="star in 5"
                        :key="star"
                        class="text-xs fw-medium text-warning-600 d-flex"
                      >
                        <i class="ph-fill ph-star"></i>
                      </span>
                    </div>
                    <span class="text-sm fw-medium text-neutral-600"
                      >{{ details.rating }} Star Rating</span
                    >
                    <span class="text-sm fw-medium text-gray-500"
                      >({{ details.ratingCount.toLocaleString() }})</span
                    >
                  </div>
                  <span class="text-sm fw-medium text-gray-500">|</span>
                  <span class="text-gray-900">
                    <span class="text-gray-400">SKU:</span>{{ details.sku }}
                  </span>
                </div>

                <span class="mt-32 pt-32 text-gray-700 border-top border-gray-100 d-block"></span>
                <p class="text-gray-700">{{ details.description }}</p>

                <div class="mt-32 flex-align flex-wrap gap-32">
                  <div class="flex-align gap-8">
                    <h4 class="mb-0">${{ details.price.toFixed(2) }}</h4>
                    <span v-if="details.oldPrice" class="text-md text-gray-500"
                      >${{ details.oldPrice.toFixed(2) }}</span
                    >
                  </div>
                  <NuxtLink to="/" class="btn btn-main rounded-pill">Order on WhatsApp</NuxtLink>
                </div>

                <span class="mt-32 pt-32 text-gray-700 border-top border-gray-100 d-block"></span>

                <div class="flex-align flex-wrap gap-16 bg-color-one rounded-8 py-16 px-24">
                  <div class="flex-align gap-16">
                    <span class="text-main-600 text-sm">Special Offer:</span>
                  </div>
                  <div id="countdown11" class="countdown">
                    <ul class="countdown-list flex-align flex-wrap">
                      <li class="countdown-list__item text-heading ...">
                        <span class="days"></span>
                      </li>
                      <li class="countdown-list__item text-heading ...">
                        <span class="hours"></span>
                      </li>
                      <li class="countdown-list__item text-heading ...">
                        <span class="minutes"></span>
                      </li>
                      <li class="countdown-list__item text-heading ...">
                        <span class="seconds"></span>
                      </li>
                    </ul>
                  </div>
                  <span class="text-gray-900 text-xs">Remains until the end of the offer</span>
                </div>

                <div class="mb-24">
                  <div class="mt-32 flex-align gap-12 mb-16">
                    <span
                      class="w-32 h-32 bg-white flex-center rounded-circle text-main-600 box-shadow-xl"
                    >
                      <i class="ph-fill ph-lightning"></i>
                    </span>
                    <h6 class="text-md mb-0 fw-bold text-gray-900">Products are almost sold out</h6>
                  </div>
                  <div class="progress w-100 bg-gray-100 rounded-pill h-8" role="progressbar">
                    <div
                      class="progress-bar bg-main-two-600 rounded-pill"
                      :style="{ width: soldPercent + '%' }"
                    ></div>
                  </div>
                  <span class="text-sm text-gray-700 mt-8"
                    >Available only: {{ details.availableQty }}</span
                  >
                </div>

                <span class="text-gray-900 d-block mb-8">Quantity:</span>
                <div class="flex-between gap-16 flex-wrap">
                  <div class="flex-align flex-wrap gap-16">
                    <div class="border border-gray-100 rounded-pill py-9 px-16 flex-align">
                      <button
                        type="button"
                        class="quantity__minus p-4 text-gray-700 hover-text-main-600 flex-center"
                        @click="decreaseQty"
                      >
                        <i class="ph ph-minus"></i>
                      </button>
                      <input
                        v-model.number="quantity"
                        type="number"
                        class="quantity__input border-0 text-center w-32"
                        min="1"
                        :max="details.availableQty"
                      />
                      <button
                        type="button"
                        class="quantity__plus p-4 text-gray-700 hover-text-main-600 flex-center"
                        @click="increaseQty"
                      >
                        <i class="ph ph-plus"></i>
                      </button>
                    </div>
                    <NuxtLink
                      to="/"
                      class="btn btn-main rounded-pill flex-align d-inline-flex gap-8 px-48"
                    >
                      <i class="ph ph-shopping-cart"></i> Add To Cart
                    </NuxtLink>
                  </div>

                  <div class="flex-align gap-12">
                    <NuxtLink
                      to="/"
                      class="w-52 h-52 bg-main-50 text-main-600 text-xl hover-bg-main-600 hover-text-white flex-center rounded-circle"
                    >
                      <i class="ph ph-heart"></i>
                    </NuxtLink>
                    <NuxtLink
                      to="/"
                      class="w-52 h-52 bg-main-50 text-main-600 text-xl hover-bg-main-600 hover-text-white flex-center rounded-circle"
                    >
                      <i class="ph ph-shuffle"></i>
                    </NuxtLink>
                    <NuxtLink
                      to="/"
                      class="w-52 h-52 bg-main-50 text-main-600 text-xl hover-bg-main-600 hover-text-white flex-center rounded-circle"
                    >
                      <i class="ph ph-share-network"></i>
                    </NuxtLink>
                  </div>
                </div>

                <span class="mt-32 pt-32 text-gray-700 border-top border-gray-100 d-block"></span>

                <div
                  class="flex-between gap-16 p-12 border border-main-two-600 border-dashed rounded-8 mb-16"
                >
                  <div class="flex-align gap-12">
                    <button
                      type="button"
                      class="w-18 h-18 flex-center border border-gray-900 text-xs rounded-circle hover-bg-gray-100"
                    >
                      <i class="ph ph-plus"></i>
                    </button>
                    <span class="text-gray-900 fw-medium text-xs">{{ details.coupon }}</span>
                  </div>
                  <NuxtLink
                    to="/cart"
                    class="text-xs fw-semibold text-main-two-600 text-decoration-underline hover-text-main-two-700"
                  >
                    View Details
                  </NuxtLink>
                </div>

                <ul class="list-inside ms-12">
                  <li
                    v-for="(offer, idx) in details.offers ?? []"
                    :key="idx"
                    class="text-gray-900 text-sm mb-8"
                  >
                    {{ offer }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-3">
          <div class="product-details__sidebar border border-gray-100 rounded-16 overflow-hidden">
            <div class="p-24">
              <div class="flex-between bg-main-600 rounded-pill p-8">
                <div class="flex-align gap-8">
                  <span class="w-44 h-44 bg-white rounded-circle flex-center text-2xl"
                    ><i class="ph ph-storefront"></i
                  ></span>
                  <span class="text-white">by {{ details.vendor }}</span>
                </div>
                <NuxtLink to="/shop" class="btn btn-white rounded-pill text-uppercase"
                  >View Store</NuxtLink
                >
              </div>
            </div>

            <div
              v-for="(item, i) in sidebarItems"
              :key="i"
              class="p-24 bg-color-one d-flex align-items-start gap-24 border-bottom border-gray-100"
            >
              <span
                class="w-44 h-44 bg-white text-main-600 rounded-circle flex-center text-2xl flex-shrink-0"
              >
                <i :class="item.icon"></i>
              </span>
              <div>
                <h6 class="text-sm mb-8">{{ item.title }}</h6>
                <p class="text-gray-700">{{ item.text }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProductContent />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeUnmount, ref } from "vue";
import { initializeCountdown } from "@/utils/countdown";
import ProductContent from "./ProductContent.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Thumbs, Controller } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper/types";
import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/controller";

import { productDetails as detailsData } from "~/data/product-details";

const details = detailsData;

const thumbsSwiper = ref<SwiperClass | null>(null);
const imagesSwiper = ref<SwiperClass | null>(null);

const modules = [Thumbs, Controller];

function onThumbsSwiper(sw: SwiperClass) {
  thumbsSwiper.value = sw;
  if (imagesSwiper.value && thumbsSwiper.value) {
    thumbsSwiper.value.controller.control = imagesSwiper.value;
    imagesSwiper.value.controller.control = thumbsSwiper.value;
  }
}

function onImagesSwiper(sw: SwiperClass) {
  imagesSwiper.value = sw;
  if (imagesSwiper.value && thumbsSwiper.value) {
    imagesSwiper.value.controller.control = thumbsSwiper.value;
    thumbsSwiper.value.controller.control = imagesSwiper.value;
  }
}

function onImageClick(index: number) {
  thumbsSwiper.value?.slideTo(index);
}

const quantity = ref(1);
function increaseQty() {
  if (quantity.value < details.availableQty) {
    quantity.value++;
  }
}
function decreaseQty() {
  if (quantity.value > 1) {
    quantity.value--;
  }
}

const soldPercent = computed(() => {
  const total = 100;
  const sold = total - details.availableQty;
  return Math.max(Math.min((sold / total) * 100, 100), 0);
});

const sidebarItems = [
  {
    icon: "ph-fill ph-truck",
    title: "Fast Delivery",
    text: "Lightning-fast shipping, guaranteed.",
  },
  {
    icon: "ph-fill ph-arrow-u-up-left",
    title: "Free 90-day returns",
    text: "Shop risk-free with easy returns.",
  },
  {
    icon: "ph-fill ph-check-circle",
    title: "Pickup available at Shop location",
    text: "Usually ready in 24 hours",
  },
  {
    icon: "ph-fill ph-credit-card",
    title: "Payment",
    text: "Payment upon receipt of goods, Payment by card in the department, Google Pay, Online card.",
  },
  {
    icon: "ph-fill ph-check-circle",
    title: "Warranty",
    text: "The Consumer Protection Act does not provide for the return of this product of proper quality.",
  },
  {
    icon: "ph-fill ph-package",
    title: "Packaging",
    text: "Research & development value proposition graphical user interface investor.",
  },
];

const intervalId = ref<ReturnType<typeof setInterval> | null>(null);

onMounted(() => {
  intervalId.value = initializeCountdown("countdown11", "2025-12-30T23:59:59", () => {});
});

onBeforeUnmount(() => {
  if (intervalId.value) clearInterval(intervalId.value);
});
</script>
