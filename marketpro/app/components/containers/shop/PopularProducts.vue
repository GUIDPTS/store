<template>
  <section class="popular-products-three pb-120 overflow-hidden">
    <div class="container container-lg">
      <div class="section-heading mb-24">
        <h5 class="mb-0 text-uppercase" data-aos="fade-left" data-aos-duration="600">
          Popular Products
        </h5>
      </div>

      <div class="row gy-4">
        <PopularProductCard
          v-for="(product, index) in products"
          :key="product.id"
          :product="product"
          :animation-duration="400 + index * 200"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { products } from "~/data/popular-products";
import PopularProductCard from "~/components/widgets/shop/PopularProductCard.vue";
</script>
