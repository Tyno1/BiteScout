"use client";
import SideNav from "@/components/ui/Dashboard/SideNav";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
 
export default function layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = useSession();
  if (!session?.data?.user) {
    redirect("/login");
  }

  if (session.status !== "authenticated") {
    redirect("/login");
  }

  return (
    <div className="h-[screen] w-screen grid grid-cols-[20%_80%] gap-0 fixed">
      <SideNav />
      <div className="w-full h-[100vh] overflow-y-auto">{children}</div>
    </div>
  );
}
