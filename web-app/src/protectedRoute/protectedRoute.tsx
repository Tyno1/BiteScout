import { UserContext } from "@/providers/userContext";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    user,
    isAuthenticated,
    isLoading: auth0Loading,
    error: authError,
    loginWithRedirect,
  } = useAuth0();
  const {
    isLoading: userLoading,
    error: userError,
    userType,
    AuthUser,
  } = useContext(UserContext);

  useEffect(() => {
    if (isAuthenticated && user) {
      AuthUser();
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (
      !userLoading &&
      !auth0Loading &&
      !userError &&
      !authError &&
      isAuthenticated &&
      location.pathname === "/onboarding" // Only redirect from the base path
    ) {
      navigate("/onboarding/roles", { replace: true });
    }
  }, [
    userLoading,
    auth0Loading,
    authError,
    userError,
    navigate,
    isAuthenticated,
    location.pathname,
  ]);

  if (!isAuthenticated && !auth0Loading) {
    // Save current path before redirecting to login
    loginWithRedirect({
      appState: {
        returnTo: window.location.pathname + window.location.search,
      },
    });
    return <div>Redirecting to Login</div>;
  }

  if (auth0Loading || userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-gray-300 border-t-red rounded-full animate-spin"></div>
      </div>
    );
  }

  if (userType?.level > 4) {
    return (
      <div className="w-full h-full">
        You are not authorized to access this page.
      </div>
    );
  }

  return <Outlet />;
};
export default ProtectedRoute;
