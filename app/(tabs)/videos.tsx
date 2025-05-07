import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import { Filter } from 'lucide-react-native';
import VideoCard from '@/components/VideoCard';
import { videos } from '@/data/videos';
import Colors from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';

type FilterOption = 'all' | 'completed' | 'not-completed';

export default function VideosScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const [filter, setFilter] = useState<FilterOption>('all');

  const filteredVideos = videos.filter(video => {
    if (filter === 'all') return true;
    if (filter === 'completed') return video.isCompleted;
    if (filter === 'not-completed') return !video.isCompleted;
    return true;
  });

  const renderFilterButton = (label: string, value: FilterOption) => (
    <Pressable
      style={[
        styles.filterButton,
        filter === value && [
          styles.activeFilterButton,
          { backgroundColor: colors.accent }
        ]
      ]}
      onPress={() => setFilter(value)}
    >
      <Text
        style={[
          styles.filterButtonText,
          filter === value
            ? styles.activeFilterButtonText
            : { color: colors.secondary }
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.filterContainer}>
        <View style={styles.filterIconContainer}>
          <Filter size={18} color={colors.secondary} />
          <Text style={[styles.filterLabel, { color: colors.secondary }]}>
            Filter:
          </Text>
        </View>
        <View style={styles.filterButtons}>
          {renderFilterButton('All', 'all')}
          {renderFilterButton('Completed', 'completed')}
          {renderFilterButton('To Watch', 'not-completed')}
        </View>
      </View>

      <FlatList
        data={filteredVideos}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <VideoCard
            video={item}
            isLocked={index > 0 && !videos[index - 1].isCompleted}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.secondary }]}>
              No videos found that match your filter.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  filterIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  filterLabel: {
    fontFamily: 'DMSans-Medium',
    fontSize: 14,
    marginLeft: 6,
  },
  filterButtons: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  activeFilterButton: {
    backgroundColor: '#B85C38',
  },
  filterButtonText: {
    fontFamily: 'DMSans-Medium',
    fontSize: 14,
  },
  activeFilterButtonText: {
    color: '#FFFFFF',
  },
  listContent: {
    padding: 16,
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontFamily: 'DMSans-Regular',
    fontSize: 16,
    textAlign: 'center',
  },
});