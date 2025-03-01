import { Stack } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function MovieLayout() {

  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false}} />
    </Stack>
  );
}
