<template>
  <section class="product pt-60" data-aos="fade-up" data-aos-duration="600">
    <div class="container container-lg">
      <div class="section-heading">
        <div class="flex-between flex-wrap gap-8">
          <h5 class="mb-0" data-aos="fade-left" data-aos-duration="600">Flash Sales Today</h5>
          <div class="flex-align gap-16" data-aos="fade-right" data-aos-duration="600">
            <NuxtLink
              to="/shop"
              class="text-sm fw-medium text-gray-700 hover-text-main-600 hover-text-decoration-underline"
            >
              View All Deals
            </NuxtLink>
            <div class="flex-align gap-8">
              <button
                ref="prevEl"
                class="slick-prev slick-arrow flex-center rounded-circle border border-gray-100 hover-border-main-600 text-xl hover-bg-main-600 hover-text-white transition-1"
              >
                <i class="ph ph-caret-left"></i>
              </button>
              <button
                ref="nextEl"
                class="slick-next slick-arrow flex-center rounded-circle border border-gray-100 hover-border-main-600 text-xl hover-bg-main-600 hover-text-white transition-1"
              >
                <i class="ph ph-caret-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <Swiper
        :modules="[Navigation]"
        :slides-per-view="6"
        :space-between="24"
        :loop="true"
        :navigation="{ prevEl: prevEl, nextEl: nextEl }"
        :breakpoints="breakpoints"
        class="product-one-slider g-12"
      >
        <SwiperSlide v-for="(product, index) in products" :key="index">
          <div
            class="product-card px-20 py-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2"
          >
            <NuxtLink
              to="/cart"
              class="product-card__cart btn bg-main-50 text-main-600 hover-bg-main-600 hover-text-white py-11 px-24 rounded-pill flex-align gap-8 position-absolute inset-block-start-0 inset-inline-end-0 me-16 mt-16"
            >
              Add <i class="ph ph-shopping-cart"></i>
            </NuxtLink>

            <NuxtLink :to="`/product/${product.id}`" class="product-card__thumb flex-center overflow-hidden">
              <NuxtImg :src="product.image" alt="Product" />
            </NuxtLink>

            <div class="product-card__content mt-12">
              <div class="product-card__price mb-8 d-flex align-items-center gap-8">
                <span class="text-heading text-md fw-semibold">
                  {{ product.price }} <span class="text-gray-500 fw-normal">/Qty</span>
                </span>
                <span class="text-gray-400 text-md fw-semibold text-decoration-line-through">
                  {{ product.oldPrice }}
                </span>
              </div>
              <div class="flex-align gap-6">
                <template v-if="product.rating > 0">
                  <span class="text-xs fw-bold text-gray-600">{{ product.rating.toFixed(1) }}</span>
                  <span class="text-15 fw-bold text-warning-600 d-flex"><i class="ph-fill ph-star"></i></span>
                  <span class="text-xs fw-bold text-gray-600">({{ product.reviewCount }})</span>
                </template>
                <span v-else class="text-xs fw-bold text-gray-600">{{ product.reviews }} Sold</span>
              </div>
              <h6 class="title text-lg fw-semibold mt-12 mb-20">
                <NuxtLink :to="`/product/${product.id}`" class="link text-line-2">
                  {{ product.name }}
                </NuxtLink>
              </h6>
              <div class="mt-12">
                <div class="progress w-100 bg-color-three rounded-pill h-4">
                  <div
                    class="progress-bar bg-main-600 rounded-pill"
                    :style="{ width: product.soldPercent + '%' }"
                  ></div>
                </div>
                <span class="text-gray-900 text-xs fw-medium mt-8">
                  Sold: {{ product.sold }}/{{ product.total }}
                </span>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { useHomeData, toFlashSale } from "~/composables/useHomeData";

const prevEl = ref<HTMLElement | null>(null);
const nextEl = ref<HTMLElement | null>(null);

const { products: apiProducts, fetchAll } = useHomeData();
const products = computed(() => apiProducts.value.map(toFlashSale));

onMounted(() => fetchAll());

const breakpoints = {
  0: { slidesPerView: 1 },
  425: { slidesPerView: 2 },
  576: { slidesPerView: 3 },
  992: { slidesPerView: 4 },
  1400: { slidesPerView: 5 },
  1600: { slidesPerView: 6 },
};
</script>
