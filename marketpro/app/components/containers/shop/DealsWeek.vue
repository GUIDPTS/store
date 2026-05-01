<template>
  <section class="deals-week pt-80 overflow-hidden" data-aos="fade-up" data-aos-duration="600">
    <div class="container container-lg">
      <div class="border border-gray-100 p-24 rounded-16">

        <div class="section-heading mb-24">
          <div class="flex-between flex-wrap gap-8">
            <h6 class="mb-0">Deal of The Week</h6>
            <div class="flex-align gap-16">
              <NuxtLink to="/shop"
                class="text-sm fw-semibold text-main-600 hover-text-main-600 hover-text-decoration-underline">
                View All Deals
              </NuxtLink>
              <div class="flex-align gap-8">
                <button ref="prevEl" type="button"
                  class="swiper-prev slick-arrow flex-center rounded-circle border border-gray-100 hover-border-main-600 text-xl hover-bg-main-600 hover-text-white transition-1">
                  <i class="ph ph-caret-left"></i>
                </button>
                <button ref="nextEl" type="button"
                  class="swiper-next slick-arrow flex-center rounded-circle border border-gray-100 hover-border-main-600 text-xl hover-bg-main-600 hover-text-white transition-1">
                  <i class="ph ph-caret-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 横幅区域 -->
        <div class="deal-week-box rounded-16 overflow-hidden flex-between position-relative z-1 mb-24">
          <img src="/images/bg/week-deal-bg.png" alt="background"
            class="position-absolute inset-block-start-0 w-100 h-100 z-n1 object-fit-cover" />
          <div class="d-lg-block d-none ps-32 flex-shrink-0">
            <NuxtImg src="/images/thumbs/week-deal-img1.png" alt="left-img" />
          </div>
          <div class="deal-week-box__content px-sm-4 d-block w-100 text-center">
            <h6 class="mb-20 text-white">
              {{ dealsProduct ? dealsProduct.name : 'Deal of The Week' }}
            </h6>
            <div id="countdown4" class="countdown mt-20">
              <ul class="countdown-list style-four flex-center flex-wrap">
                <li class="countdown-list__item flex-align flex-column text-sm fw-medium text-white rounded-circle bg-white-12 border border-white-13 colon-white">
                  <span class="days"></span>Days
                </li>
                <li class="countdown-list__item flex-align flex-column text-sm fw-medium text-white rounded-circle bg-white-12 border border-white-13 colon-white">
                  <span class="hours"></span>Hour
                </li>
                <li class="countdown-list__item flex-align flex-column text-sm fw-medium text-white rounded-circle bg-white-12 border border-white-13 colon-white">
                  <span class="minutes"></span>Min
                </li>
                <li class="countdown-list__item flex-align flex-column text-sm fw-medium text-white rounded-circle bg-white-12 border border-white-13 colon-white">
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

        <!-- 商品轮播 -->
        <Swiper
          v-if="prevEl && nextEl"
          :modules="[Navigation, Autoplay]"
          :slides-per-view="6"
          :space-between="24"
          :loop="deals.length > 1"
          :autoplay="{ delay: 2000, disableOnInteraction: false }"
          :speed="900"
          :rtl="isRTL"
          :navigation="{ prevEl, nextEl }"
          :breakpoints="swiperBreakpoints"
          class="deals-week__slider"
        >
          <SwiperSlide v-for="product in deals" :key="product.id">
            <div class="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
              <NuxtLink :to="`/product/${product.id}`"
                class="product-card__thumb flex-center rounded-8 position-relative">
                <img :src="product.image || '/images/thumbs/product-two-img1.png'" :alt="product.name"
                  style="max-height:140px;object-fit:contain;width:100%" />
              </NuxtLink>
              <div class="product-card__content mt-16">
                <h6 class="title text-lg fw-semibold mt-12 mb-8">
                  <NuxtLink :to="`/product/${product.id}`" class="link text-line-2">
                    {{ product.name }}
                  </NuxtLink>
                </h6>
                <div class="mt-8">
                  <div class="progress w-100 bg-color-three rounded-pill h-4">
                    <div class="progress-bar bg-tertiary-600 rounded-pill"
                      :style="{ width: soldPct(product) + '%' }"></div>
                  </div>
                  <span class="text-gray-900 text-xs fw-medium mt-8 d-block">
                    Sold: {{ product.sales_count || 0 }}
                  </span>
                </div>
                <div class="product-card__price my-20">
                  <span v-if="product.orig_price > product.price"
                    class="text-gray-400 text-md fw-semibold text-decoration-line-through">
                    ¥{{ product.orig_price }}
                  </span>
                  <span class="text-heading text-md fw-semibold">
                    ¥{{ product.is_promo_active ? product.promo_price : product.price }}
                    <span class="text-gray-500 fw-normal">/件</span>
                  </span>
                </div>
                <NuxtLink :to="`/product/${product.id}`"
                  class="product-card__cart btn bg-gray-50 text-heading hover-bg-main-600 hover-text-white py-11 px-24 rounded-pill flex-center gap-8 fw-medium">
                  立即购买 <i class="ph ph-arrow-right"></i>
                </NuxtLink>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>

        <!-- 无数据时占位 -->
        <div v-if="!deals.length" class="text-center py-32 text-gray-400">
          <i class="ph ph-package d-block mb-8" style="font-size:2.5rem"></i>
          暂无本周精选商品
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref, nextTick } from "vue";
import { initializeCountdown } from "@/utils/countdown";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const prevEl = ref<HTMLElement | null>(null);
const nextEl = ref<HTMLElement | null>(null);

const dealsProduct = ref<any>(null);  // 本周精选主商品（横幅展示）
const deals = ref<any[]>([]);         // 轮播商品列表

const isRTL = computed(() => {
  if (typeof document !== "undefined") {
    return document.documentElement.dir === "rtl";
  }
  return false;
});

const swiperBreakpoints = {
  0:    { slidesPerView: 1 },
  575:  { slidesPerView: 2 },
  1199: { slidesPerView: 2 },
  1399: { slidesPerView: 3 },
  1599: { slidesPerView: 5 },
};

function soldPct(p: any): number {
  const total = (p.sales_count || 0) + (p.stock_count || 0);
  if (!total) return 0;
  return Math.min(Math.round(((p.sales_count || 0) / total) * 100), 100);
}

const intervalId = ref<ReturnType<typeof setInterval> | null>(null);

onMounted(async () => {
  // 加载本周精选商品
  try {
    const res = await $fetch<any>("/api/deals-of-week");
    if (res.product) {
      dealsProduct.value = res.product;
      deals.value = [res.product];
    }
  } catch { /* ignore */ }

  // 如果没有精选商品，加载热销商品作为轮播内容
  if (!deals.value.length) {
    try {
      const res = await $fetch<any>("/api/products?sort=sales&page_size=12");
      deals.value = res.products || [];
    } catch { /* ignore */ }
  }

  await nextTick();
  intervalId.value = initializeCountdown("countdown4", "2027-12-30T23:59:59", () => {});
});

onBeforeUnmount(() => {
  if (intervalId.value) clearInterval(intervalId.value);
});
</script>
