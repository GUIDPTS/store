<template>
  <div class="bottom-footer pt-8">
    <div class="container container-lg">
      <div
        class="bottom-footer__inner flex-between flex-wrap gap-16 py-16 border-top border-neutral-100"
      >
        <p class="bottom-footer__text text-heading fw-medium">
          Copyright &copy;
          <span class="text-success-600 fw-semibold">{{ currentYear }}</span
          >&nbsp; <a href="https://themeforest.net/user/wowtheme7">wowtheme7</a> All Rights Reserved
        </p>

        <nav aria-label="Social media links" class="flex-align gap-8 flex-wrap">
          <ul class="flex-align gap-16 list-none m-0 p-0">
            <li>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                class="w-44 h-44 flex-center bg-white shadow-sm text-main-600 text-xl rounded-circle hover-bg-main-600 hover-text-white transition-colors duration-300"
              >
                <i class="ph-fill ph-facebook-logo" aria-hidden="true"></i>
              </a>
            </li>
            <li>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                class="w-44 h-44 flex-center bg-white shadow-sm text-main-600 text-xl rounded-circle hover-bg-main-600 hover-text-white transition-colors duration-300"
              >
                <i class="ph-fill ph-twitter-logo" aria-hidden="true"></i>
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                class="w-44 h-44 flex-center bg-white shadow-sm text-main-600 text-xl rounded-circle hover-bg-main-600 hover-text-white transition-colors duration-300"
              >
                <i class="ph-fill ph-linkedin-logo" aria-hidden="true"></i>
              </a>
            </li>
            <li>
              <a
                href="https://www.pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pinterest"
                class="w-44 h-44 flex-center bg-white shadow-sm text-main-600 text-xl rounded-circle hover-bg-main-600 hover-text-white transition-colors duration-300"
              >
                <i class="ph-fill ph-pinterest-logo" aria-hidden="true"></i>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>
