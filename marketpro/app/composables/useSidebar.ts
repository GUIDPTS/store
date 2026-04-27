import { ref } from "vue";

const isSidebarActive = ref(false);
const isOverlayVisible = ref(false);

export function useSidebar() {
  function openSidebar() {
    isSidebarActive.value = true;
    isOverlayVisible.value = true;
    document.body.classList.add("scroll-hide-sm");
  }

  function closeSidebar() {
    isSidebarActive.value = false;
    isOverlayVisible.value = false;
    document.body.classList.remove("scroll-hide-sm");
  }

  function toggleSidebar() {
    isSidebarActive.value = !isSidebarActive.value;
    isOverlayVisible.value = isSidebarActive.value;
    document.body.classList.toggle("scroll-hide-sm", isSidebarActive.value);
  }

  return {
    isSidebarActive,
    isOverlayVisible,
    openSidebar,
    closeSidebar,
    toggleSidebar,
  };
}
