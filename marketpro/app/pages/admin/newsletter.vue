<template>
  <div>
    <div class="page-header">
      <span class="page-title">邮件订阅列表</span>
      <div class="d-flex align-items-center gap-12">
        <el-text type="info" size="small">共 {{ total }} 位订阅者</el-text>
        <el-input
          v-model="keyword"
          placeholder="搜索邮箱"
          clearable
          style="width:220px"
          @keydown.enter="fetchList"
          @clear="fetchList"
        >
          <template #prefix><el-icon><Search /></el-icon></template>
        </el-input>
      </div>
    </div>

    <el-card shadow="never">
      <el-table :data="list" v-loading="loading" stripe>
        <el-table-column prop="id" label="ID" width="70" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column label="订阅时间" width="180">
          <template #default="{ row }">{{ fmtDate(row.created_at) }}</template>
        </el-table-column>
        <el-table-column label="操作" width="80" fixed="right">
          <template #default="{ row }">
            <el-popconfirm title="确认删除该订阅？" @confirm="deleteSub(row.id)">
              <template #reference>
                <el-button link type="danger" size="small">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination">
        <el-pagination
          v-model:current-page="page"
          :page-size="pageSize"
          :total="total"
          layout="total, prev, pager, next"
          @current-change="fetchList"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";

definePageMeta({ layout: "admin" });

const { get, del } = useApi();
const loading = ref(true);
const list = ref<any[]>([]);
const page = ref(1);
const pageSize = ref(50);
const total = ref(0);
const keyword = ref("");

async function fetchList() {
  loading.value = true;
  try {
    const params: Record<string, string> = {
      page: String(page.value),
      page_size: String(pageSize.value),
    };
    if (keyword.value.trim()) params.keyword = keyword.value.trim();
    const res = await get<{ data: any[]; total: number }>(
      `/api/admin/newsletter/subscribers?${new URLSearchParams(params)}`
    );
    list.value = res.data ?? [];
    total.value = res.total ?? 0;
  } finally {
    loading.value = false;
  }
}

async function deleteSub(id: number) {
  try {
    await del(`/api/admin/newsletter/subscribers/${id}`);
    ElMessage.success("已删除");
    await fetchList();
  } catch {
    ElMessage.error("删除失败");
  }
}

function fmtDate(d: string) {
  if (!d) return "—";
  return new Date(d).toLocaleString("zh-CN", { hour12: false });
}

onMounted(fetchList);
</script>

<style scoped>
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.page-title { font-size: 20px; font-weight: 600; color: #1d2129; }
.pagination { display: flex; justify-content: flex-end; margin-top: 16px; }
</style>
