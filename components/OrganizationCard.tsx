import { View } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useQuery } from "@tanstack/react-query";
import Loading from "./Loading";
import { getOrganizations } from "@/config/api";
import Error from "./error";
import OrganizationsList from "./OrganizationsList";
export type OrganiztionCardProps = {
  title: string;
  id: number;
};

export type OrganiztionDetailType = {
  logo: string;
  id: number;
  created_at: string;
  name: string;
};

export default function OrganizationCard({ title, id }: OrganiztionCardProps) {
  const colorScheme = useColorScheme();
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["organizations"], // A unique key for the query
    queryFn: () => getOrganizations(), // Properly invoking the function
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

        <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
          <ThemedText type="heading">{"ने.क.पा (माओवादी केन्द्र) अन्तर्गतका संगठनहरु"}</ThemedText>
        </View>

      </View>
      {isPending ? (
        <Loading />
      ) : (
        <OrganizationsList refetch={refetch} data={data?.results} />
      )}
    </ThemedView>
  );
}
