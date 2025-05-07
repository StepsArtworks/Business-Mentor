import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Rewind, FastForward, Pause, Play } from 'lucide-react-native';
import { AVPlaybackStatus } from 'expo-av';
import ProgressBar from './ProgressBar';
import Colors from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';

type VideoControlsProps = {
  playbackStatus: AVPlaybackStatus;
  onTogglePlayback: () => void;
  onSeekBack: () => void;
  onSeekForward: () => void;
};

export default function VideoControls({
  playbackStatus,
  onTogglePlayback,
  onSeekBack,
  onSeekForward,
}: VideoControlsProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  // Handle playbackStatus to extract isPlaying and progress
  const isLoaded = playbackStatus.isLoaded;
  const isPlaying = isLoaded ? playbackStatus.isPlaying : false;
  const positionMillis = isLoaded ? playbackStatus.positionMillis : 0;
  const durationMillis = isLoaded ? playbackStatus.durationMillis || 1 : 1;
  const progress = positionMillis / durationMillis;

  // Format time (milliseconds to MM:SS)
  const formatTime = (millis: number) => {
    const totalSeconds = Math.floor(millis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <View style={styles.container}>
      <ProgressBar progress={progress} height={4} />
      
      <View style={styles.controlsRow}>
        <Text style={[styles.timeText, { color: colors.text }]}>
          {formatTime(positionMillis)}
        </Text>
        
        <View style={styles.playbackControls}>
          <Pressable onPress={onSeekBack} style={styles.controlButton}>
            <Rewind color={colors.text} size={24} />
          </Pressable>
          
          <Pressable
            onPress={onTogglePlayback}
            style={[styles.playPauseButton, { backgroundColor: colors.accent }]}
          >
            {isPlaying ? (
              <Pause color="#FFFFFF" size={24} />
            ) : (
              <Play color="#FFFFFF" size={24} fill="#FFFFFF" />
            )}
          </Pressable>
          
          <Pressable onPress={onSeekForward} style={styles.controlButton}>
            <FastForward color={colors.text} size={24} />
          </Pressable>
        </View>
        
        <Text style={[styles.timeText, { color: colors.text }]}>
          {formatTime(durationMillis)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  timeText: {
    fontSize: 14,
    fontFamily: 'DMSans-Regular',
  },
  playbackControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlButton: {
    padding: 8,
  },
  playPauseButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
  },
});