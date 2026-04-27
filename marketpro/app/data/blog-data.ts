export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  category: string;
  image: string;
  excerpt: string;
  date: string;
  comments: number;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Legal structure, can make profit business",
    slug: "legal-structure-profit-business",
    category: "Gadget",
    image: "/images/thumbs/blog-img1.png",
    excerpt:
      "Re-engagement — objectives. As developers, we rightfully obsess about the customer experience...",
    date: "July 12, 2025",
    comments: 0,
  },
  {
    id: 2,
    title: "Comprehensive legal framework and business setup",
    slug: "legal-structure-profit-business-2",
    category: "Gadget",
    image: "/images/thumbs/blog-img2.png",
    excerpt:
      "Re-engagement — objectives. As developers, we rightfully obsess about the customer experience...",
    date: "July 12, 2025",
    comments: 0,
  },
  {
    id: 3,
    title: "Business models designed for long-term profitability",
    slug: "legal-structure-profit-business-3",
    category: "Gadget",
    image: "/images/thumbs/blog-img3.png",
    excerpt:
      "Re-engagement — objectives. As developers, we rightfully obsess about the customer experience...",
    date: "July 12, 2025",
    comments: 0,
  },
];
