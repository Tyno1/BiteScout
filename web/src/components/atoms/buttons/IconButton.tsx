import React, { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: React.ReactNode;
  color?: "primary" | "secondary" | "danger" | "success" | "black" | "white";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
  name?: string;
  value?: string;
  onClick: () => void;
  className?: string;
  iconStyle?: string;
  variant: "solid" | "outline" | "plain";
  ariaLabel?: string;
  isPressed?: boolean;
  isExpanded?: boolean;
};

export function IconButton({
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
    "rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-0 cursor-pointer ";

  const colorStyles = {
    primary: `hover:bg-orange-500/20 hover:text-orange-900 hover:border-orange-500 focus:ring-orange-500 focus:bg-orange-500/20 focus:border-none focus:text-orange-900 ${
      variant === "plain"
        ? "text-orange-500"
        : variant === "solid"
        ? "border-1 bg-orange-600/90 border-orange-700 text-white"
        : "border border-1 border-gray-500 bg-transparent text-black"
    }`,
    secondary: `hover:bg-gray-700 focus:ring-gray-500 ${
      variant === "plain"
        ? "text-white"
        : variant === "solid"
        ? "bg-yellow text-white"
        : "border border-2 border-yellow bg-none text-yellow"
    }`,
    danger: `hover:bg-red-700 focus:ring-red-500 ${
      variant === "plain"
        ? "text-white"
        : variant === "solid"
        ? "text-white bg-orange"
        : "border border-2 border-orange bg-none text-orange"
    }`,
    success: `hover:bg-green-700 focus:ring-green-500 ${
      variant === "plain"
        ? "text-white"
        : variant === "solid"
        ? "bg-green-600 text-white"
        : "border border-2 border-green-600 bg-none text-green-600"
    } `,
    black: `hover:bg-red focus:ring-red ${
      variant === "plain"
        ? "text-white"
        : variant === "solid"
        ? "bg-black text-white"
        : "border border-2 border-black bg-none text-black"
    } `,
    white: `hover:bg-gray-400 focus:ring-red ${
      variant === "plain"
        ? "text-black"
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
      aria-label={ariaLabel}
      aria-disabled={disabled}
      aria-pressed={isPressed}
      aria-expanded={isExpanded}
      role="button"
      tabIndex={disabled ? -1 : 0}
      {...props}
    >
      {icon}
    </button>
  );
}
