<template>
  <div>
    <Breadcrumb title="我的订单" />
    <section class="account py-80">
      <div class="container container-lg">
        <div class="row gy-4">
          <div class="col-lg-3">
            <AccountSidebar />
          </div>
          <div class="col-lg-9">
            <div v-if="loading" class="text-center py-48 text-gray-400">加载中...</div>
            <div v-else-if="orders.length === 0" class="text-center py-48 text-gray-400">
              暂无订单
            </div>
            <div v-else class="border border-gray-100 rounded-8 overflow-hidden">
              <table class="table mb-0">
                <thead class="bg-main-50">
                  <tr>
                    <th class="py-16 px-24 fw-semibold text-gray-900">订单号</th>
                    <th class="py-16 px-24 fw-semibold text-gray-900">商品</th>
                    <th class="py-16 px-24 fw-semibold text-gray-900">金额</th>
                    <th class="py-16 px-24 fw-semibold text-gray-900">状态</th>
                    <th class="py-16 px-24 fw-semibold text-gray-900">操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="order in orders"
                    :key="order.order_no"
                    class="border-top border-gray-100"
                  >
                    <td class="py-16 px-24 text-sm text-gray-600">{{ order.order_no }}</td>
                    <td class="py-16 px-24">{{ order.product_name || "-" }}</td>
                    <td class="py-16 px-24 fw-semibold">¥{{ order.total_amount?.toFixed(2) }}</td>
                    <td class="py-16 px-24">
                      <span
                        :class="statusClass(order.status)"
                        class="badge rounded-pill px-12 py-6"
                        >{{ statusLabel(order.status) }}</span
                      >
                    </td>
                    <td class="py-16 px-24">
                      <NuxtLink
                        :to="`/order/${order.order_no}`"
                        class="btn btn-outline-main btn-sm rounded-8"
                        >详情</NuxtLink
                      >
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from "~/components/layout/banner/Breadcrumb.vue";
import AccountSidebar from "~/components/containers/account/AccountSidebar.vue";

definePageMeta({ layout: "layout-three" });

const orders = ref<any[]>([]);
const loading = ref(true);

onMounted(async () => {
  try {
    orders.value = await $fetch<any[]>("/api/orders", { credentials: "include" });
  } catch {
    orders.value = [];
  } finally {
    loading.value = false;
  }
});

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
</script>
