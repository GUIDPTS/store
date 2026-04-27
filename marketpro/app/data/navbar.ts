export interface NavSubItem {
  label: string;
  to?: string;
}

export interface NavItem {
  label: string;
  to?: string;
  badge?: {
    text: string;
    class: string;
  };
  submenu?: NavSubItem[];
}

const navbarMenu: NavItem[] = [
  {
    label: "Home",
    submenu: [
      { label: "Home Grocery", to: "/" },
      { label: "Home Electronics", to: "/index-two" },
      { label: "Home Fashion", to: "/index-three" },
    ],
  },
  {
    label: "Shop",
    submenu: [
      { label: "Shop", to: "/shop" },
      { label: "Shop Details", to: "/product-details" },
      { label: "Shop Details Two", to: "/product-details-two" },
    ],
  },
  {
    label: "Pages",
    badge: {
      text: "New",
      class: "bg-warning-600",
    },
    submenu: [
      { label: "Cart", to: "/cart" },
      { label: "Wishlist", to: "/wishlist" },
      { label: "Checkout", to: "/checkout" },
      { label: "Become Seller", to: "/become-seller" },
      { label: "Account", to: "/account" },
    ],
  },
  {
    label: "Vendors",
    badge: {
      text: "New",
      class: "bg-tertiary-600",
    },
    submenu: [
      { label: "Vendors", to: "/vendor" },
      { label: "Vendor Details", to: "/vendor/safeway" },
      { label: "Vendors Two", to: "/vendor-two" },
      { label: "Vendors Two Details", to: "/vendor-two/e-mart-shop" },
    ],
  },
  {
    label: "Blog",
    submenu: [
      { label: "Blog", to: "/blog" },
      { label: "Blog Details", to: "/blog/legal-structure-profit-business" },
    ],
  },
  {
    label: "Contact Us",
    to: "/contact",
  },
];

export default navbarMenu;
