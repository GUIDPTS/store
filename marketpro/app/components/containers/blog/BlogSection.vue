<template>
  <section class="blog py-80">
    <div class="container container-lg">
      <div class="row gy-5">
        <div class="col-lg-8 pe-xl-4">
          <BlogPosts />
          <Pagination />
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
import Pagination from "~/components/widgets/blog/Pagination.vue";
import SearchBlog from "~/components/widgets/blog/SearchBlog.vue";
import RecentPosts from "~/components/widgets/blog/RecentPosts.vue";
import PopularTags from "~/components/widgets/blog/PopularTags.vue";
</script>
