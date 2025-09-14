import  {Redirect, Stack} from "expo-router";
import { useIsAuthenticated } from "../../src/stores/authStore";
export default function AuthLayout() {
  const isAuthenticated = useIsAuthenticated();

  if (isAuthenticated) {
    return <Redirect href="/(protected)/(tabs)/(home)" />;
  }

  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
    </Stack>
  );
}