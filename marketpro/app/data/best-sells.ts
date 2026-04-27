export interface BestSellProduct {
  id: number;
  title: string;
  image: string;
  price: number;
  oldPrice: number;
  badge?: string;
  rating: number;
  reviews: string;
  sellerName?: string;
  sold: {
    current: number;
    total: number;
  };
  countdownTarget: string;
}

export const bestSells: BestSellProduct[] = [
  {
    id: 1,
    title: "Taylor Farms Broccoli Florets Vegetables",
    image: "/images/thumbs/best-sell1.png",
    price: 12.49,
    oldPrice: 24.99,
    badge: "Sale 50%",
    rating: 4.8,
    reviews: "18k",
    sellerName: "Green Grocery",
    sold: {
      current: 22,
      total: 50,
    },
    countdownTarget: "2027-11-30T23:59:59",
  },
  {
    id: 2,
    title: "Organic Baby Spinach Pack",
    image: "/images/thumbs/best-sell2.png",
    price: 10.99,
    oldPrice: 21.99,
    badge: "Hot Deal",
    rating: 4.5,
    reviews: "15k",
    sellerName: "Healthy Harvest",
    sold: {
      current: 18,
      total: 40,
    },
    countdownTarget: "2026-12-30T23:59:59",
  },
  {
    id: 3,
    title: "Fresh Red Bell Peppers",
    image: "/images/thumbs/best-sell3.png",
    price: 8.99,
    oldPrice: 16.99,
    badge: "Limited Offer",
    rating: 4.3,
    reviews: "9k",
    sellerName: "Farm Fresh",
    sold: {
      current: 12,
      total: 30,
    },
    countdownTarget: "2025-12-30T23:59:59",
  },
  {
    id: 4,
    title: "Crunchy Carrot Bundle",
    image: "/images/thumbs/best-sell4.png",
    price: 11.49,
    oldPrice: 22.99,
    badge: "Sale 50%",
    rating: 4.7,
    reviews: "14k",
    sellerName: "Veggie World",
    sold: {
      current: 25,
      total: 45,
    },
    countdownTarget: "2027-12-30T23:59:59",
  },
];
