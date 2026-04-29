<template>
  <section class="blog-details py-80">
    <div class="container container-lg">
      <div v-if="loading" class="text-center py-80 text-gray-400">加载中...</div>
      <div v-else-if="!post" class="text-center py-80 text-gray-400">文章不存在或已下线</div>

      <div v-else class="row gy-5">
        <div class="col-lg-8 pe-xl-4">
          <article class="blog-item-wrapper">
            <div class="blog-item">
              <img
                v-if="post.cover_image"
                :src="post.cover_image"
                alt="Blog post image"
                class="w-100 rounded-16 mb-8 details-img object-fit-cover"
                style="max-height:400px"
                data-aos="fade-up"
                data-aos-duration="600"
              />

              <div class="blog-item__content mt-24" data-aos="fade-up" data-aos-duration="600">
                <span v-if="post.category" class="bg-main-50 text-main-600 py-4 px-24 rounded-8 mb-16 inline-block">
                  {{ post.category }}
                </span>
                <h4 class="mb-24">{{ post.title }}</h4>

                <!-- 正文内容 -->
                <div
                  class="blog-content text-gray-700 lh-lg"
                  v-html="renderedContent"
                ></div>

                <div class="flex-align flex-wrap gap-24 mt-32 pt-24 border-top border-gray-100">
                  <div class="flex-align gap-8">
                    <span class="text-lg text-main-600"><i class="ph ph-calendar-dots"></i></span>
                    <span class="text-sm text-gray-500">{{ formatDate(post.published_at) }}</span>
                  </div>
                  <div class="flex-align gap-8">
                    <span class="text-lg text-main-600"><i class="ph ph-eye"></i></span>
                    <span class="text-sm text-gray-500">{{ post.views }} 次阅读</span>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <!-- 上下篇 -->
          <nav v-if="prev || next" class="my-48 flex-between flex-sm-nowrap flex-wrap gap-24" data-aos="fade-up">
            <div v-if="prev">
              <p class="mb-8 text-sm text-gray-500">上一篇</p>
              <NuxtLink :to="`/blog/${prev.slug}`" class="text-heading hover-text-main-600 fw-semibold">
                {{ prev.title }}
              </NuxtLink>
            </div>
            <div v-if="next" class="text-end">
              <p class="mb-8 text-sm text-gray-500">下一篇</p>
              <NuxtLink :to="`/blog/${next.slug}`" class="text-heading hover-text-main-600 fw-semibold">
                {{ next.title }}
              </NuxtLink>
            </div>
          </nav>
        </div>

        <div class="col-lg-4 ps-xl-4">
          <SearchBlog />
          <RecentPosts />
          <PopularTags />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SearchBlog from "~/components/widgets/blog/SearchBlog.vue";
import RecentPosts from "~/components/widgets/blog/RecentPosts.vue";
import PopularTags from "~/components/widgets/blog/PopularTags.vue";

interface Post {
  id: number; title: string; slug: string; category: string;
  cover_image: string; excerpt: string; content: string;
  published_at: string; views: number;
}

const route = useRoute();
const loading = ref(true);
const post = ref<Post | null>(null);
const prev = ref<Pick<Post, "title" | "slug"> | null>(null);
const next = ref<Pick<Post, "title" | "slug"> | null>(null);

// 简单换行转 <br>，保留段落
const renderedContent = computed(() => {
  if (!post.value?.content) return "";
  return post.value.content
    .split(/\n{2,}/)
    .map(p => `<p>${p.replace(/\n/g, "<br>")}</p>`)
    .join("");
});

async function load(slug: string) {
  loading.value = true;
  post.value = null;
  try {
    post.value = await $fetch<Post>(`/api/blog/posts/${slug}`);
    // 获取上下篇（用最新列表简单实现）
    const res = await $fetch<{ posts: Post[] }>("/api/blog/posts?page=1&page_size=100");
    const all = res.posts ?? [];
    const idx = all.findIndex(p => p.slug === slug);
    prev.value = idx > 0 ? all[idx - 1] : null;
    next.value = idx >= 0 && idx < all.length - 1 ? all[idx + 1] : null;
  } catch {
    post.value = null;
  } finally {
    loading.value = false;
  }
}

watch(() => route.params.slug, (slug) => { if (slug) load(slug as string); }, { immediate: true });

function formatDate(d: string) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("zh-CN", { year: "numeric", month: "long", day: "numeric" });
}
</script>

<style scoped>
.blog-content :deep(p) { margin-bottom: 1.25rem; }
.blog-content :deep(h1), .blog-content :deep(h2), .blog-content :deep(h3) { margin: 1.5rem 0 0.75rem; }
.blog-content :deep(ul), .blog-content :deep(ol) { padding-left: 1.5rem; margin-bottom: 1.25rem; }
.blog-content :deep(img) { max-width: 100%; border-radius: 8px; margin: 1rem 0; }
</style>
