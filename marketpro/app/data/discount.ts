export interface DiscountItem {
  id: number;
  backgroundImage: string;
  badgeText: string;
  title: string;
  discountText: string;
  link: string;
}

export const discountItems: DiscountItem[] = [
  {
    id: 1,
    backgroundImage: "/images/thumbs/discount-three-img1.png",
    badgeText: "35% off the all order",
    title: "Spring Collection",
    discountText: "35% off the all order",
    link: "/shop",
  },
  {
    id: 2,
    backgroundImage: "/images/thumbs/discount-three-img2.png",
    badgeText: "35% off the all order",
    title: "Spring Collection",
    discountText: "35% off the all order",
    link: "/shop",
  },
  {
    id: 3,
    backgroundImage: "/images/thumbs/discount-three-img3.png",
    badgeText: "Get 25% off the all order",
    title: "Black Friday",
    discountText: "Get 25% off the all order",
    link: "/shop",
  },
];
