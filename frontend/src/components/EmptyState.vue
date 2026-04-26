<template>
  <div class="text-center py-80 px-24">
    <div class="w-80 h-80 mx-auto rounded-[50%] bg-main-50 text-main-600 flex items-center justify-center text-5xl mb-16">
      <i :class="icon"></i>
    </div>
    <h6 class="text-xl mb-8">{{ title }}</h6>
    <p v-if="description" class="text-gray-500 mb-16">{{ description }}</p>
    <slot />
  </div>
</template>

<script setup>
defineProps({
  icon: { type: String, default: 'ph ph-package' },
  title: { type: String, default: '暂无数据' },
  description: { type: String, default: '' },
})
</script>
