import type React from "react";

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { QueryProvider } from "./QueryProvider";

type ProviderProps = {
  children: React.ReactNode;
  session: Session | null;
};

const Provider = ({ children, session }: ProviderProps) => {
  return (
    <QueryProvider>
      <SessionProvider session={session}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </SessionProvider>
    </QueryProvider>
  );
};

export default Provider;
