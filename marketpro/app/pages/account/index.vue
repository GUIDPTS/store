<template>
  <div>
    <Breadcrumb title="我的账户" />
    <section class="account py-80">
      <div class="container container-lg">
        <div class="row gy-4">
          <div class="col-lg-3">
            <AccountSidebar />
          </div>
          <div class="col-lg-9">
            <div class="border border-gray-100 rounded-8 p-32 text-center">
              <i class="ph ph-user-circle text-main-600" style="font-size: 4rem"></i>
              <h5 class="mt-16 mb-8">{{ auth.user?.username }}</h5>
              <p class="text-gray-500 mb-0">欢迎回来！</p>
              <NuxtLink to="/account/orders" class="btn btn-main mt-24 px-40 rounded-8"
                >查看我的订单</NuxtLink
              >
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
import { useAuthStore } from "~/stores/auth";

definePageMeta({ layout: "layout-three" });
const auth = useAuthStore();
</script>
