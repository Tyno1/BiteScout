import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import {
	ArrowLeft,
	Clock,
	Globe,
	Mail,
	MapPin,
	Phone,
	Star,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useTheme } from "../../../../src/providers/ThemeProvider";

export default function RestaurantDetail() {
	const { colors } = useTheme();
	const { tab } = useLocalSearchParams();
	const [activeTab, setActiveTab] = useState("Highlights");

	useEffect(() => {
		if (tab && typeof tab === "string") {
			setActiveTab(tab);
		}
	}, [tab]);

	const menuItems = [
		{
			id: 1,
			name: "Ribeye Steak",
			description: "Butter-aged",
			price: "£24.00",
			image: require("../../../../assets/landing.png"),
			badge: "Top Rated",
		},
		{
			id: 2,
			name: "Garlic Butter Shrimp",
			description: "Spicy",
			price: "£18.00",
			image: require("../../../../assets/landing.png"),
			badge: "New",
		},
		{
			id: 3,
			name: "Filet Mignon",
			description: "Tender and aged",
			price: "£26.00",
			image: require("../../../../assets/landing.png"),
		},
		{
			id: 4,
			name: "Mac & Cheese",
			description: "Tripple Cheddar blend",
			price: "£12.00",
			image: require("../../../../assets/landing.png"),
		},
		{
			id: 5,
			name: "Sea Bass",
			description: "Baked In Rock Salt",
			price: "£26.00",
			image: require("../../../../assets/landing.png"),
		},
		{
			id: 6,
			name: "Ribeye Steak",
			description: "Dry aged",
			price: "£20.00",
			image: require("../../../../assets/landing.png"),
		},
	];

	const taggedPosts = [
		{ id: 1, image: require("../../../../assets/landing.png") },
		{ id: 2, image: require("../../../../assets/landing.png") },
		{ id: 3, image: require("../../../../assets/landing.png") },
		{ id: 4, image: require("../../../../assets/landing.png") },
		{ id: 5, image: require("../../../../assets/landing.png") },
		{ id: 6, image: require("../../../../assets/landing.png") },
		{ id: 7, image: require("../../../../assets/landing.png") },
		{ id: 8, image: require("../../../../assets/landing.png") },
		{ id: 9, image: require("../../../../assets/landing.png") },
	];

	const renderContent = () => {
		switch (activeTab) {
			case "Highlights":
				return (
					<View className="space-y-4">
						{menuItems.map((item) => (
							<View
								key={item.id}
								className="flex-row items-center bg-gray-800 rounded-xl p-3"
							>
								<Image
									source={item.image}
									contentFit="cover"
									style={{ width: 60, height: 60 }}
									className="rounded-lg"
								/>
								<View className="flex-1 ml-3">
									<View className="flex-row items-center mb-1">
										<Text className="text-white font-bold text-base">
											{item.name}
										</Text>
										{item.badge && (
											<View className="ml-2 bg-gray-700 rounded px-2 py-1">
												<Text className="text-gray-300 text-xs">
													{item.badge}
												</Text>
											</View>
										)}
									</View>
									<Text className="text-gray-400 text-sm mb-1">
										{item.description}
									</Text>
									<Text className="text-white font-semibold">{item.price}</Text>
								</View>
							</View>
						))}
					</View>
				);

			case "Catalogue":
				return (
					<View>
						<Text className="text-white font-bold text-lg mb-4">Mains</Text>
						<View className="space-y-4">
							{menuItems.map((item) => (
								<View
									key={item.id}
									className="flex-row items-center bg-gray-800 rounded-xl p-3"
								>
									<Image
										source={item.image}
										contentFit="cover"
										style={{ width: 60, height: 60 }}
										className="rounded-lg"
									/>
									<View className="flex-1 ml-3">
										<Text className="text-white font-bold text-base">
											{item.name}
										</Text>
										<Text className="text-gray-400 text-sm mb-1">
											{item.description}
										</Text>
										<Text className="text-white font-semibold">
											{item.price}
										</Text>
									</View>
								</View>
							))}
						</View>
					</View>
				);

			case "Tagged posts":
				return (
					<View className="flex-row flex-wrap gap-2">
						{taggedPosts.map((post) => (
							<Image
								key={post.id}
								source={post.image}
								contentFit="cover"
								style={{ width: "31%", height: 100 }}
								className="rounded-lg"
							/>
						))}
					</View>
				);

			case "More Info":
				return (
					<View className="space-y-6">
						{/* Opening Hours */}
						<View>
							<Text className="text-yellow-400 font-bold text-lg mb-3">
								Opening Hours
							</Text>
							<View className="space-y-2">
								<View className="flex-row justify-between items-center">
									<Text className="text-white">Monday - Friday</Text>
									<View className="flex-row items-center">
										<Text className="text-white mr-2">12:00pm - 10:00pm</Text>
										<View className="bg-green-500 rounded px-2 py-1">
											<Text className="text-white text-xs">Open Now</Text>
										</View>
									</View>
								</View>
								<View className="flex-row justify-between items-center">
									<Text className="text-white">Saturday</Text>
									<View className="flex-row items-center">
										<Text className="text-white mr-2">11:00am - 11:00pm</Text>
										<View className="bg-red-500 rounded px-2 py-1">
											<Text className="text-white text-xs">Closed</Text>
										</View>
									</View>
								</View>
								<View className="flex-row justify-between items-center">
									<Text className="text-white">Sunday</Text>
									<View className="flex-row items-center">
										<Text className="text-white mr-2">11:00am - 9:00pm</Text>
										<View className="bg-red-500 rounded px-2 py-1">
											<Text className="text-white text-xs">Closed</Text>
										</View>
									</View>
								</View>
							</View>
						</View>

						{/* Contact Information */}
						<View>
							<Text className="text-yellow-400 font-bold text-lg mb-3">
								Contact Information
							</Text>
							<View className="space-y-3">
								<View className="flex-row items-center">
									<MapPin size={16} color={colors.primary} />
									<Text className="text-white ml-2">
										24 Grill Street, Cardiff CF10 2AB
									</Text>
								</View>
								<View className="flex-row items-center">
									<Phone size={16} color={colors.primary} />
									<Text className="text-white ml-2">(029) 1234 5678</Text>
								</View>
								<View className="flex-row items-center">
									<Globe size={16} color={colors.primary} />
									<Text className="text-white ml-2">
										www.thegrilledroom.co.uk
									</Text>
								</View>
								<View className="flex-row items-center">
									<Mail size={16} color={colors.primary} />
									<Text className="text-white ml-2">
										bookings@thegrilledroom.co.uk
									</Text>
								</View>
							</View>
						</View>
					</View>
				);

			default:
				return null;
		}
	};

	return (
		<ScrollView className="flex-1 bg-background">
			<View className="pt-16">
				{/* Header Image */}
				<View className="relative">
					<Image
						source={require("../../../../assets/landing.png")}
						contentFit="cover"
						style={{ width: "100%", height: 250 }}
					/>
				
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

					{/* Action Buttons */}
					<View className="flex-row gap-3 mb-6">
						<Pressable className="flex-1 bg-gray-800 rounded-xl py-3">
							<Text className="text-white font-semibold text-center">
								Follow
							</Text>
						</Pressable>
						<Pressable className="flex-1 bg-gray-800 rounded-xl py-3">
							<Text className="text-white font-semibold text-center">
								Reserve
							</Text>
						</Pressable>
						<Pressable className="flex-1 bg-gray-800 rounded-xl py-3">
							<Text className="text-white font-semibold text-center">
								Order Now
							</Text>
						</Pressable>
					</View>

					{/* Tabs */}
					<View className="flex-row mb-6">
						{["Highlights", "Catalogue", "Tagged posts", "More Info"].map(
							(tab) => (
								<Pressable
									key={tab}
									onPress={() => {
										if (tab === "Catalogue") {
											router.push(
												"/(protected)/(tabs)/(dining)/menu-catalogue",
											);
										} else if (tab === "Tagged posts") {
											router.push("/(protected)/(tabs)/(dining)/tagged-posts");
										} else if (tab === "More Info") {
											router.push("/(protected)/(tabs)/(dining)/more-info");
										} else {
											setActiveTab(tab);
										}
									}}
									className={`px-4 py-2 rounded-full mr-3 ${
										activeTab === tab ? "bg-primary" : "bg-transparent"
									}`}
								>
									<Text
										className={`font-medium ${
											activeTab === tab ? "text-black" : "text-white"
										}`}
									>
										{tab}
									</Text>
								</Pressable>
							),
						)}
					</View>

					{/* Content */}
					{renderContent()}
				</View>
			</View>
		</ScrollView>
	);
}
