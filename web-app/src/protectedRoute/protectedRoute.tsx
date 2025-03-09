import { UserContext } from "@/providers/userContext";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import { Outlet } from "react-router";

const ProtectedRoute = () => {
  const {
    isAuthenticated,
    isLoading: Auth0Loading,
    loginWithRedirect,
  } = useAuth0();
  const { isLoading: UserLoading, userType } = useContext(UserContext);

  if (!isAuthenticated) {
    loginWithRedirect();
    return;
  }

  if (Auth0Loading || UserLoading) {
    return <div>Loading...</div>;
  }

  if (userType?.level > 4) {
    return (
      <div className="w-full h-full ">
        You are not authorized to access this page.
      </div>
    );
  }

  return <Outlet />;
};
export default ProtectedRoute;
