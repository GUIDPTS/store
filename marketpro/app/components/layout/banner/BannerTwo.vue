<template>
  <div class="banner-two">
    <div class="container container-lg">
      <div class="banner-two-wrapper d-flex align-items-start">
        <div class="w-310 d-lg-block d-none flex-shrink-0"></div>
        <div
          class="banner-item-two-wrapper rounded-24 overflow-hidden position-relative arrow-center flex-grow-1 mb-0 m-20"
        >
          <img
            src="/images/bg/banner-two-bg.png"
            alt="Banner Background"
            class="banner-img position-absolute inset-block-start-0 inset-inline-start-0 w-100 h-100 z-n1 object-fit-cover rounded-24"
          />
          <Swiper
            :modules="[Autoplay, Pagination, EffectFade]"
            :slides-per-view="1"
            :loop="true"
            :autoplay="{ delay: 4000, disableOnInteraction: false }"
            :pagination="{ clickable: true }"
            effect="fade"
            :fade-effect="{ crossFade: true }"
            :speed="900"
            :rtl="isRtl"
            class="banner-item-two__slider banner-2"
          >
            <SwiperSlide v-for="item in bannerItems" :key="item.id">
              <div
                class="d-flex align-items-center justify-content-between py-84 px-72-px flex-wrap-reverse flex-sm-nowrap gap-32"
              >
                <div class="banner-item-two__content">
                  <span class="mb-8 text-md fw-semibold text-main-600">
                    Starting at only
                    <span class="text-danger-600">${{ item.startingPrice }}</span>
                  </span>
                  <h2 class="banner-item-two__title">
                    {{ item.title }}
                  </h2>
                  <NuxtLink
                    :to="item.link"
                    class="btn btn-main d-inline-flex align-items-center rounded-pill gap-8 mt-24"
                  >
                    Shop Now
                    <span class="icon text-xl d-flex">
                      <i class="ph ph-shopping-cart-simple"></i>
                    </span>
                  </NuxtLink>
                </div>
                <div class="banner-item-two__thumb">
                  <NuxtImg :src="item.thumbImage" alt="Thumb" />
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { bannerItems } from "~/data/banner-two";

import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const isRtl = ref(false);

onMounted(() => {
  isRtl.value = document.documentElement.dir === "rtl";
});
</script>
