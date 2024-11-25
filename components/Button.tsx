import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  type ViewStyle,
} from "react-native";
import { ThemedText } from "./ThemedText";
import React from "react";

type ButtonProps = {
  title: string | React.ReactElement;
  disabled?: boolean;
  onPress: () => void;
  styles?: ViewStyle;
  textStyles?: TextStyle;
  borderless?: boolean;
  rounded?: boolean;
};

export default function ThemedButton({
  title,
  onPress,
  disabled,
  borderless = false,
  ...rest
}: ButtonProps) {
  return (
    <Pressable
      disabled={disabled}
      style={({ pressed }) => [
        {
          opacity: pressed || disabled ? 0.5 : 1,
        },
        {
          ...styles.button,
          ...rest.styles,
          borderWidth: borderless ? 0 : 1,
          borderRadius: borderless ? 0 : 10,
        },
      ]}
      onPress={onPress}
      android_ripple={{
        color: "gray",
      }}
      {...rest}
    >
      {typeof title === "string" ? (
        <ThemedText style={rest.textStyles}>{title}</ThemedText>
      ) : (
        React.cloneElement(title)
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignItems: "center",
    borderColor: "lightgray",
  },
  rounded: {},
});
