import React, { ComponentProps } from "react";

type ButtonProps = ComponentProps<"button"> & {
  text?: string;
  icon?: React.ReactNode;
  color?: "primary" | "secondary" | "danger" | "success" | "black" | "white";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
  name?: string;
  value?: string;
  onClick?: () => void; // Note: this is required (no question mark)
  className?: string;
  iconStyle?: string;
  variant: "solid" | "outline" | "plain"; // Note: this is required (no question mark)
  ariaLabel?: string;
  isPressed?: boolean;
  isExpanded?: boolean;
};

export function Button({
  text,
  icon,
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
    "rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-0 cursor-pointer";

  const colorStyles = {
    primary: `hover:bg-primary/99 hover:text-white hover:border-primary focus:ring-primary focus:bg-primary/20 focus:border-none focus:text-primary ${
      variant === "plain"
        ? "text-primary"
        : variant === "solid"
        ? "border-1 bg-orange-600/80 border-orange-700 text-white"
        : "border border-1 border-orange-500 bg-transparent text-orange-600"
    }`,
    secondary: `hover:bg-gray-700 focus:ring-gray-500 ${
      variant === "plain"
        ? "text-secondary"
        : variant === "solid"
        ? "bg-yellow text-white"
        : "border border-2 border-yellow bg-none text-yellow"
    }`,
    danger: `hover:bg-destructive focus:ring-destructive ${
      variant === "plain"
        ? "text-destructive hover:text-white"
        : variant === "solid"
        ? "text-white bg-destructive"
        : "border border-2 border-destructive bg-none text-destructive hover:text-white"
    }`,
    success: `hover:bg-success focus:ring-success ${
      variant === "plain"
        ? "text-success hover:text-white"
        : variant === "solid"
        ? "bg-success text-white"
        : "border border-2 border-success bg-none text-success"
    } `,
    black: `hover:bg-black focus:ring-black ${
      variant === "plain"
        ? "text-black"
        : variant === "solid"
        ? "bg-black text-white"
        : "border border-2 border-black bg-none text-black hover:text-white"
    } `,
    white: `hover:bg-gray-400 focus:ring-white ${
      variant === "plain"
        ? "text-white"
        : variant === "solid"
        ? "bg-white text-black"
        : "border border-2 border-white bg-none text-white"
    } `,
  };

  const sizeStyles = {
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
      role="button"
      tabIndex={disabled ? -1 : 0}
      {...props}
    >
      {icon && <span className={`mr-2 ${iconStyle}`}>{icon}</span>}

      {text}
    </button>
  );
}
