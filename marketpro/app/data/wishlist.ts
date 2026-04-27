export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  inStock: boolean;
  rating: number;
  reviews: number;
  detailLink: string;
  tags: string[];
}

export const cartItems: CartItem[] = [
  {
    id: 1,
    name: "Taylor Farms Broccoli Florets Vegetables",
    price: 125.0,
    image: "/images/thumbs/product-two-img1.png",
    inStock: true,
    rating: 4.8,
    reviews: 128,
    detailLink: "/product-details",
    tags: ["Camera", "Videos"],
  },
  {
    id: 2,
    name: "Smart Phone With Intel Celeron",
    price: 125.0,
    image: "/images/thumbs/product-two-img3.png",
    inStock: true,
    rating: 4.8,
    reviews: 128,
    detailLink: "/product-details",
    tags: ["Camera", "Videos"],
  },
  {
    id: 3,
    name: "HP Chromebook With Intel Celeron",
    price: 125.0,
    image: "/images/thumbs/product-two-img14.png",
    inStock: true,
    rating: 4.8,
    reviews: 128,
    detailLink: "/product-details",
    tags: ["Camera", "Videos"],
  },
  {
    id: 4,
    name: "Smart watch With Intel Celeron",
    price: 125.0,
    image: "/images/thumbs/product-two-img2.png",
    inStock: true,
    rating: 4.8,
    reviews: 128,
    detailLink: "/product-details",
    tags: ["Camera", "Videos"],
  },
];
