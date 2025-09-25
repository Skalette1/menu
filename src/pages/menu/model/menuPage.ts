export interface Product {
  id: string;
  name: string;
  category: "drinks" | "desserts" | "hot" | "salads";
  price: number;
  description?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "d1",
    name: "Эспрессо",
    category: "drinks",
    price: 200,
    description: "Крепкий эспрессо с плотной пенкой и нотками шоколада.",
  },
  {
    id: "d2",
    name: "Капучино",
    category: "drinks",
    price: 250,
    description: "Классический капучино: эспрессо с воздушной молочной пеной.",
  },
  {
    id: "d3",
    name: "Латте",
    category: "drinks",
    price: 270,
    description:
      "Мягкий латте с тёплым молочным вкусом и лёгкой кофейной горчинкой.",
  },
  {
    id: "d4",
    name: "Мокко",
    category: "drinks",
    price: 220,
    description: "Мокко со сливками и шоколадной ноткой.",
  },
  {
    id: "ds1",
    name: "Чизкейк",
    category: "desserts",
    price: 300,
    description: "Нежный чизкейк на сливочной основе с ягодным соусом.",
  },
  {
    id: "ds2",
    name: "Шоколадный торт",
    category: "desserts",
    price: 320,
    description: "Интенсивный шоколадный торт с темной глазурью.",
  },
  {
    id: "ds3",
    name: "Мороженое",
    category: "desserts",
    price: 180,
    description: "Домашнее мороженое из сливок с натуральным вкусом.",
  },
  {
    id: "ds4",
    name: "Пирожное",
    category: "desserts",
    price: 350,
    description: "Изысканное пирожное с хрустящей основой и кремовой начинкой.",
  },
  {
    id: "h1",
    name: "Паста",
    category: "hot",
    price: 650,
    description: "Паста аль денте с соусом на основе томатов и свежих трав.",
  },
  {
    id: "h2",
    name: "Бифстроганов",
    category: "hot",
    price: 1200,
    description: "Говяжий бифстроганов с кремовым соусом и грибами.",
  },
  {
    id: "h3",
    name: "Ризотто",
    category: "hot",
    price: 700,
    description:
      "Ризотто с грибами: рис карнороли, белые грибы, масло оливковое, овощной бульон, чеснок, масло сливочное, сыр дор блю, сыр грана падано, соль, перец, петрушка, базилик, трюфельный крем, тимьян.",
  },
  {
    id: "h4",
    name: "Курица в соусе",
    category: "hot",
    price: 800,
    description:
      "Курица, приготовленная в ароматном сливочном соусе с травами.",
  },
  {
    id: "s1",
    name: "Цезарь",
    category: "salads",
    price: 400,
    description: "Цезарь с хрустящими гренками и соусом на основе ан",
  },
  {
    id: "s2",
    name: "Греческий салат",
    category: "salads",
    price: 350,
    description: "Свежие овощи, оливки и сыр фета с лёгкой заправкой.",
  },
  {
    id: "s3",
    name: "Овощной микс",
    category: "salads",
    price: 320,
    description: "Сезонный овощной салат с травами и оливковым маслом.",
  },
  {
    id: "s4",
    name: "Салат с тунцом",
    category: "salads",
    price: 300,
    description: "Салат с тунцом, яйцом и свежими овощами.",
  },
];
