<template>
  <section class="shipping mb-24">
    <div class="container container-lg">
      <div class="row gy-4">
        <div
          v-for="(item, i) in items"
          :key="i"
          class="col-xxl-3 col-sm-6"
          data-aos="zoom-in"
          :data-aos-duration="String(400 + i * 200)"
        >
          <div class="shipping-item flex-align gap-16 rounded-16 bg-main-50 hover-bg-main-100 transition-2">
            <span class="w-56 h-56 flex-center rounded-circle bg-main-600 text-white text-32 flex-shrink-0">
              <i :class="item.icon"></i>
            </span>
            <div>
              <h6 class="mb-0">{{ item.title }}</h6>
              <span class="text-sm text-heading">{{ item.description }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const DEFAULT_ITEMS = [
  { icon: "ph-fill ph-car-profile",  title: "Free Shipping",     description: "Free shipping all over the US" },
  { icon: "ph-fill ph-hand-heart",   title: "100% Satisfaction", description: "Free shipping all over the US" },
  { icon: "ph-fill ph-credit-card",  title: "Secure Payments",   description: "Free shipping all over the US" },
  { icon: "ph-fill ph-chats",        title: "24/7 Support",      description: "Free shipping all over the US" },
];

const items = ref(DEFAULT_ITEMS);

const { data } = await useFetch<Record<string, string>>("/api/settings");
if (data.value?.home_features) {
  try {
    const parsed = JSON.parse(data.value.home_features);
    if (Array.isArray(parsed) && parsed.length > 0) {
      items.value = parsed;
    }
  } catch { /* keep defaults */ }
}
</script>
