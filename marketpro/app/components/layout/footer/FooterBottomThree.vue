<template>
  <div class="bottom-footer bg-color-three py-8">
    <div class="container container-lg">
      <div class="bottom-footer__inner flex-between flex-wrap gap-16 py-16">
        <p class="bottom-footer__text">
          <a href="https://themeforest.net/user/wowtheme7">wowtheme7</a> eCommerce &copy;
          {{ currentYear }}. All Rights Reserved
        </p>
        <div class="flex-align gap-8 flex-wrap">
          <span class="text-heading text-sm">We Are Accepting</span>
          <img src="/images/thumbs/payment-method.png" alt="Payment Methods" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>
