<template>
  <section
    class="trending-productss pt-80 overflow-hidden"
    data-aos="fade-up"
    data-aos-duration="600"
  >
    <div class="container container-lg">
      <div class="border border-gray-100 p-24 rounded-16">
        <div class="section-heading mb-24">
          <div class="flex-between flex-wrap gap-8">
            <h6 class="mb-0" data-aos="fade-left" data-aos-duration="600">Trending Products</h6>
            <ul
              class="nav common-tab style-two nav-pills"
              data-aos="fade-right"
              data-aos-duration="600"
              role="tablist"
            >
              <li
                v-for="tab in trendingProductTabs"
                :key="tab.id"
                class="nav-item"
                role="presentation"
              >
                <button
                  :class="[
                    'nav-link fw-medium text-sm hover-border-main-600',
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
        </div>

        <div class="rounded-16 overflow-hidden flex-between position-relative mb-24">
          <img
            src="/images/bg/trending-products-bg-gradient.png"
            alt=""
            class="banner-img position-absolute inset-block-start-0 inset-inline-start-0 w-100 h-100 z-n1 object-fit-cover rounded-24"
          />
          <img
            src="/images/thumbs/trending-products-img1.png"
            alt=""
            class="d-xl-block d-none ps-xxl-5 ps-md-4"
            data-aos="zoom-in"
            data-aos-duration="800"
          />
          <div
            class="trending-products-box__content px-4 d-block w-100 text-center py-72"
            data-aos="zoom-in"
            data-aos-duration="600"
          >
            <h5 class="mb-0 trending-products-box__title text-white fw-semibold">
              Laptop Pro 20% off All Time On Order Now $980
            </h5>
          </div>
          <img
            src="/images/thumbs/trending-products-img2.png"
            alt=""
            class="d-xl-block d-none pe-xxl-5 me-xxl-5 pe-md-4"
            data-aos="zoom-in"
            data-aos-duration="800"
          />
        </div>
        <div class="tab-content position-relative">
          <transition name="fade-slide" mode="out-in">
            <div
              v-if="activeTabContent"
              :key="activeTab"
              class="tab-pane fade show active"
              role="tabpanel"
              tabindex="0"
            >
              <div class="row g-12">
                <div
                  v-for="product in activeTabContent.products"
                  :key="product.id"
                  class="col-xxl-2 col-xl-3 col-lg-4 col-sm-6"
                >
                  <div
                    class="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2"
                  >
                    <NuxtLink
                      :to="product.link"
                      class="product-card__thumb flex-center rounded-8 bg-gray-50 position-relative"
                    >
                      <span
                        v-if="product.badge"
                        class="product-card__badge bg-success-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0"
                      >
                        {{ product.badge }}
                      </span>
                      <img
                        :src="product.imageSrc"
                        :alt="product.title"
                        class="w-auto max-w-unset"
                      />
                    </NuxtLink>
                    <div class="product-card__content mt-16">
                      <span
                        v-if="product.discountLabel"
                        class="text-success-600 bg-success-50 text-sm fw-medium py-4 px-8"
                      >
                        {{ product.discountLabel }}
                      </span>
                      <h6 class="title text-lg fw-semibold my-16">
                        <NuxtLink :to="product.link" class="link text-line-2" tabindex="0">
                          {{ product.title }}
                        </NuxtLink>
                      </h6>
                      <div class="flex-align gap-6">
                        <div class="flex-align gap-2">
                          <span
                            v-for="star in 5"
                            :key="star"
                            class="text-xs fw-medium text-warning-600 d-flex"
                          >
                            <i
                              class="ph-fill ph-star"
                              :class="star <= product.rating ? 'filled' : ''"
                            ></i>
                          </span>
                        </div>
                        <span class="text-xs fw-medium text-gray-500">{{
                          product.rating.toFixed(1)
                        }}</span>
                        <span class="text-xs fw-medium text-gray-500"
                          >({{ product.reviewsCount }})</span
                        >
                      </div>
                      <span
                        class="py-2 px-8 text-xs rounded-pill text-main-two-600 bg-main-two-50 mt-16 fw-normal"
                      >
                        Fulfilled by {{ product.fulfilledBy }}
                      </span>
                      <div class="product-card__price mt-16 mb-30">
                        <span
                          v-if="product.oldPrice"
                          class="text-gray-400 text-md fw-semibold text-decoration-line-through"
                        >
                          ${{ product.oldPrice.toFixed(2) }}
                        </span>
                        <span class="text-heading text-md fw-semibold">
                          ${{ product.price.toFixed(2) }}
                          <span class="text-gray-500 fw-normal">/Qty</span>
                        </span>
                      </div>
                      <span class="text-neutral-600 text-xs fw-medium">
                        Delivered by
                        <span class="text-main-600">{{ product.deliveryDate }}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { trendingProductTabs } from "~/data/trending-products-two";

const activeTab = ref(trendingProductTabs[0]?.id ?? "");

const activeTabContent = computed(() =>
  trendingProductTabs.find(tab => tab.id === activeTab.value)
);

function selectTab(tabId: string) {
  activeTab.value = tabId;
}
</script>
