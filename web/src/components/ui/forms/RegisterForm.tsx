"use client";

import { credentialRegister } from "@/app/actions";
import Button from "@/components/atoms/buttons/Button";
import Input from "@/components/atoms/inputs/Input";
import React, { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const [state, formAction] = useActionState(credentialRegister, undefined);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.push("/register/success");
    }
  }, [state?.success]);

  return (
    <form
      action={formAction}
      className="w-full flex flex-col items-center gap-2"
    >
      {state?.errors?.firstName && (
        <div className="text-red-600 text-sm">{state.errors.firstName[0]}</div>
      )}
      {state?.errors?.lastName && (
        <div className="text-red-600 text-sm">{state.errors.lastName[0]}</div>
      )}

      {state?.errors?.email && (
        <div className="text-red-600 text-sm">{state.errors.email[0]}</div>
      )}

      {state?.errors?.password && (
        <div className="text-red-600 text-sm">{state.errors.password[0]}</div>
      )}

      <Input
        type="text"
        placeholder="John"
        id="first-name"
        name="firstName"
        label="First Name"
        fullWidth
      />

      <Input
        type="text"
        placeholder="Doe"
        id="last-name"
        name="lastName"
        label="Last Name"
        fullWidth
      />
      <Input
        type="email"
        placeholder="john@doe.com"
        id="email"
        name="email"
        label="Email"
        fullWidth
      />
      <Input
        type="password"
        placeholder="*******"
        id="password"
        name="password"
        label="Password"
        fullWidth
      />
      <Button type="submit" text="Register" fullWidth variant="solid" />
    </form>
  );
};

export default RegisterForm;
