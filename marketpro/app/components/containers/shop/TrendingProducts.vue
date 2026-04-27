<template>
  <section class="trending-products-three py-120 overflow-hidden">
    <div class="container container-lg">
      <div class="section-heading mb-24">
        <div class="flex-between flex-wrap gap-8">
          <h5 class="mb-0 text-uppercase">Trending Products</h5>
          <ul class="nav common-tab style-two nav-pills" role="tablist">
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                :class="{ active: activeTab === 'sale' }"
                type="button"
                role="tab"
                @click="setActiveTab('sale')"
              >
                On Sale
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                :class="{ active: activeTab === 'featured' }"
                type="button"
                role="tab"
                @click="setActiveTab('featured')"
              >
                Featured Products
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                :class="{ active: activeTab === 'rated' }"
                type="button"
                role="tab"
                @click="setActiveTab('rated')"
              >
                Best Rated
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div class="tab-content">
        <div v-if="activeTab === 'sale'" class="row g-12">
          <TrendingCard
            v-for="product in trendingSaleProducts"
            :key="product.id"
            :product="product"
          />
        </div>

        <div v-if="activeTab === 'featured'" class="row g-12">
          <TrendingCard
            v-for="product in trendingFeaturedProducts"
            :key="product.id"
            :product="product"
          />
        </div>

        <div v-if="activeTab === 'rated'" class="row g-12">
          <TrendingCard
            v-for="product in trendingBestRatedProducts"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import {
  trendingSaleProducts,
  trendingFeaturedProducts,
  trendingBestRatedProducts,
} from "~/data/trending-proudcts";
import TrendingCard from "~/components/widgets/shop/TrendingCard.vue";

const activeTab = ref<"sale" | "featured" | "rated">("sale");

function setActiveTab(tab: "sale" | "featured" | "rated") {
  activeTab.value = tab;
}
</script>
