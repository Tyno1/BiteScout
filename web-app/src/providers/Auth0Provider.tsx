import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router";

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

// Wrapper component to access navigation functions
const Auth0ProviderWithNavigate = ({ children }: any) => {
  // Use React Router's useNavigate hook
  const navigate = useNavigate();

  const onRedirectCallback = (appState: any) => {
    // Navigate to the URL stored in appState or default to hub
    navigate(appState?.returnTo || "/hub");
  };

  return (
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
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigate;
