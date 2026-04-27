export type Product = {
  id: number;
  title: string;
  image: string;
  badge?: {
    text: string;
    color: string;
  };
  rating: number;
  reviews: string;
  progress: {
    sold: number;
    total: number;
  };
  price: {
    original: number;
    sale: number;
    unit: string;
  };
  link: string;
};

export const productList: Product[] = [
  {
    id: 1,
    title: "Taylor Farms Broccoli Florets Vegetables",
    image: "/images/thumbs/product-two-img1.png",
    badge: {
      text: "Best Sale",
      color: "primary-600",
    },
    rating: 4.8,
    reviews: "17k",
    progress: {
      sold: 18,
      total: 35,
    },
    price: {
      original: 28.99,
      sale: 14.99,
      unit: "/Qty",
    },
    link: "/product-details",
  },
  {
    id: 2,
    title: "Organic Baby Spinach Fresh Pack",
    image: "/images/thumbs/product-two-img2.png",
    rating: 4.5,
    reviews: "12k",
    progress: {
      sold: 10,
      total: 30,
    },
    price: {
      original: 25.99,
      sale: 12.99,
      unit: "/Qty",
    },
    link: "/product-details",
  },
  {
    id: 3,
    title: "Fresh Red Bell Peppers Bundle",
    image: "/images/thumbs/product-two-img3.png",
    rating: 4.3,
    reviews: "9k",
    progress: {
      sold: 7,
      total: 25,
    },
    price: {
      original: 22.99,
      sale: 11.49,
      unit: "/Qty",
    },
    link: "/product-details",
  },
  {
    id: 4,
    title: "Crunchy Carrot Fresh Vegetables",
    image: "/images/thumbs/product-two-img4.png",
    badge: {
      text: "Sale 50%",
      color: "danger-600",
    },
    rating: 4.7,
    reviews: "14k",
    progress: {
      sold: 15,
      total: 40,
    },
    price: {
      original: 24.99,
      sale: 12.49,
      unit: "/Qty",
    },
    link: "/product-details",
  },
  {
    id: 5,
    title: "Organic Cucumber Salad Pack",
    image: "/images/thumbs/product-two-img5.png",
    rating: 4.6,
    reviews: "11k",
    progress: {
      sold: 12,
      total: 35,
    },
    price: {
      original: 23.99,
      sale: 11.99,
      unit: "/Qty",
    },
    link: "/product-details",
  },
  {
    id: 6,
    title: "Fresh Green Zucchini Bundle",
    image: "/images/thumbs/product-two-img6.png",
    rating: 4.4,
    reviews: "8k",
    progress: {
      sold: 8,
      total: 30,
    },
    price: {
      original: 21.99,
      sale: 10.99,
      unit: "/Qty",
    },
    link: "/product-details",
  },
  {
    id: 7,
    title: "Organic Yellow Bell Peppers Pack",
    image: "/images/thumbs/product-two-img7.png",
    rating: 4.9,
    reviews: "20k",
    progress: {
      sold: 20,
      total: 35,
    },
    price: {
      original: 26.99,
      sale: 13.49,
      unit: "/Qty",
    },
    link: "/product-details",
  },
  {
    id: 8,
    title: "Fresh Mixed Vegetable Bundle Pack",
    image: "/images/thumbs/product-two-img8.png",
    rating: 4.7,
    reviews: "15k",
    progress: {
      sold: 14,
      total: 30,
    },
    price: {
      original: 25.49,
      sale: 12.75,
      unit: "/Qty",
    },
    link: "/product-details",
  },
  {
    id: 9,
    title: "Organic Broccoli & Spinach Pack",
    image: "/images/thumbs/product-two-img9.png",
    badge: {
      text: "Sale 50%",
      color: "danger",
    },
    rating: 4.5,
    reviews: "13k",
    progress: {
      sold: 16,
      total: 35,
    },
    price: {
      original: 27.49,
      sale: 13.75,
      unit: "/Qty",
    },
    link: "/product-details",
  },
  {
    id: 10,
    title: "Red Bell Peppers & Carrot Pack",
    image: "/images/thumbs/product-two-img10.png",
    rating: 4.3,
    reviews: "10k",
    progress: {
      sold: 9,
      total: 25,
    },
    price: {
      original: 22.49,
      sale: 11.25,
      unit: "/Qty",
    },
    link: "/product-details",
  },
  {
    id: 11,
    title: "Green Zucchini & Cucumber Pack",
    image: "/images/thumbs/product-two-img11.png",
    rating: 4.6,
    reviews: "12k",
    progress: {
      sold: 11,
      total: 30,
    },
    price: {
      original: 23.99,
      sale: 12.0,
      unit: "/Qty",
    },
    link: "/product-details",
  },
  {
    id: 12,
    title: "Fresh Mixed Veggie Bundle Pack",
    image: "/images/thumbs/product-two-img12.png",
    badge: {
      text: "New",
      color: "warning",
    },
    rating: 4.8,
    reviews: "18k",
    progress: {
      sold: 18,
      total: 35,
    },
    price: {
      original: 26.99,
      sale: 13.49,
      unit: "/Qty",
    },
    link: "/product-details",
  },
  {
    id: 13,
    title: "Organic Spinach & Carrot Pack",
    image: "/images/thumbs/product-two-img13.png",
    rating: 4.4,
    reviews: "9k",
    progress: {
      sold: 7,
      total: 25,
    },
    price: {
      original: 22.49,
      sale: 11.25,
      unit: "/Qty",
    },
    link: "/product-details",
  },
  {
    id: 14,
    title: "Fresh Broccoli & Zucchini Pack",
    image: "/images/thumbs/product-two-img14.png",
    rating: 4.7,
    reviews: "14k",
    progress: {
      sold: 15,
      total: 40,
    },
    price: {
      original: 25.99,
      sale: 13.0,
      unit: "/Qty",
    },
    link: "/product-details",
  },
  {
    id: 15,
    title: "Taylor Farms Fresh Veggie Bundle",
    image: "/images/thumbs/product-two-img15.png",
    badge: {
      text: "Best Sale",
      color: "primary",
    },
    rating: 4.8,
    reviews: "17k",
    progress: {
      sold: 18,
      total: 35,
    },
    price: {
      original: 28.99,
      sale: 14.99,
      unit: "/Qty",
    },
    link: "/product-details",
  },
  {
    id: 16,
    title: "Organic Carrot & Cucumber Pack",
    image: "/images/thumbs/product-two-img1.png",
    badge: {
      text: "New",
      color: "warning",
    },
    rating: 4.5,
    reviews: "11k",
    progress: {
      sold: 12,
      total: 35,
    },
    price: {
      original: 23.99,
      sale: 12.0,
      unit: "/Qty",
    },
    link: "/product-details",
  },
  {
    id: 17,
    title: "Fresh Spinach & Broccoli Pack",
    image: "/images/thumbs/product-two-img2.png",
    badge: {
      text: "Best Sale",
      color: "primary",
    },
    rating: 4.7,
    reviews: "15k",
    progress: {
      sold: 14,
      total: 30,
    },
    price: {
      original: 25.49,
      sale: 12.75,
      unit: "/Qty",
    },
    link: "/product-details",
  },
  {
    id: 18,
    title: "Organic Red & Yellow Peppers Pack",
    image: "/images/thumbs/product-two-img3.png",
    rating: 4.4,
    reviews: "10k",
    progress: {
      sold: 9,
      total: 25,
    },
    price: {
      original: 22.99,
      sale: 11.5,
      unit: "/Qty",
    },
    link: "/product-details",
  },
  {
    id: 19,
    title: "Fresh Mixed Greens Bundle Pack",
    image: "/images/thumbs/product-two-img4.png",
    rating: 4.6,
    reviews: "12k",
    progress: {
      sold: 11,
      total: 30,
    },
    price: {
      original: 24.49,
      sale: 12.25,
      unit: "/Qty",
    },
    link: "/product-details",
  },
  {
    id: 20,
    title: "Organic Carrot & Bell Peppers Pack",
    image: "/images/thumbs/product-two-img5.png",
    badge: {
      text: "Sale 50%",
      color: "danger",
    },
    rating: 4.5,
    reviews: "13k",
    progress: {
      sold: 16,
      total: 35,
    },
    price: {
      original: 26.99,
      sale: 13.5,
      unit: "/Qty",
    },
    link: "/product-details",
  },
];
