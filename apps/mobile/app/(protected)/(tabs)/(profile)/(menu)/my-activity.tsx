import { ScrollView, Text, View } from "react-native";

export default function MyActivity() {
	return (
		<ScrollView className="flex-1 bg-background">
			<View className="p-4">
				<Text className="text-muted-foreground">
					Content for My Activity (Posts, Videos, Reviews) screen.
				</Text>
			</View>
		</ScrollView>
	);
}
