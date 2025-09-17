import { Image } from "expo-image";
import { Dimensions, ScrollView, View } from "react-native";

const { width, height } = Dimensions.get('window');

export default function Video() {
  return (
    <ScrollView className="flex-1 bg-background w-full">
      <View className="w-full h-full">
        <Image
          source={require("../../../../assets/landing.png")}
          contentFit="contain"
          contentPosition={"top"}
          style={{ width: width, height: height }}
        />
      </View>
    </ScrollView>
  );
}
