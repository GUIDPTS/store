<template>
  <div>
    <AppPreloader />
    <HeaderMiddleTwo />
    <HeaderTwo />
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
import HeaderMiddleTwo from "~/components/layout/header/HeaderMiddleTwo.vue";
import HeaderTwo from "~/components/layout/header/HeaderTwo.vue";
import AppFooter from "~/components/layout/footer/AppFooter.vue";
import FooterBottom from "~/components/layout/footer/FooterBottom.vue";
import ScrollProgress from "~/components/ScrollProgress.vue";
</script>
