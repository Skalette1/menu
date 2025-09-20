import { createHashRouter } from "react-router-dom";
import { HomePage } from "../../pages/home/HomePage";
import { MenuPage } from "../../pages/menu/ui/MenuPage";
import DishDetailsPage from "../../pages/dish/DishDetailsPage";
import { NotFound } from "../../pages/NotFoundPage/NotFoundPage";
import { CartPage } from "../../pages/cart/CartPage";

export const router = createHashRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/desserts",
    element: <MenuPage category="desserts" />,
  },
  {
    path: "/drinks",
    element: <MenuPage category="drinks" />,
  },
  {
    path: "/hot",
    element: <MenuPage category="hot" />,
  },
  {
    path: "/salads",
    element: <MenuPage category="salads" />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "/dish/:id",
    element: <DishDetailsPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
