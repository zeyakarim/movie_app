import { Stack, Tabs } from 'expo-router';
import React from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';
import "../global.css"

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false}} />
      <Stack.Screen name='movies' options={{ headerShown: false}} />
      <Stack.Screen name='person' options={{ headerShown: false}} />
      <Stack.Screen name='search' options={{ headerShown: false}} />
    </Stack>
  );
}
