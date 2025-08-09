import clsx from "clsx";
import type { ChangeEvent, ReactNode, TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	label: string;
	name: string;
	id?: string;
	useLabel?: boolean;
	outlineType?: "round" | "bottom" | "none";
	icon?: ReactNode;
	rightButton?: ReactNode;
	required?: boolean;
	onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
	value?: string;
	textareaClassName?: string;
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
	labelRow?: boolean;
	rows?: number;
}

export function Textarea({
	label,
	id,
	name,
	useLabel = false,
	outlineType,
	icon,
	theme = "light",
	rightButton,
	fullWidth = false,
	required = false,
	textareaClassName,
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
	rows = 4,
	...props
}: TextareaProps) {
	const uniqueId = id || `textarea-${label.toLowerCase().replace(/\s+/g, "-")}`;

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
			className={`${fullWidth ? "w-full" : ""} ${labelRow ? "flex flex-row gap-4 items-center mb-3" : ""}`}
		>
			{useLabel && (
				<label
					htmlFor={uniqueId}
					className={clsx(
						`block ${!labelRow && "mb-3"} font-medium text-gray-700`,
						labelStyle,
					)}
				>
					{label}
				</label>
			)}

			<div className="relative">
				{icon && (
					<div className={clsx("absolute top-4 left-3 transform", iconStyle)}>
						{icon}
					</div>
				)}

				<textarea
					id={uniqueId}
					name={name}
					required={required}
					onChange={onChange}
					value={value}
					placeholder={placeholder}
					aria-label={label}
					aria-describedby={`${uniqueId}-error ${uniqueId}-helper`}
					className={clsx(
						"w-full focus:outline-none focus:ring-2 focus:ring-ring focus:border-0 resize-none",
						themeStyles,
						outlineMap[outlineType ?? "none"],
						sizeMap[inputSize],
						paddingLeft,
						paddingRight,
						"rounded-lg",
						errorMessage && "border-red-500",
						textareaClassName,
					)}
					rows={rows}
					{...props}
				/>

				{rightButton && (
					<button
						type="button"
						onClick={rightButtonOnClick}
						className={clsx("absolute top-4 right-3", rightButtonStyle)}
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