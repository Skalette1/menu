import type { Product } from "./types";

export const PRODUCTS: Product[] = [
  // drinks
  { id: "d1", name: "Эспрессо", category: "drinks" },
  { id: "d2", name: "Капучино", category: "drinks" },
  { id: "d3", name: "Латте", category: "drinks" },
  { id: "d4", name: "Мокачино", category: "drinks" },

  // desserts
  { id: "ds1", name: "Чизкейк", category: "desserts" },
  { id: "ds2", name: "Шоколадный торт", category: "desserts" },
  { id: "ds3", name: "Пирожное", category: "desserts" },
  { id: "ds4", name: "Мороженое", category: "desserts" },

  // hot
  { id: "h1", name: "Паста", category: "hot" },
  { id: "h2", name: "Бифстроганов", category: "hot" },
  { id: "h3", name: "Курица терияки", category: "hot" },
  { id: "h4", name: "Ризотто", category: "hot" },

  // salads
  { id: "s1", name: "Цезарь", category: "salads" },
  { id: "s2", name: "Греческий салат", category: "salads" },
  { id: "s3", name: "Витаминный салат", category: "salads" },
  { id: "s4", name: "Тёплый салат с креветками", category: "salads" },
];
