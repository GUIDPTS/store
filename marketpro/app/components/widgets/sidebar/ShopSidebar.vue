<template>
  <div :class="['shop-sidebar', { active: isSidebarActive }]">
    <button
      type="button"
      class="shop-sidebar__close d-lg-none d-flex w-32 h-32 flex-center border border-gray-100 rounded-circle hover-bg-main-600 position-absolute inset-inline-end-0 me-10 mt-8 hover-text-white hover-border-main-600"
      aria-label="Close sidebar"
      @click="closeSidebar"
    >
      <i class="ph ph-x"></i>
    </button>

    <div class="d-flex flex-column gap-12 px-lg-0 px-16 py-lg-0 py-24">
      <div class="vendor-card style-two text-center px-16 pb-24 bg-main-50">
        <NuxtImg
          :src="vendor.logoSrc"
          :alt="vendor.name + ' logo'"
          class="vendor-card__logo m-12"
        />
        <h6 class="title mt-32">{{ vendor.name }}</h6>
        <span class="text-neutral-600 text-sm d-block fw-semibold">{{ vendor.address }}</span>
        <span class="bg-white text-neutral-900 rounded-pill py-6 px-16 text-12 mt-8"
          >Since {{ vendor.since }}</span
        >
        <p class="text-neutral-600 my-24">{{ vendor.description }}</p>
        <ul class="flex-center gap-8 flex-wrap">
          <li v-for="link in socialLinks" :key="link.id">
            <NuxtLink
              :to="link.href"
              class="w-36 h-36 flex-center bg-white text-main-600 text-lg rounded-circle hover-bg-main-600 hover-text-white"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="link.label"
            >
              <i :class="link.iconClass"></i>
            </NuxtLink>
          </li>
        </ul>
        <NuxtLink :to="vendor.contactHref" class="btn btn-main rounded-pill py-16 px-32 mt-28 w-100"
          >Contact Seller</NuxtLink
        >
      </div>

      <div class="border border-gray-50 rounded-8 p-24">
        <h6 class="text-xl border-bottom border-gray-100 pb-24 mb-24">Product Category</h6>
        <ul class="max-h-326 overflow-y-auto scroll-sm">
          <li v-for="category in categories" :key="category.id" class="mb-24 last:mb-0">
            <NuxtLink :to="category.href" class="text-gray-900 hover-text-main-600">
              {{ category.name }} ({{ category.count }})
            </NuxtLink>
          </li>
        </ul>
      </div>

      <PriceRangeSlider :min="0" :max="25" />

      <div class="border border-gray-50 rounded-8 p-24">
        <h6 class="text-xl border-bottom border-gray-100 pb-24 mb-24">Filter by Rating</h6>

        <div
          v-for="rating in ratings"
          :key="rating.id"
          class="flex-align gap-8 position-relative mb-20 last:mb-0"
        >
          <label
            class="position-absolute w-100 h-100 cursor-pointer"
            :for="'rating' + rating.id"
            aria-label="Filter by rating {{ rating.stars }} stars"
          ></label>
          <div class="common-check common-radio mb-0">
            <input
              :id="'rating' + rating.id"
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              :value="rating.stars"
            />
          </div>
          <div class="flex-align gap-4">
            <span
              v-for="starIndex in 5"
              :key="starIndex"
              class="text-xs fw-medium"
              :class="
                starIndex <= rating.stars ? 'text-warning-600 d-flex' : 'text-gray-400 d-flex'
              "
            >
              <i class="ph-fill ph-star"></i>
            </span>
          </div>
          <span class="text-gray-900 flex-shrink-0">{{ rating.count }}</span>
        </div>
      </div>

      <div class="bg-main-50 rounded-8 p-16 text-center">
        <span class="text-2xl text-neutral-600 mb-8">Fresh Vegetables</span>
        <h5 class="text-32 text-main-600">Up to 25% Off</h5>
        <div class="mt-52">
          <NuxtImg src="/images/thumbs/advertiser-img.png" alt="Advertiser" />
        </div>
      </div>
    </div>
  </div>
  <div
    class="side-overlay"
    :class="{ show: isOverlayVisible }"
    aria-hidden="true"
    @click="closeSidebar"
  ></div>
</template>

<script lang="ts" setup>
import { vendor, socialLinks, categories, ratings } from "~/data/shop-sidebar";
import { useSidebar } from "~/composables/useSidebar";

import PriceRangeSlider from "../vendor/PriceRangeSlider.vue";
const { isSidebarActive, isOverlayVisible, closeSidebar } = useSidebar();
</script>
