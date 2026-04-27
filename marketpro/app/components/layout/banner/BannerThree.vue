<template>
  <section
    class="banner-three bg-img position-relative"
    style="background-image: url(/images/shape/line-pattern.png)"
  >
    <img
      src="/images/shape/star-shape.png"
      alt="Shape"
      class="animation star-shape animation-rotate"
    />
    <img
      src="/images/shape/star-shape.png"
      alt="Shape"
      class="animation star-shape style-two animation-rotate"
    />
    <img
      src="/images/shape/line-shape.png"
      alt="Shape"
      class="animation line-shape opacity-75 animation-rotate"
    />

    <h1
      class="display-200 text-white opacity-25 position-absolute inset-inline-end-0 inset-block-end-0 mb-0 line-height-73"
    >
      Fashion
    </h1>

    <div class="flex-align">
      <button
        ref="prevEl"
        type="button"
        class="slick-prev slick-arrow flex-center rounded-circle border border-white hover-border-main-600 text-white text-2xl hover-bg-main-600 hover-text-white transition-1 position-absolute top-50 translate-middle-y inset-inline-start-0 ms-lg-5 ms-32"
        aria-label="Previous Slide"
      >
        <i class="ph ph-caret-left"></i>
      </button>
      <button
        ref="nextEl"
        type="button"
        class="slick-next slick-arrow flex-center rounded-circle border border-white hover-border-main-600 text-white text-2xl hover-bg-main-600 hover-text-white transition-1 position-absolute top-50 translate-middle-y inset-inline-end-0 me-lg-5 me-32"
        aria-label="Next Slide"
      >
        <i class="ph ph-caret-right"></i>
      </button>
    </div>

    <div class="container container-lg">
      <Swiper
        :modules="[Navigation, EffectFade]"
        :slides-per-view="1"
        :loop="true"
        :navigation="{ prevEl: prevEl, nextEl: nextEl }"
        effect="fade"
        :fade-effect="{ crossFade: true }"
        class="banner-three-slider banner-3"
      >
        <SwiperSlide v-for="slide in slides" :key="slide.id">
          <div class="row align-items-center gy-4">
            <div class="col-lg-6">
              <div class="span3">
                <span class="text-white mb-8 h6">{{ slide.discountText }}</span>
                <h1 class="text-white display-one">
                  {{ slide.heading }}
                  <span class="fw-normal text-main-two-600 font-heading-four">{{
                    slide.highlightedText
                  }}</span>
                  Just For You.
                </h1>
                <p class="text-white max-w-472 text-2xl mb-24Up">
                  {{ slide.description }}
                </p>
                <NuxtLink
                  :to="slide.shopLink"
                  class="btn btn-outline-white d-inline-flex align-items-center rounded-pill gap-8 mt-lg-4 mt-sm-1"
                  tabindex="0"
                >
                  Shop Now
                  <span class="icon text-xl d-flex">
                    <i class="ph ph-shopping-cart-simple"></i>
                  </span>
                </NuxtLink>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="d-flex justify-content-center">
                <img :src="slide.imageSrc" alt="Thumb" />
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
import { Navigation, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import { bannerSlides } from "~/data/banner-three";

const prevEl = ref<HTMLElement | null>(null);
const nextEl = ref<HTMLElement | null>(null);

const slides = bannerSlides;
</script>
