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

type ProfileScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	"Profile"
>;

interface Props {
	navigation: ProfileScreenNavigationProp;
}

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
	// Mock user data
	const user = {
		name: "John Doe",
		email: "john.doe@example.com",
		avatar: "https://via.placeholder.com/100x100",
		memberSince: "January 2024",
		reviews: 12,
		favorites: 8,
	};

	const menuItems = [
		{ id: "1", title: "Edit Profile", icon: "👤", onPress: () => {} },
		{ id: "2", title: "My Reviews", icon: "⭐", onPress: () => {} },
		{ id: "3", title: "Favorites", icon: "❤️", onPress: () => {} },
		{ id: "4", title: "Settings", icon: "⚙️", onPress: () => {} },
		{ id: "5", title: "Help & Support", icon: "❓", onPress: () => {} },
		{
			id: "6",
			title: "Logout",
			icon: "🚪",
			onPress: () => navigation.navigate("Home"),
		},
	];

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				<View style={styles.header}>
					<View style={styles.profileSection}>
						<Image source={{ uri: user.avatar }} style={styles.avatar} />
						<View style={styles.profileInfo}>
							<Text style={styles.userName}>{user.name}</Text>
							<Text style={styles.userEmail}>{user.email}</Text>
							<Text style={styles.memberSince}>
								Member since {user.memberSince}
							</Text>
						</View>
					</View>

					<View style={styles.statsContainer}>
						<View style={styles.statItem}>
							<Text style={styles.statNumber}>{user.reviews}</Text>
							<Text style={styles.statLabel}>Reviews</Text>
						</View>
						<View style={styles.statDivider} />
						<View style={styles.statItem}>
							<Text style={styles.statNumber}>{user.favorites}</Text>
							<Text style={styles.statLabel}>Favorites</Text>
						</View>
					</View>
				</View>

				<View style={styles.menuSection}>
					{menuItems.map((item) => (
						<TouchableOpacity
							key={item.id}
							style={styles.menuItem}
							onPress={item.onPress}
						>
							<View style={styles.menuItemContent}>
								<Text style={styles.menuIcon}>{item.icon}</Text>
								<Text style={styles.menuTitle}>{item.title}</Text>
							</View>
							<Text style={styles.menuArrow}>›</Text>
						</TouchableOpacity>
					))}
				</View>

				<View style={styles.footer}>
					<Text style={styles.version}>BiteScout v1.0.0</Text>
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
	header: {
		backgroundColor: "#fff",
		padding: 20,
		marginBottom: 20,
	},
	profileSection: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 20,
	},
	avatar: {
		width: 80,
		height: 80,
		borderRadius: 40,
		marginRight: 16,
	},
	profileInfo: {
		flex: 1,
	},
	userName: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#1e293b",
		marginBottom: 4,
	},
	userEmail: {
		fontSize: 16,
		color: "#64748b",
		marginBottom: 4,
	},
	memberSince: {
		fontSize: 14,
		color: "#94a3b8",
	},
	statsContainer: {
		flexDirection: "row",
		backgroundColor: "#f1f5f9",
		borderRadius: 12,
		padding: 16,
	},
	statItem: {
		flex: 1,
		alignItems: "center",
	},
	statNumber: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#f97316",
		marginBottom: 4,
	},
	statLabel: {
		fontSize: 14,
		color: "#64748b",
	},
	statDivider: {
		width: 1,
		backgroundColor: "#e2e8f0",
	},
	menuSection: {
		backgroundColor: "#fff",
		marginBottom: 20,
	},
	menuItem: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		padding: 16,
		borderBottomWidth: 1,
		borderBottomColor: "#f1f5f9",
	},
	menuItemContent: {
		flexDirection: "row",
		alignItems: "center",
	},
	menuIcon: {
		fontSize: 20,
		marginRight: 12,
	},
	menuTitle: {
		fontSize: 16,
		color: "#1e293b",
	},
	menuArrow: {
		fontSize: 18,
		color: "#94a3b8",
	},
	footer: {
		alignItems: "center",
		padding: 20,
	},
	version: {
		fontSize: 14,
		color: "#94a3b8",
	},
});

export default ProfileScreen;
