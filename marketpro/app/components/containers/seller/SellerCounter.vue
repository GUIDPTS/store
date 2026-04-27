<template>
  <section class="counter counter-alt" data-aos="fade-up" data-aos-duration="600">
    <div class="container container-lg">
      <div class="row justify-content-center">
        <div class="col-xxl-11">
          <div class="bg-neutral-600 rounded-16 px-xxl-5 px-xl-4">
            <div class="row gy-lg-0 gy-4 line-wrapper">
              <div class="col-lg-3 col-sm-6 col-xs-6">
                <div class="counter-item text-center py-100 px-8">
                  <h3 class="text-main-600 counter mb-8 fw-semibold">
                    <ClientOnly>
                      <AnimatedCounter :value="185" :duration="1000" />
                    </ClientOnly>
                    +
                  </h3>
                  <p class="text-white text-xl font-heading-two fw-semibold">
                    Store around the world
                  </p>
                </div>
              </div>
              <div class="col-lg-3 col-sm-6 col-xs-6">
                <div class="counter-item text-center py-100 px-8">
                  <h3 class="text-main-600 counter mb-8 fw-semibold">
                    <ClientOnly> <AnimatedCounter :value="152" :duration="1000" /> </ClientOnly>K
                  </h3>
                  <p class="text-white text-xl font-heading-two fw-semibold">Product Sold</p>
                </div>
              </div>
              <div class="col-lg-3 col-sm-6 col-xs-6">
                <div class="counter-item text-center py-100 px-8">
                  <h3 class="text-main-600 counter mb-8 fw-semibold">
                    <ClientOnly> <AnimatedCounter :value="15" :duration="1000" /> </ClientOnly>K+
                  </h3>
                  <p class="text-white text-xl font-heading-two fw-semibold">Registered Users</p>
                </div>
              </div>
              <div class="col-lg-3 col-sm-6 col-xs-6">
                <div class="counter-item text-center py-100 px-8">
                  <h3 class="text-main-600 counter mb-8 fw-semibold">
                    <ClientOnly> <AnimatedCounter :value="2" :duration="1000" /> </ClientOnly>K+
                  </h3>
                  <p class="text-white text-xl font-heading-two fw-semibold">
                    Top Brands Available in store
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
