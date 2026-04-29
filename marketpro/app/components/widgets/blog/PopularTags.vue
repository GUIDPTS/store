<template>
  <div class="blog-sidebar border border-gray-100 rounded-8 p-32 mb-40" data-aos="fade-up" data-aos-duration="800">
    <h6 class="text-xl mb-32 pb-32 border-bottom border-gray-100">文章分类</h6>
    <div v-if="!categories.length" class="text-sm text-gray-400">暂无分类</div>
    <ul>
      <li v-for="cat in categories" :key="cat.name" class="mb-16 last:mb-0">
        <NuxtLink
          :to="{ path: '/blog', query: { category: cat.name } }"
          class="flex-between gap-8 text-gray-700 border border-gray-100 rounded-4 p-4 ps-16 hover-border-main-600 hover-text-main-600"
        >
          <span>{{ cat.name }} ({{ String(cat.count).padStart(2, "0") }})</span>
          <span class="w-40 h-40 flex-center rounded-4 bg-main-50 text-main-600">
            <i class="ph ph-arrow-right"></i>
          </span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
interface Cat { name: string; count: number }
const categories = ref<Cat[]>([]);

onMounted(async () => {
  try {
    const res = await $fetch<Cat[]>("/api/blog/categories");
    categories.value = Array.isArray(res) ? res : [];
  } catch { categories.value = []; }
});
</script>
