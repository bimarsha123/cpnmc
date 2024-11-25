import Loading from "@/components/Loading";
import NewsCard, { NewsType } from "@/components/NewsCard";
import Empty from "@/components/empty";
import Error from "@/components/error";
import { LIMIT, getTrendingNews } from "@/config/api";
import { getImageUrl } from "@/config/helpers";
import { GenericListApiResponse, NewsResultType } from "@/config/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Dimensions, FlatList, View } from "react-native";
const width = Dimensions.get("screen").width;

export default function TrendingNews() {
  const {
    data,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
    error,
    isPending,
    isRefetching,
  } = useInfiniteQuery<GenericListApiResponse<NewsResultType>>({
    queryKey: ["feed", "trending", "list"],
    queryFn: ({ pageParam }) => getTrendingNews(pageParam),
    initialPageParam: {
      limit: LIMIT,
      offset: 0,
    },
    getNextPageParam: (lastPage) =>
      lastPage.nextOffset > 0
        ? {
            limit: LIMIT,
            offset: lastPage.nextOffset,
          }
        : null,
  });

  if (isPending) return <Loading fullWidth />;
  if (error) return <Error onRetry={refetch} retryDisabled={isPending} />;

  const flattenData = data ? data.pages.flatMap((page) => page.results) : [];

  const items: NewsType[] = flattenData.map((item: NewsResultType) => ({
    id: item.id,
    title: item.title,
    link: item.link,
    image: getImageUrl(item),
    bookmarked: item.bookmarked,
    publishedDate: item.published_date,
    outlet: {
      id: item.source_detail.outlet_detail.id,
      name: item.source_detail.outlet_detail.name,
      logo: item.source_detail.outlet_detail.logo,
    },
  }));
  return (
    <View
      style={{
        width,
        flex: 1,
        paddingHorizontal: 10,
        marginTop: 10,
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
        ListEmptyComponent={() => (
          <Empty
            action={refetch}
            actionButtonTitle="Refresh feed"
            title="No News"
          />
        )}
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
