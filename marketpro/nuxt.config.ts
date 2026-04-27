// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  ssr: false,
  devtools: { enabled: false },
  css: [
    "@/assets/icons/icons.css",
    "bootstrap/dist/css/bootstrap.min.css",
    "@/assets/scss/main.scss",
  ],
  modules: ["@nuxt/eslint", "@nuxt/image", "@nuxt/scripts", "nuxt-aos", "@pinia/nuxt"],

  nitro: {
    routeRules: {
      "/api/**": { proxy: `${process.env.BACKEND_URL || "http://backend:8080"}/api/**` },
      "/payment/**": { proxy: `${process.env.BACKEND_URL || "http://backend:8080"}/payment/**` },
      "/uploads/**": { proxy: `${process.env.BACKEND_URL || "http://backend:8080"}/uploads/**` },
    },
  },
  aos: {
    offset: 20,
    duration: 800,
    once: true,
    easing: "ease",
  },
  runtimeConfig: {
    public: {
      seoDefaults: {
        description: "eCommerce Multivendor Vue JS 3, Nuxt JS 4, Bootstrap 5 Template",
        keywords: [
          "ecommerce",
          "fashion",
          "electronics",
          "grocery",
          "shop",
          "store",
          "multipurpose",
        ],
        baseUrl: "https://example.com",
        defaultImage: {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Open Graph Image",
        },
        siteName: "MarketPro",
        twitterCard: "summary_large_image",
        type: "website",
      },
    },
  },

  app: {
    head: {
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/favicon.ico",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
      ],
    },
  },
});
