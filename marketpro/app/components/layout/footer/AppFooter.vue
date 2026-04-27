<template>
  <footer class="footer py-120">
    <div class="container container-lg">
      <div class="footer-item-wrapper d-flex align-items-start flex-wrap">
        <div class="footer-item" data-aos="fade-up" data-aos-duration="200">
          <div class="max-w-340">
            <div class="footer-item__logo">
              <NuxtLink to="/">
                <img src="/images/logo/logo.png" alt="Grocery Shop Logo" width="180" height="40" />
              </NuxtLink>
            </div>
            <p class="mb-28 text-heading">
              We're Grocery Shop, an innovative team of food suppliers.
            </p>

            <div class="d-flex flex-column gap-8">
              <p class="text-heading fw-medium">2972 Westheimer Rd. Santa Ana, Illinois 85486</p>
              <NuxtLink
                to="mailto:support@example.com"
                class="text-heading fw-medium hover-text-main-600"
              >
                support@example.com
              </NuxtLink>
              <NuxtLink to="tel:+14065550120" class="text-heading fw-medium hover-text-main-600">
                + (406) 555-0120
              </NuxtLink>
            </div>
          </div>
        </div>
        <FooterMenuBlock title="Information" :items="informationLinks" aos-delay="400" />
        <FooterMenuBlock title="Customer Support" :items="supportLinks" aos-delay="600" />
        <FooterMenuBlock title="My Account" :items="accountLinks" aos-delay="800" />
        <FooterMenuBlock title="Daily Groceries" :items="groceriesLinks" aos-delay="1000" />
        <div class="footer-item" data-aos="fade-up" data-aos-duration="1200">
          <h6>Shop on The Go</h6>
          <p class="mb-16">MarketPro App is available. Get it now</p>

          <div class="my-32">
            <div class="flex-align gap-8">
              <div class="bg-white rounded-10 p-1 box-shadow-5xl">
                <img
                  src="/images/thumbs/qr-code.png"
                  alt="QR Code for App Download"
                  width="80"
                  height="80"
                />
              </div>
              <div class="d-flex flex-column gap-16">
                <NuxtLink
                  to="https://www.apple.com/app-store"
                  class="py-14 px-32 d-flex justify-content-center align-items-center gap-8 fw-medium text-heading text-sm hover-bg-main-600 hover-text-white box-shadow-6xl rounded-6"
                >
                  <i class="ph-fill ph-apple-logo"></i>
                  App Store
                </NuxtLink>

                <NuxtLink
                  to="https://play.google.com"
                  class="py-14 px-32 d-flex justify-content-center align-items-center gap-8 fw-medium text-heading text-sm hover-bg-main-600 hover-text-white box-shadow-6xl rounded-6"
                >
                  <img
                    src="/images/icon/google-play.svg"
                    alt="Google Play Icon"
                    width="20"
                    height="20"
                  />
                  Google Play
                </NuxtLink>
              </div>
            </div>
            <div class="mt-24">
              <img src="/images/thumbs/method.png" alt="Payment Methods" width="300" height="30" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import FooterMenuBlock from "./FooterMenuBlock.vue";
import { informationLinks, supportLinks, accountLinks, groceriesLinks } from "~/data/footer";
</script>
