<template>
  <div>
    <Breadcrumb :title="catName || '分类商品'" />
    <section class="shop-section py-80">
      <div class="container container-lg">
        <!-- Sort bar -->
        <div class="flex-between flex-wrap gap-8 mb-40">
          <span
            class="text-neutral-600 fw-medium px-40 py-12 rounded-pill border border-neutral-100 d-md-block d-none"
          >
            共 {{ products.length }} 件商品
          </span>
          <div class="flex-align gap-8">
            <span class="text-gray-900 flex-shrink-0">排序:</span>
            <select
              v-model="sortBy"
              class="common-input form-select rounded-pill border border-gray-100 d-inline-block ps-20 pe-36 h-48 py-0 fw-medium"
            >
              <option value="default">默认</option>
              <option value="price_asc">价格从低到高</option>
              <option value="price_desc">价格从高到低</option>
              <option value="sales">销量优先</option>
            </select>
          </div>
        </div>

        <div v-if="loading" class="text-center py-60">
          <div class="spinner-border text-main-600" role="status"></div>
        </div>

        <div v-else-if="!sorted.length" class="text-center py-60">
          <i class="ph ph-package d-block mb-16 text-gray-200" style="font-size: 4rem"></i>
          <p class="text-gray-400">该分类暂无商品</p>
          <NuxtLink to="/" class="btn btn-main rounded-pill px-24 py-10 mt-16">返回首页</NuxtLink>
        </div>

        <div
          v-else
          class="row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 row-cols-xxl-5 g-12"
        >
          <div v-for="p in sorted" :key="p.id" class="col">
            <div
              class="product-card h-100 p-8 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2"
            >
              <span
                v-if="p.orig_price && p.orig_price > p.price"
                class="product-card__badge bg-danger-600 px-8 py-4 text-sm text-white"
                >特价</span
              >
              <NuxtLink
                :to="`/product/${p.id}`"
                class="product-card__thumb flex-center overflow-hidden"
              >
                <img
                  v-if="p.image"
                  :src="p.image"
                  :alt="p.name"
                  style="max-height: 160px; object-fit: contain"
                />
                <div
                  v-else
                  style="
                    width: 100%;
                    aspect-ratio: 4/3;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 3rem;
                  "
                  class="bg-color-one rounded-12 text-gray-300"
                >
                  <i class="ph ph-package"></i>
                </div>
              </NuxtLink>
              <div class="product-card__content mt-12" style="width: 100%">
                <h6 class="title text-lg fw-semibold mt-12 mb-8">
                  <NuxtLink :to="`/product/${p.id}`" class="link text-line-2">{{
                    p.name
                  }}</NuxtLink>
                </h6>
                <div class="product-card__price mb-8">
                  <span class="text-heading text-md fw-semibold"
                    ><i class="ph-fill ph-lightning-a" style="font-size:0.85em;vertical-align:middle;margin-right:1px"></i>{{ Number(p.price || 0).toFixed(2) }}</span
                  >
                  <span
                    v-if="p.orig_price && p.orig_price > p.price"
                    class="text-gray-400 text-md fw-semibold text-decoration-line-through ms-4"
                    ><i class="ph-fill ph-lightning-a" style="font-size:0.85em;vertical-align:middle;margin-right:1px"></i>{{ Number(p.orig_price).toFixed(2) }}</span
                  >
                </div>
                <div v-if="p.sales_count" class="flex-align gap-6 mb-8">
                  <span class="text-xs fw-bold text-gray-600">{{ p.sales_count }}</span>
                  <span class="text-warning-600 d-flex"><i class="ph-fill ph-fire"></i></span>
                  <span class="text-xs text-gray-500">已售</span>
                </div>
                <NuxtLink
                  :to="`/product/${p.id}`"
                  class="product-card__cart btn bg-main-50 text-main-600 hover-bg-main-600 hover-text-white py-11 px-24 rounded-pill flex-align gap-8 w-100 justify-content-center"
                  style="margin-top: 16px"
                >
                  立即购买 <i class="ph ph-shopping-cart"></i>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import Breadcrumb from "~/components/layout/banner/Breadcrumb.vue";
import { useSiteStore } from "~/stores/site";

const route = useRoute();
const siteStore = useSiteStore();

interface Product {
  id: number;
  name: string;
  price: number;
  orig_price?: number;
  image?: string;
  sales_count?: number;
  is_active?: boolean;
}

const products = ref<Product[]>([]);
const loading = ref(true);
const sortBy = ref("default");

const catName = computed(() => {
  const cat = siteStore.categories.find(c => String(c.id) === String(route.params.id));
  return cat?.name || "";
});

const sorted = computed(() => {
  const arr = [...products.value];
  if (sortBy.value === "price_asc") return arr.sort((a, b) => a.price - b.price);
  if (sortBy.value === "price_desc") return arr.sort((a, b) => b.price - a.price);
  if (sortBy.value === "sales")
    return arr.sort((a, b) => (b.sales_count || 0) - (a.sales_count || 0));
  return arr;
});

async function load() {
  loading.value = true;
  try {
    const res = await $fetch<{ products: Product[]; total: number }>(
      `/api/products?category_id=${route.params.id}`,
      { credentials: "include" }
    );
    products.value = (Array.isArray(res.products) ? res.products : []).filter(
      p => p.is_active !== false
    );
  } catch {
    products.value = [];
  } finally {
    loading.value = false;
  }
}

onMounted(load);
watch(() => route.params.id, load);
</script>
