import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="home" />
      <Stack.Screen name="index" />
      <Stack.Screen name="location" />
      <Stack.Screen name="signup" />
    </Stack>
  );
}
