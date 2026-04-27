import { ref, onMounted, onUnmounted } from "vue";

export function useWindowWidth() {
  const windowWidth = ref(0);

  const updateWindowWidth = () => {
    windowWidth.value = window.innerWidth;
  };

  onMounted(() => {
    updateWindowWidth();
    window.addEventListener("resize", updateWindowWidth);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", updateWindowWidth);
  });

  return {
    windowWidth,
  };
}
