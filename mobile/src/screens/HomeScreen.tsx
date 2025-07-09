import type { StackNavigationProp } from "@react-navigation/stack";
import type React from "react";
import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { RootStackParamList } from "../../App";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

interface Props {
	navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView contentContainerStyle={styles.scrollContent}>
				<View style={styles.header}>
					<Text style={styles.title}>Welcome to BiteScout</Text>
					<Text style={styles.subtitle}>
						Discover amazing restaurants near you
					</Text>
				</View>

				<View style={styles.searchSection}>
					<TouchableOpacity
						style={styles.searchButton}
						onPress={() => navigation.navigate("Restaurant", { id: "1" })}
					>
						<Text style={styles.searchButtonText}>🔍 Search Restaurants</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.featuredSection}>
					<Text style={styles.sectionTitle}>Featured Restaurants</Text>
					<View style={styles.restaurantCard}>
						<Text style={styles.restaurantName}>Sample Restaurant</Text>
						<Text style={styles.restaurantInfo}>
							Italian • 4.5 ⭐ • 0.5km away
						</Text>
					</View>
				</View>

				<View style={styles.actionButtons}>
					<TouchableOpacity
						style={styles.button}
						onPress={() => navigation.navigate("Login")}
					>
						<Text style={styles.buttonText}>Login</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={[styles.button, styles.secondaryButton]}
						onPress={() => navigation.navigate("Register")}
					>
						<Text style={[styles.buttonText, styles.secondaryButtonText]}>
							Register
						</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f8fafc",
	},
	scrollContent: {
		padding: 20,
	},
	header: {
		alignItems: "center",
		marginBottom: 30,
	},
	title: {
		fontSize: 28,
		fontWeight: "bold",
		color: "#1e293b",
		marginBottom: 8,
	},
	subtitle: {
		fontSize: 16,
		color: "#64748b",
		textAlign: "center",
	},
	searchSection: {
		marginBottom: 30,
	},
	searchButton: {
		backgroundColor: "#f97316",
		padding: 16,
		borderRadius: 12,
		alignItems: "center",
	},
	searchButtonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "600",
	},
	featuredSection: {
		marginBottom: 30,
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#1e293b",
		marginBottom: 16,
	},
	restaurantCard: {
		backgroundColor: "#fff",
		padding: 16,
		borderRadius: 12,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 3.84,
		elevation: 5,
	},
	restaurantName: {
		fontSize: 18,
		fontWeight: "600",
		color: "#1e293b",
		marginBottom: 4,
	},
	restaurantInfo: {
		fontSize: 14,
		color: "#64748b",
	},
	actionButtons: {
		gap: 12,
	},
	button: {
		backgroundColor: "#f97316",
		padding: 16,
		borderRadius: 12,
		alignItems: "center",
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "600",
	},
	secondaryButton: {
		backgroundColor: "transparent",
		borderWidth: 2,
		borderColor: "#f97316",
	},
	secondaryButtonText: {
		color: "#f97316",
	},
});

export default HomeScreen;
