import { Image } from "expo-image";
import {
  Bookmark,
  Clock,
  Heart,
  MapPin,
  MessageCircle,
  MoreHorizontal,
  Send,
  Star,
} from "lucide-react-native";
import { Dimensions, Pressable, Text, View } from "react-native";
import { useTheme } from "../../../providers/ThemeProvider";

const { width } = Dimensions.get("window");

export function FoodPostCard() {
  const { colors } = useTheme();
  return (
    <View className="bg-transparent rounded-2xl mt-4 shadow-lg overflow-hidden">
      {/* Header */}
      <View className="flex-row items-center justify-between p-4">
        <View className="flex-row items-center">
          <View className="w-10 h-10 bg-primary rounded-full items-center justify-center mr-3">
            <Text className="text-white font-bold text-sm">FL</Text>
          </View>
          <View>
            <Text className="text-white font-semibold text-base">
              Foodlover89
            </Text>
            <Text className="text-gray-400 text-sm">2 hours ago</Text>
          </View>
        </View>
        <Pressable className="p-2">
          <MoreHorizontal size={20} color="white" />
        </Pressable>
      </View>

      {/* Food Image */}
      <View className="relative">
        <Image
          source={require("../../../../assets/landing.png")}
          contentFit="cover"
          style={{ width: "100%", height: 300 }}
        />

        {/* Category Tag */}
        <View className="absolute top-4 right-4 bg-secondary rounded-full px-4 py-1">
          <Text className="text-black font-semibold text-xs">Mains</Text>
        </View>
      </View>

      {/* Image Carousel Dots */}
      <View className="flex-row gap-1 mx-auto mt-3">
        <View className="w-2 h-2 bg-orange-500 rounded-full" />
        <View className="w-2 h-2 bg-white/50 rounded-full" />
        <View className="w-2 h-2 bg-white/50 rounded-full" />
        <View className="w-2 h-2 bg-white/50 rounded-full" />
        <View className="w-2 h-2 bg-white/50 rounded-full" />
      </View>

      {/* Engagement Stats */}
      <View className="flex-row items-center justify-between p-4">
        <View className="flex-row gap-4 items-center">
          <Pressable className="flex-row items-center">
            <Heart size={24} color="red" fill="red" />
            <Text className="text-white font-semibold ml-2">420k</Text>
          </Pressable>
          <Pressable className="flex-row items-center">
            <MessageCircle size={24} color={colors.secondary} />
            <Text className="text-white font-semibold ml-2">293</Text>
          </Pressable>
          <Pressable className="flex-row items-center">
            <Send size={24} color={colors.secondary} />
            <Text className="text-white font-semibold ml-2">593</Text>
          </Pressable>
        </View>
        <Pressable className="ml-auto">
          <Bookmark size={24} color={colors.secondary} />
        </Pressable>
      </View>

      {/* Post Content */}
      <View className="px-4 pb-4">
        <Text className="text-secondary font-bold text-xl mb-2">
          Fillet Steak
        </Text>

        {/* Restaurant Info */}
        <View className="flex-row items-center mb-3">
          <View className="w-6 h-6 bg-yellow-400 rounded items-center justify-center mr-2">
            <Text className="text-black font-bold text-xs">YC</Text>
          </View>
          <Text className="text-white font-medium">The Library Restaurant</Text>
          <View className="flex-row items-center ml-2">
            <Star size={14} color="#fbbf24" fill="#fbbf24" />
            <Text className="text-white text-sm ml-1">4.8</Text>
          </View>
        </View>

        <Text className="text-white text-base leading-6 mb-3">
          A steak so perfect, even silence tastes better. Filet mignon, the way
          legends are served.
        </Text>

        <View className="flex-row items-center mb-3 gap-2">
          <View className="flex-row items-center">
            <MapPin size={16} color="#6b7280" />
            <Text className="text-gray-400 text-sm ml-1">0.5 miles away</Text>
          </View>
          <View className="flex-row items-center">
            <Clock size={16} color="#6b7280" className="ml-4" />
            <Text className="text-gray-400 text-sm ml-1">Open until 10 PM</Text>
          </View>
        </View>

        <Text className="text-blue-400 text-sm">
          #TasteTrail #FineFoodDiaries
        </Text>
      </View>
    </View>
  );
}
