import React from 'react';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { router } from 'expo-router';
import { CircleCheck as CheckCircle, Play, Lock } from 'lucide-react-native';
import { VideoData } from '@/types/videoData';
import Colors from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';

type VideoCardProps = {
  video: VideoData;
  isLocked?: boolean;
};

export default function VideoCard({ video, isLocked = false }: VideoCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  const handlePress = () => {
    if (!isLocked) {
      router.push(`/video/${video.id}`);
    }
  };

  // Format duration from seconds to mm:ss
  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        { backgroundColor: colors.card },
        pressed && !isLocked && styles.pressed
      ]}
      onPress={handlePress}
      disabled={isLocked}
    >
      <View style={styles.thumbnailContainer}>
        <Image source={{ uri: video.thumbnail }} style={styles.thumbnail} />
        <View style={styles.overlayContainer}>
          {isLocked ? (
            <Lock size={24} color="#FFFFFF" />
          ) : (
            <View style={styles.playButton}>
              <Play size={18} color="#FFFFFF" fill="#FFFFFF" />
            </View>
          )}
          <View style={styles.durationBadge}>
            <Text style={styles.durationText}>{formatDuration(video.duration)}</Text>
          </View>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
            {video.title}
          </Text>
          {video.isCompleted && (
            <CheckCircle size={18} color={colors.success} />
          )}
        </View>
        <Text style={[styles.description, { color: colors.secondary }]} numberOfLines={2}>
          {video.description}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  thumbnailContainer: {
    position: 'relative',
    aspectRatio: 16 / 9,
    width: '100%',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(184, 92, 56, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  durationBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  durationText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'DMSans-Medium',
  },
  content: {
    padding: 12,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'SpaceGrotesk-Bold',
    marginRight: 8,
  },
  description: {
    fontSize: 14,
    fontFamily: 'DMSans-Regular',
    lineHeight: 20,
  },
});