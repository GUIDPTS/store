<template>
  <div class="product-card h-full px-8 py-16 border border-gray-100 hover-border-main-600 rounded-16 relative transition-2">
    <router-link :to="{ name: 'purchase', params: { id: product.id } }"
       class="product-card__cart btn bg-main-50 text-main-600 hover-bg-main-600 hover-text-white py-11 px-24 rounded-[50rem] flex items-center gap-8 absolute inset-block-start-0 right-0 me-16 mt-16 z-1">
      购买 <i class="ph ph-shopping-cart"></i>
    </router-link>

    <router-link :to="{ name: 'product', params: { id: product.id } }" class="product-card__thumb flex items-center justify-center">
      <img v-if="product.image" :src="product.image" :alt="product.name" class="max-h-[180px] object-contain">
      <div v-else class="w-full aspect-[4/3] bg-color-one rounded-12 flex items-center justify-center text-5xl text-gray-400">
        <i class="ph ph-package"></i>
      </div>
    </router-link>

    <div class="product-card__content mt-12">
      <div class="product-card__price mb-12">
        <span v-if="product.orig_price && product.orig_price > product.price"
              class="text-gray-400 text-md font-[600] text-decoration-line-through me-6">
          ¥{{ formatPrice(product.orig_price) }}
        </span>
        <span class="text-heading text-md font-[600]">
          ¥{{ formatPrice(product.price) }}
          <span class="text-gray-500 font-normal text-sm">/份</span>
        </span>
      </div>

      <div v-if="product.shop_name || product.sales_count !== undefined" class="flex items-center gap-6 mb-8">
        <span class="text-xs font-[700] text-gray-600">{{ (product.sales_count || 0) }}</span>
        <span class="text-15 font-[700] text-main-600 flex"><i class="ph-fill ph-fire"></i></span>
        <span class="text-xs font-[700] text-gray-600">已售</span>
      </div>

      <h6 class="title text-lg font-[600] mt-8 mb-8">
        <router-link :to="{ name: 'product', params: { id: product.id } }" class="link text-line-2">
          {{ product.name }}
        </router-link>
      </h6>

      <div v-if="product.shop_name" class="flex items-center gap-4 mb-8">
        <span class="text-main-600 text-md flex"><i class="ph-fill ph-storefront"></i></span>
        <span class="text-gray-500 text-xs truncate">{{ product.shop_name }}</span>
      </div>

      <div v-if="product.stock_count !== undefined" class="mt-12">
        <div class="progress w-full bg-color-three rounded-[50rem] h-4" role="progressbar">
          <div class="progress-bar bg-main-600 rounded-[50rem]" :style="{ width: stockPercent + '%' }"></div>
        </div>
        <span class="text-gray-900 text-xs font-[500] mt-8 inline-block">
          库存: {{ product.stock_count }}{{ stockTotal ? ' / ' + stockTotal : '' }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  product: { type: Object, required: true },
})

function formatPrice(p) {
  const n = parseFloat(p || 0)
  return n.toFixed(2)
}

const stockTotal = computed(() => {
  const sold = Number(props.product.sales_count || 0)
  const stock = Number(props.product.stock_count || 0)
  return sold + stock
})

const stockPercent = computed(() => {
  const total = stockTotal.value
  if (!total) return 0
  return Math.min(100, Math.round((Number(props.product.stock_count || 0) / total) * 100))
})
</script>
