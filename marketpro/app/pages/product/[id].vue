<template>
  <div>
    <!-- Loading -->
    <div v-if="loading" class="py-80 text-center">
      <div class="spinner-border text-main-600" role="status"></div>
    </div>

    <!-- Not found -->
    <div v-else-if="!product" class="py-80 text-center container container-lg">
      <i class="ph ph-warning d-block mb-16 text-gray-200" style="font-size: 4rem"></i>
      <p class="text-gray-400">商品不存在或已下架</p>
      <NuxtLink to="/" class="btn btn-main rounded-pill py-8 px-24 mt-16">返回首页</NuxtLink>
    </div>

    <!-- Product detail -->
    <section v-else class="product-details py-80">
      <div class="container container-lg">
        <div class="row gy-4">
          <!-- Main content (left 9 cols) -->
          <div class="col-lg-9">
            <div class="row gy-4">
              <!-- Image column -->
              <div class="col-xl-6">
                <div class="product-details__left">
                  <!-- Main image -->
                  <div
                    class="product-details__thumb-slider-wrapper pr-1 border border-gray-100 rounded-16 mb-12"
                  >
                    <div
                      class="product-details__thumb flex-center"
                      style="min-height: 320px; padding: 32px"
                    >
                      <img
                        v-if="activeImage || product.image"
                        :src="activeImage || product.image"
                        :alt="product.name"
                        style="max-width: 100%; max-height: 320px; object-fit: contain"
                      />
                      <div
                        v-else
                        class="flex-center rounded-12 bg-color-one text-gray-300"
                        style="width: 160px; height: 160px; font-size: 5rem"
                      >
                        <i class="ph ph-package"></i>
                      </div>
                    </div>
                  </div>
                  <!-- Thumbnails -->
                  <div v-if="allImages.length > 1" class="d-flex gap-8 flex-wrap">
                    <button
                      v-for="(img, idx) in allImages"
                      :key="idx"
                      type="button"
                      class="border rounded-8 p-4 flex-center"
                      :class="activeImage === img ? 'border-main-600' : 'border-gray-100'"
                      style="width: 64px; height: 64px; background: transparent"
                      @click="activeImage = img"
                    >
                      <img
                        :src="img"
                        :alt="product.name + ' ' + (idx + 1)"
                        style="max-width: 100%; max-height: 100%; object-fit: contain"
                      />
                    </button>
                  </div>
                </div>
              </div>

              <!-- Info column -->
              <div class="col-xl-6">
                <div class="product-details__content">
                  <h5 class="mb-12">{{ product.name }}</h5>

                  <div class="flex-align flex-wrap gap-12">
                    <span class="text-sm fw-medium text-gray-500">
                      <i class="ph ph-package me-4"></i>库存
                      <strong class="text-gray-800">{{ product.stock_count }}</strong>
                    </span>
                    <span class="text-sm fw-medium text-gray-500">|</span>
                    <span class="text-sm fw-medium text-gray-500">
                      <i class="ph ph-fire me-4 text-warning-600"></i>已售
                      <strong class="text-gray-800">{{ product.sales_count || 0 }}</strong>
                    </span>
                    <span v-if="product.category?.name" class="text-sm fw-medium text-gray-500"
                      >|</span
                    >
                    <span v-if="product.category?.name" class="text-sm fw-medium text-gray-500">
                      分类：<strong class="text-gray-800">{{ product.category.name }}</strong>
                    </span>
                  </div>

                  <span class="mt-32 pt-32 text-gray-700 border-top border-gray-100 d-block"></span>

                  <p v-if="product.description" class="text-gray-700">{{ product.description }}</p>

                  <!-- Price -->
                  <div class="mt-32 flex-align flex-wrap gap-32">
                    <div class="flex-align gap-8">
                      <h4 class="mb-0 text-main-600">
                        ¥{{ Number(product.price || 0).toFixed(2) }}
                      </h4>
                      <span
                        v-if="product.orig_price && product.orig_price > product.price"
                        class="text-md text-gray-500 text-decoration-line-through"
                      >
                        ¥{{ Number(product.orig_price).toFixed(2) }}
                      </span>
                    </div>
                  </div>

                  <span class="mt-32 pt-32 text-gray-700 border-top border-gray-100 d-block"></span>

                  <!-- Stock bar -->
                  <div class="mb-24">
                    <div class="mt-0 flex-align gap-12 mb-16">
                      <span
                        class="w-32 h-32 bg-white flex-center rounded-circle text-main-600 box-shadow-xl"
                      >
                        <i class="ph-fill ph-lightning"></i>
                      </span>
                      <h6 class="text-md mb-0 fw-bold text-gray-900">
                        {{ product.stock_count > 0 ? "库存充足，立即下单" : "库存不足" }}
                      </h6>
                    </div>
                    <div class="progress w-100 bg-gray-100 rounded-pill h-8" role="progressbar">
                      <div
                        class="progress-bar bg-main-two-600 rounded-pill"
                        :style="{ width: soldPercent + '%' }"
                      ></div>
                    </div>
                    <span class="text-sm text-gray-700 mt-8">
                      剩余库存：{{ product.stock_count }}
                    </span>
                  </div>

                  <!-- Out of stock -->
                  <div
                    v-if="!product.stock_count || product.is_active === false"
                    class="alert alert-warning py-8 px-16 rounded-8 mb-24"
                  >
                    <i class="ph ph-warning me-8"></i>
                    {{ product.is_active === false ? "商品已下架" : "库存不足，暂时无法购买" }}
                  </div>

                  <!-- Buy actions -->
                  <div v-else>
                    <span class="text-gray-900 d-block mb-8">数量：</span>
                    <div class="flex-between gap-16 flex-wrap">
                      <div class="flex-align flex-wrap gap-16">
                        <div class="border border-gray-100 rounded-pill py-9 px-16 flex-align">
                          <button
                            type="button"
                            class="quantity__minus p-4 text-gray-700 hover-text-main-600 flex-center"
                            @click="if (qty > 1) qty--;"
                          >
                            <i class="ph ph-minus"></i>
                          </button>
                          <input
                            v-model.number="qty"
                            type="number"
                            class="quantity__input border-0 text-center w-32"
                            min="1"
                            :max="product.stock_count"
                          />
                          <button
                            type="button"
                            class="quantity__plus p-4 text-gray-700 hover-text-main-600 flex-center"
                            @click="if (qty < product.stock_count) qty++;"
                          >
                            <i class="ph ph-plus"></i>
                          </button>
                        </div>

                        <button
                          type="button"
                          class="btn rounded-pill flex-align d-inline-flex gap-8 px-32"
                          style="
                            border: 1.5px solid #299e60;
                            color: #299e60;
                            background: transparent;
                          "
                          @click="addToCart"
                        >
                          <i class="ph ph-shopping-cart"></i> 加入购物车
                        </button>

                        <button
                          type="button"
                          class="btn btn-main rounded-pill flex-align d-inline-flex gap-8 px-32"
                          @click="buyNow"
                        >
                          <i class="ph ph-lightning"></i> 立即购买
                        </button>
                      </div>

                      <div class="flex-align gap-12">
                        <button
                          type="button"
                          class="w-52 h-52 text-xl hover-bg-main-600 hover-text-white flex-center rounded-circle"
                          :class="
                            wishlistStore.has(product.id)
                              ? 'bg-danger-50 text-danger-600'
                              : 'bg-main-50 text-main-600'
                          "
                          @click="wishlistStore.toggle(product)"
                        >
                          <i
                            :class="
                              wishlistStore.has(product.id) ? 'ph-fill ph-heart' : 'ph ph-heart'
                            "
                          ></i>
                        </button>
                      </div>
                    </div>

                    <!-- Total -->
                    <div
                      class="d-flex justify-content-between gap-16 p-12 bg-main-50 rounded-8 mt-24"
                    >
                      <span class="text-sm text-gray-600">合计金额</span>
                      <span class="fw-bold text-main-600 text-xl">
                        ¥{{ (qty * product.price).toFixed(2) }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- ProductContent tabs -->
            <ProductContent
              v-if="product"
              :product-id="product.id"
              :description="product.description"
            />
          </div>

          <!-- Right sidebar (3 cols) -->
          <div class="col-lg-3">
            <div class="product-details__sidebar border border-gray-100 rounded-16 overflow-hidden">
              <!-- Vendor card -->
              <div class="p-24">
                <div class="flex-between bg-main-600 rounded-pill p-8">
                  <div class="flex-align gap-8">
                    <span class="w-44 h-44 bg-white rounded-circle flex-center text-2xl">
                      <i class="ph ph-storefront"></i>
                    </span>
                    <span class="text-white text-sm">
                      {{ shopName }}
                    </span>
                  </div>
                  <NuxtLink
                    v-if="product.shop_id"
                    :to="`/vendor/${product.shop_id}`"
                    class="btn btn-white rounded-pill text-uppercase text-sm"
                    >查看店铺</NuxtLink
                  >
                </div>
              </div>

              <!-- Info items -->
              <div
                v-for="(item, i) in sidebarItems"
                :key="i"
                class="p-24 bg-color-one d-flex align-items-start gap-24 border-bottom border-gray-100"
              >
                <span
                  class="w-44 h-44 bg-white text-main-600 rounded-circle flex-center text-2xl flex-shrink-0"
                >
                  <i :class="item.icon"></i>
                </span>
                <div>
                  <h6 class="text-sm mb-8">{{ item.title }}</h6>
                  <p class="text-gray-700 mb-0">{{ item.text }}</p>
                </div>
              </div>

              <!-- Related products -->
              <div v-if="related.length" class="p-24">
                <h6 class="mb-16 text-sm fw-bold">相关商品</h6>
                <div class="d-flex flex-column gap-16">
                  <div
                    v-for="r in related"
                    :key="r.id"
                    class="d-flex gap-12 align-items-center border border-gray-100 rounded-12 p-12 hover-border-main-600 transition-2"
                  >
                    <NuxtLink :to="`/product/${r.id}`" class="flex-shrink-0">
                      <img
                        :src="r.image || ''"
                        :alt="r.name"
                        style="width: 48px; height: 48px; object-fit: contain; border-radius: 8px"
                      />
                    </NuxtLink>
                    <div style="min-width: 0; flex: 1">
                      <NuxtLink
                        :to="`/product/${r.id}`"
                        class="text-heading text-sm fw-semibold text-line-2 hover-text-main-600 d-block"
                        >{{ r.name }}</NuxtLink
                      >
                      <span class="text-main-600 fw-bold text-sm"
                        >¥{{ Number(r.price || 0).toFixed(2) }}</span
                      >
                    </div>
                  </div>
                </div>
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
import { useCartStore } from "~/stores/cart";
import { useWishlistStore } from "~/stores/wishlist";
import ProductContent from "~/components/containers/shop/ProductContent.vue";

const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();

interface Category {
  id: number;
  name: string;
}

interface Shop {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  orig_price?: number;
  image?: string;
  images?: string;
  stock_count: number;
  sales_count?: number;
  is_active?: boolean;
  shop_id?: number;
  shop?: Shop;
  category_id?: number;
  category?: Category;
}

const product = ref<Product | null>(null);
const related = ref<Product[]>([]);
const loading = ref(true);
const qty = ref(1);

const allImages = computed<string[]>(() => {
  if (!product.value) return [];
  let extras: string[] = [];
  try {
    extras = JSON.parse(product.value.images || "[]").filter(Boolean);
  } catch {
    extras = [];
  }
  if (product.value.image && !extras.includes(product.value.image)) {
    extras = [product.value.image, ...extras];
  }
  return extras;
});

const activeImage = ref("");
watch(
  allImages,
  imgs => {
    if (imgs.length && !activeImage.value) activeImage.value = imgs[0];
  },
  { immediate: true }
);

const shopName = computed(() => {
  if (!product.value) return "";
  return typeof product.value.shop === "object"
    ? product.value.shop?.name
    : (product.value.shop as unknown as string) || "查看店铺";
});

const soldPercent = computed(() => {
  if (!product.value) return 0;
  const total = (product.value.sales_count || 0) + product.value.stock_count;
  if (!total) return 0;
  return Math.min(Math.round(((product.value.sales_count || 0) / total) * 100), 100);
});

const sidebarItems = [
  { icon: "ph-fill ph-seal-check", title: "正版授权", text: "所有商品均为正版授权，支持验真。" },
  { icon: "ph-fill ph-key", title: "即时发货", text: "付款后卡密自动发送，无需等待。" },
  { icon: "ph-fill ph-lock-key", title: "安全支付", text: "多种支付方式，全程加密保障。" },
  { icon: "ph-fill ph-headset", title: "售后保障", text: "遇到问题联系店铺客服，快速处理。" },
];

async function load() {
  loading.value = true;
  qty.value = 1;
  activeImage.value = "";
  try {
    product.value = await $fetch<Product>(`/api/products/${route.params.id}`, {
      credentials: "include",
    });
    if (product.value?.category_id) {
      const r = await $fetch<{ products: Product[] }>(
        `/api/products?category_id=${product.value.category_id}&page_size=5`,
        { credentials: "include" }
      );
      related.value = (Array.isArray(r.products) ? r.products : [])
        .filter(p => p.id !== product.value!.id)
        .slice(0, 4);
    }
  } catch {
    product.value = null;
  } finally {
    loading.value = false;
  }
}

function addToCart() {
  if (!product.value) return;
  cartStore.add(product.value, qty.value);
  router.push("/cart");
}

function buyNow() {
  if (!product.value) return;
  cartStore.add(product.value, qty.value);
  router.push("/checkout");
}

onMounted(load);
watch(() => route.params.id, load);
</script>
