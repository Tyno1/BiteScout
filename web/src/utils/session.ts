import "server-only";
import jwt from "jsonwebtoken";
import { SignOptions } from "jsonwebtoken";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET || "";

type SessionPayload = {
  userId: string;
  userType: string;
};

type DecryptResult = {
  payload: (SessionPayload & jwt.JwtPayload) | null;
  expired: boolean;
};

export async function createSession({ userId, userType }: SessionPayload) {
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // <-- Add this line

  const session = encrypt({ userId, userType }, { expiresIn: "1d" });

  const cookieStore = await cookies();

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
  });
}

export function encrypt(payload: SessionPayload, options: SignOptions = {}) {
  const token = jwt.sign(payload, secretKey, {
    expiresIn: options.expiresIn || "1d",
    ...options,
  });
  return token;
}

export function decrypt(token: string): DecryptResult {
  try {
    const decoded = jwt.verify(token, secretKey) as SessionPayload &
      jwt.JwtPayload;
    return { payload: decoded, expired: false };
  } catch (error: any) {
    return {
      payload: null,
      expired: error.message.includes("expired") || false,
    };
  }
}
