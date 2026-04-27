export interface BannerItem {
  subtitle: string;
  titleBefore: string;
  titleHighlight: string;
  titleAfter: string;
  price: string;
  thumb: string;
  link: string;
}

export const bannerItems: BannerItem[] = [
  {
    subtitle: "Save up to 50% off on your first order",
    titleBefore: "Daily Grocery Order and Get ",
    titleHighlight: "Express",
    titleAfter: " Delivery",
    price: "$60.99",
    thumb: "/images/thumbs/banner-img3.png",
    link: "/shop",
  },
  {
    subtitle: "Save up to 50% off on your first order",
    titleBefore: "Get Your ",
    titleHighlight: "Weekly",
    titleAfter: " Groceries Delivered Fast",
    price: "$45.50",
    thumb: "/images/thumbs/banner-img1.png",
    link: "/shop",
  },
];
