import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
      <Tabs>
        <Tabs.Screen
          name="(home)"
          options={{
            title: "Home",
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: "Search",
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="upload"
          options={{
            title: "Upload",
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="restaurant"
          options={{
            title: "Restaurant",
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="(profile)"
          options={{
            title: "Profile",
            headerShown: false,
          }}
        />
      </Tabs>
  );
}
