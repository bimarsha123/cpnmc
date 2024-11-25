import { StyleSheet, View, Image, FlatList } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getSources } from "@/config/api";
import Loading from "@/components/Loading";
import { ThemedText } from "@/components/ThemedText";
import { OutletType } from "@/components/CategoryCard";
import { Link, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import Error from "@/components/error";
import Empty from "@/components/empty";
import FollowButton from "@/components/FollowButton";
import { SourceType } from "../outlet/[outletId]";
export default function CategoryDetailList() {
  const navigation = useNavigation();
  const { categoryId, name } = useLocalSearchParams();
  const colorScheme = useColorScheme();

  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["outlets", "list", categoryId],
    queryFn: ({ queryKey }) =>
      getSources({
        category: queryKey[2],
      }),
  });

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, [name, navigation]);

  if (isPending) return <Loading />;
  if (error) return <Error onRetry={refetch} />;

  return (
    <FlatList
      contentContainerStyle={{
        paddingTop: 10,
        paddingBottom: 100,
        paddingHorizontal: 10,
      }}
      data={data.results}
      onRefresh={refetch}
      refreshing={isPending}
      ListEmptyComponent={() => (
        <Empty
          action={refetch}
          actionButtonTitle="Retry"
          title="No sources for this category!"
        />
      )}
      renderItem={({ item, index }: { item: SourceType; index: number }) => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 10,
            justifyContent: "space-between",
            borderBottomWidth: index === data.results.length - 1 ? 0 : 1,
            borderBottomColor: Colors[colorScheme ?? "light"].divider,
          }}
        >
          <Link
            href={{
              pathname: `/(app)/(tabs)/(newsroom)/outlet/[outletId]`,
              params: { outletId: item.outlet, name: item.outlet_detail.name },
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 20,
              }}
            >
              <ThemedText>{index + 1}</ThemedText>
              <Image
                src={item.outlet_detail.logo}
                style={{
                  height: 50,
                  width: 50,
                  backgroundColor: "white",
                  objectFit: "contain",
                  borderRadius: 10,
                }}
              />
              <ThemedText style={{ fontWeight: "bold" }}>
                {item.name}
              </ThemedText>
            </View>
          </Link>
          <FollowButton onSuccess={refetch} data={item} followType="sources" />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
