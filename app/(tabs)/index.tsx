import React from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { router } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import MentorAvatar from '@/components/MentorAvatar';
import VideoCard from '@/components/VideoCard';
import { videos } from '@/data/videos';
import Colors from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  
  // Only take the first 2 videos for the home screen
  const featuredVideos = videos.slice(0, 2);
  
  const handleContinueJourney = () => {
    // Find the first non-completed video
    const nextVideo = videos.find(v => !v.isCompleted);
    if (nextVideo) {
      router.push(`/video/${nextVideo.id}`);
    } else {
      router.push('/videos');
    }
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.welcomeContainer}>
        <MentorAvatar size={100} />
        <View style={styles.welcomeTextContainer}>
          <Text style={[styles.welcomeTitle, { color: colors.text }]}>
            Welcome back
          </Text>
          <Text style={[styles.welcomeSubtitle, { color: colors.secondary }]}>
            Ready to continue your business journey?
          </Text>
        </View>
      </View>
      
      <Pressable 
        style={[styles.continueButton, { backgroundColor: colors.accent }]}
        onPress={handleContinueJourney}
      >
        <Text style={styles.continueButtonText}>Continue Your Journey</Text>
        <ArrowRight color="#FFFFFF" size={18} />
      </Pressable>
      
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Featured Videos
          </Text>
          <Pressable onPress={() => router.push('/videos')}>
            <Text style={[styles.seeAllText, { color: colors.accent }]}>
              See All
            </Text>
          </Pressable>
        </View>
        
        {featuredVideos.map(video => (
          <VideoCard key={video.id} video={video} />
        ))}
      </View>
      
      <View style={styles.quoteContainer}>
        <Text style={[styles.quoteText, { color: colors.text }]}>
          "Success isn't about having money to start. It's about having the guts to begin with whatever you've got."
        </Text>
        <Text style={[styles.quoteName, { color: colors.secondary }]}>
          Your Mentor
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  welcomeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  welcomeTextContainer: {
    marginLeft: 16,
    flex: 1,
  },
  welcomeTitle: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 24,
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontFamily: 'DMSans-Regular',
    fontSize: 16,
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    marginVertical: 16,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 16,
    marginRight: 8,
  },
  sectionContainer: {
    marginVertical: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 20,
  },
  seeAllText: {
    fontFamily: 'DMSans-Medium',
    fontSize: 14,
  },
  quoteContainer: {
    marginTop: 24,
    paddingVertical: 24,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#B85C38',
    backgroundColor: 'rgba(184, 92, 56, 0.05)',
  },
  quoteText: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 18,
    lineHeight: 26,
    marginBottom: 12,
    fontStyle: 'italic',
  },
  quoteName: {
    fontFamily: 'DMSans-Medium',
    fontSize: 14,
    textAlign: 'right',
  },
});