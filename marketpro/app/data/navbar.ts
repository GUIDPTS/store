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
    label: "首页",
    to: "/",
  },
  {
    label: "商品",
    to: "/shop",
  },
  {
    label: "店铺",
    to: "/vendor",
  },
  {
    label: "博客",
    to: "/blog",
  },
  {
    label: "联系我们",
    to: "/contact",
  },
];

export default navbarMenu;
