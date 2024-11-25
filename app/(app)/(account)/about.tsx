import { View, StyleSheet, ScrollView } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function About() {
  return (
    <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
      <ThemedView style={styles.card}>
        <ThemedText type="title">News Feed Reader</ThemedText>
        <ThemedText type="subtext">v1.0.0</ThemedText>
        <ThemedText style={{ textAlign: "center" }}>
          Your all-in-one news reader! Stay informed and up-to-date with the
          latest news, blogs, and articles from your favorite publications. Our
          app is designed to simplify your reading experience, providing a
          clean, user-friendly interface that brings all your news sources into
          one convenient location.
        </ThemedText>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
});
