export type Category = "напитки" | "десерты" | "горячее" | "салаты";

export interface Product {
  id: string;
  name: string;
  category: Category;
  image?: string;
  price?: number;
}
