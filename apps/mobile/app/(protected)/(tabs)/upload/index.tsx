import { Link } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { Button } from '../../../../src/components';

export default function Upload() {
  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4">
        <View className="mb-6">
          <Text className="text-3xl font-bold text-foreground mb-2">Upload</Text>
          <Text className="text-base text-muted-foreground">Share your food discoveries</Text>
        </View>
        
        <View className="bg-card rounded-lg p-4 mb-4 shadow-sm">
          <Text className="text-lg font-semibold text-card-foreground mb-4">Upload Options</Text>
          
          <View className="space-y-3">
            <Button
              title="📸 Take Photo"
              color="primary"
              variant="outline"
              fullWidth
              onPress={() => {}}
            />
            
            <Button
              title="🖼️ Choose from Gallery"
              color="secondary"
              variant="outline"
              fullWidth
              onPress={() => {}}
            />
            
            <Button
              title="📹 Record Video"
              color="success"
              variant="outline"
              fullWidth
              onPress={() => {}}
            />
          </View>
        </View>
        
        <View className="bg-card rounded-lg p-4 mb-4 shadow-sm">
          <Text className="text-lg font-semibold text-card-foreground mb-4">Recent Uploads</Text>
          
          <View className="space-y-3">
            <View className="border border-border rounded-lg p-3">
              <Text className="text-base font-semibold text-foreground mb-1">Pizza Margherita</Text>
              <Text className="text-sm text-muted-foreground mb-2">Mario's Pizza • 2 hours ago</Text>
              <Text className="text-sm text-foreground">⭐⭐⭐⭐⭐ Amazing authentic Italian pizza!</Text>
            </View>
            
            <View className="border border-border rounded-lg p-3">
              <Text className="text-base font-semibold text-foreground mb-1">Sushi Platter</Text>
              <Text className="text-sm text-muted-foreground mb-2">Golden Dragon • 1 day ago</Text>
              <Text className="text-sm text-foreground">⭐⭐⭐⭐ Fresh and delicious!</Text>
            </View>
            
            <View className="border border-border rounded-lg p-3">
              <Text className="text-base font-semibold text-foreground mb-1">Coffee & Pastry</Text>
              <Text className="text-sm text-muted-foreground mb-2">Café Central • 3 days ago</Text>
              <Text className="text-sm text-foreground">⭐⭐⭐⭐ Perfect morning treat</Text>
            </View>
          </View>
        </View>
        
        <View className="bg-card rounded-lg p-4 mb-6 shadow-sm">
          <Text className="text-lg font-semibold text-card-foreground mb-4">Upload Guidelines</Text>
          
          <View className="space-y-2">
            <Text className="text-sm text-muted-foreground">• Use good lighting for better photos</Text>
            <Text className="text-sm text-muted-foreground">• Include the restaurant name in your caption</Text>
            <Text className="text-sm text-muted-foreground">• Be respectful and honest in your reviews</Text>
            <Text className="text-sm text-muted-foreground">• Follow community guidelines</Text>
          </View>
        </View>
        
        <View className="space-y-3">
          <Button
            title="Start New Upload"
            color="primary"
            size="lg"
            fullWidth
            onPress={() => {}}
          />
          
          <Link href="/(protected)/(tabs)/(home)" asChild>
            <Button
              title="← Back to Home"
              color="secondary"
              variant="outline"
              fullWidth
            />
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}