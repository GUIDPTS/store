<template>
  <div class="blog-item-wrapper">
    <div
      v-for="post in posts"
      :key="post.id"
      class="blog-item"
      data-aos="fade-up"
      data-aos-duration="800"
    >
      <NuxtLink :to="`/blog/${post.slug}`" class="w-100 h-100 rounded-16 overflow-hidden">
        <NuxtImg
          :src="post.image"
          alt="Blog post thumbnail"
          class="cover-img"
          format="webp"
          loading="lazy"
          placeholder
        />
      </NuxtLink>

      <div class="blog-item__content mt-24">
        <span class="bg-main-50 text-main-600 py-4 px-24 rounded-8 mb-16 inline-block">
          {{ post.category }}
        </span>

        <h6 class="text-2xl mb-24">
          <NuxtLink :to="`/blog/${post.slug}`">
            {{ post.title }}
          </NuxtLink>
        </h6>

        <p class="text-gray-700 text-line-2">
          {{ post.excerpt }}
        </p>

        <div class="flex-align flex-wrap gap-24 pt-24 mt-24 border-top border-gray-100">
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

          <div class="flex-align flex-wrap gap-8">
            <span class="text-lg text-main-600">
              <i class="ph ph-chats-circle"></i>
            </span>
            <span class="text-sm text-gray-500">
              <NuxtLink :to="`/blog/${post.slug}`" class="text-gray-500 hover-text-main-600">
                {{ post.comments }} Comments
              </NuxtLink>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { blogPosts } from "~/data/blog-data";

const posts = blogPosts;
</script>
