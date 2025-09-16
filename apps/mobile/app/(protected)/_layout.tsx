import { Redirect, Stack } from "expo-router";
import { useIsAuthenticated } from "../../src/stores/authStore";

export default function ProtectedLayout() {
  const isAuthenticated = useIsAuthenticated();
  

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
  );
}
