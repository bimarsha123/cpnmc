import React, { useState, useEffect } from "react";
import { View, FlatList, Dimensions } from "react-native";
import { getPosts, getSocial } from "@/config/api"; // Ensure to import the getPosts function
import PostCard, { PostType } from "@/components/PostCard";
import { useQuery } from "@tanstack/react-query";
import Empty from "./empty";

type SocialFeedProps = {
    selectedCategory: number | null;
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
        <View style={{ width: width }}>
            <FlatList
                data={postItems}
                renderItem={({ item }) => (
                    <View>
                        {item.author === selectedCategory + 1 && (
                            <PostCard post={item} />
                        )}</View>

                )}
                onRefresh={refetch}
                refreshing={isRefetching}
                keyExtractor={(item) => item.id.toString()}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                ListEmptyComponent={() => (
                    <Empty action={refetch} actionButtonTitle="Retry" />
                )}
                onEndReached={() => {
                }}
                onEndReachedThreshold={0.5}
                showsVerticalScrollIndicator={false}
            />
        </View>

    );
}
