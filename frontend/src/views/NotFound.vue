<template>
  <section class="py-80 min-h-[60vh] flex items-center">
    <div class="container container-lg">
      <div class="text-center max-w-[520px] mx-auto">
        <div class="text-main-600 text-9xl fw-bold mb-16">404</div>
        <h4 class="mb-12">页面不存在</h4>
        <p class="text-gray-500 mb-24">您访问的页面已被移除、地址错误或暂时不可用。</p>
        <router-link :to="{ name: 'home' }" class="btn btn-main rounded-pill py-12 px-32 inline-flex items-center gap-8">
          <i class="ph ph-house"></i> 返回首页
        </router-link>
      </div>
    </div>
  </section>
</template>
