<template>
  <section class="promotional-banner mt-32">
    <div class="container container-lg">
      <div class="row gy-4">
        <div
          v-for="item in promotionalBanners"
          :key="item.id"
          class="col-lg-4 col-sm-6"
          data-aos="fade-up"
          :data-aos-duration="item.aosDuration"
        >
          <div class="position-relative rounded-16 overflow-hidden z-1 p-32">
            <img
              :src="item.backgroundImg"
              alt=""
              class="position-absolute inset-block-start-0 inset-inline-start-0 w-100 h-100 object-fit-cover z-n1"
            />
            <div class="flex-between flex-wrap gap-16">
              <div>
                <span class="fw-semibold text-sm mb-8" :class="item.badgeClass">
                  {{ item.subtitle }}
                  <span v-if="item.badgeHighlight" :class="item.badgeHighlightClass">
                    {{ item.badgeHighlight }}
                  </span>
                  {{ item.badgeText }}
                </span>
                <h6 class="mb-0">{{ item.title }}</h6>
                <NuxtLink
                  :to="item.link"
                  class="d-inline-flex align-items-center gap-8 mt-16 text-heading text-md fw-medium border border-top-0 border-end-0 border-start-0 border-gray-900 hover-text-main-two-600 hover-border-main-two-600"
                >
                  Shop Now
                  <span class="icon text-md d-flex">
                    <i class="ph ph-plus"></i>
                  </span>
                </NuxtLink>
              </div>
              <div class="pe-xxl-2">
                <NuxtImg :src="item.productImg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { promotionalBanners } from "~/data/promotion";
</script>
