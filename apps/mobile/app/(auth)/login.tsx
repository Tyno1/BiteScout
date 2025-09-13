import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Alert as RNAlert,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import z from "zod";
import { Alert, Button, Input } from "../../src/components";
import {
  useClearError,
  useError,
  useIsLoading,
  useLogin,
} from "../../src/stores/authStore";

export default function LoginScreen() {
  const login = useLogin();
  const isLoading = useIsLoading();
  const error = useError();
  const clearError = useClearError();
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Clear errors when component mounts
  useEffect(() => {
    clearError();
    setFieldErrors({});
  }, [clearError]);

  const payloadSchema = z.object({
    email: z.email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
  });

  const handleLogin = async () => {
    if (!payload.email || !payload.password) {
      RNAlert.alert("Error", "Please fill in all fields");
      return;
    }
    const result = payloadSchema.safeParse(payload);
    if (!result.success) {
      const newFieldErrors: Record<string, string> = {};
      
      for (const issue of result.error.issues) {
        if (issue.path.length > 0) {
          const field = issue.path[0] as string;
          newFieldErrors[field] = issue.message;
        }
      }
      
      setFieldErrors(newFieldErrors);
      return;
    }
    
    setFieldErrors({});

    try {
      clearError();
      await login({ email: payload.email, password: payload.password });
      router.replace("/");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background ">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
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

              <View className="flex flex-col gap-4">
                <Input
                  outline="none"
                  label="Email"
                  placeholder="Enter your email"
                  value={payload.email}
                  onChangeText={(text) => {
                    setPayload({ ...payload, email: text });
                    if (fieldErrors.email) {
                      setFieldErrors(prev => ({ ...prev, email: "" }));
                    }
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  required
                  error={fieldErrors.email}
                />

                <Input
                  outline="none"
                  label="Password"
                  placeholder="Enter your password"
                  value={payload.password}
                  onChangeText={(text) => {
                    setPayload({ ...payload, password: text });
                    if (fieldErrors.password) {
                      setFieldErrors(prev => ({ ...prev, password: "" }));
                    }
                  }}
                  secureTextEntry
                  required
                  error={fieldErrors.password}
                />

                {error && (
                  <Alert
                    status="error"
                    size="sm"
                    dismissible
                    onClose={clearError}
                  >
                    {error}
                  </Alert>
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
                  <Link href="/(auth)/register" asChild>
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
    </SafeAreaView>
  );
}
