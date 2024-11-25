import { FlatList, Image, Pressable, View } from "react-native";
import { SourceDetailType } from "./OrganizationCard";
import { ThemedText } from "./ThemedText";
import { Link, router } from "expo-router";

export type OutletsListProps = {
  data: SourceDetailType[];
  refetch: () => void;
};

export default function OrganizationsList({ data, refetch }: OutletsListProps) {
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
        <Pressable onPress={() => {
          router.push({
            pathname: "/(newsroom)/organization/[organizationId]",
            params: {
              organizationId: item.id,
              name: item.name,
            }
          });
        }}>
          <View
            style={{
              flexDirection: "column",
              gap: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              src={item.logo}
              style={{
                width: 80,
                height: 80,
                borderRadius: 10,
                objectFit: "contain",
                backgroundColor: "white",
              }}
            />
            <ThemedText style={{ fontSize: 12 }}>
              {item.name}
            </ThemedText>
          </View>
        </Pressable >
      )
      }
    />
  );
}
