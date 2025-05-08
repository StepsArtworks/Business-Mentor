import React from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import { router } from 'expo-router';
import { CircleCheck as CheckCircle2, Circle, ChevronRight, Lock } from 'lucide-react-native';
import { categories } from '@/data/categories';
import Colors from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';

export default function CourseTimeline() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  const navigateToVideo = (videoId: string) => {
    router.push(`/video/${videoId}`);
  };

  return (
    <ScrollView style={styles.container}>
      {categories.map((category, categoryIndex) => (
        <View key={category.id} style={styles.categoryContainer}>
          <Text style={[styles.categoryTitle, { color: colors.text }]}>
            {category.title}
          </Text>
          
          {category.topics.map((topic, topicIndex) => (
            <View key={topic.id} style={styles.topicContainer}>
              <View style={styles.topicHeader}>
                <Text style={[styles.topicTitle, { color: colors.text }]}>
                  {topic.title}
                </Text>
                <Text style={[styles.topicProgress, { color: colors.secondary }]}>
                  {topic.videos.filter(v => v.isCompleted).length}/{topic.videos.length}
                </Text>
              </View>
              
              <View style={[styles.timeline, { backgroundColor: colors.border }]}>
                {topic.videos.map((video, videoIndex) => {
                  const isLocked = videoIndex > 0 && !topic.videos[videoIndex - 1].isCompleted;
                  
                  return (
                    <Pressable
                      key={video.id}
                      style={[
                        styles.videoItem,
                        { backgroundColor: colors.card }
                      ]}
                      onPress={() => !isLocked && navigateToVideo(video.id)}
                      disabled={isLocked}
                    >
                      <View style={[
                        styles.videoMarker,
                        video.isCompleted && { backgroundColor: colors.accent }
                      ]}>
                        {video.isCompleted ? (
                          <CheckCircle2 size={24} color={colors.accent} fill={colors.card} />
                        ) : isLocked ? (
                          <Lock size={24} color={colors.muted} />
                        ) : (
                          <Circle size={24} color={colors.secondary} />
                        )}
                      </View>
                      
                      <View style={styles.videoContent}>
                        <View style={styles.videoHeader}>
                          <Text 
                            style={[
                              styles.videoTitle,
                              { color: isLocked ? colors.muted : colors.text }
                            ]}
                            numberOfLines={1}
                          >
                            {video.title}
                          </Text>
                          {!isLocked && (
                            <ChevronRight size={20} color={colors.secondary} />
                          )}
                        </View>
                        
                        <Text 
                          style={[
                            styles.videoDuration,
                            { color: isLocked ? colors.muted : colors.secondary }
                          ]}
                        >
                          {Math.floor(video.duration / 60)} min
                        </Text>
                      </View>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categoryContainer: {
    marginBottom: 32,
  },
  categoryTitle: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 24,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  topicContainer: {
    marginBottom: 24,
  },
  topicHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  topicTitle: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 18,
    flex: 1,
    marginRight: 16,
  },
  topicProgress: {
    fontFamily: 'DMSans-Medium',
    fontSize: 14,
  },
  timeline: {
    width: 2,
    marginLeft: 31,
    marginTop: 8,
  },
  videoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginLeft: -16,
    paddingVertical: 12,
    paddingRight: 16,
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  videoMarker: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  videoContent: {
    flex: 1,
    marginLeft: 8,
  },
  videoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  videoTitle: {
    fontFamily: 'DMSans-Medium',
    fontSize: 16,
    flex: 1,
    marginRight: 8,
  },
  videoDuration: {
    fontFamily: 'DMSans-Regular',
    fontSize: 14,
    marginTop: 4,
  },
});