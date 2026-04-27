export interface Category {
  id: number;
  label: string;
  value: string;
}

export const categories: Category[] = [
  {
    id: 1,
    label: "Grocery",
    value: "grocery",
  },
  {
    id: 2,
    label: "Breakfast & Dairy",
    value: "breakfast-dairy",
  },
  {
    id: 3,
    label: "Vegetables",
    value: "vegetables",
  },
  {
    id: 4,
    label: "Milks and Dairies",
    value: "milks-dairies",
  },
  {
    id: 5,
    label: "Pet Foods & Toy",
    value: "pet-foods-toy",
  },
  {
    id: 6,
    label: "Breads & Bakery",
    value: "breads-bakery",
  },
  {
    id: 7,
    label: "Fresh Seafood",
    value: "fresh-seafood",
  },
  {
    id: 8,
    label: "Frozen Foods",
    value: "frozen-foods",
  },
  {
    id: 9,
    label: "Noodles & Rice",
    value: "noodles-rice",
  },
  {
    id: 10,
    label: "Ice Cream",
    value: "ice-cream",
  },
];
