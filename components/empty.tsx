import { Dimensions, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { Image } from "expo-image";
import ThemedButton from "./Button";

const emptyImg = require("../assets/images/lonely.svg");

const width = Dimensions.get("screen").width;

type EmptyProps = {
  title?: string;
  text?: string;
  action?: () => void;
  actionButtonTitle?: string;
  retryDisabled?: boolean;
};
export default function Empty({
  text,
  action,
  actionButtonTitle,
  retryDisabled,
  title,
}: EmptyProps) {
  return (
    <View
      style={{
        flex: 1,
        width,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 16,
      }}
    >
      <Image
        source={emptyImg}
        contentFit="contain"
        contentPosition={"center"}
        style={{ width: "100%", height: 200 }}
      />
      <ThemedText type="error" style={{ fontWeight: "bold", marginTop: 10 }}>
        {title || "Data not found"}
      </ThemedText>
      <ThemedText style={{ textAlign: "center" }}>
        {text ? text : "It seems lonely here!"}
      </ThemedText>
      {action && (
        <ThemedButton
          title={actionButtonTitle || "Retry"}
          onPress={action}
          disabled={retryDisabled}
          styles={{ marginTop: 10 }}
          textStyles={{ fontWeight: "bold" }}
        />
      )}
    </View>
  );
}
