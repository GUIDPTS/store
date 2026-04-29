<template>
  <div
    class="blog-sidebar border border-gray-100 rounded-8 p-32 mb-40"
    data-aos="fade-up"
    data-aos-duration="800"
  >
    <h6 class="text-xl mb-32 pb-32 border-bottom border-gray-100">搜索文章</h6>
    <form novalidate @submit.prevent="handleSubmit">
      <div class="input-group">
        <input
          v-model.trim="searchQuery"
          type="text"
          class="form-control common-input bg-color-three"
          placeholder="输入关键词..."
          :aria-invalid="!!error"
          :aria-describedby="error ? 'search-error' : undefined"
        />
        <button
          type="submit"
          class="btn btn-main text-2xl h-56 w-56 flex-center input-group-text"
          aria-label="Search"
        >
          <i class="ph ph-magnifying-glass"></i>
        </button>
      </div>
      <p v-if="error" id="search-error" class="text-danger mt-2" role="alert">
        {{ error }}
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const searchQuery = ref("");
const error = ref<string | null>(null);

function validateSearch(query: string): boolean {
  if (!query || query.length < 2) {
    error.value = "Please enter a keyword.";
    return false;
  }
  error.value = null;
  return true;
}

const router = useRouter();

function handleSubmit() {
  if (validateSearch(searchQuery.value)) {
    router.push({ path: "/blog", query: { q: searchQuery.value } });
  }
}
</script>
