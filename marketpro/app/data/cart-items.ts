export interface CartItem {
  id: number;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  price: number;
  quantity: number;
  tags: string[];
}

export const cartItems: CartItem[] = [
  {
    id: 1,
    name: "Taylor Farms Broccoli Florets Vegetables",
    image: "/images/thumbs/product-two-img1.png",
    rating: 4.8,
    reviews: 128,
    price: 125.0,
    quantity: 2,
    tags: ["Vegetables", "Fresh"],
  },
  {
    id: 2,
    name: "Organic Baby Spinach Fresh Pack",
    image: "/images/thumbs/product-two-img2.png",
    rating: 4.5,
    reviews: 95,
    price: 99.99,
    quantity: 1,
    tags: ["Greens", "Healthy"],
  },
  {
    id: 3,
    name: "Fresh Red Bell Peppers Bundle",
    image: "/images/thumbs/product-two-img3.png",
    rating: 4.3,
    reviews: 72,
    price: 89.5,
    quantity: 3,
    tags: ["Vegetables", "Crunchy"],
  },
  {
    id: 4,
    name: "Crunchy Carrot Fresh Vegetables",
    image: "/images/thumbs/product-two-img4.png",
    rating: 4.7,
    reviews: 110,
    price: 110.0,
    quantity: 1,
    tags: ["Organic", "Fresh"],
  },
];
