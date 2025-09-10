import { createHashRouter } from "react-router-dom";
import { HomePage } from "../../pages/home/HomePage";
import { Contact } from "../../pages/contacts/Contact";

export const router = createHashRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/contacts",
    element: <Contact />,
  },
]);
