import React from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { Circle } from 'lucide-react-native';
import Animated, { 
  useAnimatedStyle, 
  withSpring,
  useSharedValue,
  withSequence,
  withDelay
} from 'react-native-reanimated';
import Colors from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';

const { width } = Dimensions.get('window');
const BUBBLE_SIZE = width * 0.35;
const CONNECTOR_WIDTH = 2;
const CONNECTOR_LENGTH = 60;

type BubbleTimelineProps = {
  categories: Array<{
    id: string;
    title: string;
    description: string;
    topics: Array<{
      videos: Array<{
        isCompleted: boolean;
      }>;
    }>;
  }>;
};

export default function BubbleTimeline({ categories }: BubbleTimelineProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  const handlePress = (categoryId: string) => {
    router.push(`/category/${categoryId}`);
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {categories.map((category, index) => (
        <BubbleItem
          key={category.id}
          category={category}
          index={index}
          onPress={handlePress}
          isLast={index === categories.length - 1}
        />
      ))}
    </ScrollView>
  );
}

function BubbleItem({ 
  category, 
  index, 
  onPress,
  isLast 
}: { 
  category: BubbleTimelineProps['categories'][0];
  index: number;
  onPress: (id: string) => void;
  isLast: boolean;
}) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  // Calculate progress with safety checks
  const totalVideos = Array.isArray(category.topics) 
    ? category.topics.reduce((sum, topic) => 
        sum + (Array.isArray(topic.videos) ? topic.videos.length : 0), 0)
    : 0;

  const completedVideos = Array.isArray(category.topics)
    ? category.topics.reduce((sum, topic) => 
        sum + (Array.isArray(topic.videos) 
          ? topic.videos.filter(v => v?.isCompleted).length 
          : 0), 0)
    : 0;

  const progress = totalVideos > 0 ? completedVideos / totalVideos : 0;

  React.useEffect(() => {
    const delay = index * 200;
    scale.value = withDelay(
      delay,
      withSpring(1, { damping: 12 })
    );
    opacity.value = withDelay(
      delay,
      withSequence(
        withSpring(0.7),
        withSpring(1)
      )
    );
  }, []);

  const bubbleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const getBackgroundColor = () => {
    const alpha = 1 - (index * 0.07);
    return `rgba(184, 92, 56, ${alpha})`; // Your accent color with varying opacity
  };

  return (
    <View style={styles.itemContainer}>
      <Animated.View style={[styles.bubbleContainer, bubbleStyle]}>
        <View style={styles.progressRing}>
          <View 
            style={[
              styles.progressIndicator, 
              { 
                backgroundColor: colors.accent,
                width: `${progress * 100}%`
              }
            ]} 
          />
          <Pressable
            style={[
              styles.bubble,
              { backgroundColor: getBackgroundColor() }
            ]}
            onPress={() => onPress(category.id)}
          >
            <Text style={styles.bubbleNumber}>{index + 1}</Text>
            <Text style={styles.bubbleTitle} numberOfLines={3}>
              {category.title}
            </Text>
            <Circle size={24} color="#FFFFFF" style={styles.bubbleIcon} />
          </Pressable>
        </View>
      </Animated.View>

      {!isLast && (
        <View 
          style={[
            styles.connector,
            { backgroundColor: colors.border }
          ]} 
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  itemContainer: {
    alignItems: 'center',
    marginBottom: CONNECTOR_LENGTH,
  },
  bubbleContainer: {
    width: BUBBLE_SIZE,
    height: BUBBLE_SIZE,
    marginBottom: 8,
  },
  progressRing: {
    width: '100%',
    height: '100%',
    borderRadius: BUBBLE_SIZE / 2,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 4,
    overflow: 'hidden',
  },
  progressIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    borderRadius: BUBBLE_SIZE / 2,
    opacity: 0.3,
  },
  bubble: {
    width: '100%',
    height: '100%',
    borderRadius: BUBBLE_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  bubbleNumber: {
    color: '#FFFFFF',
    fontSize: 24,
    fontFamily: 'SpaceGrotesk-Bold',
    marginBottom: 4,
  },
  bubbleTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'DMSans-Medium',
    textAlign: 'center',
  },
  bubbleIcon: {
    position: 'absolute',
    bottom: 16,
    opacity: 0.5,
  },
  connector: {
    width: CONNECTOR_WIDTH,
    height: CONNECTOR_LENGTH,
  },
});