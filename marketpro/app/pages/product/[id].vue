<template>
  <div>
    <Breadcrumb :title="product?.name || '商品详情'" />

    <!-- Loading -->
    <div v-if="loading" class="py-80 text-center">
      <div class="spinner-border text-main-600" role="status"></div>
    </div>

    <!-- Not Found -->
    <div v-else-if="!product" class="py-80 text-center container container-lg">
      <i class="ph ph-warning d-block mb-16 text-gray-200" style="font-size:4rem"></i>
      <p class="text-gray-400">商品不存在或已下架</p>
      <NuxtLink to="/" class="btn btn-main rounded-pill py-8 px-24 mt-16">返回首页</NuxtLink>
    </div>

    <!-- Product Detail -->
    <section v-else class="product-details py-80">
      <div class="container container-lg">
        <div class="row gy-4">

          <!-- ===== Left 9 cols ===== -->
          <div class="col-lg-9">
            <div class="row gy-4">

              <!-- Image gallery -->
              <div class="col-xl-6">
                <div class="product-details__left">
                  <!-- Main Swiper -->
                  <div class="product-details__thumb-slider-wrapper border border-gray-100 rounded-16">
                    <Swiper
                      ref="thumbsSwiperRef"
                      class="product-details__thumb-slider"
                      :modules="swiperModules"
                      :slides-per-view="1"
                      effect="fade"
                      :fade-effect="{ crossFade: true }"
                      @swiper="onThumbsSwiper"
                    >
                      <SwiperSlide v-for="(img, i) in allImages" :key="i">
                        <div class="product-details__thumb flex-center" style="min-height:320px;padding:32px">
                          <img :src="img" :alt="product.name" style="max-width:100%;max-height:320px;object-fit:contain" />
                        </div>
                      </SwiperSlide>
                      <!-- Placeholder when no images -->
                      <SwiperSlide v-if="!allImages.length">
                        <div class="flex-center" style="min-height:320px">
                          <i class="ph ph-package text-gray-200" style="font-size:5rem"></i>
                        </div>
                      </SwiperSlide>
                    </Swiper>
                  </div>

                  <!-- Thumbnail Swiper -->
                  <div v-if="allImages.length > 1" class="mt-24">
                    <Swiper
                      ref="imagesSwiperRef"
                      class="product-details__images-slider"
                      :modules="swiperModules"
                      :slides-per-view="4"
                      :space-between="16"
                      @swiper="onImagesSwiper"
                    >
                      <SwiperSlide
                        v-for="(img, j) in allImages"
                        :key="j"
                        style="cursor:pointer"
                        @click="onThumbnailClick(j)"
                      >
                        <div class="h-100 flex-center border rounded-16 p-8"
                          :class="activeIdx === j ? 'border-main-600' : 'border-gray-100'"
                          style="max-height:120px"
                        >
                          <img :src="img" :alt="product.name + ' ' + (j+1)" style="max-width:100%;max-height:100px;object-fit:contain" />
                        </div>
                      </SwiperSlide>
                    </Swiper>
                  </div>
                </div>
              </div>

              <!-- Product info -->
              <div class="col-xl-6">
                <div class="product-details__content">
                  <h5 class="mb-12">{{ product.name }}</h5>

                  <!-- Rating + Meta -->
                  <div class="flex-align flex-wrap gap-12">
                    <div class="flex-align gap-8">
                      <div class="flex-align gap-4">
                        <span v-for="n in 5" :key="n" class="text-xs fw-medium d-flex"
                          :class="reviewCount > 0 && n <= Math.round(avgRating) ? 'text-warning-600' : 'text-gray-300'"
                        ><i class="ph-fill ph-star"></i></span>
                      </div>
                      <span v-if="reviewCount > 0" class="text-sm fw-medium text-neutral-600">{{ avgRating.toFixed(1) }} 分</span>
                      <span class="text-sm text-gray-500">
                        {{ reviewCount > 0 ? `(${reviewCount} 条评价)` : '暂无评价' }}
                      </span>
                    </div>
                    <span class="text-sm text-gray-500">|</span>
                    <span class="text-gray-900 text-sm">
                      <span class="text-gray-400">SKU: </span>
                      <span class="fw-medium">{{ String(product.id).padStart(6, '0') }}</span>
                    </span>
                  </div>

                  <span class="mt-32 pt-32 border-top border-gray-100 d-block"></span>
                  <p v-if="product.description" class="text-gray-700">{{ product.description }}</p>

                  <!-- Price -->
                  <div class="mt-32 flex-align flex-wrap gap-32">
                    <div class="flex-align gap-8">
                      <h4 class="mb-0 text-main-600">¥{{ Number(product.effective_price || product.price || 0).toFixed(2) }}</h4>
                      <!-- 促销时划掉原售价，非促销时划掉原价 -->
                      <span v-if="product.is_promo_active"
                        class="text-md text-gray-500 text-decoration-line-through"
                      >¥{{ Number(product.price).toFixed(2) }}</span>
                      <span v-else-if="product.orig_price && product.orig_price > product.price"
                        class="text-md text-gray-500 text-decoration-line-through"
                      >¥{{ Number(product.orig_price).toFixed(2) }}</span>
                      <el-tag v-if="product.is_promo_active" type="danger" size="small" class="ms-8">限时特惠</el-tag>
                    </div>
                  </div>

                  <span class="mt-32 pt-32 border-top border-gray-100 d-block"></span>

                  <!-- Offer countdown — 仅促销期内显示 -->
                  <div v-if="product.is_promo_active && product.promo_end"
                    class="flex-align gap-12 bg-color-one rounded-8 py-12 px-20 mb-24 flex-wrap"
                  >
                    <span class="text-main-600 text-sm fw-medium flex-shrink-0">限时特惠：</span>
                    <div id="pd-countdown" style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">
                      <div class="cd-block"><span class="days fw-bold text-main-600"></span><span class="cd-label">天</span></div>
                      <span class="cd-sep">:</span>
                      <div class="cd-block"><span class="hours fw-bold text-main-600"></span><span class="cd-label">时</span></div>
                      <span class="cd-sep">:</span>
                      <div class="cd-block"><span class="minutes fw-bold text-main-600"></span><span class="cd-label">分</span></div>
                      <span class="cd-sep">:</span>
                      <div class="cd-block"><span class="seconds fw-bold text-main-600"></span><span class="cd-label">秒</span></div>
                    </div>
                    <span class="text-gray-400 text-xs">活动结束前有效</span>
                  </div>

                  <!-- Stock bar -->
                  <div class="mb-24">
                    <div class="flex-align gap-12 mb-16">
                      <span class="w-32 h-32 bg-white flex-center rounded-circle text-main-600 box-shadow-xl">
                        <i class="ph-fill ph-lightning"></i>
                      </span>
                      <h6 class="text-md mb-0 fw-bold text-gray-900">
                        {{ product.stock_count > 0 ? '库存充足，即刻下单' : '库存紧张' }}
                      </h6>
                    </div>
                    <div class="progress w-100 bg-gray-100 rounded-pill h-8" role="progressbar">
                      <div class="progress-bar bg-main-two-600 rounded-pill" :style="{ width: soldPercent + '%' }"></div>
                    </div>
                    <div class="flex-between mt-8">
                      <span class="text-xs text-gray-500">已售 {{ product.sales_count || 0 }}</span>
                      <span class="text-xs text-gray-500">剩余 {{ product.stock_count }}</span>
                    </div>
                  </div>

                  <!-- Out of stock -->
                  <div v-if="!product.stock_count || product.is_active === false"
                    class="alert alert-warning py-8 px-16 rounded-8 mb-24"
                  >
                    <i class="ph ph-warning me-8"></i>
                    {{ product.is_active === false ? '商品已下架' : '库存不足，暂时无法购买' }}
                  </div>

                  <!-- Buy actions -->
                  <template v-else>
                    <span class="text-gray-900 d-block mb-8">数量：</span>
                    <div class="flex-between gap-16 flex-wrap mb-24">
                      <div class="flex-align flex-wrap gap-16">
                        <div class="border border-gray-100 rounded-pill py-9 px-16 flex-align">
                          <button type="button" class="quantity__minus p-4 text-gray-700 hover-text-main-600 flex-center"
                            @click="qty > 1 && qty--"
                          ><i class="ph ph-minus"></i></button>
                          <input v-model.number="qty" type="number" class="quantity__input border-0 text-center w-32" min="1" :max="product.stock_count" />
                          <button type="button" class="quantity__plus p-4 text-gray-700 hover-text-main-600 flex-center"
                            @click="qty < product.stock_count && qty++"
                          ><i class="ph ph-plus"></i></button>
                        </div>
                        <button type="button" class="btn btn-main rounded-pill flex-align d-inline-flex gap-8 px-32" @click="buyNow">
                          <i class="ph ph-lightning"></i> 立即购买
                        </button>
                      </div>
                      <div class="flex-align gap-12">
                        <button type="button"
                          class="w-52 h-52 text-xl hover-bg-main-600 hover-text-white flex-center rounded-circle"
                          :class="wishlistStore.has(product.id) ? 'bg-danger-50 text-danger-600' : 'bg-main-50 text-main-600'"
                          title="收藏"
                          @click="wishlistStore.toggle(product)"
                        ><i :class="wishlistStore.has(product.id) ? 'ph-fill ph-heart' : 'ph ph-heart'"></i></button>
                        <button type="button"
                          class="w-52 h-52 text-xl bg-main-50 text-main-600 hover-bg-main-600 hover-text-white flex-center rounded-circle"
                          title="加入购物车"
                          @click="addToCart"
                        ><i class="ph ph-shopping-cart"></i></button>
                      </div>
                    </div>

                    <!-- Total -->
                    <div class="flex-between gap-16 p-12 bg-main-50 rounded-8">
                      <span class="text-sm text-gray-600">合计金额</span>
                      <span class="fw-bold text-main-600 text-xl">¥{{ (qty * product.price).toFixed(2) }}</span>
                    </div>
                  </template>
                </div>
              </div>
            </div>

            <!-- Product Content Tabs -->
            <ProductContent v-if="product" :product-id="product.id" :description="product.description" />
          </div>

          <!-- ===== Right sidebar 3 cols ===== -->
          <div class="col-lg-3">
            <div class="product-details__sidebar border border-gray-100 rounded-16 overflow-hidden">
              <!-- Vendor -->
              <div class="p-24">
                <div class="flex-between bg-main-600 rounded-pill p-8">
                  <div class="flex-align gap-8">
                    <span class="w-44 h-44 bg-white rounded-circle flex-center text-2xl">
                      <i class="ph ph-storefront"></i>
                    </span>
                    <span class="text-white text-sm">{{ shopName }}</span>
                  </div>
                  <NuxtLink v-if="product.shop_id" :to="`/vendor/${product.shop_id}`" class="btn btn-white rounded-pill text-uppercase text-sm">
                    查看店铺
                  </NuxtLink>
                </div>
              </div>

              <!-- Info items -->
              <div v-for="(item, i) in sidebarItems" :key="i"
                class="p-24 bg-color-one d-flex align-items-start gap-24 border-bottom border-gray-100"
              >
                <span class="w-44 h-44 bg-white text-main-600 rounded-circle flex-center text-2xl flex-shrink-0">
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
                <div class="d-flex flex-column gap-12">
                  <div v-for="r in related" :key="r.id"
                    class="d-flex gap-12 align-items-center border border-gray-100 rounded-12 p-12 hover-border-main-600 transition-2"
                  >
                    <NuxtLink :to="`/product/${r.id}`" class="flex-shrink-0">
                      <img :src="r.image || ''" :alt="r.name" style="width:48px;height:48px;object-fit:contain;border-radius:8px" />
                    </NuxtLink>
                    <div style="min-width:0;flex:1">
                      <NuxtLink :to="`/product/${r.id}`" class="text-heading text-sm fw-semibold text-line-2 hover-text-main-600 d-block">{{ r.name }}</NuxtLink>
                      <span class="text-main-600 fw-bold text-sm">¥{{ Number(r.price || 0).toFixed(2) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- You might also like (real products) -->
    <section v-if="related.length" class="new-arrival pb-80">
      <div class="container container-lg">
        <div class="section-heading">
          <div class="flex-between flex-wrap gap-8">
            <h5 class="mb-0">猜你喜欢</h5>
            <NuxtLink to="/shop" class="text-sm fw-medium text-gray-700 hover-text-main-600">全部商品</NuxtLink>
          </div>
        </div>
        <div class="row gy-4">
          <div v-for="p in related" :key="p.id" class="col-xxl-2 col-xl-3 col-md-4 col-sm-6">
            <div class="product-card h-100 p-8 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
              <NuxtLink :to="`/product/${p.id}`" class="product-card__thumb flex-center overflow-hidden d-block">
                <img :src="p.image || ''" :alt="p.name" style="max-height:180px;object-fit:contain" />
              </NuxtLink>
              <div class="product-card__content p-sm-2">
                <h6 class="title text-lg fw-semibold mt-12 mb-8">
                  <NuxtLink :to="`/product/${p.id}`" class="link text-line-2">{{ p.name }}</NuxtLink>
                </h6>
                <div class="product-card__price mb-8">
                  <span class="text-heading text-md fw-semibold">¥{{ Number(p.price).toFixed(2) }}</span>
                  <span v-if="p.orig_price && p.orig_price > p.price" class="text-gray-400 text-md fw-semibold text-decoration-line-through ms-8">
                    ¥{{ Number(p.orig_price).toFixed(2) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <ShippingOverviewTwo />
    <NewsletterThree />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Controller, EffectFade } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper/types";
import "swiper/css";
import "swiper/css/effect-fade";
import { initializeCountdown } from "@/utils/countdown";
import { useCartStore } from "~/stores/cart";
import { useWishlistStore } from "~/stores/wishlist";
import ProductContent from "~/components/containers/shop/ProductContent.vue";
import Breadcrumb from "~/components/layout/banner/Breadcrumb.vue";
import ShippingOverviewTwo from "~/components/containers/shipping/ShippingOverviewTwo.vue";
import NewsletterThree from "~/components/widgets/newsletter/NewsletterThree.vue";

definePageMeta({ layout: "layout-four" });

const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();
const swiperModules = [Controller, EffectFade];

interface Product {
  id: number; name: string; description?: string; price: number; orig_price?: number;
  image?: string; images?: string; stock_count: number; sales_count?: number;
  is_active?: boolean; shop_id?: number; shop?: { id: number; name: string };
  category_id?: number; category?: { id: number; name: string };
  promo_price?: number; promo_start?: string; promo_end?: string;
  is_promo_active?: boolean; effective_price?: number;
}

const product = ref<Product | null>(null);
const related = ref<Product[]>([]);
const loading = ref(true);
const qty = ref(1);
const avgRating = ref(0);
const reviewCount = ref(0);
const activeIdx = ref(0);

// Swiper refs
const thumbsSwiperRef = ref<{ $el: HTMLElement } | null>(null);
const imagesSwiperRef = ref<{ $el: HTMLElement } | null>(null);
const thumbsSwiper = ref<SwiperClass | null>(null);
const imagesSwiper = ref<SwiperClass | null>(null);

function onThumbsSwiper(sw: SwiperClass) { thumbsSwiper.value = sw; }
function onImagesSwiper(sw: SwiperClass) { imagesSwiper.value = sw; }
function onThumbnailClick(idx: number) {
  activeIdx.value = idx;
  thumbsSwiper.value?.slideTo(idx);
}

const allImages = computed<string[]>(() => {
  if (!product.value) return [];
  let extras: string[] = [];
  try { extras = JSON.parse(product.value.images || "[]").filter(Boolean); } catch { extras = []; }
  if (product.value.image && !extras.includes(product.value.image)) {
    extras = [product.value.image, ...extras];
  }
  return extras;
});

const shopName = computed(() => product.value?.shop?.name || "平台");

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

let countdownTimer: ReturnType<typeof setInterval> | null = null;

async function load() {
  loading.value = true;
  qty.value = 1;
  activeIdx.value = 0;
  product.value = null;
  try {
    product.value = await $fetch<Product>(`/api/products/${route.params.id}`, { credentials: "include" });
    // Reviews stats
    try {
      const rv = await $fetch<{ stats: { avg_rating: number; total: number } }>(`/api/products/${route.params.id}/reviews`, { credentials: "include" });
      const stats = rv?.stats;
      if (stats) {
        avgRating.value = stats.total > 0 ? stats.avg_rating : 0;
        reviewCount.value = stats.total;
      }
    } catch { /* keep defaults */ }
    // Related
    if (product.value?.category_id) {
      const r = await $fetch<{ products: Product[] }>(
        `/api/products?category_id=${product.value.category_id}&page_size=7`,
        { credentials: "include" }
      );
      related.value = (Array.isArray(r.products) ? r.products : []).filter(p => p.id !== product.value!.id).slice(0, 6);
    }
    // Countdown — 仅促销期内显示，倒计时到 promo_end
    await nextTick();
    if (countdownTimer) clearInterval(countdownTimer);
    if (product.value?.is_promo_active && product.value.promo_end) {
      countdownTimer = initializeCountdown("pd-countdown", product.value.promo_end, () => {});
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
onBeforeUnmount(() => { if (countdownTimer) clearInterval(countdownTimer); });
watch(() => route.params.id, load);
</script>

<style scoped>
.cd-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  border-radius: 6px;
  padding: 4px 10px;
  min-width: 36px;
}
.cd-block .fw-bold { font-size: 1.1rem; line-height: 1.2; }
.cd-label { font-size: 11px; color: #86909c; }
.cd-sep { font-weight: 700; color: #4a3aff; }
</style>
