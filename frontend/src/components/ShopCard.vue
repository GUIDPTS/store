<template>
  <div class="vendor-card text-center px-16 pb-24 h-full">
    <div>
      <img v-if="shop.logo" :src="shop.logo" :alt="shop.name" class="vendor-card__logo m-12 mx-auto">
      <div v-else class="vendor-card__logo m-12 mx-auto rounded-[50%] bg-main-100 text-main-600 flex items-center justify-center text-4xl"
           style="width:80px;height:80px">
        <i class="ph-fill ph-storefront"></i>
      </div>
      <h6 class="title mt-32">
        <router-link :to="{ name: 'shop', params: { id: shop.id } }" class="link">{{ shop.name }}</router-link>
      </h6>
      <span class="text-heading text-sm block text-line-2">{{ shop.description || '欢迎光临' }}</span>
      <router-link
        :to="{ name: 'shop', params: { id: shop.id } }"
        class="inline-block bg-white text-neutral-600 hover-bg-main-600 hover-text-white rounded-[50rem] py-6 px-16 text-12 mt-12 border border-gray-100"
      >
        进入店铺 →
      </router-link>
    </div>
    <div v-if="shop.products && shop.products.length" class="vendor-card__list mt-22 flex items-center justify-center flex-wrap gap-8">
      <router-link
        v-for="p in shop.products.slice(0, 5)"
        :key="p.id"
        :to="{ name: 'product', params: { id: p.id } }"
        class="vendor-card__item bg-white rounded-[50%] flex items-center justify-center overflow-hidden border border-gray-100"
        :title="p.name"
        style="width:50px;height:50px"
      >
        <img v-if="p.image" :src="p.image" :alt="p.name" class="w-full h-full object-cover">
        <i v-else class="ph ph-package text-gray-400"></i>
      </router-link>
    </div>
  </div>
</template>

<script setup>
defineProps({
  shop: { type: Object, required: true },
})
</script>
