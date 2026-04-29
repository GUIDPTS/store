<template>
  <div id="featureSection" class="feature" data-aos="fade-up" data-aos-duration="600">
    <div class="container container-lg">
      <div class="position-relative arrow-center gradient-shadow">
        <div class="flex-align">
          <button
            ref="prevEl"
            type="button"
            class="slick-prev slick-arrow flex-center rounded-circle bg-white text-xl hover-bg-main-600 hover-text-white transition-1"
          >
            <i class="ph ph-caret-left"></i>
          </button>
          <button
            ref="nextEl"
            type="button"
            class="slick-next slick-arrow flex-center rounded-circle bg-white text-xl hover-bg-main-600 hover-text-white transition-1"
          >
            <i class="ph ph-caret-right"></i>
          </button>
        </div>

        <Swiper
          :modules="[Autoplay, Navigation]"
          :slides-per-view="slidesPerView"
          :space-between="20"
          :loop="true"
          :autoplay="{ delay: 2000, disableOnInteraction: false }"
          :navigation="{ prevEl: prevEl, nextEl: nextEl }"
          :rtl="isRtl"
          :breakpoints="swiperBreakpoints"
          class="feature-item-wrapper"
        >
          <SwiperSlide v-for="cat in displayCategories" :key="cat.id">
            <div class="feature-item text-center">
              <div class="feature-item__thumb rounded-circle">
                <NuxtLink :to="`/category/${cat.id}`" class="w-100 h-100 flex-center">
                  <NuxtImg :src="cat.image || cat.icon || '/images/thumbs/feature-img1.png'" :alt="cat.name" />
                </NuxtLink>
              </div>
              <div class="feature-item__content mt-16">
                <h6 class="text-lg mb-8">
                  <NuxtLink :to="`/category/${cat.id}`" class="text-inherit">{{ cat.name }}</NuxtLink>
                </h6>
                <span class="text-sm text-gray-400">{{ cat.product_count ?? cat.products?.length ?? 0 }}+ 商品</span>
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
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { useHomeData } from "~/composables/useHomeData";

const prevEl = ref<HTMLElement | null>(null);
const nextEl = ref<HTMLElement | null>(null);
const isRtl = ref(false);

const { categories, fetchAll } = useHomeData();
const displayCategories = computed(() => categories.value.filter(c => c).slice(0, 12));

onMounted(async () => {
  isRtl.value = document.documentElement.dir === "rtl";
  await fetchAll();
});

const slidesPerView = 1;

const swiperBreakpoints = {
  1699: { slidesPerView: 10 },
  1599: { slidesPerView: 8 },
  1399: { slidesPerView: 6 },
  992: { slidesPerView: 5 },
  768: { slidesPerView: 4 },
  575: { slidesPerView: 3 },
  424: { slidesPerView: 2 },
  359: { slidesPerView: 1 },
};

</script>
