<template>
  <div
    class="newsletter-two bg-black-light pb-72 pt-76 overflow-hidden"
    data-aos="fade-up"
    data-aos-duration="600"
  >
    <div class="container container-lg">
      <div class="flex-between gap-20 flex-wrap">
        <div class="flex-align gap-22">
          <h4 class="text-white mb-12 fw-medium">
            Join Our Newsletter, Get <span class="text-main-600">10% Off</span>
          </h4>
        </div>
        <form class="newsletter-two__form w-50" novalidate @submit.prevent="onSubmit">
          <div class="d-flex gap-16">
            <input
              v-model="email"
              type="email"
              :aria-invalid="!!emailError"
              :aria-describedby="emailError ? 'email-error' : undefined"
              class="common-input rounded-8 flex-grow-1 py-14 placeholder-text-16 bg-white-06 border border-neutral-600 focus-border-main-600 hover-border-main-600 text-white"
              placeholder="Enter your email address"
            />

            <button type="submit" class="btn btn-main-two flex-shrink-0 rounded-8 py-24 px-44">
              Subscribe Now
            </button>
          </div>
          <p v-if="emailError" id="email-error" class="mt-8 text-red-500 text-sm">
            {{ emailError }}
          </p>

          <p v-if="successMessage" class="mt-8 text-green-500 text-sm">
            {{ successMessage }}
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const email = ref<string>("");
const emailError = ref<string>("");
const successMessage = ref<string>("");

function validateEmail(value: string): string | null {
  if (!value) {
    return "Email is required.";
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(value)) {
    return "Please enter a valid email address.";
  }
  return null;
}

function onSubmit() {
  emailError.value = "";
  successMessage.value = "";

  const error = validateEmail(email.value.trim());

  if (error) {
    emailError.value = error;
    return;
  }

  successMessage.value = "Thank you for subscribing!";
  email.value = "";
}
</script>
