import type React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { COLORS } from "../utils/constants";

interface LoadingSpinnerProps {
	size?: "small" | "large";
	color?: string;
	fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
	size = "large",
	color = COLORS.primary,
	fullScreen = false,
}) => {
	if (fullScreen) {
		return (
			<View style={styles.fullScreenContainer}>
				<ActivityIndicator size={size} color={color} />
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<ActivityIndicator size={size} color={color} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 20,
		alignItems: "center",
		justifyContent: "center",
	},
	fullScreenContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: COLORS.background,
	},
});

export default LoadingSpinner;
