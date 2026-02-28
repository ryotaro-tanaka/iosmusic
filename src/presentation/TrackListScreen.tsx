import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { discoverTracks } from '../application/discoverTracks';
import type { TrackListItem } from '../domain/track';
import {
  FileSystemTrackRepository,
  getM4ATargetDirectoryPath,
} from '../infrastructure/fileSystemTrackRepository';
import { consoleLogger } from '../infrastructure/logger';

const repository = new FileSystemTrackRepository(consoleLogger);

export const TrackListScreen = () => {
  const [tracks, setTracks] = useState<TrackListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [targetDirectoryPath, setTargetDirectoryPath] = useState<string>('');

  const loadTracks = useCallback(async () => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const discovered = await discoverTracks(repository);
      setTracks(discovered);
    } catch {
      setTracks([]);
      setErrorMessage('曲一覧の読み込みに失敗しました。再読み込みをお試しください。');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadTracks();
  }, [loadTracks]);

  useEffect(() => {
    const loadTargetDirectory = async () => {
      const target = await getM4ATargetDirectoryPath();
      setTargetDirectoryPath(target);
    };

    void loadTargetDirectory();
  }, []);

  const content = useMemo(() => {
    if (loading) {
      return (
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" />
          <Text style={styles.helperText}>読み込み中...</Text>
        </View>
      );
    }

    if (errorMessage) {
      return (
        <View style={styles.centerContent}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      );
    }

    if (tracks.length === 0) {
      return (
        <View style={styles.centerContent}>
          <Text style={styles.emptyText}>再生可能なM4Aファイルが見つかりません</Text>
          <Text style={styles.helperText}>{targetDirectoryPath}</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={tracks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Text style={styles.itemTitle}>{item.title}</Text>
          </View>
        )}
      />
    );
  }, [errorMessage, loading, targetDirectoryPath, tracks]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>曲一覧</Text>
        <Pressable onPress={loadTracks} style={styles.reloadButton}>
          <Text style={styles.reloadButtonText}>再読み込み</Text>
        </Pressable>
        {content}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
  },
  reloadButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#111827',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 16,
  },
  reloadButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  helperText: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#111827',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#b91c1c',
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 24,
  },
  itemRow: {
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#d1d5db',
  },
  itemTitle: {
    fontSize: 16,
    color: '#111827',
  },
});
