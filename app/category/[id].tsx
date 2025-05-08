import React from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, Play, Lock, CircleCheck as CheckCircle, Clock, BookOpen } from 'lucide-react-native';
import { categories } from '@/data/categories';
import Colors from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';
import ProgressBar from '@/components/ProgressBar';

export default function CategoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  const category = categories.find(c => c.id === id);

  if (!category) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.error }]}>Category not found</Text>
      </View>
    );
  }

  // Calculate category stats
  const totalTopics = category.topics.length;
  const totalVideos = category.topics.reduce((sum, topic) => sum + topic.videos.length, 0);
  const completedVideos = category.topics.reduce((sum, topic) => 
    sum + topic.videos.filter(v => v.isCompleted).length, 0);
  const progress = totalVideos > 0 ? (completedVideos / totalVideos) : 0;
  
  // Calculate total duration in minutes
  const totalDuration = category.topics.reduce((sum, topic) => 
    sum + topic.videos.reduce((vSum, video) => vSum + Math.ceil(video.duration / 60), 0), 0);

  const handleBack = () => {
    router.back();
  };

  const navigateToTopic = (categoryId: string, topicId: string) => {
    router.push(`/topic/${categoryId}/${topicId}`);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.card }]}>
        <Pressable onPress={handleBack} style={styles.backButton}>
          <ArrowLeft color={colors.text} size={24} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.text }]} numberOfLines={2}>
          {category.title}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.statsCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.description, { color: colors.secondary }]}>
            {category.description}
          </Text>
          
          <View style={styles.progressContainer}>
            <ProgressBar progress={progress} height={8} />
            <Text style={[styles.progressText, { color: colors.secondary }]}>
              {completedVideos} of {totalVideos} lessons completed
            </Text>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <BookOpen size={20} color={colors.accent} />
              <Text style={[styles.statValue, { color: colors.text }]}>{totalTopics}</Text>
              <Text style={[styles.statLabel, { color: colors.secondary }]}>Topics</Text>
            </View>
            <View style={styles.statItem}>
              <Play size={20} color={colors.accent} />
              <Text style={[styles.statValue, { color: colors.text }]}>{totalVideos}</Text>
              <Text style={[styles.statLabel, { color: colors.secondary }]}>Videos</Text>
            </View>
            <View style={styles.statItem}>
              <Clock size={20} color={colors.accent} />
              <Text style={[styles.statValue, { color: colors.text }]}>{totalDuration}</Text>
              <Text style={[styles.statLabel, { color: colors.secondary }]}>Minutes</Text>
            </View>
          </View>
        </View>

        <View style={styles.topicsContainer}>
          {category.topics.map((topic, index) => {
            const completedVideos = topic.videos.filter(v => v.isCompleted).length;
            const totalVideos = topic.videos.length;
            const isLocked = index > 0 && !category.topics[index - 1].videos.every(v => v.isCompleted);
            const progress = totalVideos > 0 ? completedVideos / totalVideos : 0;

            return (
              <Pressable
                key={topic.id}
                style={[styles.topicCard, { backgroundColor: colors.card }]}
                onPress={() => !isLocked && navigateToTopic(category.id, topic.id)}
                disabled={isLocked}
              >
                <View style={styles.topicContent}>
                  <View style={styles.topicHeader}>
                    <View style={styles.topicTitleContainer}>
                      <Text style={[styles.topicNumber, { color: colors.accent }]}>
                        {(index + 1).toString().padStart(2, '0')}
                      </Text>
                      <Text 
                        style={[
                          styles.topicTitle,
                          { color: isLocked ? colors.muted : colors.text }
                        ]}
                        numberOfLines={2}
                      >
                        {topic.title}
                      </Text>
                    </View>
                    {isLocked ? (
                      <Lock size={24} color={colors.muted} />
                    ) : completedVideos === totalVideos ? (
                      <CheckCircle size={24} color={colors.success} />
                    ) : (
                      <Play size={24} color={colors.accent} />
                    )}
                  </View>
                  
                  <Text 
                    style={[
                      styles.topicDescription,
                      { color: isLocked ? colors.muted : colors.secondary }
                    ]}
                    numberOfLines={2}
                  >
                    {topic.description}
                  </Text>
                  
                  <View style={styles.progressContainer}>
                    <ProgressBar 
                      progress={progress} 
                      height={4} 
                      animate={false}
                    />
                    <Text 
                      style={[
                        styles.progressText,
                        { color: isLocked ? colors.muted : colors.secondary }
                      ]}
                    >
                      {completedVideos}/{totalVideos} lessons
                    </Text>
                  </View>
                </View>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 48,
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
    marginBottom: 8,
  },
  headerTitle: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 24,
    marginRight: 40,
  },
  content: {
    padding: 16,
  },
  statsCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  description: {
    fontFamily: 'DMSans-Regular',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressText: {
    fontFamily: 'DMSans-Regular',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 20,
    marginTop: 4,
  },
  statLabel: {
    fontFamily: 'DMSans-Regular',
    fontSize: 14,
    marginTop: 2,
  },
  topicsContainer: {
    gap: 16,
  },
  topicCard: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  topicContent: {
    padding: 16,
  },
  topicHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  topicTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginRight: 12,
  },
  topicNumber: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 16,
    marginRight: 8,
  },
  topicTitle: {
    flex: 1,
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 16,
  },
  topicDescription: {
    fontFamily: 'DMSans-Regular',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  errorText: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 40,
  },
});