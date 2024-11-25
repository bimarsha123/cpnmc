import { Linking, Pressable, TouchableOpacity, View } from "react-native";
import { ThemedText } from "./ThemedText";
import moment from "moment";
import { Image } from "expo-image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { base_url, createLog } from "@/config/api";
import { APP_Platform } from "@/constants/Strings";
import { router } from "expo-router";
import { red } from "react-native-reanimated/lib/typescript/reanimated2/Colors";
import { WebView } from "react-native-webview";

export type PostType = {
  id: number;
  title: string;
  image: string;
  author: number;
  content: string;
  created_at: string;
  link: string;
};
type PostCardProps = {
  post: PostType;
  showOutletInfo?: boolean;
  handleBookmarkSuccess?: () => void;
};

export type createLogBodyType = {
  post: number;
  platform: string;
};

export default function PostCard({
  post
}: PostCardProps) {
  const queryClient = useQueryClient();
  const logMutation = useMutation({
    mutationFn: createLog,
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["feed"],
      });
    },
    onSettled: () => {
      router.push({
        pathname: `/modal`,
        params: {
          link: post.link,
        },
      });
    },
  });

  const htmlSrc = `
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div class="fb-post"
        data-href="https://www.facebook.com/sulav.amgain/posts/pfbid024x3NZnSfbCh8sXjkt5662LcUeeN2ezUNJ4eeKTSuDHkECvauLCRyEJUockJ1brwHl"
        data-width="500" data-show-text="true">
        <blockquote cite="https://www.facebook.com/sulav.amgain/posts/2509083169287112" class="fb-xfbml-parse-ignore">
            <p>Good morning 🌄
                Gorkha</p>Posted by <a href="https://www.facebook.com/sulav.amgain">Sulav Amgain</a> on&nbsp;<a
                href="https://www.facebook.com/sulav.amgain/posts/2509083169287112">Saturday, November 23, 2024</a>
        </blockquote>
    </div>
</body>
</html>`

  const handleOpen = (url) => {
    Linking.openURL(url).catch((err) => {
      console.error("Failed to open URL:", err);
    });
  };

  return (
    <View style={{ marginHorizontal: 10 }}>
      <TouchableOpacity onPress={() => handleOpen(post.link)}>
        <Image
          source={{ uri: post.image }}
          contentFit="cover"
          style={{
            width: "100%",
            height: 150,
            objectFit: "cover",
            borderRadius: 10,
            marginBottom: 10,
          }}
        />
        <ThemedText type="title">{post.title}</ThemedText>
        <ThemedText type="default">{post.content.substring(0, 40)}</ThemedText>

      </TouchableOpacity>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ThemedText type="subtext">
          {moment(post.created_at).fromNow()}
        </ThemedText>
      </View>
    </View>
  );
}
