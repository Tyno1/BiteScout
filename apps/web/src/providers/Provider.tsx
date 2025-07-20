import React from "react";

import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
type ProviderProps ={
  children: React.ReactNode;
  session:Session | null;
}
const Provider = ({ children, session }: ProviderProps) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;