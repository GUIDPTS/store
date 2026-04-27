export interface ShippingItem {
  id: number;
  iconClass: string;
  title: string;
  description: string;
  aosDuration: number;
}

export const shippingItems: ShippingItem[] = [
  {
    id: 1,
    iconClass: "ph-fill ph-car-profile",
    title: "Free Shipping",
    description: "Free shipping all over the US",
    aosDuration: 400,
  },
  {
    id: 2,
    iconClass: "ph-fill ph-hand-heart",
    title: "100% Satisfaction",
    description: "Free shipping all over the US",
    aosDuration: 600,
  },
  {
    id: 3,
    iconClass: "ph-fill ph-credit-card",
    title: "Secure Payments",
    description: "Free shipping all over the US",
    aosDuration: 800,
  },
  {
    id: 4,
    iconClass: "ph-fill ph-chats",
    title: "24/7 Support",
    description: "Free shipping all over the US",
    aosDuration: 1000,
  },
];
