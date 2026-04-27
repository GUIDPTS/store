<template>
  <li class="on-hover-item border-right-item border-right-item-sm-space has-submenu arrow-white">
    <button
      type="button"
      class="selected-text selected-text text-neutral-500 fw-semibold text-sm py-8 text-sm py-8"
      aria-haspopup="listbox"
      aria-expanded="false"
    >
      {{ selectedCurrency }}
    </button>

    <ul
      class="selectable-text-list on-hover-dropdown common-dropdown common-dropdown--sm max-h-200 scroll-sm px-0 py-8"
      role="listbox"
      tabindex="-1"
    >
      <li
        v-for="cur in currencies"
        :key="cur.text"
        class="hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0 cursor-pointer"
        role="option"
        :aria-selected="cur.text === selectedCurrency"
        @click.prevent="selectCurrency(cur.text)"
      >
        <span class="flex-align gap-8" tabindex="-1">
          <NuxtImg :src="cur.flag" alt="Image" class="w-16 h-12 rounded-4 border border-gray-100" />
          {{ cur.text }}
        </span>
      </li>
    </ul>
  </li>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { currencies } from "~/data/currencies";

const selectedCurrency = ref("USD");

function selectCurrency(text: string) {
  selectedCurrency.value = text.trim();
}
</script>
