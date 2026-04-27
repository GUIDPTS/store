export interface FooterLink {
  text: string;
  to: string;
  external?: boolean;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export const footerSections: FooterSection[] = [
  {
    title: "About us",
    links: [
      { text: "Company Profile", to: "/shop" },
      { text: "All Retail Store", to: "/shop" },
      { text: "Merchant Center", to: "/shop" },
      { text: "Affiliate", to: "/shop" },
      { text: "Contact Us", to: "/shop" },
      { text: "Feedback", to: "/shop" },
      { text: "Huawei Group", to: "/shop" },
      { text: "Rules & Policy", to: "/shop" },
    ],
  },
  {
    title: "Customer Support",
    links: [
      { text: "Help Center", to: "/shop" },
      { text: "Contact Us", to: "/contact" },
      { text: "Gift Card", to: "/shop" },
      { text: "Report Abuse", to: "/shop" },
      { text: "Submit and Dispute", to: "/shop" },
      { text: "Policies & Rules", to: "/shop" },
      { text: "Online Shopping", to: "/shop" },
      { text: "Redeem Voucher", to: "/shop" },
    ],
  },
  {
    title: "My Account",
    links: [
      { text: "My Account", to: "/shop" },
      { text: "Order History", to: "/shop" },
      { text: "Shopping Cart", to: "/shop" },
      { text: "Compare", to: "/shop" },
      { text: "Help Ticket", to: "/shop" },
      { text: "Wishlist", to: "/shop" },
      { text: "Order History", to: "/shop" },
      { text: "Product Support", to: "/shop" },
    ],
  },
  {
    title: "Information",
    links: [
      { text: "Become a Vendor", to: "/shop" },
      { text: "Affiliate Program", to: "/shop" },
      { text: "Privacy Policy", to: "/shop" },
      { text: "Our Suppliers", to: "/shop" },
      { text: "Extended Plan", to: "/shop" },
      { text: "Extended Plan", to: "/shop" },
      { text: "Community", to: "/shop" },
      { text: "Community", to: "/shop" },
    ],
  },
];

export const phone = "+00 123 456 789";
export const email = "support24@marketpro.com";
export const address = "789 Inner Lane, California, USA";

export const storeLinks = [
  { href: "https://www.apple.com/store", img: "/images/thumbs/store-img1.png", alt: "Apple Store" },
  {
    href: "https://play.google.com/store/apps?hl=en",
    img: "/images/thumbs/store-img2.png",
    alt: "Google Play Store",
  },
];

export const socialLinks = [
  { href: "https://www.facebook.com", icon: "ph-facebook-logo", label: "Facebook" },
  { href: "https://www.twitter.com", icon: "ph-twitter-logo", label: "Twitter" },
  { href: "https://www.linkedin.com", icon: "ph-instagram-logo", label: "Instagram" },
  { href: "https://www.pinterest.com", icon: "ph-linkedin-logo", label: "LinkedIn" },
];
