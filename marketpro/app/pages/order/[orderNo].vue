<template>
  <div>
    <Breadcrumb title="订单详情" />
    <section class="account py-80">
      <div class="container container-lg">
        <div class="d-flex align-items-center gap-16 mb-32">
          <NuxtLink to="/account/orders" class="btn btn-outline-main btn-sm rounded-8">
            <i class="ph ph-arrow-left"></i> 返回订单列表
          </NuxtLink>
          <h5 class="mb-0">订单详情</h5>
        </div>

        <div v-if="loading" class="text-center py-48 text-gray-400">加载中...</div>
        <div v-else-if="!order" class="text-center py-48 text-gray-400">订单不存在</div>
        <div v-else>
          <div class="border border-gray-100 rounded-8 p-32 mb-24">
            <div class="row gy-3">
              <div class="col-sm-6 col-md-4">
                <div class="text-gray-500 text-sm mb-4">订单号</div>
                <div class="fw-semibold">{{ order.order_no }}</div>
              </div>
              <div class="col-sm-6 col-md-4">
                <div class="text-gray-500 text-sm mb-4">状态</div>
                <span :class="statusClass(order.status)" class="badge rounded-pill px-12 py-6">{{
                  statusLabel(order.status)
                }}</span>
              </div>
              <div class="col-sm-6 col-md-4">
                <div class="text-gray-500 text-sm mb-4">下单时间</div>
                <div>{{ formatDate(order.created_at) }}</div>
              </div>
              <div class="col-sm-6 col-md-4">
                <div class="text-gray-500 text-sm mb-4">商品名称</div>
                <div>{{ order.product?.name || "-" }}</div>
              </div>
              <div class="col-sm-6 col-md-4">
                <div class="text-gray-500 text-sm mb-4">数量</div>
                <div>{{ order.quantity }}</div>
              </div>
              <div class="col-sm-6 col-md-4">
                <div class="text-gray-500 text-sm mb-4">总金额</div>
                <div class="fw-bold text-main-600 text-xl">
                  <i class="ph-fill ph-lightning-a" style="font-size:0.85em;vertical-align:middle;margin-right:1px"></i>{{ order.total_amount?.toFixed(2) }}
                </div>
              </div>
              <div v-if="order.contact" class="col-sm-6 col-md-4">
                <div class="text-gray-500 text-sm mb-4">联系方式</div>
                <div>{{ order.contact }}</div>
              </div>
              <div v-if="order.remark" class="col-sm-6 col-md-4">
                <div class="text-gray-500 text-sm mb-4">备注</div>
                <div>{{ order.remark }}</div>
              </div>
            </div>
          </div>

          <!-- Card keys -->
          <div
            v-if="order.card_keys && order.card_keys.length > 0"
            class="border border-success-100 bg-success-50 rounded-8 p-32"
          >
            <h6 class="text-success-600 mb-16">
              <i class="ph-fill ph-key me-8"></i>卡密信息
              <span class="text-sm fw-normal text-gray-500 ms-8">共 {{ order.card_keys.length }} 张</span>
            </h6>
            <div
              v-for="(key, i) in order.card_keys"
              :key="i"
              class="bg-white border border-success-200 rounded-8 px-20 py-16 mb-8"
            >
              <div class="d-flex justify-content-between align-items-start gap-12">
                <div class="flex-1 min-w-0">
                  <div class="mb-6">
                    <span class="text-gray-500 text-xs me-8">卡号</span>
                    <code class="text-gray-900 fw-semibold">{{ key.card_no }}</code>
                  </div>
                  <div v-if="key.card_pwd">
                    <span class="text-gray-500 text-xs me-8">卡密</span>
                    <code class="text-gray-900 fw-semibold">{{ key.card_pwd }}</code>
                  </div>
                </div>
                <button
                  type="button"
                  class="btn btn-sm btn-outline-main rounded-8 flex-shrink-0"
                  @click="copy(key.card_pwd ? `${key.card_no}:${key.card_pwd}` : key.card_no)"
                >
                  复制
                </button>
              </div>
            </div>
          </div>

          <!-- 已发货：显示发货内容 + 确认收货 -->
          <div
            v-if="order.status === 4 && order.deliver_content"
            class="border border-main-100 bg-main-50 rounded-8 p-32 mt-16"
          >
            <h6 class="text-main-600 mb-12">
              <i class="ph-fill ph-package me-8"></i>卖家已发货
            </h6>
            <div class="bg-white border border-main-200 rounded-8 px-20 py-16 mb-16">
              <div class="text-gray-500 text-xs mb-6">发货内容</div>
              <div class="fw-semibold" style="white-space:pre-wrap">{{ order.deliver_content }}</div>
              <div v-if="order.deliver_note" class="text-gray-400 text-sm mt-8">备注：{{ order.deliver_note }}</div>
            </div>
            <button class="btn btn-main px-32 rounded-8" :disabled="confirming" @click="confirmReceipt">
              {{ confirming ? "确认中..." : "确认收货" }}
            </button>
          </div>

          <!-- 待支付 -->
          <div
            v-if="order.status === 0 && order.payment_url"
            class="border border-warning-100 rounded-8 p-24 mt-16 text-center"
          >
            <p class="text-warning-600 mb-16">订单待支付</p>
            <a :href="order.payment_url" class="btn btn-main px-40 rounded-8">前往支付</a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from "~/components/layout/banner/Breadcrumb.vue";

definePageMeta({ layout: "layout-three" });

const route = useRoute();
const order = ref<any>(null);
const loading = ref(true);
const confirming = ref(false);

onMounted(async () => {
  try {
    order.value = await $fetch<any>(`/api/orders/${route.params.orderNo}`, {
      credentials: "include",
    });
  } catch {
    order.value = null;
  } finally {
    loading.value = false;
  }
});

function formatDate(d: string) {
  if (!d) return "";
  return new Date(d).toLocaleString("zh-CN");
}

function statusLabel(s: number) {
  const map: Record<number, string> = {
    0: "待支付", 1: "待发货", 2: "已完成", 3: "已取消", 4: "已发货/待确认",
  };
  return map[s] ?? String(s);
}

function statusClass(s: number) {
  const map: Record<number, string> = {
    0: "bg-warning-100 text-warning-600",
    1: "bg-main-100 text-main-600",
    2: "bg-success-100 text-success-600",
    3: "bg-danger-100 text-danger-600",
    4: "bg-purple-100 text-purple-600",
  };
  return map[s] ?? "bg-neutral-100 text-neutral-600";
}

async function confirmReceipt() {
  if (!confirm("确认已收到商品？确认后将完成交易，款项将结算给卖家。")) return;
  confirming.value = true;
  try {
    order.value = await $fetch(`/api/orders/${route.params.orderNo}/confirm`, {
      method: "POST",
      credentials: "include",
    });
  } catch (e: any) {
    alert(e?.data?.error || "操作失败");
  } finally {
    confirming.value = false;
  }
}

function copy(text: string) {
  navigator.clipboard.writeText(text).catch(() => {});
}
</script>
