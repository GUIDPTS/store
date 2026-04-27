<template>
  <section
    class="testimonials cv-rt py-120 mb-80 bg-neutral-600 bg-img overflow-hidden"
    :style="bgStyle"
    data-aos="fade-up"
    data-aos-duration="600"
  >
    <div class="container container-lg">
      <div class="row gy-4 align-items-center">
        <div class="col-xl-1">
          <div
            class="section-heading mb-0 d-flex flex-column align-items-center writing-mode"
            data-aos="fade-left"
            data-aos-duration="600"
          >
            <p class="text-white">Share information about your brand with your customers.</p>
            <h5 class="text-white mb-0 text-uppercase">Customers Feedback</h5>
          </div>
        </div>
        <div class="col-xl-11">
          <div class="position-relative">
            <Swiper
              ref="mainSwiperRef"
              :modules="modules"
              :navigation="false"
              :loop="false"
              :controller="{ control: thumbsSwiper }"
              class="testimonials-slider mb-40"
              @swiper="onMainSwiper"
            >
              <SwiperSlide v-for="t in testimonialsList" :key="t.id" class="testimonials-item">
                <h6 class="text-white text-uppercase mb-8 fw-medium">{{ t.name }}</h6>
                <span class="text-md text-white fw-normal">{{ t.role }}</span>
                <div class="flex-align gap-8 mt-24">
                  <template v-for="(_, idx) in t.rating" :key="`${t.id}-star-${idx}`">
                    <span class="text-xs fw-medium text-warning-600 d-flex">
                      <i class="ph-fill ph-star"></i>
                    </span>
                  </template>
                </div>
                <p class="testimonials-item__desc text-white text-2xl fw-normal mt-40 max-w-990">
                  {{ t.description }}
                </p>
              </SwiperSlide>
            </Swiper>
            <Swiper
              ref="thumbsSwiperRef"
              :modules="modules"
              :slides-per-view="2"
              :loop="false"
              :space-between="24"
              :watch-slides-progress="true"
              :watch-slides-visibility="true"
              :controller="{ control: mainSwiper }"
              class="testimonials-thumbs-slider cv-rt-2"
              :breakpoints="thumbsBreakpoints"
              @swiper="onThumbsSwiper"
            >
              <SwiperSlide
                v-for="t in testimonialsList"
                :key="t.id + '-thumb'"
                class="testimonials-thumbs"
              >
                <div class="testimonials-thumbs__img">
                  <NuxtImg :src="t.thumbImage" alt="Image" class="cover-img" />
                </div>
                <div
                  class="testimonials-thumbs__content position-absolute transition-2 bottom-0 start-50 translate-middle-x mb-16 text-center hidden opacity-0"
                >
                  <h6 class="text-white text-uppercase mb-8 fw-medium">{{ t.name }}</h6>
                  <span class="text-md text-white fw-normal">{{ t.role }}</span>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
      <div class="flex-center gap-8 mt-48">
        <button
          id="testi-prev"
          type="button"
          class="slick-prev slick-arrow flex-center rounded-circle border border-gray-100 hover-border-main-600 text-xl hover-bg-main-600 text-white transition-1"
          @click="goPrev"
        >
          <i class="ph ph-caret-left"></i>
        </button>
        <button
          id="testi-next"
          type="button"
          class="slick-next slick-arrow flex-center rounded-circle border border-gray-100 hover-border-main-600 text-xl hover-bg-main-600 text-white transition-1"
          @click="goNext"
        >
          <i class="ph ph-caret-right"></i>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Controller, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { testimonials } from "~/data/testimonials";
import type { Swiper as SwiperInstance } from "swiper";

const testimonialsList = testimonials;

const mainSwiper = ref<SwiperInstance | null>(null);
const thumbsSwiper = ref<SwiperInstance | null>(null);

const modules = [Controller, Navigation];

function onMainSwiper(sw: SwiperInstance) {
  mainSwiper.value = sw;
}

function onThumbsSwiper(sw: SwiperInstance) {
  thumbsSwiper.value = sw;
}

const goPrev = () => {
  mainSwiper.value?.slidePrev();
};
const goNext = () => {
  mainSwiper.value?.slideNext();
};

const thumbsBreakpoints = {
  1299: { slidesPerView: 4 },
  992: { slidesPerView: 3 },
  768: { slidesPerView: 2 },
  0: { slidesPerView: 2 },
};

const bgStyle = computed(() => ({
  backgroundImage: `url(/images/bg/pattern-two.png)`,
}));
</script>
