import { router, Stack } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";

export default function SettingsLayout() {
  return (
    <Stack
      screenOptions={{
        headerTransparent: false,
        headerStyle: { backgroundColor: '#09090b' },
        headerTintColor: 'white',
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={20} color="white" />
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen name="index" options={{headerTitle:"settings and account"}}/>
      <Stack.Screen name="edit-profile" />
      <Stack.Screen name="my-orders" />
      <Stack.Screen name="my-activity" />
      <Stack.Screen name="my-reviews" />
      <Stack.Screen name="dietary-preferences" />
      <Stack.Screen name="saved-dishes" />
      <Stack.Screen name="notifications-alerts" />
      <Stack.Screen name="my-food-stats" />
      <Stack.Screen name="foodie-level-badges" />
      <Stack.Screen name="who-viewed-profile" />
      <Stack.Screen name="explore-challenges" />
      <Stack.Screen name="appearance" />
      <Stack.Screen name="privacy-security" />
      <Stack.Screen name="account-management" />
    </Stack>
  );
}
