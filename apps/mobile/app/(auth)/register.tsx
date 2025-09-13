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
  useRegister,
} from "../../src/stores/authStore";

export default function RegisterScreen() {
  const register = useRegister();
  const isLoading = useIsLoading();
  const error = useError();
  const clearError = useClearError();
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [payload, setPayload] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const payloadSchema = z
    .object({
      firstName: z.string().min(1, { message: "First name is required" }),
      lastName: z.string().min(1, { message: "Last name is required" }),
      email: z.email({ message: "Invalid email address" }),
      password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" }),
      confirmPassword: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  // Clear errors when component mounts
  useEffect(() => {
    clearError();
  }, [clearError]);

  const handleRegister = async () => {
    if (
      !payload.firstName ||
      !payload.lastName ||
      !payload.email ||
      !payload.password ||
      !payload.confirmPassword
    ) {
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
    try {
      clearError(); // Clear any previous errors
      await register(payload);
      router.replace("/");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
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
                  Create Account
                </Text>
                <Text className="text-base text-muted-foreground text-center">
                  Sign up to get started
                </Text>
              </View>

              <View className="flex flex-col gap-4">
                <View className="flex-row gap-3">
                  <View className="flex-1">
                    <Input
                      outline="none"
                      label="First Name"
                      placeholder="First name"
                      value={payload.firstName}
                      onChangeText={(text) => {
                        setPayload({ ...payload, firstName: text });
                        if (fieldErrors.firstName) {
                          setFieldErrors((prev) => ({
                            ...prev,
                            firstName: "",
                          }));
                        }
                      }}
                      autoCapitalize="words"
                      autoCorrect={false}
                      required
                    />
                  </View>
                  <View className="flex-1">
                    <Input
                      outline="none"
                      label="Last Name"
                      placeholder="Last name"
                      value={payload.lastName}
                      onChangeText={setPayload({ ...payload, lastName: text })}
                      autoCapitalize="words"
                      autoCorrect={false}
                      required
                    />
                  </View>
                </View>

                <Input
                  outline="none"
                  label="Email"
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  required
                />

                <Input
                  outline="none"
                  label="Password"
                  placeholder="Create a password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  required
                />

                <Input
                  outline="none"
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                  required
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
                  title="Create Account"
                  onPress={handleRegister}
                  loading={isLoading}
                  disabled={isLoading}
                  fullWidth
                  color="primary"
                  size="lg"
                />

                <View className="flex-row items-center justify-center space-x-2">
                  <Text className="text-sm text-muted-foreground">
                    Already have an account?
                  </Text>
                  <Link href="/(auth)/login" asChild>
                    <Button
                      title="Sign In"
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
