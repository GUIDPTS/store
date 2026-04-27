<template>
  <div
    class="header-top bg-main-600 flex-between py-10"
    role="region"
    aria-label="Top header information"
  >
    <div class="container container-lg">
      <div class="flex-between flex-wrap gap-8">
        <div class="text-white text-sm d-flex align-items-center gap-4">
          <NuxtImg :src="trackIcon" alt="Track Icon" width="16" height="12" />
          <span>We deliver to you every day from 7.00 to 23.00</span>
        </div>
        <div
          class="d-flex align-items-center gap-6 flex-wrap"
          aria-live="polite"
          aria-atomic="true"
          role="timer"
          aria-label="Countdown timer until sale ends"
        >
          <span class="text-md fw-medium text-white">Until the end of the sale:</span>
          <div id="countdown25" class="d-flex align-items-center gap-10">
            <div class="d-flex align-items-center gap-4 text-white">
              <strong class="text-md fw-semibold days" aria-label="Days remaining">0</strong>
              <span class="text-xs">Days</span>
            </div>
            <div class="d-flex align-items-center gap-4 text-white">
              <strong class="text-md fw-semibold hours" aria-label="Hours remaining">0</strong>
              <span class="text-xs">Hours</span>
            </div>
            <div class="d-flex align-items-center gap-4 text-white">
              <strong class="text-md fw-semibold minutes" aria-label="Minutes remaining">0</strong>
              <span class="text-xs">Minutes</span>
            </div>
            <div class="d-flex align-items-center gap-4 text-white">
              <strong class="text-md fw-semibold seconds" aria-label="Seconds remaining">0</strong>
              <span class="text-xs">Sec.</span>
            </div>
          </div>
        </div>
        <ul class="header-top__right flex-align flex-wrap gap-16">
          <li>
            <NuxtLink
              to="/contact"
              class="text-white-6 text-sm hover-text-white"
              aria-label="Track Order"
              >Track Order</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/contact"
              class="text-white-6 text-sm hover-text-white"
              aria-label="About Us"
              >About Us</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/contact"
              class="text-white-6 text-sm hover-text-white"
              aria-label="Contact"
              >Contact</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/wishlist"
              class="text-white-6 text-sm hover-text-white"
              aria-label="Wishlist"
              >Wishlist</NuxtLink
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";
import { initializeCountdown } from "@/utils/countdown";

import trackIcon from "/images/icon/track-icon.png";

const intervalId = ref<ReturnType<typeof setInterval> | null>(null);

onMounted(() => {
  intervalId.value = initializeCountdown("countdown25", "2027-12-30T23:59:59", () => {});
});

onBeforeUnmount(() => {
  if (intervalId.value) clearInterval(intervalId.value);
});
</script>
