export interface Currency {
  id: number;
  text: string;
  flag: string;
}

export const currencies: Currency[] = [
  {
    id: 1,
    text: "USD",
    flag: "/images/thumbs/flag1.png",
  },
  {
    id: 2,
    text: "Yen",
    flag: "/images/thumbs/flag2.png",
  },
  {
    id: 3,
    text: "EURO",
    flag: "/images/thumbs/flag4.png",
  },
  {
    id: 4,
    text: "BDT",
    flag: "/images/thumbs/flag6.png",
  },
  {
    id: 5,
    text: "WON",
    flag: "/images/thumbs/flag5.png",
  },
];
