"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useId } from "react";
import { credentialRegister } from "@/app/actions";
import { Button, Input } from "@/components/atoms";

export function RegisterForm() {
  const [state, formAction] = useActionState(credentialRegister, undefined);
  const router = useRouter();

  // Generate unique IDs for form fields
  const firstNameId = useId();
  const lastNameId = useId();
  const emailId = useId();
  const passwordId = useId();

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
        id={firstNameId}
        name="firstName"
        label="First Name"
        fullWidth
        errorMessage={state?.errors?.firstName?.[0]}
      />

      <Input
        inputSize="md"
        type="text"
        placeholder="Last Name"
        id={lastNameId}
        name="lastName"
        label="Last Name"
        fullWidth
        errorMessage={state?.errors?.lastName?.[0]}
      />
      <Input
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
      <Button type="submit" text="Register" fullWidth variant="solid" />
    </form>
  );
}
