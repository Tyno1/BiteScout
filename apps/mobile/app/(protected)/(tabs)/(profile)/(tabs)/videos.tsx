import { Image } from "expo-image";
import { ScrollView, Text, View } from "react-native";
import { useTheme } from "../../../../../src/providers/ThemeProvider";

export default function Videos() {
  const { colors } = useTheme();

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="px-4 pt-16">
        <Text className="text-white text-2xl font-bold mb-4">My Videos</Text>
        <View className="flex-row flex-wrap justify-between">
          {[...Array(12)].map((_, index) => (
            <Image
              key={index}
              source={require("../../../../../assets/landing.png")}
              contentFit="cover"
              style={{ width: "32%", height: 120, marginBottom: 8, borderRadius: 8 }}
            />
          ))}
        </View>
      </View>
      <View className="h-20" />
    </ScrollView>
  );
}
