import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getOutlet } from "@/config/api";
import Loading from "@/components/Loading";
import { useLocalSearchParams, useNavigation } from "expo-router";
import Error from "@/components/error";
import { useEffect, useRef, useState } from "react";
import Tabs from "@/components/tab/Tabs";
import OutletNewsList from "./OutletNewsList";
import { OutletType } from "@/components/NewsCard";

export type SourceType = {
  id: number;
  name: string;
  outlet: number;
  display_label?: string;
  display_priority: number;
  outlet_detail: OutletType;
};
export default function OutletDetailList() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState(0);

  const { outletId, name }: any = useLocalSearchParams();

  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["outlet", "detail", outletId],
    queryFn: ({ queryKey }) => getOutlet(queryKey[2]),
  });

  const flatlistRef = useRef<FlatList | null>(null);

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

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, [name, navigation]);

  if (isPending) return <Loading />;
  if (error) return <Error onRetry={refetch} />;

  const items = data?.sources
    ?.sort(
      (a: SourceType, b: SourceType) => a.display_priority - b.display_priority
    )
    .map((source: SourceType) => ({
      id: source.id,
      name: source.display_label ? source.display_label : source.name,
    }));

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        items={items.map((i: SourceType) => i.name)}
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
          renderItem={({ item }) => <OutletNewsList sourceId={item.id} />}
        />
      </View>
    </View>
  );
}
