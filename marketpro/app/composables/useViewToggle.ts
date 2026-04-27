import { ref } from "vue";

const isListView = ref(false);

export function useViewToggle() {
  function toggleListView() {
    isListView.value = true;
  }

  function toggleGridView() {
    isListView.value = false;
  }

  return {
    isListView,
    toggleListView,
    toggleGridView,
  };
}
