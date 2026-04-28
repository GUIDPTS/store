<template>
  <div>
    <div class="page-title">用户管理</div>

    <el-card shadow="never">
      <el-table :data="users" v-loading="loading" stripe>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column label="头像" width="70">
          <template #default="{ row }">
            <el-avatar :size="36" :src="row.avatar">{{ row.username?.[0] }}</el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="nodeloc_id" label="NodeLoc ID" width="120" />
        <el-table-column label="余额" width="120">
          <template #default="{ row }"><span style="color:#e6162d">¥{{ row.balance ?? 0 }}</span></template>
        </el-table-column>
        <el-table-column label="角色" width="100">
          <template #default="{ row }">
            <el-tag :type="row.is_admin ? 'warning' : 'info'" size="small">{{ row.is_admin ? "管理员" : "普通" }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="90">
          <template #default="{ row }">
            <el-tag :type="row.is_blocked ? 'danger' : 'success'" size="small">{{ row.is_blocked ? "封禁" : "正常" }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="280" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" size="small" @click="openBalanceDialog(row)">调整余额</el-button>
            <el-popconfirm :title="row.is_admin ? '撤销管理员权限？' : '设为管理员？'" @confirm="toggleAdmin(row)">
              <template #reference>
                <el-button link :type="row.is_admin ? 'info' : 'primary'" size="small">{{ row.is_admin ? "撤销管理" : "设为管理" }}</el-button>
              </template>
            </el-popconfirm>
            <el-popconfirm :title="row.is_blocked ? '解除封禁？' : '封禁该用户？'" @confirm="toggleBlock(row)">
              <template #reference>
                <el-button link :type="row.is_blocked ? 'success' : 'danger'" size="small">{{ row.is_blocked ? "解封" : "封禁" }}</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination">
        <el-pagination v-model:current-page="page" :page-size="pageSize" :total="total" layout="total, prev, pager, next" @current-change="fetchUsers" />
      </div>
    </el-card>

    <!-- 余额调整对话框 -->
    <el-dialog v-model="balanceDialogVisible" title="调整余额" width="420px" @closed="resetBalanceForm">
      <div class="balance-user-info">
        <span>用户：<b>{{ balanceTarget?.username }}</b></span>
        <span style="margin-left:16px">当前余额：<b style="color:#e6162d">¥{{ balanceTarget?.balance ?? 0 }}</b></span>
      </div>
      <el-form :model="balanceForm" label-width="80px" style="margin-top:16px">
        <el-form-item label="调整类型">
          <el-radio-group v-model="balanceForm.type">
            <el-radio value="increase">增加</el-radio>
            <el-radio value="decrease">减少</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="金额">
          <el-input-number v-model="balanceForm.amount" :min="0.01" :precision="2" :step="10" style="width:100%" placeholder="请输入金额" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="balanceForm.description" placeholder="请填写调整原因（必填）" maxlength="100" show-word-limit />
        </el-form-item>
        <div class="balance-preview" v-if="balanceForm.amount > 0">
          调整后余额：<b style="color:#409eff">¥{{ adjustedBalance }}</b>
        </div>
      </el-form>
      <template #footer>
        <el-button @click="balanceDialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="balanceSaving" @click="submitBalance">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";

definePageMeta({ layout: "admin" });

const { get, put, post } = useApi();
const loading = ref(true);
const users = ref<any[]>([]);
const page = ref(1);
const pageSize = ref(20);
const total = ref(0);

// 余额调整
const balanceDialogVisible = ref(false);
const balanceSaving = ref(false);
const balanceTarget = ref<any>(null);
const balanceForm = ref({ type: "increase", amount: 0, description: "" });

const adjustedBalance = computed(() => {
  if (!balanceTarget.value) return 0;
  const delta = balanceForm.value.type === "increase" ? balanceForm.value.amount : -balanceForm.value.amount;
  return ((balanceTarget.value.balance ?? 0) + delta).toFixed(2);
});

async function fetchUsers() {
  loading.value = true;
  try {
    const res = await get<{ users: any[]; total: number }>(`/api/admin/users?page=${page.value}&page_size=${pageSize.value}`);
    users.value = res.users; total.value = res.total;
  } finally { loading.value = false; }
}

async function toggleAdmin(row: any) {
  try { await put(`/api/admin/users/${row.id}`, { is_admin: !row.is_admin }); ElMessage.success("操作成功"); await fetchUsers(); }
  catch { ElMessage.error("操作失败"); }
}

async function toggleBlock(row: any) {
  try { await put(`/api/admin/users/${row.id}`, { is_blocked: !row.is_blocked }); ElMessage.success("操作成功"); await fetchUsers(); }
  catch { ElMessage.error("操作失败"); }
}

function openBalanceDialog(row: any) {
  balanceTarget.value = row;
  balanceForm.value = { type: "increase", amount: 0, description: "" };
  balanceDialogVisible.value = true;
}

function resetBalanceForm() {
  balanceTarget.value = null;
}

async function submitBalance() {
  if (!balanceForm.value.amount || balanceForm.value.amount <= 0) {
    return ElMessage.warning("请输入有效金额");
  }
  if (!balanceForm.value.description.trim()) {
    return ElMessage.warning("请填写调整备注");
  }
  const delta = balanceForm.value.type === "increase" ? balanceForm.value.amount : -balanceForm.value.amount;
  balanceSaving.value = true;
  try {
    await post(`/api/admin/users/${balanceTarget.value.id}/balance`, {
      amount: delta,
      description: balanceForm.value.description,
    });
    ElMessage.success("余额调整成功");
    balanceDialogVisible.value = false;
    await fetchUsers();
  } catch (e: any) {
    ElMessage.error(e?.data?.error || "调整失败");
  } finally {
    balanceSaving.value = false;
  }
}

onMounted(fetchUsers);
</script>

<style scoped>
.page-title { font-size: 20px; font-weight: 600; color: #1d2129; margin-bottom: 16px; }
.pagination { display: flex; justify-content: flex-end; margin-top: 16px; }
.balance-user-info { padding: 8px 12px; background: #f5f7fa; border-radius: 6px; font-size: 14px; }
.balance-preview { margin-top: 4px; font-size: 13px; color: #606266; padding-left: 80px; }
</style>
