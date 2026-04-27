<template>
  <footer class="footer footer-three py-80 overflow-hidden">
    <div class="container container-lg">
      <div class="footer-item-two-wrapper d-flex align-items-start flex-wrap">
        <div class="footer-item max-w-275" data-aos="fade-up" data-aos-duration="200">
          <div class="footer-item__logo">
            <NuxtLink to="/">
              <img src="/images/logo/logo-two-black.png" alt="Marketpro Logo" />
            </NuxtLink>
          </div>
          <p class="mb-24">
            Marketpro become the largest computer parts, gaming pc parts, and other IT related
            products.
          </p>

          <div class="flex-align gap-16 mb-16">
            <span
              class="w-32 h-32 flex-center rounded-circle border border-gray-100 text-main-two-600 text-md flex-shrink-0"
              ><i class="ph-fill ph-phone-call"></i
            ></span>
            <a
              :href="`tel:${phone.replace(/\s+/g, '')}`"
              class="text-md text-gray-900 hover-text-main-600"
              >{{ phone }}</a
            >
          </div>

          <div class="flex-align gap-16 mb-16">
            <span
              class="w-32 h-32 flex-center rounded-circle border border-gray-100 text-main-two-600 text-md flex-shrink-0"
              ><i class="ph-fill ph-envelope"></i
            ></span>
            <a :href="`mailto:${email}`" class="text-md text-gray-900 hover-text-main-600">{{
              email
            }}</a>
          </div>

          <div class="flex-align gap-16 mb-16">
            <span
              class="w-32 h-32 flex-center rounded-circle border border-gray-100 text-main-two-600 text-md flex-shrink-0"
              ><i class="ph-fill ph-map-pin"></i
            ></span>
            <span class="text-md text-gray-900">{{ address }}</span>
          </div>
        </div>
        <div
          v-for="(section, index) in footerSections"
          :key="index"
          class="footer-item"
          :data-aos="'fade-up'"
          :data-aos-duration="400 * (index + 1)"
        >
          <h6 class="footer-item__title">{{ section.title }}</h6>
          <ul class="footer-menu">
            <li v-for="(link, i) in section.links" :key="i" class="mb-16">
              <NuxtLink
                v-if="!link.external"
                :to="link.to"
                class="text-gray-600 hover-text-main-600"
                >{{ link.text }}</NuxtLink
              >
              <NuxtLink
                v-else
                :to="link.to"
                target="_blank"
                rel="noopener"
                class="text-gray-600 hover-text-main-600"
                >{{ link.text }}</NuxtLink
              >
            </li>
          </ul>
        </div>
        <div class="footer-item" data-aos="fade-up" data-aos-duration="1600">
          <h6>Shop on The Go</h6>
          <p class="mb-16">Marketpro App is available. Get it now</p>
          <div class="flex-align gap-8 my-32">
            <NuxtLink
              v-for="(store, idx) in storeLinks"
              :key="idx"
              :to="store.href"
              target="_blank"
              rel="noopener"
              class=""
            >
              <img :src="store.img" :alt="store.alt" />
            </NuxtLink>
          </div>

          <ul class="flex-align gap-16">
            <li v-for="(social, idx) in socialLinks" :key="idx">
              <NuxtLink
                :to="social.href"
                target="_blank"
                rel="noopener"
                class="w-44 h-44 flex-center bg-main-two-50 text-main-two-600 text-xl rounded-8 hover-bg-main-two-600 hover-text-white"
                :aria-label="social.label"
              >
                <i :class="`ph-fill ${social.icon}`"></i>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import {
  phone,
  email,
  address,
  footerSections,
  storeLinks,
  socialLinks,
} from "~/data/footer-three";
</script>
