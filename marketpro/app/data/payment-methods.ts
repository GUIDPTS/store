export interface PaymentMethod {
  id: string;
  label: string;
  description: string;
}

export const paymentMethods: PaymentMethod[] = [
  {
    id: "payment1",
    label: "Direct Bank transfer",
    description:
      "Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.",
  },
  {
    id: "payment2",
    label: "Check payments",
    description:
      "Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.",
  },
  {
    id: "payment3",
    label: "Cash on delivery",
    description:
      "Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.",
  },
];
