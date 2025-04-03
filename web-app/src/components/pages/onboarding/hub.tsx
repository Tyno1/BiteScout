import { useContext, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from "@/providers/userContext";
import { useNavigate } from "react-router";

const Hub = () => {
  const {
    getAccessTokenSilently,
    isAuthenticated,
    user,
    isLoading: authLoading,
    error: authError,
  } = useAuth0();
  const { AuthUser, isLoading, error } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      AuthUser();
    }
  }, [getAccessTokenSilently, isAuthenticated, user]);

  useEffect(() => {
    if (!isLoading && !authLoading && !error && !authError && isAuthenticated) {
      navigate("/onboarding/roles", { replace: true });
    }
  }, [isLoading, authLoading, authError, error, navigate, isAuthenticated]);

  if (isLoading || authLoading) {
    return <div>Loading...</div>;
  }
  if (error || authError) {
    console.log(authError);

    return <div>Oops... {error}</div>;
  }

  return <div>Redirecting to dashboard</div>;
};
export default Hub;
