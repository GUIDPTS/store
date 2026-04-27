<template>
  <div
    v-if="show"
    class="preloader"
    :class="{
      'preloader--fadeout': isFadingOut,
    }"
    role="status"
    aria-live="polite"
    aria-label="Loading content"
  >
    <img
      v-if="mounted"
      :src="gifSrc"
      alt="Loading animation"
      decoding="async"
      loading="eager"
      width="100"
      height="100"
      class="preloader__image"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

const show = ref(true);
const isFadingOut = ref(false);
const mounted = ref(false);

const gifSrc = ref("");

const FADEOUT_DURATION = 500;
let hideTimeout: ReturnType<typeof setTimeout> | null = null;

function startHide() {
  isFadingOut.value = true;
  hideTimeout = setTimeout(() => {
    show.value = false;
  }, FADEOUT_DURATION);
}

function hide() {
  setTimeout(() => {
    startHide();
  }, 1500);
}

onMounted(() => {
  mounted.value = true;
  gifSrc.value = `/preloader.gif?reload=${Date.now()}`;

  if (document.readyState === "complete") {
    hide();
  } else {
    window.addEventListener("load", hide, {
      once: true,
    });
  }
});

onBeforeUnmount(() => {
  if (hideTimeout) clearTimeout(hideTimeout);
  window.removeEventListener("load", hide);
});
</script>
