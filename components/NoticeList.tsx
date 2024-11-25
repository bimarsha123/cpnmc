import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import type { ViewStyle } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface FileItem {
  name: string;
  type: 'file' | 'folder' | 'image' | 'video' | 'audio' | 'document';
  modifiedDate?: Date;
}

interface FileListProps {
  files?: FileItem[];
  onFilePress?: (file: FileItem) => void;
  style?: ViewStyle;
}

const getFileIconName = (type: FileItem['type']) => {
  switch (type) {
    case 'folder':
      return 'folder';
    case 'image':
      return 'file-image';
    case 'video':
      return 'file-video';
    case 'audio':
      return 'file-music';
    case 'document':
      return 'file-document';
    default:
      return 'file';
  }
};

const formatDate = (date?: Date) => {
  if (!date) return '';
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) {
    return 'Today';
  } else if (days === 1) {
    return 'Yesterday';
  } else if (days < 7) {
    return `${days} days ago`;
  } else {
    return date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate();
  }
};

const FileList = ({ files = [], onFilePress, style }: FileListProps) => {
  const renderItem = ({ item: file }: { item: FileItem }) => (
    <TouchableOpacity
      style={styles.fileRow}
      onPress={() => onFilePress?.(file)}
      activeOpacity={0.7}
    >
      <View style={styles.fileContent}>
        {/* Replace this comment with your icon component, e.g.:*/}

        <MaterialCommunityIcons
          name={getFileIconName(file.type)}
          size={50}
          style={styles.icon}
        />
        <View style={styles.textContainer}>
          <Text style={styles.fileName} numberOfLines={1}>
            {file.name}
          </Text>
          <Text style={styles.fileDate} numberOfLines={1}>
            {formatDate(file.modifiedDate)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (!files.length) {
    return (
      <View style={[styles.container, styles.emptyContainer, style]}>
        <Text style={styles.emptyText}>No files to display</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <FlatList
        data={files}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        ItemSeparatorComponent={() => <View style={styles.separator} />}

      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyText: {
    color: '#666',
    fontSize: 16,
  },
  listContent: {
    paddingVertical: 8,
  },
  fileRow: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  fileContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  fileName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  fileDate: {
    fontSize: 14,
    color: '#666',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
  },
});

export default FileList;