import { Header } from "@/components/Header";
import Loading from "@/components/Loading";
import Error from "@/components/error";
import { getCategories } from "@/config/api";
import { CategoryType } from "@/config/types";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import {
  View,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import ExporeNewsFeed from "./app/(app)/(tabs)/(newsroom)/ExploreNewsFeed";
import Tabs from "@/components/tab/Tabs";
export default function Explore() {
  const [activeTab, setActiveTab] = useState(0);

  const flatlistRef = useRef<FlatList | null>(null);

  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["categories", "list", "explore"],
    queryFn: getCategories,
  });

  const handleChangeTab = (index: number) => {
    flatlistRef.current?.scrollToIndex({ index: index, animated: true });
    setActiveTab(index);
  };

  const handleScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    let contentOffset = e.nativeEvent.contentOffset;
    let viewSize = e.nativeEvent.layoutMeasurement;
    let pageNum = Math.floor(contentOffset.x / viewSize.width);
    setActiveTab(pageNum);
  };

  if (isPending) return <Loading />;
  if (error) return <Error onRetry={refetch} />;

  const items = data?.results
    ?.sort(
      (a: CategoryType, b: CategoryType) =>
        a.display_priority - b.display_priority
    )
    .map((category: CategoryType) => ({
      id: category.id,
      name: category.name,
    }));

  return (
    <View style={{ flex: 1 }}>
      <Header title="Explore" />
      <Tabs
        items={items.map((i: CategoryType) => i.name)}
        selectedIndex={activeTab}
        onChange={handleChangeTab}
      />
      <View>
        <FlatList
          data={items}
          ref={flatlistRef}
          horizontal
          pagingEnabled
          bounces={false}
          onMomentumScrollEnd={handleScrollEnd}
          showsHorizontalScrollIndicator={false}
          maxToRenderPerBatch={1}
          renderItem={({ item }) => (
            <ExporeNewsFeed selectedCategory={item.id} />
          )}
        />
      </View>
    </View>
  );
}
