import React, { useState, useEffect } from "react";
import { View, FlatList, Dimensions, SafeAreaView } from "react-native";
import { getPosts, getSocial } from "@/config/api"; // Ensure to import the getPosts function
import PostCard, { PostType } from "@/components/PostCard";
import { useQuery } from "@tanstack/react-query";
import Empty from "./empty";
import { ThemedView } from "./ThemedView";

type SocialFeedProps = {
    selectedCategory: number;
};

export default function SocialFeed({
    selectedCategory,
}: SocialFeedProps) {
    const [postsData, setPostsData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { width } = Dimensions.get("window");
    const { data, isPending, error, refetch, isRefetching } = useQuery({
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


    const postItems: PostType[] = postsData
        ? postsData.results.map((item: PostType) => ({
            id: item.id,
            title: item.title,
            content: item.content,
            author: item.author,
            link: item.link,
            image: item.image,
            created_at: item.created_at,
        }))
        : [];
    return (
        <SafeAreaView style={{ width: width }}>
            <FlatList
                data={postItems}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View>
                        {item.author === selectedCategory + 1 && (
                            <PostCard post={item} />
                        )}</View>

                )}
                onRefresh={refetch}
                refreshing={isRefetching}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={() => (
                    <Empty action={refetch} actionButtonTitle="Retry" />
                )}
                onEndReachedThreshold={0.5}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}
