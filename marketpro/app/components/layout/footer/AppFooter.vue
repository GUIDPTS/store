<template>
  <footer class="footer py-120">
    <div class="container container-lg">
      <div class="footer-item-wrapper d-flex align-items-start flex-wrap">

        <!-- 第一列：Logo + 简介 + 联系方式 -->
        <div class="footer-item" data-aos="fade-up" data-aos-duration="200">
          <div class="max-w-340">
            <div class="footer-item__logo">
              <NuxtLink to="/">
                <img
                  :src="cfg.logo || '/images/logo/logo.png'"
                  :alt="cfg.site_name || 'Logo'"
                  style="max-height:48px;object-fit:contain"
                />
              </NuxtLink>
            </div>
            <p v-if="cfg.description" class="mb-28 text-heading">{{ cfg.description }}</p>
            <div class="d-flex flex-column gap-8">
              <p v-if="cfg.address" class="text-heading fw-medium">{{ cfg.address }}</p>
              <a v-if="cfg.email" :href="`mailto:${cfg.email}`" rel="noopener noreferrer"
                class="text-heading fw-medium hover-text-main-600">{{ cfg.email }}</a>
              <a v-if="cfg.tel" :href="`tel:${cfg.tel}`" rel="noopener noreferrer"
                class="text-heading fw-medium hover-text-main-600">{{ cfg.tel }}</a>
            </div>
          </div>
        </div>

        <!-- 动态链接列 -->
        <div
          v-for="(section, i) in cfg.sections"
          :key="i"
          class="footer-item"
          data-aos="fade-up"
          :data-aos-duration="String(400 + i * 200)"
        >
          <h6 class="footer-item__title">{{ section.title }}</h6>
          <ul class="footer-menu">
            <li
              v-for="(link, j) in section.links"
              :key="j"
              :class="{ 'mb-16': j < section.links.length - 1 }"
            >
              <NuxtLink :to="link.url" class="text-heading hover-text-main-600">
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- 最后一列：App 下载 -->
        <div class="footer-item" data-aos="fade-up"
          :data-aos-duration="String(400 + cfg.sections.length * 200)">
          <h6>{{ cfg.app.title }}</h6>
          <p class="mb-16">{{ cfg.app.subtitle }}</p>
          <div class="my-32">
            <div class="flex-align gap-8">
              <div v-if="cfg.app.qr_code" class="bg-white rounded-10 p-1 box-shadow-5xl">
                <img :src="cfg.app.qr_code" alt="QR Code" width="80" height="80" />
              </div>
              <div class="d-flex flex-column gap-16">
                <a v-if="cfg.app.appstore_url" :href="cfg.app.appstore_url"
                  rel="noopener noreferrer"
                  class="py-14 px-32 d-flex justify-content-center align-items-center gap-8 fw-medium text-heading text-sm hover-bg-main-600 hover-text-white box-shadow-6xl rounded-6">
                  <i class="ph-fill ph-apple-logo"></i> App Store
                </a>
                <a v-if="cfg.app.googleplay_url" :href="cfg.app.googleplay_url"
                  rel="noopener noreferrer"
                  class="py-14 px-32 d-flex justify-content-center align-items-center gap-8 fw-medium text-heading text-sm hover-bg-main-600 hover-text-white box-shadow-6xl rounded-6">
                  <img src="/images/icon/google-play.svg" alt="Google Play" width="20" height="20" />
                  Google Play
                </a>
              </div>
            </div>
            <div v-if="cfg.app.payment_img" class="mt-24">
              <img :src="cfg.app.payment_img" alt="Payment Methods" width="300" height="30" />
            </div>
          </div>
        </div>

      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
interface FooterLink { label: string; url: string }
interface FooterSection { title: string; links: FooterLink[] }
interface FooterApp {
  title: string
  subtitle: string
  qr_code: string
  appstore_url: string
  googleplay_url: string
  payment_img: string
}
interface FooterConfig {
  logo: string
  site_name: string
  description: string
  address: string
  email: string
  tel: string
  sections: FooterSection[]
  app: FooterApp
}

const DEFAULT_APP: FooterApp = {
  title: "Shop on The Go",
  subtitle: "MarketPro App is available. Get it now",
  qr_code: "/images/thumbs/qr-code.png",
  appstore_url: "https://www.apple.com/app-store",
  googleplay_url: "https://play.google.com",
  payment_img: "/images/thumbs/method.png",
}

const DEFAULT_CONFIG: FooterConfig = {
  logo: "/images/logo/logo.png",
  site_name: "",
  description: "We're Grocery Shop, an innovative team of food suppliers.",
  address: "2972 Westheimer Rd. Santa Ana, Illinois 85486",
  email: "support@example.com",
  tel: "+ (406) 555-0120",
  sections: [
    {
      title: "Information",
      links: [
        { label: "Become a Vendor", url: "/vendor" },
        { label: "Affiliate Program", url: "/become-seller" },
        { label: "Privacy Policy", url: "/contact" },
        { label: "Community", url: "/become-seller" },
      ],
    },
    {
      title: "Customer Support",
      links: [
        { label: "Help Center", url: "/contact" },
        { label: "Contact Us", url: "/contact" },
        { label: "Online Shopping", url: "/shop" },
      ],
    },
    {
      title: "My Account",
      links: [
        { label: "My Account", url: "/account" },
        { label: "Order History", url: "/account/orders" },
        { label: "Shopping Cart", url: "/cart" },
      ],
    },
  ],
  app: { ...DEFAULT_APP },
}

const cfg = ref<FooterConfig>(JSON.parse(JSON.stringify(DEFAULT_CONFIG)))

const { data } = await useFetch<Record<string, string>>("/api/settings")
if (data.value?.footer_config) {
  try {
    const parsed = JSON.parse(data.value.footer_config) as Partial<FooterConfig>
    cfg.value = {
      logo: parsed.logo || data.value.site_logo || DEFAULT_CONFIG.logo,
      site_name: parsed.site_name || data.value.site_name || "",
      description: parsed.description || data.value.site_description || DEFAULT_CONFIG.description,
      address: parsed.address || data.value.contact_address || DEFAULT_CONFIG.address,
      email: parsed.email || data.value.contact_email || DEFAULT_CONFIG.email,
      tel: parsed.tel || data.value.contact_tel || DEFAULT_CONFIG.tel,
      sections: Array.isArray(parsed.sections) && parsed.sections.length > 0
        ? parsed.sections
        : DEFAULT_CONFIG.sections,
      app: parsed.app ? { ...DEFAULT_APP, ...parsed.app } : DEFAULT_APP,
    }
  } catch { /* keep defaults */ }
} else if (data.value) {
  cfg.value = {
    ...DEFAULT_CONFIG,
    logo: data.value.site_logo || DEFAULT_CONFIG.logo,
    description: data.value.site_description || DEFAULT_CONFIG.description,
    address: data.value.contact_address || DEFAULT_CONFIG.address,
    email: data.value.contact_email || DEFAULT_CONFIG.email,
    tel: data.value.contact_tel || DEFAULT_CONFIG.tel,
  }
}
</script>
