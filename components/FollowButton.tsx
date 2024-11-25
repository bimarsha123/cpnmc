import { useColorScheme } from "@/hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ThemedButton from "./Button";
import { deleteUserPreferences, updateUserPreferences } from "@/config/api";
import Snackbar from "react-native-snackbar";
import { ActivityIndicator } from "react-native";
import { useAuth } from "@/config/authContext";

export default function FollowButton({
  data,
  onSuccess,
  followType,
}: {
  data: any;
  onSuccess: any;
  followType: string;
}) {
  const colorScheme = useColorScheme();
  const queryClient = useQueryClient();
  const { followed, name, id } = data;
  const { me } = useAuth();

  const handleSuccess = () => {
    queryClient.refetchQueries({
      queryKey: ["userPreferences"],
    });
    if (onSuccess) {
      onSuccess();
    }
  };

  const followMutation = useMutation({
    mutationFn: updateUserPreferences,
    onSuccess: () => {
      handleSuccess();

      Snackbar.show({
        text: `Followed ${name}!`,
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: "green",
        action: {
          text: "UNDO",
          onPress: handlePressFollow,
        },
      });
    },
    onError: (error) => {
      console.log({ error });
      Snackbar.show({
        text: "Follow failed!",
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: "red",
      });
    },
  });

  const unFollowMutation = useMutation({
    mutationFn: deleteUserPreferences,
    onSuccess: () => {
      handleSuccess();

      Snackbar.show({
        text: `Unfollowed ${name}!`,
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: "red",
        action: {
          text: "UNDO",
          onPress: handlePressFollow,
        },
      });
    },
    onError: (error) => {
      console.log({ error });
      Snackbar.show({
        text: "Unfollow failed!",
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: "red",
      });
    },
  });

  const handlePressFollow = () => {
    if (followed) {
      unFollowMutation.mutate({ [followType]: [id] });
    } else {
      followMutation.mutate({ [followType]: [id] });
    }
  };

  return me ? (
    <ThemedButton
      onPress={handlePressFollow}
      borderless
      title={
        followMutation.isPending ? (
          <ActivityIndicator
            color={Colors[colorScheme ?? "light"].text}
            size={22}
          />
        ) : (
          <Ionicons
            name={followed ? "heart" : "heart-outline"}
            size={22}
            color={
              followed
                ? Colors[colorScheme ?? "light"].tint
                : Colors[colorScheme ?? "light"].text
            }
          />
        )
      }
    />
  ) : null;
}
