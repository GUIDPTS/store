<template>
  <div class="contact-box border border-gray-100 rounded-16 px-24 py-40">
    <form novalidate @submit="onSubmit">
      <h6 class="mb-32">Make Custom Request</h6>
      <div class="row gy-4">
        <div class="col-sm-6 col-xs-6">
          <label
            for="name"
            class="flex-align gap-4 text-sm font-heading-two text-gray-900 fw-semibold mb-4"
          >
            Full Name
            <span class="text-danger text-xl line-height-1">*</span>
          </label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            class="common-input px-16"
            placeholder="Full name"
            :aria-invalid="errors.name ? 'true' : 'false'"
            :aria-describedby="errors.name ? 'error-name' : undefined"
            required
            @blur="validateField('name')"
          />
          <p v-if="errors.name" id="error-name" class="text-danger mt-1" role="alert">
            {{ errors.name }}
          </p>
        </div>

        <div class="col-sm-6 col-xs-6">
          <label
            for="email"
            class="flex-align gap-4 text-sm font-heading-two text-gray-900 fw-semibold mb-4"
          >
            Email Address
            <span class="text-danger text-xl line-height-1">*</span>
          </label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            class="common-input px-16"
            placeholder="Email address"
            :aria-invalid="errors.email ? 'true' : 'false'"
            :aria-describedby="errors.email ? 'error-email' : undefined"
            required
            @blur="validateField('email')"
          />
          <p v-if="errors.email" id="error-email" class="text-danger mt-1" role="alert">
            {{ errors.email }}
          </p>
        </div>

        <div class="col-sm-6 col-xs-6">
          <label
            for="phone"
            class="flex-align gap-4 text-sm font-heading-two text-gray-900 fw-semibold mb-4"
          >
            Phone Number
            <span class="text-danger text-xl line-height-1">*</span>
          </label>
          <input
            id="phone"
            v-model="form.phone"
            type="tel"
            class="common-input px-16"
            placeholder="Phone Number"
            :aria-invalid="errors.phone ? 'true' : 'false'"
            :aria-describedby="errors.phone ? 'error-phone' : undefined"
            required
            @blur="validateField('phone')"
          />
          <p v-if="errors.phone" id="error-phone" class="text-danger mt-1" role="alert">
            {{ errors.phone }}
          </p>
        </div>

        <div class="col-sm-6 col-xs-6">
          <label
            for="subject"
            class="flex-align gap-4 text-sm font-heading-two text-gray-900 fw-semibold mb-4"
          >
            Subject
            <span class="text-danger text-xl line-height-1">*</span>
          </label>
          <input
            id="subject"
            v-model="form.subject"
            type="text"
            class="common-input px-16"
            placeholder="Subject"
            :aria-invalid="errors.subject ? 'true' : 'false'"
            :aria-describedby="errors.subject ? 'error-subject' : undefined"
            required
            @blur="validateField('subject')"
          />
          <p v-if="errors.subject" id="error-subject" class="text-danger mt-1" role="alert">
            {{ errors.subject }}
          </p>
        </div>

        <div class="col-sm-12">
          <label
            for="message"
            class="flex-align gap-4 text-sm font-heading-two text-gray-900 fw-semibold mb-4"
          >
            Message
            <span class="text-danger text-xl line-height-1">*</span>
          </label>
          <textarea
            id="message"
            v-model="form.message"
            class="common-input px-16"
            placeholder="Type your message"
            rows="5"
            :aria-invalid="errors.message ? 'true' : 'false'"
            :aria-describedby="errors.message ? 'error-message' : undefined"
            required
            @blur="validateField('message')"
          ></textarea>
          <p v-if="errors.message" id="error-message" class="text-danger mt-1" role="alert">
            {{ errors.message }}
          </p>
        </div>

        <div class="col-sm-12 mt-32">
          <button
            type="submit"
            class="btn btn-main py-18 px-32 rounded-8"
            :disabled="submitting"
            :aria-busy="submitting ? 'true' : 'false'"
          >
            {{ submitting ? "Submitting..." : "Get a Quote" }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";

const form = reactive({
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
});

const errors = reactive({
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
});

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateField(field: keyof typeof form) {
  switch (field) {
    case "name":
      errors.name = form.name.trim() ? "" : "Full Name is required.";
      break;
    case "email":
      if (!form.email.trim()) errors.email = "Email Address is required.";
      else if (!emailRegex.test(form.email)) errors.email = "Invalid email format.";
      else errors.email = "";
      break;
    case "phone":
      errors.phone = form.phone.trim() ? "" : "Phone Number is required.";
      break;
    case "subject":
      errors.subject = form.subject.trim() ? "" : "Subject is required.";
      break;
    case "message":
      errors.message = form.message.trim() ? "" : "Message is required.";
      break;
  }
}

function validateForm() {
  (Object.keys(form) as (keyof typeof form)[]).forEach(validateField);
  return !Object.values(errors).some(error => error !== "");
}

const submitting = ref(false);

async function onSubmit(event: Event) {
  event.preventDefault();

  if (!validateForm()) {
    return;
  }

  submitting.value = true;

  try {
    await new Promise(resolve => setTimeout(resolve, 1500));
    alert("Form submitted successfully!");

    Object.keys(form).forEach(key => {
      form[key as keyof typeof form] = "";
    });
  } catch {
    alert("Submission failed, please try again.");
  } finally {
    submitting.value = false;
  }
}
</script>
