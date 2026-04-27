<template>
  <form class="pe-xl-5" @submit.prevent="handleSubmit">
    <div class="row gy-3">
      <div class="col-sm-6 col-xs-6">
        <input
          v-model="form.firstName"
          type="text"
          class="common-input border-gray-100"
          placeholder="First Name"
        />
        <FormError :error="errors.firstName" />
      </div>
      <div class="col-sm-6 col-xs-6">
        <input
          v-model="form.lastName"
          type="text"
          class="common-input border-gray-100"
          placeholder="Last Name"
        />
        <FormError :error="errors.lastName" />
      </div>
      <div class="col-12">
        <input
          v-model="form.businessName"
          type="text"
          class="common-input border-gray-100"
          placeholder="Business Name"
        />
      </div>
      <div class="col-12">
        <input
          v-model="form.country"
          type="text"
          class="common-input border-gray-100"
          placeholder="United states (US)"
        />
        <FormError :error="errors.country" />
      </div>
      <div class="col-12">
        <input
          v-model="form.street"
          type="text"
          class="common-input border-gray-100"
          placeholder="House number and street name"
        />
        <FormError :error="errors.street" />
      </div>
      <div class="col-12">
        <input
          v-model="form.apartment"
          type="text"
          class="common-input border-gray-100"
          placeholder="Apartment, suite, unit, etc. (Optional)"
        />
      </div>
      <div class="col-12">
        <input
          v-model="form.city"
          type="text"
          class="common-input border-gray-100"
          placeholder="City"
        />
        <FormError :error="errors.city" />
      </div>
      <div class="col-12">
        <input
          v-model="form.state"
          type="text"
          class="common-input border-gray-100"
          placeholder="Sans Fransisco"
        />
        <FormError :error="errors.state" />
      </div>
      <div class="col-12">
        <input
          v-model="form.postCode"
          type="text"
          class="common-input border-gray-100"
          placeholder="Post Code"
        />
        <FormError :error="errors.postCode" />
      </div>
      <div class="col-12">
        <input
          v-model="form.phone"
          type="number"
          class="common-input border-gray-100"
          placeholder="Phone"
        />
        <FormError :error="errors.phone" />
      </div>
      <div class="col-12">
        <input
          v-model="form.email"
          type="email"
          class="common-input border-gray-100"
          placeholder="Email Address"
        />
        <FormError :error="errors.email" />
      </div>
      <div class="col-12">
        <div class="my-40">
          <h6 class="text-lg mb-24">Additional Information</h6>
          <input
            v-model="form.notes"
            type="text"
            class="common-input border-gray-100"
            placeholder="Notes about your order, e.g. special notes for delivery."
          />
        </div>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import FormError from "./FormError.vue";

const form = reactive({
  firstName: "",
  lastName: "",
  businessName: "",
  country: "",
  street: "",
  apartment: "",
  city: "",
  state: "",
  postCode: "",
  phone: "",
  email: "",
  notes: "",
});

const errors = reactive<Record<string, string>>({});

const handleSubmit = () => {
  Object.keys(errors).forEach(key => (errors[key] = ""));
  let isValid = true;

  if (!form.firstName) {
    errors.firstName = "First name is required.";
    isValid = false;
  }
  if (!form.lastName) {
    errors.lastName = "Last name is required.";
    isValid = false;
  }
  if (!form.country) {
    errors.country = "Country is required.";
    isValid = false;
  }
  if (!form.street) {
    errors.street = "Street address is required.";
    isValid = false;
  }
  if (!form.city) {
    errors.city = "City is required.";
    isValid = false;
  }
  if (!form.state) {
    errors.state = "State is required.";
    isValid = false;
  }
  if (!form.postCode) {
    errors.postCode = "Postcode is required.";
    isValid = false;
  }
  if (!form.phone) {
    errors.phone = "Phone number is required.";
    isValid = false;
  }
  if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Valid email is required.";
    isValid = false;
  }

  if (isValid) {
    alert("Order placed successfully!");
  }
};

defineExpose({ handleSubmit });
</script>
