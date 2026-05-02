<template>
  <div class="short-product pt-80" data-aos="fade-up" data-aos-duration="600">
    <div class="container container-lg">
      <div class="row gy-4">
        <ShortCard title="最新商品" :products="latestShortProducts" />
        <ShortCard title="热销商品" :products="topShortProducts" />
        <ShortCard title="特价商品" :products="saleShortProducts" />

        <div class="col-xxl-3 col-lg-4 col-sm-6">
          <div class="product-card h-100 p-24 pt-32 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">

            <template v-if="dealsProduct">
              <!-- 收藏按钮 -->
              <button type="button" class="wishlist-btn-two" @click="toggleWishlist">
                <i class="ph-bold ph-heart"></i>
              </button>

              <div class="mb-12">
                <h6 class="position-relative mb-4 pb-0 d-inline-block">Deals of the week</h6>
                <p class="text-neutral-300 fw-medium text-sm">Don't miss this opportunity at a special</p>
              </div>

              <NuxtLink :to="`/product/${dealsProduct.id}`"
                class="product-card__thumb flex-center overflow-hidden d-block mb-16">
                <img :src="dealsProduct.image || '/images/thumbs/product-img26.png'"
                  :alt="dealsProduct.name"
                  style="max-height:180px;object-fit:contain;width:100%" />
              </NuxtLink>

              <div class="product-card__content w-100">
                <!-- 评分/销量 -->
                <div class="flex-align gap-4 mb-8">
                  <template v-if="dealsAvgRating > 0">
                    <span class="text-xs fw-bold text-gray-500">{{ dealsAvgRating.toFixed(1) }}</span>
                    <span class="text-15 fw-bold text-warning-600 d-flex"><i class="ph-fill ph-star"></i></span>
                    <span class="text-xs fw-bold text-gray-500">({{ dealsReviewCount }})</span>
                  </template>
                  <span v-else class="text-xs fw-medium text-gray-500">{{ dealsProduct.sales_count || 0 }} Sold</span>
                </div>

                <!-- 价格 -->
                <div class="d-flex align-items-center gap-12 mt-6">
                  <h6 class="text-danger-600 mb-0 text-lg">
                    <i class="ph-fill ph-lightning-a" style="font-size:0.85em;vertical-align:middle;margin-right:1px"></i>{{ dealsProduct.is_promo_active ? dealsProduct.promo_price : dealsProduct.price }}
                  </h6>
                  <h6 v-if="dealsProduct.orig_price > dealsProduct.price"
                    class="text-neutral-300 fw-medium mb-0 text-lg text-decoration-line-through">
                    <i class="ph-fill ph-lightning-a" style="font-size:0.85em;vertical-align:middle;margin-right:1px"></i>{{ dealsProduct.orig_price }}
                  </h6>
                </div>

                <!-- 商品名 -->
                <h6 class="title text-md fw-semibold mt-10 mb-0">
                  <NuxtLink :to="`/product/${dealsProduct.id}`" class="link text-line-2 fw-bold">
                    {{ dealsProduct.name }}
                  </NuxtLink>
                </h6>

                <p class="text-gray-500 text-sm mt-12 pb-12 border-bottom border-neutral-100 mb-8">
                  库存剩余 {{ dealsProduct.stock_count }} 件
                </p>

                <!-- 进度条 -->
                <div class="progress w-100 bg-gray-100 rounded-pill h-8" role="progressbar"
                  :aria-valuenow="dealsSoldPct" aria-valuemin="0" aria-valuemax="100">
                  <div class="progress-bar bg-success-600 rounded-pill" :style="{ width: dealsSoldPct + '%' }"></div>
                </div>
                <div class="d-flex align-items-center gap-6 mt-6">
                  <span class="text-gray-900 text-xs fw-medium">Sold: {{ dealsProduct.sales_count || 0 }}</span>
                </div>

                <NuxtLink :to="`/product/${dealsProduct.id}`"
                  class="product-card__cart btn bg-success-600 text-white hover-bg-success-700 hover-text-white py-11 px-24 rounded-pill flex-align gap-8 mt-16 w-100 justify-content-center">
                  立即购买 <i class="ph ph-shopping-cart"></i>
                </NuxtLink>
              </div>
            </template>

            <!-- 未设置时 -->
            <template v-else>
              <button type="button" class="wishlist-btn-two"><i class="ph-bold ph-heart"></i></button>
              <div class="mb-12">
                <h6 class="position-relative mb-4 d-inline-block">Deals of the week</h6>
                <p class="text-neutral-300 fw-medium text-sm">Don't miss this opportunity at a special</p>
              </div>
              <div class="flex-center py-40 text-gray-200">
                <i class="ph ph-package" style="font-size:4rem"></i>
              </div>
              <NuxtLink to="/shop"
                class="btn bg-success-600 text-white hover-bg-success-700 py-11 px-24 rounded-pill flex-align gap-8 mt-16 w-100 justify-content-center">
                浏览全部商品 <i class="ph ph-arrow-right"></i>
              </NuxtLink>
            </template>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import ShortCard from "~/components/widgets/shop/ShortCard.vue";
import { useHomeData } from "~/composables/useHomeData";

const { products: apiProducts, topProducts, fetchAll } = useHomeData();

const dealsProduct = ref<any>(null);
const dealsAvgRating = ref(0);
const dealsReviewCount = ref(0);
const isWishlisted = ref(false);
const toggleWishlist = () => { isWishlisted.value = !isWishlisted.value; };

const dealsSoldPct = computed(() => {
  if (!dealsProduct.value) return 0;
  const p = dealsProduct.value;
  const total = (p.sales_count || 0) + (p.stock_count || 0);
  if (!total) return 0;
  return Math.min(Math.round(((p.sales_count || 0) / total) * 100), 100);
});

function toShortProduct(p: ReturnType<typeof apiProducts.value[number]>) {
  const op = p as any;
  return {
    id: op.id,
    imgSrc: op.image || "/images/thumbs/product-img26.png",
    imgAlt: op.name,
    rating: op.avg_rating ?? 0,
    ratingCount: op.review_count ?? op.sales_count ?? 0,
    title: op.name,
    priceCurrent: `<i class="ph-fill ph-lightning-a" style="font-size:0.85em;vertical-align:middle;margin-right:1px"></i>${Number(op.price).toFixed(2)}`,
    priceOld: op.orig_price > op.price ? `<i class="ph-fill ph-lightning-a" style="font-size:0.85em;vertical-align:middle;margin-right:1px"></i>${Number(op.orig_price).toFixed(2)}` : undefined,
  };
}

const latestShortProducts = computed(() => apiProducts.value.slice(0, 8).map(toShortProduct));
const topShortProducts = computed(() => topProducts.value.slice(0, 8).map(toShortProduct));
const saleShortProducts = computed(() =>
  apiProducts.value.filter(p => p.orig_price > p.price).slice(0, 8).map(toShortProduct)
);

onMounted(async () => {
  await fetchAll();
  try {
    const res = await $fetch<any>("/api/deals-of-week");
    dealsProduct.value = res.product || null;
    dealsAvgRating.value = res.avg_rating ?? 0;
    dealsReviewCount.value = res.review_count ?? 0;
  } catch { /* ignore */ }
});
</script>
