export interface Product {
  id: number;
  title: string;
  discountPercent?: number;
  oldPrice?: number;
  price: number;
  sold: string;
  totalStock: number;
  rating: number;
  ratingCount: string;
  seller: string;
  image: string;
  badge?: string;
  href: string;
  shopHref: string;
  isFeatured?: boolean;
}

export const topSellingProducts: Product[] = [
  {
    id: 1,
    title: "Polaroid Now+ Gen 2 - White",
    discountPercent: 35,
    price: 14.99,
    oldPrice: 28.99,
    sold: "18",
    totalStock: 35,
    rating: 4.8,
    ratingCount: "17k",
    seller: "Lucky Supermarket",
    image: "/images/thumbs/deal-img.png",
    href: "/shop",
    shopHref: "/shop",
  },
  {
    id: 2,
    title: "Taylor Farms Broccoli Florets Pack",
    discountPercent: 30,
    price: 15.49,
    oldPrice: 29.99,
    sold: "20",
    totalStock: 40,
    rating: 4.7,
    ratingCount: "12k",
    seller: "Lucky Supermarket",
    image: "/images/thumbs/product-two-img10.png",
    href: "/product-details-two",
    shopHref: "/cart",
  },
  {
    id: 3,
    title: "Organic Baby Spinach Bundle",
    discountPercent: 25,
    price: 12.99,
    oldPrice: 24.99,
    sold: "15",
    totalStock: 35,
    rating: 4.6,
    ratingCount: "9k",
    seller: "Lucky Supermarket",
    image: "/images/thumbs/product-two-img8.png",
    badge: "Best Sale",
    href: "/product-details-two",
    shopHref: "/cart",
    isFeatured: true,
  },
  {
    id: 4,
    title: "Fresh Red Bell Peppers",
    discountPercent: 50,
    price: 13.49,
    oldPrice: 26.99,
    sold: "22",
    totalStock: 40,
    rating: 4.8,
    ratingCount: "14k",
    seller: "Lucky Supermarket",
    image: "/images/thumbs/product-two-img7.png",
    badge: "Sale 50%",
    href: "/product-details-two",
    shopHref: "/cart",
  },
  {
    id: 5,
    title: "Crunchy Carrots Bundle",
    discountPercent: 40,
    price: 11.99,
    oldPrice: 19.99,
    sold: "18",
    totalStock: 35,
    rating: 4.7,
    ratingCount: "10k",
    seller: "Lucky Supermarket",
    image: "/images/thumbs/product-two-img9.png",
    href: "/product-details-two",
    shopHref: "/cart",
  },
  {
    id: 6,
    title: "Organic Cucumber Pack",
    discountPercent: 45,
    price: 12.49,
    oldPrice: 22.99,
    sold: "17",
    totalStock: 35,
    rating: 4.6,
    ratingCount: "11k",
    seller: "Lucky Supermarket",
    image: "/images/thumbs/product-two-img10.png",
    href: "/product-details-two",
    shopHref: "/cart",
  },
  {
    id: 7,
    title: "Yellow Bell Peppers Pack",
    discountPercent: 30,
    price: 13.99,
    oldPrice: 19.99,
    sold: "16",
    totalStock: 35,
    rating: 4.9,
    ratingCount: "13k",
    seller: "Lucky Supermarket",
    image: "/images/thumbs/product-two-img8.png",
    badge: "Best Sale",
    href: "/product-details-two",
    shopHref: "/cart",
    isFeatured: true,
  },
];
