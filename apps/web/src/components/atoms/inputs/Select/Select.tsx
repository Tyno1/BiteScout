import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import type { ChangeEvent, ReactNode, SelectHTMLAttributes } from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  classname?: string;
  name: string;
  id?: string;
  useLabel?: boolean;
  outlineType?: "round" | "bottom" | "none";
  icon?: ReactNode;
  rightButton?: ReactNode;
  required?: boolean;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  value?: string;
  selectClassName?: string;
  placeholder?: string;
  fullWidth?: boolean;
  iconStyle?: string;
  theme?: "light" | "dark" | "transparent";
  rightButtonStyle?: string;
  labelStyle?: string;
  inputSize?: "sm" | "md" | "lg";
  rightButtonOnClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  errorMessage?: string | ReactNode;
  helperText?: string;
  labelRow?: boolean;
  options: Option[];
}

export function Select({
  label,
  id,
  className,
  name,
  useLabel = false,
  outlineType,
  icon,
  theme = "light",
  rightButton,
  fullWidth = false,
  required = false,
  selectClassName,
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
  labelRow = false,
  options,
  ...props
}: SelectProps) {
  const uniqueId = id || `select-${label.toLowerCase().replace(/\s+/g, "-")}`;

  // Enhanced onChange handler to ensure first option works
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    // Always call the parent onChange, even for first option
    if (onChange) {
      // Force the event to be processed
      const syntheticEvent = {
        ...e,
        target: {
          ...e.target,
          value: e.target.value,
        },
      };
      onChange(syntheticEvent);
    }
  };

  const sizeMap = {
    sm: "text-sm px-2 py-3",
    md: "text-base px-4 py-4",
    lg: "text-lg px-6 py-5",
  };

  const outlineMap = {
    round: "border border-foreground/10 rounded-sm",
    bottom: "border-b border-foreground/10",
    none: "border-none",
  };

  const themeStyles =
    theme === "dark"
      ? "bg-black text-white"
      : theme === "transparent"
        ? "bg-transparent text-gray-700"
        : "bg-input text-input-foreground";

  const paddingLeft = icon ? "pl-10" : "";
  const paddingRight = rightButton ? "pr-12" : "";

  return (
    <div
      className={`${fullWidth ? "w-full" : ""} ${labelRow ? "flex flex-row gap-4 items-center mb-3" : ""}  ${className}`}
    >
      {useLabel && (
        <label
          htmlFor={uniqueId}
          className={clsx(`block ${!labelRow && "mb-3"} font-medium text-gray-700`, labelStyle)}
        >
          {label}
        </label>
      )}
      {errorMessage && (
        <p id={`${uniqueId}-error`} className="text-sm text-red-500 mt-1" role="alert">
          {errorMessage}
        </p>
      )}
      <div className="relative">
        {icon && (
          <div className={clsx("absolute top-1/2 left-3 transform -translate-y-1/2", iconStyle)}>
            {icon}
          </div>
        )}

        <select
          id={uniqueId}
          name={name}
          required={required}
          onChange={handleChange}
          value={value}
          aria-label={label}
          aria-describedby={`${uniqueId}-error ${uniqueId}-helper`}
          className={clsx(
            "w-full focus:outline-none focus:ring-2 focus:ring-ring focus:border-0 cursor-pointer appearance-none",
            themeStyles,
            outlineMap[outlineType ?? "none"],
            sizeMap[inputSize],
            paddingLeft,
            paddingRight,
            "rounded-lg",
            errorMessage && "border-red-500",
            selectClassName
          )}
          {...props}
        >
          {placeholder ? <option value="">{placeholder}</option> : null}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <ChevronDown size={16} className="absolute right-2 top-4" />

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

      {helperText && !errorMessage && (
        <p id={`${uniqueId}-helper`} className="text-sm text-gray-500 mt-1">
          {helperText}
        </p>
      )}
    </div>
  );
}
