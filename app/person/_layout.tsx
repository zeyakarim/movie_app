import { Stack } from 'expo-router';

export default function PersonLayout() {

  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false}} />
    </Stack>
  );
}