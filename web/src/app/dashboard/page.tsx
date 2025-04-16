"use client";

import { useSession } from "next-auth/react";

export default function page() {
  const session = useSession();
  console.log(session);
  

  return <div className="w-full min-h-[100vh] bg-orange">Dash Home</div>;
}
