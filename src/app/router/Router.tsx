import { createHashRouter } from "react-router-dom";
import { HomePage } from "../../pages/home/HomePage";
import { Contact } from "../../pages/contacts/Contact";
import { AboutPage } from "../../pages/about/AboutPage";
import { DessertsPage } from "../../pages/dessertsPage/ui/DessertsPage";
import { DrinksPage } from "../../pages/drinksPage/ui/DrinksPage";
import { HotPage } from "../../pages/hotPage/ui/HotPage";
import { SaladsPage } from "../../pages/saladsPage/ui/SaladsPage";
import { NotFound } from "../../pages/NotFoundPage/NotFoundPage";
import { CartPage } from "../../pages/cart/CartPage";

export const router = createHashRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/contacts",
    element: <Contact />,
  },
  {
    path: "/desserts",
    element: <DessertsPage />,
  },
  {
    path: "/drinks",
    element: <DrinksPage />,
  },
  {
    path: "/hot",
    element: <HotPage />,
  },
  {
    path: "/salads",
    element: <SaladsPage />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
