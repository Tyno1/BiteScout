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
import { styles, useTheme } from "../../src/config";
import {
  useClearError,
  useError,
  useIsLoading,
  useLogin,
} from "../../src/stores/authStore";

export default function LoginScreen() {
  const { theme } = useTheme();
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
      style={[styles.flex.flex1, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={[
          styles.flex.flex1,
          styles.flex.center,
          styles.spacing.p(4),
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <View
          style={[
            styles.flex.column,
            {
              width: "100%",
              maxWidth: 400,
              gap: theme.spacing[6],
            },
          ]}
        >
          {/* Header */}
          <View
            style={[
              styles.flex.column,
              styles.flex.center,
              { gap: theme.spacing[2] },
            ]}
          >
            <Text
              style={{
                fontSize: theme.typography.fontSize["4xl"],
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.foreground,
                textAlign: "center",
              }}
            >
              Welcome Back
            </Text>
            <Text
              style={{
                fontSize: theme.typography.fontSize.lg,
                color: theme.colors.mutedForeground,
                textAlign: "center",
              }}
            >
              Sign in to your BiteScout account
            </Text>
          </View>

          {/* Login Form */}
          <View style={[styles.flex.column, { gap: theme.spacing[4] }]}>
            <View>
              <Text
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  fontWeight: theme.typography.fontWeight.medium,
                  color: theme.colors.foreground,
                  marginBottom: theme.spacing[2],
                }}
              >
                Email
              </Text>
              <TextInput
                style={{
                  backgroundColor: theme.colors.card,
                  borderColor: theme.colors.border,
                  borderWidth: 1,
                  borderRadius: theme.borderRadius.md,
                  padding: theme.spacing[3],
                  fontSize: theme.typography.fontSize.base,
                  color: theme.colors.foreground,
                }}
                placeholder="Enter your email"
                placeholderTextColor={theme.colors.mutedForeground}
                value={payload.email}
                onChangeText={(text) => setPayload({ ...payload, email: text })}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View>
              <Text
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  fontWeight: theme.typography.fontWeight.medium,
                  color: theme.colors.foreground,
                  marginBottom: theme.spacing[2],
                }}
              >
                Password
              </Text>
              <TextInput
                style={{
                  backgroundColor: theme.colors.card,
                  borderColor: theme.colors.border,
                  borderWidth: 1,
                  borderRadius: theme.borderRadius.md,
                  padding: theme.spacing[3],
                  fontSize: theme.typography.fontSize.base,
                  color: theme.colors.foreground,
                }}
                placeholder="Enter your password"
                placeholderTextColor={theme.colors.mutedForeground}
                value={payload.password}
                onChangeText={(text) =>
                  setPayload({ ...payload, password: text })
                }
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* Error Display */}
            {error && (
              <View
                style={{
                  backgroundColor: theme.colors.destructive,
                  borderColor: theme.colors.destructive,
                  borderWidth: 1,
                  borderRadius: theme.borderRadius.md,
                  padding: theme.spacing[3],
                  marginBottom: theme.spacing[4],
                }}
              >
                <Text
                  style={{
                    color: theme.colors.destructive,
                    fontSize: theme.typography.fontSize.sm,
                    textAlign: "center",
                  }}
                >
                  {error}
                </Text>
              </View>
            )}

            <Button
              title="Sign In"
              color="primary"
              variant="solid"
              onPress={handleLogin}
              loading={isLoading}
              fullWidth
            />
          </View>

          {/* Divider */}
          <View
            style={[
              styles.flex.row,
              styles.flex.center,
              { gap: theme.spacing[4] },
            ]}
          >
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: theme.colors.border,
              }}
            />
            <Text
              style={{
                fontSize: theme.typography.fontSize.sm,
                color: theme.colors.mutedForeground,
              }}
            >
              OR
            </Text>
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: theme.colors.border,
              }}
            />
          </View>

          {/* Social Login */}
          <View style={[styles.flex.column, { gap: theme.spacing[3] }]}>
            <Button
              title="Continue with Google"
              color="secondary"
              variant="outline"
              onPress={() => {}}
              fullWidth
            />
            <Button
              title="Continue with Apple"
              color="secondary"
              variant="outline"
              onPress={() => {}}
              fullWidth
            />
          </View>

          {/* Footer Links */}
          <View
            style={[
              styles.flex.column,
              styles.flex.center,
              { gap: theme.spacing[2] },
            ]}
          >
            <Link href="/auth/forgot-password" asChild>
              <Button
                title="Forgot Password?"
                color="primary"
                variant="plain"
                onPress={() => {}}
              />
            </Link>

            <View
              style={[
                styles.flex.row,
                styles.flex.center,
                { gap: theme.spacing[1] },
              ]}
            >
              <Text
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  color: theme.colors.mutedForeground,
                }}
              >
                Don't have an account?
              </Text>
              <Link href="/auth/register" asChild>
                <Button
                  title="Sign Up"
                  color="primary"
                  variant="plain"
                  onPress={() => {}}
                />
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
