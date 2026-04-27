<template>
  <div>
    <AppPreloader />
    <HeaderMiddleTwo />
    <HeaderTwo />
    <main>
      <slot></slot>
    </main>
    <FooterThree />
    <FooterBottomThree />
    <ScrollProgress />
  </div>
</template>

<script setup lang="ts">
import AppPreloader from "~/components/AppPreloader.vue";
import HeaderMiddleTwo from "~/components/layout/header/HeaderMiddleTwo.vue";
import HeaderTwo from "~/components/layout/header/HeaderTwo.vue";
import FooterThree from "~/components/layout/footer/FooterThree.vue";
import FooterBottomThree from "~/components/layout/footer/FooterBottomThree.vue";
import ScrollProgress from "~/components/ScrollProgress.vue";
</script>
