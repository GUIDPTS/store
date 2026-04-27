<template>
  <section class="offer pt-80">
    <div class="container container-lg">
      <div class="row gy-4">
        <div
          v-for="(item, idx) in offerCards"
          :key="idx"
          class="col-sm-6"
          data-aos="zoom-in"
          :data-aos-duration="600 + idx * 200"
        >
          <div class="offer-card position-relative rounded-16 overflow-hidden p-16 ps-56-px">
            <img
              :src="item.bg_image"
              alt=""
              class="position-absolute inset-block-start-0 inset-inline-start-0 z-n1 w-100 h-100"
            />
            <div :class="idx === 0 ? 'py-xl-4 max-w-392 ms-auto' : 'py-xl-4 max-w-392'">
              <div class="offer-card__logo mb-16 w-80 h-80 flex-center bg-white rounded-circle">
                <NuxtImg :src="item.logo" alt="" />
              </div>
              <h5 class="mb-8">{{ item.title }}</h5>
              <div class="flex-align gap-8">
                <span class="text-sm fw-medium text-heading">{{ item.tag1 }}</span>
                <span :class="idx === 0 ? 'text-xs text-heading' : 'text-sm text-success-600'">{{
                  item.tag2
                }}</span>
              </div>
              <NuxtLink
                :to="item.btn_link"
                :class="
                  idx === 0
                    ? 'btn bg-success-600 hover-text-white hover-bg-success-700 text-white'
                    : 'btn bg-white hover-text-white hover-bg-main-800 text-heading'
                "
                class="mt-16 fw-medium d-inline-flex align-items-center rounded-pill gap-8"
                tabindex="0"
              >
                {{ item.btn_text }}
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
import { useHomeConfig } from "~/composables/useHomeConfig";

const { offerCards } = useHomeConfig();
</script>
