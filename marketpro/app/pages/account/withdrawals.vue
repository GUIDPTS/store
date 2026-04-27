<template>
  <div>
    <Breadcrumb title="提现管理" />
    <section class="account py-80">
      <div class="container container-lg">
        <div class="row gy-4">
          <div class="col-lg-3">
            <AccountSidebar />
          </div>
          <div class="col-lg-9">
            <div class="border border-gray-100 rounded-8 p-32 mb-32">
              <h6 class="mb-20">申请提现</h6>
              <form @submit.prevent="applyWithdrawal">
                <div class="row gy-3">
                  <div class="col-sm-6">
                    <label class="form-label fw-medium">提现金额</label>
                    <input
                      v-model.number="amount"
                      type="number"
                      min="1"
                      step="0.01"
                      class="form-control py-12 px-16 border border-gray-200 rounded-8"
                      placeholder="请输入金额"
                    />
                  </div>
                  <div class="col-sm-6">
                    <label class="form-label fw-medium">收款账号</label>
                    <input
                      v-model="account"
                      type="text"
                      class="form-control py-12 px-16 border border-gray-200 rounded-8"
                      placeholder="支付宝/微信等"
                    />
                  </div>
                  <div class="col-12">
                    <div
                      v-if="applyMsg"
                      :class="applyOk ? 'text-success-600' : 'text-danger-600'"
                      class="mb-8 text-sm"
                    >
                      {{ applyMsg }}
                    </div>
                    <button type="submit" class="btn btn-main px-32 rounded-8" :disabled="applying">
                      {{ applying ? "提交中..." : "提交申请" }}
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div class="border border-gray-100 rounded-8 p-24">
              <h6 class="mb-20">提现记录</h6>
              <div v-if="loading" class="text-center text-gray-400 py-16">加载中...</div>
              <div v-else-if="withdrawals.length === 0" class="text-center text-gray-400 py-16">
                暂无记录
              </div>
              <table v-else class="table mb-0">
                <thead class="bg-main-50">
                  <tr>
                    <th class="py-12 px-16">时间</th>
                    <th class="py-12 px-16">金额</th>
                    <th class="py-12 px-16">账号</th>
                    <th class="py-12 px-16">状态</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="w in withdrawals" :key="w.id" class="border-top border-gray-100">
                    <td class="py-12 px-16 text-sm text-gray-500">
                      {{ formatDate(w.created_at) }}
                    </td>
                    <td class="py-12 px-16 fw-semibold">¥{{ w.amount?.toFixed(2) }}</td>
                    <td class="py-12 px-16 text-sm text-gray-600">{{ w.account || "-" }}</td>
                    <td class="py-12 px-16">
                      <span :class="wStatusClass(w.status)" class="badge rounded-pill px-10 py-4">{{
                        w.status
                      }}</span>
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

const withdrawals = ref<any[]>([]);
const loading = ref(true);
const applying = ref(false);
const amount = ref<number | null>(null);
const account = ref("");
const applyMsg = ref("");
const applyOk = ref(false);

onMounted(() => loadWithdrawals());

async function loadWithdrawals() {
  try {
    withdrawals.value = await $fetch<any[]>("/api/withdrawals", { credentials: "include" });
  } catch {
    withdrawals.value = [];
  } finally {
    loading.value = false;
  }
}

async function applyWithdrawal() {
  if (!amount.value || amount.value <= 0 || !account.value.trim()) {
    applyMsg.value = "请填写完整信息";
    applyOk.value = false;
    return;
  }
  applying.value = true;
  applyMsg.value = "";
  try {
    await $fetch("/api/withdrawals/apply", {
      method: "POST",
      credentials: "include",
      body: { amount: amount.value, account: account.value },
    });
    applyMsg.value = "申请成功，等待审核";
    applyOk.value = true;
    amount.value = null;
    account.value = "";
    await loadWithdrawals();
  } catch (e: any) {
    applyMsg.value = e?.data?.error || "申请失败";
    applyOk.value = false;
  } finally {
    applying.value = false;
  }
}

function formatDate(d: string) {
  if (!d) return "";
  return new Date(d).toLocaleString("zh-CN");
}

function wStatusClass(s: string) {
  const map: Record<string, string> = {
    pending: "bg-warning-100 text-warning-600",
    approved: "bg-success-100 text-success-600",
    rejected: "bg-danger-100 text-danger-600",
  };
  return map[s] || "bg-neutral-100 text-neutral-600";
}
</script>
