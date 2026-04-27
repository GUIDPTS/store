<template>
  <section class="flash-sales pt-80 overflow-hidden">
    <div class="container container-lg">
      <div class="row gy-4 arrow-style-two">
        <div
          v-for="(item, idx) in flashBanners"
          :key="idx"
          class="col-lg-6"
          :data-aos="'fade-up'"
          :data-aos-duration="600 + idx * 400"
        >
          <div
            class="flash-sales-item rounded-16 overflow-hidden z-1 position-relative flex-align flex-0 justify-content-between gap-8 ps-56-px"
          >
            <img
              :src="item.bg_image"
              alt=""
              class="position-absolute inset-block-start-0 inset-inline-start-0 w-100 h-100 object-fit-cover z-n1 flash-sales-item__bg"
            />
            <div
              :class="
                idx === 0 ? 'flash-sales-item__content ms-sm-auto' : 'flash-sales-item__content'
              "
            >
              <h6 class="text-32 mb-8">{{ item.title }}</h6>
              <p class="mb-12" :class="idx === 0 ? 'text-neutral-500' : 'text-heading'">
                {{ item.subtitle }}
              </p>
              <NuxtLink
                :to="item.btn_link"
                :class="idx === 0 ? 'btn btn-main' : 'btn bg-success-600 hover-bg-success-700'"
                class="d-inline-flex align-items-center rounded-pill gap-8 mt-24"
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

const { flashBanners } = useHomeConfig();
</script>
