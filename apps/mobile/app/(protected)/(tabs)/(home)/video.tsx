import { Image } from "expo-image";
import { Dimensions, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const { width, height } = Dimensions.get("window");

export default function Video() {
  return (
    <ScrollView className="flex-1 bg-background w-full">
      <View className="w-full h-full relative">
        <Image
          source={require("../../../../assets/landing.png")}
          contentFit="cover"
          style={{ width: width, height: height }}
        />

        {/* Overlay Text on Image */}
        <View className="absolute bottom-40 left-4 right-4 max-w-[80%]">
          <Text className="text-secondary font-bold text-3xl mb-3 ">
            Cheese Dripping Beef Burger
          </Text>

          {/* Restaurant Info */}
          <View className="flex-row items-center">
            <View className="w-6 h-6 bg-white rounded items-center justify-center mr-3">
              <Text className="text-black font-bold text-sm">KG</Text>
            </View>
            <Text className="text-white font-medium text-l">
              Kingstone Grill
            </Text>
          </View>

          <Text className="text-white text-base leading-6">
            Melted dreams and burger bliss. That golden cheddar drip? Pure
            magic. 🍔🧀
          </Text>
        </View>

      </View>
    </ScrollView>
  );
}
