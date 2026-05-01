<template>
  <div :class="['mobile-menu', 'scroll-sm', 'd-lg-none', 'd-block', { active: modelValue }]">
    <button type="button" class="close-button" aria-label="Close menu" @click="closeMenu">
      <i class="ph ph-x"></i>
    </button>

    <div class="mobile-menu__inner">
      <NuxtLink to="/" class="mobile-menu__logo">
        <img :src="site.settings.site_logo || '/images/logo/logo.png'" :alt="site.settings.site_name || 'Logo'" style="max-height:40px;object-fit:contain" />
      </NuxtLink>

      <nav class="mobile-menu__menu" aria-label="Primary mobile navigation">
        <ul class="nav-menu flex-align nav-menu--mobile">
          <li
            v-for="(item, index) in menu"
            :key="index"
            :class="[
              'on-hover-item',
              'nav-menu__item',
              item.submenu ? 'has-submenu' : '',
              isActiveParent(item) ? 'activePage' : '',
            ]"
          >
            <template v-if="item.badge">
              <span
                class="badge-notification text-white text-sm py-2 px-8 rounded-4"
                :class="item.badge.class"
              >
                {{ item.badge.text }}
              </span>
            </template>

            <button
              v-if="item.submenu"
              class="nav-menu__link text-heading-two"
              type="button"
              :aria-expanded="activeSubmenuIndex === index"
              :aria-controls="'submenu-' + index"
              @click="toggleSubmenu(index)"
            >
              {{ item.label }}
            </button>

            <component
              :is="item.to ? NuxtLink : 'a'"
              v-else
              :to="item.to"
              :href="item.href"
              class="nav-menu__link text-heading-two"
            >
              {{ item.label }}
            </component>

            <ul
              v-if="item.submenu"
              :id="'submenu-' + index"
              class="on-hover-dropdown common-dropdown nav-submenu scroll-sm"
              :style="{ display: activeSubmenuIndex === index ? 'block' : 'none' }"
            >
              <li
                v-for="(subItem, subIndex) in item.submenu"
                :key="subIndex"
                class="common-dropdown__item nav-submenu__item"
                :class="isActive(subItem.to || subItem.href) ? 'activePage' : ''"
              >
                <component
                  :is="subItem.to ? NuxtLink : 'a'"
                  :to="subItem.to"
                  :href="subItem.href"
                  class="common-dropdown__link nav-submenu__link text-heading-two hover-bg-neutral-100"
                >
                  {{ subItem.label }}
                </component>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  </div>

  <div
    class="side-overlay"
    :class="{ show: isOverlayVisible }"
    aria-hidden="true"
    @click="closeMenu"
  ></div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { NuxtLink, NuxtImg } from "#components";
import { useSiteStore } from "~/stores/site";
import navbarMenu from "~/data/navbar";

const site = useSiteStore();
site.ensureLoaded();
import type { MenuItem } from "~/composables/useActiveRoute";
import { useActiveRoute } from "~/composables/useActiveRoute";
import { useWindowWidth } from "~/composables/useWindowWidth";

const props = defineProps({
  modelValue: Boolean,
});
const emit = defineEmits(["update:modelValue"]);

const activeSubmenuIndex = ref<number | null>(null);
const isOverlayVisible = ref(false);

const menu = ref<MenuItem[]>(navbarMenu);
const { isActive, isActiveParent } = useActiveRoute();
const { windowWidth } = useWindowWidth();
const route = useRoute();

const closeMenu = () => {
  emit("update:modelValue", false);
  activeSubmenuIndex.value = null;
  isOverlayVisible.value = false;

  if (import.meta.client) {
    document.body.classList.remove("scroll-hide-sm");
  }
};

const toggleSubmenu = (index: number) => {
  if (windowWidth.value < 992) {
    activeSubmenuIndex.value = activeSubmenuIndex.value === index ? null : index;
  }
};

watch(
  () => props.modelValue,
  val => {
    if (import.meta.client) {
      const body = document.body;
      if (val) {
        body.classList.add("scroll-hide-sm");
        isOverlayVisible.value = true;
      } else {
        body.classList.remove("scroll-hide-sm");
        isOverlayVisible.value = false;
        activeSubmenuIndex.value = null;
      }
    }
  },
  { immediate: true }
);

watch(
  () => route.fullPath,
  () => {
    closeMenu();
  }
);
</script>
