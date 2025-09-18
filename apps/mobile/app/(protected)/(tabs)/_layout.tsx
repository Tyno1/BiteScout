import { Tabs } from "expo-router";
import { View } from "react-native";
import { CustomTabBar } from "../../../src/components";
import { useTheme } from "../../../src/providers/ThemeProvider";

export default function TabLayout() {
  const {colors} = useTheme();

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        tabBar={(props) => (
          <CustomTabBar
            colors={colors}
            {...props}
          />
        )}
        screenOptions={{
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
      >
        <Tabs.Screen
          name="(home)"
          options={{
            title: "Home",
            headerShown: false,
            tabBarStyle: { display: "none" },
          }}
        />
        <Tabs.Screen
          name="(search)"
          options={{
            title: "Search",
            headerShown: false,
            tabBarStyle: { display: "none" },
          }}
        />
        <Tabs.Screen
          name="upload/index"
          options={{
            title: "Upload",
            headerShown: false,
            tabBarStyle: { display: "none" },
          }}
        />
        <Tabs.Screen
          name="(dining)"
          options={{
            title: "Dining",
            headerShown: false,
            tabBarStyle: { display: "none" },
          }}
        />
        <Tabs.Screen
          name="(profile)"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarStyle: { display: "none" },
          }}
        />
      </Tabs>
    </View>
  );
}
