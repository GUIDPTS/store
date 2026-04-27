<template>
  <header class="header bg-white border-bottom-0 box-shadow-3xl py-10 z-2">
    <div class="container container-lg">
      <nav class="header-inner d-flex justify-content-between gap-8">
        <div class="flex-align menu-category-wrapper position-relative">
          <CategoryDropdown />
          <Navbar />
        </div>

        <div class="header-right flex-align gap-20">
          <a href="tel:+(2)871382023" class="d-sm-flex align-items-center gap-16 d-none">
            <span class="d-flex text-32">
              <NuxtImg src="/images/icon/mobile.png" alt="Mobile Icon" />
            </span>
            <span class="">
              <span class="d-block text-heading fw-medium">Need any Help! call Us</span>
              <span class="d-block fw-bold text-main-600 hover-text-decoration-underline"
                >+(2) 871 382 023</span
              >
            </span>
          </a>
          <button
            type="button"
            class="toggle-mobileMenu d-lg-none ms-3n text-gray-800 text-4xl d-flex"
            @click="openMenu"
          >
            <i class="ph ph-list"></i>
          </button>
        </div>
      </nav>
    </div>
  </header>
  <MobileMenu v-model="isMobileMenuOpen" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import CategoryDropdown from "~/components/widgets/dropdown/CategoryDropdown.vue";
import { useFixedHeader } from "~/composables/useFixedHeader";
import Navbar from "./Navbar.vue";
import MobileMenu from "./MobileMenu.vue";
const isMobileMenuOpen = ref(false);

function openMenu() {
  isMobileMenuOpen.value = true;
}

useFixedHeader();
</script>
