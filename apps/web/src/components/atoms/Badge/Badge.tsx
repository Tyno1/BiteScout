import { cn } from "@/lib/utils";
import type React from "react";

type BadgeProps = {
  children: React.ReactNode;
  color?: "primary" | "secondary" | "danger" | "success" | "neutral" | "warning";
  variant?: "solid" | "outline" | "plain" | "glass";
  size?: "xs" | "sm" | "md";
  fullWidth?: boolean;
  className?: string;
};

export function Badge({
  children,
  color = "neutral",
  variant = "solid",
  size = "sm",
  fullWidth = false,
  className = "",
}: BadgeProps) {
  const baseStyles = `${fullWidth ? 'flex w-full' : 'inline-flex'} items-center justify-center rounded-full font-medium transition-colors duration-200`;

  const colorStyles = {
    primary: `${
      variant === "plain"
        ? "text-primary hover:bg-primary/10"
        : variant === "glass"
          ? "bg-primary/10 backdrop-blur-sm border border-primary/20 text-primary"
          : variant === "solid"
            ? "bg-primary text-primary-foreground"
            : "border border-primary text-primary hover:bg-primary/10"
    }`,
    secondary: `${
      variant === "plain"
        ? "text-secondary hover:bg-secondary/10"
        : variant === "glass"
          ? "bg-secondary/10 backdrop-blur-sm border border-secondary/20 text-secondary"
          : variant === "solid"
            ? "bg-secondary text-secondary-foreground"
            : "border border-secondary text-secondary hover:bg-secondary/10"
    }`,
    danger: `${
      variant === "plain"
        ? "text-danger hover:bg-danger/10"
        : variant === "glass"
          ? "bg-danger/10 backdrop-blur-sm border border-danger/20 text-danger"
          : variant === "solid"
            ? "bg-danger text-danger-foreground"
            : "border border-danger text-danger hover:bg-danger/10"
    }`,
    success: `${
      variant === "plain"
        ? "text-success hover:bg-success/10"
        : variant === "glass"
          ? "bg-success/10 backdrop-blur-sm border border-success/20 text-success"
          : variant === "solid"
            ? "bg-success text-success-foreground"
            : "border border-success text-success hover:bg-success/10"
    }`,
    neutral: `${
      variant === "plain"
        ? "text-neutral hover:bg-neutral/10"
        : variant === "glass"
          ? "bg-neutral/10 backdrop-blur-sm border border-neutral/20 text-neutral"
          : variant === "solid"
            ? "bg-neutral text-neutral-foreground"
            : "border border-neutral/40 text-neutral hover:bg-neutral/10"
    }`,
    warning: `${
      variant === "plain"
        ? "text-yellow-600 hover:bg-yellow-50"
        : variant === "glass"
          ? "bg-yellow-50/80 backdrop-blur-sm border border-yellow-200/60 text-yellow-700"
          : variant === "solid"
            ? "bg-yellow-500 text-white"
            : "border border-yellow-300 text-yellow-600 hover:bg-yellow-50"
    }`,
  };

  const sizeStyles = {
    xs: "px-2 py-0.5 text-xs",
    sm: "px-2.5 py-1 text-sm",
    md: "px-3 py-1.5 text-sm",
  };

  const combinedClassName = cn(
    baseStyles,
    colorStyles[color],
    sizeStyles[size],
    className
  );

  return (
    <span className={combinedClassName}>
      {children}
    </span>
  );
} 