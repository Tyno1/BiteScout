"use client";

import { doCrednentialLogin } from "@/app/actions";
import { signIn } from "@/auth";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const RegisterForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const payload = {
        firstName: formData.get("first-name"),
        lastName: formData.get("last-name"),
        email: formData.get("email"),
        password: formData.get("password"),
      };

      const response: any = await axios.post(
        `${API_URL}/api/register`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response?.error) {
        setError(response.error.message);
      } else {
        setLoading(false);
        console.log("Registration successful");

        await doCrednentialLogin(formData);
        router.push("/onboarding/roles");
        console.log("Login successful");
      }
    } catch (error) {
      console.log(error);
      setError("Check your credentials");
    }
  };

  return (
    <form
      action="post"
      className="w-full flex flex-col gap-2"
      onSubmit={handleSubmit}
    >
      {error && <div className="text-red">{error}</div>}
      <input
        className="text-sm w-full py-4 px-4 bg-white rounded text-black"
        placeholder="John"
        type="text"
        name="first-name"
        id="first-name"
      />
      <input
        className="text-sm w-full py-4 px-4 bg-white rounded text-black"
        placeholder="Doe"
        type="text"
        name="last-name"
        id="last-name"
      />
      <input
        className="text-sm w-full py-4 px-4 bg-white rounded text-black"
        placeholder="john@doe.com"
        type="email"
        name="email"
        id="email"
      />
      <input
        className="text-sm w-full py-4 px-4 bg-white rounded text-black"
        placeholder="*******"
        type="password"
        name="password"
        id="password"
      />
      <button className="text-sm font-bold w-full py-2 px-4 bg-red rounded text-white">
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
