<template>
  <p v-if="error" class="text-red-500 text-sm mt-1">{{ error }}</p>
</template>

<script setup lang="ts">
defineProps<{ error?: string }>();
</script>

<style scoped>
.text-red-500 {
  color: #f56565;
}

.text-sm {
  font-size: 0.875rem;
}

.mt-1 {
  margin-top: 0.25rem;
}
</style>
