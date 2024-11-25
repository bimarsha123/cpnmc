import { View, StyleSheet, FlatList } from "react-native";

import { useAuth } from "@/config/authContext";
import { useInfiniteQuery } from "@tanstack/react-query";
import { LIMIT, getMyBookmarks } from "@/config/api";
import Loading from "@/components/Loading";
import Error from "@/components/error";
import { BookmarkResultType, GenericListApiResponse } from "@/config/types";
import NewsCard, { NewsType } from "@/components/NewsCard";
import { getImageUrl } from "@/config/helpers";
import Empty from "@/components/empty";

export default function Bookmarks() {
  const { me } = useAuth();
  const {
    data,
    isFetchingNextPage,
    fetchNextPage,
    isRefetching,
    hasNextPage,
    refetch,
    error,
    isLoading,
  } = useInfiniteQuery<GenericListApiResponse<BookmarkResultType>>({
    queryKey: ["bookmarks", me?.id],
    gcTime: 0,
    queryFn: ({ pageParam }) => getMyBookmarks(pageParam),
    initialPageParam: {
      filters: {
        limit: LIMIT,
        offset: 0,
        user: me?.id,
      },
    },
    getNextPageParam: (lastPage) =>
      lastPage.nextOffset > 0
        ? {
            filters: {
              limit: LIMIT,
              offset: lastPage.nextOffset,
              user: me?.id,
            },
          }
        : null,
    enabled: !!me?.id,
  });

  if (isLoading) return <Loading />;
  if (error) return <Error onRetry={refetch} />;

  const flattenData = data ? data.pages.flatMap((page) => page.results) : [];
  const items: NewsType[] = flattenData.map((item: BookmarkResultType) => ({
    id: item.news_detail.id,
    title: item.news_detail.title,
    link: item.news_detail.link,
    image: getImageUrl(item.news_detail),
    bookmarked: item.news_detail.bookmarked,
    publishedDate: item.news_detail.published_date,
    outlet: {
      id: item.news_detail.source_detail.outlet_detail.id,
      name: item.news_detail.source_detail.outlet_detail.name,
      logo: item.news_detail.source_detail.outlet_detail.logo,
    },
  }));

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 10,
        // paddingBottom: 160,
        paddingTop: 10,
      }}
    >
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <NewsCard
            news={item}
            showOutletInfo={true}
            handleBookmarkSuccess={refetch}
          />
        )}
        onRefresh={refetch}
        refreshing={isRefetching}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        ListEmptyComponent={() => <Empty title="No bookmarks" />}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
  },
});
