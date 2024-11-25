import { tintColorDark } from "@/constants/Colors";
import { Animated, StyleSheet, View } from "react-native";

type IndicatorProps = {
  indicatorWidth: number;
  indicatorPosition: Animated.Value;
};
export default function Indicator({
  indicatorWidth,
  indicatorPosition,
}: IndicatorProps) {
  return (
    <Animated.View
      style={[
        styles.indicator,
        {
          width: indicatorWidth,
          transform: [{ translateX: indicatorPosition }],
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  indicator: {
    height: 4,
    backgroundColor: tintColorDark,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    position: "absolute",
    bottom: 0,
  },
});
