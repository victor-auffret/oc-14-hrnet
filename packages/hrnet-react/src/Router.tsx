import {
 Navigate,
 createBrowserRouter,
} from "react-router-dom";

import App from './App'

import { ErrorComponent } from "./components/error";

import { PageNotFound } from "./pages/not-found";
import { PageHome } from "./pages/home";
import { PageEmployes } from "./pages/employes";

const router = createBrowserRouter([
 {
  path: "/",
  element: <App />,
  errorElement: <PageNotFound />,
  children: [
   {
    path: "/",
    element: <PageHome />
   },
   {
    path: "/employes",
    element: <PageEmployes />
   },
   {
    path: "/404",
    element: <ErrorComponent />
   },
   {
    path: "/*",
    element: <Navigate to="/404" replace />
   }
  ]
 },

]);

export { router }
