<template>
  <section class="discount py-80">
    <div class="container container-lg">
      <div class="row gy-4">
        <div
          v-for="(item, index) in discountItems"
          :key="index"
          class="col-xl-6"
          :data-aos="'zoom-in'"
          :data-aos-duration="600 + index * 60"
        >
          <div
            class="discount-item rounded-16 overflow-hidden position-relative z-1 h-100 d-flex flex-column align-items-center justify-content-center"
          >
            <img
              :src="item.bgImage"
              alt=""
              class="position-absolute inset-block-start-0 inset-inline-start-0 w-100 h-100 z-n1"
            />
            <div class="w-100 flex-between gap-20">
              <div class="discount-item__content">
                <span :class="['fw-semibold mb-20', item.labelClass]">
                  {{ item.label }}
                </span>
                <h6 :class="['fw-medium mb-20', item.textClass]">
                  {{ item.title }}
                </h6>
                <NuxtLink
                  :to="item.link"
                  :class="[
                    'btn py-16 px-24 flex-center d-inline-flex rounded-pill gap-8 fw-medium mt-24 box-shadow-5xl',
                    item.buttonClass,
                  ]"
                >
                  Shop Now
                </NuxtLink>
              </div>
              <NuxtImg :src="item.image" alt="" class="d-sm-block d-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { discountItems } from "~/data/discount-two";
</script>
