<template>
  <section class="shipping bg-black-light">
    <div class="container container-lg">
      <div class="row gy-4">
        <div
          v-for="item in shippingItems"
          :key="item.id"
          class="col-xxl-3 col-sm-6"
          data-aos="zoom-in"
          :data-aos-duration="item.aosDuration"
        >
          <div
            class="shipping-item flex-align gap-16 rounded-16 border border-white-13 border-dashed hover-bg-main-700 transition-2"
          >
            <span
              class="w-56 h-56 flex-center rounded-circle bg-main-two-600 text-white text-32 flex-shrink-0"
            >
              <i :class="item.iconClass"></i>
            </span>
            <div>
              <h6 class="mb-0 text-xl fw-semibold text-white">{{ item.title }}</h6>
              <span class="text-sm text-neutral-300 d-block mt-10">{{ item.description }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { shippingItems } from "~/data/shipping-overview";
</script>
