<template>
  <section class="shop py-80">
    <div class="container container-lg">
      <div class="row">
        <!-- Sidebar -->
        <div class="col-lg-3">
          <ShopSidebarMain :selected-category-id="filters.categoryId" @filter="onSidebarFilter" />
        </div>

        <!-- Main content -->
        <div class="col-lg-9">
          <!-- Toolbar -->
          <div class="flex-between gap-16 flex-wrap mb-40">
            <span class="text-gray-900">
              <template v-if="!loading">共 {{ total }} 件商品</template>
              <template v-else>加载中…</template>
            </span>
            <div class="position-relative flex-align gap-16 flex-wrap">
              <!-- Search -->
              <div class="position-relative flex-align">
                <input
                  v-model="keyword"
                  type="text"
                  class="form-control common-input ps-14 pe-40 text-sm h-48 rounded-6 border border-gray-100"
                  placeholder="搜索商品…"
                  style="min-width: 160px"
                  @keydown.enter="onSearch"
                />
                <button
                  type="button"
                  class="position-absolute end-0 me-12 text-gray-500 bg-transparent border-0"
                  @click="onSearch"
                >
                  <i class="ph ph-magnifying-glass"></i>
                </button>
              </div>

              <!-- Grid / List toggle -->
              <div class="list-grid-btns flex-align gap-16">
                <button
                  type="button"
                  :class="[
                    'grid-btn text-2xl d-flex w-48 h-48 border rounded-8 justify-content-center align-items-center',
                    !isListView ? 'border-main-600 text-white bg-main-600' : 'border-gray-100',
                  ]"
                  aria-label="Grid view"
                  @click="isListView = false"
                >
                  <i class="ph ph-squares-four"></i>
                </button>
                <button
                  type="button"
                  :class="[
                    'list-btn text-2xl d-flex w-48 h-48 border rounded-8 justify-content-center align-items-center',
                    isListView ? 'border-main-600 text-white bg-main-600' : 'border-gray-100',
                  ]"
                  aria-label="List view"
                  @click="isListView = true"
                >
                  <i class="ph ph-list-bullets"></i>
                </button>
              </div>

              <!-- Sort -->
              <div class="position-relative text-gray-500 flex-align gap-4 text-14">
                <label for="sorting" class="text-inherit flex-shrink-0">排序: </label>
                <select
                  id="sorting"
                  v-model="filters.sort"
                  class="form-control common-input px-14 py-14 text-inherit rounded-6 w-auto"
                  @change="goPage(1)"
                >
                  <option value="default">默认</option>
                  <option value="newest">最新</option>
                  <option value="price_asc">价格从低到高</option>
                  <option value="price_desc">价格从高到低</option>
                  <option value="sales">销量优先</option>
                </select>
              </div>

              <!-- Mobile sidebar toggle -->
              <button
                type="button"
                class="w-44 h-44 d-lg-none d-flex flex-center border border-gray-100 rounded-6 text-2xl sidebar-btn"
                @click="toggleSidebar"
              >
                <i class="ph-bold ph-funnel"></i>
              </button>
            </div>
          </div>

          <!-- Loading state -->
          <div v-if="loading" class="text-center py-80">
            <div class="spinner-border text-main-600" role="status"></div>
          </div>

          <!-- Empty state -->
          <div v-else-if="!products.length" class="text-center py-80">
            <i class="ph ph-package d-block mb-16 text-gray-200" style="font-size: 4rem"></i>
            <p class="text-gray-400">暂无商品</p>
          </div>

          <!-- Products grid/list -->
          <div v-else :class="['list-grid-wrapper', { 'list-view': isListView }]">
            <div
              v-for="product in products"
              :key="product.id"
              class="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2"
            >
              <NuxtLink
                :to="`/product/${product.id}`"
                class="product-card__thumb flex-center rounded-8 bg-gray-50 position-relative"
              >
                <span
                  v-if="product.orig_price && product.orig_price > product.price"
                  class="product-card__badge bg-danger-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0"
                  >特价</span
                >
                <img
                  v-if="product.image"
                  :src="product.image"
                  :alt="product.name"
                  class="w-auto"
                  style="max-height: 160px; object-fit: contain"
                />
                <div
                  v-else
                  class="w-100 flex-center bg-color-one rounded-12 text-gray-300"
                  style="aspect-ratio: 4/3; font-size: 3rem"
                >
                  <i class="ph ph-package"></i>
                </div>
              </NuxtLink>

              <div class="product-card__content mt-16">
                <h6 class="title text-lg fw-semibold mt-12 mb-8">
                  <NuxtLink :to="`/product/${product.id}`" class="link text-line-2">
                    {{ product.name }}
                  </NuxtLink>
                </h6>

                <div v-if="product.sales_count" class="flex-align mb-8 gap-6">
                  <span class="text-xs fw-bold text-gray-600">{{ product.sales_count }}</span>
                  <span class="text-warning-600 d-flex"><i class="ph-fill ph-fire"></i></span>
                  <span class="text-xs text-gray-500">已售</span>
                </div>

                <div class="product-card__price my-20">
                  <span
                    v-if="product.orig_price && product.orig_price > product.price"
                    class="text-gray-400 text-md fw-semibold text-decoration-line-through"
                  >
                    ¥{{ Number(product.orig_price).toFixed(2) }}
                  </span>
                  <span class="text-heading text-md fw-semibold">
                    ¥{{ Number(product.price || 0).toFixed(2) }}
                  </span>
                </div>

                <NuxtLink
                  :to="`/product/${product.id}`"
                  class="product-card__cart btn bg-gray-50 text-heading hover-bg-main-600 hover-text-white py-11 px-24 rounded-8 flex-center gap-8 fw-medium"
                >
                  立即购买 <i class="ph ph-shopping-cart"></i>
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <ul v-if="totalPages > 1" class="pagination flex-center flex-wrap gap-16 mt-48">
            <li class="page-item" :class="{ disabled: filters.page <= 1 }">
              <a
                class="page-link h-64 w-64 flex-center text-xxl rounded-8 fw-medium text-neutral-600 border border-gray-100"
                href="#"
                @click.prevent="goPage(filters.page - 1)"
              >
                <i class="ph-bold ph-arrow-left"></i>
              </a>
            </li>
            <li
              v-for="p in paginationPages"
              :key="p"
              class="page-item"
              :class="{ active: p === filters.page }"
            >
              <a
                class="page-link h-64 w-64 flex-center text-md rounded-8 fw-medium text-neutral-600 border border-gray-100"
                href="#"
                @click.prevent="goPage(p)"
              >
                {{ String(p).padStart(2, "0") }}
              </a>
            </li>
            <li class="page-item" :class="{ disabled: filters.page >= totalPages }">
              <a
                class="page-link h-64 w-64 flex-center text-xxl rounded-8 fw-medium text-neutral-600 border border-gray-100"
                href="#"
                @click.prevent="goPage(filters.page + 1)"
              >
                <i class="ph-bold ph-arrow-right"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from "vue";
