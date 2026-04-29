<template>
  <div class="image-upload">
    <el-upload
      class="uploader"
      action="/api/admin/upload/image"
      :show-file-list="false"
      :on-success="onSuccess"
      :on-error="onError"
      :before-upload="beforeUpload"
      accept="image/jpeg,image/png,image/gif,image/webp"
      with-credentials
    >
      <div class="preview-box">
        <el-image
          v-if="modelValue"
          :src="modelValue"
          fit="cover"
          class="preview-img"
        />
        <div v-else class="placeholder">
          <el-icon :size="28" color="#c0c4cc"><Plus /></el-icon>
          <span>点击上传</span>
        </div>
        <div v-if="modelValue" class="overlay">
          <el-icon :size="20" color="#fff"><Upload /></el-icon>
          <span>重新上传</span>
        </div>
      </div>
    </el-upload>

    <div class="url-row">
      <el-input
        :model-value="modelValue"
        placeholder="或直接输入图片 URL"
        size="small"
        clearable
        @input="$emit('update:modelValue', $event)"
        @clear="$emit('update:modelValue', '')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import { Plus, Upload } from "@element-plus/icons-vue";

defineProps<{ modelValue: string }>();
const emit = defineEmits<{ (e: "update:modelValue", v: string): void }>();

function beforeUpload(file: File) {
  const ok = ["image/jpeg", "image/png", "image/gif", "image/webp"].includes(file.type);
  const small = file.size / 1024 / 1024 < 5;
  if (!ok) { ElMessage.error("只支持 JPG/PNG/GIF/WEBP 格式"); return false; }
  if (!small) { ElMessage.error("图片大小不能超过 5MB"); return false; }
  return true;
}

function onSuccess(res: { success: boolean; url: string }) {
  if (res.success) {
    emit("update:modelValue", res.url);
    ElMessage.success("上传成功");
  } else {
    ElMessage.error("上传失败");
  }
}

function onError() {
  ElMessage.error("上传失败");
}
</script>

<style scoped>
.image-upload { display: flex; flex-direction: column; gap: 8px; }
.uploader :deep(.el-upload) { display: block; }
.preview-box {
  width: 120px;
  height: 90px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fafafa;
  transition: border-color 0.2s;
}
.preview-box:hover { border-color: #409eff; }
.preview-box:hover .overlay { opacity: 1; }
.preview-img { width: 100%; height: 100%; display: block; }
.placeholder { display: flex; flex-direction: column; align-items: center; gap: 4px; color: #909399; font-size: 12px; }
.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.45);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  color: #fff;
  font-size: 12px;
  opacity: 0;
  transition: opacity 0.2s;
}
.url-row { width: 120px; }
</style>
