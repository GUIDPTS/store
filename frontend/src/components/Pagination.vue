<template>
  <ul v-if="totalPages > 1" class="pagination flex items-center flex-wrap gap-8 justify-center mt-32">
    <li>
      <button
        type="button"
        class="page-link h-40 w-40 flex items-center justify-center rounded-8 border border-gray-100 hover-bg-main-600 hover-text-white"
        :disabled="modelValue <= 1"
        @click="select(modelValue - 1)"
      >
        <i class="ph ph-caret-left"></i>
      </button>
    </li>
    <li v-for="p in pages" :key="p">
      <button
        v-if="p !== '...'"
        type="button"
        class="page-link h-40 w-40 flex items-center justify-center rounded-8 border border-gray-100 hover-bg-main-600 hover-text-white"
        :class="p === modelValue ? 'bg-main-600 text-white border-main-600' : 'text-gray-700'"
        @click="select(p)"
      >{{ p }}</button>
      <span v-else class="px-8 text-gray-400">…</span>
    </li>
    <li>
      <button
        type="button"
        class="page-link h-40 w-40 flex items-center justify-center rounded-8 border border-gray-100 hover-bg-main-600 hover-text-white"
        :disabled="modelValue >= totalPages"
        @click="select(modelValue + 1)"
      >
        <i class="ph ph-caret-right"></i>
      </button>
    </li>
  </ul>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: { type: Number, default: 1 },
  total: { type: Number, default: 0 },
  pageSize: { type: Number, default: 20 },
})
const emit = defineEmits(['update:modelValue'])

const totalPages = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)))

const pages = computed(() => {
  const cur = props.modelValue
  const last = totalPages.value
  const result = []
  const push = v => result.push(v)
  push(1)
  if (cur - 2 > 2) push('...')
  for (let i = Math.max(2, cur - 1); i <= Math.min(last - 1, cur + 1); i++) push(i)
  if (cur + 2 < last - 1) push('...')
  if (last > 1) push(last)
  return result
})

function select(p) {
  if (p < 1 || p > totalPages.value || p === props.modelValue) return
  emit('update:modelValue', p)
}
</script>
