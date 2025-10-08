import { ScrollView, Text, View } from "react-native";

export default function WhoViewedProfile() {
	return (
		<ScrollView className="flex-1 bg-background">
			<View className="p-4">
				<Text className="text-muted-foreground">
					Content for Who Viewed My Profile screen.
				</Text>
			</View>
		</ScrollView>
	);
}
