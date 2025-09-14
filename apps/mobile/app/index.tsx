import { Image } from "expo-image";
import { Redirect, router } from "expo-router";
import { Text, View } from "react-native";
import { Button } from "../src/components";
import { useIsAuthenticated } from "../src/stores/authStore";

export default function IndexScreen() {
const isAuthenticated = useIsAuthenticated()
  if (isAuthenticated){
    return <Redirect href="/(protected)/(tabs)/(home)" />
  }

  return (
    <View className="bg-background flex-1 justify-end mb-10">
      <Image source={require('../assets/landing.png')} contentFit='contain'/>

      <View className="px-4">
        <Text className="text-4xl font-black text-left text-foreground mb-4">
          Discover and share food moments that matter.
        </Text>
        <Text className="text-md text-left w-[80%]">
          From street bites to signature dishes. Join a community of taste
          explorers.
        </Text>
        <View className="mt-10 flex items-end">
          <Button
            title="Get Started"
            variant="solid"
            size="lg"
            color="neutral"
            className="rounded-3xl"
            onPress={() => router.replace("/(auth)/login")}
          />
        </View>
      </View>
    </View>
  );
}
