export interface Comment {
  id: number;
  name: string;
  date: string;
  avatar: string;
  text: string;
}

export const comments: Comment[] = [
  {
    id: 1,
    name: "Marvin McKinney",
    date: "26 Apr, 2024",
    avatar: "/images/thumbs/comment-img1.png",
    text: "In a nisi commodo, porttitor ligula consequat, tincidunt dui. Nulla volutpat, metus eu aliquam malesuada, elit libero venenatis urna, consequat maximus arcu diam non diam.",
  },
  {
    id: 2,
    name: "Kristin Watson",
    date: "24 Apr, 2024",
    avatar: "/images/thumbs/comment-img2.png",
    text: "Quisque eget tortor lobortis, facilisis metus eu, elementum est. Nunc sit amet erat quis ex convallis suscipit. Nam hendrerit, velit ut aliquam euismod, nibh tortor rutrum nisi, ac sodales nunc eros porta nisi. Sed scelerisque, est eget aliquam venenatis, est sem tempor eros.",
  },
  {
    id: 3,
    name: "Jenny Wilson",
    date: "20 Apr, 2024",
    avatar: "/images/thumbs/comment-img3.png",
    text: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.",
  },
  {
    id: 4,
    name: "Robert Fox",
    date: "18 Apr, 2024",
    avatar: "/images/thumbs/comment-img4.png",
    text: "Pellentesque feugiat, nibh vel vehicula pretium, nibh nibh bibendum elit, a volutpat arcu dui nec orci. Aenean dui odio, ullamcorper quis turpis ac, volutpat imperdiet ex.",
  },
  {
    id: 5,
    name: "Eleanor Pena",
    date: "7 Apr, 2024",
    avatar: "/images/thumbs/comment-img5.png",
    text: "Nulla molestie interdum ultricies.",
  },
];
