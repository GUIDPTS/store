<template>
  <div>
    <Breadcrumb title="Product Details" />
    <ProductDetails />
    <NewArrival />
    <ShippingOverviewTwo />
    <NewsletterThree />
  </div>
</template>

<script setup lang="ts">
import { useSeo } from "~/composables/useSeo";
import Breadcrumb from "~/components/layout/banner/Breadcrumb.vue";
import ProductDetails from "~/components/containers/shop/ProductDetails.vue";
import NewArrival from "~/components/containers/shop/NewArrival.vue";
import ShippingOverviewTwo from "~/components/containers/shipping/ShippingOverviewTwo.vue";
import NewsletterThree from "~/components/widgets/newsletter/NewsletterThree.vue";

definePageMeta({
  layout: "layout-four",
});

useSeo({
  title: "Product Details",
  
  keywords: ["ecommerce", "fashion", "electronics", "grocery", "shop", "store", "multipurpose"],
});
</script>
