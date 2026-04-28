<template>
  <div>
    <div class="page-header">
      <span class="page-title">店铺审核</span>
      <el-select v-model="statusFilter" style="width:140px" @change="fetchShops">
        <el-option :value="-1" label="全部状态" />
        <el-option :value="0" label="待审核" />
        <el-option :value="1" label="已通过" />
        <el-option :value="2" label="已拒绝" />
        <el-option :value="3" label="已封禁" />
      </el-select>
    </div>

    <el-card shadow="never">
      <el-table :data="shops" v-loading="loading" stripe>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="店铺名" />
        <el-table-column prop="user_id" label="用户ID" width="90" />
        <el-table-column prop="description" label="描述" show-overflow-tooltip />
        <el-table-column label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="shopTagType(row.status)" size="small">{{ shopText(row.status) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-popconfirm v-if="row.status !== 1" title="批准该店铺？" @confirm="approve(row.id)">
              <template #reference>
                <el-button link type="primary" size="small">批准</el-button>
              </template>
            </el-popconfirm>
            <el-button v-if="row.status === 0" link type="danger" size="small" @click="openReject(row)">拒绝</el-button>
            <el-button v-if="row.status === 1" link type="warning" size="small" @click="openBlock(row)">封禁</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination v-model:current-page="page" :page-size="pageSize" :total="total" layout="total, prev, pager, next" @current-change="fetchShops" />
      </div>
    </el-card>

    <el-dialog v-model="rejectDialog" title="拒绝理由" width="420px">
      <el-input v-model="reason" type="textarea" :rows="3" placeholder="请填写拒绝理由" />
      <template #footer>
        <el-button @click="rejectDialog = false">取消</el-button>
        <el-button type="primary" :loading="saving" @click="doReject">确定</el-button>
      </template>
    </el-dialog>

    <el-dialog v-model="blockDialog" title="封禁理由" width="420px">
      <el-input v-model="reason" type="textarea" :rows="3" placeholder="请填写封禁理由" />
      <template #footer>
        <el-button @click="blockDialog = false">取消</el-button>
        <el-button type="primary" :loading="saving" @click="doBlock">确定</el-button>
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
const shops = ref<any[]>([]);
const page = ref(1);
const pageSize = ref(20);
const total = ref(0);
const statusFilter = ref(-1);
const rejectDialog = ref(false);
const blockDialog = ref(false);
const reason = ref("");
const targetId = ref<number | null>(null);

const shopText = (s: number) => ["待审核", "已通过", "已拒绝", "已封禁"][s] ?? "未知";
const shopTagType = (s: number) => (["warning", "success", "danger", "info"] as const)[s] ?? "info";

async function fetchShops() {
  loading.value = true;
  try {
    const res = await get<{ data: any[]; total: number }>(`/api/admin/shops?page=${page.value}&page_size=${pageSize.value}&status=${statusFilter.value}`);
    shops.value = res.data; total.value = res.total;
  } finally { loading.value = false; }
}

async function approve(id: number) {
  try { await post(`/api/admin/shops/${id}/approve`, {}); ElMessage.success("已批准"); await fetchShops(); }
  catch { ElMessage.error("操作失败"); }
}

function openReject(row: any) { targetId.value = row.id; reason.value = ""; rejectDialog.value = true; }
async function doReject() {
  saving.value = true;
  try { await post(`/api/admin/shops/${targetId.value}/reject`, { reason: reason.value }); ElMessage.success("已拒绝"); rejectDialog.value = false; await fetchShops(); }
  catch { ElMessage.error("操作失败"); } finally { saving.value = false; }
}

function openBlock(row: any) { targetId.value = row.id; reason.value = ""; blockDialog.value = true; }
async function doBlock() {
  saving.value = true;
  try { await post(`/api/admin/shops/${targetId.value}/block`, { reason: reason.value }); ElMessage.success("已封禁"); blockDialog.value = false; await fetchShops(); }
  catch { ElMessage.error("操作失败"); } finally { saving.value = false; }
}

onMounted(fetchShops);
</script>

<style scoped>
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.page-title { font-size: 20px; font-weight: 600; color: #1d2129; }
.pagination { display: flex; justify-content: flex-end; margin-top: 16px; }
</style>
