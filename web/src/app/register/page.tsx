"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import SocialLogin from "@/components/forms/SocialLogin";
import RegisterForm from "@/components/forms/RegisterForm";

const Page = () => {
  const session = useSession();
  const router = useRouter();

  if (session?.data?.user) {
    redirect("/onboarding/roles");
  }

  return (
    <div className="bg-black w-[100vw] h-[100vh] flex items-center justify-center">
      <div className="text-white w-[25%] min-h-[50%] flex flex-col items-center gap-6">
        <h2 className="font-bold text-2xl">Register</h2>
        <RegisterForm />
        <p>Or</p>
        <SocialLogin />
        <div className="flex flex-col ">
          <p className="text-sm">Already have an account?</p>
          <button className="text-red" onClick={() => router.push("/login")}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
