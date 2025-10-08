import { router } from "expo-router";
import {
  Award,
  BarChart,
  Bell,
  Eye,
  FileText,
  Flag,
  Folder,
  Lock,
  MapPin,
  Moon,
  Settings as SettingsIcon,
  Soup,
  Tag,
  Wrench,
} from "lucide-react-native";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../../../../src/providers/ThemeProvider";

export default function Settings() {
  const { colors } = useTheme();

  const profileOptions = [
    {
      section: "Utility + Personalization",
      items: [
        { name: "My Orders", icon: FileText, route: "my-orders" },
        {
          name: "My Activity (Posts, Videos, Reviews)",
          icon: Folder,
          route: "my-activity",
        },
        { name: "My Reviews", icon: MapPin, route: "my-reviews" },
        {
          name: "Dietary Preferences",
          icon: Tag,
          route: "dietary-preferences",
        },
        { name: "Saved Dishes", icon: Soup, route: "saved-dishes" },
        {
          name: "Notifications & Alerts",
          icon: Bell,
          route: "notifications-alerts",
        },
      ],
    },
    {
      section: "Social / Food Identity",
      items: [
        { name: "My Food Stats", icon: BarChart, route: "my-food-stats" },
        {
          name: "Foodie Level & Badges",
          icon: Award,
          route: "foodie-level-badges",
        },
        {
          name: "Who Viewed My Profile",
          icon: Eye,
          route: "who-viewed-profile",
        },
        { name: "Explore Challenges", icon: Flag, route: "explore-challenges" },
      ],
    },
    {
      section: "Preferences + System Settings",
      items: [
        { name: "Settings", icon: SettingsIcon, route: "settings" },
        {
          name: "Appearance (Light / Dark Mode)",
          icon: Moon,
          route: "appearance",
        },
        { name: "Privacy & Security", icon: Lock, route: "privacy-security" },
        {
          name: "Account Management",
          icon: Wrench,
          route: "account-management",
        },
      ],
    },
  ];

  return (
      <ScrollView className="flex-1 bg-background pt-6">
        {profileOptions.map((sectionData, sectionIndex) => (
          <View key={sectionData.section} className="mb-6 px-4">
            <Text className="text-muted-foreground text-sm font-semibold mb-4">
              {sectionData.section.toUpperCase()}
            </Text>
            {sectionData.items.map((item) => {
              const IconComponent = item.icon;
              return (
                <Pressable
                  key={item.name}
                  className="flex-row items-center py-3 gap-4"
                  onPress={() => {
                    const route = `/(protected)/(tabs)/(profile)/(menu)/${item.route}`;
                    router.push(route as Parameters<typeof router.push>[0]);
                  }}
                >
                  <IconComponent
                    size={20}
                    color={colors.secondary}
                    className="mr-3"
                  />
                  <Text className="text-foreground text-base">{item.name}</Text>
                </Pressable>
              );
            })}
            {sectionIndex < profileOptions.length - 1 && (
              <View className="h-[1px] bg-border my-4" />
            )}
          </View>
        ))}
      </ScrollView>
  );
}
