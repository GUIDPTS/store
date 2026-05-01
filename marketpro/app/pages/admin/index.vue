<template>
  <div v-loading="loading">
    <div class="page-title">仪表板</div>

    <!-- 核心指标 -->
    <el-row :gutter="16" class="mb-20">
      <el-col :xs="12" :sm="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-icon" style="background:#e6f4ff"><el-icon size="26" color="#1677ff"><User /></el-icon></div>
          <div class="stat-info">
            <div class="stat-value">{{ stats.users }}</div>
            <div class="stat-label">用户总数</div>
            <div class="stat-sub">今日新增 +{{ stats.today_users }}</div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="12" :sm="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-icon" style="background:#f6ffed"><el-icon size="26" color="#52c41a"><Goods /></el-icon></div>
          <div class="stat-info">
            <div class="stat-value">{{ stats.products }}</div>
            <div class="stat-label">上架商品</div>
            <div class="stat-sub">共 {{ stats.categories }} 个分类</div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="12" :sm="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-icon" style="background:#fff7e6"><el-icon size="26" color="#fa8c16"><List /></el-icon></div>
          <div class="stat-info">
            <div class="stat-value">{{ stats.orders }}</div>
            <div class="stat-label">总订单数</div>
            <div class="stat-sub">今日 +{{ stats.today_orders }}</div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="12" :sm="6">
        <el-card shadow="hover" class="stat-card">
          <div class="stat-icon" style="background:#fff0f6"><el-icon size="26" color="#eb2f96"><Money /></el-icon></div>
          <div class="stat-info">
            <div class="stat-value">{{ Math.round(stats.total_sales) }}</div>
            <div class="stat-label">总销售额（能量）</div>
            <div class="stat-sub">今日 +{{ Math.round(stats.today_sales) }}</div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 待处理提醒 -->
    <el-row :gutter="16" class="mb-20" v-if="stats.pending_orders > 0 || stats.pending_shops > 0 || stats.pending_withdrawals > 0">
      <el-col :span="24">
        <el-card shadow="never" style="border-color:#faad14">
          <div class="d-flex align-items-center gap-24 flex-wrap">
            <span style="font-weight:600;color:#d48806">⚠️ 待处理事项</span>
            <el-tag v-if="stats.pending_orders > 0" type="warning" effect="light" style="cursor:pointer" @click="$router.push('/admin/orders')">
              待支付订单 {{ stats.pending_orders }}
            </el-tag>
            <el-tag v-if="stats.pending_shops > 0" type="warning" effect="light" style="cursor:pointer" @click="$router.push('/admin/shops')">
              待审核店铺 {{ stats.pending_shops }}
            </el-tag>
            <el-tag v-if="stats.pending_withdrawals > 0" type="warning" effect="light" style="cursor:pointer" @click="$router.push('/admin/withdrawals')">
              待审核提现 {{ stats.pending_withdrawals }}
            </el-tag>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="16" class="mb-20">
      <!-- 近 7 天趋势 -->
      <el-col :sm="24" :md="14">
        <el-card shadow="never">
          <template #header><span style="font-weight:600">近 7 天订单趋势</span></template>
          <div class="chart-area">
            <div class="chart-bars">
              <div v-for="d in dailyStats" :key="d.date" class="chart-col">
                <div class="chart-bar-wrap">
                  <div class="chart-bar-orders" :style="{ height: barHeight(d.orders, maxOrders) + '%' }"
                    :title="`${d.date}\n订单：${d.orders}\n销售：${Math.round(d.sales)}`"></div>
                </div>
                <div class="chart-label">{{ d.date.slice(5) }}</div>
                <div class="chart-val">{{ d.orders }}</div>
              </div>
            </div>
            <div class="chart-legend">
              <span class="legend-dot" style="background:#1677ff"></span> 订单数
            </div>
          </div>
        </el-card>
      </el-col>

      <!-- 订单状态分布 -->
      <el-col :sm="24" :md="10">
        <el-card shadow="never">
          <template #header><span style="font-weight:600">订单状态分布</span></template>
          <div class="order-status-list">
            <div class="status-row">
              <span class="status-dot" style="background:#faad14"></span>
              <span class="status-name">待支付</span>
              <div class="status-bar-wrap">
                <div class="status-bar" style="background:#faad14"
                  :style="{ width: statusPct(stats.pending_orders) + '%' }"></div>
              </div>
              <span class="status-count">{{ stats.pending_orders }}</span>
            </div>
            <div class="status-row">
              <span class="status-dot" style="background:#52c41a"></span>
              <span class="status-name">已完成</span>
              <div class="status-bar-wrap">
                <div class="status-bar" style="background:#52c41a"
                  :style="{ width: statusPct(stats.completed_orders) + '%' }"></div>
              </div>
              <span class="status-count">{{ stats.completed_orders }}</span>
            </div>
            <div class="status-row">
              <span class="status-dot" style="background:#ff4d4f"></span>
              <span class="status-name">已取消</span>
              <div class="status-bar-wrap">
                <div class="status-bar" style="background:#ff4d4f"
                  :style="{ width: statusPct(stats.cancelled_orders) + '%' }"></div>
              </div>
              <span class="status-count">{{ stats.cancelled_orders }}</span>
            </div>
          </div>

          <el-divider style="margin:16px 0" />

          <div style="font-weight:600;margin-bottom:12px">热销商品 Top 5</div>
          <div v-for="(p, i) in topProducts" :key="p.id" class="top-product-row">
            <span class="top-rank" :class="i < 3 ? 'top-rank-hot' : ''">{{ i + 1 }}</span>
            <img v-if="p.image" :src="p.image" class="top-img" />
            <div v-else class="top-img-placeholder"><el-icon><Goods /></el-icon></div>
            <div class="top-info">
              <div class="top-name">{{ p.name }}</div>
              <div class="top-meta">¥{{ p.price }} · 已售 {{ p.sales_count }}</div>
            </div>
          </div>
          <div v-if="!topProducts.length" style="color:#86909c;font-size:13px;text-align:center;padding:16px 0">暂无数据</div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 最近订单 -->
    <el-card shadow="never">
      <template #header>
        <div class="d-flex justify-content-between align-items-center">
          <span style="font-weight:600">最近订单</span>
          <el-button link type="primary" @click="$router.push('/admin/orders')">查看全部</el-button>
        </div>
      </template>
      <el-table :data="recentOrders" size="small" stripe>
        <el-table-column prop="order_no" label="订单号" width="180" show-overflow-tooltip />
        <el-table-column label="商品" show-overflow-tooltip>
          <template #default="{ row }">{{ row.product?.name || '-' }}</template>
        </el-table-column>
        <el-table-column label="买家" width="120">
          <template #default="{ row }">{{ row.user?.username || '-' }}</template>
        </el-table-column>
        <el-table-column label="金额" width="100">
          <template #default="{ row }">
            <span style="color:#e6162d;font-weight:600">{{ row.total_amount }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="90">
          <template #default="{ row }">
            <el-tag :type="orderTagType(row.status)" size="small">{{ orderStatusText(row.status) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="时间" width="160">
          <template #default="{ row }">{{ fmtDate(row.created_at) }}</template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { User, Goods, List, Money } from "@element-plus/icons-vue";

definePageMeta({ layout: "admin" });

const { get } = useApi();
const loading = ref(true);

const stats = ref({
  users: 0, products: 0, orders: 0, categories: 0,
  pending_orders: 0, completed_orders: 0, cancelled_orders: 0,
  total_sales: 0, today_sales: 0, today_users: 0, today_orders: 0,
  pending_shops: 0, pending_withdrawals: 0,
});
const recentOrders = ref<any[]>([]);
const dailyStats = ref<{ date: string; orders: number; sales: number }[]>([]);
const topProducts = ref<any[]>([]);

onMounted(async () => {
  try {
    const res = await get<any>("/api/admin/dashboard");
    stats.value = res.stats ?? stats.value;
    recentOrders.value = res.recent_orders ?? [];
    dailyStats.value = res.daily_stats ?? [];
    topProducts.value = res.top_products ?? [];
  } finally {
    loading.value = false;
  }
});

const maxOrders = computed(() => Math.max(...dailyStats.value.map(d => d.orders), 1));

function barHeight(val: number, max: number) {
  return max === 0 ? 0 : Math.max(4, Math.round((val / max) * 100));
}

function statusPct(val: number) {
  const total = stats.value.orders;
  return total === 0 ? 0 : Math.round((val / total) * 100);
}

const ORDER_STATUS: Record<number, string> = { 0: '待支付', 1: '待发货', 2: '已完成', 3: '已取消', 4: '已发货' };
const ORDER_TAG: Record<number, string> = { 0: 'warning', 1: 'primary', 2: 'success', 3: 'danger', 4: 'info' };
function orderStatusText(s: number) { return ORDER_STATUS[s] ?? '未知'; }
function orderTagType(s: number) { return (ORDER_TAG[s] ?? 'info') as any; }

function fmtDate(d: string) {
  if (!d) return '-';
  return new Date(d).toLocaleString('zh-CN', { hour12: false });
}
</script>

<style scoped>
.page-title { font-size: 20px; font-weight: 600; margin-bottom: 20px; color: #1d2129; }

/* 统计卡片 */
.stat-card :deep(.el-card__body) { display: flex; align-items: center; gap: 14px; padding: 18px; }
.stat-icon { width: 52px; height: 52px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.stat-value { font-size: 26px; font-weight: 700; color: #1d2129; line-height: 1; }
.stat-label { font-size: 13px; color: #86909c; margin-top: 4px; }
.stat-sub { font-size: 12px; color: #52c41a; margin-top: 2px; }

/* 趋势图 */
.chart-area { padding: 8px 0; }
.chart-bars { display: flex; align-items: flex-end; gap: 8px; height: 120px; padding-bottom: 24px; position: relative; }
.chart-col { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; }
.chart-bar-wrap { flex: 1; width: 100%; display: flex; align-items: flex-end; }
.chart-bar-orders { width: 100%; background: #1677ff; border-radius: 4px 4px 0 0; min-height: 4px; transition: height .3s; }
.chart-label { font-size: 11px; color: #86909c; }
.chart-val { font-size: 11px; color: #1d2129; font-weight: 600; }
.chart-legend { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #86909c; margin-top: 8px; }
.legend-dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }

/* 订单状态 */
.order-status-list { display: flex; flex-direction: column; gap: 12px; }
.status-row { display: flex; align-items: center; gap: 8px; }
.status-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.status-name { font-size: 13px; color: #1d2129; width: 48px; flex-shrink: 0; }
.status-bar-wrap { flex: 1; height: 8px; background: #f0f0f0; border-radius: 4px; overflow: hidden; }
.status-bar { height: 100%; border-radius: 4px; transition: width .4s; }
.status-count { font-size: 13px; font-weight: 600; color: #1d2129; width: 36px; text-align: right; flex-shrink: 0; }

/* 热销商品 */
.top-product-row { display: flex; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 1px solid #f0f0f0; }
.top-product-row:last-child { border-bottom: none; }
.top-rank { width: 20px; height: 20px; border-radius: 50%; background: #f0f0f0; color: #86909c; font-size: 12px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.top-rank-hot { background: #ff4d4f; color: #fff; }
.top-img { width: 36px; height: 36px; border-radius: 6px; object-fit: contain; border: 1px solid #f0f0f0; flex-shrink: 0; }
.top-img-placeholder { width: 36px; height: 36px; border-radius: 6px; background: #f5f5f5; display: flex; align-items: center; justify-content: center; color: #bfbfbf; flex-shrink: 0; }
.top-info { flex: 1; min-width: 0; }
.top-name { font-size: 13px; font-weight: 500; color: #1d2129; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.top-meta { font-size: 12px; color: #86909c; margin-top: 2px; }
</style>
