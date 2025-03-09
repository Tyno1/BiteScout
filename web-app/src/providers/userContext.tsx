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
  const DefaultUser = {
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
  };
  const serverApi = import.meta.env.VITE_BACKEND_SERVER;
  const { getAccessTokenSilently } = useAuth0();
  const [userData, setUserData] = useState<IUser>(DefaultUser);
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState(null);
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
    if (user && isAuthenticated) {
      try {
        const token = await getAccessTokenSilently();
        console.log("Token received:", token.substring(0, 10) + "..."); // Log first part of token

        const response = await axios.get(`${serverApi}/api/protected`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
        console.error("Failed to fetch API");
      }
    } else {
      setIsLoading(false);
      setUserData(DefaultUser);
      setSession(null);
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
