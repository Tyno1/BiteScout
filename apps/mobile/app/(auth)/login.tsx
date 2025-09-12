import { Link, router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { Button } from "../../src/components";
import { useTheme } from "../../src/providers/ThemeProvider";
import {
  useClearError,
  useError,
  useIsLoading,
  useLogin,
} from "../../src/stores/authStore";

export default function LoginScreen() {
  const { isDark } = useTheme();
  const login = useLogin();
  const isLoading = useIsLoading();
  const error = useError();
  const clearError = useClearError();
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    if (!payload.email || !payload.password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      clearError();
      await login({ email: payload.email, password: payload.password });
      router.replace("/");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView className="flex-1">
        <View className="flex-1 items-center justify-center p-6">
          <View className="w-full max-w-sm">
            <View className="mb-8">
              <Text className="text-3xl font-bold text-foreground text-center mb-2">
                Welcome Back
              </Text>
              <Text className="text-base text-muted-foreground text-center">
                Sign in to your account
              </Text>
            </View>

            <View className="space-y-4">
              <View>
                <Text className="text-sm font-medium text-foreground mb-2">
                  Email
                </Text>
                <TextInput
                  className="bg-input border border-border rounded-md px-3 py-2 text-foreground"
                  placeholder="Enter your email"
                  placeholderTextColor="#9CA3AF"
                  value={payload.email}
                  onChangeText={(text) => setPayload({ ...payload, email: text })}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              <View>
                <Text className="text-sm font-medium text-foreground mb-2">
                  Password
                </Text>
                <TextInput
                  className="bg-input border border-border rounded-md px-3 py-2 text-foreground"
                  placeholder="Enter your password"
                  placeholderTextColor="#9CA3AF"
                  value={payload.password}
                  onChangeText={(text) => setPayload({ ...payload, password: text })}
                  secureTextEntry
                />
              </View>

              {error && (
                <View className="bg-destructive/10 border border-destructive/20 rounded-md p-3">
                  <Text className="text-sm text-destructive text-center">
                    {error}
                  </Text>
                </View>
              )}

              <Button
                title="Sign In"
                onPress={handleLogin}
                loading={isLoading}
                disabled={isLoading}
                fullWidth
                color="primary"
                size="lg"
              />

              <View className="flex-row items-center justify-center space-x-2">
                <Text className="text-sm text-muted-foreground">
                  Don't have an account?
                </Text>
                <Link href="/auth/register" asChild>
                  <Button
                    title="Sign Up"
                    variant="plain"
                    color="primary"
                    size="sm"
                  />
                </Link>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}