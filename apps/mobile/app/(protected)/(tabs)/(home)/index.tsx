import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Heart, MessageCircle, Send, Star } from "lucide-react-native";
import { Dimensions, ScrollView, Text, View } from "react-native";
import { FoodPostCard } from "../../../../src/components";

const { width } = Dimensions.get("window");

export default function ImageHome() {
	return (
		<ScrollView className="flex-1 bg-background pt-28">
			<LinearGradient
				colors={["rgb(0, 0, 0)", "rgba(34, 34, 34, 0.97)"]}
				style={{ position: "absolute", inset: 0 }}
			/>
			{/* Food Post Card */}
			{Array.from({ length: 10 }).map((_, index) => (
				<FoodPostCard key={index} />
			))}


			{/* Additional Posts */}
			<View className="px-4 mt-6">
				<Text className="text-white font-bold text-lg mb-4">
					More from this area
				</Text>

				{/* Post 2 */}
				<View className="bg-card rounded-xl mb-4 overflow-hidden">
					<Image
						source={require("../../../../assets/landing.png")}
						contentFit="cover"
						style={{ width: width - 32, height: 200 }}
					/>
					<View className="p-4">
						<Text className="text-white font-bold text-lg mb-2">
							Sushi Platter
						</Text>
						<View className="flex-row items-center justify-between">
							<View className="flex-row items-center">
								<Text className="text-gray-400 text-sm">Golden Dragon</Text>
								<View className="flex-row items-center ml-2">
									<Star size={14} color="#fbbf24" fill="#fbbf24" />
									<Text className="text-white text-sm ml-1">4.5</Text>
								</View>
							</View>
							<View className="flex-row items-center space-x-4">
								<Heart size={20} color="gray" />
								<MessageCircle size={20} color="gray" />
								<Send size={20} color="gray" />
							</View>
						</View>
					</View>
				</View>

				{/* Post 3 */}
				<View className="bg-card rounded-xl mb-6 overflow-hidden">
					<Image
						source={require("../../../../assets/landing.png")}
						contentFit="cover"
						style={{ width: width - 32, height: 200 }}
					/>
					<View className="p-4">
						<Text className="text-white font-bold text-lg mb-2">
							Pasta Carbonara
						</Text>
						<View className="flex-row items-center justify-between">
							<View className="flex-row items-center">
								<Text className="text-gray-400 text-sm">Bella Vista</Text>
								<View className="flex-row items-center ml-2">
									<Star size={14} color="#fbbf24" fill="#fbbf24" />
									<Text className="text-white text-sm ml-1">4.7</Text>
								</View>
							</View>
							<View className="flex-row items-center space-x-4">
								<Heart size={20} color="gray" />
								<MessageCircle size={20} color="gray" />
								<Send size={20} color="gray" />
							</View>
						</View>
					</View>
				</View>
			</View>
		</ScrollView>
	);
}
