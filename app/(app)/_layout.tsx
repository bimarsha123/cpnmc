import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/config/authContext";
import Loading from "@/components/Loading";
export const unstable_settings = {
  initialRouteName: "(tabs)",
};
export default function AppLayout() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Redirect href="/auth" />;
  }

  return (
    <Stack initialRouteName="(tabs)">
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false, title: "गृह" }}
      />
      <Stack.Screen
        name="(account)"
        options={{ headerShown: false, title: "विकल्प" }}
      />
      <Stack.Screen
        name="modal"
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="search"
        options={{
          headerShown: true,
          title: "खोज",
        }}
      />
      <Stack.Screen
        name="trending"
        options={{
          headerShown: true,
          title: "ट्रेन्डिङ",
        }}
      />
    </Stack>
  );
}