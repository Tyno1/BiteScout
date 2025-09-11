import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button } from '../../../../src/components';
import { useTheme } from '../../../../src/config';

export default function Profile() {
  const { theme } = useTheme();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: ()=>{} }
      ]
    );
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.foreground }]}>Profile</Text>
        <Text style={[styles.subtitle, { color: theme.colors.mutedForeground }]}>Manage your account</Text>
      </View>
      
      <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.foreground }]}>Account Information</Text>
        <View style={styles.infoItem}>
          <Text style={[styles.infoLabel, { color: theme.colors.mutedForeground }]}>Name:</Text>
          <Text style={[styles.infoValue, { color: theme.colors.foreground }]}>
            {/* {user ? `${user.firstName} ${user.lastName}` : 'Loading...'} */}
          </Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={[styles.infoLabel, { color: theme.colors.mutedForeground }]}>Email:</Text>
          <Text style={[styles.infoValue, { color: theme.colors.foreground }]}>
            {/* {user?.email || 'Loading...'} */}
          </Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={[styles.infoLabel, { color: theme.colors.mutedForeground }]}>Member since:</Text>
          <Text style={[styles.infoValue, { color: theme.colors.foreground }]}>January 2024</Text>
        </View>
      </View>
      
      <View style={[styles.section, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.foreground }]}>Preferences</Text>
        <View style={styles.preferenceItem}>
          <Text style={[styles.preferenceLabel, { color: theme.colors.foreground }]}>Notifications</Text>
          <Text style={[styles.preferenceValue, { color: theme.colors.mutedForeground }]}>Enabled</Text>
        </View>
        <View style={styles.preferenceItem}>
          <Text style={[styles.preferenceLabel, { color: theme.colors.foreground }]}>Location Services</Text>
          <Text style={[styles.preferenceValue, { color: theme.colors.mutedForeground }]}>Enabled</Text>
        </View>
      </View>
      
      <View style={styles.actions}>
        <Button
          title="Logout"
          color="danger"
          variant="solid"
          onPress={handleLogout}
          fullWidth
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#007AFF',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  section: {
    backgroundColor: 'white',
    margin: 15,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 16,
    color: '#666',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  preferenceLabel: {
    fontSize: 16,
    color: '#666',
  },
  preferenceValue: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  actions: {
    padding: 20,
  },
  actionButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
