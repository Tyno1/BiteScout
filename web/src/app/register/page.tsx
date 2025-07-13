"use client";

import { RegisterForm } from "@/components/ui";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

const Page = () => {
  const session = useSession();
  const router = useRouter();

  if (session?.data?.user) {
    redirect("/onboarding/roles");
  }

  return (
    <div className="bg-foreground w-[100vw] h-[100vh] flex items-center justify-center">
      <div className="text-background w-[80vw] md:w-[50vw] lg:w-[30vw] min-h-[50%] flex flex-col items-center gap-6">
        <h1 className="font-bold text-2xl">Register</h1>
        <RegisterForm />
        <div className="flex flex-col gap-2">
          <p className="text-sm">Already have an account?</p>
          <button
            type="button"
            className="text-primary"
            onClick={() => router.push("/login")}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
