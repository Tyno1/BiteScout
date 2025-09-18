import { Image } from "expo-image";
import { ArrowLeft, Clock, MapPin, Star } from "lucide-react-native";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useTheme } from "../../../../src/providers/ThemeProvider";

export default function MenuCatalogue() {
	const { colors } = useTheme();
	const [selectedCategory, setSelectedCategory] = useState("Mains");

	const categories = ["Appetizers", "Mains", "Desserts", "Beverages"];

	const menuItems = {
		Appetizers: [
			{
				id: 1,
				name: "Caesar Salad",
				description: "Fresh romaine, parmesan, croutons",
				price: "£8.50",
				image: require("../../../../assets/landing.png"),
			},
			{
				id: 2,
				name: "Buffalo Wings",
				description: "Spicy chicken wings with blue cheese",
				price: "£12.00",
				image: require("../../../../assets/landing.png"),
			},
		],
		Mains: [
			{
				id: 1,
				name: "Ribeye Steak",
				description: "Butter-aged, 12oz",
				price: "£24.00",
				image: require("../../../../assets/landing.png"),
				badge: "Top Rated",
			},
			{
				id: 2,
				name: "Garlic Butter Shrimp",
				description: "Jumbo shrimp, garlic butter sauce",
				price: "£18.00",
				image: require("../../../../assets/landing.png"),
				badge: "New",
			},
			{
				id: 3,
				name: "Filet Mignon",
				description: "Tender and aged, 8oz",
				price: "£26.00",
				image: require("../../../../assets/landing.png"),
			},
			{
				id: 4,
				name: "Mac & Cheese",
				description: "Triple cheddar blend",
				price: "£12.00",
				image: require("../../../../assets/landing.png"),
			},
		],
		Desserts: [
			{
				id: 1,
				name: "Chocolate Lava Cake",
				description: "Warm chocolate cake with vanilla ice cream",
				price: "£7.50",
				image: require("../../../../assets/landing.png"),
			},
			{
				id: 2,
				name: "Tiramisu",
				description: "Classic Italian dessert",
				price: "£6.50",
				image: require("../../../../assets/landing.png"),
			},
		],
		Beverages: [
			{
				id: 1,
				name: "Craft Beer Selection",
				description: "Local and imported beers",
				price: "£5.00",
				image: require("../../../../assets/landing.png"),
			},
			{
				id: 2,
				name: "Wine by the Glass",
				description: "Red, white, and rosé options",
				price: "£8.00",
				image: require("../../../../assets/landing.png"),
			},
		],
	};

	return (
		<ScrollView className="flex-1 bg-background">
			<View className="pt-16">
				{/* Header Image */}
				<View className="relative">
					<Image
						source={require("../../../../assets/landing.png")}
						contentFit="cover"
						style={{ width: "100%", height: 200 }}
					/>
					<Pressable className="absolute top-4 left-4 w-10 h-10 bg-black rounded-lg items-center justify-center">
						<ArrowLeft size={20} color="white" />
					</Pressable>
					<View className="absolute top-4 right-4 bg-black rounded-full px-3 py-1 flex-row items-center">
						<Star size={16} color="#fbbf24" fill="#fbbf24" />
						<Text className="text-white text-sm ml-1">4.8</Text>
					</View>
				</View>

				{/* Restaurant Info */}
				<View className="px-4 py-4">
					<Text className="text-2xl font-bold text-white mb-2">
						The Burger Castle
					</Text>
					<View className="flex-row items-center mb-4">
						<MapPin size={16} color={colors.primary} />
						<Text className="text-white ml-2">
							Glamorgan Street, Barry, CF62 6JN
						</Text>
					</View>

					{/* Category Tabs */}
					<View className="flex-row mb-6">
						{categories.map((category) => (
							<Pressable
								key={category}
								onPress={() => setSelectedCategory(category)}
								className={`px-4 py-2 rounded-full mr-3 ${
									selectedCategory === category ? "bg-primary" : "bg-gray-800"
								}`}
							>
								<Text
									className={`font-medium ${
										selectedCategory === category ? "text-black" : "text-white"
									}`}
								>
									{category}
								</Text>
							</Pressable>
						))}
					</View>

					{/* Menu Items */}
					<View className="space-y-4 mb-20">
						{menuItems[selectedCategory as keyof typeof menuItems]?.map(
							(item) => (
								<View
									key={item.id}
									className="flex-row items-center bg-gray-800 rounded-xl p-4"
								>
									<Image
										source={item.image}
										contentFit="cover"
										style={{ width: 80, height: 80 }}
										className="rounded-lg"
									/>
									<View className="flex-1 ml-4">
										<View className="flex-row items-center justify-between mb-2">
											<Text className="text-white font-bold text-lg">
												{item.name}
											</Text>
											{item.badge && (
												<View className="bg-yellow-400 rounded px-2 py-1">
													<Text className="text-black text-xs font-semibold">
														{item.badge}
													</Text>
												</View>
											)}
										</View>
										<Text className="text-gray-400 text-sm mb-2">
											{item.description}
										</Text>
										<View className="flex-row items-center justify-between">
											<Text className="text-white font-bold text-lg">
												{item.price}
											</Text>
											<Pressable className="bg-primary rounded-lg px-4 py-2">
												<Text className="text-white font-semibold">Add</Text>
											</Pressable>
										</View>
									</View>
								</View>
							),
						)}
					</View>
				</View>
			</View>
		</ScrollView>
	);
}
