<template>
  <section class="recommended overflow-hidden pt-80">
    <div class="container container-lg">
      <div class="row g-12">
        <div class="col-xxl-4">
          <div
            class="position-relative rounded-16 bg-light-purple overflow-hidden p-28 z-1 text-center h-100"
            data-aos="zoom-in"
            data-aos-duration="800"
          >
            <img
              src="/images/bg/recommended-bg.png"
              alt="Recommended background"
              class="position-absolute inset-block-start-0 inset-inline-start-0 z-n1 w-100 h-100 cover-img"
            />
            <div class="py-xl-4 text-center">
              <span class="h6 mb-20 text-white">Insta360 GO 3S Action Camera - White</span>
              <div class="flex-center gap-12 text-white">
                <span>FROM</span>
                <h4 class="mb-8 text-white">$430</h4>
                <span
                  class="badge-style-two position-relative me-8 bg-success-600 text-white text-sm py-2 px-8 rounded-4"
                  >20% off</span
                >
              </div>
            </div>
          </div>
        </div>

        <div class="col-xxl-8">
          <div class="border border-gray-100 p-24 rounded-16">
            <div class="section-heading mb-24">
              <div class="flex-between flex-wrap gap-8">
                <h6 class="mb-0" data-aos="fade-left" data-aos-duration="600">
                  Recommended For You
                </h6>
                <div class="flex-align gap-16" data-aos="fade-right" data-aos-duration="600">
                  <NuxtLink
                    to="/shop"
                    class="text-sm fw-medium text-gray-700 hover-text-main-600 hover-text-decoration-underline"
                  >
                    View All
                  </NuxtLink>
                  <div class="flex-align gap-8">
                    <button
                      ref="prevElRecommended"
                      type="button"
                      class="slick-prev slick-arrow flex-center rounded-circle border border-gray-100 hover-border-main-600 text-xl hover-bg-main-600 hover-text-white transition-1"
                      aria-label="Previous Slide"
                    >
                      <i class="ph ph-caret-left"></i>
                    </button>
                    <button
                      ref="nextElRecommended"
                      type="button"
                      class="slick-next slick-arrow flex-center rounded-circle border border-gray-100 hover-border-main-600 text-xl hover-bg-main-600 hover-text-white transition-1"
                      aria-label="Next Slide"
                    >
                      <i class="ph ph-caret-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <Swiper
              v-if="navigationReady"
              ref="swiperRefRecommended"
              :modules="[Autoplay, Navigation]"
              :slides-per-view="1"
              :space-between="24"
              :loop="true"
              :autoplay="{ delay: 2000, disableOnInteraction: false }"
              :breakpoints="{
                1399: { slidesPerView: 4 },
                1199: { slidesPerView: 2 },
                575: { slidesPerView: 1 },
              }"
              :navigation="navigationRecommended"
              class="recommended-slider"
            >
              <SwiperSlide v-for="product in recommendedProducts" :key="product.id">
                <div
                  class="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2"
                >
                  <NuxtLink
                    :to="product.href"
                    class="product-card__thumb flex-center rounded-8 position-relative"
                  >
                    <span
                      class="product-card__badge px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0"
                      :class="product.badgeClass"
                    >
                      {{ product.badgeText }}
                    </span>
                    <NuxtImg
                      :src="product.imgSrc"
                      :alt="product.title"
                      class="w-auto max-w-unset"
                    />
                  </NuxtLink>

                  <div class="product-card__content mt-16">
                    <span class="text-main-600 bg-main-50 text-sm fw-medium py-4 px-8">{{
                      product.discount
                    }}</span>
                    <h6 class="title text-lg fw-semibold my-16">
                      <NuxtLink :to="product.href" class="link text-line-2" tabindex="0">
                        {{ product.title }}
                      </NuxtLink>
                    </h6>

                    <div class="flex-align gap-6">
                      <div class="flex-align gap-2">
                        <span
                          v-for="star in 5"
                          :key="star"
                          class="text-xs fw-medium text-warning-600 d-flex"
                        >
                          <i class="ph-fill ph-star"></i>
                        </span>
                      </div>
                      <span class="text-xs fw-medium text-gray-500">{{ product.rating }}</span>
                      <span class="text-xs fw-medium text-gray-500"
                        >({{ product.ratingCount }})</span
                      >
                    </div>

                    <span
                      class="py-2 px-8 text-xs rounded-pill text-main-two-600 bg-main-two-50 mt-16"
                    >
                      Fulfilled by {{ product.fulfilledBy }}
                    </span>

                    <div class="product-card__price mt-16 mb-30">
                      <span class="text-gray-400 text-md fw-semibold text-decoration-line-through">
                        {{ product.oldPrice }}
                      </span>
                      <span class="text-heading text-md fw-semibold">
                        {{ product.newPrice }} <span class="text-gray-500 fw-normal">/Qty</span>
                      </span>
                    </div>
                    <span class="text-neutral-600">
                      Delivered by <span class="text-main-600">{{ product.deliveryDate }}</span>
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";

import "swiper/css";
import "swiper/css/navigation";

import { recommendedProducts } from "~/data/recommended-products";

const swiperRefRecommended = ref<SwiperClass | null>(null);
const prevElRecommended = ref<HTMLElement | null>(null);
const nextElRecommended = ref<HTMLElement | null>(null);

const navigationRecommended = ref<{ prevEl: HTMLElement | null; nextEl: HTMLElement | null }>({
  prevEl: null,
  nextEl: null,
});

const navigationReady = ref(false);

onMounted(async () => {
  await nextTick();
  if (prevElRecommended.value && nextElRecommended.value) {
    navigationRecommended.value = {
      prevEl: prevElRecommended.value,
      nextEl: nextElRecommended.value,
    };
    navigationReady.value = true;
  }
});
</script>
