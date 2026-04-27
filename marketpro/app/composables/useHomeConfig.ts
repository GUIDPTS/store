import { computed } from "vue";
import { useSiteStore } from "~/stores/site";

export interface HomeBanner {
  subtitle: string;
  title: string;
  btn_text: string;
  btn_link: string;
  image: string;
}

export interface HomePromoBanner {
  title: string;
  btn_text: string;
  btn_link: string;
  image: string;
}

export interface HomeFlashBanner {
  title: string;
  subtitle: string;
  btn_text: string;
  btn_link: string;
  bg_image: string;
}

export interface HomeOfferCard {
  title: string;
  tag1: string;
  tag2: string;
  btn_text: string;
  btn_link: string;
  bg_image: string;
  logo: string;
}

export interface HomeBestsellCTA {
  title: string;
  tag1: string;
  tag2: string;
  btn_text: string;
  btn_link: string;
  bg_image: string;
  logo: string;
}

function safeParse<T>(val: unknown, fallback: T): T {
  if (!val || typeof val !== "string") return fallback;
  try {
    return JSON.parse(val) as T;
  } catch {
    return fallback;
  }
}

const DEFAULT_BANNERS: HomeBanner[] = [
  {
    subtitle: "官方认证 · 安全可靠",
    title: "正版软件 · 游戏充值 · 卡密发货",
    btn_text: "浏览商品",
    btn_link: "/shop",
    image: "/images/thumbs/banner-img3.png",
  },
  {
    subtitle: "海量商品 · 优质商家",
    title: "一站式购物 · 极速发卡",
    btn_text: "申请开店",
    btn_link: "/vendor",
    image: "/images/thumbs/banner-img1.png",
  },
];

const DEFAULT_PROMO: HomePromoBanner[] = [
  {
    title: "官方正版授权",
    btn_text: "立即选购",
    btn_link: "/shop",
    image: "/images/thumbs/promotional-banner-img1.png",
  },
  {
    title: "7×24 自动发货",
    btn_text: "立即选购",
    btn_link: "/shop",
    image: "/images/thumbs/promotional-banner-img2.png",
  },
  {
    title: "优质商家入驻",
    btn_text: "申请开店",
    btn_link: "/vendor",
    image: "/images/thumbs/promotional-banner-img3.png",
  },
  {
    title: "售后保障",
    btn_text: "我的账户",
    btn_link: "/account",
    image: "/images/thumbs/promotional-banner-img4.png",
  },
];

const DEFAULT_FLASH: HomeFlashBanner[] = [
  {
    title: "新人专享福利",
    subtitle: "注册即享首单优惠",
    btn_text: "立即注册",
    btn_link: "/auth/login",
    bg_image: "/images/bg/flash-sale-bg1.png",
  },
  {
    title: "商家入驻招募",
    subtitle: "零门槛开店，多重扶持",
    btn_text: "申请开店",
    btn_link: "/vendor",
    bg_image: "/images/bg/flash-sale-bg2.png",
  },
];

const DEFAULT_OFFER: HomeOfferCard[] = [
  {
    title: "首单立减",
    tag1: "即时发货",
    tag2: "长期有效",
    btn_text: "立即选购",
    btn_link: "/shop",
    bg_image: "/images/bg/offer-bg-img1.png",
    logo: "/images/thumbs/offer-logo.png",
  },
  {
    title: "充值返利",
    tag1: "余额充值",
    tag2: "享专属折扣",
    btn_text: "前往账户",
    btn_link: "/account",
    bg_image: "/images/bg/offer-bg-img2.png",
    logo: "/images/thumbs/offer-logo.png",
  },
];

const DEFAULT_BESTSELL_CTA: HomeBestsellCTA = {
  title: "余额充值",
  tag1: "支付便捷",
  tag2: "即时到账",
  btn_text: "前往充值",
  btn_link: "/account",
  bg_image: "/images/bg/special-snacks.png",
  logo: "/images/thumbs/offer-logo.png",
};

export function useHomeConfig() {
  const site = useSiteStore();

  const banners = computed<HomeBanner[]>(() => {
    const raw = safeParse<HomeBanner[]>(site.settings.home_banners as string, []);
    return raw.length ? raw : DEFAULT_BANNERS;
  });

  const promoBanners = computed<HomePromoBanner[]>(() => {
    const raw = safeParse<HomePromoBanner[]>(site.settings.home_promo_banners as string, []);
    return raw.length ? raw : DEFAULT_PROMO;
  });

  const flashBanners = computed<HomeFlashBanner[]>(() => {
    const raw = safeParse<HomeFlashBanner[]>(site.settings.home_flash_banners as string, []);
    return raw.length ? raw : DEFAULT_FLASH;
  });

  const offerCards = computed<HomeOfferCard[]>(() => {
    const raw = safeParse<HomeOfferCard[]>(site.settings.home_offer_cards as string, []);
    return raw.length ? raw : DEFAULT_OFFER;
  });

  const bestsellCTA = computed<HomeBestsellCTA>(() => {
    const raw = safeParse<HomeBestsellCTA>(
      site.settings.home_bestsell_cta as string,
      {} as HomeBestsellCTA
    );
    return raw.title ? raw : DEFAULT_BESTSELL_CTA;
  });

  const newsletterImg = computed<string>(
    () => (site.settings.home_newsletter_img as string) || "/images/thumbs/newsletter-img.png"
  );

  return { banners, promoBanners, flashBanners, offerCards, bestsellCTA, newsletterImg };
}
