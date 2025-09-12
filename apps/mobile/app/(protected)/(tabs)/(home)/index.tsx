import { Link } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { Button } from '../../../../src/components';
import { useTheme } from '../../../../src/providers/ThemeProvider';
import { useLogout, useUser } from '../../../../src/stores/authStore';

export default function HomeScreen() {
  const { isDark, setTheme } = useTheme();
  const user = useUser();
  const logout = useLogout();

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-4xl font-bold text-foreground text-center mb-2">
          Welcome to BiteScout!
        </Text>
        
        <Text className="text-lg text-muted-foreground text-center mb-4">
          Your restaurant discovery app
        </Text>
        
        <Text className="text-base text-primary text-center mb-8">
          Hello, {user?.name || 'User'}! 👋
        </Text>
        
        {/* Color System Demo */}
        <View className="bg-card rounded-lg p-4 mb-8 shadow-sm">
          <Text className="text-2xl font-semibold text-card-foreground mb-3">
            Color System Usage
          </Text>
          
          <View className="flex-row gap-2 mb-3">
            <View className="flex-1 items-center justify-center bg-primary p-2 rounded-sm">
              <Text className="text-xs text-primary-foreground">
                Primary
              </Text>
            </View>
            <View className="flex-1 items-center justify-center bg-secondary p-2 rounded-sm">
              <Text className="text-xs text-secondary-foreground">
                Secondary
              </Text>
            </View>
            <View className="flex-1 items-center justify-center bg-success p-2 rounded-sm">
              <Text className="text-xs text-success-foreground">
                Success
              </Text>
            </View>
          </View>
          
          <Text className="text-sm text-muted-foreground text-center">
            This demonstrates the design system colors
          </Text>
        </View>
        
        {/* Theme Toggle */}
        <View className="bg-card rounded-lg p-4 mb-8 shadow-sm">
          <Text className="text-lg font-semibold text-card-foreground mb-3 text-center">
            Theme Settings
          </Text>
          
          <View className="flex-row items-center justify-center gap-4">
            <Button
              title="Light"
              variant="outline"
              size="sm"
              onPress={() => setTheme('light')}
            />
            <Button
              title="Dark"
              variant="outline"
              size="sm"
              onPress={() => setTheme('dark')}
            />
            <Button
              title="System"
              variant="outline"
              size="sm"
              onPress={() => setTheme('system')}
            />
          </View>
          
          <Text className="text-sm text-muted-foreground text-center mt-2">
            Current: {isDark ? 'Dark' : 'Light'}
          </Text>
        </View>
        
        {/* Action Buttons */}
        <View className="w-full gap-3">
          <Button
            title="Explore Restaurants"
            color="primary"
            size="lg"
            fullWidth
            onPress={() => {}}
          />
          
          <View className="flex-row gap-3">
            <Button
              title="Search"
              color="secondary"
              variant="outline"
              size="md"
              style={{ flex: 1 }}
              onPress={() => {}}
            />
            <Button
              title="Upload"
              color="success"
              variant="outline"
              size="md"
              style={{ flex: 1 }}
              onPress={() => {}}
            />
          </View>
          
          <Button
            title="Logout"
            color="danger"
            variant="plain"
            size="md"
            fullWidth
            onPress={logout}
          />
        </View>
        
        {/* Navigation Links */}
        <View className="mt-8 gap-2">
          <Link href="/(protected)/(tabs)/(profile)" asChild>
            <Button
              title="Go to Profile"
              color="neutral"
              variant="plain"
              size="sm"
            />
          </Link>
          
          <Link href="/(protected)/(tabs)/search" asChild>
            <Button
              title="Go to Search"
              color="neutral"
              variant="plain"
              size="sm"
            />
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}