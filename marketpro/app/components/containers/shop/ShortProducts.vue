<template>
  <div class="short-product pt-80" data-aos="fade-up" data-aos-duration="600">
    <div class="container container-lg">
      <div class="row gy-4">
        <ShortCard title="最新商品" :products="latestShortProducts" />
        <ShortCard title="热销商品" :products="topShortProducts" />
        <ShortCard title="特价商品" :products="saleShortProducts" />

        <div class="col-xxl-3 col-lg-4 col-sm-6">
          <div
            class="product-card h-100 p-24 pt-32 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2 group-item pt-32"
          >
            <button
              type="button"
              class="wishlist-btn-two"
              :class="{ active: isWishlisted }"
              @click="toggleWishlist"
            >
              <i class="ph-bold ph-heart"></i>
            </button>

            <div class="">
              <h6 class="position-relative mb-0 pb-12 d-inline-block">Deals of the week</h6>
              <div id="countdown26" class="countdown mb-10">
                <ul class="countdown-list flex-align flex-wrap">
                  <li
                    class="countdown-list__item colon-red py-8 px-12 flex-align gap-4 text-sm fw-medium box-shadow-4xl rounded-5 bg-main-600 text-white"
                  >
                    <span class="days"></span> D
                  </li>
                  <li
                    class="countdown-list__item colon-red py-8 px-12 flex-align gap-4 text-sm fw-medium box-shadow-4xl rounded-5 bg-main-600 text-white"
                  >
                    <span class="hours"></span> H
                  </li>
                  <li
                    class="countdown-list__item colon-red py-8 px-12 flex-align gap-4 text-sm fw-medium box-shadow-4xl rounded-5 bg-main-600 text-white"
                  >
                    <span class="minutes"></span> M
                  </li>
                  <li
                    class="countdown-list__item colon-red py-8 px-12 flex-align gap-4 text-sm fw-medium box-shadow-4xl rounded-5 bg-main-600 text-white"
                  >
                    <span class="seconds"></span> S
                  </li>
                </ul>
              </div>
              <p class="text-neutral-300 fw-medium text-sm">
                Don't miss this opportunity at a special
              </p>
            </div>

            <NuxtLink to="product-details" class="product-card__thumb flex-center overflow-hidden">
              <NuxtImg src="/images/thumbs/product-img32.png" alt="" />
            </NuxtLink>
            <div class="product-card__content w-100">
              <div class="flex-align gap-4">
                <div class="flex-align gap-2 me-4">
                  <span class="text-12 fw-medium text-warning-600 d-flex"
                    ><i class="ph-fill ph-star"></i
                  ></span>
                  <span class="text-12 fw-medium text-warning-600 d-flex"
                    ><i class="ph-fill ph-star"></i
                  ></span>
                  <span class="text-12 fw-medium text-warning-600 d-flex"
                    ><i class="ph-fill ph-star"></i
                  ></span>
                  <span class="text-12 fw-medium text-warning-600 d-flex"
                    ><i class="ph-fill ph-star"></i
                  ></span>
                  <span class="text-12 fw-medium text-warning-600 d-flex"
                    ><i class="ph-fill ph-star"></i
                  ></span>
                </div>
                <span class="text-xs fw-medium text-heading">(3)</span>
              </div>
              <div class="d-flex align-items-center gap-12 mt-6">
                <h6 class="text-danger-600 mb-0 text-lg">$60.99</h6>
                <h6 class="text-neutral-300 fw-medium mb-0 text-lg">$79.99</h6>
              </div>

              <h6 class="title text-md fw-semibold mt-10 mb-0">
                <NuxtLink to="/product-details" class="link text-line-2 fw-bold"
                  >Perfectly Packed Meat Combos for Delicious and Flavorful Meals Every
                  Day</NuxtLink
                >
              </h6>
              <p class="text-gray-500 text-sm mt-12 pb-12 border-bottom border-neutral-100 mb-8">
                This product is about to run out
              </p>

              <div
                class="progress w-100 bg-gray-100 rounded-pill h-8"
                role="progressbar"
                aria-label="Basic example"
                aria-valuenow="35"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <div class="progress-bar bg-success-600 rounded-pill" style="width: 35%"></div>
              </div>
              <div class="d-flex align-items-center gap-6 mt-6">
                <span class="text-sm text-gray-500">available only:</span>
                <h6 class="text-danger-600 mb-0 text-md fw-semibold">$60.99</h6>
              </div>
              <NuxtLink
                to="/cart"
                class="product-card__cart btn bg-success-600 text-white hover-bg-success-700 hover-text-white py-11 px-24 rounded-pill flex-align gap-8 mt-16 w-100 justify-content-center"
              >
                Add To Cart <i class="ph ph-shopping-cart"></i>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, computed } from "vue";
import { initializeCountdown } from "@/utils/countdown";
import ShortCard from "~/components/widgets/shop/ShortCard.vue";
import { useHomeData } from "~/composables/useHomeData";

const isWishlisted = ref(false);
const toggleWishlist = () => { isWishlisted.value = !isWishlisted.value; };

const { products: apiProducts, topProducts, fetchAll } = useHomeData();

function toShortProduct(p: ReturnType<typeof apiProducts.value[number]>) {
  const op = p as any;
  return {
    id: op.id,
    imgSrc: op.image || "/images/thumbs/product-img26.png",
    imgAlt: op.name,
    rating: 4.8,
    ratingCount: op.sales_count || 0,
    title: op.name,
    priceCurrent: `¥${Number(op.price).toFixed(2)}`,
    priceOld: op.orig_price > op.price ? `¥${Number(op.orig_price).toFixed(2)}` : undefined,
  };
}

const latestShortProducts = computed(() => apiProducts.value.slice(0, 8).map(toShortProduct));
const topShortProducts = computed(() => topProducts.value.slice(0, 8).map(toShortProduct));
const saleShortProducts = computed(() =>
  apiProducts.value.filter(p => p.orig_price > p.price).slice(0, 8).map(toShortProduct)
);

const intervalId = ref<ReturnType<typeof setInterval> | null>(null);

onMounted(async () => {
  await fetchAll();
  intervalId.value = initializeCountdown("countdown26", "2027-12-30T23:59:59", () => {});
});

onBeforeUnmount(() => {
  if (intervalId.value) clearInterval(intervalId.value);
});
</script>
