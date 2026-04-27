<template>
  <section
    class="popular-products mb-80 overflow-hidden"
    data-aos="fade-up"
    data-aos-duration="600"
  >
    <div class="container container-lg">
      <div class="row gy-4">
        <div
          v-for="product in products"
          :key="product.id"
          class="col-xxl-3 col-xl-4 col-sm-6 col-xs-6"
          data-aos="zoom-in"
          data-aos-duration="600"
        >
          <PopularCard :product="product" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { popularProducts } from "~/data/popular-products-two";
import PopularCard from "~/components/widgets/shop/PopularCard.vue";

const products = popularProducts;
</script>
