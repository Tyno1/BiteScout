"use client";

import { doCrednentialLogin } from "@/app/actions";
import Button from "@/components/atoms/buttons/Button";
import Input from "@/components/atoms/inputs/Input";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const RegisterForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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

      <Input
        label="first-name"
        placeholder="John"
        type="text"
        name="first-name"
        id="first-name"
        fullWidth
      />

      <Input
        label="last-name"
        placeholder="Doe"
        type="text"
        name="last-name"
        id="last-name"
        fullWidth
      />
      <Input
        label="email"
        placeholder="Email"
        type="email"
        name="email"
        id="email"
        fullWidth
      />
      <Input
        label="Password"
        placeholder="Password"
        type="password"
        name="password"
        id="password"
        fullWidth
        rightButton={showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
        rightButtonStyle="text-gray-700"
        rightButtonOnClick={() => setShowPassword(!showPassword)}
      />
      <Button
        variant="solid"
        color="primary"
        type="submit"
        text={loading ? "Loading..." : "Register"}
      />
    </form>
  );
};

export default RegisterForm;
