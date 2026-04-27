export interface Product {
  id: number;
  title: string;
  image: string;
  link: string;
  categories: string[];
}

export const popularProducts: Product[] = [
  {
    id: 1,
    title: "Headphone & Earphone",
    image: "/images/thumbs/popular-img1.png",
    link: "/product-details",
    categories: ["Wired Headphones", "Over-Ear Headphone", "Sports Headphone", "Earbud Headphone"],
  },
  {
    id: 2,
    title: "TV & Smart Home",
    image: "/images/thumbs/popular-img2.png",
    link: "/product-details",
    categories: ["Wired Headphones", "Over-Ear Headphone", "Sports Headphone", "Earbud Headphone"],
  },
  {
    id: 3,
    title: "Video Games",
    image: "/images/thumbs/popular-img3.png",
    link: "/product-details",
    categories: ["Wired Headphones", "Over-Ear Headphone", "Sports Headphone", "Earbud Headphone"],
  },
  {
    id: 4,
    title: "Computer & Tablets",
    image: "/images/thumbs/popular-img4.png",
    link: "/product-details",
    categories: ["Wired Headphones", "Over-Ear Headphone", "Sports Headphone", "Earbud Headphone"],
  },
  {
    id: 5,
    title: "Car & GPS",
    image: "/images/thumbs/popular-img5.png",
    link: "/product-details",
    categories: ["Wired Headphones", "Over-Ear Headphone", "Sports Headphone", "Earbud Headphone"],
  },
  {
    id: 6,
    title: "Camera & Video",
    image: "/images/thumbs/popular-img6.png",
    link: "/product-details",
    categories: ["Wired Headphones", "Over-Ear Headphone", "Sports Headphone", "Earbud Headphone"],
  },
  {
    id: 7,
    title: "Kitchen Appliance",
    image: "/images/thumbs/popular-img7.png",
    link: "/product-details",
    categories: ["Wired Headphones", "Over-Ear Headphone", "Sports Headphone", "Earbud Headphone"],
  },
  {
    id: 8,
    title: "Phone & Accessories",
    image: "/images/thumbs/popular-img8.png",
    link: "/product-details",
    categories: ["Wired Headphones", "Over-Ear Headphone", "Sports Headphone", "Earbud Headphone"],
  },
];
