<template>
  <div>
    <div class="page-header">
      <span class="page-title">提现审核</span>
      <el-select v-model="statusFilter" style="width:140px" @change="fetchList">
        <el-option :value="-1" label="全部状态" />
        <el-option :value="0" label="待审核" />
        <el-option :value="1" label="已通过" />
        <el-option :value="2" label="已拒绝" />
      </el-select>
    </div>

    <el-card shadow="never">
      <el-table :data="list" v-loading="loading" stripe>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="user_id" label="用户ID" width="90" />
        <el-table-column label="金额" width="110">
          <template #default="{ row }"><span style="color:#e6162d;font-weight:600">¥{{ row.amount }}</span></template>
        </el-table-column>
        <el-table-column prop="account_type" label="账户类型" width="100" />
        <el-table-column prop="account_info" label="账户信息" show-overflow-tooltip />
        <el-table-column label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="wTagType(row.status)" size="small">{{ wText(row.status) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="申请时间" width="180" />
        <el-table-column label="操作" width="140" fixed="right">
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
        <el-pagination v-model:current-page="page" :page-size="pageSize" :total="total" layout="total, prev, pager, next" @current-change="fetchList" />
      </div>
    </el-card>

    <el-dialog v-model="approveDialog" title="批准提现" width="420px">
      <el-form label-width="110px">
        <el-form-item label="交易流水号">
          <el-input v-model="txId" placeholder="填写打款流水号（可选）" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="approveDialog = false">取消</el-button>
        <el-button type="primary" :loading="saving" @click="doApprove">确定</el-button>
      </template>
    </el-dialog>

    <el-dialog v-model="rejectDialog" title="拒绝提现" width="420px">
      <el-input v-model="reason" type="textarea" :rows="3" placeholder="拒绝原因（余额将自动退还）" />
      <template #footer>
        <el-button @click="rejectDialog = false">取消</el-button>
        <el-button type="primary" :loading="saving" @click="doReject">确定</el-button>
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
const txId = ref("");
const reason = ref("");
const targetId = ref<number | null>(null);

const wText = (s: number) => ["待审核", "已通过", "已拒绝"][s] ?? "未知";
const wTagType = (s: number) => (["warning", "success", "danger"] as const)[s] ?? "info";

async function fetchList() {
  loading.value = true;
  try {
    const res = await get<{ data: any[]; total: number }>(`/api/admin/withdrawals?page=${page.value}&page_size=${pageSize.value}&status=${statusFilter.value}`);
    list.value = res.data; total.value = res.total;
  } finally { loading.value = false; }
}

function openApprove(row: any) { targetId.value = row.id; txId.value = ""; approveDialog.value = true; }
async function doApprove() {
  saving.value = true;
  try { await post(`/api/admin/withdrawals/${targetId.value}/approve`, { tx_id: txId.value }); ElMessage.success("已批准"); approveDialog.value = false; await fetchList(); }
  catch { ElMessage.error("操作失败"); } finally { saving.value = false; }
}

function openReject(row: any) { targetId.value = row.id; reason.value = ""; rejectDialog.value = true; }
async function doReject() {
  saving.value = true;
  try { await post(`/api/admin/withdrawals/${targetId.value}/reject`, { reason: reason.value }); ElMessage.success("已拒绝，余额已退还"); rejectDialog.value = false; await fetchList(); }
  catch { ElMessage.error("操作失败"); } finally { saving.value = false; }
}

onMounted(fetchList);
</script>

<style scoped>
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.page-title { font-size: 20px; font-weight: 600; color: #1d2129; }
.pagination { display: flex; justify-content: flex-end; margin-top: 16px; }
</style>
