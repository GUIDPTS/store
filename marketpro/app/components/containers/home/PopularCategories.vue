<template>
  <div
    id="featureSection"
    class="feature feature-three mt-0 py-120 overflow-hidden"
    data-aos="fade-up"
    data-aos-duration="600"
  >
    <div class="container container-lg">
      <div class="section-heading text-center">
        <h5 class="mb-0 text-uppercase" data-aos="zoom-in" data-aos-duration="600">
          Popular Categories
        </h5>
      </div>
      <div class="position-relative arrow-center">
        <div class="flex-align">
          <button
            ref="prevEl"
            type="button"
            class="slick-prev slick-arrow flex-center rounded-circle bg-white text-xl hover-bg-main-600 hover-text-white transition-1"
            aria-label="Previous"
          >
            <i class="ph ph-caret-left"></i>
          </button>
          <button
            ref="nextEl"
            type="button"
            class="slick-next slick-arrow flex-center rounded-circle bg-white text-xl hover-bg-main-600 hover-text-white transition-1"
            aria-label="Next"
          >
            <i class="ph ph-caret-right"></i>
          </button>
        </div>

        <Swiper
          :modules="[Navigation]"
          :slides-per-view="6"
          :space-between="24"
          :loop="true"
          :navigation="{ prevEl: prevEl, nextEl: nextEl }"
          :breakpoints="swiperBreakpoints"
          class="feature-three-item-wrapper"
        >
          <SwiperSlide v-for="item in featureItems" :key="item.id" class="feature-item text-center">
            <div
              class="feature-item__thumb max-w-260 max-h-260 rounded-circle w-100 h-100"
              :class="item.bgClass"
            >
              <NuxtLink :to="item.link" class="w-100 h-100 flex-center">
                <img :src="item.imageSrc" alt="Image" />
              </NuxtLink>
            </div>
            <div class="feature-item__content mt-20">
              <h6 class="text-lg mb-8">
                <NuxtLink :to="item.link" class="text-inherit">
                  {{ item.title }}
                </NuxtLink>
              </h6>
              <span class="text-sm text-gray-900">{{ item.count }} Items</span>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { featureItems } from "~/data/popular-categories";

const prevEl = ref<HTMLElement | null>(null);
const nextEl = ref<HTMLElement | null>(null);

const swiperBreakpoints = {
  0: { slidesPerView: 1 },
  359: { slidesPerView: 1 },
  424: { slidesPerView: 2 },
  575: { slidesPerView: 2 },
  768: { slidesPerView: 3 },
  992: { slidesPerView: 3 },
  1399: { slidesPerView: 4 },
  1599: { slidesPerView: 5 },
  1600: { slidesPerView: 6 },
};
</script>
