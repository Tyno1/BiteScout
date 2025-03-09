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
  const [userType, setUserType] = useState<IUserType>({
    _id: "",
    name: "",
    description: "",
    level: 0,
  });

  const { user, isAuthenticated } = useAuth0();

  const AuthUser = async () => {
    setIsLoading(true);
    console.log("stored");

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
        sessionStorage.setItem("userToken", JSON.stringify(token));
        console.log("Token received:", token.substring(0, 10) + "..."); // Log first part of token

        const response = await axios.get(`${serverApi}/api/protected`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setIsLoading(false);
        setUserData(response.data);
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

  useEffect(() => {
    if (userData?.userType) {
      GetUserTypeById();
    }
  }, [userData?.userType]);

  return (
    <UserContext.Provider
      value={{ userData, AuthUser, isLoading, error, userType }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
