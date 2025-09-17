import cofePng from "../../../../public/cofe.png";
import dessertPng from "../../../../public/desert.png";
import hotPng from "../../../../public/hotFood.png";
import saladsPng from "../../../../public/salad.png";

interface MenuItem {
  id: number;
  name: string;
  image: string;
  path: string;
}

export const menuItems: MenuItem[] = [
  { id: 1, name: "Напитки", image: cofePng, path: "/drinks" },
  { id: 2, name: "Десерты", image: dessertPng, path: "/desserts" },
  { id: 3, name: "Горячее", image: hotPng, path: "/hot" },
  { id: 4, name: "Салаты", image: saladsPng, path: "/salads" },
];
