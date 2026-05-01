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

            <!-- 筛选栏 -->
            <div class="d-flex align-items-center gap-12 flex-wrap mb-20">
              <!-- 状态筛选 -->
              <div class="d-flex gap-8 flex-wrap">
                <button
                  v-for="tab in statusTabs"
                  :key="tab.value"
                  class="btn btn-sm rounded-pill px-16"
                  :class="statusFilter === tab.value ? 'btn-main' : 'btn-outline-secondary'"
                  @click="statusFilter = tab.value"
                >
                  {{ tab.label }}
                </button>
              </div>
              <!-- 关键词搜索 -->
              <div class="position-relative ms-auto">
                <input
                  v-model="keyword"
                  type="text"
                  class="form-control form-control-sm rounded-pill ps-16 pe-40"
                  style="min-width:200px"
                  placeholder="搜索订单号 / 商品名"
                />
                <i class="ph ph-magnifying-glass position-absolute top-50 translate-middle-y end-0 me-12 text-gray-400"></i>
              </div>
            </div>

            <div v-if="loading" class="text-center py-48 text-gray-400">加载中...</div>
            <div v-else-if="filtered.length === 0" class="text-center py-48 text-gray-400">
              <i class="ph ph-receipt d-block mb-8" style="font-size:2.5rem"></i>
              暂无订单
            </div>
            <div v-else class="border border-gray-100 rounded-8 overflow-hidden">
              <table class="table table-hover mb-0">
                <thead class="bg-main-50">
                  <tr>
                    <th class="py-14 px-20 fw-semibold text-gray-900 text-sm">订单号</th>
                    <th class="py-14 px-20 fw-semibold text-gray-900 text-sm">商品</th>
                    <th class="py-14 px-20 fw-semibold text-gray-900 text-sm">金额</th>
                    <th class="py-14 px-20 fw-semibold text-gray-900 text-sm">状态</th>
                    <th class="py-14 px-20 fw-semibold text-gray-900 text-sm">时间</th>
                    <th class="py-14 px-20 fw-semibold text-gray-900 text-sm">操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="order in filtered" :key="order.order_no" class="border-top border-gray-100">
                    <td class="py-14 px-20 text-sm font-monospace text-gray-600">{{ order.order_no }}</td>
                    <td class="py-14 px-20 text-sm" style="max-width:160px">
                      <div class="d-flex align-items-center gap-10">
                        <img v-if="order.product?.image" :src="order.product.image"
                          style="width:36px;height:36px;object-fit:contain;border-radius:6px;border:1px solid #f3f4f6;flex-shrink:0"
                          :alt="order.product?.name" />
                        <span class="text-line-2">{{ order.product?.name || '-' }}</span>
                      </div>
                    </td>
                    <td class="py-14 px-20 fw-semibold text-danger-600">{{ order.total_amount }}</td>
                    <td class="py-14 px-20">
                      <span class="badge rounded-pill px-12 py-6" :class="statusClass(order.status)">
                        {{ statusLabel(order.status) }}
                      </span>
                    </td>
                    <td class="py-14 px-20 text-sm text-gray-400">{{ fmtDate(order.created_at) }}</td>
                    <td class="py-14 px-20">
                      <NuxtLink :to="`/order/${order.order_no}`"
                        class="btn btn-sm btn-outline-main rounded-8">详情</NuxtLink>
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
const statusFilter = ref(-1);
const keyword = ref("");

const statusTabs = [
  { label: "全部", value: -1 },
  { label: "待支付", value: 0 },
  { label: "待发货", value: 1 },
  { label: "已发货", value: 4 },
  { label: "已完成", value: 2 },
  { label: "已取消", value: 3 },
];

const filtered = computed(() => {
  let list = orders.value;
  if (statusFilter.value >= 0) {
    list = list.filter(o => o.status === statusFilter.value);
  }
  if (keyword.value.trim()) {
    const kw = keyword.value.trim().toLowerCase();
    list = list.filter(o =>
      o.order_no?.toLowerCase().includes(kw) ||
      o.product?.name?.toLowerCase().includes(kw)
    );
  }
  return list;
});

onMounted(async () => {
  try {
    orders.value = await $fetch<any[]>("/api/orders", { credentials: "include" });
  } catch {
    orders.value = [];
  } finally {
    loading.value = false;
  }
});

const STATUS_LABEL: Record<number, string> = {
  0: "待支付", 1: "待发货", 2: "已完成", 3: "已取消", 4: "已发货/待确认",
};
const STATUS_CLASS: Record<number, string> = {
  0: "bg-warning-100 text-warning-600",
  1: "bg-main-100 text-main-600",
  2: "bg-success-100 text-success-600",
  3: "bg-danger-100 text-danger-600",
  4: "bg-purple-100 text-purple-600",
};

function statusLabel(s: number) { return STATUS_LABEL[s] ?? "未知"; }
function statusClass(s: number) { return STATUS_CLASS[s] ?? "bg-neutral-100 text-neutral-600"; }

function fmtDate(d: string) {
  if (!d) return "-";
  return new Date(d).toLocaleDateString("zh-CN");
}
</script>
