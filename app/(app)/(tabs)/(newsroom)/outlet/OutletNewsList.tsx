import Loading from "@/components/Loading";
import NewsCard, { NewsType } from "@/components/NewsCard";
import Empty from "@/components/empty";
import Error from "@/components/error";
import { LIMIT, getNews } from "@/config/api";
import { getImageUrl } from "@/config/helpers";
import { GenericListApiResponse, NewsResultType } from "@/config/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Dimensions, FlatList, View } from "react-native";
const width = Dimensions.get("screen").width;

type NewsListProps = {
  sourceId: number;
};

export default function OutletNewsList({ sourceId }: NewsListProps) {
  const {
    data,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
    error,
    isPending,
  } = useInfiniteQuery<GenericListApiResponse<NewsResultType>>({
    queryKey: ["news", sourceId],
    queryFn: ({ pageParam }) => getNews(pageParam),
    maxPages: 2,
    initialPageParam: {
      limit: LIMIT,
      offset: 0,
      source: sourceId,
    },
    getPreviousPageParam: (firstPage) =>
      firstPage?.previousOffset > 0
        ? {
            limit: LIMIT,
            offset: firstPage?.previousOffset,
            source: sourceId,
          }
        : null,
    getNextPageParam: (lastPage) =>
      lastPage?.nextOffset > 0
        ? {
            limit: LIMIT,
            offset: lastPage?.nextOffset,
            source: sourceId,
          }
        : null,
    enabled: !!sourceId,
  });

  if (isPending) return <Loading />;
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
      }}
    >
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <NewsCard news={item} showOutletInfo={false} />
        )}
        onRefresh={refetch}
        refreshing={isPending}
        ListEmptyComponent={() => (
          <Empty action={refetch} actionButtonTitle="Retry" />
        )}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
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
