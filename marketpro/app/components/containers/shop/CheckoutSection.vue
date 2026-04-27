<template>
  <section class="checkout py-80">
    <div class="container container-lg">
      <div class="row">
        <div class="col-xl-9 col-lg-8">
          <div class="border border-gray-100 rounded-8 px-30 py-20 mb-40">
            <h6 class="text-lg fw-semibold mb-24">联系方式</h6>
            <div class="mb-20">
              <label class="form-label text-gray-900 fw-medium">联系邮箱/账号</label>
              <input
                v-model="contact"
                type="text"
                class="form-control py-16 px-24 border border-gray-200 rounded-8"
                placeholder="用于接收卡密等信息"
              />
            </div>
            <div class="mb-0">
              <label class="form-label text-gray-900 fw-medium">备注（选填）</label>
              <textarea
                v-model="remark"
                class="form-control py-16 px-24 border border-gray-200 rounded-8"
                rows="2"
                placeholder="选填"
              ></textarea>
            </div>
          </div>
        </div>

        <div class="col-xl-3 col-lg-4">
          <div class="checkout-sidebar">
            <div class="bg-color-three rounded-8 p-24 text-center">
              <span class="text-gray-900 text-xl fw-semibold">订单汇总</span>
            </div>

            <div class="border border-gray-100 rounded-8 px-24 py-40 mt-24">
              <div class="mb-32 pb-32 border-bottom border-gray-100 flex-between gap-8">
                <span class="text-gray-900 fw-medium text-xl font-heading-two">商品</span>
                <span class="text-gray-900 fw-medium text-xl font-heading-two">小计</span>
              </div>

              <div v-if="cart.items.length === 0" class="text-center text-gray-400 py-16">
                购物车为空
              </div>

              <div v-for="item in cart.items" :key="item.id" class="flex-between gap-24 mb-32">
                <div class="flex-align gap-12">
                  <span
                    class="text-gray-900 fw-normal text-md font-heading-two"
                    style="
                      max-width: 120px;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                    "
                    >{{ item.name }}</span
                  >
                  <span class="text-gray-900 fw-normal text-md font-heading-two"
                    ><i class="ph-bold ph-x"></i
                  ></span>
                  <span class="text-gray-900 fw-semibold text-md font-heading-two">{{
                    item.qty
                  }}</span>
                </div>
                <span class="text-gray-900 fw-bold text-md font-heading-two"
                  >¥{{ (item.price * item.qty).toFixed(2) }}</span
                >
              </div>

              <div class="border-top border-gray-100 pt-30 mt-30">
                <div class="mb-32 flex-between gap-8">
                  <span class="text-gray-900 font-heading-two text-xl fw-semibold">合计</span>
                  <span class="text-gray-900 font-heading-two text-md fw-bold"
                    >¥{{ cart.total.toFixed(2) }}</span
                  >
                </div>
              </div>
            </div>

            <div class="mt-32">
              <div v-for="method in paymentMethods" :key="method.id" class="payment-item">
                <div class="form-check common-check common-radio py-16 mb-0">
                  <input
                    :id="method.id"
                    v-model="selectedPayment"
                    class="form-check-input"
                    type="radio"
                    name="payment"
                    :value="method.id"
                  />
                  <label class="form-check-label fw-semibold text-neutral-600" :for="method.id">
                    {{ method.label }}
                  </label>
                </div>
              </div>
            </div>

            <div v-if="errorMsg" class="alert alert-danger mt-16 py-8 px-16 rounded-8 text-sm">
              {{ errorMsg }}
            </div>

            <button
              class="btn btn-main mt-40 py-18 w-100 rounded-8 mt-56"
              :disabled="submitting || cart.items.length === 0"
              @click="placeOrder"
            >
              <span v-if="submitting">处理中...</span>
              <span v-else>确认下单</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useCartStore } from "~/stores/cart";
import { useRouter } from "vue-router";

const cart = useCartStore();
const router = useRouter();

const contact = ref("");
const remark = ref("");
const selectedPayment = ref("balance");
const submitting = ref(false);
const errorMsg = ref("");

const paymentMethods = [
  { id: "balance", label: "余额支付" },
  { id: "nodeloc", label: "NodeLoc 积分支付" },
];

async function placeOrder() {
  if (!contact.value.trim()) {
    errorMsg.value = "请填写联系方式";
    return;
  }
  if (cart.items.length === 0) {
    errorMsg.value = "购物车为空";
    return;
  }
  submitting.value = true;
  errorMsg.value = "";
  try {
    // Submit each cart item as a separate order
    const orderNos: string[] = [];
    for (const item of cart.items) {
      const res: any = await $fetch("/api/orders/create", {
        method: "POST",
        credentials: "include",
        body: {
          product_id: item.id,
          quantity: item.qty,
          contact: contact.value,
          remark: remark.value,
          pay_method: selectedPayment.value,
        },
      });
      if (res.order_no) orderNos.push(res.order_no);
      // If nodeloc payment, redirect to payment URL of first order
      if (selectedPayment.value !== "balance" && res.payment_url) {
        cart.clear();
        window.location.href = res.payment_url;
        return;
      }
    }
    cart.clear();
    // Redirect to first order detail
    if (orderNos.length > 0) {
      router.push(`/order/${orderNos[0]}`);
    } else {
      router.push("/account/orders");
    }
  } catch (e: any) {
    errorMsg.value = e?.data?.error || "下单失败，请重试";
  } finally {
    submitting.value = false;
  }
}
</script>
