<template>
  <span
    class="copy-text cursor-pointer hover-text-main-600 inline-flex items-center gap-4"
    :title="copied ? '已复制' : '点击复制'"
    @click.stop="onCopy"
  >
    <slot>{{ text }}</slot>
    <i :class="copied ? 'ph ph-check text-main-600' : 'ph ph-copy'" class="text-md"></i>
  </span>
</template>

<script setup>
import { ref } from 'vue'
import { copyToClipboard } from '@/utils/helpers'
import { useToastStore } from '@/stores/toast'

const props = defineProps({
  text: { type: String, default: '' },
})

const copied = ref(false)
const toast = useToastStore()

async function onCopy() {
  await copyToClipboard(props.text)
  copied.value = true
  toast.success('已复制')
  setTimeout(() => (copied.value = false), 1500)
}
</script>
