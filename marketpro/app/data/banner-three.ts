export interface BannerSlide {
  id: number;
  discountText: string;
  heading: string;
  highlightedText: string;
  description: string;
  imageSrc: string;
  shopLink: string;
}

export const bannerSlides: BannerSlide[] = [
  {
    id: 1,
    discountText: "UP TO 50% OFF",
    heading: "New",
    highlightedText: "Style",
    description: "You appear ordinary if you dress simply. We are able to help you.",
    imageSrc: "/images/thumbs/banner-three-img1.png",
    shopLink: "/shop",
  },
  {
    id: 2,
    discountText: "UP TO 50% OFF",
    heading: "New",
    highlightedText: "Style",
    description: "You appear ordinary if you dress simply. We are able to help you.",
    imageSrc: "/images/thumbs/banner-three-img2.png",
    shopLink: "/shop",
  },
  {
    id: 3,
    discountText: "UP TO 50% OFF",
    heading: "New",
    highlightedText: "Style",
    description: "You appear ordinary if you dress simply. We are able to help you.",
    imageSrc: "/images/thumbs/banner-three-img3.png",
    shopLink: "/shop",
  },
];
