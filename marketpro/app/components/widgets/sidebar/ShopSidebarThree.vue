<template>
  <div class="shop-sidebar" :class="{ active: isSidebarActive }">
    <button
      type="button"
      class="shop-sidebar__close d-lg-none d-flex w-32 h-32 flex-center border border-gray-100 rounded-circle hover-bg-main-600 bg-main-600 position-absolute inset-inline-end-0 me-10 mt-8 text-white border-main-600"
      aria-label="Close Sidebar"
      @click="closeSidebar"
    >
      <i class="ph ph-x"></i>
    </button>

    <div class="d-flex flex-column gap-12 px-lg-0 px-3 py-lg-0 py-4">
      <div class="bg-neutral-600 rounded-8 p-24">
        <div class="d-flex align-items-center justify-content-between">
          <span class="w-80 h-80 flex-center bg-white rounded-8 flex-shrink-0">
            <NuxtImg :src="store.imgSrc" alt="Image" />
          </span>
          <div class="d-flex flex-column gap-24">
            <button
              type="button"
              class="text-uppercase group border border-white px-16 py-8 rounded-pill text-white text-sm hover-bg-main-two-600 hover-text-white hover-border-main-two-600 transition-2 flex-center gap-8 w-100"
            >
              FOLLOW
              <span class="text-xl d-flex text-main-two-600 group-item-white transition-2">
                <i class="ph ph-storefront"></i>
              </span>
            </button>
            <button
              type="button"
              class="text-uppercase group border border-white px-16 py-8 rounded-pill text-white text-sm hover-bg-main-two-600 hover-text-white hover-border-main-two-600 transition-2 flex-center gap-8 w-100"
            >
              Chat Now
              <span class="text-xl d-flex text-main-two-600 group-item-white transition-2">
                <i class="ph ph-storefront"></i>
              </span>
            </button>
          </div>
        </div>

        <div class="mt-32">
          <h6 class="text-white fw-semibold mb-12">
            <NuxtLink :to="store.vendorHref">{{ store.name }}</NuxtLink>
          </h6>
          <span class="text-xs text-white mb-12">{{ store.followers }} Followers</span>

          <div class="flex-align gap-6">
            <div class="flex-align gap-8">
              <template v-for="star in 5" :key="star">
                <span class="text-xs fw-medium text-warning-600 d-flex">
                  <i class="ph-fill ph-star"></i>
                </span>
              </template>
            </div>
            <span class="text-xs fw-medium text-white">{{ store.rating }}</span>
            <span class="text-xs fw-medium text-white">({{ store.ratingCount }})</span>
          </div>
        </div>

        <div class="mt-32 d-flex flex-column gap-8">
          <NuxtLink
            to="/shop"
            class="px-16 py-12 border text-white border-neutral-500 w-100 rounded-4 hover-bg-main-600 hover-border-main-600"
            >About Store</NuxtLink
          >
          <NuxtLink
            to="/shop"
            class="px-16 py-12 border text-white border-neutral-500 w-100 rounded-4 hover-bg-main-600 hover-border-main-600"
            >Products</NuxtLink
          >
          <NuxtLink
            to="/shop"
            class="px-16 py-12 border text-white border-neutral-500 w-100 rounded-4 hover-bg-main-600 hover-border-main-600"
            >Return Policy</NuxtLink
          >
          <NuxtLink
            to="/shop"
            class="px-16 py-12 border text-white border-neutral-500 w-100 rounded-4 hover-bg-main-600 hover-border-main-600"
            >Shipping Policy</NuxtLink
          >
          <NuxtLink
            to="/shop"
            class="px-16 py-12 border text-white border-neutral-500 w-100 rounded-4 hover-bg-main-600 hover-border-main-600"
            >Contact Seller</NuxtLink
          >
        </div>
      </div>

      <div class="border border-gray-50 rounded-8 p-24">
        <h6 class="text-xl border-bottom border-gray-100 pb-24 mb-24">Product Category</h6>
        <ul class="max-h-540 overflow-y-auto scroll-sm">
          <li v-for="category in categories" :key="category.id" class="mb-24">
            <NuxtLink :to="category.href" class="text-gray-900 hover-text-main-600">
              {{ category.name }} ({{ category.count }})
            </NuxtLink>
          </li>
        </ul>
      </div>

      <div class="blog-sidebar border border-gray-100 rounded-8 p-32 mb-40">
        <h6 class="text-xl mb-32 pb-32 border-bottom border-gray-100">Best Sell Products</h6>
        <div class="d-flex flex-column gap-24">
          <div
            v-for="product in bestSellProducts"
            :key="product.id"
            class="d-flex align-items-center flex-sm-nowrap flex-wrap gap-16"
          >
            <NuxtLink
              :href="product.href"
              class="w-100 h-100 rounded-4 overflow-hidden w-76 h-76 flex-shrink-0 bg-color-three flex-center"
            >
              <NuxtImg :src="product.imgSrc" :alt="product.name" />
            </NuxtLink>

            <div class="flex-grow-1">
              <h6 class="text-lg mb-8 fw-medium">
                <NuxtLink :to="product.href" class="text-line-3">{{ product.name }}</NuxtLink>
              </h6>
              <div class="flex-align gap-6">
                <div class="flex-align gap-4">
                  <template v-for="star in 5" :key="star">
                    <span class="text-xs fw-medium text-warning-600 d-flex">
                      <i class="ph-fill ph-star"></i>
                    </span>
                  </template>
                </div>
                <span class="text-xs fw-medium text-neutral-500">{{ product.rating }}</span>
                <span class="text-xs fw-medium text-neutral-500">({{ product.ratingCount }})</span>
              </div>
              <h6 class="text-md mb-0 mt-4">{{ product.price }}</h6>
            </div>
          </div>
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

<script setup lang="ts">
import { useSidebar } from "~/composables/useSidebar";
import { categories, bestSellProducts } from "~/data/shop-sidebar-three";

const { isSidebarActive, isOverlayVisible, closeSidebar } = useSidebar();

const store = {
  name: "Baishakhi Plus",
  followers: "480589",
  rating: 4.8,
  ratingCount: "12K",
  vendorHref: "/vendor-two",
  imgSrc: "/images/thumbs/vendors-two-icon1.png",
};
</script>
