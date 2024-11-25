import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";
import { Dimensions, StyleSheet, Text, View } from "react-native";
// import * as AppleAuthentication from "expo-apple-authentication";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";

import { useAuth } from "@/config/authContext";
import { ThemedView } from "@/components/ThemedView";
import bg from "@/assets/images/readnews.jpg";
import { Image } from "expo-image";
const height = Dimensions.get("screen").height;
export default function Auth() {
  const { googleSignIn, isSocialLoginPending } = useAuth();

  return (
    <ThemedView style={styles.container}>
      <Image
        source={bg}
        contentFit="cover"
        style={{
          width: "100%",
          height,
          position: "absolute",
          top: 0,
          bottom: 0,
          opacity: 0.2,
        }}
      />
      <View
        style={{
          alignItems: "center",
          paddingHorizontal: 20,
        }}
      >
        <Text style={{ marginBottom: 10, color: "white", fontSize: 18 }}>
          माओवादी आवेदनमा स्वागत छ
        </Text>
        <Text
          style={{
            marginBottom: 20,
            textAlign: "center",
            color: "white",
            fontSize: 22,
          }}
        >
          देशको लागि माओवादी
        </Text>

        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          onPress={googleSignIn}
          disabled={isSocialLoginPending}
        />
        {/* <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={
          colorScheme === "light"
            ? AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
            : AppleAuthentication.AppleAuthenticationButtonStyle.WHITE
        }
        cornerRadius={5}
        style={styles.button}
        onPress={async () => {
          try {
            const credential = await AppleAuthentication.signInAsync({
              requestedScopes: [
                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                AppleAuthentication.AppleAuthenticationScope.EMAIL,
              ],
            });
            console.log(JSON.stringify(credential, null, 2));
            // signed in
          } catch (e: any) {
            if (e.code === "ERR_REQUEST_CANCELED") {
              // handle that the user canceled the sign-in flow
            } else {
              // handle other errors
            }
          }
        }}
      /> */}
      </View>

      <View
        style={{
          flexDirection: "row",
          gap: 10,
          justifyContent: "center",
          position: "absolute",
          bottom: 10,
        }}
      >
        <Link href="https://techkunja.com.np">
          <ThemedText style={styles.meta} type="subtext">
            Privacy policy
          </ThemedText>
        </Link>
        <Link href="https://techkunja.com.np">
          <ThemedText style={styles.meta} type="subtext">
            Terms of use
          </ThemedText>
        </Link>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  meta: {
    fontSize: 12,
  },

  button: {
    width: 200,
    height: 44,
  },
});
