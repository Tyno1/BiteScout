import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useTheme } from "../../../../src/providers/ThemeProvider";

export default function MyReviews() {
	const { colors } = useTheme();
	return (
		<ScrollView className="flex-1 bg-background">
			<View className="pt-16 pb-4 px-4 flex-row items-center">
				<Pressable
					onPress={() => router.back()}
					className="w-10 h-10 bg-secondary rounded-lg items-center justify-center"
				>
					<ArrowLeft size={20} color={colors.foreground} />
				</Pressable>
				<Text className="text-foreground text-2xl font-bold ml-4">
					My Reviews
				</Text>
			</View>
			<View className="p-4">
				<Text className="text-muted-foreground">
					Content for My Reviews screen.
				</Text>
			</View>
		</ScrollView>
	);
}
