import { Stack } from 'expo-router';

export default function MoviesLayout() {

  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false}} />
      <Stack.Screen name='[id]' options={{ headerShown: false}} />
    </Stack>
  );
}