import { Link } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { Button } from '../../../../src/components';

export default function Search() {
  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4">
        <View className="mb-6">
          <Text className="text-3xl font-bold text-foreground mb-2">Search</Text>
          <Text className="text-base text-muted-foreground">Find restaurants near you</Text>
        </View>
        
        <View className="bg-card rounded-lg p-4 mb-4 shadow-sm">
          <Text className="text-lg font-semibold text-card-foreground mb-4">Search Filters</Text>
          
          <View className="space-y-3">
            <View>
              <Text className="text-sm font-medium text-foreground mb-2">Cuisine Type</Text>
              <View className="flex-row flex-wrap gap-2">
                <Button title="Italian" variant="outline" size="sm" />
                <Button title="Chinese" variant="outline" size="sm" />
                <Button title="Mexican" variant="outline" size="sm" />
                <Button title="Indian" variant="outline" size="sm" />
              </View>
            </View>
            
            <View>
              <Text className="text-sm font-medium text-foreground mb-2">Price Range</Text>
              <View className="flex-row flex-wrap gap-2">
                <Button title="$" variant="outline" size="sm" />
                <Button title="$$" variant="outline" size="sm" />
                <Button title="$$$" variant="outline" size="sm" />
                <Button title="$$$$" variant="outline" size="sm" />
              </View>
            </View>
          </View>
        </View>
        
        <View className="bg-card rounded-lg p-4 mb-4 shadow-sm">
          <Text className="text-lg font-semibold text-card-foreground mb-4">Recent Searches</Text>
          
          <View className="space-y-2">
            <View className="flex-row items-center justify-between py-2">
              <Text className="text-base text-foreground">Pizza near me</Text>
              <Text className="text-sm text-muted-foreground">2 hours ago</Text>
            </View>
            <View className="flex-row items-center justify-between py-2">
              <Text className="text-base text-foreground">Sushi restaurants</Text>
              <Text className="text-sm text-muted-foreground">1 day ago</Text>
            </View>
            <View className="flex-row items-center justify-between py-2">
              <Text className="text-base text-foreground">Coffee shops</Text>
              <Text className="text-sm text-muted-foreground">3 days ago</Text>
            </View>
          </View>
        </View>
        
        <View className="bg-card rounded-lg p-4 mb-6 shadow-sm">
          <Text className="text-lg font-semibold text-card-foreground mb-4">Popular Near You</Text>
          
          <View className="space-y-3">
            <View className="border border-border rounded-lg p-3">
              <Text className="text-base font-semibold text-foreground mb-1">Mario's Pizza</Text>
              <Text className="text-sm text-muted-foreground mb-2">Italian • $$ • 0.5 miles</Text>
              <Text className="text-sm text-foreground">⭐⭐⭐⭐⭐ 4.8 (124 reviews)</Text>
            </View>
            
            <View className="border border-border rounded-lg p-3">
              <Text className="text-base font-semibold text-foreground mb-1">Golden Dragon</Text>
              <Text className="text-sm text-muted-foreground mb-2">Chinese • $ • 0.8 miles</Text>
              <Text className="text-sm text-foreground">⭐⭐⭐⭐ 4.5 (89 reviews)</Text>
            </View>
            
            <View className="border border-border rounded-lg p-3">
              <Text className="text-base font-semibold text-foreground mb-1">Taco Fiesta</Text>
              <Text className="text-sm text-muted-foreground mb-2">Mexican • $ • 1.2 miles</Text>
              <Text className="text-sm text-foreground">⭐⭐⭐⭐ 4.3 (67 reviews)</Text>
            </View>
          </View>
        </View>
        
        <View className="space-y-3">
          <Button
            title="Start New Search"
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