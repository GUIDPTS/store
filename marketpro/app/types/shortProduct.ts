export interface Product {
  id: string | number;
  imgSrc: string;
  imgAlt: string;
  rating: number;
  ratingCount: number | string;
  title: string;
  priceCurrent: string | number;
  priceOld?: string | number;
}
