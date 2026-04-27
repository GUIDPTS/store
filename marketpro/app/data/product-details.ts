export interface ProductDetails {
  id: number;
  title: string;
  description: string;
  sku: string;
  rating: number;
  ratingCount: number;
  price: number;
  oldPrice?: number;
  availableQty: number;
  vendor: string;
  thumbs: string[];
  images: string[];
  offerEndsIn?: string;
  coupon?: string;
  offers?: string[];
}

export const productDetails: ProductDetails = {
  id: 101,
  title: "Lay's Potato Chips Onion Flavored",
  description:
    "Vivamus adipiscing nisl ut dolor dignissim semper. Nulla luctus malesuada tincidunt. Class aptent taciti sociosqu ad litora torquent",
  sku: "EB4DRP",
  rating: 4.7,
  ratingCount: 21671,
  price: 25.0,
  oldPrice: 38.0,
  availableQty: 45,
  vendor: "Marketpro",
  thumbs: [
    "/images/thumbs/product-details-thumb1.png",
    "/images/thumbs/product-details-thumb2.png",
    "/images/thumbs/product-details-thumb3.png",
    "/images/thumbs/product-details-thumb1.png",
    "/images/thumbs/product-details-thumb2.png",
    "/images/thumbs/product-details-thumb1.png",
    "/images/thumbs/product-details-thumb2.png",
    "/images/thumbs/product-details-thumb3.png",
  ],
  images: [
    "/images/thumbs/product-details-img1.png",
    "/images/thumbs/product-details-img2.png",
    "/images/thumbs/product-details-img3.png",
    "/images/thumbs/product-details-img1.png",
    "/images/thumbs/product-details-img2.png",
    "/images/thumbs/product-details-img1.png",
    "/images/thumbs/product-details-img2.png",
    "/images/thumbs/product-details-img3.png",
  ],
  offerEndsIn: "2025-12-31T23:59:59",
  coupon: "Mfr. coupon. $3.00 off 5",
  offers: ["Buy 1, Get 1 FREE", "Buy 1, Get 1 FREE"],
};
