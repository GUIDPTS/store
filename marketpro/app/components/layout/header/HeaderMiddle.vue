<template>
  <header class="header-middle border-bottom border-gray-100 header-cmdc">
    <div class="container container-lg">
      <nav class="header-inner flex-between gap-8">
        <div class="logo">
          <NuxtLink to="/" class="link">
            <img src="/images/logo/logo.png" alt="Logo" />
          </NuxtLink>
        </div>

        <form
          class="flex-align flex-wrap form-location-wrapper max-w-840 w-100"
          @submit="onSearchSubmit"
        >
          <div
            class="search-category select-style-one d-flex select-border-end-0 search-form d-sm-flex d-none text-heading-two text-sm w-100"
          >
            <Multiselect
              v-model="selectedCategory"
              :options="categories"
              :searchable="true"
              placeholder="All categories"
              label="label"
              track-by="value"
              class="border border-neutral-40 border-end-0 js-example-basic-single"
            />

            <div class="search-form__wrapper position-relative border-half-start flex-grow-1">
              <input
                v-model="searchQuery"
                type="text"
                :class="[
                  'common-input border-neutral-40 py-18 ps-16 pe-76 rounded-0 rounded-end pe-44 placeholder-italic placeholder-text-sm border-start-0',
                  searchError ? 'border-danger' : '',
                ]"
                placeholder="Search for products, categories or brands..."
                aria-label="Search input"
              />
              <button
                type="submit"
                class="w-64 h-44 bg-main-600 hover-bg-main-800 rounded-4 flex-center text-xl text-white position-absolute top-50 translate-middle-y inset-inline-end-0 me-6"
                aria-label="Search"
              >
                <i class="ph ph-magnifying-glass"></i>
              </button>
            </div>
          </div>

          <p v-if="searchError" class="text-danger text-sm mt-2 ps-2">Please Enter A Keyword</p>
        </form>

        <div class="header-right flex-align flex-shrink-0">
          <div class="flex-align gap-20">
            <button
              type="button"
              class="search-icon flex-align d-lg-none d-flex gap-4 item-hover"
              @click="openSearchPopup"
            >
              <span class="text-2xl text-gray-700 d-flex position-relative item-hover__text">
                <i class="ph ph-magnifying-glass"></i>
              </span>
            </button>

            <NuxtLink to="/account" class="flex-align gap-4 item-hover">
              <span class="text-xl text-gray-700 d-flex position-relative item-hover__text">
                <i class="ph ph-user"></i>
              </span>
              <span class="text-md text-heading-three item-hover__text d-none d-lg-flex">
                {{ auth.isAuthenticated ? auth.user?.username : "登录" }}
              </span>
            </NuxtLink>

            <NuxtLink to="/wishlist" class="flex-align gap-4 item-hover">
              <span
                class="text-xl text-gray-700 d-flex position-relative me-6 mt-6 item-hover__text"
              >
                <i class="ph ph-heart"></i>
                <span
                  v-if="wishlist.count > 0"
                  class="w-16 h-16 flex-center rounded-circle bg-main-600 text-white text-xs position-absolute top-n6 end-n4"
                >
                  {{ wishlist.count }}
                </span>
              </span>
              <span class="text-md text-heading-three item-hover__text d-none d-lg-flex">
                收藏
              </span>
            </NuxtLink>

            <NuxtLink to="/cart" class="flex-align gap-4 item-hover">
              <span
                class="text-xl text-gray-700 d-flex position-relative me-6 mt-6 item-hover__text"
              >
                <i class="ph ph-shopping-cart-simple"></i>
                <span
                  v-if="cart.count > 0"
                  class="w-16 h-16 flex-center rounded-circle bg-main-600 text-white text-xs position-absolute top-n6 end-n4"
                >
                  {{ cart.count }}
                </span>
              </span>
              <span class="text-md text-heading-three item-hover__text d-none d-lg-flex">
                购物车
              </span>
            </NuxtLink>
          </div>
        </div>
      </nav>
    </div>
  </header>
  <SearchBox ref="searchPopupRef" />
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import SearchBox from "./SearchBox.vue";
import { useAuthStore } from "~/stores/auth";
import { useCartStore } from "~/stores/cart";
import { useWishlistStore } from "~/stores/wishlist";
import { useSiteStore } from "~/stores/site";

const auth = useAuthStore();
const cart = useCartStore();
const wishlist = useWishlistStore();
const site = useSiteStore();

const categories = computed(() =>
  [{ label: "All Categories", value: "" }].concat(
    site.categories.map(c => ({ label: c.name, value: String(c.id) }))
  )
);

const selectedCategory = ref<{ label: string; value: string } | null>(null);
const searchQuery = ref("");
const searchError = ref(false);

const onSearchSubmit = (event: Event) => {
  event.preventDefault();
  searchError.value = false;

  if (!searchQuery.value.trim()) {
    searchError.value = true;
    return;
  }
};

const searchPopupRef = ref<InstanceType<typeof SearchBox> | null>(null);

const openSearchPopup = () => {
  searchPopupRef.value?.open();
};
</script>