import { useSidebar } from "~/composables/useSidebar";
import ShopSidebarMain from "~/components/widgets/sidebar/ShopSidebarMain.vue";

interface Product {
  id: number;
  name: string;
  price: number;
  orig_price?: number;
  image?: string;
  sales_count?: number;
}

interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

const { toggleSidebar } = useSidebar();

const isListView = ref(false);
const loading = ref(true);
const products = ref<Product[]>([]);
const total = ref(0);
const totalPages = ref(1);
const keyword = ref("");

const filters = reactive({
  categoryId: 0,
  minPrice: 0,
  maxPrice: 0,
  keyword: "",
  sort: "default",
  page: 1,
  pageSize: 20,
});

const paginationPages = computed(() => {
  const pages: number[] = [];
  const start = Math.max(1, filters.page - 2);
  const end = Math.min(totalPages.value, start + 4);
  for (let i = start; i <= end; i++) pages.push(i);
  return pages;
});

async function fetchProducts() {
  loading.value = true;
  try {
    const params: Record<string, string> = {
      page: String(filters.page),
      page_size: String(filters.pageSize),
      sort: filters.sort,
    };
    if (filters.categoryId) params.category_id = String(filters.categoryId);
    if (filters.keyword) params.keyword = filters.keyword;
    if (filters.minPrice) params.min_price = String(filters.minPrice);
    if (filters.maxPrice) params.max_price = String(filters.maxPrice);

    const res = await $fetch<ProductsResponse>("/api/products", {
      credentials: "include",
      params,
    });
    products.value = res.products || [];
    total.value = res.total || 0;
    totalPages.value = res.total_pages || 1;
  } catch {
    products.value = [];
    total.value = 0;
    totalPages.value = 1;
  } finally {
    loading.value = false;
  }
}

function goPage(p: number) {
  if (p < 1 || p > totalPages.value) return;
  filters.page = p;
}

function onSearch() {
  filters.keyword = keyword.value;
  filters.page = 1;
}

function onSidebarFilter(f: { categoryId: number; minPrice: number; maxPrice: number }) {
  filters.categoryId = f.categoryId;
  filters.minPrice = f.minPrice;
  filters.maxPrice = f.maxPrice;
  filters.page = 1;
}

watch(filters, fetchProducts, { immediate: true });
</script>
