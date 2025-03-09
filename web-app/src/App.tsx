import { Auth0Provider } from "@auth0/auth0-react";
import { ReduxProvider } from "./providers/ReduxProvider";
import { UserProvider } from "./providers/userContext";
import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/home";
import About from "./components/pages/about";
import Contact from "./components/pages/contact";
import Services from "./components/pages/services";
import Login from "./components/pages/auth/Login";
import Hub from "./components/pages/onboarding/hub";
import ProtectedRoute from "./protectedRoute/protectedRoute";
import OnboardingLayout from "./components/pages/onboarding";
import Roles from "./components/pages/onboarding/roles";
import RestaurantSearch from "./components/pages/onboarding/restaurantSearch";
import Layout from "./components/pages/dashboard/layout";
import Dashboard from "./components/pages/dashboard";
import RestaurantProfile from "./components/pages/dashboard/restaurant-profile";

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

  return (
    <ReduxProvider>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: audience,
          scope: "openid profile email offline_access",
        }}
        onRedirectCallback={onRedirectCallback}
      >
        <UserProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
            <Route path="/login" element={<Login />} />
            <Route path="/hub" element={<Hub />} />

            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              {/* Onboarding routes */}
              <Route path="/onboarding" element={<OnboardingLayout />}>
                <Route path="roles" element={<Roles />} />
                <Route
                  path="restaurant-search"
                  element={<RestaurantSearch />}
                />
              </Route>

              {/* Dashboard routes */}
              <Route path="/dashboard" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route
                  path="restaurant-profile"
                  element={<RestaurantProfile />}
                />
                <Route
                  path="food-catalogue"
                  element={<div>Food Catalogue</div>}
                />
                <Route
                  path="user-management"
                  element={<div>User Management</div>}
                />
                <Route
                  path="notifications"
                  element={<div>Notifications</div>}
                />
                <Route path="analytics" element={<div>Analytics</div>} />
                <Route path="reviews" element={<div>Reviews</div>} />
                <Route path="ai-audio" element={<div>AI Audio Reviews</div>} />
                <Route path="settings" element={<div>Customer Insights</div>} />
                <Route
                  path="customer-insight"
                  element={<div>Customer Insights</div>}
                />
              </Route>
            </Route>

            {/* 404 route */}
            <Route path="*" element={<div>404 not Found</div>} />
          </Routes>
        </UserProvider>
      </Auth0Provider>
    </ReduxProvider>
  );
};

export default App;
