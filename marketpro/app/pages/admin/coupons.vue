<template>
  <div>
    <div class="page-header">
      <span class="page-title">优惠券管理</span>
      <div class="d-flex gap-8">
        <el-select v-model="typeFilter" style="width:130px" @change="fetchList">
          <el-option value="" label="全部类型" />
          <el-option value="platform" label="平台券" />
          <el-option value="shop" label="店铺券" />
        </el-select>
        <el-button type="primary" @click="openCreate">
          <i class="ph ph-plus me-6"></i> 新建优惠券
        </el-button>
      </div>
    </div>

    <el-card shadow="never">
      <el-table :data="list" v-loading="loading" stripe>
        <el-table-column prop="code" label="券码" width="140">
          <template #default="{ row }">
            <span class="font-monospace fw-bold">{{ row.code }}</span>
          </template>
        </el-table-column>
        <el-table-column label="类型" width="90">
          <template #default="{ row }">
            <el-tag :type="row.type === 'platform' ? 'primary' : 'warning'" size="small">
              {{ row.type === 'platform' ? '平台券' : '店铺券' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="所属店铺" width="120" show-overflow-tooltip>
          <template #default="{ row }">{{ row.shop?.name || (row.type === 'platform' ? '全平台' : '-') }}</template>
        </el-table-column>
        <el-table-column label="折扣" width="130">
          <template #default="{ row }">
            <span v-if="row.discount_type === 'percent'" class="text-danger-600 fw-semibold">
              减 {{ row.discount_value }}%
            </span>
            <span v-else class="text-danger-600 fw-semibold">
              减 {{ row.discount_value }} 能量
            </span>
          </template>
        </el-table-column>
        <el-table-column label="最低金额" width="100">
          <template #default="{ row }">{{ row.min_amount > 0 ? row.min_amount + ' 能量' : '不限' }}</template>
        </el-table-column>
        <el-table-column label="使用次数" width="100">
          <template #default="{ row }">
            {{ row.used_count }} / {{ row.max_uses > 0 ? row.max_uses : '不限' }}
          </template>
        </el-table-column>
        <el-table-column label="过期时间" width="160">
          <template #default="{ row }">
            {{ row.expires_at ? new Date(row.expires_at).toLocaleDateString('zh-CN') : '永不过期' }}
          </template>
        </el-table-column>
        <el-table-column label="状态" width="80">
          <template #default="{ row }">
            <el-tag :type="row.is_active ? 'success' : 'info'" size="small">
              {{ row.is_active ? '启用' : '停用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="说明" show-overflow-tooltip />
        <el-table-column label="操作" width="120" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" size="small" @click="openEdit(row)">编辑</el-button>
            <el-popconfirm title="确认删除？" @confirm="deleteCoupon(row.id)">
              <template #reference>
                <el-button link type="danger" size="small">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination v-model:current-page="page" :page-size="pageSize" :total="total"
          layout="total, prev, pager, next" @current-change="fetchList" />
      </div>
    </el-card>

    <!-- 新建/编辑弹窗 -->
    <el-dialog v-model="dialogVisible" :title="editingId ? '编辑优惠券' : '新建优惠券'" width="520px">
      <el-form :model="form" label-width="100px">
        <el-form-item label="券码" v-if="!editingId">
          <el-input v-model="form.code" placeholder="如：SAVE20" style="text-transform:uppercase" />
        </el-form-item>
        <el-form-item label="类型" v-if="!editingId">
          <el-radio-group v-model="form.type">
            <el-radio value="platform">平台券（全平台通用）</el-radio>
            <el-radio value="shop">店铺券（指定店铺）</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="form.type === 'shop' && !editingId" label="所属店铺">
          <el-select v-model="form.shop_id" placeholder="选择店铺" filterable style="width:100%" @focus="loadShops">
            <el-option v-for="s in shopOptions" :key="s.id" :label="s.name" :value="s.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="折扣类型" v-if="!editingId">
          <el-radio-group v-model="form.discount_type">
            <el-radio value="percent">百分比折扣（如 10 = 减10%）</el-radio>
            <el-radio value="fixed">固定减免能量</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="折扣值" v-if="!editingId">
          <el-input-number v-model="form.discount_value" :min="0.01" :precision="2" style="width:160px" />
          <el-text type="info" size="small" style="margin-left:8px">
            {{ form.discount_type === 'percent' ? '%（如10=减10%）' : '能量' }}
          </el-text>
        </el-form-item>
        <el-form-item label="最低金额">
          <el-input-number v-model="form.min_amount" :min="0" :precision="0" style="width:160px" />
          <el-text type="info" size="small" style="margin-left:8px">能量（0=不限）</el-text>
        </el-form-item>
        <el-form-item label="使用上限">
          <el-input-number v-model="form.max_uses" :min="0" :precision="0" style="width:160px" />
          <el-text type="info" size="small" style="margin-left:8px">次（0=不限）</el-text>
        </el-form-item>
        <el-form-item label="过期时间">
          <el-date-picker v-model="form.expires_at" type="datetime" placeholder="不填=永不过期"
            format="YYYY-MM-DD HH:mm" value-format="YYYY-MM-DDTHH:mm:ssZ" style="width:100%" />
        </el-form-item>
        <el-form-item label="说明">
          <el-input v-model="form.description" placeholder="如：新用户专享9折" />
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="form.is_active" active-text="启用" inactive-text="停用" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="saving" @click="save">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";

definePageMeta({ layout: "admin" });

const { get, post, put, del } = useApi();
const loading = ref(true);
const saving = ref(false);
const list = ref<any[]>([]);
const page = ref(1);
const pageSize = ref(20);
const total = ref(0);
const typeFilter = ref("");
const dialogVisible = ref(false);
const editingId = ref<number | null>(null);
const shopOptions = ref<any[]>([]);
let shopsLoaded = false;

const emptyForm = () => ({
  code: "", type: "platform", shop_id: 0,
  discount_type: "percent", discount_value: 10,
  min_amount: 0, max_uses: 0, expires_at: null as string | null,
  description: "", is_active: true,
});
const form = ref(emptyForm());

async function fetchList() {
  loading.value = true;
  try {
    const params = new URLSearchParams({ page: String(page.value), page_size: String(pageSize.value) });
    if (typeFilter.value) params.set("type", typeFilter.value);
    const res = await get<{ data: any[]; total: number }>(`/api/admin/coupons?${params}`);
    list.value = res.data ?? [];
    total.value = res.total ?? 0;
  } finally { loading.value = false; }
}

async function loadShops() {
  if (shopsLoaded) return;
  try {
    const res = await get<{ data: any[] }>("/api/admin/shops?page=1&page_size=100&status=1");
    shopOptions.value = res.data ?? [];
    shopsLoaded = true;
  } catch { /* ignore */ }
}

function openCreate() {
  editingId.value = null;
  form.value = emptyForm();
  dialogVisible.value = true;
}

function openEdit(row: any) {
  editingId.value = row.id;
  form.value = {
    code: row.code, type: row.type, shop_id: row.shop_id,
    discount_type: row.discount_type, discount_value: row.discount_value,
    min_amount: row.min_amount, max_uses: row.max_uses,
    expires_at: row.expires_at ?? null,
    description: row.description ?? "", is_active: row.is_active,
  };
  dialogVisible.value = true;
}

async function save() {
  saving.value = true;
  try {
    if (editingId.value) {
      await put(`/api/admin/coupons/${editingId.value}`, {
        is_active: form.value.is_active,
        description: form.value.description,
        max_uses: form.value.max_uses,
        min_amount: form.value.min_amount,
        expires_at: form.value.expires_at || null,
      });
    } else {
      await post("/api/admin/coupons", form.value);
    }
    ElMessage.success("保存成功");
    dialogVisible.value = false;
    await fetchList();
  } catch (e: any) {
    ElMessage.error(e?.data?.error || "保存失败");
  } finally { saving.value = false; }
}

async function deleteCoupon(id: number) {
  try { await del(`/api/admin/coupons/${id}`); ElMessage.success("已删除"); await fetchList(); }
  catch { ElMessage.error("删除失败"); }
}

onMounted(fetchList);
</script>

<style scoped>
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.page-title { font-size: 20px; font-weight: 600; color: #1d2129; }
.pagination { display: flex; justify-content: flex-end; margin-top: 16px; }
</style>
