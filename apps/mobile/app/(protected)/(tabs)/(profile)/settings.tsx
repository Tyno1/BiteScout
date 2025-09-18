import { router } from "expo-router";
import {
	ArrowLeft,
	Award,
	BarChart,
	Bell,
	Eye,
	FileText,
	Flag,
	Folder,
	Lock,
	MapPin,
	Moon,
	Settings as SettingsIcon,
	Soup,
	Tag,
	Wrench,
} from "lucide-react-native";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useTheme } from "../../../../src/providers/ThemeProvider";

export default function Settings() {
	const { colors } = useTheme();

	const profileOptions = [
		{
			section: "Utility + Personalization",
			items: [
				{ name: "My Orders", icon: FileText, route: "my-orders" },
				{
					name: "My Activity (Posts, Videos, Reviews)",
					icon: Folder,
					route: "my-activity",
				},
				{ name: "My Reviews", icon: MapPin, route: "my-reviews" },
				{
					name: "Dietary Preferences",
					icon: Tag,
					route: "dietary-preferences",
				},
				{ name: "Saved Dishes", icon: Soup, route: "saved-dishes" },
				{
					name: "Notifications & Alerts",
					icon: Bell,
					route: "notifications-alerts",
				},
			],
		},
		{
			section: "Social / Food Identity",
			items: [
				{ name: "My Food Stats", icon: BarChart, route: "my-food-stats" },
				{
					name: "Foodie Level & Badges",
					icon: Award,
					route: "foodie-level-badges",
				},
				{
					name: "Who Viewed My Profile",
					icon: Eye,
					route: "who-viewed-profile",
				},
				{ name: "Explore Challenges", icon: Flag, route: "explore-challenges" },
			],
		},
		{
			section: "Preferences + System Settings",
			items: [
				{ name: "Settings", icon: SettingsIcon, route: "settings" },
				{
					name: "Appearance (Light / Dark Mode)",
					icon: Moon,
					route: "appearance",
				},
				{ name: "Privacy & Security", icon: Lock, route: "privacy-security" },
				{
					name: "Account Management",
					icon: Wrench,
					route: "account-management",
				},
			],
		},
	];

	return (
		<ScrollView className="flex-1 bg-background">
			{/* Header */}
			<View className="pt-16 pb-4 px-4 flex-row items-center">
				<Pressable
					onPress={() => router.back()}
					className="w-10 h-10 bg-secondary rounded-lg items-center justify-center"
				>
					<ArrowLeft size={20} color={colors.foreground} />
				</Pressable>
			</View>

			{profileOptions.map((sectionData, sectionIndex) => (
				<View key={sectionData.section} className="mb-6 px-4">
					<Text className="text-muted-foreground text-sm font-semibold mb-4">
						{sectionData.section.toUpperCase()}
					</Text>
					{sectionData.items.map((item, itemIndex) => {
						const IconComponent = item.icon;
						return (
							<Pressable
								key={item.name}
								className="flex-row items-center py-3"
								onPress={() =>
									router.push(`/(protected)/(tabs)/(profile)/${item.route}`)
								}
							>
								<IconComponent
									size={20}
									color={colors.secondary}
									className="mr-3"
								/>
								<Text className="text-foreground text-base">{item.name}</Text>
							</Pressable>
						);
					})}
					{sectionIndex < profileOptions.length - 1 && (
						<View className="h-[1px] bg-border my-4" />
					)}
				</View>
			))}
		</ScrollView>
	);
}
