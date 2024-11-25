import { LayoutChangeEvent, Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedText";
import React from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
export type ContentType = string | React.ReactElement;

type TabProps = {
  item: ContentType;
  active: boolean;
  handleChange: () => void;
  onLayout: (event: LayoutChangeEvent) => void;
};
export default function Tab({
  item,
  active,
  handleChange,
  onLayout,
}: TabProps) {
  const colorScheme = useColorScheme();

  return (
    <Pressable
      onPress={handleChange}
      style={({ pressed }) => [pressed && { opacity: 0.5 }]}
      onLayout={onLayout}
    >
      <View style={[styles.tab]}>
        {typeof item === "string" ? (
          <ThemedText
            style={[
              styles.text,
              { color: Colors[colorScheme ?? "light"].inactiveText },
              active && {
                ...styles.activeText,
                color: Colors[colorScheme ?? "light"].text,
              },
            ]}
          >
            {item}
          </ThemedText>
        ) : (
          React.cloneElement(item)
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tab: {
    paddingHorizontal: 5,
  },
  text: {
    textAlign: "center",
  },
  activeText: {
    fontWeight: "bold",
  },
});
