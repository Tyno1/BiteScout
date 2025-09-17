import { router, Stack } from "expo-router";
import { Bell, Image, Video } from "lucide-react-native";
import { useState } from "react";
import { Pressable, View } from "react-native";
import { useTheme } from "../../../../src/providers/ThemeProvider";

export default function HomeLayout() {
  const { colors } = useTheme();
  const [selectedButton, setSelectedButton] = useState<"image" | "video">(
    "image"
  );

  const handleSelectButton = (button: "image" | "video") => {
    setSelectedButton(button);
    if (button === "image") {
      router.push(`/(protected)/(tabs)/(home)`);
    } else {
      router.push(`/(protected)/(tabs)/(home)/video`);
    }
  };
  return (
    <Stack
      screenOptions={{
        headerTransparent: true,
        headerLeft: () => (
          <View className="bg-secondary max-w-46 rounded-full flex flex-row items-center justify-between gap-2 p-1.5">
            <Pressable
              className={`p-2 rounded-full ${selectedButton === "image" ? "bg-primary" : "bg-secondary"}`}
              onPress={() => handleSelectButton("image")}
            >
              <Image size={20} color={selectedButton === "image" ? colors.secondary : "black"} strokeWidth={1.5} />
            </Pressable>
            <Pressable
              className={`p-2 bg-primary rounded-full ${selectedButton === "video" ? "bg-primary" : "bg-secondary"}`}
              onPress={() => handleSelectButton("video")}
            >
              <Video size={20} color={selectedButton === "video" ? colors.secondary : "black"} strokeWidth={1.5} />
            </Pressable>
          </View>
        ),
        headerRight: () => (
          <View className="bg-secondary max-w-46 rounded-full flex flex-row items-center justify-between gap-4 p-1.5">
            <Pressable className="p-2">
              <Bell size={20} color="black" strokeWidth={1.5} />
            </Pressable>
          </View>
        ),

      }}
    >
       <Stack.Screen name="index" options={{ headerTitle: "" }} />
       <Stack.Screen name="video" options={{ headerTitle: "" }} />
    </Stack>
  );
}
