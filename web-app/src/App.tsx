import { Auth0Provider } from "@auth0/auth0-react";
import { ReduxProvider } from "./providers/ReduxProvider";
import { UserProvider } from "./providers/userContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/pages/home";
import About from "./components/pages/about";
import Contact from "./components/pages/contact";
import Services from "./components/pages/services";
import Hub from "./components/pages/onboarding/hub";
import ProtectedRoute from "./protectedRoute/protectedRoute";
import OnboardingLayout from "./components/pages/onboarding";
import Roles from "./components/pages/onboarding/roles";
import RestaurantSearch from "./components/pages/onboarding/restaurantSearch";
import Layout from "./components/pages/dashboard/layout";
import Dashboard from "./components/pages/dashboard";
import RestaurantProfile from "./components/pages/dashboard/restaurant-profile";
import { ToastContainer } from "react-toastify";

const App = () => {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE;
  const onRedirectCallback = (appState: any) => {
    window.history.replaceState(
      {},
      document.title,
      appState?.returnTo || "/hub"
    );
  };

  // Create the router configuration
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
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
      path: "/hub",
      element: <Hub />,
    },
    // Protected routes
    {
      element: <ProtectedRoute />,
      children: [
        // Onboarding routes
        {
          path: "/onboarding",
          element: <OnboardingLayout />,
          children: [
            {
              path: "roles",
              element: <Roles />,
            },
            {
              path: "restaurant-search",
              element: <RestaurantSearch />,
            },
          ],
        },
        // Dashboard routes
        {
          path: "/dashboard",
          element: <Layout />,
          children: [
            {
              index: true,
              element: <Dashboard />,
            },
            {
              path: "restaurant-profile",
              element: <RestaurantProfile />,
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
            },
            {
              path: "customer-insight",
              element: <div>Customer Insights</div>,
            },
          ],
        },
      ],
    },
    // 404 route
    {
      path: "*",
      element: <div>404 not Found</div>,
    },
  ]);

  return (
    <ReduxProvider>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
          redirect_uri: window.location.origin + "/onboarding/roles",
          audience: audience,
          scope: "openid profile email offline_access",
        }}
        onRedirectCallback={onRedirectCallback}
      >
        <UserProvider>
          <RouterProvider router={router} />
          <ToastContainer />
        </UserProvider>
      </Auth0Provider>
    </ReduxProvider>
  );
};

export default App;
