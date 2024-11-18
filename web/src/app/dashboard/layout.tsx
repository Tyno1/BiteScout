import SideNav from "@/components/ui/Dashboard/SideNav";
import React from "react";

export default function layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="h-screen w-screen grid grid-cols-[20%_80%] gap-0">
      <SideNav />
      <div className="w-full">{children}</div>
    </div>
  );
}
