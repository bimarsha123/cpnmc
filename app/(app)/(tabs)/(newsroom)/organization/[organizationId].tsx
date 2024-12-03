
import { View, Text, Alert, ActivityIndicator, SectionList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import FileList from '@/components/NoticeList';
import { getNotice } from '@/config/api';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export type NoticeType = {
    id: number;
    name: string;
    image: string;
    organization: string;
    created_at: Date;
};

export type FileItem = {
    id: number;
    name: string;
    image: string;
    organization: string;
    type: string,
    size: number,
    modifiedDate: Date,
};

const handleFilePress = (file: FileItem) => {
    console.log('File pressed:', file.name);
};

export default function OrganizationPage() {
    const { organizationId } = useLocalSearchParams<{ organizationId: string }>();
    // const files = [
    //     {
    //         name: "Document 1.pdf",
    //         type: "document",
    //         size: 1024 * 1024 * 2.5,
    //         modifiedDate: new Date()
    //     },
    //     {
    //         name: "Document 2.pdf",
    //         type: "document",
    //         size: 1024 * 1024 * 2.5,
    //         modifiedDate: new Date()
    //     },
    //     {
    //         name: "Document 2.pdf",
    //         type: "document",
    //         size: 1024 * 1024 * 2.5,
    //         modifiedDate: new Date()
    //     },
    //     {
    //         name: "Document 2.pdf",
    //         type: "document",
    //         size: 1024 * 1024 * 2.5,
    //         modifiedDate: new Date()
    //     },
    //     {
    //         name: "Document 2.pdf",
    //         type: "document",
    //         size: 1024 * 1024 * 2.5,
    //         modifiedDate: new Date()
    //     },
    //     {
    //         name: "Document 2.pdf",
    //         type: "document",
    //         size: 1024 * 1024 * 2.5,
    //         modifiedDate: new Date()
    //     },
    //     {
    //         name: "Document 2.pdf",
    //         type: "document",
    //         size: 1024 * 1024 * 2.5,
    //         modifiedDate: new Date()
    //     },
    //     {
    //         name: "Document 2.pdf",
    //         type: "document",
    //         size: 1024 * 1024 * 2.5,
    //         modifiedDate: new Date()
    //     },
    //     {
    //         name: "Document 2.pdf",
    //         type: "document",
    //         size: 1024 * 1024 * 2.5,
    //         modifiedDate: new Date()
    //     },
    //     {
    //         name: "Document 2.pdf",
    //         type: "document",
    //         size: 1024 * 1024 * 2.5,
    //         modifiedDate: new Date()
    //     },
    //     {
    //         name: "Document 2.pdf",
    //         type: "document",
    //         size: 1024 * 1024 * 2.5,
    //         modifiedDate: new Date()
    //     },
    // ];

    const [noticeData, setNoticeData] = useState(null);
    const { isLoading, error } = useQuery({
        queryKey: ['notices', organizationId],
        queryFn: async () => {
            try {
                const result = await getNotice(organizationId);
                if (!result) {
                    throw new Error('Failed to fetch notices');
                }
                setNoticeData(result);
                return result;
            } catch (error) {

                throw error;
            }
        }
    });

    if (isLoading) {
        return (
            <View>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (error) {
        return (
            <View >
                <Text>Failed to load notices</Text>
            </View>
        );
    }

    if (!noticeData) {
        return (
            <View>
                <Text>No notices found</Text>
            </View>
        );
    }

    const files = noticeData.results.map((notice: NoticeType) => ({
        id: notice.id,
        organization: notice.organization,
        name: notice.name,
        type: "document",
        size: 1024 * 1024 * 2.5,
        modifiedDate: new Date(notice.created_at),
    }));

    const sections = [
        {
            title: 'संरचना',
            data: ['ExpandableContent'], // Placeholder to fit SectionList's data format
        },
        {
            title: 'हालका सूचनाहरू हेर्नुहोस्',
            data: ['FileList'], // Placeholder for the FileList component
        },
    ];

    const ExpandableContent = ({ content }) => {
        const [expanded, setExpanded] = useState(false);

        return (
            <View>
                <TouchableOpacity
                    style={styles.header}
                    onPress={() => setExpanded(!expanded)}
                >
                    <Text style={styles.headerText}>
                        {expanded ? 'Collapse' : 'Expand'}
                    </Text>
                </TouchableOpacity>
                {expanded && (
                    <View style={styles.content}>
                        <Text>{content}</Text>
                    </View>
                )}
            </View>
        );
    };

    return (
        <SectionList
            sections={sections}
            keyExtractor={(item, index) => `${item} -${index} `}
            renderSectionHeader={({ section }) => (
                <Text style={styles.sectionHeader}>{section.title}</Text>
            )}
            renderItem={({ item, section }) => {
                if (section.title === 'संरचना') {
                    return (<ScrollView>
                        <FileList files={files} onFilePress={handleFilePress} />
                    </ScrollView>)
                    // <ExpandableContent content="This is the expandable content." />;
                }
                if (section.title === 'हालका सूचनाहरू हेर्नुहोस्') {
                    return (
                        <ScrollView>
                            <FileList files={files} onFilePress={handleFilePress} />
                        </ScrollView>
                    );
                }
                return null;
            }}
            contentContainerStyle={styles.container}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    header: {
        padding: 10,
        backgroundColor: '#ddd',
        borderRadius: 5,
    },
    headerText: {
        fontSize: 16,
    },
    content: {
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginTop: 5,
    },
});