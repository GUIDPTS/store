<template>
  <div>
  <div class="banner">
    <div class="container container-lg">
      <div class="banner-item rounded-24 overflow-hidden position-relative arrow-center">
        <a href="#featureSection" class="scroll-down w-84 h-84 text-center flex-center bg-main-600 rounded-circle border border-5 text-white border-white position-absolute start-50 translate-middle-x bottom-0 hover-bg-main-800">
          <span class="icon line-height-0"><i class="ph ph-caret-double-down"></i></span>
        </a>
        <img src="/marketpro/images/bg/banner-bg.png" alt="" class="banner-img position-absolute inset-block-start-0 inset-inline-start-0 w-100 h-100 z-n1 object-fit-cover rounded-24">
        <div class="flex-align">
          <button type="button" id="banner-prev" class="slick-prev slick-arrow flex-center rounded-circle box-shadow-4xl bg-white text-xl hover-bg-main-600 hover-text-white transition-1"><i class="ph ph-caret-left"></i></button>
          <button type="button" id="banner-next" class="slick-next slick-arrow flex-center rounded-circle box-shadow-4xl bg-white text-xl hover-bg-main-600 hover-text-white transition-1"><i class="ph ph-caret-right"></i></button>
        </div>
        <div class="swiper banner-swiper">
          <div class="swiper-wrapper">
            <div v-for="(slide, i) in banners" :key="i" class="swiper-slide banner-slider__item">
              <div class="banner-slider__inner flex-between position-relative">
                <div class="banner-item__content">
                  <span class="fw-semibold text-success-600 text-capitalize mb-8">{{ slide.subtitle }}</span>
                  <h2 class="banner-item__title max-w-700 mb-30">{{ slide.title }}</h2>
                  <router-link :to="slide.btn_link_internal || '/shops'" class="btn btn-main d-inline-flex align-items-center rounded-pill gap-8">
                    <span>{{ slide.btn_text }}</span> <span class="icon text-xl d-flex"><i class="ph ph-arrow-right"></i></span>
                  </router-link>
                </div>
                <div class="banner-item__thumb">
                  <img :src="slide.image" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ======================== Feature Categories ======================== -->
  <div class="feature" id="featureSection">
    <div class="container container-lg">
      <div class="position-relative arrow-center gradient-shadow">
        <button type="button" @click="scrollGrid('.feature-item-grid', -400)" class="slick-prev slick-arrow flex-center rounded-circle bg-white text-xl hover-bg-main-600 hover-text-white transition-1"><i class="ph ph-caret-left"></i></button>
        <button type="button" @click="scrollGrid('.feature-item-grid', 400)" class="slick-next slick-arrow flex-center rounded-circle bg-white text-xl hover-bg-main-600 hover-text-white transition-1"><i class="ph ph-caret-right"></i></button>
        <div class="feature-scroll-wrap">
          <div class="feature-item-grid">
            <div v-for="(cat, i) in categories" :key="cat.id" class="feature-item text-center">
              <div class="feature-item__thumb rounded-circle">
                <router-link :to="`/category/${cat.id}`" class="w-100 h-100 flex-center">
                  <img :src="`/marketpro/images/thumbs/feature-img${(i % 10) + 1}.png`" alt="">
                </router-link>
              </div>
              <div class="feature-item__content mt-16">
                <h6 class="text-lg mb-8"><router-link :to="`/category/${cat.id}`" class="text-inherit">{{ cat.name }}</router-link></h6>
                <span class="text-sm text-gray-400">{{ (cat.products || []).length }} 件商品</span>
              </div>
            </div>
            <div v-if="!categories.length" class="feature-item text-center">
              <div class="feature-item__thumb rounded-circle">
                <router-link to="/shops" class="w-100 h-100 flex-center">
                  <img src="/marketpro/images/thumbs/feature-img1.png" alt="">
                </router-link>
              </div>
              <div class="feature-item__content mt-16"><h6 class="text-lg mb-8"><router-link to="/shops" class="text-inherit">暂无分类</router-link></h6></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ======================== Promo Banners ======================== -->
  <section class="promotional-banner pt-80">
    <div class="container container-lg">
      <div class="row gy-4">
        <div v-for="(pb, idx) in promoBanners" :key="idx" class="col-xl-3 col-sm-6">
          <div class="promotional-banner-item position-relative rounded-24 overflow-hidden z-1 py-52 ps-40 pe-24 h-100">
            <img :src="pb.image" alt="" class="position-absolute inset-block-start-0 inset-inline-start-0 w-100 h-100 object-fit-cover z-n1">
            <div class="promotional-banner-item__content">
              <h6 class="promotional-banner-item__title text-2xl max-w-184">{{ pb.title }}</h6>
              <router-link :to="pb.btn_link_internal || '/shops'" class="btn btn-main d-inline-flex align-items-center rounded-pill gap-8 mt-24">
                <span>{{ pb.btn_text }}</span> <span class="icon text-xl d-flex"><i class="ph ph-arrow-right"></i></span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ======================== Flash Products ======================== -->
  <div v-if="flashProducts.length" class="product pt-60">
    <div class="container container-lg">
      <div class="section-heading">
        <div class="flex-between flex-wrap gap-8">
          <h5 class="mb-0">今日热卖</h5>
          <div class="flex-align gap-16">
            <router-link to="/shops" class="text-sm fw-medium text-gray-700 hover-text-main-600">查看全部</router-link>
            <div class="flex-align gap-8">
              <button type="button" @click="scrollGrid('.product-one-grid', -400)" class="slick-prev slick-arrow flex-center rounded-circle border border-gray-100 hover-border-main-600 text-xl hover-bg-main-600 hover-text-white transition-1"><i class="ph ph-caret-left"></i></button>
              <button type="button" @click="scrollGrid('.product-one-grid', 400)" class="slick-next slick-arrow flex-center rounded-circle border border-gray-100 hover-border-main-600 text-xl hover-bg-main-600 hover-text-white transition-1"><i class="ph ph-caret-right"></i></button>
            </div>
          </div>
        </div>
      </div>
      <div class="product-scroll-wrap">
        <div class="product-one-grid g-12">
          <div v-for="(p, i) in flashProducts" :key="p.id">
            <div class="product-card px-20 py-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
              <router-link :to="`/product/${p.id}`" class="product-card__cart btn bg-main-50 text-main-600 hover-bg-main-600 hover-text-white py-11 px-24 rounded-pill flex-align gap-8 position-absolute inset-block-start-0 inset-inline-end-0 me-16 mt-16">购买 <i class="ph ph-shopping-cart"></i></router-link>
              <router-link :to="`/product/${p.id}`" class="product-card__thumb flex-center overflow-hidden">
                <img :src="p.image || `/marketpro/images/thumbs/product-img${((i % 24) + 7)}.png`" alt="">
              </router-link>
              <div class="product-card__content mt-12">
                <div class="product-card__price mb-8 d-flex align-items-center gap-8">
                  <span class="text-heading text-md fw-semibold">{{ fmtPrice(p.price) }}</span>
                  <span v-if="p.orig_price > p.price" class="text-gray-400 text-md fw-semibold text-decoration-line-through">{{ fmtPrice(p.orig_price) }}</span>
                </div>
                <div class="flex-align gap-6 mb-8">
                  <span class="text-xs fw-bold text-gray-600">5.0</span>
                  <span class="text-15 fw-bold text-warning-600 d-flex"><i class="ph-fill ph-star"></i></span>
                  <span class="text-xs fw-bold text-gray-600">({{ p.sales_count || 0 }})</span>
                </div>
                <h6 class="title text-lg fw-semibold mt-12 mb-8">
                  <router-link :to="`/product/${p.id}`" class="link text-line-2">{{ p.name }}</router-link>
                </h6>
                <div class="mt-12">
                  <div class="progress w-100 bg-color-three rounded-pill h-4" role="progressbar">
                    <div class="progress-bar bg-main-600 rounded-pill" :style="`width:${progressPct(p)}%`"></div>
                  </div>
                  <span class="text-gray-900 text-xs fw-medium mt-8">已售: {{ p.sales_count || 0 }} / {{ (p.sales_count || 0) + (p.stock_count || 0) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ======================== Flash Banners ======================== -->
  <section class="flash-sales pt-80 overflow-hidden">
    <div class="container container-lg">
      <div class="row gy-4">
        <div v-for="(fb, idx) in flashBanners" :key="idx" class="col-lg-6">
          <div class="flash-sales-item rounded-16 overflow-hidden z-1 position-relative flex-align flex-0 justify-content-between gap-8 ps-56-px">
            <img :src="fb.bg_image" alt="" class="position-absolute inset-block-start-0 inset-inline-start-0 w-100 h-100 object-fit-cover z-n1 flash-sales-item__bg">
            <div class="flash-sales-item__content" :class="idx === 0 ? 'ms-sm-auto' : ''">
              <h6 class="text-32 mb-8">{{ fb.title }}</h6>
              <p class="text-neutral-500 mb-12">{{ fb.subtitle }}</p>
              <router-link :to="fb.btn_link_internal || '/shops'" class="btn btn-main d-inline-flex align-items-center rounded-pill gap-8 mt-24">
                <span>{{ fb.btn_text }}</span> <span class="icon text-xl d-flex"><i class="ph ph-arrow-right"></i></span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ======================== Recommended (tabs) ======================== -->
  <section v-if="recommendedCategories.length" class="recommended overflow-hidden pt-80">
    <div class="container container-lg">
      <div class="section-heading flex-between flex-wrap gap-16">
        <h5 class="mb-0">为你推荐</h5>
        <ul class="nav common-tab nav-pills" role="tablist">
          <li v-for="(cat, idx) in recommendedCategories" :key="cat.id" class="nav-item" role="presentation">
            <button class="nav-link fw-medium text-sm border border-white hover-border-main-600"
              :class="recommendedTab === idx ? 'active' : ''"
              @click="recommendedTab = idx" type="button">{{ cat.name }}</button>
          </li>
        </ul>
      </div>
      <div class="tab-content">
        <div v-for="(cat, idx) in recommendedCategories" :key="cat.id" v-show="recommendedTab === idx" class="tab-pane fade" :class="recommendedTab === idx ? 'show active' : ''">
          <div class="row g-12">
            <div v-for="(p, i) in (cat.products || []).slice(0, 12)" :key="p.id" class="col-xxl-2 col-lg-3 col-sm-4 col-6">
              <div class="product-card h-100 p-12 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2 group-item">
                <span v-if="p.orig_price > p.price" class="product-card__badge bg-danger-600 px-8 py-4 text-sm text-white">特价</span>
                <router-link :to="`/product/${p.id}`" class="product-card__thumb flex-center overflow-hidden">
                  <img :src="p.image || `/marketpro/images/thumbs/product-img${((i % 24) + 7)}.png`" alt="">
                </router-link>
                <div class="product-card__content p-sm-2 w-100">
                  <h6 class="title text-lg fw-semibold my-12"><router-link :to="`/product/${p.id}`" class="link text-line-2">{{ p.name }}</router-link></h6>
                  <div v-if="p.shop" class="flex-align gap-4 mb-8">
                    <span class="text-main-600 text-md d-flex"><i class="ph-fill ph-storefront"></i></span>
                    <span class="text-gray-500 text-xs">{{ p.shop.name }}</span>
                  </div>
                  <div class="product-card__price mb-8">
                    <span class="text-heading text-md fw-semibold">{{ fmtPrice(p.price) }}</span>
                    <span v-if="p.orig_price > p.price" class="text-gray-400 text-md fw-semibold text-decoration-line-through ms-4">{{ fmtPrice(p.orig_price) }}</span>
                  </div>
                  <div class="flex-align gap-6">
                    <span class="text-xs fw-bold text-gray-600">5.0</span>
                    <span class="text-15 fw-bold text-warning-600 d-flex"><i class="ph-fill ph-star"></i></span>
                    <span class="text-xs fw-bold text-gray-600">({{ p.sales_count || 0 }})</span>
                  </div>
                  <router-link :to="`/product/${p.id}`" class="product-card__cart btn bg-main-50 text-main-600 hover-bg-main-600 hover-text-white py-11 px-24 rounded-pill flex-align gap-8 mt-24 w-100 justify-content-center">
                    立即购买 <i class="ph ph-shopping-cart"></i>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ======================== Offer Cards ======================== -->
  <section class="offer pt-80">
    <div class="container container-lg">
      <div class="row gy-4">
        <div v-for="(oc, idx) in offerCards" :key="idx" class="col-sm-6">
          <div class="offer-card position-relative rounded-16 overflow-hidden p-16 ps-56-px">
            <img :src="oc.bg_image" alt="" class="position-absolute inset-block-start-0 inset-inline-start-0 z-n1 w-100 h-100 object-fit-cover">
            <div class="py-xl-4 max-w-392" :class="idx === 0 ? 'ms-auto' : ''">
              <div class="offer-card__logo mb-16 w-80 h-80 flex-center bg-white rounded-circle">
                <img :src="oc.logo || '/marketpro/images/thumbs/offer-logo.png'" alt="">
              </div>
              <h5 class="mb-8">{{ oc.title }}</h5>
              <div class="flex-align gap-8">
                <span class="text-sm fw-medium text-heading">{{ oc.tag1 }}</span>
                <span class="text-xs" :class="idx === 0 ? 'text-heading' : 'text-success-600'">{{ oc.tag2 }}</span>
              </div>
              <router-link :to="oc.btn_link_internal || '/shops'" class="mt-16 btn fw-medium d-inline-flex align-items-center rounded-pill gap-8"
                :class="idx === 0 ? 'bg-success-600 hover-bg-success-700 text-white' : 'bg-white hover-bg-main-800 hover-text-white text-heading'">
                <span>{{ oc.btn_text }}</span> <span class="icon text-xl d-flex"><i class="ph ph-arrow-right"></i></span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ======================== Hot Deals ======================== -->
  <section v-if="hotDeals.length" class="hot-deals pt-80 overflow-hidden">
    <div class="container container-lg">
      <div class="section-heading">
        <div class="flex-between flex-wrap gap-8">
          <h5 class="mb-0">每日特惠</h5>
          <div class="flex-align gap-16">
            <router-link to="/shops" class="text-sm fw-medium text-gray-700 hover-text-main-600 hover-text-decoration-underline">查看全部</router-link>
            <div class="flex-align gap-8">
              <button type="button" @click="scrollGrid('.hot-deals-grid', -400)" class="slick-prev slick-arrow flex-center rounded-circle border border-gray-100 hover-border-main-600 text-xl hover-bg-main-600 hover-text-white transition-1"><i class="ph ph-caret-left"></i></button>
              <button type="button" @click="scrollGrid('.hot-deals-grid', 400)" class="slick-next slick-arrow flex-center rounded-circle border border-gray-100 hover-border-main-600 text-xl hover-bg-main-600 hover-text-white transition-1"><i class="ph ph-caret-right"></i></button>
            </div>
          </div>
        </div>
      </div>
      <div class="row g-12">
        <div class="col-md-4">
          <div class="hot-deals position-relative rounded-16 bg-main-600 overflow-hidden ps-40 pe-24 pt-80 pb-120 z-1">
            <img src="/marketpro/images/shape/offer-shape.png" alt="" class="position-absolute inset-block-start-0 inset-inline-start-0 z-n1 w-100 h-100 opacity-6">
            <img src="/marketpro/images/thumbs/basket-img.png" alt="" class="position-absolute inset-inline-end-0 inset-block-end-0">
            <span class="text-primary-600 bg-yellow text-heading py-4 px-12 rounded-4 text-sm fw-medium">每日精选</span>
            <div>
              <h5 class="text-white mb-8 mt-12">今日特惠</h5>
              <p class="fw-semibold text-success-600">海量优质商品任你选</p>
              <router-link to="/shops" class="mt-16 btn bg-white hover-text-white hover-bg-main-800 text-main-600 fw-medium d-inline-flex align-items-center rounded-pill gap-8">浏览商家 <span class="icon text-xl d-flex"><i class="ph-bold ph-storefront"></i></span></router-link>
            </div>
          </div>
        </div>
        <div class="col-md-8">
          <div class="hot-deals-scroll-wrap">
            <div class="hot-deals-grid">
              <div v-for="(p, i) in hotDeals" :key="p.id">
                <div class="product-card px-20 pt-16 pb-40 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                  <router-link :to="`/product/${p.id}`" class="product-card__cart btn bg-main-50 text-main-600 hover-bg-main-600 hover-text-white py-11 px-24 rounded-pill flex-align gap-8 position-absolute inset-block-start-0 inset-inline-end-0 me-16 mt-16">购买 <i class="ph ph-shopping-cart"></i></router-link>
                  <router-link :to="`/product/${p.id}`" class="product-card__thumb flex-center overflow-hidden">
                    <img :src="p.image || `/marketpro/images/thumbs/product-img${((i % 24) + 7)}.png`" alt="">
                  </router-link>
                  <div class="product-card__content mt-12">
                    <div class="product-card__price mb-8 d-flex align-items-center gap-8">
                      <span class="text-heading text-md fw-semibold">{{ fmtPrice(p.price) }}</span>
                      <span v-if="p.orig_price > p.price" class="text-gray-400 text-md fw-semibold text-decoration-line-through">{{ fmtPrice(p.orig_price) }}</span>
                    </div>
                    <div class="flex-align gap-6">
                      <span class="text-xs fw-bold text-gray-600">5.0</span>
                      <span class="text-15 fw-bold text-warning-600 d-flex"><i class="ph-fill ph-star"></i></span>
                      <span class="text-xs fw-bold text-gray-600">({{ p.sales_count || 0 }})</span>
                    </div>
                    <h6 class="title text-lg fw-semibold mt-12 mb-20"><router-link :to="`/product/${p.id}`" class="link text-line-2">{{ p.name }}</router-link></h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ======================== Discount Strip ======================== -->
  <div class="pt-80">
    <div class="container container-lg">
      <div class="border border-main-500 bg-main-50 border-dashed rounded-8 py-20 d-flex align-items-center justify-content-evenly flex-wrap gap-16">
        <p class="h6 text-main-600 fw-normal mb-0">新人专享 <a href="/auth/login" class="fw-bold text-decoration-underline text-main-600">注册即享优惠</a></p>
        <router-link to="/shop-apply" class="px-32 py-10 text-white text-uppercase bg-main-600 rounded-pill hover-bg-main-800 d-inline-flex align-items-center gap-8" style="text-decoration:none;">申请开店 <i class="ph ph-storefront text-lg"></i></router-link>
        <p class="text-md text-main-600 fw-normal mb-0">商家入驻 <span class="fw-bold text-main-600">享多重扶持</span></p>
      </div>
    </div>
  </div>

  <!-- ======================== Brands / Shops ======================== -->
  <div v-if="shops.length" class="brand py-80 overflow-hidden">
    <div class="container container-lg">
      <div class="brand-inner p-24 rounded-16">
        <div class="section-heading">
          <div class="flex-between flex-wrap gap-8">
            <h5 class="mb-0">优质商家</h5>
            <div class="flex-align gap-16">
              <router-link to="/shops" class="text-sm fw-medium text-gray-700 hover-text-main-600 hover-text-decoration-underline">全部商家</router-link>
              <div class="flex-align gap-8">
                <button type="button" @click="scrollGrid('.brand-grid', -400)" class="slick-prev slick-arrow flex-center rounded-circle border border-gray-100 hover-border-main-600 text-xl hover-bg-main-600 hover-text-white transition-1"><i class="ph ph-caret-left"></i></button>
                <button type="button" @click="scrollGrid('.brand-grid', 400)" class="slick-next slick-arrow flex-center rounded-circle border border-gray-100 hover-border-main-600 text-xl hover-bg-main-600 hover-text-white transition-1"><i class="ph ph-caret-right"></i></button>
              </div>
            </div>
          </div>
        </div>
        <div class="brand-scroll-wrap">
          <div class="brand-grid">
            <div v-for="(shop, i) in shops" :key="shop.id" class="brand-item">
              <router-link :to="`/shop/${shop.id}`" class="d-flex flex-column align-items-center text-center p-16 hover-text-main-600" style="text-decoration:none;">
                <img :src="shop.logo || `/marketpro/images/thumbs/brand-img${(i % 8) + 1}.png`" :alt="shop.name" style="max-height:80px;object-fit:contain;">
                <span class="mt-8 text-sm fw-medium text-heading text-line-1">{{ shop.name }}</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ======================== Best Sells ======================== -->
  <section v-if="bestSells.length" class="best sells pb-80">
    <div class="container container-lg">
      <div class="section-heading"><div class="flex-between flex-wrap gap-8"><h5 class="mb-0">每日精选</h5></div></div>
      <div class="row g-12">
        <div class="col-xxl-8">
          <div class="row gy-4">
            <div v-for="(p, i) in bestSells" :key="p.id" class="col-md-6">
              <div class="product-card style-two h-100 p-8 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2 flex-align gap-16">
                <div>
                  <span v-if="p.orig_price > p.price" class="product-card__badge bg-danger-600 px-8 py-4 text-sm text-white">特价</span>
                  <router-link :to="`/product/${p.id}`" class="product-card__thumb flex-center overflow-hidden">
                    <img :src="p.image || `/marketpro/images/thumbs/best-sell${(i % 4) + 1}.png`" alt="">
                  </router-link>
                </div>
                <div class="product-card__content">
                  <div class="product-card__price mb-16">
                    <span v-if="p.orig_price > p.price" class="text-gray-400 text-md fw-semibold text-decoration-line-through me-4">{{ fmtPrice(p.orig_price) }}</span>
                    <span class="text-heading text-md fw-semibold">{{ fmtPrice(p.price) }}</span>
                  </div>
                  <div class="flex-align gap-6">
                    <span class="text-xs fw-bold text-gray-600">5.0</span>
                    <span class="text-15 fw-bold text-warning-600 d-flex"><i class="ph-fill ph-star"></i></span>
                    <span class="text-xs fw-bold text-gray-600">({{ p.sales_count || 0 }})</span>
                  </div>
                  <h6 class="title text-lg fw-semibold mt-12 mb-8"><router-link :to="`/product/${p.id}`" class="link text-line-2">{{ p.name }}</router-link></h6>
                  <div v-if="p.shop" class="flex-align gap-4">
                    <span class="text-main-600 text-md d-flex"><i class="ph-fill ph-storefront"></i></span>
                    <span class="text-gray-500 text-xs">{{ p.shop.name }}</span>
                  </div>
                  <router-link :to="`/product/${p.id}`" class="product-card__cart btn bg-main-50 text-main-600 hover-bg-main-600 hover-text-white py-11 px-24 rounded-pill flex-align gap-8 mt-24 w-100 justify-content-center">立即购买 <i class="ph ph-shopping-cart"></i></router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xxl-4">
          <div class="offer-card position-relative rounded-16 overflow-hidden p-16 ps-56-px">
            <img src="/marketpro/images/bg/special-snacks.png" alt="" class="position-absolute inset-block-start-0 inset-inline-start-0 z-n1 w-100 h-100 object-fit-cover">
            <div class="py-xl-4 max-w-392">
              <div class="offer-card__logo mb-16 w-80 h-80 flex-center bg-white rounded-circle"><img src="/marketpro/images/thumbs/offer-logo.png" alt=""></div>
              <h5 class="mb-8">余额充值</h5>
              <div class="flex-align gap-8"><span class="text-sm fw-medium text-heading">支付便捷</span><span class="text-xs text-success-600">即时到账</span></div>
              <router-link to="/account/balance" class="mt-16 btn bg-white hover-bg-main-800 hover-text-white text-heading fw-medium d-inline-flex align-items-center rounded-pill gap-8">前往充值 <span class="icon text-xl d-flex"><i class="ph ph-arrow-right"></i></span></router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useSiteStore } from '@/stores/site'
import api from '@/utils/api'

const site = useSiteStore()
const categories = computed(() => site.categories || [])
const shops = ref([])
const recommendedTab = ref(0)

const DEFAULT_BANNERS = [
  { subtitle: '官方认证 · 安全可靠', title: '正版软件 · 游戏充值 · 卡密发货', btn_text: '浏览商家', btn_link_internal: '/shops', image: '/marketpro/images/thumbs/banner-img3.png' },
  { subtitle: '海量商品 · 优质商家', title: '一站式购物 · 极速发卡', btn_text: '申请开店', btn_link_internal: '/shop-apply', image: '/marketpro/images/thumbs/banner-img1.png' },
]
const DEFAULT_PROMO = [
  { title: '官方正版授权', btn_text: '立即选购', btn_link_internal: '/shops', image: '/marketpro/images/thumbs/promotional-banner-img1.png' },
  { title: '7×24 自动发货', btn_text: '立即选购', btn_link_internal: '/shops', image: '/marketpro/images/thumbs/promotional-banner-img2.png' },
  { title: '优质商家入驻', btn_text: '申请开店', btn_link_internal: '/shop-apply', image: '/marketpro/images/thumbs/promotional-banner-img3.png' },
  { title: '售后保障', btn_text: '我的账户', btn_link_internal: '/account', image: '/marketpro/images/thumbs/promotional-banner-img4.png' },
]
const DEFAULT_FLASH = [
  { title: '新人专享福利', subtitle: '注册即享首单优惠', btn_text: '立即注册', btn_link_internal: '/shop-apply', bg_image: '/marketpro/images/bg/flash-sale-bg1.png' },
  { title: '商家入驻招募', subtitle: '零门槛开店，多重扶持', btn_text: '申请开店', btn_link_internal: '/shop-apply', bg_image: '/marketpro/images/bg/flash-sale-bg2.png' },
]
const DEFAULT_OFFER = [
  { title: '首单立减', tag1: '即时发货', tag2: '长期有效', btn_text: '立即选购', btn_link_internal: '/shops', bg_image: '/marketpro/images/bg/promo-bg-img1.png', logo: '/marketpro/images/thumbs/offer-logo.png' },
  { title: '充值返利', tag1: '余额充值', tag2: '享专属折扣', btn_text: '前往充值', btn_link_internal: '/account/balance', bg_image: '/marketpro/images/bg/promo-bg-img2.png', logo: '/marketpro/images/thumbs/offer-logo.png' },
]

function tryJson(s, fallback) { try { const v = JSON.parse(s || ''); if (v && v.length) return v } catch (_) {}; return fallback }

const banners = computed(() => tryJson(site.settings.home_banners, DEFAULT_BANNERS))
const promoBanners = computed(() => tryJson(site.settings.home_promo_banners, DEFAULT_PROMO))
const flashBanners = computed(() => tryJson(site.settings.home_flash_banners, DEFAULT_FLASH))
const offerCards = computed(() => tryJson(site.settings.home_offer_cards, DEFAULT_OFFER))

const recommendedCategories = computed(() => categories.value.filter(c => c.products && c.products.length > 0).slice(0, 7))
const flashProducts = computed(() => recommendedCategories.value.flatMap(c => c.products || []).slice(0, 8))
const hotDeals = computed(() => {
  const all = recommendedCategories.value.flatMap(c => c.products || [])
  const s = all.slice(8, 16); return s.length ? s : all.slice(0, 8)
})
const bestSells = computed(() => recommendedCategories.value.flatMap(c => c.products || []).slice(0, 4))

function fmtPrice(n) { return '¥' + Number(n || 0).toFixed(2) }
function progressPct(p) {
  const total = (p.sales_count || 0) + (p.stock_count || 0)
  return total ? Math.min(100, Math.round((p.sales_count || 0) * 100 / total)) : 0
}
function scrollGrid(sel, delta) {
  const el = document.querySelector(sel)
  if (el) el.scrollBy({ left: delta, behavior: 'smooth' })
}

const isMounted = ref(false)

onMounted(async () => {
  isMounted.value = true
  await site.ensureLoaded()
  if (!isMounted.value) return
  if (window.Swiper) {
    window._bannerSwiper = new window.Swiper('.banner-swiper', {
      effect: 'fade',
      fadeEffect: { crossFade: true },
      autoplay: { delay: 4000, disableOnInteraction: false },
      speed: 1000,
      loop: true,
      navigation: { nextEl: '#banner-next', prevEl: '#banner-prev' },
    })
  }
  try {
    const res = await api.get('/api/shops?page_size=8')
    if (!isMounted.value) return
    shops.value = res.data.data || []
  } catch (_) { shops.value = [] }
})

onUnmounted(() => {
  isMounted.value = false
  if (window._bannerSwiper) {
    try { window._bannerSwiper.destroy(true, true) } catch (_) {}
    window._bannerSwiper = null
  }
})
</script>
