export interface PromotionalItem {
  id: number;
  title: string;
  price?: string;
  imgSrc: string;
}

export const promotionalItems: PromotionalItem[] = [
  {
    id: 1,
    title: "Everyday Fresh Meat",
    price: "$60.99",
    imgSrc: "/images/thumbs/promotional-banner-img1.png",
  },
  {
    id: 2,
    title: "Daily Fresh Vegetables",
    price: "$60.99",
    imgSrc: "/images/thumbs/promotional-banner-img2.png",
  },
  {
    id: 3,
    title: "Everyday Fresh Milk",
    price: "$60.99",
    imgSrc: "/images/thumbs/promotional-banner-img3.png",
  },
  {
    id: 4,
    title: "Everyday Fresh Fruits",
    imgSrc: "/images/thumbs/promotional-banner-img4.png",
  },
];
