import React, { useEffect } from "react";
import { createContext, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { IUser } from "@/types/user";
import { IUserType } from "@/types/userType";

interface UserContextType {
  userData: IUser;
  isLoading: boolean;
  error: any;
  AuthUser: () => Promise<void>;
  userType: IUserType;
  UpdateUserRestaurantCountAndUserTpe: (userId: string) => Promise<void>;
  token: string;
  tokenLoading: boolean;
  tokenError: any;
}

interface UserProviderType {
  children: React.ReactNode;
}

const UserContext = createContext({} as UserContextType);

const UserProvider = ({ children }: UserProviderType) => {
  const DEFAULT_USER = {
    auth0Id: "",
    name: "",
    email: "",
    emailVerified: true,
    userType: "",
    locale: "",
    lastLogin: new Date(),
    preferences: {
      foodDietaryPreferences: [],
      cookingStyle: "",
    },
    metadata: {},
    restaurantCount: 0,
  };
  const serverApi = import.meta.env.VITE_BACKEND_SERVER;
  const { getAccessTokenSilently } = useAuth0();
  const [userData, setUserData] = useState<IUser>(DEFAULT_USER);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [tokenLoading, setTokenLoading] = useState(false);
  const [tokenError, setTokenError] = useState<any>("");
  const [token, setToken] = useState("");
  const [userType, setUserType] = useState<IUserType>({
    _id: "",
    name: "",
    description: "",
    level: 0,
  });

  const { user, isAuthenticated } = useAuth0();

  const AuthUser = async () => {
    setIsLoading(true);
    // Try to load from session storage first
    const cachedUser = sessionStorage.getItem("user");
    if (cachedUser) {
      try {
        const parsedUser = JSON.parse(cachedUser);
        setUserData(parsedUser);
        setIsLoading(false);
        return; // Exit early if we have cached data
      } catch (e) {
        // Invalid JSON in storage, continue to API call
        sessionStorage.removeItem("user");
      }
    }
    console.log("not stored");

    // If not cached, fetch user data from API
    if (user && isAuthenticated) {
      try {
        const token = await getAccessTokenSilently();
        const response = await axios.get(`${serverApi}/api/protected`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setIsLoading(false);
        setUserData(response?.data);
        sessionStorage.setItem("user", JSON.stringify(response.data));
      } catch (error) {
        setError(error);
        console.error("Failed to fetch API");
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };

  const GetUserTypeById = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = await getAccessTokenSilently();

      const response = await axios.get(
        `${serverApi}/api/user-types/${userData?.userType}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUserType(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
      console.error("Failed to fetch user type");
    }
  };

  const UpdateUserRestaurantCountAndUserTpe = async (userId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const token = await getAccessTokenSilently();

      const response = await axios.put(
        `${serverApi}/api/users/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsLoading(false);
      sessionStorage.setItem("user", JSON.stringify(response.data));
      setUserData(response.data.user);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  const fetchToken = async () => {
    if (!isAuthenticated) return;

    setTokenLoading(true);
    try {
      const accessToken = await getAccessTokenSilently();
      setToken(accessToken);
      setTokenError(null);
    } catch (error) {
      console.error("Failed to get token:", error);
      setTokenError(
        error instanceof Error ? error : new Error("Unknown error")
      );
    } finally {
      setTokenLoading(false);
    }
  };

  // Fetch token when auth state changes
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      fetchToken();
    }
  }, [isLoading, isAuthenticated]);

  useEffect(() => {
    if (userData?.userType) {
      GetUserTypeById();
    }
  }, [userData?.userType]);

  return (
    <UserContext.Provider
      value={{
        userData,
        AuthUser,
        isLoading,
        error,
        userType,
        UpdateUserRestaurantCountAndUserTpe,
        token,
        tokenLoading,
        tokenError,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
