export type Category = "drinks" | "desserts" | "hot" | "salads";

export interface Product {
  id: string;
  name: string;
  category: Category;
  image?: string;
  price?: number;
}
