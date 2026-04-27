<template>
  <section class="featured-products overflow-hidden" data-aos="fade-up" data-aos-duration="600">
    <div class="container container-lg">
      <div class="row g-4 flex-wrap-reverse">
        <div class="col-xxl-8">
          <div class="border border-gray-100 p-24 rounded-16">
            <div class="section-heading mb-24">
              <div class="flex-between flex-wrap gap-8">
                <h6 class="mb-0">Featured Products</h6>
                <div class="flex-align gap-16">
                  <NuxtLink
                    to="/shop"
                    class="text-sm fw-medium text-gray-700 hover-text-main-600 hover-text-decoration-underline"
                  >
                    View All Deals
                  </NuxtLink>
                  <div class="flex-align gap-8">
                    <button
                      ref="prevEl"
                      type="button"
                      class="slick-prev slick-arrow flex-center rounded-circle border border-gray-100 hover-border-neutral-600 text-xl hover-bg-neutral-600 hover-text-white transition-1"
                    >
                      <i class="ph ph-caret-left"></i>
                    </button>
                    <button
                      ref="nextEl"
                      type="button"
                      class="slick-next slick-arrow flex-center rounded-circle border border-gray-100 hover-border-neutral-600 text-xl hover-bg-neutral-600 hover-text-white transition-1"
                    >
                      <i class="ph ph-caret-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <Swiper
              class="featured-product-slider"
              :modules="[Navigation, Autoplay]"
              :slides-per-view="1"
              :loop="true"
              :autoplay="{ delay: 2000, disableOnInteraction: false, pauseOnMouseEnter: true }"
              :speed="900"
              :space-between="24"
              :navigation="{
                prevEl: prevElRef,
                nextEl: nextElRef,
              }"
              :breakpoints="{
                992: {
                  slidesPerView: 2,
                },
              }"
              :rtl="isRtl"
            >
              <SwiperSlide v-for="(productPair, index) in productPairs" :key="index">
                <div class="d-flex flex-column gap-24">
                  <div
                    v-for="product in productPair"
                    :key="product.id"
                    class="product-card d-flex gap-16 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2 flex-grow-1"
                  >
                    <NuxtLink
                      :to="product.href"
                      class="product-card__thumb flex-center h-unset rounded-8 position-relative w-unset flex-shrink-0 p-24"
                    >
                      <span
                        v-if="product.badge"
                        class="product-card__badge bg-tertiary-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0"
                      >
                        {{ product.badge }}
                      </span>
                      <NuxtImg
                        :src="product.image"
                        :alt="product.title"
                        class="w-auto max-w-unset"
                      />
                    </NuxtLink>
                    <div class="product-card__content my-20 flex-grow-1">
                      <h6 class="title text-lg fw-semibold mb-12">
                        <NuxtLink :to="product.href" class="link text-line-2">
                          {{ product.title }}
                        </NuxtLink>
                      </h6>
                      <div class="flex-align gap-6 mb-12">
                        <span class="text-xs fw-medium text-gray-500">{{
                          product.rating.toFixed(1)
                        }}</span>
                        <span class="text-xs fw-medium text-warning-600 d-flex">
                          <i class="ph-fill ph-star"></i>
                        </span>
                        <span class="text-xs fw-medium text-gray-500"
                          >({{ product.ratingCount }})</span
                        >
                      </div>
                      <div class="flex-align gap-4">
                        <span class="text-main-two-600 text-md d-flex">
                          <i class="ph-fill ph-storefront"></i>
                        </span>
                        <span class="text-gray-500 text-xs"> By {{ product.storeName }} </span>
                      </div>
                      <div class="product-card__price my-20">
                        <span
                          v-if="product.originalPrice"
                          class="text-gray-400 text-md fw-semibold text-decoration-line-through"
                        >
                          ${{ product.originalPrice }}
                        </span>
                        <span class="text-heading text-md fw-semibold">
                          ${{ product.price }}
                          <span v-if="product.priceUnit" class="text-gray-500 fw-normal">{{
                            product.priceUnit
                          }}</span>
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
              </SwiperSlide>
            </Swiper>
          </div>
        </div>

        <div class="col-xxl-4">
          <div
            class="position-relative rounded-16 bg-light-purple overflow-hidden p-28 pb-0 z-1 text-center h-100"
          >
            <img
              :src="promo.bgImage"
              alt=""
              class="position-absolute inset-block-start-0 inset-inline-start-0 z-n1 w-100 h-100 cover-img"
            />
            <div class="py-xl-4 text-center">
              <span class="h6 mb-20 text-white">{{ promo.title }}</span>
              <div class="flex-center gap-12 text-white">
                <span>FROM</span>
                <h4 class="mb-8 fw-semibold text-white">${{ promo.priceFrom }}</h4>
                <span
                  v-if="promo.discountPct"
                  class="badge-style-two position-relative me-8 bg-paste text-white text-sm py-2 px-8 rounded-4"
                >
                  {{ promo.discountPct }}% off
                </span>
              </div>
              <NuxtLink
                :to="promo.href"
                class="btn text-heading border-white bg-white py-16 px-24 flex-center d-inline-flex rounded-pill gap-8 fw-medium hover-bg-main-600 hover-border-main-two-600 hover-text-white mt-16 mb-24 box-shadow-5xl"
              >
                Shop Now
                <span class="icon text-xl d-flex"><i class="ph ph-arrow-right"></i></span>
              </NuxtLink>
            </div>
            <img
              v-if="promo.image"
              :src="promo.image"
              alt=""
              class="d-xxl-inline-flex d-none"
              data-aos="zoom-in"
              data-aos-duration="600"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import type { Product } from "~/data/featured-products";
import { featuredProducts, featuredPromo } from "~/data/featured-products";

const products = ref<Product[]>(featuredProducts);
const promo = featuredPromo;

const prevEl = ref<HTMLElement | null>(null);
const nextEl = ref<HTMLElement | null>(null);

const prevElRef = computed(() => prevEl.value);
const nextElRef = computed(() => nextEl.value);

const isRtl = ref(false);

onMounted(() => {
  isRtl.value = document.documentElement.dir === "rtl";
});

function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

const productPairs = computed(() => chunkArray(products.value, 2));
</script>
