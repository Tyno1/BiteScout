"use client";

import { LoginForm } from "@/components/ui/forms/LoginForm";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

const Page = () => {
  const session = useSession();
  const router = useRouter();

  if (session?.data?.user) {
    redirect("/login/loading");
  }

  return (
    <div className="bg-foreground w-[100vw] h-[100vh] flex items-center justify-center">
      <div className="text-background w-[40%] min-h-[50%] flex flex-col items-center gap-6">
        <h2 className="font-bold text-2xl">Sign In</h2>
        <LoginForm />
        <div className="flex flex-col ">
          <p className="text-sm">You dont have an account?</p>
          <button type="button" className="text-primary" onClick={() => router.push("/register")}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
