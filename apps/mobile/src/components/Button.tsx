import type React from "react";
import {
	ActivityIndicator,
	StyleSheet,
	Text,
	TouchableOpacity,
} from "react-native";
import { BORDER_RADIUS, COLORS, FONT_SIZES, SPACING } from "../utils/constants";

interface ButtonProps {
	title: string;
	onPress: () => void;
	variant?: "primary" | "secondary" | "outline";
	size?: "small" | "medium" | "large";
	disabled?: boolean;
	loading?: boolean;
	fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
	title,
	onPress,
	variant = "primary",
	size = "medium",
	disabled = false,
	loading = false,
	fullWidth = false,
}) => {
	const getButtonStyle = () => {
		const style: any = {
			alignItems: "center",
			justifyContent: "center",
			borderRadius: BORDER_RADIUS.lg,
		};

		// Size styles
		switch (size) {
			case "small":
				style.paddingVertical = SPACING.sm;
				style.paddingHorizontal = SPACING.md;
				break;
			case "medium":
				style.paddingVertical = SPACING.md;
				style.paddingHorizontal = SPACING.lg;
				break;
			case "large":
				style.paddingVertical = SPACING.lg;
				style.paddingHorizontal = SPACING.xl;
				break;
		}

		// Variant styles
		switch (variant) {
			case "primary":
				style.backgroundColor = COLORS.primary;
				break;
			case "secondary":
				style.backgroundColor = COLORS.secondary;
				break;
			case "outline":
				style.backgroundColor = "transparent";
				style.borderWidth = 2;
				style.borderColor = COLORS.primary;
				break;
		}

		if (fullWidth) {
			style.width = "100%";
		}

		if (disabled) {
			style.backgroundColor = COLORS.border;
			style.borderColor = COLORS.border;
		}

		return style;
	};

	const getTextStyle = () => {
		const style: any = {
			fontWeight: "600",
		};

		// Size styles
		switch (size) {
			case "small":
				style.fontSize = FONT_SIZES.sm;
				break;
			case "medium":
				style.fontSize = FONT_SIZES.md;
				break;
			case "large":
				style.fontSize = FONT_SIZES.lg;
				break;
		}

		// Color styles
		if (variant === "outline") {
			style.color = COLORS.primary;
		} else {
			style.color = COLORS.surface;
		}

		if (disabled) {
			style.color = COLORS.textLight;
		}

		return style;
	};

	return (
		<TouchableOpacity
			style={getButtonStyle()}
			onPress={onPress}
			disabled={disabled || loading}
			activeOpacity={0.8}
		>
			{loading ? (
				<ActivityIndicator
					size="small"
					color={variant === "outline" ? COLORS.primary : COLORS.surface}
				/>
			) : (
				<Text style={getTextStyle()}>{title}</Text>
			)}
		</TouchableOpacity>
	);
};

export default Button;
