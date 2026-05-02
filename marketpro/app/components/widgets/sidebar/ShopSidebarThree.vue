<template>
  <div class="shop-sidebar" :class="{ active: isSidebarActive }">
    <button
      type="button"
      class="shop-sidebar__close d-lg-none d-flex w-32 h-32 flex-center border border-gray-100 rounded-circle hover-bg-main-600 bg-main-600 position-absolute inset-inline-end-0 me-10 mt-8 text-white border-main-600"
      aria-label="Close Sidebar"
      @click="closeSidebar"
    >
      <i class="ph ph-x"></i>
    </button>

    <div class="d-flex flex-column gap-12 px-lg-0 px-3 py-lg-0 py-4">
      <div class="bg-neutral-600 rounded-8 p-24">
        <div class="d-flex align-items-center justify-content-between">
          <span class="w-80 h-80 flex-center bg-white rounded-8 flex-shrink-0 overflow-hidden">
            <img v-if="shop?.logo" :src="shop.logo" :alt="shop?.name" class="w-100 h-100 object-fit-cover" />
            <i v-else class="ph ph-storefront text-gray-400 text-3xl"></i>
          </span>
          <!-- 店主 NodeLoc 用户名 -->
          <div v-if="ownerUsername" class="d-flex flex-column align-items-center gap-8">
            <a
              :href="`https://www.nodeloc.com/u/${ownerUsername}`"
              target="_blank"
              rel="noopener noreferrer"
              class="text-uppercase border border-white px-16 py-8 rounded-pill text-white text-sm hover-bg-main-two-600 hover-text-white hover-border-main-two-600 transition-2 flex-center gap-8 text-decoration-none"
            >
              <i class="ph ph-user-circle text-xl"></i>
              @{{ ownerUsername }}
            </a>
          </div>
        </div>

        <div class="mt-32">
          <h6 class="text-white fw-semibold mb-12">
            <NuxtLink :to="`/vendor/${shop?.id}`" class="text-white">{{ shop?.name ?? '...' }}</NuxtLink>
          </h6>
          <p v-if="shop?.description" class="text-xs text-white opacity-75 mb-12 text-line-2">{{ shop.description }}</p>
          <p v-if="shop?.contact" class="text-xs text-white opacity-75 mb-0">
            <i class="ph ph-chat-circle me-4"></i>{{ shop.contact }}
          </p>
        </div>
      </div>

      <div class="border border-gray-50 rounded-8 p-24">
        <h6 class="text-xl border-bottom border-gray-100 pb-24 mb-24">商品分类</h6>
        <ul class="max-h-540 overflow-y-auto scroll-sm">
          <li v-for="category in categories" :key="category.id" class="mb-24">
            <NuxtLink :to="category.href" class="text-gray-900 hover-text-main-600">
              {{ category.name }} ({{ category.count }})
            </NuxtLink>
          </li>
        </ul>
      </div>

      <div class="blog-sidebar border border-gray-100 rounded-8 p-32 mb-40">
        <h6 class="text-xl mb-32 pb-32 border-bottom border-gray-100">热销商品</h6>
        <div class="d-flex flex-column gap-24">
          <div
            v-for="product in topProducts"
            :key="product.id"
            class="d-flex align-items-center flex-sm-nowrap flex-wrap gap-16"
          >
            <NuxtLink
              :to="`/product/${product.id}`"
              class="w-76 h-76 flex-shrink-0 bg-color-three flex-center rounded-4 overflow-hidden d-block"
            >
              <img v-if="product.image" :src="product.image" :alt="product.name" style="max-width:100%;max-height:100%;object-fit:contain" />
              <i v-else class="ph ph-package text-gray-300 text-2xl"></i>
            </NuxtLink>
            <div class="flex-grow-1">
              <h6 class="text-lg mb-8 fw-medium">
                <NuxtLink :to="`/product/${product.id}`" class="link text-line-2">{{ product.name }}</NuxtLink>
              </h6>
              <h6 class="text-md mb-0 mt-4 text-main-600"><i class="ph-fill ph-lightning-a" style="font-size:0.85em;vertical-align:middle;margin-right:1px"></i>{{ Number(product.price).toFixed(2) }}</h6>
            </div>
          </div>
          <div v-if="topProducts.length === 0" class="text-gray-400 text-sm text-center py-8">暂无商品</div>
        </div>
      </div>
    </div>
  </div>
  <div
    class="side-overlay"
    :class="{ show: isOverlayVisible }"
    aria-hidden="true"
    @click="closeSidebar"
  ></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useSidebar } from "~/composables/useSidebar";

const { isSidebarActive, isOverlayVisible, closeSidebar } = useSidebar();

const route = useRoute();
const shop = ref<any>(null);
const ownerUsername = ref("");
const categories = ref<any[]>([]);
const topProducts = ref<any[]>([]);

onMounted(async () => {
  const id = route.params.id as string;
  if (!id) return;
  try {
    shop.value = await $fetch<any>(`/api/shops/${id}`);
    // 店主用户名（来自 shop.user）
    if (shop.value?.user?.username) {
      ownerUsername.value = shop.value.user.username;
    }
    // 动态 SEO
    const siteName = (useSiteStore().settings.site_name as string) || 'NodeLoc';
    useHead({
      title: `${shop.value.name} | ${siteName}`,
      meta: [
        { name: "description", content: shop.value.description || shop.value.name },
        { property: "og:title", content: shop.value.name },
        ...(shop.value.logo ? [{ property: "og:image", content: shop.value.logo }] : []),
      ],
    });
  } catch { /* ignore */ }
  try {
    const data = await $fetch<any[]>("/api/categories/with-products");
    categories.value = Array.isArray(data) ? data.map((c: any) => ({
      id: c.id,
      name: c.name,
      count: c.product_count ?? 0,
      href: `/category/${c.id}`,
    })) : [];
  } catch { /* ignore */ }
  try {
    const data = await $fetch<any[]>(`/api/shops/${id}/products`);
    topProducts.value = Array.isArray(data)
      ? [...data].sort((a, b) => (b.sales_count || 0) - (a.sales_count || 0)).slice(0, 5)
      : [];
  } catch { /* ignore */ }
});
</script>
