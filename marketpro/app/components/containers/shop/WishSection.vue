<template>
  <section class="cart py-80">
    <div class="container container-lg">
      <div class="row gy-4">
        <div class="col-lg-11">
          <div class="cart-table border border-gray-100 rounded-8">
            <div class="overflow-x-auto scroll-sm scroll-sm-horizontal">
              <table class="table rounded-8 overflow-hidden">
                <thead>
                  <tr class="border-bottom border-neutral-100">
                    <th class="h6 mb-0 text-lg fw-bold px-40 py-32 border-end border-neutral-100">
                      删除
                    </th>
                    <th class="h6 mb-0 text-lg fw-bold px-40 py-32 border-end border-neutral-100">
                      商品名称
                    </th>
                    <th class="h6 mb-0 text-lg fw-bold px-40 py-32 border-end border-neutral-100">
                      单价
                    </th>
                    <th class="h6 mb-0 text-lg fw-bold px-40 py-32 border-end border-neutral-100">
                      库存状态
                    </th>
                    <th class="h6 mb-0 text-lg fw-bold px-40 py-32"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in wishlist.items" :key="item.id">
                    <td class="px-40 py-32 border-end border-neutral-100">
                      <button
                        type="button"
                        class="remove-tr-btn flex-align gap-12 hover-text-danger-600"
                        @click="wishlist.remove(item.id)"
                      >
                        <i class="ph ph-x-circle text-2xl d-flex"></i> 移除
                      </button>
                    </td>
                    <td class="px-40 py-32 border-end border-neutral-100">
                      <div class="table-product d-flex align-items-center gap-24">
                        <NuxtLink
                          :to="`/product/${item.id}`"
                          class="table-product__thumb border border-gray-100 rounded-8 flex-center"
                        >
                          <NuxtImg v-if="item.image" :src="item.image" :alt="item.name" />
                          <span v-else class="text-gray-400 text-sm px-8">无图</span>
                        </NuxtLink>
                        <div class="table-product__content text-start">
                          <h6 class="title text-lg fw-semibold mb-8">
                            <NuxtLink
                              :to="`/product/${item.id}`"
                              class="link text-line-2"
                              tabindex="0"
                              >{{ item.name }}</NuxtLink
                            >
                          </h6>
                        </div>
                      </div>
                    </td>
                    <td class="px-40 py-32 border-end border-neutral-100">
                      <span class="text-lg h6 mb-0 fw-semibold"><i class="ph-fill ph-lightning-a" style="font-size:0.85em;vertical-align:middle;margin-right:1px"></i>{{ item.price.toFixed(2) }}</span>
                    </td>
                    <td class="px-40 py-32 border-end border-neutral-100">
                      <span class="text-lg h6 mb-0 fw-semibold">{{
                        item.stock > 0 ? "有货" : "缺货"
                      }}</span>
                    </td>
                    <td class="px-40 py-32">
                      <button
                        type="button"
                        class="btn btn-main-two rounded-8 px-64"
                        @click="addToCart(item)"
                      >
                        加入购物车 <i class="ph ph-shopping-cart"></i>
                      </button>
                    </td>
                  </tr>
                  <tr v-if="wishlist.items.length === 0">
                    <td colspan="5" class="text-center py-32 text-gray-400">收藏夹为空</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useWishlistStore } from "~/stores/wishlist";
import { useCartStore } from "~/stores/cart";

const wishlist = useWishlistStore();
const cart = useCartStore();

function addToCart(item: {
  id: number;
  name: string;
  price: number;
  image: string;
  stock: number;
}) {
  cart.add({
    id: item.id,
    name: item.name,
    price: item.price,
    image: item.image,
    stock_count: item.stock,
  });
}
</script>
