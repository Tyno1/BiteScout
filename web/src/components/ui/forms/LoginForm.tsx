"use client";

import React, { useActionState, useState } from "react";

import { doCredentialLogin } from "@/app/actions";
import { useRouter } from "next/navigation";
import Button from "@/components/atoms/buttons/Button";
import { useFormStatus } from "react-dom";

const LoginForm: React.FC = () => {
  const [state, loginAction] = useActionState(doCredentialLogin, undefined);
  const { pending } = useFormStatus();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <form
      action={loginAction}
      className="w-full flex flex-col items-center gap-2"
    >
      <input
        required
        className="text-sm w-full py-4 px-4 bg-white rounded text-black"
        placeholder="email"
        type="email"
        name="email"
        id="email"
      />
      {state?.errors.email && (
        <div className="text-red-500">{state.errors.email}</div>
      )}
      <input
        required
        className="text-sm w-full py-4 px-4 bg-white rounded text-black"
        placeholder="password"
        type="password"
        name="password"
        id="password"
      />
      {state?.errors.password && (
        <div className="text-red-500 text-sm">{state.errors.password}</div>
      )}
      <Button
        disabled={pending}
        type="submit"
        fullWidth
        variant="solid"
        text="Credential Login"
      />{" "}
    </form>
  );
};

export default LoginForm;
