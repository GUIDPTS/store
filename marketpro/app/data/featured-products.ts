export interface Product {
  id: string;
  title: string;
  href: string;
  image: string;
  badge?: string;
  rating: number;
  ratingCount: number;
  storeName: string;
  originalPrice?: number;
  price: number;
  priceUnit?: string;
}

export interface FeaturedPromo {
  title: string;
  priceFrom: number;
  discountPct?: number;
  href: string;
  image: string;
  bgImage: string;
}

export const featuredProducts: Product[] = [
  {
    id: "prod-1",
    title: "iPhone 15 Pro Warp Charge 30W Power Adapter",
    href: "product-details-two",
    image: "/images/thumbs/product-two-img2.png",
    rating: 4.8,
    ratingCount: 17000,
    storeName: "Lucky Supermarket",
    originalPrice: 28.99,
    price: 14.99,
    priceUnit: "/Qty",
  },
  {
    id: "prod-2",
    title: "iPhone 15 Pro Warp Charge 30W Power Adapter",
    href: "product-details-two",
    image: "/images/thumbs/product-two-img3.png",
    badge: "Best seller",
    rating: 4.8,
    ratingCount: 17000,
    storeName: "Lucky Supermarket",
    originalPrice: 28.99,
    price: 14.99,
    priceUnit: "/Qty",
  },
  {
    id: "prod-3",
    title: "iPhone 15 Pro Warp Charge 30W Power Adapter",
    href: "product-details-two",
    image: "/images/thumbs/product-two-img2.png",
    rating: 4.8,
    ratingCount: 17000,
    storeName: "Lucky Supermarket",
    originalPrice: 28.99,
    price: 14.99,
    priceUnit: "/Qty",
  },
  {
    id: "prod-4",
    title: "iPhone 15 Pro Warp Charge 30W Power Adapter",
    href: "product-details-two",
    image: "/images/thumbs/product-two-img3.png",
    badge: "Best seller",
    rating: 4.8,
    ratingCount: 17000,
    storeName: "Lucky Supermarket",
    originalPrice: 28.99,
    price: 14.99,
    priceUnit: "/Qty",
  },
  {
    id: "prod-5",
    title: "iPhone 15 Pro Warp Charge 30W Power Adapter",
    href: "product-details-two",
    image: "/images/thumbs/product-two-img2.png",
    rating: 4.8,
    ratingCount: 17000,
    storeName: "Lucky Supermarket",
    originalPrice: 28.99,
    price: 14.99,
    priceUnit: "/Qty",
  },
  {
    id: "prod-6",
    title: "iPhone 15 Pro Warp Charge 30W Power Adapter",
    href: "product-details-two",
    image: "/images/thumbs/product-two-img3.png",
    badge: "Best seller",
    rating: 4.8,
    ratingCount: 17000,
    storeName: "Lucky Supermarket",
    originalPrice: 28.99,
    price: 14.99,
    priceUnit: "/Qty",
  },
  {
    id: "prod-7",
    title: "iPhone 15 Pro Warp Charge 30W Power Adapter",
    href: "product-details-two",
    image: "/images/thumbs/product-two-img2.png",
    rating: 4.8,
    ratingCount: 17000,
    storeName: "Lucky Supermarket",
    originalPrice: 28.99,
    price: 14.99,
    priceUnit: "/Qty",
  },
  {
    id: "prod-8",
    title: "iPhone 15 Pro Warp Charge 30W Power Adapter",
    href: "product-details-two",
    image: "/images/thumbs/product-two-img3.png",
    badge: "Best seller",
    rating: 4.8,
    ratingCount: 17000,
    storeName: "Lucky Supermarket",
    originalPrice: 28.99,
    price: 14.99,
    priceUnit: "/Qty",
  },
];

export const featuredPromo: FeaturedPromo = {
  title: "iPhone Smart Phone - Red",
  priceFrom: 890,
  discountPct: 20,
  href: "/shop",
  image: "/images/thumbs/featured-product-img.png",
  bgImage: "/images/bg/featured-product-bg.png",
};
