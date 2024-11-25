import { StyleSheet, View, FlatList } from "react-native";
import { Header } from "@/components/Header";
import { useQuery } from "@tanstack/react-query";
import { getOrganizations } from "@/config/api";
import Loading from "@/components/Loading";
import Error from "@/components/error";
import OrganizationCard from "@/components/OrganizationCard";

export type OrganiztionType = {
  id: number;
  name: string;
};

export default function Index() {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["id", "list", "newsroom"],
    queryFn: getOrganizations,
  },
  );

  if (isPending) return <Loading />;
  if (error)
    return (
      <Error
        text="Something went wrong"
        onRetry={refetch}
        retryDisabled={isPending}
      />
    );
  return (
    <View>
      <Header title="संगठन" />
      <FlatList
        contentContainerStyle={{ paddingTop: 10, paddingBottom: 100 }}
        data={data.results.slice(0, 1)}
        onRefresh={refetch}
        refreshing={isPending}
        renderItem={({ item }: { item: OrganiztionType }) => (
          <OrganizationCard title={item.name} id={item.id} />
        )}
      />
    </View>
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
