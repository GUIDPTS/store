<template>
  <div>
    <!-- Loading -->
    <div v-if="loading" class="py-80 text-center">
      <div class="w-48 h-48 border border-main-600 rounded-circle d-flex align-items-center justify-content-center mx-auto mb-16 animate-spin" style="border-top-color:transparent !important;"></div>
      <p class="text-gray-400 text-sm">加载中...</p>
    </div>

    <!-- Not found -->
    <section v-else-if="!product" class="product-details py-80">
      <div class="container container-lg text-center py-60">
        <i class="ph ph-warning d-block mb-16 text-gray-200" style="font-size:4rem;"></i>
        <p class="text-gray-400">商品不存在或已下架</p>
        <router-link to="/" class="btn btn-main rounded-pill py-8 px-24 mt-16">返回首页</router-link>
      </div>
    </section>

    <section v-else class="product-details py-80">
      <div class="container container-lg">
        <div class="row g-4">

          <!-- Left: 9/12 -->
          <div class="col-xl-9">
            <div class="row g-4">
              <!-- Image -->
              <div class="col-xxl-6">
                <div class="product-details__left">
                  <div class="product-details__thumb-slider border border-gray-100 rounded-16">
                    <div class="product-details__thumb d-flex align-items-center justify-content-center" style="min-height:320px;padding:24px;">
                      <img v-if="product.image" :src="product.image" :alt="product.name" style="max-width:100%;max-height:320px;object-fit:contain;">
                      <div v-else class="w-120 h-120 rounded-circle bg-main-50 d-flex align-items-center justify-content-center">
                        <i class="ph ph-package text-main-600" style="font-size:4rem"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Info -->
              <div class="col-xxl-6">
                <div class="product-details__content">
                  <h5 class="mb-12">{{ product.name }}</h5>
                  <div class="d-flex align-items-center flex-wrap gap-12 mb-0">
                    <span class="text-sm text-gray-500"><i class="ph ph-package me-4"></i>库存 <strong class="text-gray-800">{{ product.stock_count }}</strong></span>
                    <span class="text-sm text-gray-500"><i class="ph ph-check-circle me-4 text-main-600"></i>已售 <strong class="text-gray-800">{{ product.sales_count }}</strong></span>
                  </div>
                  <span class="mt-32 pt-32 text-gray-700 border-top border-gray-100 d-block"></span>

                  <!-- Price -->
                  <div class="d-flex align-items-center flex-wrap gap-32 mb-32">
                    <div class="d-flex align-items-center gap-8">
                      <h4 class="mb-0 text-main-600">{{ fmtPrice(product.price) }}</h4>
                      <span v-if="product.orig_price > product.price" class="text-md text-gray-500 text-decoration-line-through">{{ fmtPrice(product.orig_price) }}</span>
                    </div>
                  </div>

                  <!-- Buy form (in stock) -->
                  <div v-if="product.stock_count > 0 && product.is_active">
                    <span class="text-gray-900 d-block mb-8">数量：</span>
                    <div class="flex-between gap-16 flex-wrap mb-24">
                      <div class="d-flex align-items-center gap-16 flex-wrap">
                        <div class="border border-gray-100 rounded-pill py-9 px-16 d-flex align-items-center gap-4">
                          <button type="button" @click="qty > 1 && qty--" style="background:none;border:none;cursor:pointer;padding:2px 4px;" class="text-gray-700 hover-text-main-600 d-flex align-items-center"><i class="ph ph-minus"></i></button>
                          <input type="number" v-model.number="qty" :min="1" :max="product.stock_count" class="border-0 text-center" style="width:32px;outline:none;font-size:0.875rem;">
                          <button type="button" @click="qty < product.stock_count && qty++" style="background:none;border:none;cursor:pointer;padding:2px 4px;" class="text-gray-700 hover-text-main-600 d-flex align-items-center"><i class="ph ph-plus"></i></button>
                        </div>
                        <button type="button" @click="addToCart" class="btn rounded-pill d-flex align-items-center gap-8 px-24" style="border:1.5px solid #299e60;color:#299e60;background:transparent;font-size:14px;"><i class="ph ph-shopping-cart"></i> 加入购物车</button>
                        <button type="button" @click="buyNow" class="btn btn-main rounded-pill d-flex align-items-center gap-8 px-32"><i class="ph ph-lightning"></i> 立即购买</button>
                        <button type="button" @click="toggleWishlist" class="w-52 h-52 rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 border-0"
                          :style="inWishlist ? 'background:#fef2f2;color:#dc2626;cursor:pointer;' : 'background:#e7f9ef;color:#299e60;cursor:pointer;'">
                          <i :class="inWishlist ? 'ph-fill ph-heart text-xl' : 'ph ph-heart text-xl'"></i>
                        </button>
                      </div>
                    </div>
                    <div class="flex-between gap-16 p-12 bg-main-50 rounded-8 mb-16">
                      <span class="text-sm text-gray-600">参考价格</span>
                      <span class="fw-bold text-main-600 text-xl">{{ fmtPrice(qty * product.price) }}</span>
                    </div>
                  </div>

                  <!-- Out of stock -->
                  <div v-else class="border border-gray-100 rounded-16 p-24 text-center">
                    <i class="ph ph-x-circle text-4xl text-gray-300 d-block mb-8"></i>
                    <p class="text-gray-500 fw-medium">{{ !product.is_active ? '该商品已下架' : '暂时缺货' }}</p>
                  </div>

                  <!-- Description -->
                  <div v-if="product.description">
                    <span class="mt-32 pt-32 text-gray-700 border-top border-gray-100 d-block"></span>
                    <h6 class="text-sm fw-semibold mb-12">商品说明</h6>
                    <p class="text-sm text-gray-600 lh-lg" style="white-space:pre-line;">{{ product.description }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Reviews / Description tabs -->
            <div class="mt-40">
              <ul class="nav common-tab nav-pills mb-24">
                <li class="nav-item"><button class="nav-link bt-tb-btn fw-medium text-sm" :class="activeTab === 'desc' ? 'active' : ''" @click="activeTab='desc'" type="button">商品详情</button></li>
                <li class="nav-item"><button class="nav-link bt-tb-btn fw-medium text-sm" :class="activeTab === 'reviews' ? 'active' : ''" @click="switchToReviews" type="button">用户评价 <span v-if="reviewCount > 0" class="badge bg-main-600 text-white rounded-pill ms-4">{{ reviewCount }}</span></button></li>
              </ul>
              <div v-if="activeTab === 'desc'" class="bg-white border border-gray-100 rounded-16 p-24">
                <p v-if="product.description" class="text-sm text-gray-600 lh-lg" style="white-space:pre-line;">{{ product.description }}</p>
                <p v-else class="text-gray-400 text-sm">暂无详情</p>
              </div>
              <div v-if="activeTab === 'reviews'" class="bg-white border border-gray-100 rounded-16 p-24">
                <div class="row g-4">
                  <div class="col-lg-7">
                    <div v-if="reviewsLoading" class="text-center py-32 text-gray-400"><i class="ph ph-spinner-gap text-3xl animate-spin"></i></div>
                    <div v-else-if="!reviews.length" class="text-center py-32 text-gray-400">
                      <i class="ph ph-star d-block mb-8" style="font-size:3rem;color:#e5e7eb;"></i><p>暂无评价</p>
                    </div>
                    <div v-else>
                      <div v-for="(rev, i) in reviews" :key="rev.id" :class="i < reviews.length - 1 ? 'd-flex align-items-start gap-24 pb-44 border-bottom border-gray-100 mb-44' : 'd-flex align-items-start gap-24'">
                        <div class="w-52 h-52 rounded-circle bg-main-50 d-flex align-items-center justify-content-center flex-shrink-0">
                          <i class="ph ph-user text-main-600 text-xl"></i>
                        </div>
                        <div class="flex-1">
                          <div class="flex-between flex-wrap gap-8 mb-8">
                            <span class="fw-semibold text-gray-800 text-sm">{{ rev.user_name || '匿名用户' }}</span>
                            <span class="text-gray-400 text-xs">{{ fmtDate(rev.created_at) }}</span>
                          </div>
                          <div class="d-flex gap-4 mb-8">
                            <i v-for="s in 5" :key="s" :class="s <= rev.rating ? 'ph-fill ph-star text-warning-600' : 'ph ph-star text-gray-200'"></i>
                          </div>
                          <p class="text-sm text-gray-600 mb-0" style="white-space:pre-line;">{{ rev.content }}</p>
                        </div>
                      </div>
                    </div>

                    <!-- Write review -->
                    <div class="mt-40 border-top border-gray-100 pt-40" v-if="auth.user">
                      <h6 class="fw-semibold mb-16">写评价</h6>
                      <div class="d-flex gap-4 mb-16">
                        <button v-for="s in 5" :key="s" type="button" @click="reviewForm.rating = s" style="background:none;border:none;cursor:pointer;padding:2px;">
                          <i :class="reviewForm.rating >= s ? 'ph-fill ph-star text-warning-600 text-xl' : 'ph ph-star text-gray-200 text-xl'"></i>
                        </button>
                      </div>
                      <input type="text" v-model="reviewForm.title" placeholder="评价标题" class="common-input py-12 px-16 rounded-8 mb-12 w-100" style="font-size:14px;">
                      <textarea v-model="reviewForm.content" rows="4" placeholder="分享您的使用体验..." class="common-input py-12 px-16 rounded-8 mb-12 w-100" style="font-size:14px;resize:vertical;"></textarea>
                      <button type="button" @click="submitReview" :disabled="submittingReview" class="btn btn-main rounded-pill px-32 py-10">{{ submittingReview ? '提交中...' : '提交评价' }}</button>
                    </div>
                    <div v-else class="mt-32 border-top border-gray-100 pt-32 text-sm text-gray-500">
                      <a href="/auth/login" class="text-main-600 fw-medium">登录</a> 后可发表评价
                    </div>
                  </div>
                  <div class="col-lg-5">
                    <div v-if="reviewStats.total === 0" class="text-gray-400 text-sm">暂无评分数据</div>
                    <div v-else class="d-flex flex-wrap gap-44">
                      <div class="text-center">
                        <h2 class="mb-6 text-main-600">{{ reviewStats.avg_rating?.toFixed(1) }}</h2>
                        <div class="d-flex gap-4 mb-8">
                          <i v-for="s in 5" :key="s" :class="s <= Math.round(reviewStats.avg_rating) ? 'ph-fill ph-star text-warning-600 text-xl' : 'ph ph-star text-gray-200 text-xl'"></i>
                        </div>
                        <span class="mt-16 text-gray-500">{{ reviewStats.total }} 条评价</span>
                      </div>
                      <div class="flex-1">
                        <div v-for="star in [5,4,3,2,1]" :key="star" class="d-flex align-items-center gap-8 mb-4">
                          <span class="text-gray-500 text-sm flex-shrink-0">{{ star }}星</span>
                          <div class="progress flex-1 h-8 rounded-pill bg-color-three" role="progressbar">
                            <div class="progress-bar bg-main-600 rounded-pill" :style="'width:' + (reviewStats.total > 0 ? ((reviewStats.rating_distribution?.[star]||0)/reviewStats.total*100).toFixed(0) : 0) + '%'"></div>
                          </div>
                          <span class="text-gray-900 flex-shrink-0 text-sm">{{ reviewStats.rating_distribution?.[star] || 0 }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar: 3/12 -->
          <div class="col-xl-3">
            <div class="product-details__sidebar border border-gray-100 rounded-16 overflow-hidden">
              <div class="p-24">
                <div v-if="product.shop" class="flex-between bg-main-600 rounded-pill p-8 gap-8">
                  <div class="d-flex align-items-center gap-8 overflow-hidden">
                    <span class="w-44 h-44 bg-white rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 overflow-hidden" style="font-size:1.25rem;">
                      <img v-if="product.shop.logo" :src="product.shop.logo" style="width:100%;height:100%;object-fit:cover;">
                      <i v-else class="ph ph-storefront"></i>
                    </span>
                    <span class="text-white text-sm text-line-1">{{ product.shop.name }}</span>
                  </div>
                  <router-link :to="`/shop/${product.shop.id}`" class="btn btn-white rounded-pill text-dark text-sm py-6 px-12 flex-shrink-0">进入</router-link>
                </div>
                <div v-else class="flex-between bg-main-600 rounded-pill p-8 gap-8">
                  <div class="d-flex align-items-center gap-8 overflow-hidden">
                    <span class="w-44 h-44 bg-white rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"><i class="ph ph-storefront text-main-600"></i></span>
                    <span class="text-white text-sm">官方商城</span>
                  </div>
                </div>
              </div>
              <div v-for="(f, i) in features" :key="i" class="p-24 bg-color-one d-flex align-items-start gap-24 border-top border-gray-100">
                <span class="w-44 h-44 bg-white text-main-600 rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style="font-size:1.25rem;"><i :class="f.icon"></i></span>
                <div><h6 class="text-sm mb-8">{{ f.title }}</h6><p class="text-gray-700 text-sm mb-0">{{ f.desc }}</p></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'
import { useToastStore } from '@/stores/toast'
import api from '@/utils/api'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const cart = useCartStore()
const wishlist = useWishlistStore()
const toast = useToastStore()

const product = ref(null)
const loading = ref(true)
const qty = ref(1)
const activeTab = ref('desc')

const reviews = ref([])
const reviewCount = ref(0)
const reviewStats = ref({ total: 0, avg_rating: 0, rating_distribution: {} })
const reviewsLoading = ref(false)
const reviewsTabOpened = ref(false)
const reviewForm = ref({ rating: 5, title: '', content: '' })
const submittingReview = ref(false)

const inWishlist = computed(() => product.value ? wishlist.has(product.value.id) : false)

const features = [
  { icon: 'ph-fill ph-lightning', title: '自动发货', desc: '下单付款后立即自动发货' },
  { icon: 'ph-fill ph-shield-check', title: '安全支付', desc: '多种支付方式，安全可靠' },
  { icon: 'ph-fill ph-check-circle', title: '正版保证', desc: '所有商品均为正版授权' },
  { icon: 'ph-fill ph-headset', title: '在线客服', desc: '7×24 小时专业服务' },
]

function fmtPrice(n) { return '¥' + Number(n || 0).toFixed(2) }
function fmtDate(s) {
  if (!s) return ''
  const d = new Date(s)
  return d.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' })
}

function addToCart() {
  cart.add(product.value, qty.value)
  toast.show('已加入购物车', 'success')
}

function buyNow() {
  if (!auth.user) { router.push('/auth/login'); return }
  router.push({ path: '/checkout', query: { product_id: product.value.id, qty: qty.value } })
}

function toggleWishlist() {
  const added = wishlist.toggle(product.value)
  toast.show(added ? '已加入收藏' : '已取消收藏', 'success')
}

async function switchToReviews() {
  activeTab.value = 'reviews'
  if (!reviewsTabOpened.value) {
    reviewsTabOpened.value = true
    await loadReviews()
  }
}

async function loadReviews() {
  reviewsLoading.value = true
  try {
    const res = await api.get(`/api/products/${route.params.id}/reviews`)
    reviews.value = res.data.reviews || []
    reviewCount.value = res.data.total || reviews.value.length
    reviewStats.value = res.data.stats || { total: 0, avg_rating: 0, rating_distribution: {} }
  } catch (_) {
    reviews.value = []
  } finally {
    reviewsLoading.value = false
  }
}

async function submitReview() {
  if (!reviewForm.value.content.trim()) { toast.show('请填写评价内容', 'error'); return }
  submittingReview.value = true
  try {
    await api.post(`/api/products/${route.params.id}/reviews`, reviewForm.value)
    toast.show('评价提交成功', 'success')
    reviewForm.value = { rating: 5, title: '', content: '' }
    await loadReviews()
  } catch (e) {
    toast.show(e.response?.data?.error || '提交失败', 'error')
  } finally {
    submittingReview.value = false
  }
}

async function loadProduct() {
  loading.value = true
  activeTab.value = 'desc'
  reviewsTabOpened.value = false
  try {
    const res = await api.get(`/api/products/${route.params.id}`)
    product.value = res.data.product || res.data
  } catch (_) {
    product.value = null
  } finally {
    loading.value = false
  }
}

onMounted(loadProduct)
watch(() => route.params.id, loadProduct)
</script>
