import { StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useAuth } from "@/config/authContext";
import Loading from "./Loading";

export default function Avatar({
  size = "small",
}: {
  size?: "large" | "small";
}) {
  const colorScheme = useColorScheme();
  const { me, loading } = useAuth();

  return (
    <ThemedView
      style={[
        styles.avatar,
        size === "large" ? styles.large : {},
        {
          backgroundColor: Colors[colorScheme ?? "light"].tint,
        },
      ]}
    >
      {loading ? (
        <Loading />
      ) : (
        <ThemedText
          style={{
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
            textTransform: "uppercase",
            lineHeight: size === "large" ? 100 : 20,
            fontSize: size === "large" ? 26 : 18,
          }}
        >
          {me?.first_name[0]}
        </ThemedText>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  avatar: {
    height: 30,
    width: 30,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  large: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
});
