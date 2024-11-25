import { View } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { useQuery } from "@tanstack/react-query";
import Loading from "./Loading";
import { getCategory } from "@/config/api";
import SourcesList from "./SourcesList";
import { Link } from "expo-router";
import FollowButton from "./FollowButton";
import Error from "./error";
export type CategoryCardProps = {
  title: string;
  id: number;
};

export type OutletType = {
  id: number;
  name: string;
  logo: string;
  url: string;
};

export type SourceDetailType = {
  id: number;
  outlet_detail: OutletType;
  followed: boolean;
  name: string;
};

export default function CategoryCard({ title, id }: CategoryCardProps) {
  const colorScheme = useColorScheme();
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["categories", "detail", id],
    queryFn: ({ queryKey }) => getCategory(queryKey[2] as number),
    enabled: !!id,
  });

  if (error) return <Error onRetry={refetch} />;

  return (
    <ThemedView style={{ padding: 20 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link
          href={{
            pathname: `/(app)/(tabs)/(newsroom)/category/[categoryId]`,
            params: { categoryId: id, name: title },
          }}
        >
          <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
            <ThemedText type="title">{title}</ThemedText>
            <Ionicons
              name="chevron-forward"
              size={18}
              color={Colors[colorScheme ?? "light"].text}
            />
          </View>
        </Link>

        {data && (
          <FollowButton
            onSuccess={refetch}
            data={data}
            followType="categories"
          />
        )}
      </View>
      {isPending ? (
        <Loading />
      ) : (
        <SourcesList refetch={refetch} data={data?.sources} />
      )}
    </ThemedView>
  );
}
