import { useState, useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import useCachedResources from '@/hooks/useCachedResources';
import useColorScheme from '@/hooks/useColorScheme';
import Colors from '@/constants/Colors';

export default function RootLayout() {
  useFrameworkReady();
  const { isLoadingComplete, fontsLoaded } = useCachedResources();
  const colorScheme = useColorScheme();
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    if (isLoadingComplete && fontsLoaded) {
      setAppIsReady(true);
    }
  }, [isLoadingComplete, fontsLoaded]);

  if (!appIsReady) {
    return null;
  }

  return (
    <>
      <Stack screenOptions={{ 
        headerShown: false,
        contentStyle: { backgroundColor: Colors[colorScheme].background },
      }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="video/[id]" options={{ 
          presentation: 'card',
          animation: 'slide_from_right',
        }} />
        <Stack.Screen name="+not-found" options={{ title: 'Not Found' }} />
      </Stack>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </>
  );
}