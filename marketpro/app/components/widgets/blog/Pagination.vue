<template>
  <ul v-if="totalPages > 1" class="pagination flex-align flex-wrap gap-16 mt-48" data-aos="fade-up" data-aos-duration="800">
    <li class="page-item">
      <button
        :disabled="page <= 1"
        class="page-link h-64 w-64 flex-center text-xxl rounded-8 fw-medium text-neutral-600 border border-gray-100"
        :class="{ 'opacity-50': page <= 1 }"
        @click="$emit('change', page - 1)"
      >
        <i class="ph-bold ph-arrow-left"></i>
      </button>
    </li>
    <li v-for="p in pages" :key="p" class="page-item" :class="{ active: p === page }">
      <button
        class="page-link h-64 w-64 flex-center text-md rounded-8 fw-medium border"
        :class="p === page ? 'bg-main-600 text-white border-main-600' : 'text-neutral-600 border-gray-100'"
        @click="$emit('change', p)"
      >
        {{ String(p).padStart(2, "0") }}
      </button>
    </li>
    <li class="page-item">
      <button
        :disabled="page >= totalPages"
        class="page-link h-64 w-64 flex-center text-xxl rounded-8 fw-medium text-neutral-600 border border-gray-100"
        :class="{ 'opacity-50': page >= totalPages }"
        @click="$emit('change', page + 1)"
      >
        <i class="ph-bold ph-arrow-right"></i>
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
const props = defineProps<{ page: number; totalPages: number }>();
defineEmits<{ (e: "change", page: number): void }>();

const pages = computed(() => {
  const total = props.totalPages;
  const current = props.page;
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, total];
  if (current >= total - 3) return [1, total - 4, total - 3, total - 2, total - 1, total];
  return [1, current - 1, current, current + 1, total];
});
</script>
