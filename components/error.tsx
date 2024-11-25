import { Dimensions, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { Image } from "expo-image";
import ThemedButton from "./Button";

const errorImg = require("../assets/images/error.svg");
const width = Dimensions.get("screen").width;
type ErrorProps = {
  text?: string;
  onRetry?: () => void;
  retryDisabled?: boolean;
};
export default function Error({ text, onRetry, retryDisabled }: ErrorProps) {
  return (
    <View
      style={{ flex: 1, justifyContent: "center", alignItems: "center", width }}
    >
      <Image
        source={errorImg}
        contentFit="cover"
        contentPosition={"center"}
        style={{ width: 200, height: 200 }}
      />
      <ThemedText type="error" style={{ fontWeight: "bold" }}>
        Error
      </ThemedText>
      <ThemedText>{text ? text : "Oops, something went wrong"}</ThemedText>
      {onRetry && (
        <ThemedButton
          title="Retry"
          onPress={onRetry}
          disabled={retryDisabled}
          styles={{ marginTop: 10 }}
        />
      )}
    </View>
  );
}
