"use client";

import type { Session } from "next-auth";
import { useEffect, useState } from "react";
import { getCurrentSession } from "@/app/actions/getSessionAction";

export function useGetSession() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const session = await getCurrentSession();    
      setSession(session);
    }
    getSession();
  }, []);

  return session;
}