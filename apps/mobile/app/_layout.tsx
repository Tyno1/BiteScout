import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from '../src/providers/ThemeProvider';

function AppContent() {
  
  return (
    <>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen 
          name="index" 
          options={{ 
            headerShown: false,
            title: 'Home'
          }} 
        />
        <Stack.Screen 
          name="auth/login" 
          options={{ 
            headerShown: false,
            title: 'Login'
          }} 
        />
        <Stack.Screen 
          name="auth/register" 
          options={{ 
            headerShown: false,
            title: 'Register'
          }} 
        />
        <Stack.Screen name="(protected)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider initialTheme="system">
      <AppContent />
    </ThemeProvider>
  );
}
