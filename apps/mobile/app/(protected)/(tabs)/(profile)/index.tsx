import { Alert, ScrollView, Text, View } from 'react-native';
import { Button } from '../../../../src/components';
import { useTheme } from '../../../../src/providers/ThemeProvider';
import { useLogout, useUser } from '../../../../src/stores/authStore';

export default function Profile() {
  const { isDark } = useTheme();
  const user = useUser();
  const logout = useLogout();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: logout }
      ]
    );
  };

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4">
        <View className="mb-6">
          <Text className="text-3xl font-bold text-foreground mb-2">Profile</Text>
          <Text className="text-base text-muted-foreground">Manage your account</Text>
        </View>
        
        <View className="bg-card rounded-lg p-4 mb-4 shadow-sm">
          <Text className="text-lg font-semibold text-card-foreground mb-4">Account Information</Text>
          
          <View className="mb-3">
            <Text className="text-sm text-muted-foreground mb-1">Name:</Text>
            <Text className="text-base text-foreground">
              {user?.name || 'Loading...'}
            </Text>
          </View>
          
          <View className="mb-3">
            <Text className="text-sm text-muted-foreground mb-1">Email:</Text>
            <Text className="text-base text-foreground">
              {user?.email || 'Loading...'}
            </Text>
          </View>
          
          <View className="mb-3">
            <Text className="text-sm text-muted-foreground mb-1">Member since:</Text>
            <Text className="text-base text-foreground">January 2024</Text>
          </View>
        </View>
        
        <View className="bg-card rounded-lg p-4 mb-4 shadow-sm">
          <Text className="text-lg font-semibold text-card-foreground mb-4">Preferences</Text>
          
          <View className="mb-3">
            <Text className="text-sm text-muted-foreground mb-1">Theme:</Text>
            <Text className="text-base text-foreground">
              {isDark ? 'Dark Mode' : 'Light Mode'}
            </Text>
          </View>
          
          <View className="mb-3">
            <Text className="text-sm text-muted-foreground mb-1">Notifications:</Text>
            <Text className="text-base text-foreground">Enabled</Text>
          </View>
        </View>
        
        <View className="bg-card rounded-lg p-4 mb-6 shadow-sm">
          <Text className="text-lg font-semibold text-card-foreground mb-4">Actions</Text>
          
          <View className="gap-3">
            <Button
              title="Edit Profile"
              color="primary"
              variant="outline"
              fullWidth
              onPress={() => {}}
            />
            
            <Button
              title="Change Password"
              color="secondary"
              variant="outline"
              fullWidth
              onPress={() => {}}
            />
            
            <Button
              title="Privacy Settings"
              color="neutral"
              variant="outline"
              fullWidth
              onPress={() => {}}
            />
            
            <Button
              title="Logout"
              color="danger"
              variant="solid"
              fullWidth
              onPress={handleLogout}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}