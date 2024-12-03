import { Stack, useGlobalSearchParams } from "expo-router";
export const unstable_settings = {
  initialRouteName: "newsroom",
};
export default function NewsroomLayout() {
  const { name } = useGlobalSearchParams<{ name: string }>();
  return (
    <Stack>
      <Stack.Screen
        name="newsroom"
        options={{ headerShown: false, title: "Newsroom" }}
      />
      <Stack.Screen
        name="category/[categoryId]"
        options={{
          headerShown: true,
          title: "Outlet",
        }}
      />
      <Stack.Screen
        name="outlet/[outletId]"
        options={{ headerShown: true, title: "Outlet" }}
      />
      <Stack.Screen
        name="organization/[organizationId]"
        options={{
          headerShown: true, title: name
        }}
      />
    </Stack>



  );
}
