<template>
  <section class="checkout py-80">
    <div class="container container-lg">
      <h4 class="fw-semibold mb-32">确认订单</h4>

      <div v-if="loading" class="text-center py-60">
        <div class="w-48 h-48 border border-main-600 rounded-circle d-flex align-items-center justify-content-center mx-auto mb-16 animate-spin" style="border-top-color:transparent !important;"></div>
        <p class="text-gray-400 text-sm">加载中...</p>
      </div>

      <div v-else-if="!product" class="text-center py-60">
        <p class="text-gray-400">商品信息加载失败</p>
        <router-link to="/" class="btn btn-main rounded-pill px-24 py-10 mt-16">返回首页</router-link>
      </div>

      <div v-else class="row g-4">
        <div class="col-lg-8">
          <div class="border border-gray-100 rounded-16 p-32 mb-24">
            <h5 class="fw-semibold mb-20">商品信息</h5>
            <div class="d-flex align-items-center gap-20">
              <img :src="product.image || '/marketpro/images/thumbs/product-img7.png'" :alt="product.name" style="width:80px;height:80px;object-fit:contain;border-radius:8px;border:1px solid #f0f0f0;">
              <div>
                <h6 class="fw-semibold mb-8">{{ product.name }}</h6>
                <p class="text-main-600 fw-bold mb-4" style="font-size:1.25rem;">{{ fmtPrice(product.price) }}</p>
                <p class="text-gray-500 text-sm mb-0">数量: {{ qty }}</p>
              </div>
            </div>
          </div>

          <div class="border border-gray-100 rounded-16 p-32">
            <h5 class="fw-semibold mb-20">支付方式</h5>
            <div class="row g-12">
              <div v-for="method in paymentMethods" :key="method.value" class="col-sm-4 col-6">
                <label class="d-flex align-items-center gap-12 border rounded-12 p-16 cursor-pointer" :class="payMethod === method.value ? 'border-main-600 bg-main-50' : 'border-gray-200 hover-border-main-600'" style="cursor:pointer;">
                  <input type="radio" v-model="payMethod" :value="method.value" class="d-none">
                  <i :class="method.icon" class="text-xl text-main-600"></i>
                  <span class="text-sm fw-medium">{{ method.label }}</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-4">
          <div class="border border-gray-100 rounded-16 p-24">
            <h6 class="fw-semibold mb-20">订单摘要</h6>
            <div class="d-flex justify-content-between mb-12">
              <span class="text-sm text-gray-600">商品单价</span>
              <span class="text-sm fw-medium">{{ fmtPrice(product.price) }}</span>
            </div>
            <div class="d-flex justify-content-between mb-12">
              <span class="text-sm text-gray-600">数量</span>
              <span class="text-sm fw-medium">× {{ qty }}</span>
            </div>
            <div class="d-flex justify-content-between mb-24 border-top border-gray-100 pt-12">
              <span class="fw-semibold">应付合计</span>
              <span class="fw-bold text-main-600 text-xl">{{ fmtPrice(product.price * qty) }}</span>
            </div>
            <button type="button" @click="placeOrder" :disabled="submitting" class="btn btn-main w-100 py-14 rounded-pill fw-semibold">
              {{ submitting ? '处理中...' : '立即支付' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToastStore } from '@/stores/toast'
import api from '@/utils/api'

const route = useRoute()
const router = useRouter()
const toast = useToastStore()

const product = ref(null)
const loading = ref(true)
const qty = ref(1)
const payMethod = ref('balance')
const submitting = ref(false)

const paymentMethods = [
  { value: 'balance', label: '账户余额', icon: 'ph-fill ph-wallet' },
  { value: 'alipay', label: '支付宝', icon: 'ph-fill ph-currency-circle-dollar' },
  { value: 'wechat', label: '微信支付', icon: 'ph-fill ph-wechat-logo' },
]

function fmtPrice(n) { return '¥' + Number(n || 0).toFixed(2) }

async function placeOrder() {
  submitting.value = true
  try {
    const res = await api.post('/api/orders', {
      product_id: product.value.id,
      quantity: qty.value,
      payment_method: payMethod.value,
    })
    const orderNo = res.data.order_no || res.data.order?.order_no
    toast.show('订单创建成功！', 'success')
    if (orderNo) router.push(`/order/${orderNo}`)
    else router.push('/account/orders')
  } catch (e) {
    toast.show(e.response?.data?.error || '下单失败，请稍后重试', 'error')
  } finally {
    submitting.value = false
  }
}

onMounted(async () => {
  const productId = route.query.product_id
  qty.value = parseInt(route.query.qty) || 1
  if (!productId) { loading.value = false; return }
  try {
    const res = await api.get(`/api/products/${productId}`)
    product.value = res.data.product || res.data
  } catch (_) {
    product.value = null
  } finally {
    loading.value = false
  }
})
</script>
