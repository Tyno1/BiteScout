import { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: ReactNode;
  rightButton?: ReactNode;
  type: string;
  required?: boolean;
  onChange?: (e: any) => void;
  value?: string;
  inputClassName?: string;
  placeholder?: string;
  fullWidth?: boolean;
  iconStyle?: string;
  rightButtonStyle?: string;
  inputSize?: "sm" | "md" | "lg";
  rightButtonOnClick?: (e: any) => void;
  errorMessage?: string;
  helperText?: string;
  id: string;
}

export default function Input({
  label,
  icon,
  rightButton,
  type,
  fullWidth = false,
  required,
  inputClassName,
  onChange,
  value,
  placeholder,
  iconStyle,
  rightButtonStyle,
  inputSize = "sm",
  rightButtonOnClick,
  errorMessage,
  helperText,
  id,
  ...props
}: InputProps) {
  const BaseStyles = `px-4 py-4 rounded-lg text-black `;
  const widthStyle = fullWidth ? "w-full" : "";

  const sizeStyle = {
    sm: "text-sm px-4 py-4 ",
    md: "text-base px-5 py-4 ",
    lg: "text-lg px-6 py-5 ",
  };
  const paddingStyles = {
    left: icon ? "pl-12" : "",
    right: rightButton ? "pr-12" : "",
  };
  const uniqueId = id || `input-${label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div>
      <div className="relative">
        {icon && (
          <div
            className={`absolute top-1/2 left-3 transform -translate-y-1/2 ${iconStyle}`}
          >
            {icon}
          </div>
        )}
        <input
          type={type}
          id={uniqueId}
          placeholder={placeholder}
          aria-label={label}
          name={value}
          required={required}
          onChange={onChange}
          value={value}
          aria-describedby={`${uniqueId}-error  ${uniqueId}-helper`}
          className={`${widthStyle} ${BaseStyles} ${inputClassName} ${
            sizeStyle[inputSize]
          } ${paddingStyles.left} ${paddingStyles.right} ${
            errorMessage ? "border-red-500" : ""
          }`.trim()}
          {...props}
        />
        {rightButton && (
          <button
            type="button"
            onClick={rightButtonOnClick}
            className={`absolute top-1/2 right-3 transform -translate-y-1/2 ${rightButtonStyle}`}
            aria-label={`Input action for ${label}`}
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

      {helperText && (
        <p id={`${uniqueId}-helper`} className="text-sm text-gray-500 mt-1">
          {helperText}
        </p>
      )}
    </div>
  );
}
