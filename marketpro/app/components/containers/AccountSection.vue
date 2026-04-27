<template>
  <section class="account py-80">
    <div class="container container-lg">
      <div class="row gy-4">
        <div class="col-xl-6 pe-xl-5">
          <form class="h-100" @submit.prevent="onLoginSubmit">
            <div
              class="border border-gray-100 hover-border-main-600 transition-1 rounded-16 px-24 py-40 h-100"
            >
              <h6 class="text-xl mb-32">Login</h6>

              <div class="mb-24">
                <label for="username" class="text-neutral-900 text-lg mb-8 fw-medium">
                  Username or email address <span class="text-danger">*</span>
                </label>
                <input
                  id="username"
                  v-model="loginForm.username"
                  type="text"
                  class="common-input"
                  placeholder="First Name"
                />
                <p v-if="loginErrors.username" class="text-danger text-sm mt-2">
                  {{ loginErrors.username }}
                </p>
              </div>

              <div class="mb-24">
                <label for="password" class="text-neutral-900 text-lg mb-8 fw-medium">
                  Password <span class="text-danger">*</span>
                </label>
                <div class="position-relative">
                  <input
                    id="password"
                    v-model="loginForm.password"
                    :type="showLoginPassword ? 'text' : 'password'"
                    class="common-input"
                    placeholder="Enter Password"
                  />
                  <span
                    class="toggle-password position-absolute top-50 inset-inline-end-0 me-16 translate-middle-y cursor-pointer ph"
                    :class="showLoginPassword ? 'ph-eye' : 'ph-eye-slash'"
                    @click="toggleLoginPassword"
                  ></span>
                </div>
                <p v-if="loginErrors.password" class="text-danger text-sm mt-2">
                  {{ loginErrors.password }}
                </p>
              </div>

              <div class="mb-24 mt-48">
                <div class="flex-align gap-48 flex-wrap">
                  <button type="submit" class="btn btn-main py-18 px-40">Log in</button>
                  <div class="form-check common-check">
                    <input id="remember" class="form-check-input" type="checkbox" />
                    <label class="form-check-label flex-grow-1" for="remember">Remember me</label>
                  </div>
                </div>
              </div>

              <div class="mt-48">
                <NuxtLink
                  to="/"
                  class="text-danger-600 text-sm fw-semibold hover-text-decoration-underline"
                >
                  Forgot your password?
                </NuxtLink>
              </div>
            </div>
          </form>
        </div>

        <div class="col-xl-6">
          <form @submit.prevent="onRegisterSubmit">
            <div
              class="border border-gray-100 hover-border-main-600 transition-1 rounded-16 px-24 py-40"
            >
              <h6 class="text-xl mb-32">Register</h6>

              <div class="mb-24">
                <label for="usernameTwo" class="text-neutral-900 text-lg mb-8 fw-medium">
                  Username <span class="text-danger">*</span>
                </label>
                <input
                  id="usernameTwo"
                  v-model="registerForm.username"
                  type="text"
                  class="common-input"
                  placeholder="Write a username"
                />
                <p v-if="registerErrors.username" class="text-danger text-sm mt-2">
                  {{ registerErrors.username }}
                </p>
              </div>

              <div class="mb-24">
                <label for="emailTwo" class="text-neutral-900 text-lg mb-8 fw-medium">
                  Email address <span class="text-danger">*</span>
                </label>
                <input
                  id="emailTwo"
                  v-model="registerForm.email"
                  type="email"
                  class="common-input"
                  placeholder="Enter Email Address"
                />
                <p v-if="registerErrors.email" class="text-danger text-sm mt-2">
                  {{ registerErrors.email }}
                </p>
              </div>

              <div class="mb-24">
                <label for="enter-password" class="text-neutral-900 text-lg mb-8 fw-medium">
                  Password <span class="text-danger">*</span>
                </label>
                <div class="position-relative">
                  <input
                    id="enter-password"
                    v-model="registerForm.password"
                    :type="showRegisterPassword ? 'text' : 'password'"
                    class="common-input"
                    placeholder="Enter Password"
                  />
                  <span
                    class="toggle-password position-absolute top-50 inset-inline-end-0 me-16 translate-middle-y cursor-pointer ph"
                    :class="showRegisterPassword ? 'ph-eye' : 'ph-eye-slash'"
                    @click="toggleRegisterPassword"
                  ></span>
                </div>
                <p v-if="registerErrors.password" class="text-danger text-sm mt-2">
                  {{ registerErrors.password }}
                </p>
              </div>

              <div class="my-48">
                <p class="text-gray-500">
                  Your personal data will be used to process your order, support your experience
                  throughout this website, and for other purposes described in our
                  <NuxtLink to="/" class="text-main-600 text-decoration-underline">
                    privacy policy
                  </NuxtLink>
                  .
                </p>
              </div>

              <div class="mt-48">
                <button type="submit" class="btn btn-main py-18 px-40">Register</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";

type LoginForm = {
  username: string;
  password: string;
};

type RegisterForm = {
  username: string;
  email: string;
  password: string;
};

const loginForm = ref<LoginForm>({
  username: "",
  password: "",
});

const registerForm = ref<RegisterForm>({
  username: "",
  email: "",
  password: "",
});

// errors
const loginErrors = ref<Partial<LoginForm>>({});
const registerErrors = ref<Partial<RegisterForm>>({});

// toggle password
const showLoginPassword = ref(false);
const showRegisterPassword = ref(false);

const toggleLoginPassword = () => {
  showLoginPassword.value = !showLoginPassword.value;
};

const toggleRegisterPassword = () => {
  showRegisterPassword.value = !showRegisterPassword.value;
};

// login
const validateLogin = () => {
  loginErrors.value = {};

  if (!loginForm.value.username) {
    loginErrors.value.username = "Username or email is required.";
  }

  if (!loginForm.value.password) {
    loginErrors.value.password = "Password is required.";
  }

  return Object.keys(loginErrors.value).length === 0;
};

// registration
const validateRegister = () => {
  registerErrors.value = {};

  if (!registerForm.value.username) {
    registerErrors.value.username = "Username is required.";
  }

  if (!registerForm.value.email) {
    registerErrors.value.email = "Email is required.";
  } else if (!/^\S+@\S+\.\S+$/.test(registerForm.value.email)) {
    registerErrors.value.email = "Invalid email address.";
  }

  if (!registerForm.value.password) {
    registerErrors.value.password = "Password is required.";
  }

  return Object.keys(registerErrors.value).length === 0;
};

const onLoginSubmit = () => {
  const isValid = validateLogin();
  if (isValid) {
    alert("Login Succesfull");
  }
};

const onRegisterSubmit = () => {
  const isValid = validateRegister();
  if (isValid) {
    alert("Registration Succesfull");
  }
};
</script>
