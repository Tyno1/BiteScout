import { Link } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, View } from 'react-native';
import { Button } from '../../src/components';
import { useTheme } from '../../src/providers/ThemeProvider';
import { useClearError, useError, useIsLoading, useRegister } from '../../src/stores/authStore';

export default function RegisterScreen() {
  const { isDark } = useTheme();
  const register = useRegister();
  const isLoading = useIsLoading();
  const error = useError();
  const clearError = useClearError();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    try {
      clearError(); // Clear any previous errors
      await register({ firstName, lastName, email, password });
      // Navigation is handled by the ProtectedRoute component
    } catch (error) {
      // Error is already set in the store, no need to show alert here
      // The error will be displayed in the UI
    }
  };

  return (
    <KeyboardAvoidingView 
      className="flex-1 bg-background"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView className="flex-1">
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

            <View className="space-y-4">
              <View className="flex-row space-x-3">
                <View className="flex-1">
                  <Text className="text-sm font-medium text-foreground mb-2">
                    First Name
                  </Text>
                  <TextInput
                    className="bg-input border border-border rounded-md px-3 py-2 text-foreground"
                    placeholder="First name"
                    placeholderTextColor="#9CA3AF"
                    value={firstName}
                    onChangeText={setFirstName}
                    autoCapitalize="words"
                    autoCorrect={false}
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-medium text-foreground mb-2">
                    Last Name
                  </Text>
                  <TextInput
                    className="bg-input border border-border rounded-md px-3 py-2 text-foreground"
                    placeholder="Last name"
                    placeholderTextColor="#9CA3AF"
                    value={lastName}
                    onChangeText={setLastName}
                    autoCapitalize="words"
                    autoCorrect={false}
                  />
                </View>
              </View>

              <View>
                <Text className="text-sm font-medium text-foreground mb-2">
                  Email
                </Text>
                <TextInput
                  className="bg-input border border-border rounded-md px-3 py-2 text-foreground"
                  placeholder="Enter your email"
                  placeholderTextColor="#9CA3AF"
                  value={email}
                  onChangeText={setEmail}
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
                  placeholder="Create a password"
                  placeholderTextColor="#9CA3AF"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>

              <View>
                <Text className="text-sm font-medium text-foreground mb-2">
                  Confirm Password
                </Text>
                <TextInput
                  className="bg-input border border-border rounded-md px-3 py-2 text-foreground"
                  placeholder="Confirm your password"
                  placeholderTextColor="#9CA3AF"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
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
                <Link href="/auth/login" asChild>
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
  );
}