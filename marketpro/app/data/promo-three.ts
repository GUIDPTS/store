export interface PromoItem {
  id: number;
  backgroundImage: string;
  spanText: string;
  heading: string;
  highlight: string;
  subText: string;
  link: string;
  wowDelay?: string;
}

export const promoItems: PromoItem[] = [
  {
    id: 1,
    backgroundImage: "/images/thumbs/promo-three-img-1.png",
    spanText: "Free Shipping Over Order $150",
    heading: "Woman",
    highlight: "Spring",
    subText: "Collection",
    link: "/shop",
    wowDelay: ".5s",
  },
  {
    id: 2,
    backgroundImage: "/images/thumbs/promo-three-img-2.png",
    spanText: "Men Fashion Discover",
    heading: "New",
    highlight: "Style",
    subText: "Sale 35% Off",
    link: "/shop",
    wowDelay: ".7s",
  },
];
