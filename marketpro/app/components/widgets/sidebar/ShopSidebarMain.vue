<template>
  <div :class="['shop-sidebar', { active: isSidebarActive }]">
    <button
      type="button"
      class="shop-sidebar__close d-lg-none d-flex w-32 h-32 flex-center border border-gray-100 rounded-circle hover-bg-main-600 position-absolute inset-inline-end-0 me-10 mt-8 hover-text-white hover-border-main-600"
      @click="closeSidebar"
    >
      <i class="ph ph-x"></i>
    </button>

    <!-- Category filter -->
    <div class="shop-sidebar__box border border-gray-100 rounded-8 p-32">
      <h6 class="text-xl border-bottom border-gray-100 pb-24 mb-24">商品分类</h6>
      <ul class="max-h-540 overflow-y-auto scroll-sm">
        <li class="mb-16">
          <a
            href="#"
            :class="[
              'text-md hover-text-main-600',
              selectedCategoryId === 0 ? 'text-main-600 fw-semibold' : 'text-gray-900',
            ]"
            @click.prevent="selectCategory(0)"
          >全部分类</a>
        </li>
        <li v-for="cat in categories" :key="cat.id" class="mb-16">
          <a
            href="#"
            :class="[
              'text-md hover-text-main-600',
              selectedCategoryId === cat.id ? 'text-main-600 fw-semibold' : 'text-gray-900',
            ]"
            @click.prevent="selectCategory(cat.id)"
          >{{ cat.name }}</a>
        </li>
      </ul>
    </div>
  </div>
  <div
    class="side-overlay"
    :class="{ show: isOverlayVisible }"
    aria-hidden="true"
    @click="closeSidebar"
  ></div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useSidebar } from "~/composables/useSidebar";
import { useSiteStore } from "~/stores/site";

const props = defineProps<{
  selectedCategoryId?: number;
}>();

const emit = defineEmits<{
  (e: "filter", f: { categoryId: number; minPrice: number; maxPrice: number }): void;
}>();

const { isOverlayVisible, isSidebarActive, closeSidebar } = useSidebar();
const site = useSiteStore();

const categories = computed(() => site.categories);

function selectCategory(id: number) {
  emit("filter", { categoryId: id, minPrice: 0, maxPrice: 0 });
  closeSidebar();
}
</script>
