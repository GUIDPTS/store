<template>
  <section class="hot-deals pt-80 overflow-hidden" data-aos="fade-up" data-aos-duration="600">
    <div class="container container-lg">
      <div class="section-heading mb-24">
        <div class="flex-between flex-wrap gap-8">
          <h5 class="mb-0">Hot Deals Today</h5>
          <div class="flex-align gap-16">
            <NuxtLink
              to="/shop"
              class="text-sm fw-medium text-gray-700 hover-text-main-600 hover-text-decoration-underline"
            >
              View All Deals
            </NuxtLink>
            <div class="flex-align gap-8">
              <button
                ref="prevHotDeal"
                type="button"
                class="slick-prev slick-arrow flex-center rounded-circle border border-gray-100 hover-border-main-600 text-xl hover-bg-main-600 hover-text-white transition-1"
              >
                <i class="ph ph-caret-left"></i>
              </button>
              <button
                ref="nextHotDeal"
                type="button"
                class="slick-next slick-arrow flex-center rounded-circle border border-gray-100 hover-border-main-600 text-xl hover-bg-main-600 hover-text-white transition-1"
              >
                <i class="ph ph-caret-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="row g-12">
        <div class="col-md-4">
          <div
            class="hot-deals position-relative rounded-16 bg-main-600 overflow-hidden ps-40 pe-24 pt-80 pb-120 z-1"
          >
            <img
              src="/images/shape/offer-shape.png"
              alt=""
              class="position-absolute inset-block-start-0 inset-inline-start-0 z-n1 w-100 h-100 opacity-6"
            />
            <img
              src="/images/thumbs/basket-img.png"
              alt="Basket Thumb"
              class="position-absolute inset-inline-end-0 inset-block-end-0"
            />
            <span
              class="text-primary-600 bg-yellow text-heading py-4 px-12 rounded-4 text-sm fw-medium"
            >
              Medical equipment
            </span>
            <h5 class="text-white mb-8 mt-12">Deals of the day</h5>
            <p class="fw-semibold text-success-600">Save up to 50% off on your first order</p>

            <div id="hot-deal-countdown" class="countdown mt-24 mb-24">
              <ul class="countdown-list d-flex align-items-center flex-wrap">
                <li
                  class="countdown-list__item py-8 px-12 text-heading flex-align gap-4 text-sm fw-medium colon-white"
                >
                  <span class="days"></span> D
                </li>
                <li
                  class="countdown-list__item py-8 px-12 text-heading flex-align gap-4 text-sm fw-medium colon-white"
                >
                  <span class="hours"></span> H
                </li>
                <li
                  class="countdown-list__item py-8 px-12 text-heading flex-align gap-4 text-sm fw-medium colon-white"
                >
                  <span class="minutes"></span> M
                </li>
                <li
                  class="countdown-list__item py-8 px-12 text-heading flex-align gap-4 text-sm fw-medium colon-white"
                >
                  <span class="seconds"></span> S
                </li>
              </ul>
            </div>

            <NuxtLink
              to="/shop"
              class="mt-16 btn bg-white hover-text-white hover-bg-main-800 text-main-600 fw-medium d-inline-flex align-items-center rounded-pill gap-8"
            >
              Explore Shop
              <span class="icon text-xl d-flex">
                <i class="ph-bold ph-shopping-cart"></i>
              </span>
            </NuxtLink>
          </div>
        </div>

        <div class="col-md-8">
          <Swiper
            v-if="prevHotDeal && nextHotDeal"
            :modules="[Navigation, Autoplay]"
            :slides-per-view="4"
            :space-between="24"
            :loop="true"
            :autoplay="{ delay: 2000, disableOnInteraction: false }"
            :speed="900"
            :rtl="isRTL"
            :navigation="{ prevEl: prevHotDeal, nextEl: nextHotDeal }"
            :breakpoints="hotDealsBreakpoints"
            class="hot-deals-slider"
          >
            <SwiperSlide v-for="(product, index) in hotDealsData" :key="index">
              <HotCard :product="product" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, computed, onBeforeUnmount } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import HotCard from "~/components/widgets/shop/HotCard.vue";
import { initializeCountdown } from "@/utils/countdown";
import { useHomeData, toHotDeal } from "~/composables/useHomeData";

const { topProducts, fetchAll } = useHomeData();
const hotDealsData = computed(() => topProducts.value.map(toHotDeal));

const prevHotDeal = ref<HTMLElement | null>(null);
const nextHotDeal = ref<HTMLElement | null>(null);

const isRTL = computed(() => {
  if (typeof document !== "undefined") {
    return document.documentElement.dir === "rtl";
  }
  return false;
});

const hotDealsBreakpoints = {
  0: { slidesPerView: 1, navigation: false },
  575: { slidesPerView: 1, navigation: false },
  1199: { slidesPerView: 2, navigation: false },
  1399: { slidesPerView: 3, navigation: false },
  1600: { slidesPerView: 4 },
};

const countdownInterval = ref<ReturnType<typeof setInterval> | null>(null);

onMounted(async () => {
  await fetchAll();
  await nextTick();
  countdownInterval.value = initializeCountdown(
    "hot-deal-countdown",
    "2027-12-30T23:59:59",
    () => {}
  );
});

onBeforeUnmount(() => {
  if (countdownInterval.value) {
    clearInterval(countdownInterval.value);
  }
});
</script>
