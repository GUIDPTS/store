<template>
  <section class="instagram py-120 overflow-hidden" data-aos="fade-up" data-aos-duration="600">
    <div class="container container-lg">
      <div class="section-heading">
        <div class="flex-between flex-wrap gap-8">
          <div>
            <h5 class="mb-0 text-uppercase">Instagram</h5>
            <p class="text-gray-500">Get inspired by Carina fans from all around the world</p>
          </div>
          <div class="flex-align gap-16">
            <NuxtLink
              to="/shop"
              class="text-sm fw-semibold text-gray-700 hover-text-main-600 hover-text-decoration-underline"
              >View All</NuxtLink
            >
            <div class="flex-align gap-8">
              <button
                ref="prevEl"
                type="button"
                class="slick-prev slick-arrow flex-center rounded-circle border border-gray-100 hover-border-main-600 text-xl hover-bg-main-600 hover-text-white transition-1"
                aria-label="Previous Instagram Slide"
              >
                <i class="ph ph-caret-left"></i>
              </button>
              <button
                ref="nextEl"
                type="button"
                class="slick-next slick-arrow flex-center rounded-circle border border-gray-100 hover-border-main-600 text-xl hover-bg-main-600 hover-text-white transition-1"
                aria-label="Next Instagram Slide"
              >
                <i class="ph ph-caret-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <Swiper
        :modules="[Navigation, Autoplay]"
        :slides-per-view="4"
        :space-between="20"
        :autoplay="{ delay: 2000, disableOnInteraction: false }"
        :loop="true"
        :navigation="{ nextEl: nextEl, prevEl: prevEl }"
        :rtl="isRtl"
        :breakpoints="breakpoints"
        :speed="900"
        class="instagram-slider"
      >
        <SwiperSlide v-for="item in instagramItems" :key="item.id">
          <div class="instagram-item rounded-24 overflow-hidden position-relative">
            <img :src="item.src" :alt="item.alt" />
            <NuxtLink
              :to="item.link"
              target="_blank"
              rel="noopener noreferrer"
              class="w-72 h-72 bg-black bg-opacity-50 text-white text-32 position-absolute top-50 start-50 translate-middle flex-center rounded-circle hover-bg-main-two-600 hover-text-white"
              aria-label="Visit Instagram"
            >
              <i class="ph ph-instagram-logo"></i>
            </NuxtLink>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Navigation } from "swiper/modules";
import { instagramItems } from "~/data/instagram";

const prevEl = ref<HTMLElement | null>(null);
const nextEl = ref<HTMLElement | null>(null);

const isRtl = typeof document !== "undefined" && document.documentElement.dir === "rtl";

const breakpoints = {
  0: {
    slidesPerView: 1,
  },
  425: {
    slidesPerView: 2,
  },
  768: {
    slidesPerView: 2,
  },
  993: {
    slidesPerView: 3,
  },
  1300: {
    slidesPerView: 3,
  },
  1600: {
    slidesPerView: 4,
  },
};
</script>
