"use client";

import type { Session } from "next-auth";
import { createContext, useContext } from "react";

interface DashboardSessionContextType {
  session: Session | null;
}

const DashboardSessionContext = createContext<DashboardSessionContextType | undefined>(undefined);

export function DashboardSessionProvider({ 
  children, 
  session 
}: { 
  children: React.ReactNode; 
  session: Session | null; 
}) {
  return (
    <DashboardSessionContext.Provider value={{ session }}>
      {children}
    </DashboardSessionContext.Provider>
  );
}

export function useDashboardSession() {
  const context = useContext(DashboardSessionContext);
  if (context === undefined) {
    throw new Error('useDashboardSession must be used within a DashboardSessionProvider');
  }
  return context;
}
