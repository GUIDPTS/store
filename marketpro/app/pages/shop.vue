<template>
  <div>
    <Breadcrumb title="Shop" />
    <ShopSection />
    <ShippingOverviewTwo />
  </div>
</template>

<script setup lang="ts">
import { useSeo } from "~/composables/useSeo";
import Breadcrumb from "~/components/layout/banner/Breadcrumb.vue";
import ShopSection from "~/components/containers/shop/ShopSection.vue";
import ShippingOverviewTwo from "~/components/containers/shipping/ShippingOverviewTwo.vue";

definePageMeta({
  layout: "layout-three",
});

useHead({
  htmlAttrs: {
    lang: "en",
    class: "color-two font-exo header-style-two",
  },
});

useSeo({
  title: "商品列表",
  
  keywords: ["ecommerce", "fashion", "electronics", "grocery", "shop", "store", "multipurpose"],
});
</script>
