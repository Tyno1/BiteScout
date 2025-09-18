import { router, Stack } from "expo-router";
import { ArrowLeft, View } from "lucide-react-native";
import { TouchableOpacity } from "react-native";

export default function DiningLayout() {
  return (
    <Stack
      screenOptions={{
        headerTransparent: true,
        headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <ArrowLeft size={20} color="white" />
            </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="restaurant-detail" options={{ headerTitle: "" }} />
      <Stack.Screen name="menu-catalogue" options={{ headerTitle: "" }} />
      <Stack.Screen name="tagged-posts" options={{ headerTitle: "" }} />
      <Stack.Screen name="more-info" options={{ headerTitle: "" }} />
    </Stack>
  );
}
