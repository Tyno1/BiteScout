import type React from "react";
import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	icon?: React.ReactNode;
	color?: "primary" | "secondary" | "danger" | "success" | "black" | "white";
	size?: "xs" | "sm" | "md" | "lg";
	disabled?: boolean;
	fullWidth?: boolean;
	type?: "button" | "submit" | "reset";
	name?: string;
	value?: string;
	onClick: () => void;
	className?: string;
	variant: "solid" | "outline" | "plain" | "glass";
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
				: variant === "glass"
					? "bg-primary/20 backdrop-blur-sm border border-primary/30 text-primary hover:bg-primary/30"
					: variant === "solid"
						? "border-1 bg-primary border-primary/70 text-white"
						: "border border-1 border-primary bg-transparent text-primary"
		}`,
		secondary: `hover:bg-gray-700 focus:ring-gray-500 ${
			variant === "plain"
				? "text-secondary"
				: variant === "glass"
					? "bg-yellow/20 backdrop-blur-sm border border-yellow/30 text-yellow hover:bg-yellow/30"
					: variant === "solid"
						? "bg-yellow text-white"
						: "border border-2 border-yellow bg-none text-yellow"
		}`,
		danger: `hover:bg-destructive/60 focus:ring-destructive ${
			variant === "plain"
				? "text-destructive hover:text-white"
				: variant === "glass"
					? "bg-destructive/20 backdrop-blur-sm border border-destructive/30 text-destructive hover:bg-destructive/30"
					: variant === "solid"
						? "text-white bg-destructive"
						: "border border-2 border-destructive bg-none text-destructive hover:text-white"
		}`,
		success: `hover:bg-success focus:ring-success ${
			variant === "plain"
				? "text-success hover:text-white"
				: variant === "glass"
					? "bg-success/20 backdrop-blur-sm border border-success/30 text-success hover:bg-success/30"
					: variant === "solid"
						? "bg-success text-white"
						: "border border-2 border-success bg-none text-success"
		} `,
		black: `hover:bg-black focus:ring-black ${
			variant === "plain"
				? "text-black"
				: variant === "glass"
					? "bg-black/20 backdrop-blur-sm border border-black/30 text-black hover:bg-black/30"
					: variant === "solid"
						? "bg-black text-white"
						: "border border-2 border-black bg-none text-black hover:text-white"
		} `,
		white: `hover:bg-gray-400 focus:ring-white ${
			variant === "plain"
				? "text-white"
				: variant === "glass"
					? "bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30"
					: variant === "solid"
						? "bg-white text-black"
						: "border border-2 border-white bg-none text-white"
		} `,
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
			aria-label={ariaLabel}
			aria-disabled={disabled}
			aria-pressed={isPressed}
			aria-expanded={isExpanded}
			tabIndex={disabled ? -1 : 0}
			{...props}
		>
			{icon}
		</button>
	);
}
