"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useId } from "react";
import { doCredentialLogin } from "@/app/actions";
import { Button, Input } from "@/components/atoms";

export function LoginForm() {
  const [state, loginAction, isPending] = useActionState(doCredentialLogin, undefined);
  const router = useRouter();

  // Generate unique IDs for form fields
  const emailId = useId();
  const passwordId = useId();

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
        id={emailId}
        name="email"
        label="Email"
        fullWidth
        errorMessage={state?.errors?.email?.[0]}
      />

      <Input
        inputSize="md"
        type="password"
        placeholder="Password"
        id={passwordId}
        name="password"
        label="Password"
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
