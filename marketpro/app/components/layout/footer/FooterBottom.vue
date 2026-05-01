<template>
  <div class="bottom-footer pt-8">
    <div class="container container-lg">
      <div class="bottom-footer__inner flex-between flex-wrap gap-16 py-16 border-top border-neutral-100">
        <p class="bottom-footer__text text-heading fw-medium" v-html="copyrightHtml"></p>

        <nav aria-label="Social media links" class="flex-align gap-8 flex-wrap">
          <ul class="flex-align gap-16 list-none m-0 p-0">
            <li v-for="s in socials" :key="s.icon">
              <a
                :href="s.url"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="s.label"
                class="w-44 h-44 flex-center bg-white shadow-sm text-main-600 text-xl rounded-circle hover-bg-main-600 hover-text-white transition-colors duration-300"
              >
                <i :class="s.icon" aria-hidden="true"></i>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Social { icon: string; url: string; label: string }

const DEFAULT_SOCIALS: Social[] = [
  { icon: "ph-fill ph-facebook-logo",  url: "https://www.facebook.com",  label: "Facebook" },
  { icon: "ph-fill ph-twitter-logo",   url: "https://www.twitter.com",   label: "Twitter" },
  { icon: "ph-fill ph-linkedin-logo",  url: "https://www.linkedin.com",  label: "LinkedIn" },
  { icon: "ph-fill ph-pinterest-logo", url: "https://www.pinterest.com", label: "Pinterest" },
]

const currentYear = new Date().getFullYear()
const copyrightHtml = ref(`Copyright &copy; <span class="text-success-600 fw-semibold">${currentYear}</span> All Rights Reserved`)
const socials = ref<Social[]>(DEFAULT_SOCIALS)

const { data } = await useFetch<Record<string, string>>("/api/settings")
if (data.value?.footer_config) {
  try {
    const parsed = JSON.parse(data.value.footer_config)
    if (parsed.copyright) {
      copyrightHtml.value = parsed.copyright.replace('{year}', String(currentYear))
    }
    if (Array.isArray(parsed.socials) && parsed.socials.length > 0) {
      socials.value = parsed.socials
    }
  } catch { /* keep defaults */ }
} else if (data.value?.footer_text) {
  copyrightHtml.value = data.value.footer_text
}
</script>
