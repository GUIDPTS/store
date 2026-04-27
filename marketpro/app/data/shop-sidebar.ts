export interface SocialLink {
  id: number;
  href: string;
  iconClass: string;
  label: string;
}

export interface Category {
  id: number;
  name: string;
  count: number;
  href: string;
}

export interface RatingFilter {
  id: number;
  stars: number;
  count: number;
}

export const vendor = {
  id: 1,
  logoSrc: "/images/thumbs/vendor-logo2.png",
  name: "Safeway",
  address: "New Street, 520, New York",
  since: 2009,
  description:
    "It's easy and free to link or sign up for our loyalty program, and it only takes a few seconds.",
  contactHref: "/contact",
};

export const socialLinks: SocialLink[] = [
  {
    id: 1,
    href: "https://www.facebook.com",
    iconClass: "ph-fill ph-facebook-logo",
    label: "Facebook",
  },
  {
    id: 2,
    href: "https://www.twitter.com",
    iconClass: "ph-fill ph-twitter-logo",
    label: "Twitter",
  },
  {
    id: 3,
    href: "https://www.linkedin.com",
    iconClass: "ph-fill ph-instagram-logo",
    label: "Instagram",
  },
  {
    id: 4,
    href: "https://www.pinterest.com",
    iconClass: "ph-fill ph-linkedin-logo",
    label: "LinkedIn",
  },
];

export const categories: Category[] = [
  { id: 1, name: "Mobile & Accessories", count: 12, href: "product-details-two" },
  { id: 2, name: "Laptop", count: 12, href: "product-details-two" },
  { id: 3, name: "Electronics", count: 12, href: "product-details-two" },
  { id: 4, name: "Smart Watch", count: 12, href: "product-details-two" },
  { id: 5, name: "Storage", count: 12, href: "product-details-two" },
  { id: 6, name: "Portable Devices", count: 12, href: "product-details-two" },
  { id: 7, name: "Action Camera", count: 12, href: "product-details-two" },
  { id: 8, name: "Smart Gadget", count: 12, href: "product-details-two" },
  { id: 9, name: "Monitor", count: 12, href: "product-details-two" },
  { id: 10, name: "Smart TV", count: 12, href: "product-details-two" },
  { id: 11, name: "Camera", count: 12, href: "product-details-two" },
  { id: 12, name: "Monitor Stand", count: 12, href: "product-details-two" },
  { id: 13, name: "Headphone", count: 12, href: "product-details-two" },
];

export const ratings: RatingFilter[] = [
  { id: 5, stars: 5, count: 124 },
  { id: 4, stars: 4, count: 52 },
  { id: 3, stars: 3, count: 12 },
  { id: 2, stars: 2, count: 5 },
  { id: 1, stars: 1, count: 2 },
];
