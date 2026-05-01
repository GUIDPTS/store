<template>
  <section class="newsletter-new" data-aos="fade-up" data-aos-duration="600">
    <div class="container container-lg">
      <div
        class="py-20 px-80-px bg-neutral-100 rounded-12 d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap gap-32"
      >
        <div class="max-w-700">
          <h3 class="mb-30">Stay home & get your daily needs from our shop</h3>

          <form class="d-flex gap-8 flex-wrap flex-sm-nowrap" novalidate @submit.prevent="onSubmit">
            <input
              v-model="email"
              type="email"
              class="form-control bg-white px-20 shadow-none py-16 rounded placeholder-text-14 flex-grow-1"
              placeholder="Enter your mail"
              :aria-invalid="!!emailError"
              :aria-describedby="emailError ? 'email-error' : undefined"
            />
            <button
              type="submit"
              :disabled="submitting"
              class="btn py-20 px-32 bg-success-600 flex-shrink-0 hover-bg-success-700 flex-grow-1"
            >
              {{ submitting ? '订阅中...' : 'Subscribe now' }}
            </button>
          </form>

          <p v-if="emailError" id="email-error" class="text-red-500 mt-10 text-sm">
            {{ emailError }}
          </p>

          <p v-if="successMessage" class="text-green-500 mt-10 text-sm">
            {{ successMessage }}
          </p>

          <p class="text-heading text-sm mt-20 fw-medium">
            I agree that my submitted data is being collected and stored.
          </p>
        </div>

        <div class="d-lg-block d-none">
          <img :src="newsletterImg" alt="Thumbnail" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useHomeConfig } from "~/composables/useHomeConfig";

const { newsletterImg } = useHomeConfig();

const email = ref<string>("");
const emailError = ref<string>("");
const successMessage = ref<string>("");
const submitting = ref(false);

function validateEmail(value: string): string | null {
  if (!value) return "请输入邮箱地址";
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(value)) return "请输入有效的邮箱地址";
  return null;
}

async function onSubmit() {
  emailError.value = "";
  successMessage.value = "";

  const error = validateEmail(email.value.trim());
  if (error) {
    emailError.value = error;
    return;
  }

  submitting.value = true;
  try {
    await $fetch("/api/newsletter/subscribe", {
      method: "POST",
      body: { email: email.value.trim() },
    });
    successMessage.value = "订阅成功！感谢您的关注，我们将向您发送最新资讯。";
    email.value = "";
  } catch (e: any) {
    emailError.value = e?.data?.error || "订阅失败，请稍后重试";
  } finally {
    submitting.value = false;
  }
}
</script>
