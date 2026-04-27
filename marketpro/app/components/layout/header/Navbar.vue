<template>
  <div class="header-menu d-lg-block d-none">
    <ul class="nav-menu flex-align">
      <li
        v-for="(item, index) in menu"
        :key="index"
        class="on-hover-item nav-menu__item"
        :class="{
          'has-submenu': item.submenu,
          activePage: isActiveParent(item),
        }"
      >
        <span
          v-if="item.badge"
          class="badge-notification text-white text-sm py-2 px-8 rounded-4"
          :class="item.badge.class"
        >
          {{ item.badge.text }}
        </span>

        <button
          v-if="item.submenu"
          class="nav-menu__link text-heading-two"
          :class="{ activePage: isActiveParent(item) }"
        >
          {{ item.label }}
        </button>

        <NuxtLink
          v-else
          :to="item.to"
          class="nav-menu__link text-heading-two"
          :class="{ activePage: isActive(item.to) }"
        >
          {{ item.label }}
        </NuxtLink>

        <ul v-if="item.submenu" class="on-hover-dropdown common-dropdown nav-submenu scroll-sm">
          <li
            v-for="(subItem, subIndex) in item.submenu"
            :key="subIndex"
            class="common-dropdown__item nav-submenu__item"
            :class="{ activePage: isActive(subItem.to || subItem.href) }"
          >
            <NuxtLink
              v-if="subItem.to"
              :to="subItem.to"
              class="common-dropdown__link nav-submenu__link text-heading-two hover-bg-neutral-100"
              :class="{ activePage: isActive(subItem.to) }"
            >
              {{ subItem.label }}
            </NuxtLink>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { MenuItem } from "~/composables/useActiveRoute";
import { useActiveRoute } from "~/composables/useActiveRoute";
import navbarMenu from "~/data/navbar";

const menu: MenuItem[] = navbarMenu;
const { isActive, isActiveParent } = useActiveRoute();
</script>
