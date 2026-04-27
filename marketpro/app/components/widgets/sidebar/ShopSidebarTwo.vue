<template>
  <div class="shop-sidebar" :class="{ active: isSidebarActive }">
    <button
      type="button"
      class="shop-sidebar__close d-lg-none d-flex w-32 h-32 flex-center border border-gray-100 rounded-circle hover-bg-main-600 position-absolute inset-inline-end-0 me-10 mt-8 hover-text-white hover-border-main-600"
      aria-label="Close sidebar"
      @click="closeSidebar"
    >
      <i class="ph ph-x"></i>
    </button>

    <div class="d-flex flex-column gap-12 px-lg-0 px-3 py-lg-0 py-4">
      <section class="border border-gray-50 rounded-8 p-24" aria-label="Product Category">
        <h6 class="text-xl border-bottom border-gray-100 pb-24 mb-24">Product Category</h6>
        <ul class="max-h-540 overflow-y-auto scroll-sm" role="list">
          <li v-for="category in categories" :key="category.id" class="mb-24">
            <NuxtLink :to="category.href" class="text-gray-900 hover-text-main-600">
              {{ category.name }} ({{ category.count }})
            </NuxtLink>
          </li>
        </ul>
      </section>

      <section
        class="shop-sidebar__box border border-gray-100 rounded-8 p-32 mb-32"
        aria-label="Filter by Rating"
      >
        <h6 class="text-xl border-bottom border-gray-100 pb-24 mb-24">Filter by Rating</h6>

        <div
          v-for="rating in ratingFilters"
          :key="rating.id"
          class="flex-align gap-8 position-relative mb-20"
        >
          <label
            class="position-absolute w-100 h-100 cursor-pointer"
            :for="`rating${rating.id}`"
          ></label>

          <div class="common-check common-radio mb-0">
            <input
              :id="`rating${rating.id}`"
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              :value="rating.id"
            />
          </div>

          <div
            class="progress w-100 bg-gray-100 rounded-pill h-8"
            role="progressbar"
            aria-label="Rating progress"
            :aria-valuenow="rating.value"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div
              class="progress-bar bg-main-600 rounded-pill"
              :style="{ width: `${rating.value}%` }"
            ></div>
          </div>

          <div class="flex-align gap-4">
            <span
              v-for="star in 5"
              :key="star"
              class="text-xs fw-medium"
              :class="
                star <= rating.id
                  ? 'text-warning-600 d-flex ph-fill ph-star'
                  : 'text-gray-400 d-flex ph-fill ph-star'
              "
              aria-hidden="true"
            >
              <i class="ph-fill ph-star"></i>
            </span>
          </div>

          <span class="text-gray-900 flex-shrink-0">{{ rating.count }}</span>
        </div>
      </section>

      <section class="border border-gray-50 rounded-8 p-24" aria-label="Filter by Location">
        <h6 class="text-xl border-bottom border-gray-100 pb-24 mb-24">Filter by Location</h6>

        <div class="d-flex flex-column gap-8">
          <select class="common-input form-select" aria-label="Select Country">
            <option value="" disabled selected>Country</option>
            <option v-for="country in countries" :key="country" :value="country">
              {{ country }}
            </option>
          </select>

          <select class="common-input form-select" aria-label="Select State">
            <option value="" disabled selected>State</option>
            <option v-for="state in states" :key="state" :value="state">
              {{ state }}
            </option>
          </select>

          <select class="common-input form-select" aria-label="Select City">
            <option value="" disabled selected>City</option>
            <option v-for="city in cities" :key="city" :value="city">
              {{ city }}
            </option>
          </select>

          <input type="text" class="common-input" placeholder="Zip" aria-label="Zip code" />
        </div>
      </section>
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
import { categories as importedCategories, type Category } from "~/data/shop-sidebar-two";

const categories: Category[] = importedCategories;

const { isSidebarActive, isOverlayVisible, closeSidebar } = useSidebar();

interface RatingFilter {
  id: number;
  label: string;
  value: number;
  count: number;
}

const ratingFilters: RatingFilter[] = [
  { id: 5, label: "5 Stars", value: 70, count: 124 },
  { id: 4, label: "4 Stars", value: 50, count: 52 },
  { id: 3, label: "3 Stars", value: 35, count: 12 },
  { id: 2, label: "2 Stars", value: 20, count: 5 },
  { id: 1, label: "1 Star", value: 5, count: 2 },
];

const countries = ["Bangladesh", "Pakistan", "Vutan", "Nepal"];
const states = ["California", "Washington", "Florida", "Texas"];
const cities = ["New York", "San Francisco", "Oklahoma City", "Chicago"];
</script>
