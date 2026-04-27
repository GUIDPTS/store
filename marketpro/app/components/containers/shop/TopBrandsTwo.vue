<template>
  <div class="top-brand py-80" data-aos="fade-up" data-aos-duration="600">
    <div class="container container-lg">
      <div class="border border-gray-50 p-24 rounded-16">
        <div class="section-heading mb-24">
          <div class="flex-between flex-wrap gap-8">
            <h6 class="mb-0">Top Brands</h6>
            <div class="flex-align gap-8">
              <button
                ref="prevEl"
                type="button"
                class="slick-prev slick-arrow flex-center rounded-circle border border-gray-100 hover-border-main-two-600 text-xl hover-bg-main-two-600 hover-text-white transition-1"
              >
                <i class="ph ph-caret-left"></i>
              </button>
              <button
                ref="nextEl"
                type="button"
                class="slick-next slick-arrow flex-center rounded-circle border border-gray-100 hover-border-main-two-600 text-xl hover-bg-main-two-600 hover-text-white transition-1"
              >
                <i class="ph ph-caret-right"></i>
              </button>
            </div>
          </div>
        </div>

        <Swiper
          :modules="[Navigation, Autoplay]"
          :slides-per-view="8"
          :space-between="20"
          :autoplay="{
            delay: 2000,
            disableOnInteraction: false,
          }"
          :loop="true"
          :navigation="{ nextEl: nextEl, prevEl: prevEl }"
          :rtl="isRtl"
          :breakpoints="breakpoints"
          :speed="900"
          class="top-brand__slider"
        >
          <SwiperSlide v-for="(brand, index) in brandImages" :key="index">
            <div
              class="top-brand__item flex-center rounded-8 my-4 hover-border-main-600 transition-1 px-8 box-shadow-7xl"
            >
              <NuxtImg :src="brand.src" :alt="brand.alt" />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { brandImages } from "~/data/top-brands";

const prevEl = ref<HTMLElement | null>(null);
const nextEl = ref<HTMLElement | null>(null);

const isRtl = typeof document !== "undefined" && document.documentElement.dir === "rtl";

const breakpoints = {
  0: { slidesPerView: 2 },
  360: { slidesPerView: 3 },
  425: { slidesPerView: 4 },
  576: { slidesPerView: 5 },
  993: { slidesPerView: 6 },
  1400: { slidesPerView: 7 },
  1600: { slidesPerView: 8 },
};
</script>
