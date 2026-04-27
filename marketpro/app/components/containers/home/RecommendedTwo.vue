<template>
  <section class="recommended overflow-hidden pt-80" data-aos="fade-up" data-aos-duration="600">
    <div class="container container-lg">
      <div class="section-heading flex-between flex-wrap gap-16">
        <h5 class="mb-0" data-aos="fade-left" data-aos-duration="600">Recommended for you</h5>
        <ul
          class="nav common-tab nav-pills"
          data-aos="fade-right"
          data-aos-duration="600"
          role="tablist"
        >
          <li v-for="tab in recommendedTabs" :key="tab.id" class="nav-item" role="presentation">
            <button
              :class="[
                'nav-link fw-medium text-sm border border-white hover-border-main-600',
                activeTab === tab.id ? 'active' : '',
              ]"
              type="button"
              role="tab"
              :aria-selected="activeTab === tab.id"
              @click="selectTab(tab.id)"
            >
              {{ tab.label }}
            </button>
          </li>
        </ul>
      </div>

      <div class="tab-content">
        <transition name="fade-slide" mode="out-in">
          <div
            v-if="activeTabContent"
            :key="activeTabContent.id"
            class="tab-pane fade show active"
            role="tabpanel"
            tabindex="0"
          >
            <div class="row g-12">
              <div
                v-for="product in activeTabContent.products"
                :key="product.id"
                class="col-xxl-2 col-lg-3 col-sm-4 col-6"
              >
                <div
                  class="product-card h-100 p-12 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2 group-item"
                >
                  <button
                    type="button"
                    class="wishlist-btn-two"
                    :class="{ active: wishlistedProductIds.has(product.id) }"
                    @click="toggleWishlist(product.id)"
                  >
                    <i class="ph-bold ph-heart"></i>
                  </button>

                  <NuxtLink
                    :to="product.link"
                    class="product-card__thumb flex-center overflow-hidden"
                  >
                    <NuxtImg :src="product.imageSrc" :alt="product.title" />
                  </NuxtLink>

                  <div class="product-card__content p-sm-2 w-100">
                    <h6 class="title text-lg fw-semibold my-12">
                      <NuxtLink :to="product.link" class="link text-line-2">
                        {{ product.title }}
                      </NuxtLink>
                    </h6>

                    <div class="flex-align gap-4">
                      <span class="text-main-600 text-md d-flex">
                        <i class="ph-fill ph-storefront"></i>
                      </span>
                      <span class="text-gray-500 text-xs">By Lucky Supermarket</span>
                    </div>

                    <div class="product-card__content mt-12">
                      <div class="product-card__price mb-8">
                        <span class="text-heading text-md fw-semibold">
                          ${{ product.price.toFixed(2) }}
                          <span class="text-gray-500 fw-normal">/Qty</span>
                        </span>
                        <span
                          v-if="product.oldPrice"
                          class="text-gray-400 text-md fw-semibold text-decoration-line-through"
                        >
                          ${{ product.oldPrice.toFixed(2) }}
                        </span>
                      </div>

                      <div class="flex-align gap-6">
                        <span class="text-xs fw-bold text-gray-600">
                          {{ product.rating.toFixed(1) }}
                        </span>
                        <span class="text-15 fw-bold text-warning-600 d-flex">
                          <i class="ph-fill ph-star"></i>
                        </span>
                        <span class="text-xs fw-bold text-gray-600">
                          ({{ product.reviewsCount }})
                        </span>
                      </div>

                      <NuxtLink
                        to="/cart"
                        class="product-card__cart btn bg-main-50 text-main-600 hover-bg-main-600 hover-text-white py-11 px-24 rounded-pill flex-align gap-8 mt-24 w-100 justify-content-center"
                      >
                        Add To Cart <i class="ph ph-shopping-cart"></i>
                      </NuxtLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type { Tab } from "~/data/recommented-two";
import { recommendedTabs } from "~/data/recommented-two";

const activeTab = ref<string>(recommendedTabs[0]?.id ?? "");

const activeTabContent = computed<Tab | undefined>(() =>
  recommendedTabs.find(tab => tab.id === activeTab.value)
);

const wishlistedProductIds = ref<Set<number>>(new Set());

function selectTab(tabId: string) {
  activeTab.value = tabId;
}

function toggleWishlist(productId: number) {
  if (wishlistedProductIds.value.has(productId)) {
    wishlistedProductIds.value.delete(productId);
  } else {
    wishlistedProductIds.value.add(productId);
  }
}
</script>
