import { onMounted, onUnmounted } from "vue";

export function useFixedHeader() {
  let header: HTMLElement | null = null;

  const onScroll = () => {
    if (!header) return;

    if (window.scrollY >= 260) {
      header.classList.add("fixed-header");
    } else {
      header.classList.remove("fixed-header");
    }
  };

  onMounted(() => {
    if (typeof window === "undefined") return;

    header = document.querySelector<HTMLElement>(".header");
    if (!header) return;

    window.addEventListener("scroll", onScroll, { passive: true });
  });

  onUnmounted(() => {
    if (typeof window === "undefined") return;
    window.removeEventListener("scroll", onScroll);
  });
}
