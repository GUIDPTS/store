<template>
  <div v-if="loading" class="py-80 text-center text-gray-400">
    <i class="ph ph-circle-notch text-3xl animate-spin"></i>
  </div>

  <template v-else-if="product">
    <section class="py-40 bg-color-one">
      <div class="container container-lg">
        <ul class="flex items-center gap-8 text-sm text-gray-500 flex-wrap">
          <li><router-link :to="{ name: 'home' }" class="hover-text-main-600">首页</router-link></li>
          <li><i class="ph ph-caret-right text-xs"></i></li>
          <li v-if="product.category">
            <router-link :to="{ name: 'category', params: { id: product.category_id } }" class="hover-text-main-600">
              {{ product.category.name }}
            </router-link>
          </li>
          <li v-if="product.category"><i class="ph ph-caret-right text-xs"></i></li>
          <li class="text-heading">{{ product.name }}</li>
        </ul>
      </div>
    </section>

    <section class="product-details py-40">
      <div class="container container-lg">
        <div class="flex flex-wrap gap-32">
          <div class="w-full lg:w-[420px] flex-shrink-0">
            <div class="border border-gray-100 rounded-16 p-24 bg-white flex items-center justify-center" style="min-height:360px">
              <img v-if="product.image" :src="product.image" :alt="product.name" class="max-w-full max-h-[400px] object-contain">
              <i v-else class="ph ph-package text-gray-300" style="font-size:160px"></i>
            </div>
          </div>

          <div class="flex-1 min-w-0">
            <h3 class="mb-12">{{ product.name }}</h3>
            <div v-if="product.shop" class="flex items-center gap-8 mb-16">
              <span class="text-main-600 flex"><i class="ph-fill ph-storefront"></i></span>
              <router-link :to="{ name: 'shop', params: { id: product.shop_id } }" class="text-gray-700 hover-text-main-600">
                {{ product.shop.name }}
              </router-link>
            </div>

            <div class="flex items-center gap-16 mb-24 flex-wrap">
              <span class="text-3xl fw-bold text-main-600">¥{{ Number(product.price).toFixed(2) }}</span>
              <span v-if="product.orig_price && product.orig_price > product.price"
                    class="text-lg text-gray-400 text-decoration-line-through">¥{{ Number(product.orig_price).toFixed(2) }}</span>
            </div>

            <ul class="border border-gray-100 rounded-12 p-16 mb-24 flex flex-wrap gap-24">
              <li class="flex items-center gap-8">
                <i class="ph ph-package text-main-600"></i>
                <span class="text-sm text-gray-700">库存：<b>{{ product.stock_count || 0 }}</b></span>
              </li>
              <li class="flex items-center gap-8">
                <i class="ph ph-fire text-main-600"></i>
                <span class="text-sm text-gray-700">已售：<b>{{ product.sales_count || 0 }}</b></span>
              </li>
              <li class="flex items-center gap-8">
                <i class="ph ph-lightning text-main-600"></i>
                <span class="text-sm text-gray-700">即时发卡</span>
              </li>
            </ul>

            <div class="flex items-center gap-12 flex-wrap mb-32">
              <router-link
                v-if="(product.stock_count || 0) > 0 && product.is_active"
                :to="{ name: 'purchase', params: { id: product.id } }"
                class="btn btn-main rounded-pill px-32 py-14 inline-flex items-center gap-8"
              >
                立即购买 <i class="ph ph-arrow-right"></i>
              </router-link>
              <button v-else type="button" class="btn rounded-pill px-32 py-14 bg-gray-200 text-gray-500 cursor-not-allowed" disabled>
                {{ product.is_active ? '暂时缺货' : '已下架' }}
              </button>
            </div>

            <div v-if="product.description" class="border-t border-gray-100 pt-24">
              <h6 class="text-md mb-12">商品描述</h6>
              <div class="text-gray-700 leading-relaxed whitespace-pre-line">{{ product.description }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>

  <EmptyState v-else icon="ph ph-warning-circle" title="商品不存在" description="该商品可能已被下架或删除">
    <router-link :to="{ name: 'home' }" class="btn btn-main rounded-pill px-24 py-10">返回首页</router-link>
  </EmptyState>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/utils/api'
import EmptyState from '@/components/EmptyState.vue'

const route = useRoute()
const product = ref(null)
const loading = ref(true)

async function load(id) {
  loading.value = true
  try {
    const r = await api.get(`/api/products/${id}`)
    product.value = r.data
  } catch (_) {
    product.value = null
  } finally {
    loading.value = false
  }
}

watch(() => route.params.id, id => id && load(id))
onMounted(() => load(route.params.id))
</script>
