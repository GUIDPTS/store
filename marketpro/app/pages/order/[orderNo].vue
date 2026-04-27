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
                <div>{{ order.product_name || "-" }}</div>
              </div>
              <div class="col-sm-6 col-md-4">
                <div class="text-gray-500 text-sm mb-4">数量</div>
                <div>{{ order.quantity }}</div>
              </div>
              <div class="col-sm-6 col-md-4">
                <div class="text-gray-500 text-sm mb-4">总金额</div>
                <div class="fw-bold text-main-600 text-xl">
                  ¥{{ order.total_amount?.toFixed(2) }}
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
            <h6 class="text-success-600 mb-16"><i class="ph-fill ph-key me-8"></i>卡密信息</h6>
            <div
              v-for="(key, i) in order.card_keys"
              :key="i"
              class="bg-white border border-success-200 rounded-8 px-20 py-12 mb-8 d-flex justify-content-between align-items-center"
            >
              <code class="text-gray-900 fw-semibold">{{ key }}</code>
              <button
                type="button"
                class="btn btn-sm btn-outline-main rounded-8"
                @click="copy(key)"
              >
                复制
              </button>
            </div>
          </div>

          <!-- Pending payment -->
          <div
            v-if="order.status === 'pending' && order.payment_url"
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

function statusLabel(s: string) {
  const map: Record<string, string> = {
    pending: "待支付",
    paid: "已支付",
    completed: "已完成",
    cancelled: "已取消",
    failed: "失败",
  };
  return map[s] || s;
}

function statusClass(s: string) {
  const map: Record<string, string> = {
    pending: "bg-warning-100 text-warning-600",
    paid: "bg-success-100 text-success-600",
    completed: "bg-main-100 text-main-600",
    cancelled: "bg-danger-100 text-danger-600",
    failed: "bg-neutral-100 text-neutral-600",
  };
  return map[s] || "bg-neutral-100 text-neutral-600";
}

function copy(text: string) {
  navigator.clipboard.writeText(text).catch(() => {});
}
</script>
