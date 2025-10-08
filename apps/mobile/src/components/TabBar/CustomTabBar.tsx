import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import {
  HomeIcon,
  SearchIcon,
  UploadIcon,
  User,
  Utensils,
} from "lucide-react-native";

import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";


interface CustomTabBarProps extends BottomTabBarProps {
  colors: { primary: string; secondary: string, background: string, foreground: string };
}

export function CustomTabBar({
  colors,
  state,
  descriptors,
  navigation,
}: CustomTabBarProps) {
  const activeIndex = state?.index || 0;

  const getIcon = (routeName: string, isFocused: boolean) => {
    const iconColor = isFocused ? colors.primary : colors.secondary;
    const iconMap: Record<string, React.ReactNode> = {
      "(home)": <HomeIcon size={25} color={iconColor} />,
      "(search)": <SearchIcon size={25} color={iconColor} />,
      "upload/index": <UploadIcon size={25} color={iconColor} />,
      "(dining)": <Utensils size={25} color={iconColor} />,
      "(profile)": <User size={25} color={iconColor} />,
    };
    return iconMap[routeName] || <HomeIcon size={25} color={iconColor} />;
  };

  return (
    <View style={[styles.tabBar, { backgroundColor: colors.background }]}>
      {state?.routes.map((route, index: number) => {
        const { options } = descriptors[route.key];
        const label = typeof options.tabBarLabel === 'string' 
          ? options.tabBarLabel 
          : options.title || route.name;
        const isFocused = activeIndex === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <Pressable
            key={route.key}
            style={
              styles.tabBarItem
            }
            onPress={onPress}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
          >
            <View style={styles.tabBarIcon}>
              {getIcon(route.name, isFocused)}
            </View>
            <Text
              style={[
                styles.tabBarLabel,
                { color: isFocused ? colors.primary : colors.secondary }
              ]}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 0.2,
    borderColor: "gray",
    marginHorizontal: 10,
    borderRadius: 40,
    padding: 10,
    elevation: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  tabBarItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    padding: 10,
    width: 50,
    height: 50,
    backgroundColor: "transparent",
  },
  tabBarIcon: {
    width: 30,
    height: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
   tabBarLabel: {
     fontSize: 11,
     fontWeight: "600",
     marginTop: 1,
   },
});
