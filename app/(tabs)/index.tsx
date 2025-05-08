import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import MentorAvatar from '@/components/MentorAvatar';
import BubbleTimeline from '@/components/BubbleTimeline';
import Colors from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';

const categories = [
  {
    id: 'entrepreneurship',
    title: 'Entrepreneurship & Small Business Tips',
    description: 'Essential knowledge for starting and growing your business.'
  },
  {
    id: 'productivity',
    title: 'Productivity & Time Management',
    description: 'Maximize your efficiency and get more done.'
  },
  {
    id: 'marketing',
    title: 'Marketing & Branding',
    description: 'Build a strong brand and attract customers.'
  },
  {
    id: 'finance',
    title: 'Finance & Money Management',
    description: 'Master your business finances.'
  },
  {
    id: 'leadership',
    title: 'Leadership & Management',
    description: 'Develop essential leadership skills.'
  },
  {
    id: 'ai',
    title: 'AI in Business',
    description: 'Leverage AI for business growth.'
  },
  {
    id: 'tech',
    title: 'Tech & Tools for Business',
    description: 'Essential tools for modern business.'
  },
  {
    id: 'customer',
    title: 'Customer Experience & Retention',
    description: 'Build lasting customer relationships.'
  },
  {
    id: 'trends',
    title: 'Business Trends & Innovations',
    description: 'Stay ahead of industry changes.'
  },
  {
    id: 'growth',
    title: 'Personal Growth & Motivation',
    description: 'Develop your entrepreneurial mindset.'
  }
];

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.card }]}>
        <View style={styles.welcomeContainer}>
          <MentorAvatar size={80} />
          <View style={styles.welcomeTextContainer}>
            <Text style={[styles.welcomeTitle, { color: colors.text }]}>
              Welcome back
            </Text>
            <Text style={[styles.welcomeSubtitle, { color: colors.secondary }]}>
              What would you like to learn today?
            </Text>
          </View>
        </View>
      </View>

      <BubbleTimeline categories={categories} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  welcomeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
});