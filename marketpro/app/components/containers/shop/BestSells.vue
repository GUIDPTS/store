<template>
  <section class="best sells pb-80">
    <div class="container container-lg">
      <div class="section-heading">
        <div class="flex-between flex-wrap gap-8">
          <h5 class="mb-0">Daily Best Sells</h5>
        </div>
      </div>
      <div class="row g-12">
        <div class="col-xxl-8">
          <div class="row gy-4">
            <div
              v-for="(product, idx) in bestSellsData"
              :key="product.id"
              class="col-md-6"
              :data-aos="'fade-up'"
              :data-aos-duration="300 + (idx % 2) * 200"
            >
              <BestCard :product="product" />
            </div>
          </div>
        </div>

        <div class="col-xxl-4" data-aos="zoom-in" data-aos-duration="600">
          <div class="position-relative rounded-16 bg-light-purple overflow-hidden p-28 z-1 h-100">
            <img
              :src="bestsellCTA.bg_image"
              alt=""
              class="position-absolute inset-block-start-0 inset-inline-start-0 z-n1 w-100 h-100 cover-img"
            />
            <div class="py-xl-4">
              <div class="offer-card__logo mb-16 w-80 h-80 flex-center bg-white rounded-circle">
                <NuxtImg :src="bestsellCTA.logo" alt="" />
              </div>
              <h5 class="mb-8">{{ bestsellCTA.title }}</h5>
              <div class="flex-align gap-8">
                <span class="text-sm fw-medium text-heading">{{ bestsellCTA.tag1 }}</span>
                <span class="text-xs text-heading">{{ bestsellCTA.tag2 }}</span>
              </div>
              <NuxtLink
                :to="bestsellCTA.btn_link"
                class="mt-16 btn bg-success-600 hover-text-white hover-bg-success-700 text-white fw-medium d-inline-flex align-items-center rounded-pill gap-8"
                tabindex="0"
              >
                {{ bestsellCTA.btn_text }}
                <span class="icon text-xl d-flex"><i class="ph ph-arrow-right"></i></span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import BestCard from "~/components/widgets/shop/BestCard.vue";
import { initializeCountdown } from "@/utils/countdown";
import { useHomeConfig } from "~/composables/useHomeConfig";
import { useHomeData, toBestSell } from "~/composables/useHomeData";

const { bestsellCTA } = useHomeConfig();
const { topProducts, fetchAll } = useHomeData();
const bestSellsData = computed(() => topProducts.value.slice(0, 6).map(toBestSell));

onMounted(async () => {
  await fetchAll();
  bestSellsData.value.forEach(p => {
    initializeCountdown(`countdown-${p.id}`, p.countdownTarget, () => {});
  });
});
</script>
