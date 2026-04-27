export interface FooterLink {
  label: string;
  to: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface ContactInfo {
  logo: string;
  phone: {
    label: string;
    href: string;
  };
  email: {
    label: string;
    href: string;
  };
  address: string;
  appLinks: {
    label: string;
    href: string;
    icon?: string;
    img?: string;
  }[];
}

export const contactInfo: ContactInfo = {
  logo: "/images/logo/logo-white.png",
  phone: {
    label: "+00 123 456 789",
    href: "tel:+00123456789",
  },
  email: {
    label: "support24@marketpro.com",
    href: "mailto:support24@marketpro.com",
  },
  address: "789 Inner Lane, California, USA",
  appLinks: [
    {
      label: "App Store",
      href: "https://www.apple.com/app-store",
      icon: "ph-fill ph-apple-logo",
    },
    {
      label: "Google Play",
      href: "https://www.apple.com/app-store",
      img: "/images/icon/google-play.svg",
    },
  ],
};

export const footerSections: FooterSection[] = [
  {
    title: "Shopping",
    links: [
      { label: "Careers", to: "/contact" },
      { label: "About Machine", to: "/contact" },
      { label: "Investor Relations", to: "/contact" },
      { label: "Machine Devices", to: "/contact" },
      { label: "Customer Reviews", to: "/contact" },
      { label: "Privacy Policy", to: "/contact" },
      { label: "Contact Us", to: "/contact" },
    ],
  },
  {
    title: "Information",
    links: [
      { label: "Pricing", to: "/shop" },
      { label: "Reviews", to: "/shop" },
      { label: "Affiliate program", to: "/become-seller" },
      { label: "Referral program", to: "/become-seller" },
      { label: "Roadmap", to: "/" },
      { label: "Wall of fame", to: "/" },
      { label: "System status", to: "/contact" },
      { label: "Sitemap", to: "/" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Apple", to: "/shop" },
      { label: "Camera & Photo", to: "/shop" },
      { label: "Cell Phones", to: "/shop" },
      { label: "Computers & Accessories", to: "/shop" },
      { label: "Headphones", to: "/shop" },
      { label: "Smartwatches", to: "/shop" },
      { label: "Sports & Outdoors", to: "/shop" },
      { label: "Television & Video", to: "/shop" },
    ],
  },
  {
    title: "Resource",
    links: [
      { label: "Careers for Blown", to: "/contact" },
      { label: "About Blown", to: "/contact" },
      { label: "Investor Relations", to: "/contact" },
      { label: "Blown Devices", to: "/contact" },
      { label: "Customer reviews", to: "/contact" },
      { label: "Social Responsibility", to: "/contact" },
      { label: "Store Locations", to: "/contact" },
    ],
  },
];
