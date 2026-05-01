<template>
  <header class="header bg-white py-24">
    <div class="container container-lg">
      <nav class="header-inner d-flex justify-content-between gap-16">
        <div class="d-flex w-100">
          <div class="d-none d-lg-block flex-shrink-0">
            <CategoryDropdownTwo />
          </div>
          <div class="d-block d-lg-none flex-shrink-0">
            <CategoryDropdownThree />
          </div>
          <form
            class="position-relative ms-20 max-w-870 w-100 d-md-block d-none"
            novalidate
            @submit.prevent="handleSearch"
          >
            <input
              ref="searchInput"
              v-model.trim="searchQuery"
              type="text"
              class="form-control fw-medium placeholder-italic shadow-none bg-neutral-30 placeholder-fw-medium placeholder-light py-16 ps-30 pe-60"
              :class="{ 'border-danger': hasError }"
              placeholder="Search for products, categories or brands..."
              aria-label="Search"
            />
            <button
              type="submit"
              class="position-absolute top-50 translate-middle-y text-main-600 end-0 me-36 text-xl line-height-1"
              aria-label="Submit search"
            >
              <i class="ph-bold ph-magnifying-glass"></i>
            </button>
          </form>
        </div>

        <div class="d-flex align-items-center gap-20-px flex-shrink-0">
          <NuxtLink to="/account" class="flex-align gap-6 item-hover d-none d-sm-flex">
            <span class="text-2xl text-heading d-flex position-relative me-6 mt-6 item-hover__text">
              <i class="ph-bold ph-recycle"></i>
              <span
                class="w-18 h-18 flex-center rounded-circle bg-success-600 text-white text-xs position-absolute top-n6 end-n4"
                >2</span
              >
            </span>
            <span class="text-md text-neutral-500 item-hover__text fw-medium d-none d-lg-flex"
              >Compare</span
            >
          </NuxtLink>
          <NuxtLink to="/cart" class="flex-align gap-6 item-hover d-none d-sm-flex">
            <span class="text-2xl text-heading d-flex position-relative me-6 mt-6 item-hover__text">
              <i class="ph-bold ph-shopping-cart"></i>
              <span
                class="w-18 h-18 flex-center rounded-circle bg-success-600 text-white text-xs position-absolute top-n6 end-n4"
                >2</span
              >
            </span>
            <span class="text-md text-neutral-500 item-hover__text fw-medium d-none d-lg-flex"
              >Cart</span
            >
          </NuxtLink>
          <NuxtLink
            to="/account"
            class="d-flex align-content-around gap-10 fw-medium text-main-600 py-14 px-24 bg-main-50 rounded-pill line-height-1 hover-bg-main-600 hover-text-white"
          >
            <span class="d-sm-flex d-none line-height-1"><i class="ph-bold ph-user"></i></span>
            Account
          </NuxtLink>
        </div>
      </nav>
      <div v-if="hasError" class="text-danger text-center text-sm mt-8 ms-1 fw-medium">
        Please enter a keyword.
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CategoryDropdownTwo from "~/components/widgets/dropdown/CategoryDropdownTwo.vue";
import CategoryDropdownThree from "~/components/widgets/dropdown/CategoryDropdownThree.vue";
import { useFixedHeader } from "~/composables/useFixedHeader";

useFixedHeader();

const searchQuery = ref("");
const hasError = ref(false);
const searchInput = ref<HTMLInputElement | null>(null);

const handleSearch = () => {
  if (searchQuery.value.length < 3) {
    hasError.value = true;
    searchInput.value?.focus();
    return;
  }
  hasError.value = false;
  navigateTo(`/shop?keyword=${encodeURIComponent(searchQuery.value)}`);
};
</script>
