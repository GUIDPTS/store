<template>
  <div
    class="category-two category-three h-100 d-block flex-shrink-0"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <button
      type="button"
      class="category__button drpb flex-align gap-8 fw-medium bg-main-two-600 py-16 px-20 text-white h-100 md-rounded-top"
      :class="{
        'cat-btn-active': dropdownOpen,
        'cus-btn': route.path !== '/index-two',
        'drpb-active': scrolledPast300,
      }"
      @click="handleClick"
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
      v-show="dropdownOpen"
      class="responsive-dropdown rcdpb style-two common-dropdown d-none d-lg-block nav-submenu p-0 submenus-submenu-wrapper border border-gray-100"
      :class="{ active: dropdownOpen }"
    >
      <ul class="scroll-sm p-0 pb-8 mt-0">
        <li v-for="category in categories" :key="category.id" class="has-submenus-submenu">
          <button class="text-gray-500 text-15 py-12 px-16 flex-align gap-8 rounded-0">
            <span class="d-flex align-items-center gap-8">
              <img
                :src="category.icon"
                :alt="category.title"
                height="auto"
                style="min-width: 20px"
              />
              {{ category.title }}
            </span>
            <span class="icon text-md d-flex ms-auto">
              <i class="ph ph-caret-right"></i>
            </span>
          </button>

          <div class="submenus-submenu py-16">
            <h6 class="text-lg px-16 submenus-submenu__title">
              {{ category.subMenuTitle }}
            </h6>
            <ul class="submenus-submenu__list max-h-300 overflow-y-auto scroll-sm">
              <li v-for="sub in category.submenu" :key="sub.label">
                <NuxtLink :to="sub.to">{{ sub.label }}</NuxtLink>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";
import categoriesData, { type CategoryItem } from "~/data/category-two";

const route = useRoute();
const dropdownOpen = ref(false);
const scrolledPast300 = ref(false);

const categories = ref<CategoryItem[]>(categoriesData);

onMounted(() => {
  if (route.path === "/index-two") {
    dropdownOpen.value = true;
  }
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

function handleScroll() {
  const scrolled = window.scrollY >= 300;

  scrolledPast300.value = scrolled;

  if (scrolled) {
    dropdownOpen.value = false;
  } else if (route.path === "/index-two") {
    dropdownOpen.value = true;
  }
}

function handleClick() {
  if (route.path === "/index-two") {
    dropdownOpen.value = !dropdownOpen.value;
  }
}

function handleMouseEnter() {
  if (route.path !== "/index-two") {
    dropdownOpen.value = true;
  }
}

function handleMouseLeave() {
  if (route.path !== "/index-two") {
    dropdownOpen.value = false;
  }
}
</script>
