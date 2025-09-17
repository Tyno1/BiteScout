import { Image } from "expo-image";
import { router } from "expo-router";
import { ArrowLeft, Filter, MapPin, Search, Star } from "lucide-react-native";
import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useTheme } from "../../../../src/providers/ThemeProvider";

export default function Dining() {
	const { colors } = useTheme();
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

	const restaurants = [
		{
			id: 1,
			name: "The Burger Castle",
			knownFor: "Truffle Mac, Garlic Gnocchi",
			location: "Barry, Wales",
			rating: 4.8,
			image: require("../../../../assets/landing.png"),
		},
		{
			id: 2,
			name: "Primehouse 29",
			knownFor: "Tomahawk, NY Strip",
			location: "Cardiff, Wales",
			rating: 4.7,
			image: require("../../../../assets/landing.png"),
		},
		{
			id: 3,
			name: "Garden Theory",
			knownFor: "Zesty Lentil Bowl, Cashew Caesar",
			location: "Newport, Wales",
			rating: 4.6,
			image: require("../../../../assets/landing.png"),
		},
	];

	const popularCategories = [
		{
			title: "Popular For Steaks:",
			restaurants: [
				{ name: "The Grill Room", items: "Ribeye, Filet Mignon" },
				{ name: "Primehouse 29", items: "Tomahawk, NY Strip" },
			],
		},
		{
			title: "Popular For Vegan Bowls",
			restaurants: [
				{ name: "GreenBites", items: "Falafel Bowl, Avocado Toast" },
				{ name: "The Vital Root", items: "Quinoa Kale Bowl" },
			],
		},
		{
			title: "Popular For Desserts",
			restaurants: [
				{ name: "Sweet Society", items: "Molten Cake, Cheesecake Bites" },
				{ name: "Crème & Chill", items: "Crème Brûlée, Choco Flan" },
			],
		},
	];

	const filterOptions = ["Vegan", "Fine Dining", "Clear All"];

	const toggleFilter = (filter: string) => {
		if (filter === "Clear All") {
			setSelectedFilters([]);
		} else {
			setSelectedFilters((prev) =>
				prev.includes(filter)
					? prev.filter((f) => f !== filter)
					: [...prev, filter],
			);
		}
	};

	return (
		<ScrollView className="flex-1 bg-background">
			<View className="px-4 pt-16">
				{/* Header */}
				<View className="flex-row items-center justify-between mb-6">
					<Text className="text-3xl font-bold text-white">
						Find Restaurants
					</Text>
					<View className="w-10" />
				</View>

				{/* Search Bar */}
				<View className="flex-row items-center mb-4">
					<View className="flex-1 bg-gray-800 rounded-xl px-4 py-3 flex-row items-center">
						<Search size={20} color={colors.secondary} />
						<TextInput
							placeholder="Search"
							placeholderTextColor={colors.secondary}
							value={searchQuery}
							onChangeText={setSearchQuery}
							className="flex-1 ml-3 text-white text-base"
						/>
					</View>
					<Pressable className="ml-3 w-12 h-12 bg-primary rounded-full items-center justify-center">
						<Filter size={20} color="white" />
					</Pressable>
				</View>

				{/* Filter Buttons */}
				<View className="flex-row gap-3 mb-6">
					{filterOptions.map((filter) => (
						<Pressable
							key={filter}
							onPress={() => toggleFilter(filter)}
							className={`px-4 py-2 rounded-full ${
								filter === "Clear All"
									? "bg-primary"
									: selectedFilters.includes(filter)
										? "bg-yellow-400"
										: "bg-gray-800"
							}`}
						>
							<Text
								className={`font-medium ${
									filter === "Clear All" || selectedFilters.includes(filter)
										? "text-black"
										: "text-white"
								}`}
							>
								{filter}
							</Text>
						</Pressable>
					))}
				</View>

				{/* No Search Results */}
				{searchQuery && (
					<View className="items-center py-8">
						<Text className="text-gray-400 text-lg">No Search Result</Text>
					</View>
				)}

				{/* Kitchen Of Fame */}
				<Text className="text-2xl font-bold text-white mb-4">
					Kitchen Of Fame
				</Text>

				{/* Popular Categories */}
				{popularCategories.map((category, index) => (
					<View key={index} className="mb-6">
						<View className="flex-row items-center justify-between mb-3">
							<Text className="text-lg font-semibold text-white">
								{category.title}
							</Text>
							<Pressable className="flex-row items-center">
								<Text className="text-primary text-sm mr-1">View All</Text>
								<Text className="text-primary">›</Text>
							</Pressable>
						</View>
						<View className="space-y-2">
							{category.restaurants.map((restaurant, idx) => (
								<View
									key={idx}
									className="flex-row items-center justify-between py-2"
								>
									<Text className="text-white font-medium">
										{restaurant.name}
									</Text>
									<Text className="text-gray-400 text-sm">
										{restaurant.items}
									</Text>
								</View>
							))}
						</View>
					</View>
				))}

				{/* Restaurant List */}
				<View className="mb-20">
					<Text className="text-xl font-bold text-white mb-4">
						Nearby Restaurants
					</Text>
					<View className="space-y-4">
						{restaurants.map((restaurant) => (
							<Pressable
								key={restaurant.id}
								className="bg-gray-800 rounded-xl overflow-hidden"
								onPress={() =>
									router.push("/(protected)/(tabs)/(dining)/restaurant-detail?tab=Highlights")
								}
							>
								<View className="flex-row">
									<Image
										source={restaurant.image}
										contentFit="cover"
										style={{ width: 120, height: 120 }}
									/>
									<View className="flex-1 p-4">
										<Text className="text-white font-bold text-lg mb-1">
											{restaurant.name}
										</Text>
										<Text className="text-gray-400 text-sm mb-2">
											{restaurant.knownFor}
										</Text>
										<View className="flex-row items-center mb-2">
											<MapPin size={14} color={colors.secondary} />
											<Text className="text-gray-400 text-sm ml-1">
												{restaurant.location}
											</Text>
										</View>
										<View className="flex-row items-center">
											<Star size={14} color="#fbbf24" fill="#fbbf24" />
											<Text className="text-white text-sm ml-1">
												{restaurant.rating}
											</Text>
										</View>
									</View>
								</View>
							</Pressable>
						))}
					</View>
				</View>
			</View>
		</ScrollView>
	);
}
