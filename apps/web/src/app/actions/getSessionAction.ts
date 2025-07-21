"use server";
import { auth } from "@/auth";

// Force Node.js runtime to avoid Edge Runtime issues with axios
export const runtime = 'nodejs';

export async function getCurrentSession() {
  const session = await auth();
  return session;
}
