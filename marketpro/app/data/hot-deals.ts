export interface HotDealProduct {
  id: number;
  title: string;
  slug: string;
  image: string;
  price: number;
  oldPrice: number;
  rating: number;
  reviews: string;
  sold: {
    current: number;
    total: number;
  };
}

export const hotDeals: HotDealProduct[] = [
  {
    id: 1,
    title: "Taylor Farms Broccoli",
    slug: "taylor-farms-broccoli-florets-vegetables",
    image: "/images/thumbs/product-img26.png",
    price: 14.99,
    oldPrice: 28.99,
    rating: 4.8,
    reviews: "17k",
    sold: {
      current: 18,
      total: 35,
    },
  },
  {
    id: 2,
    title: "Fresh Organic Carrots",
    slug: "fresh-organic-carrots",
    image: "/images/thumbs/product-img27.png",
    price: 10.99,
    oldPrice: 20.99,
    rating: 4.7,
    reviews: "12k",
    sold: {
      current: 12,
      total: 40,
    },
  },
  {
    id: 3,
    title: "Green Zucchini Pack",
    slug: "green-zucchini-pack",
    image: "/images/thumbs/product-img28.png",
    price: 9.99,
    oldPrice: 19.99,
    rating: 4.6,
    reviews: "9k",
    sold: {
      current: 25,
      total: 50,
    },
  },
  {
    id: 4,
    title: "Premium Red Tomatoes",
    slug: "premium-red-tomatoes",
    image: "/images/thumbs/product-img29.png",
    price: 11.49,
    oldPrice: 21.99,
    rating: 4.9,
    reviews: "15k",
    sold: {
      current: 30,
      total: 40,
    },
  },
  {
    id: 5,
    title: "Organic Bell Peppers Mix",
    slug: "organic-bell-peppers-mix",
    image: "/images/thumbs/product-img30.png",
    price: 13.25,
    oldPrice: 25.0,
    rating: 4.5,
    reviews: "10k",
    sold: {
      current: 20,
      total: 45,
    },
  },
];
