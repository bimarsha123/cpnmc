import { StyleSheet, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "./ThemedText";
import { Link } from "expo-router";
import Avatar from "./Avatar";

export type HeaderProps = {
  title?: string;
};

export function Header({ title = "माओवादी आवेदन", ...rest }: HeaderProps) {
  const colorScheme = useColorScheme();
  const backgroundColor = useThemeColor({}, "viewBackground");
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        { backgroundColor: backgroundColor, paddingTop: insets.top + 10 },
        styles.container,
      ]}
    >
      <Link href={"/(app)/search"}>
        <Ionicons
          name="search"
          color={Colors[colorScheme ?? "light"].text}
          size={18}
        />
      </Link>
      <ThemedText type="title">{title}</ThemedText>
      <Link href="/(account)/settings">
        <Avatar />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  avatar: {
    height: 30,
    width: 30,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
