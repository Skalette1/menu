export interface Product {
  id: string;
  name: string;
  category: "drinks" | "desserts" | "hot" | "salads";
  price: number;
}


export const PRODUCTS: Product[] = [
  { id: "d1", name: "Эспрессо", category: "drinks", price: 200 },
  { id: "d2", name: "Капучино", category: "drinks", price: 250 },
  { id: "d3", name: "Латте", category: "drinks", price: 270 },
  { id: "d4", name: "Мокко", category: "drinks", price: 220 },
  { id: "ds1", name: "Чизкейк", category: "desserts", price: 300 },
  { id: "ds2", name: "Шоколадный торт", category: "desserts", price: 320 },
  { id: "ds3", name: "Мороженое", category: "desserts", price: 180 },
  { id: "ds4", name: "Пирожное", category: "desserts", price: 350 },
  { id: "h1", name: "Паста", category: "hot", price: 650 },
  { id: "h2", name: "Бифстроганов", category: "hot", price: 1200 },
  { id: "h3", name: "Ризотто", category: "hot", price: 700 },
  { id: "h4", name: "Курица в соусе", category: "hot", price: 800 },
  { id: "s1", name: "Цезарь", category: "salads", price: 400 },
  { id: "s2", name: "Греческий салат", category: "salads", price: 350 },
  { id: "s3", name: "Овощной микс", category: "salads", price: 320 },
  { id: "s4", name: "Салат с тунцом", category: "salads", price: 300 },
];
