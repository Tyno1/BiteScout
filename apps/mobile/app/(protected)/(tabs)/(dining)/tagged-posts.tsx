import { Image } from "expo-image";
import { ArrowLeft, Star } from "lucide-react-native";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useTheme } from "../../../../src/providers/ThemeProvider";

export default function TaggedPosts() {
	const { colors } = useTheme();

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
					<View className="flex-row items-center mb-6">
						<Text className="text-white">
							Glamorgan Street, Barry, CF62 6JN
						</Text>
					</View>

					{/* Tagged Posts Grid */}
					<View className="flex-row flex-wrap gap-2 mb-20">
						{taggedPosts.map((post) => (
							<Pressable key={post.id} className="w-[31%]">
								<Image
									source={post.image}
									contentFit="cover"
									style={{ width: "100%", height: 100 }}
									className="rounded-lg"
								/>
							</Pressable>
						))}
					</View>
				</View>
			</View>
		</ScrollView>
	);
}
