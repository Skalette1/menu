import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from './router/Router.tsx'
import { RouterProvider } from 'react-router-dom'
router
createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />,
);