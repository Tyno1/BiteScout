import { InputHTMLAttributes, ReactNode, ChangeEvent } from "react";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  id?: string;
  useLabel?: boolean;
  outlineType?: "round" | "bottom";
  icon?: ReactNode;
  rightButton?: ReactNode;
  type: string;
  required?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  inputClassName?: string;
  placeholder?: string;
  fullWidth?: boolean;
  iconStyle?: string;
  theme?: "light" | "dark" | "transparent";
  rightButtonStyle?: string;
  labelStyle?: string;
  inputSize?: "sm" | "md" | "lg";
  rightButtonOnClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  errorMessage?: string;
  helperText?: string;
}

export default function Input({
  label,
  id,
  name,
  useLabel = false,
  outlineType,
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
  rightButtonOnClick,
  errorMessage,
  helperText,
  ...props
}: InputProps) {
  const uniqueId = id || `input-${label.toLowerCase().replace(/\s+/g, "-")}`;

  const sizeMap = {
    sm: "text-sm px-4 py-4",
    md: "text-base px-5 py-4",
    lg: "text-lg px-6 py-5",
  };

  const outlineMap = {
    round: "border border-gray-500 rounded-lg",
    bottom: "border-b border-gray-500",
    none: "border-none",
  };

  const inputTheme =
    theme === "dark"
      ? "bg-black text-white"
      : theme === "transparent"
      ? "bg-transparent text-gray-700"
      : "bg-white text-black";

  const paddingLeft = icon ? "pl-12" : "";
  const paddingRight = rightButton ? "pr-12" : "";

  return (
    <div className={fullWidth ? "w-full" : ""}>
      {useLabel && (
        <label
          htmlFor={uniqueId}
          className={clsx("block mb-3 font-medium text-gray-700", labelStyle)}
        >
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <div
            className={clsx(
              "absolute top-1/2 left-3 transform -translate-y-1/2",
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
          aria-describedby={`${uniqueId}-error ${uniqueId}-helper`}
          className={clsx(
            "w-full focus:outline-none focus:ring-1 focus:ring-orange-400 rounded-lg",
            inputTheme,
            outlineMap[outlineType ?? "none"],
            sizeMap[inputSize],
            paddingLeft,
            paddingRight,
            errorMessage && "border-red-500",
            inputClassName
          )}
          {...props}
        />

        {rightButton && (
          <button
            type="button"
            onClick={rightButtonOnClick}
            className={clsx(
              "absolute top-1/2 right-3 transform -translate-y-1/2",
              rightButtonStyle
            )}
            aria-label={`Action button for ${label}`}
          >
            {rightButton}
          </button>
        )}
      </div>

      {errorMessage && (
        <p
          id={`${uniqueId}-error`}
          className="text-sm text-red-500 mt-1"
          role="alert"
        >
          {errorMessage}
        </p>
      )}

      {helperText && !errorMessage && (
        <p id={`${uniqueId}-helper`} className="text-sm text-gray-500 mt-1">
          {helperText}
        </p>
      )}
    </div>
  );
}
