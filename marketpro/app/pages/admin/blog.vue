<template>
  <div>
    <div class="page-header">
      <span class="page-title">博客管理</span>
      <el-button type="primary" @click="openCreate">
        <i class="ph ph-plus me-6"></i> 新建文章
      </el-button>
    </div>

    <el-card shadow="never">
      <el-table :data="posts" v-loading="loading" stripe>
        <el-table-column label="封面" width="80">
          <template #default="{ row }">
            <el-avatar v-if="row.cover_image" :src="row.cover_image" shape="square" :size="48" fit="cover" style="border-radius:6px" />
            <div v-else class="w-48 h-48 bg-gray-100 flex-center rounded-6 text-gray-300"><i class="ph ph-image text-xl"></i></div>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" min-width="200" show-overflow-tooltip />
        <el-table-column prop="category" label="分类" width="100" />
        <el-table-column label="状态" width="90">
          <template #default="{ row }">
            <el-tag :type="row.is_published ? 'success' : 'info'" size="small">
              {{ row.is_published ? '已发布' : '草稿' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="阅读" prop="views" width="80" />
        <el-table-column label="发布时间" width="160">
          <template #default="{ row }">
            {{ row.published_at ? new Date(row.published_at).toLocaleString('zh-CN') : '—' }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" size="small" @click="openEdit(row)">编辑</el-button>
            <el-button link type="info" size="small" @click="previewPost(row)">预览</el-button>
            <el-popconfirm title="确认删除该文章？" @confirm="deletePost(row.id)">
              <template #reference>
                <el-button link type="danger" size="small">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination v-model:current-page="page" :page-size="pageSize" :total="total"
          layout="total, prev, pager, next" @current-change="fetchPosts" />
      </div>
    </el-card>

    <!-- 新建/编辑 对话框 -->
    <el-dialog v-model="dialogVisible" :title="editingId ? '编辑文章' : '新建文章'" width="760px" :close-on-click-modal="false">
      <el-form :model="form" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="form.title" placeholder="文章标题" />
        </el-form-item>
        <el-form-item label="分类">
          <el-select
            v-model="form.category"
            filterable
            allow-create
            default-first-option
            placeholder="选择或输入新分类"
            style="width:100%"
            @focus="loadCategories"
          >
            <el-option
              v-for="cat in categoryOptions"
              :key="cat"
              :label="cat"
              :value="cat"
            />
          </el-select>
          <div style="font-size:12px;color:#86909c;margin-top:4px">可从已有分类中选择，或直接输入新分类名称</div>
        </el-form-item>
        <el-form-item label="封面图">
          <AdminImageUpload v-model="form.cover_image" />
        </el-form-item>
        <el-form-item label="摘要">
          <el-input v-model="form.excerpt" type="textarea" :rows="2" placeholder="文章摘要（可选，列表页显示）" />
        </el-form-item>
        <el-form-item label="正文">
          <el-input v-model="form.content" type="textarea" :rows="14" placeholder="支持换行分段，可粘贴 HTML" style="font-family:monospace" />
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="form.is_published" active-text="立即发布" inactive-text="保存草稿" />
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

const { get, post: postReq, put, del } = useApi();
const loading = ref(true);
const saving = ref(false);
const posts = ref<any[]>([]);
const page = ref(1);
const pageSize = ref(20);
const total = ref(0);
const dialogVisible = ref(false);
const editingId = ref<number | null>(null);

// 分类选项
const categoryOptions = ref<string[]>([]);
let categoriesLoaded = false;
async function loadCategories() {
  if (categoriesLoaded) return;
  try {
    const res = await get<{ name: string; count: number }[]>("/api/blog/categories");
    categoryOptions.value = (Array.isArray(res) ? res : []).map((c: any) => c.name).filter(Boolean);
    categoriesLoaded = true;
  } catch { /* ignore */ }
}

const emptyForm = () => ({ title: "", category: "", cover_image: "", excerpt: "", content: "", is_published: false });
const form = ref(emptyForm());

async function fetchPosts() {
  loading.value = true;
  try {
    const res = await get<{ posts: any[]; total: number }>(`/api/admin/blog/posts?page=${page.value}&page_size=${pageSize.value}`);
    posts.value = res.posts ?? [];
    total.value = res.total ?? 0;
  } finally { loading.value = false; }
}

function openCreate() {
  editingId.value = null;
  form.value = emptyForm();
  dialogVisible.value = true;
  loadCategories();
}

function openEdit(row: any) {
  editingId.value = row.id;
  form.value = { title: row.title, category: row.category ?? "", cover_image: row.cover_image ?? "", excerpt: row.excerpt ?? "", content: row.content ?? "", is_published: row.is_published };
  dialogVisible.value = true;
  loadCategories();
}

async function save() {
  if (!form.value.title.trim()) { ElMessage.warning("标题不能为空"); return; }
  saving.value = true;
  try {
    if (editingId.value) {
      await put(`/api/admin/blog/posts/${editingId.value}`, form.value);
    } else {
      await postReq("/api/admin/blog/posts", form.value);
    }
    ElMessage.success("保存成功");
    dialogVisible.value = false;
    await fetchPosts();
  } catch { ElMessage.error("保存失败"); } finally { saving.value = false; }
}

async function deletePost(id: number) {
  try { await del(`/api/admin/blog/posts/${id}`); ElMessage.success("已删除"); await fetchPosts(); }
  catch { ElMessage.error("删除失败"); }
}

function previewPost(row: any) {
  window.open(`/blog/${row.slug}`, "_blank");
}

onMounted(fetchPosts);
</script>

<style scoped>
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.page-title { font-size: 20px; font-weight: 600; color: #1d2129; }
.pagination { display: flex; justify-content: flex-end; margin-top: 16px; }
</style>
