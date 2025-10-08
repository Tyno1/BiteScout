import { ScrollView, Text, View } from "react-native";

export default function Appearance() {
	return (
		<ScrollView className="flex-1 bg-background">

			<View className="p-4">
				<Text className="text-muted-foreground">
					Content for Appearance (Light / Dark Mode) screen.
				</Text>
			</View>
		</ScrollView>
	);
}
