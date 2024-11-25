import NewsCard, { NewsType } from "@/components/NewsCard";
import Tag, { TagType } from "@/components/Tag";
import { ThemedText } from "@/components/ThemedText";
import Empty from "@/components/empty";
import Error from "@/components/error";
import { LIMIT, getNews, getTrendingTopics } from "@/config/api";
import { getImageUrl } from "@/config/helpers";
import { NewsResultType } from "@/config/types";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

export default function Search() {
  const inputRef = useRef<TextInput | null>(null);
  const [query, setQuery] = useState("");
  const colorScheme = useColorScheme();
  const { data, isLoading, error, refetch, isFetched } = useQuery({
    queryKey: ["search", query],
    queryFn: ({ queryKey }) =>
      getNews({
        search: queryKey[1],
      }),
    enabled: query.length > 3,
  });

  const { data: trendingTags } = useQuery({
    queryKey: ["trending", "tags"],
    queryFn: () =>
      getTrendingTopics({
        limit: LIMIT,
      }),
  });
  const handleChangeQuery = (text: string) => {
    setQuery(text);
  };

  const handlePressTag = (tag: TagType) => {
    handleChangeQuery(tag.tag);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef.current]);

  if (error) return <Error />;
  const items: NewsType[] = data?.results?.map((item: NewsResultType) => ({
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
    <View style={{ paddingHorizontal: 16, marginTop: 10 }}>
      <View
        style={[
          styles.searchBar,
          { backgroundColor: Colors[colorScheme ?? "light"].background },
        ]}
      >
        <TextInput
          placeholder=" समाचार, स्रोत वा प्रचलन विषयहरू खोज्नुहोस्।"
          value={query}
          ref={inputRef}
          onChangeText={handleChangeQuery}
          style={{
            color: Colors[colorScheme ?? "light"].text,
            width: "90%",
          }}
          placeholderTextColor={Colors[colorScheme ?? "light"].subtext}
        />
        {isLoading ? (
          <ActivityIndicator
            size={"small"}
            color={Colors[colorScheme ?? "light"].subtext}
          />
        ) : query ? (
          <Pressable onPress={() => setQuery("")}>
            <Ionicons
              name="close"
              size={18}
              color={Colors[colorScheme ?? "light"].subtext}
            />
          </Pressable>
        ) : (
          <Ionicons
            name="search"
            size={18}
            color={Colors[colorScheme ?? "light"].subtext}
          />
        )}
      </View>
      {!query && trendingTags && (
        <View>
          <ThemedText
            type="title"
            style={{ textAlign: "center", marginBottom: 10 }}
          >
            यस हप्ता मानिसहरूले के पढिरहेका छन्
          </ThemedText>
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {trendingTags?.results?.map((item: TagType) => (
              <Tag
                data={item}
                handlePress={() => handlePressTag(item)}
                key={item.tag}
              />
            ))}
          </View>
        </View>
      )}

      <View>
        <FlatList
          data={items}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={() =>
            isFetched && (
              <Empty
                title={`No results for ${query}`}
                text="Try something else"
              />
            )
          }
          renderItem={({ item }) => (
            <NewsCard
              news={item}
              showOutletInfo
              handleBookmarkSuccess={refetch}
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    padding: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
  },
});
