<template>
  <div>
    <Breadcrumb title="All Vendors" />
    <VendorSectionTwo />
    <ShippingOverviewTwo />
  </div>
</template>

<script setup lang="ts">
import { useSeo } from "~/composables/useSeo";
import Breadcrumb from "~/components/layout/banner/Breadcrumb.vue";
import VendorSectionTwo from "~/components/containers/vendor/VendorSectionTwo.vue";
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
  title: "Vendor Two",
  description: "eCommerce Multivendor Vue JS 3, Nuxt JS 4, Bootstrap 5 Template",
  keywords: ["ecommerce", "fashion", "electronics", "grocery", "shop", "store", "multipurpose"],
});
</script>
