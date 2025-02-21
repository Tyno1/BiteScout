"use server";

import { signIn, signOut } from "@/auth";

export async function doSocialLogin(formData) {
  // Implement social login logic here
  const action = formData.get("action");
  await signIn(action, { redirectTo: "/login/loading" });
}
export async function doLogout() {
  await signOut({ redirectTo: "/" });
}

export async function doCrednentialLogin(formData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}
