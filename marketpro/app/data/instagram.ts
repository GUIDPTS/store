export interface InstagramItem {
  id: number;
  src: string;
  alt: string;
  link: string;
  animationDuration: number;
}

export const instagramItems: InstagramItem[] = [
  {
    id: 1,
    src: "/images/thumbs/instagram-img1.png",
    alt: "Instagram image 1",
    link: "https://www.instagram.com",
    animationDuration: 400,
  },
  {
    id: 2,
    src: "/images/thumbs/instagram-img2.png",
    alt: "Instagram image 2",
    link: "https://www.instagram.com",
    animationDuration: 600,
  },
  {
    id: 3,
    src: "/images/thumbs/instagram-img3.png",
    alt: "Instagram image 3",
    link: "https://www.instagram.com",
    animationDuration: 800,
  },
  {
    id: 4,
    src: "/images/thumbs/instagram-img4.png",
    alt: "Instagram image 4",
    link: "https://www.instagram.com",
    animationDuration: 1000,
  },
  {
    id: 5,
    src: "/images/thumbs/instagram-img2.png",
    alt: "Instagram image 5",
    link: "https://www.instagram.com",
    animationDuration: 1200,
  },
];
