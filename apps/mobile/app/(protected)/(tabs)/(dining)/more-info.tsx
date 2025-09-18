import { Image } from "expo-image";
import {
	ArrowLeft,
	Globe,
	Mail,
	MapPin,
	Phone,
	Star,
} from "lucide-react-native";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useTheme } from "../../../../src/providers/ThemeProvider";

export default function MoreInfo() {
	const { colors } = useTheme();

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

					{/* Opening Hours */}
					<View className="mb-6">
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
					<View className="mb-20">
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
			</View>
		</ScrollView>
	);
}
