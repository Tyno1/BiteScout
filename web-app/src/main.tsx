import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "@/components/pages/home";
import About from "./components/pages/about";
import Contact from "./components/pages/contact";
import Services from "./components/pages/services";
import Login from "./components/pages/auth/Login";
import Layout from "./components/pages/dashboard/layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <div> 404 not Found</div>,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/services",
    element: <Services />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Layout />,
    children: [
      {
        path: "/dashboard",
        element: <div>Dashboard</div>,
      },
      {
        path: "restaurant-profile",
        element: <div>Restaurant Profile</div>,
      },
      {
        path: "food-catalogue",
        element: <div>Food Catalogue</div>,
      },
      {
        path: "user-management",
        element: <div>User Management</div>,
      },
      {
        path: "notifications",
        element: <div>Notifications</div>,
      },
      {
        path: "analytics",
        element: <div>Analytics</div>,
      },
      {
        path: "reviews",
        element: <div>Reviews</div>,
      },
      {
        path: "ai-audio",
        element: <div>AI Audio Reviews</div>,
      },
      {
        path: "settings",
        element: <div>Customer Insights</div>,
      }, {
        path: "customer-insight",
        element: <div>Customer Insights</div>,
      }
    ],
  },
  // Add more routes as needed
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
