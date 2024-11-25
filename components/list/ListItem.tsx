import { View } from "react-native";
import { ThemedText } from "../ThemedText";
import { ListItems } from "./List";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
export type ListItemProps = {
  data: ListItems;
  isLastItem: boolean;
};
export default function ListItem({ data, isLastItem = false }: ListItemProps) {
  const colorScheme = useColorScheme();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 15,
        borderBottomWidth: isLastItem ? 0 : 1,
        borderBottomColor: Colors[colorScheme ?? "light"].divider,
      }}
    >
      <Link href={data.link} style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Ionicons
            name={data.icon}
            size={18}
            color={Colors[colorScheme ?? "light"].text}
          />
          <ThemedText>{data.title}</ThemedText>
        </View>
      </Link>
      <Ionicons
        name="chevron-forward"
        size={18}
        color={Colors[colorScheme ?? "light"].text}
      />
    </View>
  );
}
