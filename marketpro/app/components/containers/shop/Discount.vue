<template>
  <section class="discount-three overflow-hidden">
    <div class="container container-lg">
      <div class="row gy-4">
        <div
          v-for="item in discountItems"
          :key="item.id"
          class="col-xl-4 col-sm-6"
          data-aos="zoom-in"
          data-aos-duration="800"
        >
          <div
            class="discount-three-item bg-img rounded-16 overflow-hidden"
            :style="{ backgroundImage: `url(${item.backgroundImage})` }"
            role="region"
            :aria-label="item.title"
          >
            <div class="text-start">
              <span class="fw-medium text-neutral-600 mb-4 text-uppercase">{{
                item.badgeText
              }}</span>
              <h6 class="fw-semibold mb-0 max-w-375">{{ item.title }}</h6>
              <NuxtLink
                :to="item.link"
                class="btn btn-black rounded-pill gap-8 mt-32 flex-align d-inline-flex"
                tabindex="0"
                aria-label="Shop now for {{ item.title }}"
              >
                Shop Now
                <span class="text-xl d-flex">
                  <i class="ph ph-shopping-cart-simple" aria-hidden="true"></i>
                </span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { discountItems } from "~/data/discount";
</script>
