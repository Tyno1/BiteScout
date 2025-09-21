"use client";

import { credentialRegister } from "@/app/actions";
import { Button, Input } from "@/components/atoms";
import { useRouter } from "next/navigation";
import React, { useActionState, useEffect } from "react";

export function RegisterForm() {
  const [state, formAction] = useActionState(credentialRegister, undefined);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.push("/register/success");
    }
  }, [state?.success, router]);

  return (
    <form action={formAction} className="w-full flex flex-col items-center gap-2">
      <Input
        inputSize="md"
        type="text"
        placeholder="First Name"
        id="first-name"
        name="firstName"
        label="First Name"
        fullWidth
        errorMessage={state?.errors?.firstName?.[0]}
      />

      <Input
        inputSize="md"
        type="text"
        placeholder="Last Name"
        id="last-name"
        name="lastName"
        label="Last Name"
        fullWidth
        errorMessage={state?.errors?.lastName?.[0]}
      />
      <Input
        inputSize="md"
        type="email"
        placeholder="Email"
        id="email"
        name="email"
        label="Email"
        fullWidth
        errorMessage={state?.errors?.email?.[0]}
      />
      <Input
        inputSize="md"
        type="password"
        placeholder="Password"
        id="password"
        name="password"
        label="Password"
        fullWidth
        errorMessage={state?.errors?.password?.[0]}
      />
      <Button type="submit" text="Register" fullWidth variant="solid" />
    </form>
  );
}
