<template>
  <section class="new-arrival-three py-120 overflow-hidden">
    <div class="container container-lg">
      <div class="section-heading text-center" data-aos="zoom-in" data-aos-duration="600">
        <h5 class="mb-0 text-uppercase" data-aos="zoom-in" data-aos-duration="600">New Arrivals</h5>
      </div>

      <ul
        id="pills-tabThree"
        class="nav common-tab style-two nav-pills justify-content-center mb-40"
        role="tablist"
        data-aos="zoom-in"
        data-aos-duration="600"
      >
        <li v-for="(tab, index) in tabs" :key="tab.id" class="nav-item" role="presentation">
          <button
            :id="`pills-${tab.id}-tab`"
            class="nav-link"
            :class="{ active: index === 0 }"
            type="button"
            role="tab"
            data-bs-toggle="pill"
            :data-bs-target="`#pills-${tab.id}`"
            :aria-controls="`pills-${tab.id}`"
            :aria-selected="index === 0 ? 'true' : 'false'"
          >
            {{ tab.label }}
          </button>
        </li>
      </ul>

      <div id="pills-tabContentThree" class="tab-content">
        <div
          v-for="(tab, index) in tabs"
          :id="`pills-${tab.id}`"
          :key="tab.id"
          class="tab-pane fade"
          :class="{ show: index === 0, active: index === 0 }"
          role="tabpanel"
          :aria-labelledby="`pills-${tab.id}-tab`"
          tabindex="0"
        >
          <div v-if="getFirstRow(tab)" class="new-arrival-three-wrapper">
            <div class="row gy-4">
              <div class="col-xl-4">
                <div
                  class="rounded-24 overflow-hidden border border-main-two-600 p-16 bg-color-three h-100"
                  data-aos="zoom-in"
                  data-aos-duration="800"
                >
                  <div
                    class="bg-img w-100 h-100 min-h-485 rounded-24 overflow-hidden"
                    :style="`background-image: url(${getFirstRow(tab)?.promo.promoImage})`"
                  >
                    <div class="py-32 pe-32 text-end">
                      <span class="text-uppercase fw-semibold text-neutral-600 text-md">
                        {{ getFirstRow(tab)?.promo.promoTitle }}
                      </span>
                      <h5 class="mb-0">{{ getFirstRow(tab)?.promo.promoSubTitle }}</h5>
                      <NuxtLink
                        :to="getFirstRow(tab)?.promo.promoLink"
                        class="btn btn-black rounded-pill gap-8 mt-32 flex-align d-inline-flex"
                        tabindex="0"
                      >
                        Shop Now
                        <span class="text-xl d-flex">
                          <i class="ph ph-shopping-cart-simple"></i>
                        </span>
                      </NuxtLink>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-xl-8">
                <div class="row gy-4">
                  <div
                    v-for="product in getFirstRow(tab)?.products ?? []"
                    :key="product.id"
                    class="col-lg-4 col-sm-6"
                    data-aos="fade-up"
                    data-aos-duration="400"
                  >
                    <div
                      class="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2"
                    >
                      <div class="product-card__thumb rounded-8 bg-gray-50 position-relative">
                        <NuxtLink :to="product.link" class="w-100 h-100 flex-center">
                          <img :src="product.imgSrc" alt="" class="w-auto max-w-unset" />
                        </NuxtLink>
                        <div
                          class="position-absolute inset-block-start-0 inset-inline-start-0 mt-16 ms-16 z-1 d-flex flex-column gap-8"
                        >
                          <span
                            v-if="product.discount"
                            class="text-main-two-600 w-40 h-40 d-flex justify-content-center align-items-center bg-white rounded-circle shadow-sm text-xs fw-semibold"
                            >{{ product.discount }}</span
                          >
                          <span
                            v-if="product.badge"
                            class="text-neutral-600 w-40 h-40 d-flex justify-content-center align-items-center bg-white rounded-circle shadow-sm text-xs fw-semibold"
                            >{{ product.badge }}</span
                          >
                        </div>

                        <div
                          class="bg-white p-2 rounded-pill z-1 position-absolute inset-inline-end-0 inset-block-start-0 me-16 mt-16 shadow-sm"
                        >
                          <button
                            type="button"
                            class="expand-btn w-40 h-40 text-md d-flex justify-content-center align-items-center rounded-circle hover-bg-main-two-600 hover-text-white"
                            :class="{ 'bg-main-two-600 text-white': expandedState[product.id] }"
                            @click="toggleExpand(product.id)"
                          >
                            <i :class="expandedState[product.id] ? 'ph ph-x' : 'ph ph-plus'"></i>
                          </button>
                          <div
                            class="expand-icons gap-20 my-20"
                            :class="{ 'd-flex': expandedState[product.id] }"
                          >
                            <button
                              type="button"
                              class="text-neutral-600 text-xl flex-center hover-text-main-two-600 wishlist-btn"
                              @click="toggleWishlist(product.id)"
                            >
                              <i
                                :class="
                                  wishlistState[product.id]
                                    ? 'ph-fill ph-heart text-main-two-600'
                                    : 'ph ph-heart'
                                "
                              ></i>
                            </button>
                            <button
                              type="button"
                              class="text-neutral-600 text-xl flex-center hover-text-main-two-600"
                            >
                              <i class="ph ph-eye"></i>
                            </button>
                            <button
                              type="button"
                              class="text-neutral-600 text-xl flex-center hover-text-main-two-600"
                            >
                              <i class="ph ph-shuffle"></i>
                            </button>
                          </div>
                        </div>
                      </div>

                      <div class="product-card__content mt-16 w-100">
                        <h6 class="title text-lg fw-semibold my-16">
                          <NuxtLink :to="product.link" class="link text-line-2" tabindex="0">
                            {{ product.title }}
                          </NuxtLink>
                        </h6>

                        <div class="flex-align gap-6">
                          <div class="flex-align gap-8">
                            <span
                              v-for="star in 5"
                              :key="star"
                              class="text-xs fw-medium"
                              :class="
                                star <= Math.floor(product.rating)
                                  ? 'text-warning-600 d-flex ph-fill ph-star'
                                  : 'text-gray-300'
                              "
                            >
                              <i class="ph-fill ph-star"></i>
                            </span>
                          </div>
                          <span class="text-xs fw-medium text-gray-500">{{
                            product.rating.toFixed(1)
                          }}</span>
                          <span class="text-xs fw-medium text-gray-500">
                            ({{ product.ratingCount }})
                          </span>
                        </div>

                        <span
                          v-if="product.fulfilledBy"
                          class="py-2 px-8 text-xs rounded-pill text-main-two-600 bg-main-two-50 mt-16"
                        >
                          {{ product.fulfilledBy }}
                        </span>

                        <div class="product-card__price mt-16 mb-30">
                          <span
                            v-if="product.oldPrice"
                            class="text-gray-400 text-md fw-semibold text-decoration-line-through"
                          >
                            {{ product.oldPrice }}
                          </span>
                          <span class="text-heading text-md fw-semibold">
                            {{ product.price }}
                            <span class="text-gray-500 fw-normal">/Qty</span>
                          </span>
                        </div>

                        <NuxtLink
                          to="/cart"
                          class="product-card__cart btn bg-gray-50 text-heading hover-bg-main-600 hover-text-white py-11 px-24 rounded-8 flex-center gap-8 fw-medium"
                          tabindex="0"
                        >
                          Add To Cart <i class="ph ph-shopping-cart"></i>
                        </NuxtLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="getSecondRow(tab)" class="mt-24">
            <div class="row gy-4">
              <div class="col-xl-8">
                <div class="row gy-4">
                  <div
                    v-for="product in getSecondRow(tab)?.products ?? []"
                    :key="product.id"
                    class="col-lg-4 col-sm-6"
                    data-aos="fade-up"
                    data-aos-duration="400"
                  >
                    <div
                      class="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2"
                    >
                      <div class="product-card__thumb rounded-8 bg-gray-50 position-relative">
                        <NuxtLink :to="product.link" class="w-100 h-100 flex-center">
                          <img :src="product.imgSrc" alt="" class="w-auto max-w-unset" />
                        </NuxtLink>
                        <div
                          class="position-absolute inset-block-start-0 inset-inline-start-0 mt-16 ms-16 z-1 d-flex flex-column gap-8"
                        >
                          <span
                            v-if="product.discount"
                            class="text-main-two-600 w-40 h-40 d-flex justify-content-center align-items-center bg-white rounded-circle shadow-sm text-xs fw-semibold"
                          >
                            {{ product.discount }}
                          </span>
                          <span
                            v-if="product.badge"
                            class="text-neutral-600 w-40 h-40 d-flex justify-content-center align-items-center bg-white rounded-circle shadow-sm text-xs fw-semibold"
                          >
                            {{ product.badge }}
                          </span>
                        </div>

                        <div
                          class="bg-white p-2 rounded-pill z-1 position-absolute inset-inline-end-0 inset-block-start-0 me-16 mt-16 shadow-sm"
                        >
                          <button
                            type="button"
                            class="expand-btn w-40 h-40 text-md d-flex justify-content-center align-items-center rounded-circle hover-bg-main-two-600 hover-text-white"
                            :class="{ 'bg-main-two-600 text-white': expandedState[product.id] }"
                            @click="toggleExpand(product.id)"
                          >
                            <i :class="expandedState[product.id] ? 'ph ph-x' : 'ph ph-plus'"></i>
                          </button>
                          <div
                            class="expand-icons gap-20 my-20"
                            :class="{ 'd-flex': expandedState[product.id] }"
                          >
                            <button
                              type="button"
                              class="text-neutral-600 text-xl flex-center hover-text-main-two-600 wishlist-btn"
                              @click="toggleWishlist(product.id)"
                            >
                              <i
                                :class="
                                  wishlistState[product.id]
                                    ? 'ph-fill ph-heart text-main-two-600'
                                    : 'ph ph-heart'
                                "
                              ></i>
                            </button>
                            <button
                              type="button"
                              class="text-neutral-600 text-xl flex-center hover-text-main-two-600"
                            >
                              <i class="ph ph-eye"></i>
                            </button>
                            <button
                              type="button"
                              class="text-neutral-600 text-xl flex-center hover-text-main-two-600"
                            >
                              <i class="ph ph-shuffle"></i>
                            </button>
                          </div>
                        </div>
                      </div>

                      <div class="product-card__content mt-16 w-100">
                        <h6 class="title text-lg fw-semibold my-16">
                          <NuxtLink :to="product.link" class="link text-line-2" tabindex="0">
                            {{ product.title }}
                          </NuxtLink>
                        </h6>

                        <div class="flex-align gap-6">
                          <div class="flex-align gap-8">
                            <span
                              v-for="star in 5"
                              :key="star"
                              class="text-xs fw-medium"
                              :class="
                                star <= Math.floor(product.rating)
                                  ? 'text-warning-600 d-flex ph-fill ph-star'
                                  : 'text-gray-300'
                              "
                            >
                              <i class="ph-fill ph-star"></i>
                            </span>
                          </div>
                          <span class="text-xs fw-medium text-gray-500">{{
                            product.rating.toFixed(1)
                          }}</span>
                          <span class="text-xs fw-medium text-gray-500"
                            >({{ product.ratingCount }})</span
                          >
                        </div>

                        <span
                          v-if="product.fulfilledBy"
                          class="py-2 px-8 text-xs rounded-pill text-main-two-600 bg-main-two-50 mt-16"
                        >
                          {{ product.fulfilledBy }}
                        </span>

                        <div class="product-card__price mt-16 mb-30">
                          <span
                            v-if="product.oldPrice"
                            class="text-gray-400 text-md fw-semibold text-decoration-line-through"
                          >
                            {{ product.oldPrice }}
                          </span>
                          <span class="text-heading text-md fw-semibold">
                            {{ product.price }}
                            <span class="text-gray-500 fw-normal">/Qty</span>
                          </span>
                        </div>

                        <NuxtLink
                          to="/cart"
                          class="product-card__cart btn bg-gray-50 text-heading hover-bg-main-600 hover-text-white py-11 px-24 rounded-8 flex-center gap-8 fw-medium"
                          tabindex="0"
                        >
                          Add To Cart <i class="ph ph-shopping-cart"></i>
                        </NuxtLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-4" data-aos="zoom-in" data-aos-duration="800">
                <div
                  class="rounded-24 overflow-hidden border border-main-two-600 p-16 bg-color-three h-100"
                >
                  <div
                    class="bg-img w-100 h-100 min-h-485 rounded-24 overflow-hidden"
                    :style="`background-image: url(${getSecondRow(tab)?.promo.promoImage})`"
                  >
                    <div class="py-32 pe-32 text-end">
                      <span class="text-uppercase fw-semibold text-neutral-600 text-sm">
                        {{ getSecondRow(tab)?.promo.promoTitle }}
                      </span>
                      <h5 class="mb-0 text-white fw-medium">
                        {{ getSecondRow(tab)?.promo.promoSubTitle }}
                      </h5>
                      <NuxtLink
                        :to="getSecondRow(tab)?.promo.promoLink"
                        class="btn btn-black rounded-pill gap-8 mt-32 flex-align d-inline-flex"
                        tabindex="0"
                      >
                        Shop Now
                        <span class="text-xl d-flex">
                          <i class="ph ph-shopping-cart-simple"></i>
                        </span>
                      </NuxtLink>
                    </div>

                    <div
                      class="bg-neutral-600 rounded-circle p-lg-5 p-md-4 p--24 max-w-260 max-h-260 w-100 h-100 ms-auto"
                    >
                      <div
                        class="bg-white bg-opacity-10 w-100 h-100 rounded-circle d-flex justify-content-center align-items-center"
                      >
                        <h3 class="text-white mb-0 fw-medium">
                          45% <br />
                          Off
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="text-center text-muted py-50">
            No products available in this category.
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import type { TabCategory, ProductRow } from "~/data/new-arrival-three";
import { tabCategories } from "~/data/new-arrival-three";

const tabs = ref<TabCategory[]>(tabCategories);

const expandedState = reactive<Record<string, boolean>>({});
const wishlistState = reactive<Record<string, boolean>>({});

function toggleExpand(productId: string) {
  expandedState[productId] = !expandedState[productId];
}

function toggleWishlist(productId: string) {
  wishlistState[productId] = !wishlistState[productId];
}

function getFirstRow(tab: TabCategory): ProductRow | undefined {
  return tab.rows.length > 0 ? tab.rows[0] : undefined;
}
function getSecondRow(tab: TabCategory): ProductRow | undefined {
  return tab.rows.length > 1 ? tab.rows[1] : undefined;
}
</script>
