"use server";

import { signIn, signOut } from "@/auth";
import type {
  RegisterPostRequest,
  RegisterPostResponse,
} from "@shared/types/auth/register";
import type { ApiError } from "@shared/types/common/errors";
import axios from "axios";
import { z } from "zod";
import type { RegisterFormState, SignInResponse } from "./types";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Enhanced password validation with better security
const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters" })
  .regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter",
  })
  .regex(/[a-z]/, {
    message: "Password must contain at least one lowercase letter",
  })
  .regex(/[0-9]/, { message: "Password must contain at least one number" })
  .regex(/[^A-Za-z0-9]/, {
    message: "Password must contain at least one special character",
  })
  .trim();

const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .trim()
    .toLowerCase(),
  password: z.string().min(1, { message: "Password is required" }).trim(),
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

export async function doCredentialLogin(
  prevState: unknown,
  formData: FormData
) {
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
    } catch {
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
      systemError:
        error instanceof Error ? error.message : "An unexpected error occurred",
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
      await axios.post<RegisterPostResponse>(`${API_URL}/auth/register`, {
        firstName,
        lastName,
        email,
        password,
      } as RegisterPostRequest);

      return {
        success: true,
      };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const apiError = error.response.data as ApiError;

        // Map API error codes to user-friendly messages (focus on business logic errors)
        const errorMessages: Record<string, string> = {
          CONFLICT_ERROR: "An account with this email already exists",
          RATE_LIMIT_EXCEEDED:
            "Too many registration attempts. Please try again later.",
          INTERNAL_SERVER_ERROR: "Server error. Please try again later.",
        };

        const message =
          errorMessages[apiError.code] ||
          apiError.message ||
          "Registration failed. Please try again.";

        return {
          errors: {
            email: [message],
          },
        };
      }

      // Handle network errors
      if (axios.isAxiosError(error)) {
        if (error.code === "ECONNABORTED") {
          return {
            systemError: "Request timeout. Please try again.",
          };
        }
        if (!error.response) {
          return {
            systemError: "Network error. Please check your connection.",
          };
        }
      }

      // Fallback for unknown errors
      return {
        systemError:
          "An unexpected error occurred during registration. Please try again.",
      };
    }
  } catch (error: unknown) {
    return {
      success: false,
      systemError:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

export async function doLogout() {
  await signOut({ redirectTo: "/" });
}
