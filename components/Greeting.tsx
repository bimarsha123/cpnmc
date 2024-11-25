import { getGreeting } from "@/config/helpers";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import moment from "moment";
import { StyleSheet } from "react-native";
import { useAuth } from "@/config/authContext";

export default function Greeting() {
  const { me } = useAuth();
  return (
    <ThemedView style={styles.card}>
      <ThemedText type="heading">{getGreeting(me.first_name)}</ThemedText>
      <ThemedText type="subtext">{moment().format("dddd, MMMM DD")}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
  },
});
