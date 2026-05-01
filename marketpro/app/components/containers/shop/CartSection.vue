<template>
  <section class="cart py-80">
    <div class="container container-lg">
      <h4 class="fw-semibold mb-32">购物车</h4>

      <!-- 空购物车 -->
      <div v-if="!cart.items.length" class="text-center py-60">
        <i class="ph ph-shopping-cart d-block mb-16 text-gray-200" style="font-size:4rem"></i>
        <p class="text-gray-400 mb-24">购物车为空</p>
        <NuxtLink to="/" class="btn btn-main rounded-pill px-32 py-12">去逛逛</NuxtLink>
      </div>

      <div v-else class="row gy-4">
        <!-- 左侧：商品表格 -->
        <div class="col-lg-8">
          <div class="table-responsive">
            <table class="table table-borderless align-middle mb-0">
              <thead>
                <tr class="border-bottom border-gray-100">
                  <th class="py-16 ps-0 text-sm fw-semibold text-gray-600" style="min-width:280px">商品</th>
                  <th class="py-16 text-sm fw-semibold text-gray-600 text-center" style="width:100px">单价</th>
                  <th class="py-16 text-sm fw-semibold text-gray-600 text-center" style="width:140px">数量</th>
                  <th class="py-16 text-sm fw-semibold text-gray-600 text-center" style="width:100px">小计</th>
                  <th class="py-16 pe-0" style="width:48px"></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in cart.items"
                  :key="item.id"
                  class="border-bottom border-gray-100"
                >
                  <!-- 商品 -->
                  <td class="py-20 ps-0">
                    <div class="d-flex align-items-center gap-16">
                      <NuxtLink :to="`/product/${item.id}`" class="flex-shrink-0">
                        <div class="table-product__thumb flex-center rounded-8 border border-gray-100 bg-gray-50">
                          <img
                            :src="item.image || ''"
                            :alt="item.name"
                            style="max-width:72px;max-height:72px;object-fit:contain"
                          />
                        </div>
                      </NuxtLink>
                      <div class="min-w-0">
                        <h6 class="fw-semibold mb-4 text-sm">
                          <NuxtLink :to="`/product/${item.id}`" class="text-heading hover-text-main-600 text-line-2">
                            {{ item.name }}
                          </NuxtLink>
                        </h6>
                      </div>
                    </div>
                  </td>

                  <!-- 单价 -->
                  <td class="py-20 text-center">
                    <span class="fw-semibold text-gray-900">{{ Number(item.price).toFixed(0) }}</span>
                  </td>

                  <!-- 数量 -->
                  <td class="py-20 text-center">
                    <div class="d-flex align-items-center justify-content-center gap-0 border border-gray-200 rounded-pill overflow-hidden" style="width:fit-content;margin:0 auto">
                      <button
                        type="button"
                        class="btn-reset px-14 py-8 text-gray-600 hover-text-main-600 hover-bg-main-50 transition-1"
                        @click="cart.updateQty(item.id, item.qty - 1)"
                      >
                        <i class="ph ph-minus text-sm"></i>
                      </button>
                      <span class="px-12 py-8 fw-semibold text-sm border-start border-end border-gray-200" style="min-width:40px;text-align:center">
                        {{ item.qty }}
                      </span>
                      <button
                        type="button"
                        class="btn-reset px-14 py-8 text-gray-600 hover-text-main-600 hover-bg-main-50 transition-1"
                        @click="cart.updateQty(item.id, item.qty + 1)"
                      >
                        <i class="ph ph-plus text-sm"></i>
                      </button>
                    </div>
                  </td>

                  <!-- 小计 -->
                  <td class="py-20 text-center">
                    <span class="fw-bold text-main-600">{{ (Number(item.price) * item.qty).toFixed(0) }}</span>
                  </td>

                  <!-- 删除 -->
                  <td class="py-20 pe-0 text-center">
                    <button
                      type="button"
                      class="w-32 h-32 rounded-circle bg-danger-50 text-danger-600 flex-center border-0 hover-bg-danger-600 hover-text-white transition-1"
                      style="cursor:pointer"
                      @click="cart.remove(item.id)"
                    >
                      <i class="ph ph-trash text-sm"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- 继续购物 -->
          <div class="mt-24">
            <NuxtLink to="/shop" class="btn btn-outline-main rounded-pill px-24 py-12 text-sm">
              <i class="ph ph-arrow-left me-8"></i>继续购物
            </NuxtLink>
          </div>
        </div>

        <!-- 右侧：订单汇总 -->
        <div class="col-lg-4">
          <div class="border border-gray-100 rounded-16 p-24">
            <h6 class="fw-semibold mb-24 pb-16 border-bottom border-gray-100">订单汇总</h6>

            <div class="d-flex justify-content-between align-items-center mb-12">
              <span class="text-sm text-gray-600">商品（{{ cart.count }} 件）</span>
              <span class="text-sm fw-medium text-gray-900">{{ cart.total.toFixed(0) }} 能量</span>
            </div>
            <div class="d-flex justify-content-between align-items-center mb-12">
              <span class="text-sm text-gray-600">运费</span>
              <span class="text-sm fw-medium text-success-600">免费</span>
            </div>

            <div class="d-flex justify-content-between align-items-center pt-16 mt-16 border-top border-gray-100 mb-24">
              <span class="fw-bold text-gray-900">合计</span>
              <span class="fw-bold text-main-600 text-xl">{{ cart.total.toFixed(0) }} <span class="text-sm fw-normal text-gray-400">能量</span></span>
            </div>

            <NuxtLink
              v-if="auth.isAuthenticated"
              to="/checkout"
              class="btn btn-main w-100 py-14 rounded-pill fw-semibold"
            >
              前往结算 <i class="ph ph-arrow-right ms-8"></i>
            </NuxtLink>
            <a
              v-else
              href="/auth/login?redirect=/checkout"
              class="btn btn-main w-100 py-14 rounded-pill fw-semibold"
            >
              登录后结算
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useCartStore } from "~/stores/cart";
import { useAuthStore } from "~/stores/auth";

const cart = useCartStore();
const auth = useAuthStore();
</script>
