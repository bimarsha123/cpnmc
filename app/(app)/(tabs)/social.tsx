import React, { useState, useEffect, useRef } from "react";
import { View, Text, FlatList, NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { getPosts, getSocial } from "@/config/api"; // Ensure to import the getPosts function
import { Header } from "@/components/Header";
import Tabs from "@/components/tab/Tabs";
import { SocialType } from "@/config/types";
import { useQuery } from "@tanstack/react-query";
import WebView from "react-native-webview";
import SocialFeed from "@/components/SocialFeed";

export default function Social() {
  const [activeTab, setActiveTab] = useState(0);
  const [postsData, setPostsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const flatlistRef = useRef<FlatList | null>(null);


  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["categories", "list", "explore"],
    queryFn: getSocial,
  });


  useEffect(() => {
    // Fetching data from getPosts()
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const data = await getPosts();
        setPostsData(data);
      } catch (err) {

      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []); // Empty dependency array to run only once when the component mounts

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  const handleChangeTab = (index: number) => {
    flatlistRef.current?.scrollToIndex({ index: index, animated: false });
    setActiveTab(index);
  };

  const items = data?.results
    ?.sort(
      (a: SocialType, b: SocialType) =>
        a.id - b.id
    )
    .map((source: SocialType) => ({
      id: source.id,
      name: source.name,
    }));

  const handleScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    let contentOffset = e.nativeEvent.contentOffset;
    let viewSize = e.nativeEvent.layoutMeasurement;
    let pageNum = Math.floor(contentOffset.x / viewSize.width);
    setActiveTab(pageNum);
  };

  return (
    <View style={{ height: '100%' }}>
      <Header />
      <Tabs
        items={items.map((i: SocialType) => i.name)}
        selectedIndex={activeTab}
        onChange={handleChangeTab}
      />
      {postsData && (
        <View style={{
          justifyContent: "center",
          alignItems: "center",
        }} >
          <FlatList
            data={items}
            ref={flatlistRef}
            horizontal
            removeClippedSubviews={true}
            maxToRenderPerBatch={1}
            pagingEnabled
            bounces={false}
            onMomentumScrollEnd={handleScrollEnd}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <SocialFeed selectedCategory={activeTab} />
            )}
          />
        </View>
      )}
    </View>
  );
}
