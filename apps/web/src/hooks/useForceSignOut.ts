import { signOut } from "next-auth/react";
import { useState } from "react";

export const useForceSignOut = () => {
  const [isSigningOut, setIsSigningOut] = useState(false);

  const forceSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut({ redirect: false });
      window.location.reload();
    } catch (error) {
      console.error("Failed to force sign out:", error);
    } finally {
      setIsSigningOut(false);
    }
  };

  return {
    forceSignOut,
    isSigningOut,
  };
};
