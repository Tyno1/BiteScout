import React from "react";
import { Text, TextInput, View } from "react-native";
import type { TextInputProps } from "react-native";
import { cn } from "../lib/utils";

interface InputProps extends TextInputProps {
	label?: string;
	error?: string;
	helperText?: string;
	layout?: "row" | "column";
	required?: boolean;
	variant?: "default" | "filled" | "outline";
	size?: "sm" | "md" | "lg";
	outline?: "none" | "default" | "bottom";
}

export function Input({
	label,
	error,
	helperText,
	layout = "column",
	required = false,
	variant = "default",
	size = "md",
	outline = "default",
	className,
	style,
	...props
}: InputProps) {
	const getVariantClasses = () => {
		const getOutlineClasses = () => {
			switch (outline) {
				case "none":
					return "border-0";
				case "bottom":
					return "border-0 border-b border-border rounded-none";
				default: // "default"
					return "border border-border";
			}
		};

		switch (variant) {
			case "filled":
				return `bg-muted ${getOutlineClasses()}`;
			case "outline":
				return `bg-transparent ${getOutlineClasses()}`;
			default:
				return `bg-input ${getOutlineClasses()}`;
		}
	};

	const getSizeClasses = () => {
		switch (size) {
			case "sm":
				return "px-3 py-2 text-sm min-h-[36px]";
			case "lg":
				return "px-4 py-3 text-lg min-h-[48px]";
			default: // md
				return "px-3 py-2.5 text-base min-h-[40px]";
		}
	};

	const getLabelSize = () => {
		switch (size) {
			case "sm":
				return "text-sm";
			case "lg":
				return "text-base";
			default: // md
				return "text-sm";
		}
	};

	const inputClasses = cn(
		"text-foreground placeholder:text-muted-foreground",
		"focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
		getVariantClasses(),
		getSizeClasses(),
		error && "border-destructive focus:ring-destructive",
		outline !== "bottom" && "rounded-md",
		className
	);

	const labelClasses = cn(
		"font-medium",
		getLabelSize(),
		error ? "text-destructive" : "text-foreground"
	);

	const helperClasses = cn(
		"text-xs mt-1",
		error ? "text-destructive" : "text-muted-foreground"
	);

	const containerClasses = cn(
		layout === "row" ? "flex-row items-center space-x-3" : ""
	);

	const labelContainerClasses = cn(
		layout === "row" ? "flex-shrink-0" : ""
	);

	const inputContainerClasses = cn(
		layout === "row" ? "flex-1" : "mt-1"
	);

	return (
		<View className={containerClasses}>
			{label && (
				<View className={labelContainerClasses}>
					<Text className={labelClasses}>
						{label}
						{required && <Text className="text-destructive ml-1">*</Text>}
					</Text>
				</View>
			)}
			
			<View className={inputContainerClasses}>
				<TextInput
					className={inputClasses}
					style={style}
					placeholderTextColor="#9CA3AF"
					{...props}
				/>
				
				{(error || helperText) && (
					<Text className={helperClasses}>
						{error || helperText}
					</Text>
				)}
			</View>
		</View>
	);
}
