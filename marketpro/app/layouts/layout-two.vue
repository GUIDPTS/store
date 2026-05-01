<template>
  <div>
    <AppPreloader />
    <HeaderMiddleTwo />
    <HeaderTwo />
    <main>
      <slot></slot>
    </main>
    <FooterTwo />
    <FooterBottomTwo />
    <ScrollProgress />
  </div>
</template>

<script setup lang="ts">
import AppPreloader from "~/components/AppPreloader.vue";
import HeaderMiddleTwo from "~/components/layout/header/HeaderMiddleTwo.vue";
import HeaderTwo from "~/components/layout/header/HeaderTwo.vue";
import FooterTwo from "~/components/layout/footer/FooterTwo.vue";
import FooterBottomTwo from "~/components/layout/footer/FooterBottomTwo.vue";
import ScrollProgress from "~/components/ScrollProgress.vue";
</script>
