<template>
  <div ref="dropdownContainer">
    <button
      type="button"
      class="category-button d-flex align-items-center gap-12 text-white bg-success-600 px-20 py-16 rounded-6 hover-bg-success-700 transition-2"
      :class="{ active: isActive }"
      aria-haspopup="menu"
      :aria-expanded="isActive"
      aria-controls="categoryDropdown"
      @click.stop="toggleDropdown"
      @keydown.enter.prevent="toggleDropdown"
      @keydown.space.prevent="toggleDropdown"
      @keydown.esc.prevent="closeDropdown"
    >
      <span class="text-xl line-height-1"><i class="ph ph-squares-four"></i></span>
      <span>Browse Categories</span>
      <span class="line-height-1 icon transition-2"><i class="ph-bold ph-caret-down"></i></span>
    </button>

    <div
      id="categoryDropdown"
      class="category-dropdown border border-success-200 shadow bg-white p-16 rounded-16 w-100 max-w-472 position-absolute inset-block-start-100 inset-inline-start-0 z-99 transition-2"
      :class="{ active: isActive }"
      role="menu"
      tabindex="-1"
      @click.stop="keepOpen"
    >
      <div class="d-grid grid-cols-3-repeat gap-4">
        <NuxtLink
          v-for="category in categories"
          :key="category.id"
          :to="category.link"
          class="py-16 px-8 rounded-8 hover-bg-main-50 d-flex flex-column align-items-center text-center border border-white hover-border-main-100"
          role="menuitem"
          tabindex="0"
        >
          <span>
            <img v-if="category.image" :src="category.image" :alt="category.name" class="w-40" style="object-fit:contain" />
            <span v-else-if="category.icon" class="w-40 h-40 d-flex align-items-center justify-content-center">
              <i :class="category.icon" style="font-size:28px"></i>
            </span>
            <span v-else class="w-40 h-40 d-flex align-items-center justify-content-center">
              <i class="ph ph-squares-four" style="font-size:28px"></i>
            </span>
          </span>
          <span class="fw-semibold text-heading mt-16 text-sm">{{ category.name }}</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { useSiteStore } from "~/stores/site";

const siteStore = useSiteStore();

const categories = computed(() =>
  siteStore.categories.map(c => ({
    id: c.id,
    name: c.name,
    image: (c as any).image || "",
    icon: (c as any).icon || "",
    link: `/category/${c.id}`,
  }))
);

const isActive = ref(false);
const dropdownContainer = ref<HTMLElement | null>(null);

const toggleDropdown = () => {
  isActive.value = !isActive.value;
};

const keepOpen = (event: MouseEvent) => {
  event.stopPropagation();
  isActive.value = true;
};

const closeDropdown = () => {
  isActive.value = false;
};

const handleBodyClick = (event: MouseEvent) => {
  if (dropdownContainer.value && !dropdownContainer.value.contains(event.target as Node)) {
    closeDropdown();
  }
};

onMounted(() => {
  document.body.addEventListener("click", handleBodyClick);
});

onBeforeUnmount(() => {
  document.body.removeEventListener("click", handleBodyClick);
});
</script>
