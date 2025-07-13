import type { RouteProp } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type React from "react";
import {
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { RootStackParamList } from "../../App";

type RestaurantScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	"Restaurant"
>;
type RestaurantScreenRouteProp = RouteProp<RootStackParamList, "Restaurant">;

interface Props {
	navigation: RestaurantScreenNavigationProp;
	route: RestaurantScreenRouteProp;
}

const RestaurantScreen: React.FC<Props> = ({ navigation, route }) => {
	const { id } = route.params;

	// Mock restaurant data
	const restaurant = {
		id,
		name: "Sample Restaurant",
		cuisine: "Italian",
		rating: 4.5,
		distance: "0.5km",
		address: "123 Main Street, City",
		phone: "+1 234 567 8900",
		hours: "Open 11:00 AM - 10:00 PM",
		description:
			"Authentic Italian cuisine with fresh ingredients and traditional recipes.",
		image: "https://via.placeholder.com/400x200",
	};

	const menuItems = [
		{
			id: "1",
			name: "Margherita Pizza",
			price: "$18",
			description: "Fresh mozzarella, tomato sauce, basil",
		},
		{
			id: "2",
			name: "Spaghetti Carbonara",
			price: "$22",
			description: "Eggs, cheese, pancetta, black pepper",
		},
		{
			id: "3",
			name: "Tiramisu",
			price: "$12",
			description: "Classic Italian dessert with coffee and mascarpone",
		},
	];

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				<View style={styles.imageContainer}>
					<Image source={{ uri: restaurant.image }} style={styles.image} />
					<View style={styles.imageOverlay}>
						<Text style={styles.restaurantName}>{restaurant.name}</Text>
						<Text style={styles.restaurantInfo}>
							{restaurant.cuisine} • {restaurant.rating} ⭐ •{" "}
							{restaurant.distance}
						</Text>
					</View>
				</View>

				<View style={styles.content}>
					<View style={styles.section}>
						<Text style={styles.sectionTitle}>About</Text>
						<Text style={styles.description}>{restaurant.description}</Text>
					</View>

					<View style={styles.section}>
						<Text style={styles.sectionTitle}>Contact</Text>
						<View style={styles.contactItem}>
							<Text style={styles.contactLabel}>Address:</Text>
							<Text style={styles.contactValue}>{restaurant.address}</Text>
						</View>
						<View style={styles.contactItem}>
							<Text style={styles.contactLabel}>Phone:</Text>
							<Text style={styles.contactValue}>{restaurant.phone}</Text>
						</View>
						<View style={styles.contactItem}>
							<Text style={styles.contactLabel}>Hours:</Text>
							<Text style={styles.contactValue}>{restaurant.hours}</Text>
						</View>
					</View>

					<View style={styles.section}>
						<Text style={styles.sectionTitle}>Popular Dishes</Text>
						{menuItems.map((item) => (
							<View key={item.id} style={styles.menuItem}>
								<View style={styles.menuItemHeader}>
									<Text style={styles.menuItemName}>{item.name}</Text>
									<Text style={styles.menuItemPrice}>{item.price}</Text>
								</View>
								<Text style={styles.menuItemDescription}>
									{item.description}
								</Text>
							</View>
						))}
					</View>

					<View style={styles.actionButtons}>
						<TouchableOpacity style={styles.primaryButton}>
							<Text style={styles.primaryButtonText}>View Full Menu</Text>
						</TouchableOpacity>

						<TouchableOpacity style={styles.secondaryButton}>
							<Text style={styles.secondaryButtonText}>Make Reservation</Text>
						</TouchableOpacity>
					</View>
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
	imageContainer: {
		position: "relative",
		height: 250,
	},
	image: {
		width: "100%",
		height: "100%",
	},
	imageOverlay: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: "rgba(0, 0, 0, 0.6)",
		padding: 20,
	},
	restaurantName: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#fff",
		marginBottom: 4,
	},
	restaurantInfo: {
		fontSize: 16,
		color: "#fff",
	},
	content: {
		padding: 20,
	},
	section: {
		marginBottom: 30,
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#1e293b",
		marginBottom: 16,
	},
	description: {
		fontSize: 16,
		color: "#64748b",
		lineHeight: 24,
	},
	contactItem: {
		flexDirection: "row",
		marginBottom: 8,
	},
	contactLabel: {
		fontSize: 16,
		fontWeight: "600",
		color: "#1e293b",
		width: 80,
	},
	contactValue: {
		fontSize: 16,
		color: "#64748b",
		flex: 1,
	},
	menuItem: {
		backgroundColor: "#fff",
		padding: 16,
		borderRadius: 12,
		marginBottom: 12,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 3.84,
		elevation: 5,
	},
	menuItemHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 8,
	},
	menuItemName: {
		fontSize: 18,
		fontWeight: "600",
		color: "#1e293b",
	},
	menuItemPrice: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#f97316",
	},
	menuItemDescription: {
		fontSize: 14,
		color: "#64748b",
	},
	actionButtons: {
		gap: 12,
		marginTop: 20,
	},
	primaryButton: {
		backgroundColor: "#f97316",
		padding: 16,
		borderRadius: 12,
		alignItems: "center",
	},
	primaryButtonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "600",
	},
	secondaryButton: {
		backgroundColor: "transparent",
		borderWidth: 2,
		borderColor: "#f97316",
		padding: 16,
		borderRadius: 12,
		alignItems: "center",
	},
	secondaryButtonText: {
		color: "#f97316",
		fontSize: 16,
		fontWeight: "600",
	},
});

export default RestaurantScreen;
