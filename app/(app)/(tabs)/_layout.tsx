import { Tabs } from "expo-router";
import React from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
export const unstable_settings = {
  initialRouteName: "index",
};
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "bold",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "समचार",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "sparkles" : "sparkles-outline"}
              color={color}
            />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "globe" : "globe-outline"}
              color={color}
            />
          ),
        }}
      /> */}
      <Tabs.Screen
        name="social"
        options={{
          title: "सामाजिक संजाल",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "person-circle-outline" : "person-circle-outline"}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="(newsroom)"
        options={{
          title: "संगठन",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "people-outline" : "people-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>

  );
}
