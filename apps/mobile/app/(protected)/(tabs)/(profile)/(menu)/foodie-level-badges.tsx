import { ScrollView, Text, View } from "react-native";

export default function FoodieLevelBadges() {
  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4">
        <Text className="text-muted-foreground">
          Content for Foodie Level & Badges screen.
        </Text>
      </View>
    </ScrollView>
  );
}
