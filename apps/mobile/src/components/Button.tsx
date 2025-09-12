import React from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import type { TouchableOpacityProps } from "react-native";
import { cn } from "../lib/utils";

interface ButtonProps extends TouchableOpacityProps {
	title: string;
	color?: "primary" | "secondary" | "danger" | "success" | "neutral";
	variant?: "solid" | "outline" | "plain" | "glass";
	size?: "sm" | "md" | "lg" | "xl";
	loading?: boolean;
	disabled?: boolean;
	fullWidth?: boolean;
	style?: object;
}

export function Button({
	title,
	color = "primary",
	variant = "solid",
	size = "md",
	loading = false,
	disabled = false,
	fullWidth = false,
	style,
	...props
}: ButtonProps) {
	const getColorClasses = () => {
		switch (color) {
			case "primary":
				return {
					solid: "bg-primary",
					outline: "bg-transparent border border-primary",
					plain: "bg-transparent",
					glass: "bg-primary/20 border border-primary/40",
				};
			case "secondary":
				return {
					solid: "bg-secondary",
					outline: "bg-transparent border border-secondary",
					plain: "bg-transparent",
					glass: "bg-secondary/20 border border-secondary/40",
				};
			case "danger":
				return {
					solid: "bg-destructive",
					outline: "bg-transparent border border-destructive",
					plain: "bg-transparent",
					glass: "bg-destructive/20 border border-destructive/40",
				};
			case "success":
				return {
					solid: "bg-success",
					outline: "bg-transparent border border-success",
					plain: "bg-transparent",
					glass: "bg-success/20 border border-success/40",
				};
			case "neutral":
				return {
					solid: "bg-foreground",
					outline: "bg-transparent border border-foreground",
					plain: "bg-transparent",
					glass: "bg-foreground/20 border border-foreground/40",
				};
			default:
				return {
					solid: "bg-primary",
					outline: "bg-transparent border border-primary",
					plain: "bg-transparent",
					glass: "bg-primary/20 border border-primary/40",
				};
		}
	};

	const getSizeClasses = () => {
		switch (size) {
			case "sm":
				return "px-3 py-2 min-h-[32px]";
			case "lg":
				return "px-6 py-3 min-h-[48px]";
			case "xl":
				return "px-8 py-4 min-h-[56px]";
			default: // md
				return "px-4 py-2.5 min-h-[40px]";
		}
	};

	const getVariantClasses = () => {
		const colors = getColorClasses();

		switch (variant) {
			case "solid":
				return colors.solid;
			case "outline":
				return colors.outline;
			case "plain":
				return colors.plain;
			case "glass":
				return colors.glass;
			default:
				return colors.solid;
		}
	};

	const getTextSize = () => {
		switch (size) {
			case "sm":
				return "text-sm";
			case "lg":
				return "text-lg";
			case "xl":
				return "text-xl";
			default: // md
				return "text-base";
		}
	};

	const baseClasses = cn(
		"items-center justify-center rounded-md font-semibold",
		getSizeClasses(),
		getVariantClasses(),
		disabled && "opacity-60",
		fullWidth && "w-full"
	);

	const getTextColor = () => {
		if (disabled) return "text-muted-foreground";
		
		switch (variant) {
			case "solid":
				return `text-${color}-foreground`;
			case "outline":
			case "plain":
			case "glass":
				return `text-${color}`;
			default:
				return `text-${color}-foreground`;
		}
	};

	const textClasses = cn(
		getTextSize(),
		variant === "plain" ? "font-medium" : "font-semibold",
		getTextColor()
	);

	return (
		<TouchableOpacity
			className={baseClasses}
			disabled={disabled || loading}
			activeOpacity={0.8}
			style={style}
			{...props}
		>
			{loading ? (
				<ActivityIndicator 
					color={variant === "solid" ? "white" : "currentColor"}
					size="small" 
				/>
			) : (
				<Text className={textClasses}>
					{title}
				</Text>
			)}
		</TouchableOpacity>
	)
}
                  