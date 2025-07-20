import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "list" }} />
      <Stack.Screen name="player" />
      {/* <Stack.Screen name="player" options={{ title: "song" }} /> */}
    </Stack>
  );
}
