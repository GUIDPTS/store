<template>
  <section class="checkout py-80">
    <div class="container container-lg">
      <div class="row">
        <div class="col-xl-9 col-lg-8">
          <div class="border border-gray-100 rounded-8 px-30 py-20 mb-40">
            <!-- 用户信息（只读） -->
            <h6 class="text-lg fw-semibold mb-16">下单账号</h6>
            <div class="d-flex align-items-center gap-16 p-16 bg-gray-50 rounded-8 mb-20">
              <img v-if="auth.user?.avatar_url" :src="auth.user.avatar_url"
                class="rounded-circle" style="width:44px;height:44px;object-fit:cover;flex-shrink:0" />
              <div v-else class="rounded-circle bg-main-50 d-flex align-items-center justify-content-center flex-shrink-0"
                style="width:44px;height:44px">
                <i class="ph ph-user text-main-600 fs-5"></i>
              </div>
              <div>
                <div class="fw-semibold text-gray-900">{{ auth.user?.username }}</div>
                <div v-if="auth.user?.email" class="text-sm text-gray-500 mt-2">
                  <i class="ph ph-envelope me-4"></i>{{ auth.user.email }}
                </div>
                <div v-if="auth.user?.name && auth.user.name !== auth.user.username"
                  class="text-sm text-gray-500 mt-2">
                  <i class="ph ph-identification-card me-4"></i>{{ auth.user.name }}
                </div>
              </div>
            </div>
            <div class="mb-20">
              <label class="form-label text-gray-900 fw-medium">备注（选填）</label>
              <textarea
                v-model="remark"
                class="form-control py-16 px-24 border border-gray-200 rounded-8"
                rows="2"
                placeholder="如有特殊说明可填写"
              ></textarea>
            </div>

            <!-- 优惠券 -->
            <div class="mb-0">
              <label class="form-label text-gray-900 fw-medium">优惠券码</label>
              <div class="d-flex gap-8">
                <input
                  v-model="couponCode"
                  type="text"
                  class="form-control py-12 px-16 border border-gray-200 rounded-8 text-uppercase"
                  placeholder="输入优惠券码"
                  :disabled="!!appliedCoupon"
                  style="flex:1"
                />
                <button
                  v-if="!appliedCoupon"
                  type="button"
                  class="btn btn-outline-main rounded-8 px-20 flex-shrink-0"
                  :disabled="!couponCode.trim() || couponValidating"
                  @click="validateCoupon"
                >
                  {{ couponValidating ? '验证中...' : '使用' }}
                </button>
                <button
                  v-else
                  type="button"
                  class="btn btn-outline-danger rounded-8 px-20 flex-shrink-0"
                  @click="removeCoupon"
                >
                  取消
                </button>
              </div>
              <div v-if="couponError" class="text-danger-600 text-sm mt-6">{{ couponError }}</div>
              <div v-if="appliedCoupon" class="d-flex align-items-center gap-8 mt-8 p-10 bg-success-50 rounded-8">
                <i class="ph-fill ph-ticket text-success-600 fs-5"></i>
                <span class="text-success-600 text-sm fw-medium">
                  已优惠 {{ appliedCoupon.discount.toFixed(0) }} 能量
                  <span v-if="appliedCoupon.description" class="text-gray-500 fw-normal">（{{ appliedCoupon.description }}）</span>
                </span>
              </div>
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
                  ><i class="ph-fill ph-lightning-a" style="font-size:0.85em;vertical-align:middle;margin-right:1px"></i>{{ (item.price * item.qty).toFixed(2) }}</span
                >
              </div>

              <div class="border-top border-gray-100 pt-30 mt-30">
                <div v-if="appliedCoupon" class="mb-16 flex-between gap-8">
                  <span class="text-gray-600 text-sm">优惠</span>
                  <span class="text-success-600 text-sm fw-semibold">-{{ appliedCoupon.discount.toFixed(0) }} 能量</span>
                </div>
                <div class="mb-32 flex-between gap-8">
                  <span class="text-gray-900 font-heading-two text-xl fw-semibold">合计</span>
                  <span class="text-gray-900 font-heading-two text-md fw-bold">
                    {{ finalTotal.toFixed(0) }} 能量
                  </span>
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
import { ref, computed, onMounted } from "vue";
import { useCartStore } from "~/stores/cart";
import { useAuthStore } from "~/stores/auth";
import { useRouter } from "vue-router";

const cart = useCartStore();
const auth = useAuthStore();
const router = useRouter();

const contact = ref("");
const remark = ref("");
const selectedPayment = ref("balance");
const submitting = ref(false);
const errorMsg = ref("");

// 优惠券
const couponCode = ref("");
const couponValidating = ref(false);
const couponError = ref("");
const appliedCoupon = ref<{ coupon_id: number; code: string; discount: number; final_amount: number; description: string } | null>(null);

const finalTotal = computed(() => {
  if (appliedCoupon.value) return appliedCoupon.value.final_amount;
  return cart.total;
});

async function validateCoupon() {
  couponError.value = "";
  if (!couponCode.value.trim()) return;
  couponValidating.value = true;
  try {
    // 取购物车中第一个商品的 shop_id（简化：单店铺购物车）
    const shopId = (cart.items[0] as any)?.shop_id ?? 0;
    const res = await $fetch<any>("/api/coupons/validate", {
      method: "POST",
      credentials: "include",
      body: {
        code: couponCode.value.trim().toUpperCase(),
        shop_id: shopId,
        amount: cart.total,
      },
    });
    appliedCoupon.value = res;
  } catch (e: any) {
    couponError.value = e?.data?.error || "优惠券无效";
    appliedCoupon.value = null;
  } finally {
    couponValidating.value = false;
  }
}

function removeCoupon() {
  appliedCoupon.value = null;
  couponCode.value = "";
  couponError.value = "";
}

// 自动用用户邮箱或用户名填充联系方式
onMounted(() => {
  contact.value = auth.user?.email || auth.user?.username || "";
});

const paymentMethods = [
  { id: "balance", label: "余额支付" },
  { id: "nodeloc", label: "NodeLoc 能量支付" },
];

async function placeOrder() {
  if (cart.items.length === 0) {
    errorMsg.value = "购物车为空";
    return;
  }
  const contactVal = contact.value.trim() || auth.user?.username || "";

  submitting.value = true;
  errorMsg.value = "";
  try {
    const orderNos: string[] = [];
    for (const item of cart.items) {
      const body: any = {
        product_id: item.id,
        quantity: item.qty,
        contact: contactVal,
        remark: remark.value,
        pay_method: selectedPayment.value,
      };
      // 只在第一个商品上应用优惠券（不叠加）
      if (appliedCoupon.value && orderNos.length === 0) {
        body.coupon_id = appliedCoupon.value.coupon_id;
      }
      const res: any = await $fetch("/api/orders/create", {
        method: "POST",
        credentials: "include",
        signal: AbortSignal.timeout(15000),
        body,
      });
      if (res.order_no) orderNos.push(res.order_no);
      if (selectedPayment.value !== "balance" && res.payment_url) {
        cart.clear();
        window.location.href = res.payment_url;
        return;
      }
    }
    cart.clear();
    if (orderNos.length > 0) {
      router.push(`/order/${orderNos[0]}`);
    } else {
      router.push("/account/orders");
    }
  } catch (e: any) {
    if (e?.name === "TimeoutError" || e?.cause?.name === "TimeoutError") {
      errorMsg.value = "请求超时，请稍后重试";
    } else {
      errorMsg.value = e?.data?.error || "下单失败，请重试";
    }
  } finally {
    submitting.value = false;
  }
}
</script>
