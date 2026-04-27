<template>
  <div class="pt-80">
    <div class="container container-lg">
      <div
        class="border border-main-500 bg-main-50 border-dashed rounded-8 py-20 d-flex align-items-center justify-content-evenly flex-wrap gap-20"
      >
        <p class="h6 text-main-600 fw-normal">
          Super discount for your
          <NuxtLink
            to="/account"
            class="fw-bold text-decoration-underline text-main-600 hover-text-decoration-none hover-text-primary-600"
            >first purchase</NuxtLink
          >
        </p>
        <div class="position-relative">
          <button
            ref="copyCouponBtn"
            class="copy-coupon-btn px-32 py-10 text-white text-uppercase bg-main-600 rounded-pill border-0 hover-bg-main-800"
          >
            FREE25BAC
            <i class="ph ph-file-text text-lg line-height-1"></i>
          </button>
          <p
            ref="copyText"
            class="copy-text text-md text-main-600 fw-normal position-absolute"
            style="display: none; top: 100%; left: 50%; transform: translateX(-50%)"
          >
            Copied
          </p>
        </div>
        <p class="text-md text-main-600 fw-normal">
          Use discount code to get <span class="fw-bold text-main-600">20% </span> discount for any
          item
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const copyCouponBtn = ref<HTMLButtonElement | null>(null);
const copyText = ref<HTMLElement | null>(null);

onMounted(() => {
  if (copyCouponBtn.value && copyText.value) {
    copyText.value.style.display = "none";

    copyCouponBtn.value.addEventListener("click", () => {
      const text = copyCouponBtn.value?.textContent?.trim() ?? "";
      if (text) {
        navigator.clipboard.writeText(text);
        copyCouponBtn.value?.classList.add("copied");
        copyText.value!.textContent = "Copied";
        copyText.value!.style.display = "inline-block";

        setTimeout(() => {
          copyCouponBtn.value?.classList.remove("copied");
          if (copyText.value) copyText.value.style.display = "none";
        }, 2000);
      }
    });
  }
});
</script>
