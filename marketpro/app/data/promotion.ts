export interface PromotionItem {
  id: number;
  title: string;
  subtitle: string;
  link: string;
  backgroundImg: string;
  productImg: string;
  badgeText: string;
  badgeHighlight?: string;
  badgeHighlightClass?: string;
  badgeClass?: string;
  aosDuration: number;
}

export const promotionalBanners: PromotionItem[] = [
  {
    id: 1,
    title: "iPhone 15 Pro Max",
    subtitle: "Latest Deal",
    link: "/shop",
    backgroundImg: "/images/bg/promo-bg-img1.png",
    productImg: "/images/thumbs/promo-img1.png",
    badgeText: "Latest Deal",
    badgeClass: "text-main-600",
    aosDuration: 600,
  },
  {
    id: 2,
    title: "Instax Mini 11 Camera",
    subtitle: "Get",
    badgeText: "Off",
    badgeHighlight: "60%",
    badgeHighlightClass: "text-info",
    link: "/shop",
    backgroundImg: "/images/bg/promo-bg-img2.png",
    productImg: "/images/thumbs/promo-img2.png",
    badgeClass: "text-heading",
    aosDuration: 800,
  },
  {
    id: 3,
    title: "Airpod Headphone",
    subtitle: "Start From",
    badgeText: "",
    badgeHighlight: "$250",
    badgeHighlightClass: "text-main-600",
    badgeClass: "text-heading",
    link: "/shop",
    backgroundImg: "/images/bg/promo-bg-img3.png",
    productImg: "/images/thumbs/promo-img3.png",
    aosDuration: 1000,
  },
];
