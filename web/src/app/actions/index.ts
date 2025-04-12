"use server";

import { signIn, signOut } from "@/auth";
import { z } from "zod";

export async function doSocialLogin(formData: FormData) {
  // Implement social login logic here
  const action = formData.get("action");

  if (typeof action !== "string") {
    throw new Error("Invalid provider");
  }
  await signIn(action, { redirectTo: "/login/loading" });
}

const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .trim()
    .toLowerCase(),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters" })
    .trim(),
});

export async function doCredentialLogin(prevState: any, formData: FormData) {
  try {
    const result = loginSchema.safeParse(Object.fromEntries(formData));

    if (!result.success) {
      return {
        errors: result.error.flatten().fieldErrors,
      };
    }

    const { email, password } = result.data;

    await signIn("credentials", {
      email,
      password,
      redirectTo: "/login/loading",
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function doLogout() {
  await signOut({ redirectTo: "/" });
}
