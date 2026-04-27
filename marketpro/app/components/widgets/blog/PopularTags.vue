<template>
  <div
    class="blog-sidebar border border-gray-100 rounded-8 p-32 mb-40"
    data-aos="fade-up"
    data-aos-duration="800"
  >
    <h6 class="text-xl mb-32 pb-32 border-bottom border-gray-100">Recent Posts</h6>
    <ul>
      <li v-for="category in categories" :key="category.id" class="mb-16 last:mb-0">
        <NuxtLink
          :to="`/${category.slug}`"
          class="flex-between gap-8 text-gray-700 border border-gray-100 rounded-4 p-4 ps-16 hover-border-main-600 hover-text-main-600"
        >
          <span>{{ category.name }} ({{ category.count.toString().padStart(2, "0") }})</span>
          <span class="w-40 h-40 flex-center rounded-4 bg-main-50 text-main-600">
            <i class="ph ph-arrow-right"></i>
          </span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { blogCategories } from "~/data/blog-categories";

const categories = blogCategories;
</script>
