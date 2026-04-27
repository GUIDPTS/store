<template>
  <section class="new-arrival pb-80">
    <div class="container container-lg">
      <div class="section-heading">
        <div class="flex-between flex-wrap gap-8">
          <h5 class="mb-0">You Might Also Like</h5>
          <div class="flex-align gap-16">
            <NuxtLink
              to="/shop"
              class="text-sm fw-medium text-gray-700 hover-text-main-600 hover-text-decoration-underline"
            >
              All Products
            </NuxtLink>
            <div class="flex-align gap-8">
              <button
                ref="prevEl"
                type="button"
                class="slick-prev slick-arrow flex-center rounded-circle border border-gray-100 hover-border-main-600 text-xl hover-bg-main-600 hover-text-white transition-1"
              >
                <i class="ph ph-caret-left"></i>
              </button>
              <button
                ref="nextEl"
                type="button"
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
        class="new-arrival__slider arrow-style-two mt-32"
      >
        <SwiperSlide v-for="product in products" :key="product.id">
          <ArrivalCard :product="product" />
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

import { products } from "~/data/new-arrival";
import ArrivalCard from "~/components/widgets/shop/ArrivalCard.vue";

const prevEl = ref<HTMLElement | null>(null);
const nextEl = ref<HTMLElement | null>(null);

const breakpoints = {
  0: { slidesPerView: 1 },
  425: { slidesPerView: 2 },
  576: { slidesPerView: 3 },
  992: { slidesPerView: 4 },
  1400: { slidesPerView: 4 },
  1600: { slidesPerView: 6 },
};
</script>
