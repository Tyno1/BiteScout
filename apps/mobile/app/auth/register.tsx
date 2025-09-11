import { Link } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, View } from 'react-native';
import { Button } from '../../src/components';
import { styles, useTheme } from '../../src/config';
import { useClearError, useError, useIsLoading, useRegister } from '../../src/stores/authStore';

export default function RegisterScreen() {
  const { theme } = useTheme();
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
      style={[
        styles.flex.flex1,
        { backgroundColor: theme.colors.background }
      ]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={[
          styles.flex.flex1,
          styles.flex.center,
          styles.spacing.p(4)
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[
          styles.flex.column,
          { 
            width: '100%',
            maxWidth: 400,
            gap: theme.spacing[6]
          }
        ]}>
          {/* Header */}
          <View style={[
            styles.flex.column,
            styles.flex.center,
            { gap: theme.spacing[2] }
          ]}>
            <Text style={{
              fontSize: theme.typography.fontSize['4xl'],
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.foreground,
              textAlign: 'center'
            }}>
              Create Account
            </Text>
            <Text style={{
              fontSize: theme.typography.fontSize.lg,
              color: theme.colors.mutedForeground,
              textAlign: 'center'
            }}>
              Join BiteScout and discover amazing restaurants
            </Text>
          </View>

          {/* Registration Form */}
          <View style={[
            styles.flex.column,
            { gap: theme.spacing[4] }
          ]}>
            {/* Name Fields */}
            <View style={[
              styles.flex.row,
              { gap: theme.spacing[3] }
            ]}>
              <View style={{ flex: 1 }}>
                <Text style={{
                  fontSize: theme.typography.fontSize.sm,
                  fontWeight: theme.typography.fontWeight.medium,
                  color: theme.colors.foreground,
                  marginBottom: theme.spacing[2]
                }}>
                  First Name
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
                  placeholder="First name"
                  placeholderTextColor={theme.colors.mutedForeground}
                  value={firstName}
                  onChangeText={setFirstName}
                  autoCapitalize="words"
                  autoCorrect={false}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{
                  fontSize: theme.typography.fontSize.sm,
                  fontWeight: theme.typography.fontWeight.medium,
                  color: theme.colors.foreground,
                  marginBottom: theme.spacing[2]
                }}>
                  Last Name
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
                  placeholder="Last name"
                  placeholderTextColor={theme.colors.mutedForeground}
                  value={lastName}
                  onChangeText={setLastName}
                  autoCapitalize="words"
                  autoCorrect={false}
                />
              </View>
            </View>

            <View>
              <Text style={{
                fontSize: theme.typography.fontSize.sm,
                fontWeight: theme.typography.fontWeight.medium,
                color: theme.colors.foreground,
                marginBottom: theme.spacing[2]
              }}>
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
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View>
              <Text style={{
                fontSize: theme.typography.fontSize.sm,
                fontWeight: theme.typography.fontWeight.medium,
                color: theme.colors.foreground,
                marginBottom: theme.spacing[2]
              }}>
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
                placeholder="Create a password"
                placeholderTextColor={theme.colors.mutedForeground}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View>
              <Text style={{
                fontSize: theme.typography.fontSize.sm,
                fontWeight: theme.typography.fontWeight.medium,
                color: theme.colors.foreground,
                marginBottom: theme.spacing[2]
              }}>
                Confirm Password
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
                placeholder="Confirm your password"
                placeholderTextColor={theme.colors.mutedForeground}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* Error Display */}
            {error && (
              <View style={{
                backgroundColor: theme.colors.destructive + '20',
                borderColor: theme.colors.destructive,
                borderWidth: 1,
                borderRadius: theme.borderRadius.md,
                padding: theme.spacing[3],
                marginBottom: theme.spacing[4]
              }}>
                <Text style={{
                  color: theme.colors.destructive,
                  fontSize: theme.typography.fontSize.sm,
                  textAlign: 'center'
                }}>
                  {error}
                </Text>
              </View>
            )}

            <Button
              title="Create Account"
              color="primary"
              variant="solid"
              onPress={handleRegister}
              loading={isLoading}
              fullWidth
            />
          </View>

          {/* Divider */}
          <View style={[
            styles.flex.row,
            styles.flex.center,
            { gap: theme.spacing[4] }
          ]}>
            <View style={{
              flex: 1,
              height: 1,
              backgroundColor: theme.colors.border
            }} />
            <Text style={{
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.mutedForeground
            }}>
              OR
            </Text>
            <View style={{
              flex: 1,
              height: 1,
              backgroundColor: theme.colors.border
            }} />
          </View>

          {/* Social Registration */}
          <View style={[
            styles.flex.column,
            { gap: theme.spacing[3] }
          ]}>
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
          <View style={[
            styles.flex.column,
            styles.flex.center,
            { gap: theme.spacing[2] }
          ]}>
            <View style={[
              styles.flex.row,
              styles.flex.center,
              { gap: theme.spacing[1] }
            ]}>
              <Text style={{
                fontSize: theme.typography.fontSize.sm,
                color: theme.colors.mutedForeground
              }}>
                Already have an account?
              </Text>
              <Link href="/auth/login" asChild>
                <Button
                  title="Sign In"
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
