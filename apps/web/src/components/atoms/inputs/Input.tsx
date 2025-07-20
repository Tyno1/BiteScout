import clsx from "clsx";
import type { ChangeEvent, InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  id?: string;
  useLabel?: boolean;
  outlineType?: "round" | "bottom" | "none";
  icon?: ReactNode;
  rightButton?: ReactNode;
  type: string;
  required?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  inputClassName?: string;
  placeholder?: string;
  fullWidth?: boolean;
  iconStyle?: string;
  theme?: "light" | "dark" | "transparent";
  rightButtonStyle?: string;
  labelStyle?: string;
  inputSize?: "sm" | "md" | "lg";
  errorMessage?: string | ReactNode;
  helperText?: string;
  labelRow?: boolean;
}

export function Input({
  label,
  id,
  name,
  useLabel = false,
  outlineType = "none",
  icon,
  theme = "light",
  rightButton,
  type,
  fullWidth = false,
  required = false,
  inputClassName,
  onChange,
  value,
  placeholder,
  iconStyle = "",
  labelStyle = "",
  rightButtonStyle = "",
  inputSize = "sm",
  errorMessage,
  helperText,
  labelRow = false,
  ...props
}: InputProps) {
  const uniqueId = id || `input-${label.toLowerCase().replace(/\s+/g, "-")}`;

  const sizeMap = {
    sm: "text-sm px-2 py-3",
    md: "text-sm px-4 py-4",
    lg: "text-base px-6 py-5",
  } as const;

  const outlineMap = {
    round: "border border-gray-500 rounded-sm",
    bottom: "border-b border-gray-500",
    none: "border-none",
  } as const;

  const inputTheme =
    theme === "dark"
      ? "bg-black text-white"
      : theme === "transparent"
        ? "bg-transparent text-gray-700"
        : "bg-white text-black";

  const paddingLeft = icon ? "pl-10" : "";
  const paddingRight = rightButton ? "pr-12" : "";

  return (
    <div
      className={`${fullWidth ? "w-full" : ""} ${labelRow ? "flex flex-row gap-4 items-center mb-3" : ""}`}
    >
      {useLabel && (
        <label
          htmlFor={uniqueId}
          className={clsx(
            `block ${!labelRow && "mb-3"} font-medium text-gray-700`,
            labelStyle
          )}
        >
          {label}
        </label>
      )}

      {errorMessage && (
        <p
          id={`${uniqueId}-error`}
          className="text-sm text-red-500 mt-1"
          role="alert"
        >
          {errorMessage}
        </p>
      )}

      <div className="relative flex-1">
        {icon && (
          <div
            className={clsx(
              "absolute top-1/2 left-3 transform -translate-y-1/2 ",
              iconStyle
            )}
          >
            {icon}
          </div>
        )}

        <input
          id={uniqueId}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          onChange={onChange}
          value={value}
          aria-label={label}
          aria-invalid={!!errorMessage}
          aria-describedby={`${uniqueId}-error ${uniqueId}-helper`}
          className={clsx(
            "w-full focus:outline-none focus:ring-2 focus:ring-ring focus:border-0 rounded",
            inputTheme,
            outlineMap[outlineType],
            sizeMap[inputSize],
            paddingLeft,
            paddingRight,
            errorMessage && "border-red-500",
            inputClassName
          )}
          {...props}
        />

        {rightButton && (
          <div
            className={clsx(
              "absolute top-1/2 right-1 transform -translate-y-1/2",
              rightButtonStyle
            )}
          >
            {rightButton}
          </div>
        )}
      </div>

      {helperText && !errorMessage && (
        <p id={`${uniqueId}-helper`} className="text-sm text-gray-500 mt-1">
          {helperText}
        </p>
      )}
    </div>
  );
}
