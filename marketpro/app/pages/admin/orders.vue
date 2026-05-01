<template>
  <div>
    <div class="page-header">
      <span class="page-title">订单管理</span>
      <div class="d-flex gap-8">
        <el-input
          v-model="keyword"
          placeholder="搜索订单号 / 用户名"
          clearable
          style="width:200px"
          @keydown.enter="fetchOrders"
          @clear="fetchOrders"
        >
          <template #prefix><el-icon><Search /></el-icon></template>
        </el-input>
        <el-select v-model="statusFilter" style="width:130px" @change="fetchOrders">
          <el-option :value="-1" label="全部状态" />
          <el-option :value="0" label="待支付" />
          <el-option :value="1" label="待发货" />
          <el-option :value="2" label="已完成" />
          <el-option :value="3" label="已取消" />
          <el-option :value="4" label="已发货" />
        </el-select>
      </div>
    </div>

    <el-card shadow="never">
      <el-table :data="orders" v-loading="loading" stripe>
        <el-table-column prop="order_no" label="订单号" min-width="170" show-overflow-tooltip />

        <!-- 用户列：头像 + 用户名，可点击跳转用户管理 -->
        <el-table-column label="用户" width="160">
          <template #default="{ row }">
            <div v-if="row.user" class="user-cell" @click="goUser(row.user.id)" title="查看用户">
              <el-avatar
                :src="row.user.avatar_url || ''"
                :size="28"
                style="flex-shrink:0"
              >{{ row.user.username?.charAt(0)?.toUpperCase() }}</el-avatar>
              <div class="user-cell-info">
                <div class="user-name">{{ row.user.username }}</div>
                <div v-if="row.user.name && row.user.name !== row.user.username" class="user-realname">{{ row.user.name }}</div>
              </div>
            </div>
            <span v-else class="text-gray-400">—</span>
          </template>
        </el-table-column>

        <el-table-column label="商品" show-overflow-tooltip>
          <template #default="{ row }">{{ row.product?.name || '—' }}</template>
        </el-table-column>
        <el-table-column prop="quantity" label="数量" width="60" align="center" />
        <el-table-column label="金额" width="100">
          <template #default="{ row }">
            <span style="color:#e6162d;font-weight:600">{{ row.total_amount }}</span>
          </template>
        </el-table-column>
        <el-table-column label="支付方式" width="90">
          <template #default="{ row }">
            <el-tag size="small" type="info">{{ payMethodText(row.pay_method) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="90">
          <template #default="{ row }">
            <el-tag :type="statusType(row.status)" size="small">{{ statusText(row.status) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" width="160">
          <template #default="{ row }">{{ fmtDate(row.created_at) }}</template>
        </el-table-column>
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
        <el-pagination
          v-model:current-page="page"
          :page-size="pageSize"
          :total="total"
          layout="total, prev, pager, next"
          @current-change="fetchOrders"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ArrowDown, Search } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";

definePageMeta({ layout: "admin" });

const router = useRouter();
const { get, put } = useApi();
const loading = ref(true);
const orders = ref<any[]>([]);
const page = ref(1);
const pageSize = ref(20);
const total = ref(0);
const statusFilter = ref(-1);
const keyword = ref("");

const STATUS_TEXT: Record<number, string> = { 0: '待支付', 1: '待发货', 2: '已完成', 3: '已取消', 4: '已发货' };
const STATUS_TYPE: Record<number, string> = { 0: 'warning', 1: 'primary', 2: 'success', 3: 'danger', 4: 'info' };
const PAY_METHOD: Record<string, string> = { nodeloc: '能量', balance: '余额', free: '免费' };

const statusText = (s: number) => STATUS_TEXT[s] ?? '未知';
const statusType = (s: number) => (STATUS_TYPE[s] ?? 'info') as any;
const payMethodText = (m: string) => PAY_METHOD[m] ?? (m || '—');

async function fetchOrders() {
  loading.value = true;
  try {
    const params: Record<string, string> = {
      page: String(page.value),
      page_size: String(pageSize.value),
      status: String(statusFilter.value),
    };
    if (keyword.value.trim()) params.keyword = keyword.value.trim();
    const res = await get<{ orders: any[]; total: number }>(`/api/admin/orders?${new URLSearchParams(params)}`);
    orders.value = res.orders ?? [];
    total.value = res.total ?? 0;
  } finally {
    loading.value = false;
  }
}

async function updateStatus(orderNo: string, status: number) {
  try {
    await put(`/api/admin/orders/${orderNo}/status`, { status });
    ElMessage.success("更新成功");
    await fetchOrders();
  } catch {
    ElMessage.error("更新失败");
  }
}

function goUser(userId: number) {
  router.push(`/admin/users?highlight=${userId}`);
}

function fmtDate(d: string) {
  if (!d) return '—';
  return new Date(d).toLocaleString('zh-CN', { hour12: false });
}

onMounted(fetchOrders);
</script>

<style scoped>
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.page-title { font-size: 20px; font-weight: 600; color: #1d2129; }
.pagination { display: flex; justify-content: flex-end; margin-top: 16px; }

.user-cell {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 2px 4px;
  border-radius: 6px;
  transition: background .15s;
}
.user-cell:hover { background: #f0f5ff; }
.user-cell-info { min-width: 0; }
.user-name { font-size: 13px; font-weight: 500; color: #1d2129; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.user-realname { font-size: 11px; color: #86909c; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
</style>
