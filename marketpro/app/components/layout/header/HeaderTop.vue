<template>
  <div
    class="header-top bg-main-600 py-8 flex-between"
    role="region"
    aria-label="Sale countdown timer"
  >
    <div class="container container-lg">
      <div class="flex-between flex-wrap gap-8">
        <div class="d-flex align-items-center flex-wrap gap-10">
          <span class="text-md fw-medium text-white d-none d-md-flex">
            Until the end of the sale:
          </span>
          <span class="text-md fw-medium text-white d-flex d-md-none">Sale end:</span>

          <div
            id="countdown25"
            class="d-flex align-items-center gap-10"
            role="timer"
            aria-live="polite"
          >
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

        <ul class="flex-align flex-wrap d-none d-xl-flex">
          <li class="border-right-item pe-12 me-12">
            <span class="text-white text-sm">
              Buy one get one free on
              <span class="text-yellow">first order</span>
            </span>
          </li>
          <li class="border-right-item pe-12 me-12">
            <NuxtLink
              to="/account"
              class="text-white text-sm d-flex cfg align-items-center gap-4 hover-text-decoration-underline"
            >
              <NuxtImg :src="trackIcon" alt="Track Icon" width="16" height="12" />
              <span>Track Your Order</span>
            </NuxtLink>
          </li>
        </ul>

        <ul class="header-top__right flex-align flex-wrap gap-16 w-auto">
          <li class="d-lg-flex d-none">
            <NuxtLink to="/account" class="text-white text-sm hover-text-decoration-underline">
              Order Tracking
            </NuxtLink>
          </li>
          <li class="d-lg-flex d-none">
            <NuxtLink to="/account" class="text-white text-sm hover-text-decoration-underline">
              About Us
            </NuxtLink>
          </li>

          <LanguageSelector />
          <CurrencySelector />
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";
import { initializeCountdown } from "@/utils/countdown";
import LanguageSelector from "~/components/widgets/language/LanguageSelector.vue";
import CurrencySelector from "~/components/widgets/currency/CurrencySelector.vue";

import trackIcon from "/images/icon/track-icon.png";

const intervalId = ref<ReturnType<typeof setInterval> | null>(null);

onMounted(() => {
  intervalId.value = initializeCountdown("countdown25", "2027-12-30", () => {});
});

onBeforeUnmount(() => {
  if (intervalId.value) clearInterval(intervalId.value);
});
</script>
