<template>
  <div>
    <AppPreloader />
    <HeaderTop />
    <HeaderMiddle />
    <AppHeader />
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
import HeaderTop from "~/components/layout/header/HeaderTop.vue";
import HeaderMiddle from "~/components/layout/header/HeaderMiddle.vue";
import AppHeader from "~/components/layout/header/AppHeader.vue";
import FooterThree from "~/components/layout/footer/FooterThree.vue";
import FooterBottomThree from "~/components/layout/footer/FooterBottomThree.vue";
import ScrollProgress from "~/components/ScrollProgress.vue";
</script>
