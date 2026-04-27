<template>
  <footer class="footer py-80 overflow-hidden bg-black-light">
    <div class="container container-lg">
      <div class="row row-cols-1 row-cols-sm-2 row-cols-xl-5 gy-5">
        <div class="col" data-aos="fade-up" data-aos-duration="400">
          <div class="footer-item max-w-275">
            <div class="footer-item__logo mb-40">
              <NuxtLink to="/">
                <img :src="contactInfo.logo" alt="Site Logo" />
              </NuxtLink>
            </div>
            <div class="flex-align gap-16 mb-20">
              <span class="text-main-two-600 text-xl flex-shrink-0">
                <i class="ph-bold ph-phone-call"></i>
              </span>
              <a
                :href="contactInfo.phone.href"
                class="text-md text-white fw-medium hover-text-main-600"
              >
                {{ contactInfo.phone.label }}
              </a>
            </div>
            <div class="flex-align gap-16 mb-20">
              <span class="text-main-two-600 text-xl flex-shrink-0">
                <i class="ph-bold ph-chat-circle-text"></i>
              </span>
              <a
                :href="contactInfo.email.href"
                class="text-md text-white fw-medium hover-text-main-600"
              >
                {{ contactInfo.email.label }}
              </a>
            </div>
            <div class="flex-align gap-16 mb-20">
              <span class="text-main-two-600 text-xl flex-shrink-0">
                <i class="ph-bold ph-map-pin-area"></i>
              </span>
              <span class="text-md text-white fw-medium">{{ contactInfo.address }}</span>
            </div>
            <div class="d-flex gap-12 mt-24">
              <a
                v-for="(app, index) in contactInfo.appLinks"
                :key="`app-link-${index}`"
                :href="app.href"
                class="py-14 px-8 rounded-8 d-flex justify-content-center align-items-center gap-8 fw-normal text-white text-xs bg-black hover-bg-white hover-text-heading box-shadow-6xl flex-grow-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i v-if="app.icon" :class="app.icon"></i>
                <img v-if="app.img" :src="app.img" :alt="app.label" />
                {{ app.label }}
              </a>
            </div>
          </div>
        </div>
        <div
          v-for="(section, sectionIndex) in footerSections"
          :key="`footer-section-${sectionIndex}`"
          class="col"
          :data-aos="'fade-up'"
          :data-aos-duration="500 + sectionIndex * 100"
        >
          <div class="footer-item">
            <h6 class="footer-item__title text-white fw-semibold mb-24">
              {{ section.title }}
            </h6>
            <ul class="footer-menu d-flex flex-column gap-20">
              <li
                v-for="(link, linkIndex) in section.links"
                :key="`footer-link-${sectionIndex}-${linkIndex}`"
              >
                <NuxtLink
                  v-if="!link.to.startsWith('http')"
                  :to="link.to"
                  class="text-neutral-200 hover-text-white hover-text-decoration-underline"
                >
                  {{ link.label }}
                </NuxtLink>

                <a
                  v-else
                  :href="link.to"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-neutral-200 hover-text-white hover-text-decoration-underline"
                >
                  {{ link.label }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { contactInfo, footerSections } from "~/data/footer-two";
</script>
