<script setup lang="ts">
import { ref } from "vue";
import { comments } from "~/data/comments";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const form = ref<FormData>({
  name: "",
  email: "",
  message: "",
});

const errors = ref<Partial<Record<keyof FormData, string>>>({});

const submitted = ref(false);

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateForm() {
  errors.value = {};

  if (!form.value.name.trim()) {
    errors.value.name = "Name is required";
  }

  if (!form.value.email.trim()) {
    errors.value.email = "Email is required";
  } else if (!validateEmail(form.value.email)) {
    errors.value.email = "Email is invalid";
  }

  if (!form.value.message.trim()) {
    errors.value.message = "Message is required";
  }

  return Object.keys(errors.value).length === 0;
}

function onSubmit() {
  if (validateForm()) {
    submitted.value = true;
    form.value = { name: "", email: "", message: "" };
    errors.value = {};
  }
}
</script>

<template>
  <div class="my-48" data-aos="fade-up" data-aos-duration="600">
    <form novalidate @submit.prevent="onSubmit">
      <h6 class="mb-24">Leave a Comment</h6>
      <div class="row gy-4">
        <div class="col-sm-6 col-xs-6">
          <label for="name" class="text-sm font-heading-two text-gray-900 fw-semibold mb-4"
            >Full Name</label
          >
          <input
            id="name"
            v-model="form.name"
            type="text"
            class="common-input px-16"
            placeholder="Full name"
            :class="{ 'border-red-500': errors.name }"
            :aria-invalid="!!errors.name"
            aria-describedby="name-error"
          />
          <p v-if="errors.name" id="name-error" class="text-red-600 text-sm mt-1">
            {{ errors.name }}
          </p>
        </div>

        <div class="col-sm-6 col-xs-6">
          <label for="email" class="text-sm font-heading-two text-gray-900 fw-semibold mb-4"
            >Email Address</label
          >
          <input
            id="email"
            v-model="form.email"
            type="email"
            class="common-input px-16"
            placeholder="Email address"
            :class="{ 'border-red-500': errors.email }"
            :aria-invalid="!!errors.email"
            aria-describedby="email-error"
          />
          <p v-if="errors.email" id="email-error" class="text-red-600 text-sm mt-1">
            {{ errors.email }}
          </p>
        </div>

        <div class="col-sm-12">
          <label for="message" class="text-sm font-heading-two text-gray-900 fw-semibold mb-4"
            >Message</label
          >
          <textarea
            id="message"
            v-model="form.message"
            class="common-input px-16"
            placeholder="What's your thought about this blog..."
            :class="{ 'border-red-500': errors.message }"
            :aria-invalid="!!errors.message"
            aria-describedby="message-error"
          ></textarea>
          <p v-if="errors.message" id="message-error" class="text-red-600 text-sm mt-1">
            {{ errors.message }}
          </p>
        </div>

        <div class="col-sm-12 mt-32">
          <button type="submit" class="btn btn-main py-18 px-32 rounded-8">Post Comment</button>
        </div>

        <p v-if="submitted" class="text-green-600 mt-16">
          Thanks for your comment! (No API, so just frontend validation.)
        </p>
      </div>
    </form>
  </div>

  <div class="my-48" data-aos="fade-up" data-aos-duration="600">
    <h6 class="mb-48">Comments</h6>
    <div
      v-for="comment in comments"
      :key="comment.id"
      class="d-flex align-items-start gap-16 mb-32 pb-32 border-bottom border-gray-100"
    >
      <img
        :src="comment.avatar"
        :alt="comment.name"
        class="w-40 h-40 rounded-circle object-fit-cover flex-shrink-0"
      />
      <div class="flex-grow-1">
        <div class="flex-align gap-8">
          <h6 class="text-md fw-bold mb-0">{{ comment.name }}</h6>
          <span class="w-6 h-6 bg-gray-500 rounded-circle"></span>
          <span class="text-sm fw-medium text-gray-700">{{ comment.date }}</span>
        </div>
        <p class="mt-16 text-gray-700">{{ comment.text }}</p>
      </div>
    </div>

    <div class="mt-48">
      <button type="button" class="btn btn-main py-13 flex-align gap-8">
        Load More <i class="ph ph-spinner-gap text-2xl"></i>
      </button>
    </div>
  </div>
</template>
