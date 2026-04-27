<template>
  <section class="product-details py-80">
    <div class="container container-lg">
      <div class="row gy-4">
        <div class="col-xl-9">
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
                    effect="fade"
                    :fade-effect="{ crossFade: true }"
                    :controller="{ control: imagesSwiper }"
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
                        class="max-w-120 max-h-120 h-100 flex-center border border-gray-100 rounded-16 p-8"
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
                <div
                  class="flex-center mb-24 flex-wrap gap-16 bg-color-one rounded-8 py-16 px-24 position-relative z-1"
                >
                  <img
                    src="/images/bg/details-offer-bg.png"
                    alt=""
                    class="position-absolute inset-block-start-0 inset-inline-start-0 w-100 h-100 z-n1"
                  />
                  <div class="flex-align gap-16">
                    <span class="text-white text-sm">Special Offer:</span>
                  </div>
                  <div id="countdown11" class="countdown">
                    <ul class="countdown-list flex-align flex-wrap">
                      <li
                        class="countdown-list__item text-heading flex-align gap-4 text-xs fw-medium w-28 h-28 rounded-4 border border-main-600 p-0 flex-center"
                      >
                        <span class="days"></span>
                      </li>
                      <li
                        class="countdown-list__item text-heading flex-align gap-4 text-xs fw-medium w-28 h-28 rounded-4 border border-main-600 p-0 flex-center"
                      >
                        <span class="hours"></span>
                      </li>
                      <li
                        class="countdown-list__item text-heading flex-align gap-4 text-xs fw-medium w-28 h-28 rounded-4 border border-main-600 p-0 flex-center"
                      >
                        <span class="minutes"></span>
                      </li>
                      <li
                        class="countdown-list__item text-heading flex-align gap-4 text-xs fw-medium w-28 h-28 rounded-4 border border-main-600 p-0 flex-center"
                      >
                        <span class="seconds"></span>
                      </li>
                    </ul>
                  </div>
                  <span class="text-white text-xs">Remains until the end of the offer</span>
                </div>

                <h5 class="mb-12">{{ details.title }}</h5>
                <div class="flex-align flex-wrap gap-12">
                  <div class="flex-align gap-12 flex-wrap">
                    <div class="flex-align gap-8">
                      <span
                        v-for="n in 5"
                        :key="n"
                        class="text-xs fw-medium text-warning-600 d-flex"
                      >
                        <i class="ph-fill ph-star"></i>
                      </span>
                    </div>
                    <span class="text-sm fw-medium text-neutral-600">
                      {{ details.rating }} Star Rating
                    </span>
                    <span class="text-sm fw-medium text-gray-500">
                      ({{ details.ratingCount }})
                    </span>
                  </div>
                  <span class="text-sm fw-medium text-gray-500">|</span>
                  <span class="text-gray-900">
                    <span class="text-gray-400">SKU:</span>{{ details.sku }}
                  </span>
                </div>
                <span class="mt-32 pt-32 text-gray-700 border-top border-gray-100 d-block"></span>
                <p class="text-gray-700">{{ details.description }}</p>

                <div class="my-32 flex-align gap-16 flex-wrap">
                  <div class="flex-align gap-8">
                    <div class="flex-align gap-8 text-main-two-600">
                      <i class="ph-fill ph-seal-percent text-xl"></i>
                      {{ details.discountPercent }}%
                    </div>
                    <h6 class="mb-0">{{ formattedPrice(details.price) }}</h6>
                  </div>
                  <div class="flex-align gap-8">
                    <span class="text-gray-700">Regular Price</span>
                    <h6 class="text-xl text-gray-400 mb-0 fw-medium">
                      {{ formattedPrice(details.regularPrice) }}
                    </h6>
                  </div>
                </div>

                <div class="my-32 flex-align flex-wrap gap-12">
                  <NuxtLink
                    to="/"
                    class="px-12 py-8 text-sm rounded-8 flex-align gap-8 text-gray-900 border border-gray-200 hover-border-main-600 hover-text-main-600"
                  >
                    Monthly EMI {{ formattedPrice(details.emi) }}
                    <i class="ph ph-caret-right"></i>
                  </NuxtLink>
                  <NuxtLink
                    to="/"
                    class="px-12 py-8 text-sm rounded-8 flex-align gap-8 text-gray-900 border border-gray-200 hover-border-main-600 hover-text-main-600"
                  >
                    Shipping Charge
                    <i class="ph ph-caret-right"></i>
                  </NuxtLink>
                  <NuxtLink
                    to="/"
                    class="px-12 py-8 text-sm rounded-8 flex-align gap-8 text-gray-900 border border-gray-200 hover-border-main-600 hover-text-main-600"
                  >
                    Security & Privacy
                    <i class="ph ph-caret-right"></i>
                  </NuxtLink>
                </div>

                <span class="mt-32 pt-32 text-gray-700 border-top border-gray-100 d-block"></span>

                <a
                  href="https://www.whatsapp.com"
                  class="btn btn-black flex-center gap-8 rounded-8 py-16"
                >
                  <i class="ph ph-whatsapp-logo text-lg"></i>
                  Request More Information
                </a>

                <div class="mt-32">
                  <span class="fw-medium text-gray-900"> 100% Guarantee Safe Checkout </span>
                  <div class="mt-10">
                    <NuxtImg :src="details.gatewayImage" alt="payment gateways" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-3">
          <div class="product-details__sidebar py-40 px-32 border border-gray-100 rounded-16">
            <div class="mb-32">
              <label for="delivery" class="h6 activePage mb-8 text-heading fw-semibold d-block"
                >Delivery</label
              >
              <div class="flex-align border border-gray-100 rounded-4 px-16">
                <span class="text-xl d-flex text-main-600">
                  <i class="ph ph-map-pin"></i>
                </span>
                <select
                  id="delivery"
                  v-model="deliveryLocation"
                  class="common-input border-0 px-8 rounded-4"
                >
                  <option v-for="(loc, li) in details.deliveryOptions" :key="li" :value="loc">
                    {{ loc }}
                  </option>
                </select>
              </div>
            </div>
            <div class="mb-32">
              <label for="stock" class="text-lg mb-8 text-heading fw-semibold d-block"
                >Total Stock: {{ details.availableQty }}</label
              >
              <span class="text-xl d-flex">
                <i class="ph ph-location"></i>
              </span>
              <div class="d-flex rounded-4 overflow-hidden">
                <button
                  type="button"
                  class="quantity__minus flex-shrink-0 h-48 w-48 text-neutral-600 bg-gray-50 flex-center hover-bg-main-600 hover-text-white"
                  @click="decreaseQty"
                >
                  <i class="ph ph-minus"></i>
                </button>
                <input
                  id="stock"
                  v-model.number="quantity"
                  type="number"
                  class="quantity__input flex-grow-1 border border-gray-100 border-start-0 border-end-0 text-center w-32 px-16"
                  :min="1"
                  :max="details.availableQty"
                />
                <button
                  type="button"
                  class="quantity__plus flex-shrink-0 h-48 w-48 text-neutral-600 bg-gray-50 flex-center hover-bg-main-600 hover-text-white"
                  @click="increaseQty"
                >
                  <i class="ph ph-plus"></i>
                </button>
              </div>
            </div>
            <div class="mb-32">
              <div class="flex-between flex-wrap gap-8 border-bottom border-gray-100 pb-16 mb-16">
                <span class="text-gray-500">Price</span>
                <h6 class="text-lg mb-0">{{ formattedPrice(details.price) }}</h6>
              </div>
              <div class="flex-between flex-wrap gap-8">
                <span class="text-gray-500">Shipping</span>
                <h6 class="text-lg mb-0">{{ formattedPrice(details.shipping) }}</h6>
              </div>
            </div>

            <NuxtLink
              to="/cart"
              class="btn btn-main flex-center gap-8 rounded-8 py-16 fw-normal mt-48"
            >
              <i class="ph ph-shopping-cart-simple text-lg"></i>
              Add To Cart
            </NuxtLink>
            <NuxtLink to="/cart" class="btn btn-outline-main rounded-8 py-16 fw-normal mt-16 w-100">
              Buy Now
            </NuxtLink>

            <div class="mt-32">
              <div class="px-16 py-8 bg-main-50 rounded-8 flex-between gap-24 mb-14">
                <span
                  class="w-32 h-32 bg-white text-main-600 rounded-circle flex-center text-xl flex-shrink-0"
                >
                  <i class="ph-fill ph-truck"></i>
                </span>
                <span class="text-sm text-neutral-600"
                  >Ship from <span class="fw-semibold">{{ details.shipFrom }}</span></span
                >
              </div>
              <div class="px-16 py-8 bg-main-50 rounded-8 flex-between gap-24 mb-0">
                <span
                  class="w-32 h-32 bg-white text-main-600 rounded-circle flex-center text-xl flex-shrink-0"
                >
                  <i class="ph-fill ph-storefront"></i>
                </span>
                <span class="text-sm text-neutral-600"
                  >Sold by: <span class="fw-semibold">{{ details.soldBy }}</span></span
                >
              </div>
            </div>

            <div class="mt-32">
              <div class="px-32 py-16 rounded-8 border border-gray-100 flex-between gap-8">
                <NuxtLink to="/" class="d-flex text-main-600 text-28"
                  ><i class="ph-fill ph-chats-teardrop"></i
                ></NuxtLink>
                <span class="h-26 border border-gray-100"></span>

                <div class="dropdown on-hover-item">
                  <button class="d-flex text-main-600 text-28" type="button">
                    <i class="ph-fill ph-share-network"></i>
                  </button>
                  <div
                    class="on-hover-dropdown common-dropdown border-0 inset-inline-start-auto inset-inline-end-0"
                  >
                    <ul class="flex-align gap-16">
                      <li v-for="(social, si) in details.socialLinks" :key="si">
                        <NuxtLink
                          :to="social.href"
                          class="w-44 h-44 flex-center bg-main-100 text-main-600 text-xl rounded-circle hover-bg-main-600 hover-text-white"
                        >
                          <i :class="social.iconClass"></i>
                        </NuxtLink>
                      </li>
                    </ul>
                  </div>
                </div>
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

import { productDetails } from "~/data/product-details-two";
const details = ref(productDetails);

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
  if (quantity.value < details.value.availableQty) {
    quantity.value++;
  }
}
function decreaseQty() {
  if (quantity.value > 1) {
    quantity.value--;
  }
}

const deliveryLocation = ref(details.value.deliveryOptions[0]);

function formattedPrice(val: number) {
  return `$${val.toFixed(2)}`;
}

const intervalId = ref<ReturnType<typeof setInterval> | null>(null);

onMounted(() => {
  intervalId.value = initializeCountdown("countdown11", "2025-12-30T23:59:59", () => {});
});

onBeforeUnmount(() => {
  if (intervalId.value) clearInterval(intervalId.value);
});
</script>
