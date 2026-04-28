<template>
  <div>
    <div class="page-title">仪表板</div>
    <el-row :gutter="16" v-loading="loading">
      <el-col :span="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-icon" style="background:#e6f4ff"><el-icon size="28" color="#1677ff"><User /></el-icon></div>
          <div class="stat-info">
            <div class="stat-value">{{ stats.users }}</div>
            <div class="stat-label">用户总数</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-icon" style="background:#f6ffed"><el-icon size="28" color="#52c41a"><Goods /></el-icon></div>
          <div class="stat-info">
            <div class="stat-value">{{ stats.products }}</div>
            <div class="stat-label">商品总数</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-icon" style="background:#fff7e6"><el-icon size="28" color="#fa8c16"><List /></el-icon></div>
          <div class="stat-info">
            <div class="stat-value">{{ stats.orders }}</div>
            <div class="stat-label">订单总数</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-icon" style="background:#f9f0ff"><el-icon size="28" color="#722ed1"><Grid /></el-icon></div>
          <div class="stat-info">
            <div class="stat-value">{{ stats.categories }}</div>
            <div class="stat-label">分类总数</div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: "admin" });

const { get } = useApi();
const loading = ref(true);
const stats = ref({ users: 0, products: 0, orders: 0, categories: 0 });

onMounted(async () => {
  try {
    const res = await get<{ stats: typeof stats.value }>("/api/admin/dashboard");
    stats.value = res.stats;
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.page-title { font-size: 20px; font-weight: 600; margin-bottom: 20px; color: #1d2129; }
.stat-card :deep(.el-card__body) { display: flex; align-items: center; gap: 16px; padding: 20px; }
.stat-icon { width: 56px; height: 56px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.stat-value { font-size: 28px; font-weight: 700; color: #1d2129; line-height: 1; }
.stat-label { font-size: 13px; color: #86909c; margin-top: 4px; }
</style>
