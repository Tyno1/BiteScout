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
          name="search/index"
          options={{
            title: "Search",
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="upload/index"
          options={{
            title: "Upload",
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="restaurant/index"
          options={{
            title: "Restaurant",
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="(profile)/index"
          options={{
            title: "Profile",
            headerShown: false,
          }}
        />
      </Tabs>
  );
}
