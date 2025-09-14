import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../../../src/components";
import { useTheme } from "../../../../src/providers/ThemeProvider";
import { useLogout, useUser } from "../../../../src/stores/authStore";

export default function HomeScreen() {
  const { isDark, setTheme } = useTheme();
  const user = useUser();
  const logout = useLogout();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 bg-background">
        <View className="flex-1 items-center justify-center p-4">
          <Text className="text-4xl font-bold text-foreground text-center mb-2">
            Welcome to BiteScout!
          </Text>

          <Text className="text-lg text-muted-foreground text-center mb-4">
            Your restaurant discovery app
          </Text>

          <Text className="text-base text-primary text-center mb-8">
            Hello, {user?.name || "User"}! 
            
          </Text>

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
                onPress={() => setTheme("light")}
              />
              <Button
                title="Dark"
                variant="outline"
                size="sm"
                onPress={() => setTheme("dark")}
              />
              <Button
                title="System"
                variant="outline"
                size="sm"
                onPress={() => setTheme("system")}
              />
            </View>

            <Text className="text-sm text-muted-foreground text-center mt-2">
              Current: {isDark ? "Dark" : "Light"}
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

            <Button
              title="Logout"
              color="danger"
              variant="plain"
              size="md"
              fullWidth
              onPress={logout}
            />
          </View>

          <Text className="text-sm text-muted-foreground text-center mt-4">
            App is working! 🎉
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
