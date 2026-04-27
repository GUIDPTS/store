export interface DiscountItem {
  label: string;
  labelClass: string;
  title: string;
  textClass: string;
  image: string;
  bgImage: string;
  link: string;
  buttonClass: string;
}

export const discountItems: DiscountItem[] = [
  {
    label: "UP TO 30% OFF",
    labelClass: "text-tertiary-600",
    title: '57" Odyssey Neo G9 Dual 4K UHD Quantum Mini-LED',
    textClass: "",
    image: "/images/thumbs/discount-img1.png",
    bgImage: "/images/bg/discount-bg1.jpg",
    link: "/shop",
    buttonClass:
      "text-heading border-white bg-white hover-bg-main-600 hover-border-main-two-600 hover-text-white",
  },
  {
    label: "UP TO 30% OFF",
    labelClass: "text-yellow",
    title: '57" Odyssey Neo G9 Dual 4K UHD Quantum Mini-LED',
    textClass: "text-white",
    image: "/images/thumbs/discount-img2.png",
    bgImage: "/images/bg/discount-bg2.jpg",
    link: "/shop",
    buttonClass:
      "text-heading border-white bg-white hover-bg-main-800 hover-border-main-two-800 hover-text-white",
  },
];
