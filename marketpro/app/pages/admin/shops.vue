<template>
  <div>
    <div class="page-header">
      <span class="page-title">店铺管理</span>
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
        <el-table-column label="店铺" min-width="220">
          <template #default="{ row }">
            <div class="shop-cell">
              <el-avatar
                :src="row.logo || ''"
                :size="40"
                shape="square"
                class="shop-logo"
              >
                <span>{{ row.name?.[0] }}</span>
              </el-avatar>
              <div>
                <div class="shop-name">{{ row.name }}</div>
                <div class="shop-contact">{{ row.contact || '—' }}</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="描述" min-width="180" show-overflow-tooltip>
          <template #default="{ row }">{{ row.description || '—' }}</template>
        </el-table-column>
        <el-table-column prop="user_id" label="用户ID" width="80" />
        <el-table-column label="官方" width="70">
          <template #default="{ row }">
            <el-tag v-if="row.is_official" type="danger" size="small">官方</el-tag>
            <span v-else class="text-muted">—</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="90">
          <template #default="{ row }">
            <el-tag :type="shopTagType(row.status)" size="small">{{ shopText(row.status) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" size="small" @click="openEdit(row)">编辑</el-button>
            <el-popconfirm v-if="row.status !== 1" title="批准该店铺？" @confirm="approve(row.id)">
              <template #reference>
                <el-button link type="success" size="small">批准</el-button>
              </template>
            </el-popconfirm>
            <el-button v-if="row.status === 0" link type="danger" size="small" @click="openReject(row)">拒绝</el-button>
            <el-button v-if="row.status === 1" link type="warning" size="small" @click="openBlock(row)">封禁</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination v-model:current-page="page" :page-size="pageSize" :total="total"
          layout="total, prev, pager, next" @current-change="fetchShops" />
      </div>
    </el-card>

    <!-- 编辑店铺 -->
    <el-dialog v-model="editDialog" title="编辑店铺" width="520px">
      <el-form :model="editForm" label-width="80px">
        <el-form-item label="店铺Logo">
          <div class="logo-edit">
            <AdminImageUpload v-model="editForm.logo" />
          </div>
        </el-form-item>
        <el-form-item label="店铺名称">
          <el-input v-model="editForm.name" />
        </el-form-item>
        <el-form-item label="店铺描述">
          <el-input v-model="editForm.description" type="textarea" :rows="3" />
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="editForm.contact" placeholder="邮箱 / QQ / 微信" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="editDialog = false">取消</el-button>
        <el-button type="primary" :loading="saving" @click="doEdit">保存</el-button>
      </template>
    </el-dialog>

    <!-- 拒绝 -->
    <el-dialog v-model="rejectDialog" title="拒绝理由" width="420px">
      <el-input v-model="reason" type="textarea" :rows="3" placeholder="请填写拒绝理由" />
      <template #footer>
        <el-button @click="rejectDialog = false">取消</el-button>
        <el-button type="primary" :loading="saving" @click="doReject">确定</el-button>
      </template>
    </el-dialog>

    <!-- 封禁 -->
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

const { get, post, put } = useApi();
const loading = ref(true);
const saving = ref(false);
const shops = ref<any[]>([]);
const page = ref(1);
const pageSize = ref(20);
const total = ref(0);
const statusFilter = ref(-1);

const rejectDialog = ref(false);
const blockDialog = ref(false);
const editDialog = ref(false);
const reason = ref("");
const targetId = ref<number | null>(null);

const editForm = ref({ name: "", description: "", logo: "", contact: "" });

const shopText = (s: number) => ["待审核", "已通过", "已拒绝", "已封禁"][s] ?? "未知";
const shopTagType = (s: number) => (["warning", "success", "danger", "info"] as const)[s] ?? "info";

async function fetchShops() {
  loading.value = true;
  try {
    const res = await get<{ data: any[]; total: number }>(
      `/api/admin/shops?page=${page.value}&page_size=${pageSize.value}&status=${statusFilter.value}`
    );
    shops.value = res.data;
    total.value = res.total;
  } finally { loading.value = false; }
}

async function approve(id: number) {
  try { await post(`/api/admin/shops/${id}/approve`, {}); ElMessage.success("已批准"); await fetchShops(); }
  catch { ElMessage.error("操作失败"); }
}

function openReject(row: any) { targetId.value = row.id; reason.value = ""; rejectDialog.value = true; }
async function doReject() {
  saving.value = true;
  try {
    await post(`/api/admin/shops/${targetId.value}/reject`, { reason: reason.value });
    ElMessage.success("已拒绝"); rejectDialog.value = false; await fetchShops();
  } catch { ElMessage.error("操作失败"); } finally { saving.value = false; }
}

function openBlock(row: any) { targetId.value = row.id; reason.value = ""; blockDialog.value = true; }
async function doBlock() {
  saving.value = true;
  try {
    await post(`/api/admin/shops/${targetId.value}/block`, { reason: reason.value });
    ElMessage.success("已封禁"); blockDialog.value = false; await fetchShops();
  } catch { ElMessage.error("操作失败"); } finally { saving.value = false; }
}

function openEdit(row: any) {
  targetId.value = row.id;
  editForm.value = { name: row.name || "", description: row.description || "", logo: row.logo || "", contact: row.contact || "" };
  editDialog.value = true;
}
async function doEdit() {
  if (!editForm.value.name.trim()) { ElMessage.warning("店铺名称不能为空"); return; }
  saving.value = true;
  try {
    await put(`/api/admin/shops/${targetId.value}`, editForm.value);
    ElMessage.success("保存成功"); editDialog.value = false; await fetchShops();
  } catch { ElMessage.error("保存失败"); } finally { saving.value = false; }
}

onMounted(fetchShops);
</script>

<style scoped>
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.page-title { font-size: 20px; font-weight: 600; color: #1d2129; }
.pagination { display: flex; justify-content: flex-end; margin-top: 16px; }
.shop-cell { display: flex; align-items: center; gap: 10px; }
.shop-logo { flex-shrink: 0; border-radius: 6px; border: 1px solid #ebeef5; }
.shop-name { font-weight: 500; font-size: 14px; color: #1d2129; line-height: 1.4; }
.shop-contact { font-size: 12px; color: #909399; line-height: 1.4; }
.text-muted { color: #c0c4cc; }
.logo-edit { display: flex; align-items: flex-start; }
</style>
