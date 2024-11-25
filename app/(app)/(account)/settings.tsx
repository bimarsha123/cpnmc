import { View, StyleSheet, ScrollView } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import List from "@/components/list/List";
import { items } from "./settingItems";

export default function Settings() {
  return (
    <ScrollView>
      <ThemedView style={[{ marginTop: 20 }, styles.card]}>
        <List data={items} />
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
  },
});
