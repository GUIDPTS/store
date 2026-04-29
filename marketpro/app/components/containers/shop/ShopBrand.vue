<template>
  <div class="brand py-80 overflow-hidden" data-aos="fade-up" data-aos-duration="600">
    <div class="container container-lg">
      <div class="brand-inner rounded-16">
        <div class="section-heading mb-24">
          <div class="flex-between flex-wrap gap-8">
            <h5 class="mb-0 text-uppercase" data-aos="fade-left" data-aos-duration="600">
              Shop by Brands
            </h5>
            <div class="flex-align gap-16" data-aos="fade-right" data-aos-duration="600">
              <NuxtLink
                to="/shop"
                class="text-sm fw-medium text-gray-700 hover-text-main-600 hover-text-decoration-underline"
              >
                View All Deals
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
          class="brand-slider arrow-style-two"
          :modules="[Navigation, Autoplay]"
          :slides-per-view="8"
          :space-between="20"
          :autoplay="{
            delay: 2000,
            disableOnInteraction: false,
          }"
          :loop="true"
          :speed="900"
          :rtl="isRtl"
          :navigation="{ nextEl: nextEl, prevEl: prevEl }"
          :breakpoints="breakpoints"
        >
          <SwiperSlide v-for="shop in displayShops" :key="shop.id">
            <div class="brand-item">
              <img :src="shop.logo || '/images/thumbs/brand-img1.png'" :alt="shop.name" />
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
import { Autoplay, Navigation } from "swiper/modules";
import { useHomeData } from "~/composables/useHomeData";

const prevEl = ref<HTMLElement | null>(null);
const nextEl = ref<HTMLElement | null>(null);

const isRtl = typeof document !== "undefined" && document.documentElement.dir === "rtl";

const { shops, fetchAll } = useHomeData();
const displayShops = computed(() => shops.value.filter(s => s.logo).slice(0, 12));

onMounted(() => fetchAll());

const breakpoints = {
  0: { slidesPerView: 2 },
  360: { slidesPerView: 3 },
  425: { slidesPerView: 4 },
  576: { slidesPerView: 5 },
  992: { slidesPerView: 6 },
  1399: { slidesPerView: 7 },
  1599: { slidesPerView: 8 },
};
</script>
