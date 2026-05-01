<template>
  <div class="col-xxl-3 col-lg-4 col-sm-6">
    <div
      class="p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2"
    >
      <div class="p-16 bg-main-50 rounded-16 mb-32">
        <h6 class="underlined-line position-relative mb-0 pb-16 d-inline-block">
          {{ title }}
        </h6>
      </div>

      <div class="short-product-list arrow-style-two max-h-unset">
        <Swiper
          :modules="[Navigation, Autoplay]"
          :slides-per-view="1"
          :space-between="20"
          :autoplay="{
            delay: 2000,
            disableOnInteraction: false,
          }"
          :loop="true"
          :navigation="{
            nextEl: nextEl,
            prevEl: prevEl,
          }"
          :rtl="isRtl"
          :speed="900"
          class="featured-products__swiper"
        >
          <SwiperSlide v-for="(group, index) in groupedProducts" :key="index">
            <div class="d-flex flex-column gap-44">
              <div v-for="product in group" :key="product.id" class="flex-align gap-16">
                <div class="w-90 h-90 rounded-12 border border-gray-100 flex-shrink-0">
                  <NuxtLink :to="`/product/${product.id}`" class="link">
                    <img :src="product.imgSrc" :alt="product.imgAlt" />
                  </NuxtLink>
                </div>
                <div class="product-card__content mt-12">
                  <div class="flex-align gap-6">
                    <template v-if="product.rating > 0">
                      <span class="text-xs fw-bold text-gray-500">{{ product.rating.toFixed(1) }}</span>
                      <span class="text-15 fw-bold text-warning-600 d-flex"><i class="ph-fill ph-star"></i></span>
                      <span class="text-xs fw-bold text-gray-500">({{ product.ratingCount }})</span>
                    </template>
                    <span v-else class="text-xs fw-bold text-gray-500">{{ product.ratingCount }} Sold</span>
                  </div>
                  <h6 class="title text-lg fw-semibold mt-8 mb-8">
                    <NuxtLink :to="`/product/${product.id}`" class="link text-line-1">
                      {{ product.title }}
                    </NuxtLink>
                  </h6>
                  <div class="product-card__price flex-align gap-8">
                    <span class="text-heading text-md fw-semibold d-block">
                      {{ product.priceCurrent }}
                    </span>
                    <span
                      v-if="product.priceOld"
                      class="text-gray-400 text-md fw-semibold d-block line-through"
                    >
                      {{ product.priceOld }}
                    </span>
                  </div>
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
import type { Product } from "~/types/shortProduct";
import { ref, computed } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Navigation } from "swiper/modules";

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

const props = defineProps({
  title: {
    type: String,
    default: "Default Title",
  },
  products: {
    type: Array as () => Product[],
    default: () => [],
  },
});

const groupedProducts = computed(() => chunkArray(props.products, 4));

const prevEl = ref<HTMLElement | null>(null);
const nextEl = ref<HTMLElement | null>(null);

const isRtl = typeof document !== "undefined" && document.documentElement.dir === "rtl";
</script>
