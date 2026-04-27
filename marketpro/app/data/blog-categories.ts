export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
}

export const blogCategories: BlogCategory[] = [
  {
    id: 1,
    name: "Gaming",
    slug: "blog",
    count: 12,
  },
  {
    id: 2,
    name: "Smart Gadget",
    slug: "blog",
    count: 5,
  },
  {
    id: 3,
    name: "Software",
    slug: "blog",
    count: 29,
  },
  {
    id: 4,
    name: "Electronics",
    slug: "blog",
    count: 24,
  },
  {
    id: 5,
    name: "Laptop",
    slug: "blog",
    count: 8,
  },
  {
    id: 6,
    name: "Mobile & Accessories",
    slug: "blog",
    count: 16,
  },
  {
    id: 7,
    name: "Appliance",
    slug: "blog",
    count: 24,
  },
];
