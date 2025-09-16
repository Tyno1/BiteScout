import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
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
    <View className="bg-black flex-1 justify-end relative">
      <Image 
        source={require('../assets/landing.png')} 
        contentFit='contain'
        contentPosition={'top'}
        style={{ width: '100%', height: '100%', position: "absolute" }}
      />
      <LinearGradient
        colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}
        style={{ position: 'absolute', inset: 0 }}
      />

      <View className="px-4 mb-14">
        <Text className="text-4xl font-black text-left text-white mb-4">
          Discover and share food moments that matter.
        </Text>
        <Text className="text-md text-left text-white w-[80%]">
          From street bites to signature dishes. Join a community of taste
          explorers.
        </Text>
        <View className="mt-10 flex items-end">
          <Button
            title="Get Started"
            variant="solid"
            size="lg"
            color="white"
            className="rounded-2xl"
            onPress={() => router.replace("/(auth)/login")}
          />
        </View>
      </View>
    </View>
  );
}
