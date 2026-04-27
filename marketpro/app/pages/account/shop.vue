<template>
  <div>
    <Breadcrumb title="我的店铺" />
    <section class="account py-80">
      <div class="container container-lg">
        <div class="row gy-4">
          <div class="col-lg-3">
            <AccountSidebar />
          </div>
          <div class="col-lg-9">
            <div v-if="loading" class="text-center py-48 text-gray-400">加载中...</div>

            <!-- No shop -->
            <div v-else-if="!shop" class="border border-gray-100 rounded-8 p-48 text-center">
              <i class="ph ph-storefront text-gray-300" style="font-size: 4rem"></i>
              <h6 class="mt-16 mb-8 text-gray-600">您还没有店铺</h6>
              <NuxtLink to="/become-seller" class="btn btn-main mt-16 px-40 rounded-8"
                >申请开店</NuxtLink
              >
            </div>

            <!-- Shop info -->
            <div v-else>
              <div class="border border-gray-100 rounded-8 p-32 mb-32">
                <div class="d-flex align-items-center gap-24 mb-24">
                  <NuxtImg
                    v-if="shop.logo"
                    :src="shop.logo"
                    class="rounded-circle"
                    style="width: 72px; height: 72px; object-fit: cover"
                    alt="店铺头像"
                  />
                  <div>
                    <h5 class="mb-4">{{ shop.name }}</h5>
                    <span v-if="shop.is_official" class="badge bg-main-100 text-main-600"
                      >官方认证</span
                    >
                    <span class="ms-8 text-gray-500 text-sm">{{
                      shop.status === "active" ? "运营中" : shop.status
                    }}</span>
                  </div>
                </div>
                <form @submit.prevent="saveShop">
                  <div class="row gy-3">
                    <div class="col-12">
                      <label class="form-label fw-medium">店铺名称</label>
                      <input
                        v-model="editName"
                        type="text"
                        class="form-control py-12 px-16 border border-gray-200 rounded-8"
                      />
                    </div>
                    <div class="col-12">
                      <label class="form-label fw-medium">联系方式</label>
                      <input
                        v-model="editContact"
                        type="text"
                        class="form-control py-12 px-16 border border-gray-200 rounded-8"
                      />
                    </div>
                    <div class="col-12">
                      <label class="form-label fw-medium">店铺简介</label>
                      <textarea
                        v-model="editDescription"
                        class="form-control py-12 px-16 border border-gray-200 rounded-8"
                        rows="3"
                      ></textarea>
                    </div>
                    <div class="col-12">
                      <div
                        v-if="saveMsg"
                        :class="saveOk ? 'text-success-600' : 'text-danger-600'"
                        class="mb-8 text-sm"
                      >
                        {{ saveMsg }}
                      </div>
                      <button type="submit" class="btn btn-main px-32 rounded-8" :disabled="saving">
                        {{ saving ? "保存中..." : "保存修改" }}
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              <div class="border border-gray-100 rounded-8 p-24">
                <h6 class="mb-20">店铺商品 ({{ products.length }})</h6>
                <div v-if="products.length === 0" class="text-center text-gray-400 py-16">
                  暂无商品
                </div>
                <div v-else class="row gy-3">
                  <div v-for="p in products" :key="p.id" class="col-sm-6">
                    <div
                      class="border border-gray-100 rounded-8 p-16 d-flex align-items-center gap-12"
                    >
                      <NuxtImg
                        v-if="p.image"
                        :src="p.image"
                        class="rounded-4"
                        style="width: 48px; height: 48px; object-fit: cover"
                        :alt="p.name"
                      />
                      <div class="flex-grow-1 overflow-hidden">
                        <div class="fw-semibold text-sm text-line-1">{{ p.name }}</div>
                        <div class="text-main-600 text-sm">¥{{ p.price }}</div>
                      </div>
                      <NuxtLink
                        :to="`/product/${p.id}`"
                        class="btn btn-outline-main btn-sm rounded-8"
                        >查看</NuxtLink
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from "~/components/layout/banner/Breadcrumb.vue";
import AccountSidebar from "~/components/containers/account/AccountSidebar.vue";

definePageMeta({ layout: "layout-three" });

const shop = ref<any>(null);
const products = ref<any[]>([]);
const loading = ref(true);
const saving = ref(false);
const saveMsg = ref("");
const saveOk = ref(false);
const editName = ref("");
const editContact = ref("");
const editDescription = ref("");

onMounted(async () => {
  try {
    shop.value = await $fetch<any>("/api/shop/me", { credentials: "include" });
    editName.value = shop.value?.name || "";
    editContact.value = shop.value?.contact || "";
    editDescription.value = shop.value?.description || "";
    products.value = await $fetch<any[]>("/api/shop/me/products", { credentials: "include" });
  } catch {
    shop.value = null;
  } finally {
    loading.value = false;
  }
});

async function saveShop() {
  saving.value = true;
  saveMsg.value = "";
  try {
    await $fetch("/api/shop/me", {
      method: "PUT",
      credentials: "include",
      body: {
        name: editName.value,
        contact: editContact.value,
        description: editDescription.value,
      },
    });
    shop.value.name = editName.value;
    shop.value.contact = editContact.value;
    shop.value.description = editDescription.value;
    saveMsg.value = "保存成功";
    saveOk.value = true;
  } catch (e: any) {
    saveMsg.value = e?.data?.error || "保存失败";
    saveOk.value = false;
  } finally {
    saving.value = false;
  }
}
</script>
