<template>
  <header
    class="header-middle border-bottom border-neutral-40 py-4"
    role="banner"
    aria-label="Main header"
  >
    <div class="container container-lg">
      <nav class="header-inner flex-between gap-8" aria-label="Primary navigation">
        <div class="logo">
          <NuxtLink to="/" class="link" aria-label="Go to homepage">
            <img :src="site.settings.site_logo || '/images/logo/logo-two.png'" :alt="site.settings.site_name || 'Logo'" style="max-height:40px;object-fit:contain" />
          </NuxtLink>
        </div>

        <Navbar />
        <div
          class="header-right flex-align"
          role="region"
          aria-label="User options and language/currency selectors"
        >
          <ul class="header-top__right style-two style-three flex-align flex-wrap">
            <LanguageSelectorTwo />
            <CurrencySelectorTwo />

            <li class="d-sm-flex d-none" role="none">
              <NuxtLink
                to="/account"
                class="selected-text text-neutral-500 fw-semibold text-sm py-8 hover-text-heading"
                role="menuitem"
                >Order Tracking</NuxtLink
              >
            </li>
          </ul>
          <button
            type="button"
            class="toggle-mobileMenu d-lg-none ms-3n text-gray-800 text-4xl d-flex"
            aria-label="Toggle mobile menu"
            @click="openMenu"
          >
            <i class="ph ph-list" aria-hidden="true"></i>
          </button>
        </div>
      </nav>
    </div>
  </header>
  <MobileMenu v-model="isMobileMenuOpen" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import Navbar from "./Navbar.vue";
import { useSiteStore } from "~/stores/site";

const site = useSiteStore();
site.ensureLoaded();
import LanguageSelectorTwo from "~/components/widgets/language/LanguageSelectorTwo.vue";
import CurrencySelectorTwo from "~/components/widgets/currency/CurrencySelectorTwo.vue";
import MobileMenu from "./MobileMenu.vue";
const isMobileMenuOpen = ref(false);

function openMenu() {
  isMobileMenuOpen.value = true;
}
</script>
