import {
  View,
  StyleSheet,
  ScrollView,
  SectionList,
  Text,
  Dimensions,
  useColorScheme,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Header } from "@/components/Header";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { GenericListApiResponse, NewsResultType } from "@/config/types";
import { LIMIT, getForyouFeed, getTrendingNews } from "@/config/api";
import NewsCard, { NewsType } from "@/components/NewsCard";
import { getGreeting, getImageUrl } from "@/config/helpers";
import { useAuth } from "@/config/authContext";
import moment from "moment";
import { Link } from "expo-router";
import { tintColorDark } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import Logout from "../(account)/logout";
const width = Dimensions.get("screen").width;

export default function HomeScreen() {

  const { me } = useAuth();
  const { data, refetch, isRefetching } = useQuery<
    GenericListApiResponse<NewsResultType>
  >({
    queryKey: ["feed", "trending"],
    queryFn: () => getTrendingNews({ limit: 5, seen: false }),
  });

  const {
    data: foryouData,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch: foryouRefetch,
    isRefetching: foryouRefetching,
  } = useInfiniteQuery<GenericListApiResponse<NewsResultType>>({
    queryKey: ["feed", "foryou"],
    queryFn: ({ pageParam }) => getForyouFeed(pageParam),
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

  const handleRefresh = () => {
    foryouRefetch();
    refetch();
  };

  const trendingItems: NewsType[] = data
    ? data.results.map((item: NewsResultType) => ({
      id: item.id,
      title: item.title,
      summary: item.summary,
      link: item.link,
      image: getImageUrl(item),
      bookmarked: item.bookmarked,
      publishedDate: item.published_date,
      outlet: {
        id: item.source_detail.outlet_detail.id,
        name: item.source_detail.outlet_detail.name,
        logo: item.source_detail.outlet_detail.logo,
      },
    }))
    : [];

  const flattenData = foryouData
    ? foryouData.pages.flatMap((page) => page.results)
    : [];

  const foryouItems: NewsType[] = flattenData.map((item: NewsResultType) => ({
    id: item.id,
    title: item.title,
    link: item.link,
    image: getImageUrl(item),
    bookmarked: item.bookmarked,
    publishedDate: item.published_date,
    summary: item.summary,
    outlet: {
      id: item.source_detail.outlet_detail.id,
      name: item.source_detail.outlet_detail.name,
      logo: item.source_detail.outlet_detail.logo,
    },
  }));



  const sectionData = [
    {
      title: getGreeting(me.first_name),
      subTitle: moment().format("dddd, MMMM DD"),
      data: [],
    },
    {
      title: "प्रचलित समाचारहरू ⚡",
      subTitle: "तपाईंले छुटेको यो हप्ताको प्रचलनमा रहेको समाचार।",
      data: trendingItems,
      showFooter: true,
      footerText: "सबै ट्रेन्डिङ समाचारहरू हेर्नुहोस्",
      footerLink: "/(app)/trending",
    },
    {
      title: "News for you",
      subTitle: "Top news for you.",
      data: foryouItems,
    },
  ];
  return (
    <View>
      <Header />
      <View
        style={{
          paddingBottom: 100,
        }}
      >
        <SectionList
          onRefresh={handleRefresh}
          refreshing={isRefetching || foryouRefetching}
          sections={sectionData}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.5}
          ItemSeparatorComponent={() => <ThemedView style={{ height: 20 }} />}
          renderItem={({ item }) => (
            <ThemedView
              style={{
                width,
                paddingHorizontal: 10,
              }}
            >
              <NewsCard
                news={item}
                showOutletInfo
                handleBookmarkSuccess={refetch}
              />
            </ThemedView>
          )}
          keyExtractor={(item) => item.id.toString()}
          renderSectionHeader={({ section: { title, subTitle } }) => (
            <ThemedView
              style={{
                paddingVertical: 10,
                paddingHorizontal: 10,
                marginTop: 10,
              }}
            >
              <ThemedText type="heading">{title}</ThemedText>
              <ThemedText type="subtext">{subTitle}</ThemedText>
            </ThemedView>
          )}
          renderSectionFooter={({
            section: { showFooter, footerText, footerLink },
          }) =>
            showFooter ? (
              <ThemedView
                style={{
                  padding: 10,
                  alignItems: "center",
                }}
              >
                <Link href={footerLink || "/"}>
                  <View
                    style={{
                      paddingVertical: 10,
                      paddingHorizontal: 10,
                      borderRadius: 10,
                      borderWidth: 1,
                      gap: 10,
                      borderColor: tintColorDark,
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <ThemedText
                      style={{ color: tintColorDark }}
                      onPress={() => { }}
                    >
                      {footerText}
                    </ThemedText>
                    <Ionicons
                      name="chevron-forward"
                      size={14}
                      color={tintColorDark}
                    />
                  </View>
                </Link>
              </ThemedView>
            ) : null
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
  },
});
