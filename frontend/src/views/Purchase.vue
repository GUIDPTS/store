<template>
  <section class="py-40 bg-color-one">
    <div class="container container-lg">
      <ul class="flex items-center gap-8 text-sm text-gray-500">
        <li><router-link :to="{ name: 'home' }" class="hover-text-main-600">首页</router-link></li>
        <li><i class="ph ph-caret-right text-xs"></i></li>
        <li v-if="product"><router-link :to="{ name: 'product', params: { id: product.id } }" class="hover-text-main-600">{{ product.name }}</router-link></li>
        <li v-if="product"><i class="ph ph-caret-right text-xs"></i></li>
        <li class="text-heading">下单</li>
      </ul>
    </div>
  </section>

  <section class="py-40">
    <div class="container container-lg">
      <div v-if="loading" class="py-80 text-center text-gray-400">
        <i class="ph ph-circle-notch text-3xl animate-spin"></i>
      </div>

      <div v-else-if="product" class="flex flex-wrap gap-32">
        <!-- Form -->
        <div class="flex-1 min-w-[300px]">
          <div class="border border-gray-100 rounded-16 bg-white p-32">
            <h5 class="mb-24 flex items-center gap-12">
              <i class="ph ph-shopping-bag text-main-600"></i> 订单信息
            </h5>

            <div class="mb-24">
              <label class="text-neutral-900 text-md mb-8 font-[500] block">购买数量 <span class="text-danger">*</span></label>
              <div class="flex items-center gap-12">
                <button type="button" class="w-40 h-40 border border-gray-100 rounded-8 hover-bg-main-600 hover-text-white" @click="dec">
                  <i class="ph ph-minus"></i>
                </button>
                <input v-model.number="quantity" type="number" min="1" :max="product.stock_count"
                       class="common-input text-center" style="max-width:100px">
                <button type="button" class="w-40 h-40 border border-gray-100 rounded-8 hover-bg-main-600 hover-text-white" @click="inc">
                  <i class="ph ph-plus"></i>
                </button>
                <span class="text-sm text-gray-500">库存 {{ product.stock_count }}</span>
              </div>
            </div>

            <div class="mb-24">
              <label class="text-neutral-900 text-md mb-8 font-[500] block">联系方式（可选）</label>
              <input v-model="contact" type="text" class="common-input" placeholder="邮箱 / QQ / Telegram，便于售后联系">
            </div>

            <div class="mb-24">
              <label class="text-neutral-900 text-md mb-8 font-[500] block">备注（可选）</label>
              <textarea v-model="remark" class="common-input" rows="3" placeholder="如有特殊需求请说明"></textarea>
            </div>

            <button
              type="button"
              class="btn btn-main rounded-pill px-32 py-14 inline-flex items-center gap-8 mt-12"
              :disabled="submitting || !canBuy"
              @click="submit"
            >
              <i v-if="submitting" class="ph ph-circle-notch animate-spin"></i>
              <i v-else class="ph ph-credit-card"></i>
              {{ submitting ? '提交中…' : '确认下单并支付' }}
            </button>
          </div>
        </div>

        <!-- Summary -->
        <div class="w-full lg:w-[340px] flex-shrink-0">
          <div class="border border-gray-100 rounded-16 bg-white p-24 sticky top-24">
            <h6 class="text-md mb-16">订单摘要</h6>
            <div class="flex items-center gap-12 mb-16 pb-16 border-b border-gray-100">
              <div class="w-64 h-64 rounded-12 bg-color-one flex items-center justify-center overflow-hidden">
                <img v-if="product.image" :src="product.image" :alt="product.name" class="w-full h-full object-cover">
                <i v-else class="ph ph-package text-gray-400 text-3xl"></i>
              </div>
              <div class="flex-1 min-w-0">
                <h6 class="text-sm mb-4 text-line-2">{{ product.name }}</h6>
                <span class="text-gray-500 text-xs">¥{{ price.toFixed(2) }} × {{ quantity }}</span>
              </div>
            </div>
            <div class="flex justify-between mb-8 text-sm">
              <span class="text-gray-500">商品小计</span>
              <span>¥{{ (price * quantity).toFixed(2) }}</span>
            </div>
            <div class="flex justify-between pt-12 border-t border-gray-100 mt-12">
              <span class="text-md fw-bold">应付金额</span>
              <span class="text-xl fw-bold text-main-600">¥{{ (price * quantity).toFixed(2) }}</span>
            </div>
          </div>
        </div>
      </div>

      <EmptyState v-else icon="ph ph-warning-circle" title="商品不存在">
        <router-link :to="{ name: 'home' }" class="btn btn-main rounded-pill px-24 py-10">返回首页</router-link>
      </EmptyState>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/utils/api'
import { useToastStore } from '@/stores/toast'
import EmptyState from '@/components/EmptyState.vue'

const route = useRoute()
const router = useRouter()
const toast = useToastStore()

const product = ref(null)
const loading = ref(true)
const quantity = ref(1)
const contact = ref('')
const remark = ref('')
const submitting = ref(false)

const price = computed(() => Number(product.value?.price || 0))
const canBuy = computed(() => product.value?.is_active && (product.value?.stock_count || 0) >= quantity.value)

function inc() {
  if (quantity.value < (product.value?.stock_count || 0)) quantity.value++
}
function dec() { if (quantity.value > 1) quantity.value-- }

async function submit() {
  if (!canBuy.value) return
  submitting.value = true
  try {
    const r = await api.post('/api/orders/create', {
      product_id: product.value.id,
      quantity: quantity.value,
      contact: contact.value,
      remark: remark.value,
    })
    const data = r.data || {}
    if (data.payment_url) {
      window.location.href = data.payment_url
    } else if (data.order_no || data.order?.order_no) {
      const no = data.order_no || data.order.order_no
      router.push({ name: 'order-detail', params: { orderNo: no } })
    } else {
      toast.success('下单成功')
    }
  } catch (e) {
    toast.error(e.response?.data?.error || '下单失败')
  } finally {
    submitting.value = false
  }
}

onMounted(async () => {
  try {
    const r = await api.get(`/api/products/${route.params.id}`)
    product.value = r.data
  } catch (_) { product.value = null }
  finally { loading.value = false }
})
</script>
