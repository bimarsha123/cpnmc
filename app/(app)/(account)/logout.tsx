import { StyleSheet } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useEffect } from "react";
import { useAuth } from "@/config/authContext";

export default function Logout() {
  const { logout } = useAuth();
  useEffect(() => {
    logout();
  }, []);
  return (
    <ThemedView style={[{ marginTop: 20 }, styles.card]}>
      <ThemedText>Logging you out</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
  },
});
