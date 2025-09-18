import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="settings" options={{ headerShown: false }} />
      <Stack.Screen name="edit-profile" options={{ headerShown: false }} />
      <Stack.Screen name="my-orders" options={{ headerShown: false }} />
      <Stack.Screen name="my-activity" options={{ headerShown: false }} />
      <Stack.Screen name="my-reviews" options={{ headerShown: false }} />
      <Stack.Screen name="dietary-preferences" options={{ headerShown: false }} />
      <Stack.Screen name="saved-dishes" options={{ headerShown: false }} />
      <Stack.Screen name="notifications-alerts" options={{ headerShown: false }} />
      <Stack.Screen name="my-food-stats" options={{ headerShown: false }} />
      <Stack.Screen name="foodie-level-badges" options={{ headerShown: false }} />
      <Stack.Screen name="who-viewed-profile" options={{ headerShown: false }} />
      <Stack.Screen name="explore-challenges" options={{ headerShown: false }} />
      <Stack.Screen name="appearance" options={{ headerShown: false }} />
      <Stack.Screen name="privacy-security" options={{ headerShown: false }} />
      <Stack.Screen name="account-management" options={{ headerShown: false }} />
    </Stack>
  );
}