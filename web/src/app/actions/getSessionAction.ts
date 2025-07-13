"use server";
import { auth } from "@/auth";

export async function getCurrentSession() {
  const session = await auth();
  return session;
}
