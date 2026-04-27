<template>
  <div class="category-two h-100 d-block flex-shrink-0">
    <button
      type="button"
      class="category__button flex-align gap-8 fw-medium bg-main-two-600 py-16 px-20 text-white h-100 md-rounded-top"
      :class="{ active: dropdownActive }"
      @click="toggleDropdown"
    >
      <span class="icon text-2xl d-md-flex d-none">
        <i class="ph ph-squares-four"></i>
      </span>
      <span class="d-lg-flex d-none">All</span> Categories
      <span class="arrow-icon text-md d-flex ms-auto">
        <i class="ph ph-caret-down"></i>
      </span>
    </button>
    <div
      v-if="dropdownActive"
      class="responsive-dropdown style-two active common-dropdown d-lg-none d-block nav-submenu p-0 submenus-submenu-wrapper border border-gray-100"
    >
      <button
        type="button"
        class="close-responsive-dropdown rounded-circle text-xl position-absolute inset-inline-end-0 inset-block-start-0 mt-4 me-8 d-lg-none d-flex"
        @click="closeMenu"
      >
        <i class="ph ph-x"></i>
      </button>
      <div class="logo px-16 d-lg-none d-block">
        <NuxtLink to="/" class="link">
          <NuxtImg src="/images/logo/logo.png" alt="Logo" />
        </NuxtLink>
      </div>
      <ul class="scroll-sm p-0 py-8 mt-20">
        <li
          v-for="(category, index) in categories"
          :key="category.id"
          class="has-submenus-submenu"
          :class="{ active: activeSubMenuIndex === index }"
        >
          <button
            class="text-gray-500 text-15 py-16 px-16 flex-align gap-8 rounded-0"
            @click.prevent="toggleSubMenu(index)"
          >
            <span class="d-flex align-items-center gap-8">
              <NuxtImg :src="category.icon" :alt="category.title" width="16" height="16" />
              {{ category.title }}
            </span>
            <span class="icon text-md d-flex ms-auto">
              <i
                class="ph"
                :class="activeSubMenuIndex === index ? 'ph-caret-down' : 'ph-caret-right'"
              ></i>
            </span>
          </button>
          <div v-if="activeSubMenuIndex === index" class="submenus-submenu py-16">
            <h6 class="text-lg px-16 submenus-submenu__title">
              {{ category.subMenuTitle }}
            </h6>
            <ul class="submenus-submenu__list max-h-300 overflow-y-auto scroll-sm">
              <li v-for="(item, subIndex) in category.submenu" :key="subIndex">
                <NuxtLink :to="item.to">{{ item.label }}</NuxtLink>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <div
      v-if="isOverlayVisible"
      class="side-overlay"
      :class="{ show: isOverlayVisible }"
      aria-hidden="true"
      @click="closeMenu"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import categories from "~/data/category-two";

const dropdownActive = ref(false);
const activeSubMenuIndex = ref<number | null>(null);
const isOverlayVisible = ref(false);

function toggleDropdown() {
  dropdownActive.value = !dropdownActive.value;
  isOverlayVisible.value = dropdownActive.value;
  if (!dropdownActive.value) {
    activeSubMenuIndex.value = null;
  }
}

function toggleSubMenu(index: number) {
  activeSubMenuIndex.value = activeSubMenuIndex.value === index ? null : index;
}

function closeMenu() {
  dropdownActive.value = false;
  activeSubMenuIndex.value = null;
  isOverlayVisible.value = false;
}
</script>
