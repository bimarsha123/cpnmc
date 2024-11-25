import { View } from "react-native";
import ListItem from "./ListItem";
import { Ionicons } from "@expo/vector-icons";

export type ListItems = {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  link: string;
};

export type ListProps = {
  data: ListItems[];
};
export default function List({ data, ...rest }: ListProps) {
  return (
    <View style={{ padding: 10 }}>
      {data?.map((item, index) => (
        <ListItem
          data={item}
          key={item.title}
          isLastItem={index === data.length - 1}
        />
      ))}
    </View>
  );
}
