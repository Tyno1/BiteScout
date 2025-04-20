"use client";

import Button from "@/components/atoms/buttons/Button";
import React from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-semibold text-green-600 mb-4">
          Registration Successful
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for registering! You can now log in to your account.
        </p>
        <Button
          text="Go To Login"
          variant="solid"
          onClick={() => router.push("/login")}
          fullWidth
        />
      </div>
    </div>
  );
};

export default Page;
