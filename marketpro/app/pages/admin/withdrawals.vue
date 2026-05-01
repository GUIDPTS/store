<template>
  <div>
    <div class="page-header">
      <span class="page-title">提现审核</span>
      <el-select v-model="statusFilter" style="width:140px" @change="fetchList">
        <el-option :value="-1" label="全部状态" />
        <el-option :value="0" label="待审核" />
        <el-option :value="1" label="已完成" />
        <el-option :value="2" label="已拒绝" />
        <el-option :value="3" label="处理中" />
      </el-select>
    </div>

    <el-card shadow="never">
      <el-table :data="list" v-loading="loading" stripe>
        <el-table-column prop="id" label="ID" width="70" />
        <el-table-column label="用户" width="160">
          <template #default="{ row }">
            <div class="d-flex align-items-center gap-8">
              <img v-if="row.user?.avatar_url" :src="row.user.avatar_url"
                style="width:28px;height:28px;border-radius:50%;object-fit:cover" />
              <div>
                <div style="font-size:13px;font-weight:500">{{ row.user?.username || row.user_id }}</div>
                <div style="font-size:11px;color:#86909c">NodeLoc ID: {{ row.user?.nodeloc_id || '-' }}</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="申请能量" width="110">
          <template #default="{ row }">
            <span style="font-weight:600">{{ Math.round(row.amount) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="手续费" width="90">
          <template #default="{ row }">
            <span style="color:#86909c">{{ Math.round(row.fee || 0) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="实际到账" width="110">
          <template #default="{ row }">
            <span style="color:#00b42a;font-weight:600">{{ Math.round(row.actual_amount) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="wTagType(row.status)" size="small">{{ wText(row.status) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="转账流水" width="160" show-overflow-tooltip>
          <template #default="{ row }">
            <span style="font-size:12px;color:#86909c">{{ row.transfer_tx_id || '-' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="申请时间" width="170">
          <template #default="{ row }">
            <span style="font-size:12px">{{ fmtDate(row.created_at) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" show-overflow-tooltip />
        <el-table-column label="操作" width="130" fixed="right">
          <template #default="{ row }">
            <template v-if="row.status === 0">
              <el-button link type="primary" size="small" @click="openApprove(row)">批准</el-button>
              <el-button link type="danger" size="small" @click="openReject(row)">拒绝</el-button>
            </template>
            <span v-else style="color:#86909c;font-size:13px">—</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination v-model:current-page="page" :page-size="pageSize" :total="total"
          layout="total, prev, pager, next" @current-change="fetchList" />
      </div>
    </el-card>

    <!-- 批准弹窗 -->
    <el-dialog v-model="approveDialog" title="批准提现" width="440px">
      <div v-if="target" class="mb-16 p-16 rounded-8" style="background:#f7f8fa">
        <div class="d-flex justify-content-between mb-8">
          <span style="color:#86909c">用户</span>
          <span style="font-weight:500">{{ target.user?.username }}</span>
        </div>
        <div class="d-flex justify-content-between mb-8">
          <span style="color:#86909c">NodeLoc ID</span>
          <span>{{ target.user?.nodeloc_id }}</span>
        </div>
        <div class="d-flex justify-content-between mb-8">
          <span style="color:#86909c">申请能量</span>
          <span style="font-weight:600">{{ Math.round(target.amount) }}</span>
        </div>
        <div class="d-flex justify-content-between">
          <span style="color:#86909c">实际到账</span>
          <span style="color:#00b42a;font-weight:600">{{ Math.round(target.actual_amount) }} 能量</span>
        </div>
      </div>
      <el-alert type="info" :closable="false" show-icon>
        点击确定后将自动调用 NodeLoc Payment API 向该用户转账，无需手动操作。
      </el-alert>
      <template #footer>
        <el-button @click="approveDialog = false">取消</el-button>
        <el-button type="primary" :loading="saving" @click="doApprove">确认转账</el-button>
      </template>
    </el-dialog>

    <!-- 拒绝弹窗 -->
    <el-dialog v-model="rejectDialog" title="拒绝提现" width="420px">
      <p style="color:#86909c;font-size:13px;margin-bottom:12px">拒绝后，冻结的能量将自动退还至用户余额。</p>
      <el-input v-model="reason" type="textarea" :rows="3" placeholder="拒绝原因（可选）" />
      <template #footer>
        <el-button @click="rejectDialog = false">取消</el-button>
        <el-button type="danger" :loading="saving" @click="doReject">确认拒绝</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";

definePageMeta({ layout: "admin" });

const { get, post } = useApi();
const loading = ref(true);
const saving = ref(false);
const list = ref<any[]>([]);
const page = ref(1);
const pageSize = ref(20);
const total = ref(0);
const statusFilter = ref(-1);
const approveDialog = ref(false);
const rejectDialog = ref(false);
const reason = ref("");
const target = ref<any>(null);

const STATUS_TEXT: Record<number, string> = { 0: "待审核", 1: "已完成", 2: "已拒绝", 3: "处理中" };
const STATUS_TAG: Record<number, string> = { 0: "warning", 1: "success", 2: "danger", 3: "primary" };
const wText = (s: number) => STATUS_TEXT[s] ?? "未知";
const wTagType = (s: number) => (STATUS_TAG[s] ?? "info") as any;

async function fetchList() {
  loading.value = true;
  try {
    const res = await get<{ data: any[]; total: number }>(
      `/api/admin/withdrawals?page=${page.value}&page_size=${pageSize.value}&status=${statusFilter.value}`
    );
    list.value = res.data;
    total.value = res.total;
  } finally {
    loading.value = false;
  }
}

function openApprove(row: any) {
  target.value = row;
  approveDialog.value = true;
}

async function doApprove() {
  saving.value = true;
  try {
    await post(`/api/admin/withdrawals/${target.value.id}/approve`, {});
    ElMessage.success("已批准，NodeLoc 转账已发起");
    approveDialog.value = false;
    await fetchList();
  } catch (e: any) {
    ElMessage.error(e?.data?.error || "操作失败");
  } finally {
    saving.value = false;
  }
}

function openReject(row: any) {
  target.value = row;
  reason.value = "";
  rejectDialog.value = true;
}

async function doReject() {
  saving.value = true;
  try {
    await post(`/api/admin/withdrawals/${target.value.id}/reject`, { reason: reason.value });
    ElMessage.success("已拒绝，能量已退还");
    rejectDialog.value = false;
    await fetchList();
  } catch (e: any) {
    ElMessage.error(e?.data?.error || "操作失败");
  } finally {
    saving.value = false;
  }
}

function fmtDate(d: string) {
  if (!d) return "-";
  return new Date(d).toLocaleString("zh-CN", { hour12: false });
}

onMounted(fetchList);
</script>

<style scoped>
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.page-title { font-size: 20px; font-weight: 600; color: #1d2129; }
.pagination { display: flex; justify-content: flex-end; margin-top: 16px; }
</style>
