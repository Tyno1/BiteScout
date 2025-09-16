import { Link } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { Button } from '../../../../src/components';

export default function Dining() {
  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4">
        <View className="mb-6">
          <Text className="text-3xl font-bold text-foreground mb-2">Restaurant</Text>
          <Text className="text-base text-muted-foreground">Restaurant details and reviews</Text>
        </View>
        
        <View className="bg-card rounded-lg p-4 mb-4 shadow-sm">
          <Text className="text-2xl font-bold text-card-foreground mb-2">Mario's Pizza</Text>
          <Text className="text-sm text-muted-foreground mb-3">Italian • $$ • 0.5 miles away</Text>
          
          <View className="flex-row items-center mb-4">
            <Text className="text-2xl mr-2">⭐⭐⭐⭐⭐</Text>
            <Text className="text-base text-foreground">4.8 (124 reviews)</Text>
          </View>
          
          <Text className="text-base text-card-foreground mb-4">
            Authentic Italian pizza made with fresh ingredients and traditional recipes. 
            Family-owned restaurant serving the community for over 20 years.
          </Text>
          
          <View className="flex-row space-x-2">
            <Button title="Call" color="primary" variant="outline" size="sm" />
            <Button title="Directions" color="secondary" variant="outline" size="sm" />
            <Button title="Website" color="success" variant="outline" size="sm" />
          </View>
        </View>
        
        <View className="bg-card rounded-lg p-4 mb-4 shadow-sm">
          <Text className="text-lg font-semibold text-card-foreground mb-4">Hours</Text>
          
          <View className="space-y-2">
            <View className="flex-row justify-between">
              <Text className="text-base text-foreground">Monday - Thursday</Text>
              <Text className="text-base text-muted-foreground">11:00 AM - 10:00 PM</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-base text-foreground">Friday - Saturday</Text>
              <Text className="text-base text-muted-foreground">11:00 AM - 11:00 PM</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-base text-foreground">Sunday</Text>
              <Text className="text-base text-muted-foreground">12:00 PM - 9:00 PM</Text>
            </View>
          </View>
        </View>
        
        <View className="bg-card rounded-lg p-4 mb-4 shadow-sm">
          <Text className="text-lg font-semibold text-card-foreground mb-4">Recent Reviews</Text>
          
          <View className="space-y-3">
            <View className="border border-border rounded-lg p-3">
              <View className="flex-row items-center mb-2">
                <Text className="text-lg mr-2">⭐⭐⭐⭐⭐</Text>
                <Text className="text-sm font-semibold text-foreground">Sarah M.</Text>
                <Text className="text-sm text-muted-foreground ml-2">2 days ago</Text>
              </View>
              <Text className="text-sm text-foreground">
                Best pizza in town! The Margherita is absolutely perfect. 
                Great atmosphere and friendly service.
              </Text>
            </View>
            
            <View className="border border-border rounded-lg p-3">
              <View className="flex-row items-center mb-2">
                <Text className="text-lg mr-2">⭐⭐⭐⭐</Text>
                <Text className="text-sm font-semibold text-foreground">Mike R.</Text>
                <Text className="text-sm text-muted-foreground ml-2">1 week ago</Text>
              </View>
              <Text className="text-sm text-foreground">
                Really good pizza, though it can get busy on weekends. 
                Worth the wait!
              </Text>
            </View>
            
            <View className="border border-border rounded-lg p-3">
              <View className="flex-row items-center mb-2">
                <Text className="text-lg mr-2">⭐⭐⭐⭐⭐</Text>
                <Text className="text-sm font-semibold text-foreground">Emma L.</Text>
                <Text className="text-sm text-muted-foreground ml-2">2 weeks ago</Text>
              </View>
              <Text className="text-sm text-foreground">
                Authentic Italian experience. The pasta is also amazing!
              </Text>
            </View>
          </View>
        </View>
        
        <View className="space-y-3">
          <Button
            title="Write a Review"
            color="primary"
            size="lg"
            fullWidth
            onPress={() => {}}
          />
          
          <Button
            title="Add to Favorites"
            color="secondary"
            variant="outline"
            fullWidth
            onPress={() => {}}
          />
          
          <Link href="/(protected)/(tabs)/(home)" asChild>
            <Button
              title="← Back to Home"
              color="neutral"
              variant="outline"
              fullWidth
            />
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}