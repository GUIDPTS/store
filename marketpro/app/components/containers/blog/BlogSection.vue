<template>
  <section class="blog py-80">
    <div class="container container-lg">
      <div class="row gy-5">
        <div class="col-lg-8 pe-xl-4">
          <div v-if="loading" class="text-center py-48 text-gray-400">加载中...</div>
          <div v-else-if="!posts.length" class="text-center py-48 text-gray-400">
            <i class="ph ph-article text-48 d-block mb-12"></i>暂无文章
          </div>
          <template v-else>
            <BlogPosts :posts="posts" />
            <BlogPagination :page="page" :total-pages="totalPages" @change="onPageChange" />
          </template>
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
import BlogPosts from "~/components/widgets/blog/BlogPosts.vue";
import BlogPagination from "~/components/widgets/blog/Pagination.vue";
import SearchBlog from "~/components/widgets/blog/SearchBlog.vue";
import RecentPosts from "~/components/widgets/blog/RecentPosts.vue";
import PopularTags from "~/components/widgets/blog/PopularTags.vue";

const route = useRoute();
const router = useRouter();

interface Post {
  id: number; title: string; slug: string; category: string;
  cover_image: string; excerpt: string; published_at: string; views: number;
}

const loading = ref(true);
const posts = ref<Post[]>([]);
const total = ref(0);
const pageSize = 6;

const page = computed(() => Number(route.query.page) || 1);
const totalPages = computed(() => Math.ceil(total.value / pageSize));

async function fetchPosts() {
  loading.value = true;
  try {
    const res = await $fetch<{ posts: Post[]; total: number }>("/api/blog/posts", {
      query: { page: page.value, page_size: pageSize, category: route.query.category, q: route.query.q },
    });
    posts.value = res.posts ?? [];
    total.value = res.total ?? 0;
  } catch { posts.value = []; }
  finally { loading.value = false; }
}

function onPageChange(p: number) {
  router.push({ query: { ...route.query, page: p } });
}

watch(() => route.query, fetchPosts, { immediate: true });
</script>
