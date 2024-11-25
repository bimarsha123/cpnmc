import { View, StyleSheet, ScrollView } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function Interests() {
  return (
    <ScrollView>
      <ThemedView style={[{ marginTop: 20 }, styles.card]}>
        <ThemedText>Interests</ThemedText>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
  },
});
