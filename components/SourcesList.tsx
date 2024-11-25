import { FlatList, Image, View } from "react-native";
import { SourceDetailType } from "./CategoryCard";
import { base_url } from "@/config/api";
import { ThemedText } from "./ThemedText";
import { Link } from "expo-router";

export type OutletsListProps = {
  data: SourceDetailType[];
  refetch: () => void;
};

export default function SourcesList({ data, refetch }: OutletsListProps) {
  return (
    <FlatList
      contentContainerStyle={{ marginTop: 10, gap: 20 }}
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      ListEmptyComponent={() => (
        <View>
          <ThemedText type="subtext">
            No sources found for this category
          </ThemedText>
        </View>
      )}
      renderItem={({ item }: { item: SourceDetailType }) => (
        <Link
          href={{
            pathname: `/(tabs)/(newsroom)/outlet/[outletId]`,
            params: {
              outletId: item.outlet_detail.id,
              name: item.outlet_detail.name,
            },
          }}
        >
          <View
            style={{
              flexDirection: "column",
              gap: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              src={base_url + item.outlet_detail.logo}
              style={{
                width: 80,
                height: 80,
                borderRadius: 10,
                objectFit: "contain",
                backgroundColor: "white",
              }}
            />
            <ThemedText style={{ fontSize: 12 }}>
              {"item.outlet_detail.name"}
            </ThemedText>
          </View>
        </Link>
      )}
    />
  );
}
