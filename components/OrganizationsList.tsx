import { FlatList, Image, Pressable, View } from "react-native";
import { OrganiztionDetailType } from "./OrganizationCard";
import { ThemedText } from "./ThemedText";
import { Link, router } from "expo-router";

export type OrganiztionListProps = {
  data: OrganiztionDetailType[];
  refetch: () => void;
};

export default function OrganizationsList({ data, refetch }: OrganiztionListProps) {
  return (
    <FlatList
      contentContainerStyle={{ marginTop: 10, gap: 20 }}
      onRefresh={refetch}
      data={data}
      numColumns={3}
      key={3}
      ListEmptyComponent={() => (
        <View>
          <ThemedText type="subtext">
            No sources found for this category
          </ThemedText>
        </View>
      )}
      renderItem={({ item }: { item: OrganiztionDetailType }) => (
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
              flex: 1,
              margin: 20,
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
