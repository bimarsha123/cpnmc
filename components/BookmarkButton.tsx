import { Ionicons } from "@expo/vector-icons";
import ThemedButton from "./Button";
import { NewsType } from "./NewsCard";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBookmark } from "@/config/api";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { ActivityIndicator } from "react-native";
import Snackbar from "react-native-snackbar";
export default function BookmarkButton({
  news,
  onSuccess,
}: {
  news: NewsType;
  onSuccess?: () => void;
}) {
  const colorScheme = useColorScheme();
  const queryClient = useQueryClient();

  const bookmarked = news.bookmarked;

  const bookmarkMutation = useMutation({
    mutationFn: createBookmark,
    onSuccess: (data) => {
      if (onSuccess) {
        onSuccess();
      }

      queryClient.refetchQueries({
        queryKey: ["feed"],
      });

      Snackbar.show({
        text: data.user ? "Bookmark created!" : "Bookmark removed!",
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: data.user ? "green" : "red",
        action: {
          text: "UNDO",
          onPress: handlePressBookmark,
        },
      });
    },
    onError: (error) => {
      console.log({ error });
      Snackbar.show({
        text: "Bookmark failed!",
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: "red",
      });
    },
  });

  const handlePressBookmark = () => {
    bookmarkMutation.mutate({ news: news.id });
  };

  return (
    <ThemedButton
      onPress={handlePressBookmark}
      borderless
      title={
        bookmarkMutation.isPending ? (
          <ActivityIndicator
            color={Colors[colorScheme ?? "light"].text}
            size={22}
          />
        ) : (
          <Ionicons
            name={bookmarked ? "bookmark" : "bookmark-outline"}
            size={22}
            color={
              bookmarked
                ? Colors[colorScheme ?? "light"].tint
                : Colors[colorScheme ?? "light"].text
            }
          />
        )
      }
    />
  );
}
