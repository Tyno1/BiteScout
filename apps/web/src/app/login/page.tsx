"use client";

import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { LoginForm } from "@/components/ui/forms/LoginForm";

const Page = () => {
  const session = useSession();
  const router = useRouter();

  if (session?.data?.user) {
    redirect("/login/loading");
  }

  return (
    <div className="bg-background w-[100vw] h-[100vh] flex items-center justify-center">
      <div className="text-foreground w-[80vw] md:w-[50vw] lg:w-[30vw] min-h-[50%] flex flex-col items-center gap-6">
        <h2 className="font-bold text-2xl">Sign In</h2>
        <LoginForm />
        <div className="flex flex-col ">
          <p className="text-sm">You dont have an account?</p>
          <button
            type="button"
            className="text-primary"
            onClick={() => router.push("/register")}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
