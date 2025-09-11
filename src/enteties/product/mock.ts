import type { Product } from "./types";

export const PRODUCTS: Product[] = [
  // drinks
  { id: "d1", name: "Эспрессо", category: "напитки" },
  { id: "d2", name: "Капучино", category: "напитки" },
  { id: "d3", name: "Латте", category: "напитки" },
  { id: "d4", name: "Мокачино", category: "напитки" },

  // desserts
  { id: "ds1", name: "Чизкейк", category: "десерты" },
  { id: "ds2", name: "Шоколадный торт", category: "десерты" },
  { id: "ds3", name: "Пирожное", category: "десерты" },
  { id: "ds4", name: "Мороженое", category: "десерты" },

  // hot
  { id: "h1", name: "Паста", category: "горячее" },
  { id: "h2", name: "Бифстроганов", category: "горячее" },
  { id: "h3", name: "Курица терияки", category: "горячее" },
  { id: "h4", name: "Ризотто", category: "горячее" },

  // salads
  { id: "s1", name: "Цезарь", category: "салаты" },
  { id: "s2", name: "Греческий салат", category: "салаты" },
  { id: "s3", name: "Витаминный салат", category: "салаты" },
  { id: "s4", name: "Тёплый салат с креветками", category: "салаты" },
];
