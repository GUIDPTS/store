<template>
  <MainHeader />
  <main class="min-h-[60vh]">
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
  <MainFooter />
</template>

<script setup>
import MainHeader from '@/components/layout/MainHeader.vue'
import MainFooter from '@/components/layout/MainFooter.vue'
</script>
