<template>
  <div class="footer-item" :data-aos="'fade-up'" :data-aos-duration="aosDelay">
    <h6 class="footer-item__title">{{ title }}</h6>
    <ul class="footer-menu">
      <li
        v-for="(item, index) in items"
        :key="index"
        :class="{ 'mb-16': index < items.length - 1 }"
      >
        <NuxtLink :to="item.to" class="text-heading hover-text-main-600">
          {{ item.label }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
interface MenuItem {
  label: string;
  to: string;
}

defineProps<{
  title: string;
  items: MenuItem[];
  aosDelay: string | number;
}>();
</script>
