<template>
  <div>
    <HeroSection />
    <FeatureSlider />
    <PromotionalBannerTwo />
    <FlashSales />
    <FlashOverview />
    <RecommendedTwo />
    <OfferSection />
    <HotDeals />
    <DiscountThree />
    <ShortProducts />
    <ShopBrand />
    <BestSells />
    <NewsletterFour />
  </div>
</template>

<script setup lang="ts">
import { useSeo } from "~/composables/useSeo";
import HeroSection from "~/components/layout/banner/HeroSection.vue";
import FeatureSlider from "~/components/containers/home/FeatureSlider.vue";
import PromotionalBannerTwo from "~/components/containers/home/PromotionalBannerTwo.vue";
import FlashSales from "~/components/containers/shop/FlashSales.vue";
import FlashOverview from "~/components/containers/shop/FlashOverview.vue";
import RecommendedTwo from "~/components/containers/home/RecommendedTwo.vue";
import OfferSection from "~/components/containers/home/OfferSection.vue";
import HotDeals from "~/components/containers/shop/HotDeals.vue";
import DiscountThree from "~/components/containers/shop/DiscountThree.vue";
import ShortProducts from "~/components/containers/shop/ShortProducts.vue";
import ShopBrand from "~/components/containers/shop/ShopBrand.vue";
import BestSells from "~/components/containers/shop/BestSells.vue";
import NewsletterFour from "~/components/widgets/newsletter/NewsletterFour.vue";

useSeo({
  title: "Home",
  description: "eCommerce Multivendor Vue JS 3, Nuxt JS 4, Bootstrap 5 Template",
  keywords: ["ecommerce", "fashion", "electronics", "grocery", "shop", "store", "multipurpose"],
});
</script>
