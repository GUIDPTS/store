export interface DealProduct {
  id: number;
  title: string;
  image: string;
  rating: number;
  reviews: string;
  progress: number;
  sold: string;
  oldPrice: string;
  newPrice: string;
  badge?: {
    label: string;
    type: "success" | "danger" | "warning";
  };
}

export const dealsOfWeek: DealProduct[] = [
  {
    id: 1,
    title: "Taylor Farms Broccoli Florets Vegetables",
    image: "/images/thumbs/product-two-img1.png",
    rating: 4.8,
    reviews: "17k",
    progress: 35,
    sold: "18/35",
    oldPrice: "$28.99",
    newPrice: "$14.99",
    badge: {
      label: "Hot Deal",
      type: "success",
    },
  },
  {
    id: 2,
    title: "Organic Baby Spinach Fresh Pack",
    image: "/images/thumbs/product-two-img2.png",
    rating: 4.5,
    reviews: "12k",
    progress: 25,
    sold: "10/25",
    oldPrice: "$22.99",
    newPrice: "$11.49",
    badge: {
      label: "Best Sale",
      type: "success",
    },
  },
  {
    id: 3,
    title: "Fresh Red Bell Peppers Bundle",
    image: "/images/thumbs/product-two-img3.png",
    rating: 4.3,
    reviews: "9k",
    progress: 20,
    sold: "5/20",
    oldPrice: "$18.99",
    newPrice: "$9.49",
  },
  {
    id: 4,
    title: "Crunchy Carrot Fresh Vegetables",
    image: "/images/thumbs/product-two-img4.png",
    rating: 4.7,
    reviews: "14k",
    progress: 40,
    sold: "20/40",
    oldPrice: "$24.99",
    newPrice: "$12.49",
    badge: {
      label: "Sale 50%",
      type: "danger",
    },
  },
  {
    id: 5,
    title: "Organic Cucumber Salad Pack",
    image: "/images/thumbs/product-two-img5.png",
    rating: 4.6,
    reviews: "11k",
    progress: 30,
    sold: "15/30",
    oldPrice: "$20.99",
    newPrice: "$10.49",
  },
  {
    id: 6,
    title: "Fresh Green Zucchini Bundle",
    image: "/images/thumbs/product-two-img6.png",
    rating: 4.4,
    reviews: "8k",
    progress: 22,
    sold: "8/22",
    oldPrice: "$19.99",
    newPrice: "$9.99",
  },
  {
    id: 7,
    title: "Organic Yellow Bell Peppers Pack",
    image: "/images/thumbs/product-two-img9.png",
    rating: 4.9,
    reviews: "20k",
    progress: 45,
    sold: "25/45",
    oldPrice: "$26.99",
    newPrice: "$13.49",
    badge: {
      label: "New",
      type: "warning",
    },
  },
];
