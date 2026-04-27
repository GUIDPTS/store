<template>
  <div>
    <Breadcrumb title="余额管理" />
    <section class="account py-80">
      <div class="container container-lg">
        <div class="row gy-4">
          <div class="col-lg-3">
            <AccountSidebar />
          </div>
          <div class="col-lg-9">
            <div class="border border-gray-100 rounded-8 p-32 mb-32">
              <h5 class="mb-16">账户余额</h5>
              <div v-if="loading" class="text-gray-400">加载中...</div>
              <div v-else>
                <div class="d-flex align-items-center gap-16 mb-24">
                  <i class="ph-fill ph-wallet text-main-600" style="font-size: 2.5rem"></i>
                  <div>
                    <div class="text-gray-500 text-sm">可用余额</div>
                    <div class="text-3xl fw-bold text-main-600">
                      ¥{{ balance?.balance?.toFixed(2) || "0.00" }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="border border-gray-100 rounded-8 p-24">
              <h6 class="mb-20">交易记录</h6>
              <div v-if="txs.length === 0" class="text-center text-gray-400 py-24">暂无记录</div>
              <table v-else class="table mb-0">
                <thead class="bg-main-50">
                  <tr>
                    <th class="py-12 px-16">时间</th>
                    <th class="py-12 px-16">类型</th>
                    <th class="py-12 px-16">金额</th>
                    <th class="py-12 px-16">备注</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="tx in txs" :key="tx.id" class="border-top border-gray-100">
                    <td class="py-12 px-16 text-sm text-gray-500">
                      {{ formatDate(tx.created_at) }}
                    </td>
                    <td class="py-12 px-16">{{ tx.type }}</td>
                    <td
                      class="py-12 px-16"
                      :class="
                        tx.amount >= 0
                          ? 'text-success-600 fw-semibold'
                          : 'text-danger-600 fw-semibold'
                      "
                    >
                      {{ tx.amount >= 0 ? "+" : "" }}{{ tx.amount?.toFixed(2) }}
                    </td>
                    <td class="py-12 px-16 text-sm text-gray-600">{{ tx.remark || "-" }}</td>
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

const balance = ref<any>(null);
const txs = ref<any[]>([]);
const loading = ref(true);

onMounted(async () => {
  try {
    [balance.value, txs.value] = await Promise.all([
      $fetch<any>("/api/balance", { credentials: "include" }),
      $fetch<any[]>("/api/balance/txs", { credentials: "include" }),
    ]);
  } catch {
    balance.value = null;
    txs.value = [];
  } finally {
    loading.value = false;
  }
});

function formatDate(d: string) {
  if (!d) return "";
  return new Date(d).toLocaleString("zh-CN");
}
</script>
