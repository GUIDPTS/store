<template>
  <div class="blog-sidebar border border-gray-100 rounded-8 p-32 mb-40" data-aos="fade-up" data-aos-duration="800">
    <h6 class="text-xl mb-32 pb-32 border-bottom border-gray-100">最新文章</h6>
    <div v-if="!posts.length" class="text-sm text-gray-400">暂无文章</div>
    <div v-for="post in posts" :key="post.id" class="d-flex align-items-center flex-sm-nowrap flex-wrap gap-16 mb-16">
      <NuxtLink :to="`/blog/${post.slug}`" class="rounded-8 overflow-hidden flex-shrink-0 d-block bg-main-50" style="width:72px;height:72px">
        <img v-if="post.cover_image" :src="post.cover_image" :alt="post.title" class="w-100 h-100 object-fit-cover" />
        <div v-else class="w-100 h-100 flex-center"><i class="ph ph-article text-xl text-main-300"></i></div>
      </NuxtLink>
      <div class="flex-grow-1">
        <h6 class="text-sm mb-4">
          <NuxtLink :to="`/blog/${post.slug}`" class="text-heading hover-text-main-600 text-line-2">{{ post.title }}</NuxtLink>
        </h6>
        <span class="text-xs text-gray-400">{{ formatDate(post.published_at) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Post { id: number; title: string; slug: string; cover_image: string; published_at: string }

const posts = ref<Post[]>([]);

onMounted(async () => {
  try {
    const res = await $fetch<Post[]>("/api/blog/recent?n=5");
    posts.value = Array.isArray(res) ? res : [];
  } catch { posts.value = []; }
});

function formatDate(d: string) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("zh-CN", { month: "short", day: "numeric" });
}
</script>
