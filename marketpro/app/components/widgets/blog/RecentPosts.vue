<template>
  <div
    class="blog-sidebar border border-gray-100 rounded-8 p-32 mb-40"
    data-aos="fade-up"
    data-aos-duration="800"
  >
    <h6 class="text-xl mb-32 pb-32 border-bottom border-gray-100">Recent Posts</h6>

    <div
      v-for="post in posts"
      :key="post.id"
      class="d-flex align-items-center flex-sm-nowrap flex-wrap gap-24 mb-16"
    >
      <NuxtLink
        :to="`/blog/${post.slug}`"
        class="w-100 h-100 rounded-4 overflow-hidden w-120 h-120 flex-shrink-0"
      >
        <NuxtImg :src="post.image" :alt="post.title" class="cover-img" />
      </NuxtLink>

      <div class="flex-grow-1">
        <h6 class="text-lg">
          <NuxtLink :to="`/blog/${post.slug}`" class="text-line-3">
            {{ post.title }}
          </NuxtLink>
        </h6>
        <div class="flex-align flex-wrap gap-8">
          <span class="text-lg text-main-600">
            <i class="ph ph-calendar-dots"></i>
          </span>
          <span class="text-sm text-gray-500">
            <NuxtLink :to="`/blog/${post.slug}`" class="text-gray-500 hover-text-main-600">
              {{ post.date }}
            </NuxtLink>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { recentPosts } from "~/data/recent-post";

const posts = recentPosts;
</script>
