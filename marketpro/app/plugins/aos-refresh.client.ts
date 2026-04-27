import { defineNuxtPlugin, useNuxtApp } from "#app";

export default defineNuxtPlugin(() => {
  const nuxtApp = useNuxtApp();
  const $refreshAos = nuxtApp.$refreshAos as (() => void) | undefined;

  nuxtApp.hook("page:finish", () => {
    setTimeout(() => {
      $refreshAos?.();
    }, 200);
  });
});
