import NewsCard, { NewsType } from "@/components/NewsCard";
import { GenericListApiResponse, NewsResultType } from "@/config/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Dimensions, FlatList, View } from "react-native";
import { LIMIT, getFollowingNewsFeed } from "@/config/api";
import Loading from "@/components/Loading";
import Error from "@/components/error";
import { getImageUrl } from "@/config/helpers";
import Empty from "@/components/empty";
const width = Dimensions.get("screen").width;

type ExploreNewsFeedProps = {
  filterId: number;
  filterType: string;
};
export default function FollowingNewsFeed({
  filterType,
  filterId,
}: ExploreNewsFeedProps) {
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
    queryKey: ["feed", "following", filterType, filterId],
    queryFn: ({ pageParam }) => getFollowingNewsFeed(pageParam),
    initialPageParam: {
      extraFilters: {
        limit: LIMIT,
        offset: 0,
      },
      filterType,
      filterId,
    },
    getNextPageParam: (lastPage) =>
      lastPage.nextOffset > 0
        ? {
            extraFilters: {
              limit: LIMIT,
              offset: lastPage.nextOffset,
            },
            filterType,
            filterId,
          }
        : null,
    enabled: !!filterId && !!filterType,
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
        paddingBottom: 160,
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
