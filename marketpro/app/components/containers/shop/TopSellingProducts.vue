<template>
  <section
    class="top-selling-products pt-80 overflow-hidden"
    data-aos="fade-up"
    data-aos-duration="600"
  >
    <div class="container container-lg">
      <div class="border border-gray-100 p-24 rounded-16">
        <div class="section-heading mb-24">
          <div class="flex-between flex-wrap gap-8">
            <h6 class="mb-0">Top Selling Products</h6>
            <div class="flex-align gap-16">
              <NuxtLink
                to="/shop"
                class="text-sm fw-semibold text-gray-700 hover-text-main-600 hover-text-decoration-underline"
              >
                View All Products
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

        <div class="row g-12">
          <div v-if="firstProduct" class="col-md-4" data-aos="zoom-in" data-aos-duration="800">
            <div
              class="position-relative rounded-16 overflow-hidden p-28 z-1 text-center bg-main-100 h-100"
            >
              <div class="py-xl-4">
                <h6 class="mb-8 fw-bold">{{ firstProduct.title }}</h6>
                <h6 class="mb-8 fw-bold">
                  Get
                  <span class="text-main-600">{{ firstProduct.discountPercent }}%</span>
                  off
                </h6>
                <NuxtLink
                  :to="firstProduct.shopHref"
                  class="btn text-heading border-white bg-white py-16 px-24 flex-center d-inline-flex rounded-pill gap-8 fw-medium hover-bg-main-600 hover-bg-main-two-600 hover-border-main-two-600 hover-text-white mt-24"
                >
                  Shop Now
                  <i class="ph ph-shopping-cart text-xl d-flex"></i>
                </NuxtLink>
              </div>
              <div class="d-md-block d-none mt-36">
                <NuxtImg :src="firstProduct.image" :alt="firstProduct.title" />
              </div>
            </div>
          </div>
          <div v-if="topSellingProducts.length > 1" class="col-md-8">
            <Swiper
              :modules="[Navigation, Autoplay]"
              :slides-per-view="4"
              :space-between="16"
              :loop="true"
              :autoplay="{ delay: 2000, disableOnInteraction: false }"
              :speed="900"
              :rtl="isRTL"
              :navigation="{ prevEl: prevEl, nextEl: nextEl }"
              :breakpoints="swiperBreakpoints"
              class="top-selling-product-slider arrow-style-two"
            >
              <SwiperSlide v-for="product in topSellingProducts.slice(1)" :key="product.id">
                <div
                  class="product-card hover-card-shadows h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2"
                >
                  <NuxtLink
                    :to="product.href"
                    class="product-card__thumb flex-center rounded-8 position-relative"
                  >
                    <span
                      v-if="product.badge"
                      class="product-card__badge bg-main-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0"
                    >
                      {{ product.badge }}
                    </span>
                    <NuxtImg :src="product.image" :alt="product.title" class="w-auto max-w-unset" />
                  </NuxtLink>

                  <div class="product-card__content mt-16">
                    <div class="flex-align gap-6">
                      <span class="text-xs fw-medium text-gray-500">{{ product.rating }}</span>
                      <span class="text-xs fw-medium text-warning-600 d-flex">
                        <i class="ph-fill ph-star"></i>
                      </span>
                      <span class="text-xs fw-medium text-gray-500">
                        ({{ product.ratingCount }})
                      </span>
                    </div>

                    <h6 class="title text-lg fw-semibold mt-12 mb-8">
                      <NuxtLink :to="product.href" class="link text-line-2" tabindex="0">
                        {{ product.title }}
                      </NuxtLink>
                    </h6>

                    <div class="flex-align gap-4">
                      <span class="text-tertiary-600 text-md d-flex">
                        <i class="ph-fill ph-storefront"></i>
                      </span>
                      <span class="text-gray-500 text-xs">{{ product.seller }}</span>
                    </div>

                    <div class="mt-8">
                      <div
                        class="progress w-100 bg-color-three rounded-pill h-4"
                        role="progressbar"
                        aria-label="Basic example"
                        :aria-valuenow="product.discountPercent"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <div
                          class="progress-bar bg-tertiary-600 rounded-pill"
                          :style="{ width: product.discountPercent + '%' }"
                        ></div>
                      </div>
                      <span class="text-gray-900 text-xs fw-medium mt-8">
                        Sold: {{ product.sold }}/{{ product.totalStock }}
                      </span>
                    </div>

                    <div class="product-card__price my-20">
                      <span
                        v-if="product.oldPrice"
                        class="text-gray-400 text-md fw-semibold text-decoration-line-through"
                      >
                        ${{ product.oldPrice.toFixed(2) }}
                      </span>
                      <span class="text-heading text-md fw-semibold">
                        ${{ product.price.toFixed(2) }}
                        <span class="text-gray-500 fw-normal">/Qty</span>
                      </span>
                    </div>

                    <NuxtLink
                      :to="product.shopHref"
                      class="product-card__cart btn bg-gray-50 text-heading hover-bg-main-600 hover-text-white py-11 px-24 rounded-pill flex-center gap-8 fw-medium"
                    >
                      Add To Cart <i class="ph ph-shopping-cart"></i>
                    </NuxtLink>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { topSellingProducts } from "~/data/top-selling-items";

const prevEl = ref<HTMLElement | null>(null);
const nextEl = ref<HTMLElement | null>(null);

const isRTL = computed(() => {
  if (typeof document !== "undefined") {
    return document.documentElement.dir === "rtl";
  }
  return false;
});

const firstProduct = computed(() => topSellingProducts[0]);

const swiperBreakpoints = {
  0: { slidesPerView: 1 },
  575: { slidesPerView: 2 },
  1199: { slidesPerView: 2 },
  1399: { slidesPerView: 3 },
  1599: { slidesPerView: 4 },
};
</script>
