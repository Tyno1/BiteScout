"use client";
import SideNav from "@/components/ui/Dashboard/SideNav";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, []);
  return (
    <div className="h-[screen] w-screen grid grid-cols-[20%_80%] gap-0 fixed">
      <SideNav />
      <div className="w-full h-[100vh] overflow-y-auto">{children}</div>
    </div>
  );
}
