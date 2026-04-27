<template>
  <section class="promotional-banner pt-80">
    <div class="container container-lg">
      <div class="row gy-4">
        <div
          v-for="(item, idx) in promoBanners"
          :key="idx"
          class="col-xl-3 col-sm-6 col-xs-6"
          :data-aos="'zoom-in'"
          :data-aos-duration="400 + idx * 200"
        >
          <div
            class="promotional-banner-item position-relative rounded-24 overflow-hidden z-1 py-52 ps-40 pe-24 h-100"
          >
            <img
              :src="item.image"
              alt=""
              class="position-absolute inset-block-start-0 inset-inline-start-0 w-100 h-100 object-fit-cover z-n1"
            />
            <div class="promotional-banner-item__content">
              <h6 class="promotional-banner-item__title text-2xl max-w-184">{{ item.title }}</h6>
              <NuxtLink
                :to="item.btn_link"
                class="btn btn-main d-inline-flex align-items-center rounded-pill gap-8 mt-24"
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

const { promoBanners } = useHomeConfig();
</script>

<style scoped>
/* You can add custom styles here if needed */
</style>
