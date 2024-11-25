import { ActivityIndicator, Dimensions, Text, View } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

const width = Dimensions.get("screen").width;
export default function Loading({ fullWidth }: { fullWidth?: boolean }) {
  const colorScheme = useColorScheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: fullWidth ? width : undefined,
      }}
    >
      <ActivityIndicator
        size={"small"}
        color={Colors[colorScheme ?? "light"].text}
      />
    </View>
  );
}
