import React from "react";

import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
type ProviderProps ={
  children: React.ReactNode;
  session:Session | null;
}
const Provider = ({ children, session }: ProviderProps) => {
  return (
    <SessionProvider 
      session={session}
      refetchInterval={5 * 60} // Refetch every 5 minutes instead of default
      refetchOnWindowFocus={false} // Don't refetch when window gains focus
    >
      {children}
    </SessionProvider>
  );
};

export default Provider;