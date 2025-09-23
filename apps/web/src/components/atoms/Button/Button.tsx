import type React from "react";
import type { ComponentProps } from "react";

type ButtonProps = ComponentProps<"button"> & {
  text?: string;
  IconAfter?: React.ReactNode;
  IconBefore?: React.ReactNode;

  color?: "primary" | "secondary" | "danger" | "success" | "neutral";
  size?: "xs" | "sm" | "md" | "lg";
  disabled?: boolean;
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
  name?: string;
  value?: string;
  onClick?: ((e: React.MouseEvent<HTMLButtonElement>) => void) | (() => void);
  className?: string;
  iconStyle?: string;
  variant: "solid" | "outline" | "plain" | "glass"; // Note: this is required (no question mark)
  ariaLabel?: string;
  isPressed?: boolean;
  isExpanded?: boolean;
};

export function Button({
  text,
  IconAfter,
  IconBefore,
  color = "primary",
  size = "md",
  disabled = false,
  fullWidth = false,
  type = "button",
  name,
  value,
  onClick,
  className = "",
  variant = "solid",
  ariaLabel,
  iconStyle,
  isPressed = false,
  isExpanded = false,
  ...props
}: ButtonProps) {
  const baseStyles =
    "rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-0 cursor-pointer flex items-center justify-center gap-2";

  const colorStyles = {
    primary: `focus:ring-primary focus:bg-primary/20 focus:border-none focus:text-primary ${
      variant === "plain"
        ? "text-primary hover:bg-primary/20 hover:border-primary"
        : variant === "glass"
          ? "bg-primary/5 backdrop-blur-lg border-2 border-primary text-orange-800 hover:bg-primary/20"
          : variant === "solid"
            ? "border-1 bg-primary border-primary/70 text-primary-foreground hover:bg-primary/90 hover:border-primary"
            : "border border-1 border-primary bg-transparent text-primary hover:text-primary/60 hover:bg-primary/20 hover:border-primary"
    }`,
    secondary: `focus:ring-secondary focus:bg-secondary/20 focus:border-none focus:text-secondary ${
      variant === "plain"
        ? "text-secondary hover:bg-secondary/20 hover:border-secondary"
        : variant === "glass"
          ? "bg-secondary/10 backdrop-blur-lg border-2 border-secondary text-secondary hover:bg-secondary/30"
          : variant === "solid"
            ? "border-1 bg-secondary border-secondary/70 text-secondary-foreground hover:bg-secondary/90 hover:border-secondary"
            : "border border-1 border-secondary bg-transparent text-secondary hover:bg-secondary/20 hover:border-secondary"
    }`,
    danger: `focus:ring-danger focus:bg-danger/20 focus:border-none focus:text-danger ${
      variant === "plain"
        ? "text-danger hover:bg-danger/20 hover:border-danger"
        : variant === "glass"
          ? "bg-danger/10 backdrop-blur-lg border-2 border-danger text-danger hover:bg-danger/30"
          : variant === "solid"
            ? "border-1 bg-danger border-danger/70 text-danger-foreground hover:bg-danger/90 hover:border-danger"
            : "border border-1 border-danger bg-transparent text-danger hover:bg-danger/20 hover:border-danger"
    }`,
    success: `hover:bg-success/20 focus:ring-success ${
      variant === "plain"
        ? "text-success"
        : variant === "glass"
          ? "bg-success/5 backdrop-blur-sm border border-success/30 text-success hover:bg-success/30"
          : variant === "solid"
            ? "bg-success text-success-foreground hover:text-success"
            : "border border-1 border-success bg-none text-success"
    } `,
    neutral: `focus:ring-neutral focus:bg-neutral/20 focus:border-none focus:text-neutral ${
      variant === "plain"
        ? "text-neutral hover:bg-neutral/10 hover:text-neutral/80 transition-all duration-200"
        : variant === "glass"
          ? "bg-neutral/5 backdrop-blur-lg border border-neutral/20 text-neutral hover:bg-neutral/15 hover:border-neutral/30 transition-all duration-200"
          : variant === "solid"
            ? "border bg-neutral border-neutral/70 text-neutral-foreground hover:bg-neutral/90 hover:border-neutral hover:shadow-sm transition-all duration-200"
            : "border border-neutral/40 bg-transparent text-neutral hover:bg-neutral/10 hover:border-neutral hover:text-neutral/80 transition-all duration-200"
    }`,
  };

  const sizeStyles = {
    xs: "px-2 py-1 text-xs",
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-3 text-base",
    lg: "px-7 py-3 text-lg",
  };

  const widthStyle = fullWidth ? "w-full" : "";

  const combinedClassName = `
    ${baseStyles}
    ${colorStyles[color]}
    ${sizeStyles[size]}
    ${widthStyle}
    ${className}
  `
    .replace(/\s+/g, " ")
    .trim();

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      name={name}
      value={value}
      className={combinedClassName}
      aria-label={ariaLabel || text}
      aria-disabled={disabled}
      aria-pressed={isPressed}
      aria-expanded={isExpanded}
      tabIndex={disabled ? -1 : 0}
      {...props}
    >
      {IconBefore && <span className={`${iconStyle}`}>{IconBefore}</span>}
      {text}
      {IconAfter && <span className={` ${iconStyle}`}>{IconAfter}</span>}
    </button>
  );
}
