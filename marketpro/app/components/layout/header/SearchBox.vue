<template>
  <form
    v-show="isActive"
    action="#"
    class="search-box"
    :class="{ active: isActive }"
    role="search"
    aria-modal="true"
    @submit="onSubmit"
  >
    <button
      type="button"
      class="search-box__close position-absolute inset-block-start-0 inset-inline-end-0 m-16 w-48 h-48 border border-gray-100 rounded-circle flex-center text-white hover-text-gray-800 hover-bg-white text-2xl transition-1"
      aria-label="Close search"
      @click="close"
    >
      <i class="ph ph-x"></i>
    </button>

    <div class="container">
      <div class="position-relative">
        <input
          id="search-input"
          v-model="searchQuery"
          type="text"
          class="form-control py-16 px-24 text-xl rounded-pill pe-64"
          placeholder="Search for a product or brand"
          :aria-invalid="hasError ? 'true' : 'false'"
          aria-describedby="search-error"
          autocomplete="off"
        />
        <button
          type="submit"
          class="w-48 h-48 bg-main-600 rounded-circle flex-center text-xl text-white position-absolute top-50 translate-middle-y inset-inline-end-0 me-8"
          aria-label="Submit search"
        >
          <i class="ph ph-magnifying-glass"></i>
        </button>
      </div>
      <p
        v-if="hasError"
        id="search-error"
        class="mt-8 text-sm text-red-600 text-center"
        role="alert"
      >
        Please enter a keyword.
      </p>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from "vue";

const isActive = ref(false);
const searchQuery = ref("");

const isValid = computed(() => searchQuery.value.trim().length >= 3);
const hasError = ref(false);

function open() {
  isActive.value = true;
  hasError.value = false;
  nextTick(() => {
    const input = document.getElementById("search-input");
    input?.focus();
  });
}

function close() {
  isActive.value = false;
  searchQuery.value = "";
  hasError.value = false;
}

function onSubmit(e: Event) {
  e.preventDefault();
  if (!isValid.value) {
    hasError.value = true;
    return;
  }
  alert(`Searching for: ${searchQuery.value}`);
  close();
}

defineExpose({ open });
</script>
