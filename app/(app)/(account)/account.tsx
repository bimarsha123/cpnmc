import { View, StyleSheet, ScrollView } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useAuth } from "@/config/authContext";
import Loading from "@/components/Loading";
import Avatar from "@/components/Avatar";
import { getFullName } from "@/config/helpers";
import ThemedButton from "@/components/Button";
import { router } from "expo-router";

export default function Account() {
  const { me, loading } = useAuth();
  if (loading) return <Loading />;
  return (
    <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
      <ThemedView style={styles.card}>
        <Avatar size="large" />
        <ThemedText type="subtext">{me?.email}</ThemedText>
        <ThemedText>{getFullName(me)}</ThemedText>
      </ThemedView>
      <ThemedButton
        title={"Sign out"}
        styles={{ marginTop: 20, backgroundColor: "red" }}
        textStyles={{ color: "white", fontWeight: "bold" }}
        onPress={() => router.replace("/(account)/logout")}
      />
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
