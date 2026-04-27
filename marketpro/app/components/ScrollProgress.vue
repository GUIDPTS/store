<template>
  <div
    class="progress-wrap"
    :class="{
      'active-progress': isActive,
    }"
    role="button"
    aria-label="Scroll to top"
    tabindex="0"
    @click="scrollToTop"
    @keydown.enter.space="scrollToTop"
  >
    <svg
      class="progress-circle svg-content"
      width="100%"
      height="100%"
      viewBox="-1 -1 102 102"
      aria-hidden="true"
      focusable="false"
    >
      <path
        ref="progressPath"
        d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
        stroke-linecap="round"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const progressPath = ref<SVGPathElement | null>(null);
const pathLength = ref(0);
const isActive = ref(false);

function updateProgress() {
  if (!progressPath.value) return;

  const scroll = window.scrollY || window.pageYOffset;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const progress = pathLength.value - (scroll * pathLength.value) / height;
  progressPath.value.style.strokeDashoffset = progress.toString();

  isActive.value = scroll > 50;
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

onMounted(() => {
  if (!progressPath.value) return;
  pathLength.value = progressPath.value.getTotalLength();
  progressPath.value.style.strokeDasharray = `${pathLength.value} ${pathLength.value}`;
  progressPath.value.style.strokeDashoffset = `${pathLength.value}`;
  progressPath.value.style.transition = "stroke-dashoffset 10ms linear";

  updateProgress();

  window.addEventListener("scroll", updateProgress, {
    passive: true,
  });
});

onUnmounted(() => {
  window.removeEventListener("scroll", updateProgress);
});
</script>
