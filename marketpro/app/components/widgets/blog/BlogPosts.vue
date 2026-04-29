<template>
  <div class="blog-item-wrapper">
    <div
      v-for="post in posts"
      :key="post.id"
      class="blog-item"
      data-aos="fade-up"
      data-aos-duration="800"
    >
      <NuxtLink :to="`/blog/${post.slug}`" class="w-100 h-100 rounded-16 overflow-hidden d-block">
        <img
          v-if="post.cover_image"
          :src="post.cover_image"
          alt="Blog post thumbnail"
          class="cover-img w-100 rounded-16 object-fit-cover"
          style="height:280px"
        />
        <div v-else class="rounded-16 bg-main-50 flex-center" style="height:280px">
          <i class="ph ph-article text-64 text-main-200"></i>
        </div>
      </NuxtLink>

      <div class="blog-item__content mt-24">
        <span v-if="post.category" class="bg-main-50 text-main-600 py-4 px-24 rounded-8 mb-16 inline-block">
          {{ post.category }}
        </span>

        <h6 class="text-2xl mb-24">
          <NuxtLink :to="`/blog/${post.slug}`">{{ post.title }}</NuxtLink>
        </h6>

        <p class="text-gray-700 text-line-2">{{ post.excerpt }}</p>

        <div class="flex-align flex-wrap gap-24 pt-24 mt-24 border-top border-gray-100">
          <div class="flex-align flex-wrap gap-8">
            <span class="text-lg text-main-600"><i class="ph ph-calendar-dots"></i></span>
            <span class="text-sm text-gray-500">{{ formatDate(post.published_at) }}</span>
          </div>
          <div class="flex-align flex-wrap gap-8">
            <span class="text-lg text-main-600"><i class="ph ph-eye"></i></span>
            <span class="text-sm text-gray-500">{{ post.views ?? 0 }} 次阅读</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Post {
  id: number; title: string; slug: string; category: string;
  cover_image: string; excerpt: string; published_at: string; views: number;
}

defineProps<{ posts: Post[] }>();

function formatDate(d: string) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("zh-CN", { year: "numeric", month: "long", day: "numeric" });
}
</script>
