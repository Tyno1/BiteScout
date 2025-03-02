import { Response } from "express";

export const handleError = (
  error: unknown,
  message: string,
  res: Response,
  status = 500
): Response => {
  console.error("Error:", error);

  const errorMessage = error instanceof Error ? error.message : String(error);

  return res.status(status).json({
    error: `${errorMessage} ${message}`,
  });
};
