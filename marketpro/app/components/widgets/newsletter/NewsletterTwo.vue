<template>
  <div
    class="newsletter-two bg-neutral-600 py-32 overflow-hidden"
    data-aos="fade-up"
    data-aos-duration="600"
  >
    <div class="container container-lg">
      <div class="flex-between gap-20 flex-wrap">
        <div class="flex-align gap-22">
          <span class="d-flex"><NuxtImg src="/images/icon/envelop.png" alt="Envelope icon" /></span>
          <div>
            <h5 class="text-white mb-12 fw-medium">Join Our Newsletter, Get 10% Off</h5>
            <p class="text-white fw-light">Get all latest information on events, sales and offer</p>
          </div>
        </div>

        <form class="newsletter-two__form w-50" novalidate @submit="onSubmit">
          <div class="flex-align gap-16">
            <input
              v-model="email"
              type="email"
              class="common-input style-two rounded-8 flex-grow-1 py-14"
              placeholder="Enter your email address"
              :aria-invalid="error ? 'true' : 'false'"
              aria-describedby="email-error"
              required
            />
            <button type="submit" class="btn btn-main-two flex-shrink-0 rounded-8 py-16">
              Subscribe
            </button>
          </div>
          <p v-if="error" id="email-error" class="text-danger mt-8" role="alert">{{ error }}</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const email = ref("");
const error = ref("");

function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
}

function onSubmit(event: Event) {
  event.preventDefault();
  error.value = "";

  if (!email.value) {
    error.value = "Email is required.";
    return;
  }

  if (!validateEmail(email.value)) {
    error.value = "Please enter a valid email address.";
    return;
  }

  alert("Thanks for subscribing!");
  email.value = "";
}
</script>
