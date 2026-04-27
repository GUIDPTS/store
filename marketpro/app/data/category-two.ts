export interface SubmenuItem {
  label: string;
  to: string;
}

export interface CategoryItem {
  id: number;
  title: string;
  icon: string;
  subMenuTitle: string;
  submenu: SubmenuItem[];
}

const categories: CategoryItem[] = [
  {
    id: 1,
    title: "Computers & Laptop",
    icon: "/images/icon/category-icon1.png",
    subMenuTitle: "Computers & Laptop",
    submenu: [
      { label: "Samsung", to: "/shop" },
      { label: "Iphone", to: "/shop" },
      { label: "Vivo", to: "/shop" },
      { label: "Oppo", to: "/shop" },
      { label: "Itel", to: "/shop" },
      { label: "Realme", to: "/shop" },
    ],
  },
  {
    id: 2,
    title: "Smartphones & Gadget",
    icon: "/images/icon/category-icon4.png",
    subMenuTitle: "Smartphones & Gadget",
    submenu: [
      { label: "Samsung", to: "/shop" },
      { label: "Iphone", to: "/shop" },
      { label: "Vivo", to: "/shop" },
      { label: "Oppo", to: "/shop" },
      { label: "Itel", to: "/shop" },
      { label: "Realme", to: "/shop" },
    ],
  },
  {
    id: 3,
    title: "Gaming & Television",
    icon: "/images/icon/category-icon3.png",
    subMenuTitle: "Gaming & Television",
    submenu: [
      { label: "Samsung", to: "/shop" },
      { label: "Iphone", to: "/shop" },
      { label: "Vivo", to: "/shop" },
      { label: "Oppo", to: "/shop" },
      { label: "Itel", to: "/shop" },
      { label: "Realme", to: "/shop" },
    ],
  },
  {
    id: 4,
    title: "Office Equipment",
    icon: "/images/icon/category-icon4.png",
    subMenuTitle: "Office Equipment",
    submenu: [
      { label: "Samsung", to: "/shop" },
      { label: "Iphone", to: "/shop" },
      { label: "Vivo", to: "/shop" },
      { label: "Oppo", to: "/shop" },
      { label: "Itel", to: "/shop" },
      { label: "Realme", to: "/shop" },
    ],
  },
  {
    id: 5,
    title: "Smartwatches",
    icon: "/images/icon/category-icon5.png",
    subMenuTitle: "Smartwatches",
    submenu: [
      { label: "Samsung", to: "/shop" },
      { label: "Iphone", to: "/shop" },
      { label: "Vivo", to: "/shop" },
      { label: "Oppo", to: "/shop" },
      { label: "Itel", to: "/shop" },
      { label: "Realme", to: "/shop" },
    ],
  },
  {
    id: 6,
    title: "Headphone & Music",
    icon: "/images/icon/category-icon6.png",
    subMenuTitle: "Headphone & Music",
    submenu: [
      { label: "Samsung", to: "/shop" },
      { label: "Iphone", to: "/shop" },
      { label: "Vivo", to: "/shop" },
      { label: "Oppo", to: "/shop" },
      { label: "Itel", to: "/shop" },
      { label: "Realme", to: "/shop" },
    ],
  },
  {
    id: 7,
    title: "Digital Accessories",
    icon: "/images/icon/category-icon1.png",
    subMenuTitle: "Digital Accessories",
    submenu: [
      { label: "Samsung", to: "/shop" },
      { label: "Iphone", to: "/shop" },
      { label: "Vivo", to: "/shop" },
      { label: "Oppo", to: "/shop" },
      { label: "Itel", to: "/shop" },
      { label: "Realme", to: "/shop" },
    ],
  },
  {
    id: 8,
    title: "Value Added Services",
    icon: "/images/icon/category-icon4.png",
    subMenuTitle: "Value Added Services",
    submenu: [
      { label: "Samsung", to: "/shop" },
      { label: "Iphone", to: "/shop" },
      { label: "Vivo", to: "/shop" },
      { label: "Oppo", to: "/shop" },
      { label: "Itel", to: "/shop" },
      { label: "Realme", to: "/shop" },
    ],
  },
  {
    id: 9,
    title: "Car Products",
    icon: "/images/icon/category-icon3.png",
    subMenuTitle: "Car Products",
    submenu: [
      { label: "Samsung", to: "/shop" },
      { label: "Iphone", to: "/shop" },
      { label: "Vivo", to: "/shop" },
      { label: "Oppo", to: "/shop" },
      { label: "Itel", to: "/shop" },
      { label: "Realme", to: "/shop" },
    ],
  },
  {
    id: 10,
    title: "Ecological Products",
    icon: "/images/icon/category-icon4.png",
    subMenuTitle: "Ecological Products",
    submenu: [
      { label: "Samsung", to: "/shop" },
      { label: "Iphone", to: "/shop" },
      { label: "Vivo", to: "/shop" },
      { label: "Oppo", to: "/shop" },
      { label: "Itel", to: "/shop" },
      { label: "Realme", to: "/shop" },
    ],
  },
  {
    id: 11,
    title: "Flat",
    icon: "/images/icon/category-icon5.png",
    subMenuTitle: "Flat",
    submenu: [
      { label: "Samsung", to: "/shop" },
      { label: "Iphone", to: "/shop" },
      { label: "Vivo", to: "/shop" },
      { label: "Oppo", to: "/shop" },
      { label: "Itel", to: "/shop" },
      { label: "Realme", to: "/shop" },
    ],
  },
  {
    id: 12,
    title: "Commercial Terminal",
    icon: "/images/icon/category-icon6.png",
    subMenuTitle: "Commercial Terminal",
    submenu: [
      { label: "Samsung", to: "/shop" },
      { label: "Iphone", to: "/shop" },
      { label: "Vivo", to: "/shop" },
      { label: "Oppo", to: "/shop" },
      { label: "Itel", to: "/shop" },
      { label: "Realme", to: "/shop" },
    ],
  },
  {
    id: 13,
    title: "Headphone",
    icon: "/images/icon/category-icon3.png",
    subMenuTitle: "Headphone",
    submenu: [
      { label: "Samsung", to: "/shop" },
      { label: "Iphone", to: "/shop" },
      { label: "Vivo", to: "/shop" },
      { label: "Oppo", to: "/shop" },
      { label: "Itel", to: "/shop" },
      { label: "Realme", to: "/shop" },
    ],
  },
];

export default categories;
