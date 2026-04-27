<template>
  <section class="promo-three pt-120 wow bounce overflow-hidden">
    <div class="container container-lg">
      <div class="row gy-4">
        <div
          v-for="item in promoItems"
          :key="item.id"
          class="col-sm-6"
          data-aos="zoom-in"
          data-aos-duration="800"
        >
          <div
            class="promo-three-item bg-img rounded-16 overflow-hidden"
            :style="{ backgroundImage: `url(${item.backgroundImage})` }"
          >
            <div class="text-start">
              <span class="text-white mb-24">{{ item.spanText }}</span>

              <h2 class="text-white fw-medium mb-0 max-w-375">
                {{ item.heading }}
                <span
                  class="fw-normal text-white font-heading-four wow bounceInDown"
                  data-aos-duration="1s"
                  :data-aos-delay="item.wowDelay"
                >
                  {{ item.highlight }}
                </span>
                {{ " " + item.subText }}
              </h2>

              <NuxtLink
                :to="item.link"
                class="btn btn-outline-white d-inline-flex align-items-center rounded-pill gap-8 mt-48"
              >
                Explore Now
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { promoItems } from "~/data/promo-three";
</script>
