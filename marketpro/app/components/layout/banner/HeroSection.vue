<template>
  <div class="banner">
    <div class="container container-lg">
      <div class="banner-item rounded-24 overflow-hidden position-relative arrow-center">
        <a
          href="#featureSection"
          class="scroll-down w-84 h-84 text-center flex-center bg-main-600 rounded-circle border border-5 text-white border-white position-absolute start-50 translate-middle-x bottom-0 hover-bg-main-800"
        >
          <span class="icon line-height-0"><i class="ph ph-caret-double-down"></i></span>
        </a>
        <NuxtImg
          src="/images/bg/banner-bg.png"
          alt=""
          class="banner-img position-absolute inset-block-start-0 inset-inline-start-0 w-100 h-100 z-n1 object-fit-cover rounded-24"
        />

        <div class="flex-align">
          <button
            ref="prevEl"
            type="button"
            class="slick-prev slick-arrow flex-center rounded-circle box-shadow-4xl bg-white text-xl hover-bg-main-600 hover-text-white transition-1"
          >
            <i class="ph ph-caret-left"></i>
          </button>
          <button
            ref="nextEl"
            type="button"
            class="slick-next slick-arrow flex-center rounded-circle box-shadow-4xl bg-white text-xl hover-bg-main-600 hover-text-white transition-1"
          >
            <i class="ph ph-caret-right"></i>
          </button>
        </div>

        <Swiper
          :modules="[Autoplay, EffectFade, Navigation]"
          :slides-per-view="1"
          :loop="true"
          :autoplay="{ delay: 4000, disableOnInteraction: false }"
          :speed="1000"
          effect="fade"
          :fade-effect="{ crossFade: true }"
          :navigation="{ prevEl: prevEl, nextEl: nextEl }"
          :rtl="isRtl"
          class="banner-slider banner-1"
        >
          <SwiperSlide v-for="(item, index) in banners" :key="index">
            <div class="banner-slider__item">
              <div class="banner-slider__inner flex-between position-relative">
                <div class="banner-item__content">
                  <span class="fw-semibold text-success-600 text-capitalize mb-8">
                    {{ item.subtitle }}
                  </span>
                  <h2 class="banner-item__title max-w-700 mb-30">
                    {{ item.title }}
                  </h2>
                  <div class="d-flex align-items-center gap-16 rdf">
                    <NuxtLink
                      :to="item.btn_link"
                      class="btn btn-main d-inline-flex align-items-center rounded-pill gap-8"
                    >
                      {{ item.btn_text }}
                      <span class="icon text-xl d-flex">
                        <i class="ph ph-shopping-cart-simple"></i>
                      </span>
                    </NuxtLink>
                  </div>
                </div>
                <div class="banner-item__thumb">
                  <NuxtImg :src="item.image" alt="Banner image" />
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import { useHomeConfig } from "~/composables/useHomeConfig";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

const prevEl = ref<HTMLElement | null>(null);
const nextEl = ref<HTMLElement | null>(null);
const isRtl = ref(false);

const { banners } = useHomeConfig();

onMounted(() => {
  isRtl.value = document.documentElement.dir === "rtl";
});
</script>
