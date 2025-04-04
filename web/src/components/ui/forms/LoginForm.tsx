"use client";

import React, { useState } from "react";

import { doCrednentialLogin } from "@/app/actions";
import { useRouter } from "next/navigation";
import Button from "@/components/atoms/buttons/Button";

const LoginForm: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);

      const response: any = await doCrednentialLogin(formData);

      if (!!response?.error) {
        setError(response.error.message);
      } else {
        setLoading(false);
        console.log("Login successful");
        router.replace("/login/loading");
      }
    } catch (error) {
      console.log(error);
      setError("Check your credentials");
    }
  };

  return (
    <form
      action="post"
      className="w-full flex flex-col items-center gap-2"
      onSubmit={handleSubmit}
    >
      {error && <div className="text-red-500">{error}</div>}
      <input
        className="text-sm w-full py-4 px-4 bg-white rounded text-black"
        placeholder="email"
        type="email"
        name="email"
        id="email"
      />
      <input
        className="text-sm w-full py-4 px-4 bg-white rounded text-black"
        placeholder="password"
        type="password"
        name="password"
        id="password"
      />
      <Button fullWidth variant="solid" text="Credential Login" />{" "}
    </form>
  );
};

export default LoginForm;
