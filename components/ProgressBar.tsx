import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import Colors from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';

type ProgressBarProps = {
  progress: number; // value between 0 and 1
  height?: number;
  animate?: boolean;
};

export default function ProgressBar({ progress, height = 4, animate = true }: ProgressBarProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  
  const clampedProgress = Math.min(Math.max(progress, 0), 1);
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: animate 
        ? withTiming(`${clampedProgress * 100}%`, { duration: 300 })
        : `${clampedProgress * 100}%`
    };
  });

  return (
    <View style={[styles.container, { height, backgroundColor: colors.border }]}>
      <Animated.View 
        style={[
          styles.progress, 
          { backgroundColor: colors.accent },
          animatedStyle
        ]} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
  },
});