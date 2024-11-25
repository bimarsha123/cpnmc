// app/(app)/(tabs)/newsroom/organization/[organizationId].tsx

import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import FileList from '@/components/NoticeList';
import { getNotice } from '@/config/api';
import { useQuery } from '@tanstack/react-query';

export type NoticeType = {
    id: number;
    name: string;
    image: string;
    organization: string;
    created_at: Date;
};

const handleFilePress = (file: FileItem) => {
    console.log('File pressed:', file.name);
};

export default function OrganizationPage() {
    const { organizationId } = useLocalSearchParams<{ organizationId: string }>();

    const { data, isPending, error, refetch } = useQuery({
        queryKey: ["id", "list"],
        queryFn: getNotice,
    },
    );

    const files = data.results.map((notice: NoticeType) => ({
        id: notice.id,
        organization: notice.organization,
        name: notice.name,
        type: "document",
        size: 1024 * 1024 * 2.5,
        modifiedDate: new Date(notice.created_at),
    }));

    return (
        <View style={{
            height: '100%'
        }}>
            <FileList
                files={files}
                onFilePress={handleFilePress}
            />
        </View >
    );
}