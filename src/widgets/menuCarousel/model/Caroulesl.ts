import React, { useState } from "react";
import rouletteCofe1 from "../../../../public/rouletteCofe1.png";
import rouletteCofe2 from "../../../../public/rouletteCofe2.png";
import rouletteCofe3 from "../../../../public/rouletteCofe3.png";
import cappucino from "../../../../public/cappucino.jpg";
import cheesCakePng from "../../../../public/cheesecake-recipe.jpg";
import tiramisuPng from "../../../../public/tiramisu.jpg";
import rizottoPomidor from "../../../../public/risotto-al-pomodoro-e-basilico-260nw-2570085999.webp";
import rizotto from "../../../../public/rizotto.png";
import saladPng from "../../../../public/salad2.png";
import caesar from "../../../../public/caesar.webp";


type CategoryLabel = "Напитки" | "Десерты" | "Горячее" | "Салаты";

export const categories: CategoryLabel[] = ["Напитки", "Десерты", "Горячее", "Салаты"];

export const labelToPath: Record<string, string> = {
  Напитки: "/drinks",
  Десерты: "/desserts",
  Горячее: "/hot",
  Салаты: "/salads",
};

export const products: Record<
  CategoryLabel,
  { id: string; name: string; img: string; price: number }[]
> = {
  Напитки: [
    { id: "d1", name: "Эспрессо", img: rouletteCofe2, price: 200 },
    { id: "d2", name: "Американо", img: rouletteCofe3, price: 220 },
    { id: "d3", name: "Капучино", img: cappucino, price: 250 },
    { id: "d4", name: "Латте", img: rouletteCofe1, price: 270 },
  ],
  Десерты: [
    { id: "ds1", name: "Чизкейк", img: cheesCakePng, price: 300 },
    { id: "ds2", name: "Тирамису", img: tiramisuPng, price: 320 },
    { id: "ds3", name: "Эклер", img: tiramisuPng, price: 180 },
    { id: "ds4", name: "Павлова", img: cheesCakePng, price: 350 },
  ],
  Горячее: [
    { id: "h1", name: "Ризотто с грибами", img: rizottoPomidor, price: 700 },
    { id: "h2", name: "Паста Карбонара", img: rizotto, price: 650 },
    { id: "h3", name: "Стейк", img: rizottoPomidor, price: 1200 },
    { id: "h4", name: "Курица терияки", img: rizotto, price: 800 },
  ],
  Салаты: [
    { id: "s1", name: "Греческий салат", img: saladPng, price: 350 },
    { id: "s2", name: "Цезарь", img: caesar, price: 400 },
    { id: "s3", name: "Оливье", img: caesar, price: 320 },
    { id: "s4", name: "Витаминный", img: saladPng, price: 300 },
  ],
};