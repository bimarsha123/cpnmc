import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import WebView from "react-native-webview";

export default function Modal() {
  const navigation = useNavigation();
  const { link, name }: any = useLocalSearchParams();
  useEffect(() => {
    navigation.setOptions({ title: name });
  }, [name, navigation]);
  return (
    <WebView
      style={{ flex: 1 }}
      source={{ uri: link }}
      decelerationRate={"normal"}
    />
  );
}
