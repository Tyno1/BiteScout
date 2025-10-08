import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useTheme } from "../../../../../src/providers/ThemeProvider";

export default function EditProfile() {
	const { colors } = useTheme();
	return (
		<ScrollView className="flex-1 bg-background">
			<View className="px-4 pt-16">

				{/* Profile Picture Placeholder */}
				<View className="items-center mb-8">
					<View className="w-32 h-32 bg-gray-700 rounded-full items-center justify-center mb-4">
						<Text className="text-white text-lg">Change Photo</Text>
					</View>
						<Text className="text-primary text-base font-semibold">
							Upload New Photo
						</Text>
				</View>

				{/* Form Fields */}
				<View className="mb-8">
					<Text className="text-gray-400 text-sm mb-2">Name</Text>
					<TextInput
						className="bg-card text-white rounded-lg px-4 py-3 mb-4"
						placeholder="Frank Milton"
						placeholderTextColor={colors.secondary}
					/>

					<Text className="text-gray-400 text-sm mb-2">Username</Text>
					<TextInput
						className="bg-card text-white rounded-lg px-4 py-3 mb-4"
						placeholder="foodie_chloe"
						placeholderTextColor={colors.secondary}
					/>

					<Text className="text-gray-400 text-sm mb-2">Bio</Text>
					<TextInput
						className="bg-card text-white rounded-lg px-4 py-3 h-24 mb-4"
						placeholder="Always hunting for the next amazing bite..."
						placeholderTextColor={colors.secondary}
						multiline
					/>

					<Text className="text-gray-400 text-sm mb-2">Location</Text>
					<TextInput
						className="bg-card text-white rounded-lg px-4 py-3 mb-4"
						placeholder="New York, USA"
						placeholderTextColor={colors.secondary}
					/>
				</View>

				{/* Save Button */}
				<Pressable className="bg-primary rounded-lg py-4 items-center">
					<Text className="text-black text-lg font-bold">Save Changes</Text>
				</Pressable>
			</View>
			<View className="h-20" />
		</ScrollView>
	);
}
