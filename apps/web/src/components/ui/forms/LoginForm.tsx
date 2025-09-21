"use client";

import React, { useActionState, useEffect } from "react";

import { doCredentialLogin } from "@/app/actions";
import { Button, Input } from "@/components/atoms";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const [state, loginAction, isPending] = useActionState(doCredentialLogin, undefined);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.push("/login/loading");
    }
  }, [state, router]);

  return (
    <form action={loginAction} className="w-full flex flex-col items-center gap-2">
      <Input
        required
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
        label="password"
        fullWidth
        errorMessage={state?.errors?.password?.[0]}
      />

      <Button
        disabled={isPending}
        type="submit"
        fullWidth
        variant="solid"
        text="Credential Login"
      />
    </form>
  );
}
