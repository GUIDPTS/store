export interface RecentPost {
  id: number;
  title: string;
  slug: string;
  image: string;
  date: string;
}

export const recentPosts: RecentPost[] = [
  {
    id: 1,
    title: "Once determined you need to come up with a name",
    slug: "legal-structure-profit-business",
    image: "/images/thumbs/recent-post1.png",
    date: "July 12, 2025",
  },
  {
    id: 2,
    title: "Building components with scalability in mind",
    slug: "legal-structure-profit-business",
    image: "/images/thumbs/recent-post2.png",
    date: "July 10, 2025",
  },
  {
    id: 3,
    title: "Understanding Nuxt 4 and its benefits",
    slug: "legal-structure-profit-business",
    image: "/images/thumbs/recent-post3.png",
    date: "July 9, 2025",
  },
  {
    id: 4,
    title: "Designing for performance and accessibility",
    slug: "legal-structure-profit-business",
    image: "/images/thumbs/recent-post4.png",
    date: "July 7, 2025",
  },
];
