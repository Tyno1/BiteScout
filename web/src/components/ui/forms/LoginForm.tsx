"use client";

import React, { useActionState, useEffect } from "react";

import { doCredentialLogin } from "@/app/actions";
import { Button } from "@/components/atoms";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const [state, loginAction, isPending] = useActionState(
    doCredentialLogin,
    undefined
  );
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.push("/login/loading");
    }
  }, [state, router]);

  return (
    <form
      action={loginAction}
      className="w-full flex flex-col items-center gap-2"
    >
      {state?.errors?.email && (
        <div className="text-red-500">{state.errors.email}</div>
      )}
      {state?.errors?.password && (
        <div className="text-red-500 text-sm">{state.errors.password}</div>
      )}
      <input
        required
        className="text-sm w-full py-4 px-4 bg-white rounded text-black"
        placeholder="email"
        type="email"
        name="email"
        id="email"
      />
      <input
        required
        className="text-sm w-full py-4 px-4 bg-white rounded text-black"
        placeholder="password"
        type="password"
        name="password"
        id="password"
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
