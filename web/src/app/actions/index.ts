"use server";

import { signIn, signOut } from "@/auth";
import axios from "axios";
import { z } from "zod";

export type SignInResponse = {
  error?: string;
  url?: string;
  ok: boolean;
};
export type RegisterFormState = {
  success?: boolean;
  errors?: {
    firstName?: string[];
    lastName?: string[];
    email?: string[];
    password?: string[];
  };
  systemError?: string;
};

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Enhanced password validation with better security
const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters" })
  .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
  .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
  .regex(/[0-9]/, { message: "Password must contain at least one number" })
  .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" })
  .trim();

const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .trim()
    .toLowerCase(),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .trim(),
});

const registerSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .trim()
    .toLowerCase(),
  password: passwordSchema,
});

export async function doCredentialLogin(prevState: unknown, formData: FormData) {
  try {
    const result = loginSchema.safeParse(Object.fromEntries(formData));

    if (!result.success) {
      return {
        errors: result.error.flatten().fieldErrors,
      };
    }

    const { email, password } = result.data;
    try {
      const response = (await signIn("credentials", {
        email,
        password,
        redirect: false,
      })) as SignInResponse;

      if (response?.error) {
        return {
          errors: {
            email: ["Invalid email or password"],
          },
        };
      }

      return {
        success: true,
      };
    } catch (error) {
      return {
        errors: {
          email: ["Invalid email or password"],
        },
      };
    }
  } catch (error: unknown) {
    console.error(error);
    return {
      success: false,
      systemError: error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

export async function credentialRegister(
  prevState: unknown,
  formData: FormData
): Promise<RegisterFormState> {
  try {
    const result = registerSchema.safeParse(Object.fromEntries(formData));

    if (!result.success) {
      return {
        errors: result.error.flatten().fieldErrors,
      };
    }

    const { firstName, lastName, email, password } = result.data;
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        firstName,
        lastName,
        email,
        password,
      });

      return {
        success: true,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const responseMessage = error.response?.data?.message;

        return {
          errors: {
            email: [
              responseMessage || "Registration failed. Please try again.",
            ],
          },
        };
      }
    }

    return {
      success: false,
      systemError:
        "Unexpected error occurred during registration. Please try again.",
    };
  } catch (error: unknown) {
    return {
      success: false,
      systemError: error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

export async function doLogout() {
  await signOut({ redirectTo: "/" });
}
