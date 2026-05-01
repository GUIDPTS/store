<template>
  <div>
    <AppPreloader />
    <HeaderMiddle />
    <AppHeader />
    <main>
      <slot></slot>
    </main>
    <AppFooter />
    <FooterBottom />
    <ScrollProgress />
  </div>
</template>

<script setup lang="ts">
import AppPreloader from "~/components/AppPreloader.vue";
import HeaderMiddle from "~/components/layout/header/HeaderMiddle.vue";
import AppHeader from "~/components/layout/header/AppHeader.vue";
import AppFooter from "~/components/layout/footer/AppFooter.vue";
import FooterBottom from "~/components/layout/footer/FooterBottom.vue";
import ScrollProgress from "~/components/ScrollProgress.vue";
</script>
