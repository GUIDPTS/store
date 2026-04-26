<template>
  <section class="py-40 bg-color-one">
    <div class="container container-lg">
      <ul class="flex items-center gap-8 text-sm text-gray-500">
        <li><router-link :to="{ name: 'home' }" class="hover-text-main-600">首页</router-link></li>
        <li><i class="ph ph-caret-right text-xs"></i></li>
        <li><router-link :to="{ name: 'account-orders' }" class="hover-text-main-600">我的订单</router-link></li>
        <li><i class="ph ph-caret-right text-xs"></i></li>
        <li class="text-heading">订单详情</li>
      </ul>
    </div>
  </section>

  <section class="py-40">
    <div class="container container-lg">
      <div v-if="loading" class="py-80 text-center text-gray-400">
        <i class="ph ph-circle-notch text-3xl animate-spin"></i>
      </div>

      <template v-else-if="order">
        <div class="border border-gray-100 rounded-16 bg-white p-32 mb-24">
          <div class="flex-between flex-wrap gap-16 mb-24 pb-24 border-b border-gray-100">
            <div>
              <span class="text-gray-500 text-sm">订单编号</span>
              <h5 class="mb-0 mt-4 flex items-center gap-12">
                <span class="font-mono">{{ order.order_no }}</span>
                <CopyText :text="order.order_no" class="text-md" />
              </h5>
            </div>
            <span :class="statusClass" class="py-8 px-20 rounded-pill text-sm fw-bold">
              <i :class="statusIcon" class="me-4"></i> {{ statusText }}
            </span>
          </div>

          <div class="grid gap-24 mb-24" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))">
            <div>
              <span class="text-sm text-gray-500 block mb-4">商品</span>
              <span class="text-md">{{ order.product?.name || '—' }}</span>
            </div>
            <div>
              <span class="text-sm text-gray-500 block mb-4">数量</span>
              <span class="text-md">{{ order.quantity }}</span>
            </div>
            <div>
              <span class="text-sm text-gray-500 block mb-4">单价</span>
              <span class="text-md">¥{{ Number(order.unit_price || 0).toFixed(2) }}</span>
            </div>
            <div>
              <span class="text-sm text-gray-500 block mb-4">应付金额</span>
              <span class="text-xl fw-bold text-main-600">¥{{ Number(order.total_amount || 0).toFixed(2) }}</span>
            </div>
            <div>
              <span class="text-sm text-gray-500 block mb-4">下单时间</span>
              <span class="text-md">{{ formatDate(order.created_at) }}</span>
            </div>
            <div v-if="order.paid_at">
              <span class="text-sm text-gray-500 block mb-4">支付时间</span>
              <span class="text-md">{{ formatDate(order.paid_at) }}</span>
            </div>
          </div>

          <div v-if="order.contact || order.remark" class="border-t border-gray-100 pt-16">
            <div v-if="order.contact" class="mb-8 text-sm">
              <span class="text-gray-500">联系方式：</span><span>{{ order.contact }}</span>
            </div>
            <div v-if="order.remark" class="text-sm">
              <span class="text-gray-500">备注：</span><span>{{ order.remark }}</span>
            </div>
          </div>

          <div v-if="order.status === 0" class="mt-24 flex items-center gap-12 flex-wrap">
            <a v-if="order.payment_url" :href="order.payment_url" class="btn btn-main rounded-pill px-32 py-12 inline-flex items-center gap-8">
              <i class="ph ph-credit-card"></i> 立即支付
            </a>
            <button v-else type="button" class="btn btn-main rounded-pill px-32 py-12 inline-flex items-center gap-8" @click="repay">
              <i class="ph ph-arrows-clockwise"></i> 重新发起支付
            </button>
            <button type="button" class="btn rounded-pill px-24 py-12 border border-gray-100 hover-border-danger-600 hover-text-danger-600" @click="cancel">
              取消订单
            </button>
          </div>
        </div>

        <!-- Card keys -->
        <div v-if="cards.length" class="border border-gray-100 rounded-16 bg-white p-32">
          <h6 class="text-md mb-16 flex items-center gap-12">
            <i class="ph ph-key text-main-600"></i> 卡密信息（共 {{ cards.length }} 个）
          </h6>
          <ul class="flex flex-col gap-8">
            <li v-for="(c, i) in cards" :key="i"
                class="flex items-center justify-between gap-12 p-12 bg-color-one rounded-12 font-mono">
              <span class="break-all">{{ c }}</span>
              <CopyText :text="c" class="text-main-600 flex-shrink-0" />
            </li>
          </ul>
        </div>
      </template>

      <EmptyState v-else icon="ph ph-warning-circle" title="订单不存在" />
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/utils/api'
import CopyText from '@/components/CopyText.vue'
import EmptyState from '@/components/EmptyState.vue'
import { useToastStore } from '@/stores/toast'
import { formatDate } from '@/utils/helpers'

const route = useRoute()
const toast = useToastStore()
const order = ref(null)
const loading = ref(true)

const cards = computed(() => {
  const raw = order.value?.card_keys
  if (!raw) return []
  if (Array.isArray(raw)) {
    return raw.map(x => (typeof x === 'string' ? x : (x.key || x.code || JSON.stringify(x))))
  }
  if (typeof raw === 'string') return raw.split(/\r?\n/).filter(Boolean)
  return []
})

const STATUS = {
  0: { text: '待支付', icon: 'ph ph-clock', cls: 'bg-warning-50 text-warning-600' },
  1: { text: '已支付', icon: 'ph ph-check-circle', cls: 'bg-main-50 text-main-600' },
  2: { text: '已完成', icon: 'ph ph-check-circle', cls: 'bg-main-50 text-main-600' },
  3: { text: '已取消', icon: 'ph ph-x-circle', cls: 'bg-gray-100 text-gray-600' },
  4: { text: '已退款', icon: 'ph ph-arrow-counter-clockwise', cls: 'bg-gray-100 text-gray-600' },
}
const statusInfo = computed(() => STATUS[order.value?.status] || STATUS[0])
const statusText = computed(() => statusInfo.value.text)
const statusIcon = computed(() => statusInfo.value.icon)
const statusClass = computed(() => statusInfo.value.cls)

async function load() {
  loading.value = true
  try {
    const r = await api.get(`/api/orders/${route.params.orderNo}`)
    order.value = r.data?.order || r.data
  } catch (_) { order.value = null }
  finally { loading.value = false }
}

async function repay() {
  try {
    const r = await api.post(`/api/orders/${order.value.order_no}/repay`)
    if (r.data?.payment_url) window.location.href = r.data.payment_url
    else load()
  } catch (e) { toast.error(e.response?.data?.error || '操作失败') }
}

async function cancel() {
  if (!confirm('确定要取消订单吗？')) return
  try {
    await api.post(`/api/order/${order.value.order_no}/cancel`)
    toast.success('订单已取消')
    load()
  } catch (e) { toast.error(e.response?.data?.error || '取消失败') }
}

onMounted(load)
</script>
