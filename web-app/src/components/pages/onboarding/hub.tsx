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
    AuthUser();
  }, [getAccessTokenSilently, isAuthenticated, user]);

  useEffect(() => {
    if (!isLoading && !error && isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isLoading, error, navigate]);

  if (isLoading && authLoading) {
    return <div>Loading...</div>;
  }
  if (error && authError) {
    return <div>Oops... {error.message}</div>;
  }

  return <div>Redirecting to dashboard</div>;
};
export default Hub;
