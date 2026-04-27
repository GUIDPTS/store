export interface BannerItem {
  id: number;
  startingPrice: number;
  title: string;
  link: string;
  bgImage: string;
  thumbImage: string;
}

export const bannerItems: BannerItem[] = [
  {
    id: 1,
    startingPrice: 250,
    title: "Get The Sound You Love For Less",
    link: "/shop",
    bgImage: "/images/bg/banner-two-bg.png",
    thumbImage: "/images/thumbs/banner-two-img.png",
  },
  {
    id: 2,
    startingPrice: 250,
    title: "Get The Sound You Love For Less",
    link: "/shop",
    bgImage: "/images/bg/banner-two-bg.png",
    thumbImage: "/images/thumbs/banner-two-img.png",
  },
  {
    id: 3,
    startingPrice: 250,
    title: "Get The Sound You Love For Less",
    link: "/shop",
    bgImage: "/images/bg/banner-two-bg.png",
    thumbImage: "/images/thumbs/banner-two-img.png",
  },
];
