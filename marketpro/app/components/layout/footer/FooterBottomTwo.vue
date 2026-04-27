<template>
  <div class="bottom-footer bg-black-light">
    <div class="container container-lg">
      <div
        class="bottom-footer__inner flex-between flex-wrap gap-16 border-top border-gray-800 py-24"
      >
        <p class="text-white fw-normal">
          Full Copyright &copy; Design By
          <a
            href="https://themeforest.net/user/wowtheme7"
            class="text-main-600 hover-text-white hover-text-decoration-underline"
            >wowtheme7</a
          >
          - {{ currentYear }}
        </p>

        <select
          v-model="selectedLanguage"
          class="form-control form-select rounded-10 w-auto border border-white ps-18 text-heading fw-medium"
          aria-label="Select language"
        >
          <option v-for="lang in languages" :key="lang" :value="lang">
            {{ lang }}
          </option>
        </select>
        <div class="flex-align gap-8 flex-wrap">
          <img
            src="/images/thumbs/payment-method-two.png"
            alt="Accepted Payment Methods"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const selectedLanguage = ref("English (US)");

const languages = ["English (US)", "Bangla", "Urdhu", "Spanish", "Arabic"];
const currentYear = new Date().getFullYear();
</script>
