import { Linking } from "react-native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLog } from "@/config/api";
import { router } from "expo-router";
import { WebView } from "react-native-webview";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";

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
 ${post.link}
</body>
</html>`

  const handleOpen = (url) => {
    Linking.openURL(url).catch((err) => {
      console.error("Failed to open URL:", err);
    });
  };

  return (
    <SafeAreaView>
      <WebView
        source={{ html: htmlSrc }}
        style={{ minHeight: 620, marginRight: 8 }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        thirdPartyCookiesEnabled={true}
        userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
      />
    </SafeAreaView>
  );
}
