import { Image } from "expo-image";
import { Filter, Mic, Search as SearchIcon, Star } from "lucide-react-native";
import { useState } from "react";
import {
	Pressable,
	ScrollView,
	Text,
	TextInput,
	View,
} from "react-native";
import { useTheme } from "../../../../src/providers/ThemeProvider";


export default function Search() {
	const { colors } = useTheme();
	const [activeTab, setActiveTab] = useState("Trending");

	const foodItems = [
		{
			id: 1,
			title: "Spaghetti Bolognese",
			restaurant: "The Italian Place",
			distance: "2.1 km",
			rating: 4.8,
			orders: "1k people ordered this already",
			image: require("../../../../assets/landing.png"),
		},
		{
			id: 2,
			title: "Tomahawk Steak",
			restaurant: "Brothers Grill",
			distance: "9.1 km",
			rating: 4.8,
			orders: "500 people ordered this already",
			image: require("../../../../assets/landing.png"),
		},
		{
			id: 3,
			title: "Spaghetti Bolognese",
			restaurant: "The Italian Place",
			distance: "2.1 km",
			rating: 4.8,
			orders: "1k people ordered this already",
			image: require("../../../../assets/landing.png"),
		},
		{
			id: 4,
			title: "Tomahawk Steak",
			restaurant: "Brothers Grill",
			distance: "9.1 km",
			rating: 4.8,
			orders: "500 people ordered this already",
			image: require("../../../../assets/landing.png"),
		},
	];

	const categories = [
		"Vegan",
		"Asian",
		"Grilled",
		"Desserts",
		"Burgers",
		"Spicy",
		"Pizza",
	];

	return (
		<ScrollView className="flex-1 bg-background">
			<View className="px-4 pt-16">
				{/* Header */}
				<Text className="text-4xl font-bold text-white mb-6">
					Discover Food
				</Text>

				{/* Search Bar */}
				<View className="flex-row items-center mb-6">
					<View className="flex-1 bg-gray-800 rounded-xl px-4 py-3 flex-row items-center">
						<SearchIcon size={20} color={colors.secondary} />
						<TextInput
							placeholder="Search food, cuisine..."
							placeholderTextColor={colors.secondary}
							className="flex-1 ml-3 text-white text-base"
						/>
					</View>
					<Pressable className="ml-3 w-12 h-12 bg-gray-800 rounded-full items-center justify-center">
						<Mic size={20} color={colors.secondary} />
					</Pressable>
					<Pressable className="ml-2 w-12 h-12 bg-primary rounded-full items-center justify-center">
						<Filter size={20} color="white" />
					</Pressable>
				</View>

				{/* Category Tabs */}
				<View className="flex-row mb-6">
					{["Trending", "Suggested", "Categories", "Feeds"].map((tab) => (
						<Pressable
							key={tab}
							onPress={() => setActiveTab(tab)}
							className={`px-4 py-2 rounded-full mr-3 ${
								activeTab === tab ? "bg-primary" : "bg-transparent"
							}`}
						>
							<Text
								className={`font-medium ${activeTab === tab ? "text-white" : "text-white"}`}
							>
								{tab}
							</Text>
						</Pressable>
					))}
				</View>

				{/* Category Grid */}
				{activeTab === "Categories" && (
					<View className="mb-6">
						<View className="flex-row flex-wrap gap-3">
							{categories.map((category, index) => (
								<Pressable
									key={category}
									className="bg-gray-800 rounded-xl px-4 py-3 flex-1 min-w-[45%]"
								>
									<Text className="text-white font-medium text-center">
										{category}
									</Text>
								</Pressable>
							))}
						</View>
					</View>
				)}

				{/* Food Items Grid */}
				<View className="flex-row flex-wrap gap-3 mb-20">
					{foodItems.map((item) => (
						<View
							key={item.id}
							className="w-[48%] bg-gray-800 rounded-xl overflow-hidden"
						>
							<View className="relative">
								<Image
									source={item.image}
									contentFit="cover"
									style={{ width: "100%", height: 120 }}
								/>
								<View className="absolute top-2 right-2 bg-gray-900 rounded-full px-2 py-1 flex-row items-center">
									<Star size={12} color="#fbbf24" fill="#fbbf24" />
									<Text className="text-white text-xs ml-1">{item.rating}</Text>
								</View>
								<View className="absolute bottom-2 left-2 right-2">
									<Text className="text-white text-xs font-medium">
										{item.orders}
									</Text>
								</View>
							</View>
							<View className="p-3">
								<Text className="text-white font-bold text-base mb-1">
									{item.title}
								</Text>
								<Text className="text-gray-400 text-sm mb-2">
									{item.restaurant} - {item.distance}
								</Text>
								<Pressable className="bg-primary rounded-lg py-2">
									<Text className="text-white font-semibold text-center">
										Order Now
									</Text>
								</Pressable>
							</View>
						</View>
					))}
				</View>
			</View>
		</ScrollView>
	);
}
