import { Pressable, View } from "react-native";
import { ThemedText } from "./ThemedText";
import moment from "moment";
import { Image } from "expo-image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { base_url, createLog } from "@/config/api";
import { APP_Platform } from "@/constants/Strings";
import { Link } from "expo-router";
import { router } from "expo-router";

import BookmarkButton from "./BookmarkButton";
export type OutletType = {
  id: number;
  name: string;
  logo: string;
};

export type NewsType = {
  id: number;
  title: string;
  image: string;
  summary: string;
  bookmarked: boolean;
  publishedDate: string;
  link: string;
  outlet?: OutletType;
};
type NewsCardProps = {
  news: NewsType;
  showOutletInfo?: boolean;
  handleBookmarkSuccess?: () => void;
};

export type createLogBodyType = {
  news: number;
  platform: string;
};

export type createBookmarkBodyType = {
  news: number;
};
export default function NewsCard({
  news,
  showOutletInfo,
  handleBookmarkSuccess,
}: NewsCardProps) {
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
          link: news.link,
          name: news?.outlet?.name,
        },
      });
    },
  });



  const handleOpen = () => {
    logMutation.mutate({ news: news.id, platform: APP_Platform });
  };

  return (
    <View>
      <Pressable onPress={handleOpen}>
        <Image
          source={{ uri: news.image }}
          contentFit="cover"
          style={{
            width: "100%",
            height: 200,
            objectFit: "cover",
            borderRadius: 10,
            marginBottom: 10,
          }}
        />
        <ThemedText type="title">{news.title}</ThemedText>
        <ThemedText type="default">{news.summary}</ThemedText>
      </Pressable>
      {showOutletInfo && (
        <Link
          style={{
            marginTop: 10,
          }}
          href={{
            pathname: `/(tabs)/(newsroom)/outlet/[outletId]`,
            params: { outletId: news?.outlet?.id, name: news?.outlet?.name },
          }}
        >
          <Image
            source={{ uri: base_url + news.outlet?.logo }}
            contentFit="contain"
            contentPosition={"left"}
            style={{
              width: 200,
              height: 20,
            }}
          />
        </Link>
      )}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ThemedText type="subtext">
          {moment(news.publishedDate).fromNow()}
        </ThemedText>
        <BookmarkButton news={news} onSuccess={handleBookmarkSuccess} />
      </View>
    </View>
  );
}
