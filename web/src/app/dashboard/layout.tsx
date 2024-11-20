import SideNav from "@/components/ui/Dashboard/SideNav";
import React from "react";

export default function layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="h-[screen] w-screen grid grid-cols-[20%_80%] gap-0 fixed">
      <SideNav />
      <div className="w-full h-[100vh] overflow-y-auto">{children}</div>
    </div>
  );
}
