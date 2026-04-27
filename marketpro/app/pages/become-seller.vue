<template>
  <div>
    <Breadcrumb title="Become A Seller" />
    <SellerBanner />
    <SellerOverview />
    <SellerCounter />
    <SellerSteps />
    <TestimonialSlider />
    <ShippingOverviewTwo />
  </div>
</template>

<script setup lang="ts">
import { useSeo } from "~/composables/useSeo";
import Breadcrumb from "~/components/layout/banner/Breadcrumb.vue";
import SellerBanner from "~/components/layout/banner/SellerBanner.vue";
import SellerOverview from "~/components/containers/seller/SellerOverview.vue";
import SellerCounter from "~/components/containers/seller/SellerCounter.vue";
import SellerSteps from "~/components/containers/seller/SellerSteps.vue";
import TestimonialSlider from "~/components/containers/testimonials/TestimonialSlider.vue";
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
  title: "Become A Seller",
  description: "eCommerce Multivendor Vue JS 3, Nuxt JS 4, Bootstrap 5 Template",
  keywords: ["ecommerce", "fashion", "electronics", "grocery", "shop", "store", "multipurpose"],
});
</script>
