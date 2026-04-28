<template>
  <div>
    <div class="page-header">
      <span class="page-title">分类管理</span>
      <el-button type="primary" :icon="Plus" @click="openCreate">新增分类</el-button>
    </div>

    <el-card shadow="never">
      <el-table :data="categories" v-loading="loading" stripe>
        <el-table-column prop="id" label="ID" width="70" />
        <el-table-column label="图片" width="80">
          <template #default="{ row }">
            <el-image
              v-if="row.image"
              :src="row.image"
              style="width:48px;height:48px;border-radius:4px;"
              fit="cover"
              :preview-src-list="[row.image]"
              preview-teleported
            />
            <span v-else class="no-image">-</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="description" label="描述" show-overflow-tooltip />
        <el-table-column prop="sort" label="排序" width="80" />
        <el-table-column label="状态" width="90">
          <template #default="{ row }">
            <el-tag :type="row.is_active ? 'success' : 'danger'" size="small">
              {{ row.is_active ? "启用" : "禁用" }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" size="small" @click="openEdit(row)">编辑</el-button>
            <el-popconfirm title="确认删除？" @confirm="deleteItem(row.id)">
              <template #reference>
                <el-button link type="danger" size="small">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="dialogVisible" :title="editingId ? '编辑分类' : '新增分类'" width="480px">
      <el-form :model="form" label-width="80px">
        <el-form-item label="名称" required>
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description" />
        </el-form-item>
        <el-form-item label="分类图片">
          <div class="upload-area">
            <el-upload
              class="image-uploader"
              action="/api/admin/upload/image"
              :show-file-list="false"
              :on-success="handleUploadSuccess"
              :on-error="handleUploadError"
              :before-upload="beforeUpload"
              accept="image/jpeg,image/png,image/gif,image/webp"
              with-credentials
            >
              <el-image
                v-if="form.image"
                :src="form.image"
                class="upload-preview"
                fit="cover"
              />
              <el-icon v-else class="upload-icon"><Plus /></el-icon>
            </el-upload>
            <div v-if="form.image" class="upload-actions">
              <el-button size="small" type="danger" text @click="form.image = ''">删除图片</el-button>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="图标">
          <el-input v-model="form.icon" placeholder="图标 URL 或 class" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="form.sort" :min="0" style="width:100%" />
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="form.is_active" active-text="启用" inactive-text="禁用" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="saving" @click="save">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { Plus } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";

definePageMeta({ layout: "admin" });

const { get, post, put, del } = useApi();
const loading = ref(true);
const saving = ref(false);
const dialogVisible = ref(false);
const editingId = ref<number | null>(null);
const categories = ref<any[]>([]);

const defaultForm = () => ({ name: "", description: "", icon: "", image: "", sort: 0, is_active: true });
const form = ref(defaultForm());

async function fetch() {
  loading.value = true;
  try {
    const res = await get<{ categories: any[] }>("/api/admin/categories");
    categories.value = res.categories;
  } finally { loading.value = false; }
}

function openCreate() { editingId.value = null; form.value = defaultForm(); dialogVisible.value = true; }
function openEdit(row: any) {
  editingId.value = row.id;
  form.value = { name: row.name, description: row.description ?? "", icon: row.icon ?? "", image: row.image ?? "", sort: row.sort, is_active: row.is_active };
  dialogVisible.value = true;
}

function beforeUpload(file: File) {
  const isImage = ["image/jpeg", "image/png", "image/gif", "image/webp"].includes(file.type);
  const isLt5M = file.size / 1024 / 1024 < 5;
  if (!isImage) { ElMessage.error("只支持 JPG、PNG、GIF、WEBP 格式"); return false; }
  if (!isLt5M) { ElMessage.error("图片大小不能超过 5MB"); return false; }
  return true;
}

function handleUploadSuccess(res: any) {
  if (res.success) {
    form.value.image = res.url;
    ElMessage.success("图片上传成功");
  } else {
    ElMessage.error("上传失败");
  }
}

function handleUploadError() {
  ElMessage.error("图片上传失败");
}

async function save() {
  if (!form.value.name) return ElMessage.warning("请填写分类名称");
  saving.value = true;
  try {
    editingId.value ? await put(`/api/admin/categories/${editingId.value}`, form.value) : await post("/api/admin/categories", form.value);
    ElMessage.success("保存成功");
    dialogVisible.value = false;
    await fetch();
  } catch { ElMessage.error("保存失败"); } finally { saving.value = false; }
}

async function deleteItem(id: number) {
  try { await del(`/api/admin/categories/${id}`); ElMessage.success("删除成功"); await fetch(); }
  catch { ElMessage.error("删除失败"); }
}

onMounted(fetch);
</script>

<style scoped>
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.page-title { font-size: 20px; font-weight: 600; color: #1d2129; }
.no-image { color: #c0c4cc; font-size: 12px; }
.upload-area { display: flex; align-items: center; gap: 12px; }
.image-uploader :deep(.el-upload) {
  width: 100px;
  height: 100px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.image-uploader :deep(.el-upload:hover) { border-color: #409eff; }
.upload-preview { width: 100px; height: 100px; display: block; }
.upload-icon { font-size: 28px; color: #8c939d; }
</style>

