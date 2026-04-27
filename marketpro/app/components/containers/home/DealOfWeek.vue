<template>
  <section class="deals-week pt-80 overflow-hidden" data-aos="fade-up" data-aos-duration="600">
    <div class="container container-lg">
      <div class="border border-gray-100 p-24 rounded-16">
        <div class="section-heading mb-24">
          <div class="flex-between flex-wrap gap-8">
            <h6 class="mb-0">Deal of The Week</h6>
            <div class="flex-align gap-16">
              <NuxtLink
                to="/shop"
                class="text-sm fw-semibold text-main-600 hover-text-main-600 hover-text-decoration-underline"
              >
                View All Deals
              </NuxtLink>
              <div class="flex-align gap-8">
                <button
                  ref="prevEl"
                  type="button"
                  class="swiper-prev slick-arrow flex-center rounded-circle border border-gray-100 hover-border-main-600 text-xl hover-bg-main-600 hover-text-white transition-1"
                >
                  <i class="ph ph-caret-left"></i>
                </button>
                <button
                  ref="nextEl"
                  type="button"
                  class="swiper-next slick-arrow flex-center rounded-circle border border-gray-100 hover-border-main-600 text-xl hover-bg-main-600 hover-text-white transition-1"
                >
                  <i class="ph ph-caret-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          class="deal-week-box rounded-16 overflow-hidden flex-between position-relative z-1 mb-24"
        >
          <img
            src="/images/bg/week-deal-bg.png"
            alt="background"
            class="position-absolute inset-block-start-0 w-100 h-100 z-n1 object-fit-cover"
          />
          <div class="d-lg-block d-none ps-32 flex-shrink-0">
            <NuxtImg src="/images/thumbs/week-deal-img1.png" alt="left-img" />
          </div>
          <div class="deal-week-box__content px-sm-4 d-block w-100 text-center">
            <h6 class="mb-20 text-white">Apple AirPods Max, Over Ear Headphones</h6>
            <div id="countdown4" class="countdown mt-20">
              <ul class="countdown-list style-four flex-center flex-wrap">
                <li
                  class="countdown-list__item flex-align flex-column text-sm fw-medium text-white rounded-circle bg-white-12 border border-white-13 colon-white"
                >
                  <span class="days"></span>Days
                </li>
                <li
                  class="countdown-list__item flex-align flex-column text-sm fw-medium text-white rounded-circle bg-white-12 border border-white-13 colon-white"
                >
                  <span class="hours"></span>Hour
                </li>
                <li
                  class="countdown-list__item flex-align flex-column text-sm fw-medium text-white rounded-circle bg-white-12 border border-white-13 colon-white"
                >
                  <span class="minutes"></span>Min
                </li>
                <li
                  class="countdown-list__item flex-align flex-column text-sm fw-medium text-white rounded-circle bg-white-12 border border-white-13 colon-white"
                >
                  <span class="seconds"></span>Sec
                </li>
              </ul>
            </div>
          </div>
          <div class="d-lg-block d-none pe-xl-5">
            <div class="me-xxl-5 derti">
              <NuxtImg src="/images/thumbs/week-deal-img2.png" alt="right-img" />
            </div>
          </div>
        </div>

        <Swiper
          :modules="[Navigation, Autoplay]"
          :slides-per-view="6"
          :space-between="24"
          :loop="true"
          :autoplay="{ delay: 2000, disableOnInteraction: false }"
          :speed="900"
          :rtl="isRTL"
          :navigation="{ prevEl: prevEl, nextEl: nextEl }"
          :breakpoints="swiperBreakpoints"
          class="deals-week__slider"
        >
          <SwiperSlide v-for="product in deals" :key="product.id">
            <DealCard :product="product" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref } from "vue";
import { initializeCountdown } from "@/utils/countdown";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { dealsOfWeek as deals } from "~/data/deal-week";
import DealCard from "~/components/widgets/shop/DealCard.vue";

const prevEl = ref<HTMLElement | null>(null);
const nextEl = ref<HTMLElement | null>(null);

const isRTL = computed(() => {
  if (typeof document !== "undefined") {
    return document.documentElement.dir === "rtl";
  }
  return false;
});

const swiperBreakpoints = {
  0: { slidesPerView: 1 },
  575: { slidesPerView: 2 },
  1199: { slidesPerView: 2 },
  1399: { slidesPerView: 3 },
  1599: { slidesPerView: 5 },
};

const intervalId = ref<ReturnType<typeof setInterval> | null>(null);

onMounted(() => {
  intervalId.value = initializeCountdown("countdown4", "2027-12-30T23:59:59", () => {});
});

onBeforeUnmount(() => {
  if (intervalId.value) clearInterval(intervalId.value);
});
</script>
