<template>
  <div>
    <div class="page-header">
      <span class="page-title">订单管理</span>
      <el-select v-model="statusFilter" style="width:140px" @change="fetchOrders">
        <el-option :value="-1" label="全部状态" />
        <el-option :value="0" label="待支付" />
        <el-option :value="1" label="已支付" />
        <el-option :value="2" label="已完成" />
        <el-option :value="3" label="已取消" />
      </el-select>
    </div>

    <el-card shadow="never">
      <el-table :data="orders" v-loading="loading" stripe>
        <el-table-column prop="order_no" label="订单号" min-width="180" show-overflow-tooltip />
        <el-table-column prop="user_id" label="用户ID" width="80" />
        <el-table-column prop="product_name" label="商品" show-overflow-tooltip />
        <el-table-column prop="quantity" label="数量" width="70" />
        <el-table-column label="金额" width="100">
          <template #default="{ row }"><span style="color:#e6162d;font-weight:600">¥{{ row.amount }}</span></template>
        </el-table-column>
        <el-table-column label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="statusType(row.status)" size="small">{{ statusText(row.status) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="创建时间" width="180" />
        <el-table-column label="操作" width="100" fixed="right">
          <template #default="{ row }">
            <el-dropdown @command="(cmd: number) => updateStatus(row.order_no, cmd)">
              <el-button link type="primary" size="small">操作 <el-icon><ArrowDown /></el-icon></el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item :command="1">标记已支付</el-dropdown-item>
                  <el-dropdown-item :command="2">标记完成</el-dropdown-item>
                  <el-dropdown-item :command="3" style="color:#f56c6c">取消订单</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination">
        <el-pagination v-model:current-page="page" :page-size="pageSize" :total="total" layout="total, prev, pager, next" @current-change="fetchOrders" />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ArrowDown } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";

definePageMeta({ layout: "admin" });

const { get, put } = useApi();
const loading = ref(true);
const orders = ref<any[]>([]);
const page = ref(1);
const pageSize = ref(20);
const total = ref(0);
const statusFilter = ref(-1);

const statusText = (s: number) => ["待支付", "已支付", "已完成", "已取消"][s] ?? "未知";
const statusType = (s: number) => (["warning", "primary", "success", "danger"] as const)[s] ?? "info";

async function fetchOrders() {
  loading.value = true;
  try {
    const res = await get<{ orders: any[]; total: number }>(`/api/admin/orders?page=${page.value}&page_size=${pageSize.value}&status=${statusFilter.value}`);
    orders.value = res.orders; total.value = res.total;
  } finally { loading.value = false; }
}

async function updateStatus(orderNo: string, status: number) {
  try { await put(`/api/admin/orders/${orderNo}/status`, { status }); ElMessage.success("更新成功"); await fetchOrders(); }
  catch { ElMessage.error("更新失败"); }
}

onMounted(fetchOrders);
</script>

<style scoped>
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.page-title { font-size: 20px; font-weight: 600; color: #1d2129; }
.pagination { display: flex; justify-content: flex-end; margin-top: 16px; }
</style>
