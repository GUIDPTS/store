export interface Category {
  id: number;
  name: string;
  count: number;
  href: string;
}

export interface BestSellProduct {
  id: number;
  name: string;
  href: string;
  imgSrc: string;
  rating: number;
  ratingCount: string;
  price: string;
}

export const categories: Category[] = [
  { id: 1, name: "Mobile & Accessories", count: 12, href: "/product-details-two" },
  { id: 2, name: "Laptop", count: 12, href: "/product-details-two" },
  { id: 3, name: "Electronics", count: 12, href: "/product-details-two" },
  { id: 4, name: "Smart Watch", count: 12, href: "/product-details-two" },
  { id: 5, name: "Storage", count: 12, href: "/product-details-two" },
  { id: 6, name: "Portable Devices", count: 12, href: "/product-details-two" },
  { id: 7, name: "Action Camera", count: 12, href: "/product-details-two" },
  { id: 8, name: "Smart Gadget", count: 12, href: "/product-details-two" },
  { id: 9, name: "Monitor", count: 12, href: "/product-details-two" },
  { id: 10, name: "Smart TV", count: 12, href: "/product-details-two" },
  { id: 11, name: "Camera", count: 12, href: "/product-details-two" },
  { id: 12, name: "Monitor Stand", count: 12, href: "/product-details-two" },
  { id: 13, name: "Headphone", count: 12, href: "/product-details-two" },
];

export const bestSellProducts: BestSellProduct[] = [
  {
    id: 1,
    name: "Man Fashion Shoe",
    href: "/product-details-two",
    imgSrc: "/images/thumbs/best-selling-img1.png",
    rating: 4.8,
    ratingCount: "12K",
    price: "$25",
  },
  {
    id: 2,
    name: "Woman Fashion Bag",
    href: "/product-details-two",
    imgSrc: "/images/thumbs/best-selling-img2.png",
    rating: 4.8,
    ratingCount: "12K",
    price: "$25",
  },
  {
    id: 3,
    name: "Woman Fashion Tops",
    href: "/product-details-two",
    imgSrc: "/images/thumbs/best-selling-img3.png",
    rating: 4.8,
    ratingCount: "12K",
    price: "$25",
  },
  {
    id: 4,
    name: "Woman Fashion Hat",
    href: "/product-details-two",
    imgSrc: "/images/thumbs/best-selling-img4.png",
    rating: 4.8,
    ratingCount: "12K",
    price: "$25",
  },
  {
    id: 5,
    name: "Woman Fashion",
    href: "/product-details-two",
    imgSrc: "/images/thumbs/best-selling-img5.png",
    rating: 4.8,
    ratingCount: "12K",
    price: "$25",
  },
  {
    id: 6,
    name: "Woman Fashion Bag",
    href: "/product-details-two",
    imgSrc: "/images/thumbs/best-selling-img6.png",
    rating: 4.8,
    ratingCount: "12K",
    price: "$25",
  },
];
