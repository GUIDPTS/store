export interface Product {
  id: number;
  title: string;
  image: string;
  badge?: string;
  badgeColor?: string;
  vendor: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: string;
}

export const products: Product[] = [
  {
    id: 1,
    title: "Whole Grains and Seeds Organic Bread",
    image: "/images/thumbs/product-img10.png",
    badge: "Best Sale",
    badgeColor: "bg-info-600",
    vendor: "Lucky Supermarket",
    price: 14.99,
    oldPrice: 28.99,
    rating: 4.8,
    reviews: "17k",
  },
  {
    id: 2,
    title: "Lucerne Yogurt, Lowfat, Strawberry",
    image: "/images/thumbs/product-img11.png",
    badge: "Best Sale",
    badgeColor: "bg-info-600",
    vendor: "Lucky Supermarket",
    price: 14.99,
    oldPrice: 28.99,
    rating: 4.8,
    reviews: "17k",
  },
  {
    id: 3,
    title: "Nature Valley Whole Grain Oats and Honey Protein",
    image: "/images/thumbs/product-img12.png",
    badge: "Sale 50%",
    badgeColor: "bg-danger-600",
    vendor: "Lucky Supermarket",
    price: 14.99,
    oldPrice: 28.99,
    rating: 4.8,
    reviews: "17k",
  },
  {
    id: 4,
    title: "Whole Grains and Seeds Organic Bread",
    image: "/images/thumbs/product-img10.png",
    badge: "Best Sale",
    badgeColor: "bg-info-600",
    vendor: "Lucky Supermarket",
    price: 14.99,
    oldPrice: 28.99,
    rating: 4.8,
    reviews: "17k",
  },
  {
    id: 5,
    title: "C-500 Antioxidant Protect Dietary Supplement",
    image: "/images/thumbs/product-img7.png",
    badge: "Sale 30%",
    badgeColor: "bg-danger-600",
    vendor: "Lucky Supermarket",
    price: 14.99,
    oldPrice: 28.99,
    rating: 4.8,
    reviews: "17k",
  },
  {
    id: 6,
    title: "Marcel's Modern Pantry Almond Unsweetened",
    image: "/images/thumbs/product-img8.png",
    badge: "Sale 50%",
    badgeColor: "bg-danger-600",
    vendor: "Lucky Supermarket",
    price: 14.99,
    oldPrice: 28.99,
    rating: 4.8,
    reviews: "17k",
  },
  {
    id: 7,
    title: "O Organics Milk, Whole, Vitamin D",
    image: "/images/thumbs/product-img9.png",
    badge: "Sale 50%",
    badgeColor: "bg-danger-600",
    vendor: "Lucky Supermarket",
    price: 14.99,
    oldPrice: 28.99,
    rating: 4.8,
    reviews: "17k",
  },
];
