import { Image } from "expo-image";
import { router } from "expo-router";
import { Lightbulb, MoreHorizontal } from "lucide-react-native";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useTheme } from "../../../../src/providers/ThemeProvider";

export default function Profile() {
	const { colors } = useTheme();
	const [activeTab, setActiveTab] = useState("Posts");

	const profileImage = require("../../../../assets/landing.png"); // Using placeholder image

	// Tab content components
	const renderTabContent = () => {
		switch (activeTab) {
			case "Posts":
				return (
					<View className="flex-row flex-wrap justify-between mb-20">
						{[...Array(12)].map((_, index) => (
							<Image
								key={index}
								source={require("../../../../assets/landing.png")}
								contentFit="cover"
								style={{
									width: "32%",
									height: 120,
									marginBottom: 8,
									borderRadius: 8,
								}}
							/>
						))}
					</View>
				);
			case "Videos":
				return (
					<View className="flex-row flex-wrap justify-between mb-20">
						{[...Array(12)].map((_, index) => (
							<Image
								key={index}
								source={require("../../../../assets/landing.png")}
								contentFit="cover"
								style={{
									width: "32%",
									height: 120,
									marginBottom: 8,
									borderRadius: 8,
								}}
							/>
						))}
					</View>
				);
			case "Saved":
				return (
					<View className="flex-row flex-wrap justify-between mb-20">
						{[...Array(12)].map((_, index) => (
							<Image
								key={index}
								source={require("../../../../assets/landing.png")}
								contentFit="cover"
								style={{
									width: "32%",
									height: 120,
									marginBottom: 8,
									borderRadius: 8,
								}}
							/>
						))}
					</View>
				);
			case "Tagged":
				return (
					<View className="flex-row flex-wrap justify-between mb-20">
						{[...Array(9)].map((_, index) => (
							<Image
								key={index}
								source={require("../../../../assets/landing.png")}
								contentFit="cover"
								style={{
									width: "32%",
									height: 120,
									marginBottom: 8,
									borderRadius: 8,
								}}
							/>
						))}
					</View>
				);
			default:
				return null;
		}
	};

	return (
		<ScrollView className="flex-1 bg-background">
			<View className="px-4 pt-16">
				{/* Header */}
				<View className="flex-row justify-between items-center mb-6">
					<Text className="text-white text-lg font-semibold">
						@foodie_chloe
					</Text>
					<Pressable
						onPress={() =>
							router.push("/(protected)/(tabs)/(profile)/settings")
						}
					>
						<MoreHorizontal size={24} color="white" />
					</Pressable>
				</View>

				{/* Profile Info */}
				<View className="flex-row items-center mb-6">
					<Image
						source={profileImage}
						contentFit="cover"
						style={{ width: 80, height: 80, borderRadius: 40 }}
						className="mr-4"
					/>
					<View>
						<Text className="text-white text-2xl font-bold">Frank Milton</Text>
						<Text className="text-gray-400 text-sm">Joined April 2025</Text>
						<Pressable
							className="mt-2 bg-card px-4 py-2 rounded-full"
							onPress={() =>
								router.push("/(protected)/(tabs)/(profile)/edit-profile")
							}
						>
							<Text className="text-white font-semibold">Edit Profile</Text>
						</Pressable>
					</View>
				</View>

				{/* Bio */}
				<View className="mb-6">
					<View className="flex-row items-center mb-1">
						<Lightbulb size={16} color={colors.secondary} className="mr-2" />
						<Text className="text-white text-base">
							Always hunting for the next amazing bite
						</Text>
					</View>
					<Text className="text-white text-base">
						• Home cook with a passion for Mexican dishes
					</Text>
					<Text className="text-white text-base">
						• Sharing my culinary adventures one dish at a time
					</Text>
					<Text className="text-white text-base">
						• DM me your hidden gem recommendations!
					</Text>
				</View>

				{/* Statistics */}
				<View className="bg-card rounded-xl p-4 flex-row justify-around mb-6">
					<View className="items-center">
						<Text className="text-white text-2xl font-bold">86</Text>
						<Text className="text-gray-400 text-sm">Posts</Text>
					</View>
					<View className="items-center">
						<Text className="text-white text-2xl font-bold">220</Text>
						<Text className="text-gray-400 text-sm">Followers</Text>
					</View>
					<View className="items-center">
						<Text className="text-white text-2xl font-bold">180</Text>
						<Text className="text-gray-400 text-sm">Following</Text>
					</View>
					<View className="items-center">
						<Text className="text-white text-2xl font-bold">37</Text>
						<Text className="text-gray-400 text-sm">Restaurants</Text>
					</View>
				</View>

				{/* Tabs */}
				<View className="flex-row justify-around mb-6">
					{["Posts", "Videos", "Saved", "Tagged"].map((tab) => (
						<Pressable
							key={tab}
							onPress={() => setActiveTab(tab)}
							className={`px-4 py-2 rounded-full ${
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
					))}
				</View>

				{/* Tab Content */}
				{renderTabContent()}
			</View>
		</ScrollView>
	);
}
