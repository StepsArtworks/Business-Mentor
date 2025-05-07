import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, SIZES } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics';

// Video data structure
interface Video {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  views: string;
}

// Sample videos data
const videosData: Video[] = [
  {
    id: '1',
    title: 'Can You Start a Business with Little to No Money?',
    duration: '12:34',
    thumbnail: 'https://images.pexels.com/photos/3182781/pexels-photo-3182781.jpeg',
    views: '2.3K views',
  },
  {
    id: '2',
    title: 'Finding Your First Customers Without a Marketing Budget',
    duration: '15:21',
    thumbnail: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg',
    views: '1.8K views',
  },
  {
    id: '3',
    title: 'How to Validate Your Business Idea for Free',
    duration: '18:45',
    thumbnail: 'https://images.pexels.com/photos/3182833/pexels-photo-3182833.jpeg',
    views: '3.5K views',
  },
  {
    id: '4',
    title: 'Building a Minimum Viable Product on a Shoestring',
    duration: '22:10',
    thumbnail: 'https://images.pexels.com/photos/3182744/pexels-photo-3182744.jpeg',
    views: '1.2K views',
  },
  {
    id: '5',
    title: 'Negotiation Tactics for New Entrepreneurs',
    duration: '14:30',
    thumbnail: 'https://images.pexels.com/photos/3182759/pexels-photo-3182759.jpeg',
    views: '2.1K views',
  },
  {
    id: '6',
    title: 'Finding Free Resources to Grow Your Business',
    duration: '19:15',
    thumbnail: 'https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg',
    views: '1.7K views',
  },
];

export default function VideosScreen() {
  const handleVideoPress = (video: Video) => {
    // Provide haptic feedback on iOS/Android
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    // Navigate to video player
    // router.push(`/videos/${video.id}`);
  };

  const renderVideoItem = ({ item }: { item: Video }) => (
    <TouchableOpacity 
      style={styles.videoCard}
      onPress={() => handleVideoPress(item)}
      activeOpacity={0.8}
    >
      <View style={styles.thumbnailContainer}>
        <Image 
          source={{ uri: item.thumbnail }}
          style={styles.thumbnail}
          resizeMode="cover"
        />
        <View style={styles.playButtonOverlay}>
          <View style={styles.playButton}>
            <View style={styles.playIcon} />
          </View>
        </View>
        <Text style={styles.duration}>{item.duration}</Text>
      </View>
      
      <View style={styles.videoInfo}>
        <Text style={styles.videoTitle}>{item.title}</Text>
        <Text style={styles.videoStats}>{item.views}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient 
      colors={[COLORS.gradientStart, COLORS.gradientEnd]} 
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Videos</Text>
        </View>
        
        <FlatList
          data={videosData}
          renderItem={renderVideoItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.videosList}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    padding: SIZES.m,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.divider,
  },
  headerTitle: {
    ...FONTS.heading,
    fontSize: SIZES.large,
    color: COLORS.text,
    textAlign: 'center',
  },
  videosList: {
    padding: SIZES.m,
    paddingBottom: 100, // Extra space for tab bar
  },
  videoCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: SIZES.borderRadius,
    overflow: 'hidden',
    marginBottom: SIZES.m,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  thumbnailContainer: {
    position: 'relative',
    height: 200,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  playButtonOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderLeftWidth: 20,
    borderTopWidth: 15,
    borderBottomWidth: 15,
    borderLeftColor: COLORS.primary,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    marginLeft: 5,
  },
  duration: {
    position: 'absolute',
    bottom: SIZES.xs,
    right: SIZES.xs,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: SIZES.xs,
    paddingVertical: 2,
    borderRadius: 4,
    ...FONTS.body,
    fontSize: SIZES.xSmall,
    color: COLORS.text,
  },
  videoInfo: {
    padding: SIZES.m,
  },
  videoTitle: {
    ...FONTS.bodyMedium,
    fontSize: SIZES.medium,
    color: COLORS.text,
    marginBottom: SIZES.xs,
  },
  videoStats: {
    ...FONTS.body,
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
  },
});