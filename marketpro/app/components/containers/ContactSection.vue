<template>
  <section class="contact py-80">
    <div class="container container-lg">
      <div class="row gy-5">
        <div class="col-lg-8">
          <ContactForm />
        </div>

        <div class="col-lg-4">
          <div class="contact-box border border-gray-100 rounded-16 px-24 py-40">
            <h6 class="mb-48">Get In Touch</h6>
            <div class="flex-align gap-16 mb-16">
              <span
                class="w-40 h-40 flex-center rounded-circle border border-gray-100 text-main-two-600 text-2xl flex-shrink-0"
                ><i class="ph-fill ph-phone-call"></i
              ></span>
              <a href="tel:+00123456789" class="text-md text-gray-900 hover-text-main-600"
                >+00 123 456 789</a
              >
            </div>
            <div class="flex-align gap-16 mb-16">
              <span
                class="w-40 h-40 flex-center rounded-circle border border-gray-100 text-main-two-600 text-2xl flex-shrink-0"
                ><i class="ph-fill ph-envelope"></i
              ></span>
              <a
                href="mailto:support24@marketpro.com"
                class="text-md text-gray-900 hover-text-main-600"
                >support24@marketpro.com</a
              >
            </div>
            <div class="flex-align gap-16 mb-0">
              <span
                class="w-40 h-40 flex-center rounded-circle border border-gray-100 text-main-two-600 text-2xl flex-shrink-0"
                ><i class="ph-fill ph-map-pin"></i
              ></span>
              <span class="text-md text-gray-900">789 Inner Lane, California, USA</span>
            </div>
          </div>

          <div class="mt-24 flex-align flex-wrap gap-16">
            <NuxtLink
              to="/contact"
              class="bg-neutral-600 hover-bg-main-600 rounded-8 p-10 px-16 flex-between flex-wrap gap-8 flex-grow-1"
            >
              <span class="text-white fw-medium">Get Support On Call</span>
              <span class="w-36 h-36 bg-main-600 rounded-8 flex-center text-xl text-white"
                ><i class="ph ph-headset"></i
              ></span>
            </NuxtLink>

            <NuxtLink
              to="/contact"
              class="bg-neutral-600 hover-bg-main-600 rounded-8 p-10 px-16 flex-between flex-wrap gap-8 flex-grow-1"
            >
              <span class="text-white fw-medium">Get Direction</span>
              <span class="w-36 h-36 bg-main-600 rounded-8 flex-center text-xl text-white"
                ><i class="ph ph-map-pin"></i
              ></span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import ContactForm from "~/components/widgets/form/ContactForm.vue";
</script>
