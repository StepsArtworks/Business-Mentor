import React from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, Play, Lock, CircleCheck as CheckCircle } from 'lucide-react-native';
import { categories } from '@/data/categories';
import Colors from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';

export default function TopicScreen() {
  const { categoryId, topicId } = useLocalSearchParams<{ categoryId: string; topicId: string }>();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  const category = categories.find(c => c.id === categoryId);
  const topic = category?.topics.find(t => t.id === topicId);

  if (!category || !topic) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.error }]}>Topic not found</Text>
      </View>
    );
  }

  const handleBack = () => {
    router.back();
  };

  const navigateToVideo = (videoId: string) => {
    router.push(`/video/${videoId}`);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.card }]}>
        <Pressable onPress={handleBack} style={styles.backButton}>
          <ArrowLeft color={colors.text} size={24} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.text }]} numberOfLines={1}>
          {topic.title}
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.description, { color: colors.secondary }]}>
          {topic.description}
        </Text>

        <View style={styles.videosContainer}>
          {topic.videos.map((video, index) => {
            const isLocked = index > 0 && !topic.videos[index - 1].isCompleted;

            return (
              <Pressable
                key={video.id}
                style={[styles.videoCard, { backgroundColor: colors.card }]}
                onPress={() => !isLocked && navigateToVideo(video.id)}
                disabled={isLocked}
              >
                <View style={styles.videoInfo}>
                  <View style={styles.videoHeader}>
                    <Text 
                      style={[
                        styles.videoTitle,
                        { color: isLocked ? colors.muted : colors.text }
                      ]}
                      numberOfLines={2}
                    >
                      {video.title}
                    </Text>
                    {isLocked ? (
                      <Lock size={24} color={colors.muted} />
                    ) : video.isCompleted ? (
                      <CheckCircle size={24} color={colors.success} />
                    ) : (
                      <Play size={24} color={colors.accent} />
                    )}
                  </View>
                  
                  <Text 
                    style={[
                      styles.videoDuration,
                      { color: isLocked ? colors.muted : colors.secondary }
                    ]}
                  >
                    {Math.floor(video.duration / 60)} minutes
                  </Text>
                  
                  <Text 
                    style={[
                      styles.videoDescription,
                      { color: isLocked ? colors.muted : colors.secondary }
                    ]}
                    numberOfLines={2}
                  >
                    {video.description}
                  </Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 18,
    marginLeft: 8,
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    padding: 16,
  },
  description: {
    fontFamily: 'DMSans-Regular',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  videosContainer: {
    gap: 16,
  },
  videoCard: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  videoInfo: {
    padding: 16,
  },
  videoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  videoTitle: {
    flex: 1,
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 16,
    marginRight: 12,
  },
  videoDuration: {
    fontFamily: 'DMSans-Regular',
    fontSize: 14,
    marginBottom: 8,
  },
  videoDescription: {
    fontFamily: 'DMSans-Regular',
    fontSize: 14,
    lineHeight: 20,
  },
  errorText: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 40,
  },
});