import React from "react";

interface ButtonProps {
  text: string;
  color?: "primary" | "secondary" | "danger" | "success";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  text,
  color = "primary",
  size = "md",
  disabled = false,
  fullWidth = false,
  type = "button",
  onClick,
  className = "",
}: ButtonProps) => {
  const baseStyles =
    "font-medium rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const colorStyles = {
    primary:
      "bg-red text-white hover:bg-[#b51d1d] focus:outline-none focus:ring-2 focus:ring-[#b51d1d] focus:ring-offset-2",
    secondary: "bg-yellow text-white hover:bg-gray-700 focus:ring-gray-500",
    danger: "bg-orange text-white hover:bg-red-700 focus:ring-red-500",
    success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        ${baseStyles}
        ${colorStyles[color]}
        ${sizeStyles[size]}
        ${widthStyle}
        ${className}
      `.trim()}
    >
      {text}
    </button>
  );
};

export default Button;
