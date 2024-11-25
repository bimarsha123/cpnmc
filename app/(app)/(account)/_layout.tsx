import { Stack } from "expo-router";
export const unstable_settings = {
  initialRouteName: "settings",
};

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{ headerShown: true, headerBackVisible: true }}
      initialRouteName="settings"
    >
      <Stack.Screen name="settings" options={{ title: "विकल्प" }} />
      <Stack.Screen name="account" options={{ title: "खाता" }} />
      <Stack.Screen name="bookmarks" options={{ title: "बुकमार्क" }} />
      <Stack.Screen name="interests" options={{ title: "Interests" }} />
      <Stack.Screen name="about" options={{ title: "बारेमा" }} />
    </Stack>
  );
}
