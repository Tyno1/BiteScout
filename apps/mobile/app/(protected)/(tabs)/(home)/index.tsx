import { Link } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { Button } from '../../../../src/components';
import { styles, useTheme } from '../../../../src/config';
import { useLogout, useUser } from '../../../../src/stores/authStore';

export default function HomeScreen() {
  const { theme, isDark, toggleTheme } = useTheme();
  const user = useUser();
  const logout = useLogout();

  return (
    <ScrollView style={[
      styles.flex.flex1,
      { backgroundColor: theme.colors.background }
    ]}>
      <View style={[
        styles.flex.flex1,
        styles.flex.center,
        styles.spacing.p(4)
      ]}>
        <Text style={{
          fontSize: theme.typography.fontSize['4xl'],
          fontWeight: theme.typography.fontWeight.bold,
          color: theme.colors.foreground,
          textAlign: 'center',
          marginBottom: theme.spacing[2]
        }}>
          Welcome to BiteScout!
        </Text>
        
        <Text style={{
          fontSize: theme.typography.fontSize.lg,
          color: theme.colors.mutedForeground,
          textAlign: 'center',
          marginBottom: theme.spacing[4]
        }}>
          Your restaurant discovery app
        </Text>
        
        <Text style={{
          fontSize: theme.typography.fontSize.base,
          color: theme.colors.primary,
          textAlign: 'center',
          marginBottom: theme.spacing[8]
        }}>
          Hello, {user?.firstName || 'User'}! 👋
        </Text>
        
        {/* Color System Demo */}
        <View style={{
          backgroundColor: theme.colors.card,
          borderRadius: theme.borderRadius.lg,
          padding: theme.spacing[4],
          marginBottom: theme.spacing[8],
          ...theme.shadows.sm
        }}>
          <Text style={{
            fontSize: theme.typography.fontSize['2xl'],
            fontWeight: theme.typography.fontWeight.semibold,
            color: theme.colors.cardForeground,
            marginBottom: theme.spacing[3]
          }}>
            Color System Usage
          </Text>
          
          <View style={[
            styles.flex.row,
            { gap: theme.spacing[2], marginBottom: theme.spacing[3] }
          ]}>
            <View style={[
              styles.flex.center,
              {
                backgroundColor: theme.colors.primary,
                padding: theme.spacing[2],
                borderRadius: theme.borderRadius.sm,
                flex: 1
              }
            ]}>
              <Text style={{
                fontSize: theme.typography.fontSize.xs,
                color: theme.colors.primaryForeground
              }}>
                Primary
              </Text>
            </View>
            <View style={[
              styles.flex.center,
              {
                backgroundColor: theme.colors.secondary,
                padding: theme.spacing[2],
                borderRadius: theme.borderRadius.sm,
                flex: 1
              }
            ]}>
              <Text style={{
                fontSize: theme.typography.fontSize.xs,
                color: theme.colors.secondaryForeground
              }}>
                Secondary
              </Text>
            </View>
          </View>
          
          <Text style={{
            fontSize: theme.typography.fontSize.sm,
            color: theme.colors.mutedForeground
          }}>
            Use: theme.colors.primary (automatically switches with theme!)
          </Text>
        </View>
        
        <View style={[
          styles.flex.column,
          { gap: theme.spacing[4], marginBottom: theme.spacing[8] }
        ]}>
          <Button
            title="Toggle Theme"
            color="primary"
            variant="solid"
            onPress={toggleTheme}
            fullWidth
          />
          
          <Button
            title="About"
            color="secondary"
            variant="solid"
            onPress={() => {}}
            fullWidth
          />
          
          <Button
            title="Profile"
            color="primary"
            variant="outline"
            onPress={() => {}}
            fullWidth
          />
          
          <Button
            title="Loading Example"
            color="success"
            variant="plain"
            loading
            fullWidth
          />
          
          <Button
            title="Danger Action"
            color="danger"
            variant="solid"
            onPress={() => {}}
            fullWidth
          />
          
          <Button
            title="Glass Effect"
            color="primary"
            variant="glass"
            onPress={() => {}}
            fullWidth
          />
          
          <Button
            title="Logout"
            color="danger"
            variant="solid"
            onPress={logout}
            fullWidth
          />
        </View>
        
        <View style={[
          styles.flex.row,
          { gap: theme.spacing[4], marginBottom: theme.spacing[8] }
        ]}>
          <Link href="/about" asChild>
            <Button title="About" color="primary" variant="outline" size="sm" />
          </Link>
          <Link href="/profile" asChild>
            <Button title="Profile" color="secondary" variant="outline" size="sm" />
          </Link>
        </View>
        
        <View style={{
          backgroundColor: theme.colors.card,
          borderRadius: theme.borderRadius.lg,
          padding: theme.spacing[4],
          ...theme.shadows.sm
        }}>
          <Text style={{
            fontSize: theme.typography.fontSize['2xl'],
            fontWeight: theme.typography.fontWeight.semibold,
            color: theme.colors.cardForeground,
            marginBottom: theme.spacing[2]
          }}>
            Design System Demo
          </Text>
          <Text style={{
            fontSize: theme.typography.fontSize.base,
            color: theme.colors.mutedForeground,
            marginBottom: theme.spacing[2]
          }}>
            This screen demonstrates the design system with:
          </Text>
          <Text style={{
            fontSize: theme.typography.fontSize.sm,
            color: theme.colors.mutedForeground
          }}>
            • Consistent colors and typography{'\n'}
            • Theme switching (light/dark){'\n'}
            • Responsive spacing{'\n'}
            • Reusable components{'\n'}
            • TypeScript support
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
