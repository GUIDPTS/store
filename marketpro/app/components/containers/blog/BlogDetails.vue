<template>
  <section class="blog-details py-80">
    <div class="container container-lg">
      <div class="row gy-5">
        <div class="col-lg-8 pe-xl-4">
          <article class="blog-item-wrapper">
            <div class="blog-item">
              <NuxtImg
                v-if="post"
                :src="post.image"
                alt="Blog post image"
                class="mb-8 rounded-lg details-img"
                format="webp"
                loading="lazy"
                placeholder
                data-aos="fade-up"
                data-aos-duration="600"
              />
              <div class="blog-item__content mt-24" data-aos="fade-up" data-aos-duration="600">
                <span class="bg-main-50 text-main-600 py-4 px-24 rounded-8 mb-16">Gadget</span>
                <h4 class="mb-24">{{ post?.title }}</h4>
                <p class="text-gray-700 mb-24">
                  A great commerce experience cannot be distilled to a single number. A great
                  commerce experience. It's not a Lighthouse score, or a set of Core Web Vitals
                  figures, although both are important inputs. A great commerce experience is a
                  trilemma that carefully balances competing needs of delivering great customer
                  experience, dynamic storefront capabilities, and long-term business — conversion,
                  retention, re-engagement — objectives. As developers, we rightfully obsess about
                  the customer experience, relentlessly working to squeeze every millisecond out of
                  the critical rendering path, optimize input latency, and eliminate jank. At the
                  limit, statically generated, edge delivered, and HTML-first pages look like the
                  optimal strategy. That is until you are confronted with the realization that the
                  next step function in improving conversion rates and business.
                </p>
                <p class="text-gray-700 pb-24 mb-24 border-bottom border-gray-100">
                  Re-engagement — objectives. As developers, we rightfully obsess about the customer
                  experience, relentlessly working to squeeze every millisecond out of the critical
                  rendering path, optimize input latency, and eliminate...
                </p>

                <div class="flex-align flex-wrap gap-24" role="group" aria-label="Post metadata">
                  <div class="flex-align flex-wrap gap-8">
                    <span class="text-lg text-main-600" aria-hidden="true">
                      <i class="ph ph-calendar-dots"></i>
                    </span>
                    <span class="text-sm text-gray-500">
                      <NuxtLink
                        to="/blog/legal-structure-profit-business"
                        class="text-gray-500 hover-text-main-600"
                        aria-label="Post date"
                        >July 12, 2025</NuxtLink
                      >
                    </span>
                  </div>
                  <div class="flex-align flex-wrap gap-8">
                    <span class="text-lg text-main-600" aria-hidden="true">
                      <i class="ph ph-chats-circle"></i>
                    </span>
                    <span class="text-sm text-gray-500">
                      <NuxtLink
                        to="/blog/legal-structure-profit-business"
                        class="text-gray-500 hover-text-main-600"
                        aria-label="Comments count"
                        >0 Comments</NuxtLink
                      >
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <div class="mt-48" data-aos="fade-up" data-aos-duration="600">
            <div class="row gy-4">
              <div class="col-sm-6 col-xs-6">
                <img
                  src="/images/thumbs/blog-details-img1.png"
                  alt="Blog related image 1"
                  class="rounded-16"
                />
              </div>
              <div class="col-sm-6 col-xs-6">
                <img
                  src="/images/thumbs/blog-details-img2.png"
                  alt="Blog related image 2"
                  class="rounded-16"
                />
              </div>
            </div>
          </div>

          <div class="mt-48" data-aos="fade-up" data-aos-duration="600">
            <p class="text-gray-700 mb-24">
              A great commerce experience cannot be distilled to a single number. A great commerce
              experience. It's not a Lighthouse score, or a set of Core Web Vitals figures, although
              both are important inputs. A great commerce experience is a trilemma that carefully
              balances competing needs of delivering great customer experience, dynamic storefront
              capabilities, and long-term business.
            </p>
          </div>

          <div
            class="mt-48"
            aria-labelledby="market-segments-title"
            data-aos="fade-up"
            data-aos-duration="600"
          >
            <h6 id="market-segments-title" class="mb-32">
              The following are the four main market segments in which e-commerce is present. These
              are the following:
            </h6>
            <div class="row gy-4">
              <div class="col-sm-6">
                <ul>
                  <li class="d-flex align-items-start gap-8 mb-20">
                    <span class="text-xl d-flex flex-shrink-0" aria-hidden="true">
                      <i class="ph ph-check"></i>
                    </span>
                    <span class="text-gray-700 flex-grow-1">
                      A great commerce experience cannot be distilled to a single number. A great
                      commerce experience.
                    </span>
                  </li>
                  <li class="d-flex align-items-start gap-8 mb-20">
                    <span class="text-xl d-flex flex-shrink-0" aria-hidden="true">
                      <i class="ph ph-check"></i>
                    </span>
                    <span class="text-gray-700 flex-grow-1">
                      A great commerce experience cannot be distilled to a single number. A great
                      commerce experience.
                    </span>
                  </li>
                  <li class="d-flex align-items-start gap-8 mb-0">
                    <span class="text-xl d-flex flex-shrink-0" aria-hidden="true">
                      <i class="ph ph-check"></i>
                    </span>
                    <span class="text-gray-700 flex-grow-1">
                      A great commerce experience cannot be distilled to a single number. A great
                      commerce experience.
                    </span>
                  </li>
                </ul>
              </div>
              <div class="col-sm-6">
                <ul>
                  <li class="d-flex align-items-start gap-8 mb-20">
                    <span class="text-xl d-flex flex-shrink-0" aria-hidden="true">
                      <i class="ph ph-check"></i>
                    </span>
                    <span class="text-gray-700 flex-grow-1">
                      A great commerce experience cannot be distilled to a single number. A great
                      commerce experience.
                    </span>
                  </li>
                  <li class="d-flex align-items-start gap-8 mb-20">
                    <span class="text-xl d-flex flex-shrink-0" aria-hidden="true">
                      <i class="ph ph-check"></i>
                    </span>
                    <span class="text-gray-700 flex-grow-1">
                      A great commerce experience cannot be distilled to a single number. A great
                      commerce experience.
                    </span>
                  </li>
                  <li class="d-flex align-items-start gap-8 mb-0">
                    <span class="text-xl d-flex flex-shrink-0" aria-hidden="true">
                      <i class="ph ph-check"></i>
                    </span>
                    <span class="text-gray-700 flex-grow-1">
                      A great commerce experience cannot be distilled to a single number. A great
                      commerce experience.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <blockquote
            class="mt-48 rounded-16 bg-main-50 p-24"
            aria-label="Quote about commerce experience"
            data-aos="fade-up"
            data-aos-duration="600"
          >
            <span
              class="w-48 h-48 bg-main-600 text-white flex-center rounded-circle mb-24 text-2xl"
              aria-hidden="true"
            >
              <i class="ph ph-quotes"></i>
            </span>
            <p class="text-gray-700 mb-24">
              A great commerce experience cannot be distilled to a single number. A great commerce
              experience. It's not a Lighthouse score, or a set of Core Web Vitals figures, although
              both are important inputs. A great commerce experience is a trilemma that carefully
              balances competing needs of delivering great customer experience, dynamic storefront
              capabilities, and long-term business.
            </p>
            <div class="flex-align gap-8" role="img" aria-label="Star rating">
              <span class="text-15 fw-medium text-neutral-600 d-flex"
                ><i class="ph-fill ph-star"></i
              ></span>
              <span class="text-15 fw-medium text-neutral-600 d-flex"
                ><i class="ph-fill ph-star"></i
              ></span>
              <span class="text-15 fw-medium text-neutral-600 d-flex"
                ><i class="ph-fill ph-star"></i
              ></span>
              <span class="text-15 fw-medium text-neutral-600 d-flex"
                ><i class="ph-fill ph-star"></i
              ></span>
              <span class="text-15 fw-medium text-neutral-600 d-flex"
                ><i class="ph-fill ph-star"></i
              ></span>
            </div>
          </blockquote>

          <div
            class="mt-48 flex-align gap-8"
            aria-label="Tags"
            data-aos="fade-up"
            data-aos-duration="600"
          >
            <h6 class="mb-0">Tag:</h6>
            <NuxtLink
              to="/blog"
              class="border border-gray-100 rounded-4 py-6 px-8 hover-bg-gray-100 text-gray-900"
              >Mobile</NuxtLink
            >
            <NuxtLink
              to="/blog"
              class="border border-gray-100 rounded-4 py-6 px-8 hover-bg-gray-100 text-gray-900"
              >Laptop</NuxtLink
            >
            <NuxtLink
              to="/blog"
              class="border border-gray-100 rounded-4 py-6 px-8 hover-bg-gray-100 text-gray-900"
              >Gadget</NuxtLink
            >
          </div>

          <div class="my-48">
            <span class="border-bottom border-gray-100 d-block"></span>
          </div>

          <nav
            class="my-48 flex-between flex-sm-nowrap flex-wrap gap-24"
            aria-label="Post navigation"
            data-aos="fade-up"
            data-aos-duration="600"
          >
            <div>
              <button
                type="button"
                class="mb-20 h6 text-gray-500 text-lg fw-normal hover-text-main-600"
              >
                Previous Post
              </button>
              <h6 class="text-lg mb-0">
                <NuxtLink to="/blog/legal-structure-profit-business">
                  A great commerce experience cannot be distilled to a single number. A great
                  commerce experience.
                </NuxtLink>
              </h6>
            </div>
            <div class="text-end">
              <button
                type="button"
                class="mb-20 h6 text-gray-500 text-lg fw-normal hover-text-main-600"
              >
                Next
              </button>
              <h6 class="text-lg mb-0">
                <NuxtLink to="/blog/legal-structure-profit-business">
                  A great commerce experience cannot be distilled to a single number. A great
                  commerce experience.
                </NuxtLink>
              </h6>
            </div>
          </nav>

          <div class="my-48">
            <span class="border-bottom border-gray-100 d-block"></span>
          </div>
          <CommentSection />
        </div>

        <div class="col-lg-4 ps-xl-4" aria-label="Sidebar">
          <SearchBlog />
          <RecentPosts />
          <PopularTags />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { blogPosts } from "~/data/blog-data";
import CommentSection from "~/components/widgets/blog/CommentSection.vue";
import SearchBlog from "~/components/widgets/blog/SearchBlog.vue";
import RecentPosts from "~/components/widgets/blog/RecentPosts.vue";
import PopularTags from "~/components/widgets/blog/PopularTags.vue";

const route = useRoute();
const router = useRouter();

const slug = route.params.slug as string;

const post = computed(() => blogPosts.find(p => p.slug === slug));

if (!post.value) {
  router.replace("/404");
}
</script>
