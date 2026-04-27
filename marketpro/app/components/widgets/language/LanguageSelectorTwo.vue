<template>
  <li
    class="on-hover-item border-right-item border-right-item-sm-space has-submenu arrow-white d-none d-sm-block"
  >
    <button
      type="button"
      class="selected-text selected-text text-neutral-500 fw-semibold text-sm py-8 text-sm py-8"
      aria-haspopup="listbox"
      aria-expanded="false"
    >
      {{ selectedLanguage }}
    </button>

    <ul
      class="selectable-text-list select-custom on-hover-dropdown common-dropdown common-dropdown--sm max-h-200 scroll-sm px-0 py-8"
      role="listbox"
      tabindex="-1"
    >
      <li
        v-for="lang in languages"
        :key="lang.text"
        class="hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0 cursor-pointer"
        role="option"
        :aria-selected="lang.text === selectedLanguage"
        @click.prevent="selectLanguage(lang.text)"
      >
        <span class="flex-align gap-8" tabindex="-1">
          <NuxtImg
            :src="lang.flag"
            :alt="`Flag of ${lang.text}`"
            class="w-16 h-12 rounded-4 border border-gray-100"
          />
          {{ lang.text }}
        </span>
      </li>
    </ul>
  </li>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { languages } from "~/data/languages";

const selectedLanguage = ref("English");

function selectLanguage(text: string) {
  selectedLanguage.value = text.trim();
}
</script>
