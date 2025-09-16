import { Redirect, Stack } from "expo-router";
import { useTheme } from "../../src/providers/ThemeProvider";
import { useIsAuthenticated } from "../../src/stores/authStore";

export default function AuthLayout() {
  const isAuthenticated = useIsAuthenticated();
  const theme = useTheme();
  if (isAuthenticated) {
    return <Redirect href="/(protected)/(tabs)/(home)" />;
  }
  console.log(theme.isDark);

  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
    </Stack>
  );
}
