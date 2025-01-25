"use server";

import { signIn, signOut } from "@/auth";

export async function doSocialLogin(formData) {
  // Implement social login logic here
  const action = formData.get("action");
  await signIn(action, { redirectTo: "/onboarding/roles" });
  console.log(action);
}
export async function doLogout() {
  await signOut({ redirectTo: "/" });
}

export async function doCrednentialLogin(formData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    const response = await signIn("credentials", {
      email,
      password,
      redirectTo: "/onboarding/roles",
    });
    console.log(response);
  } catch (error) {
    throw new Error(error);
  }
}
