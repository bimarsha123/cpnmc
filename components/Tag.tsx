import { Pressable } from "react-native";
import { ThemedText } from "./ThemedText";
import { tintColorDark } from "@/constants/Colors";

export type TagType = {
  tag: string;
  count: number;
  source_id: number;
};

export default function Tag({
  data,
  handlePress,
}: {
  data: TagType;
  handlePress: () => void;
}) {
  return (
    <Pressable
      onPress={handlePress}
      style={{
        borderRadius: 10,
        borderWidth: 2,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderColor: tintColorDark,
      }}
    >
      <ThemedText>{data.tag}</ThemedText>
    </Pressable>
  );
}
