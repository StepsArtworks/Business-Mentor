import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, SIZES } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Lock, CircleCheck as CheckCircle, Circle } from 'lucide-react-native';

// Lesson data structure
interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string; // e.g., "15 min"
  status: 'completed' | 'in-progress' | 'locked';
}

// Sample lessons data
const lessonsData: Lesson[] = [
  {
    id: '1',
    title: 'Starting with Zero',
    description: 'Learn how to start a business with minimal capital investment',
    duration: '15 min',
    status: 'in-progress',
  },
  {
    id: '2',
    title: 'Finding Your Niche',
    description: 'Discover what makes your business unique in the marketplace',
    duration: '12 min',
    status: 'completed',
  },
  {
    id: '3',
    title: 'First Customers',
    description: 'Strategies to acquire your initial customer base',
    duration: '18 min',
    status: 'locked',
  },
  {
    id: '4',
    title: 'Building Without Budget',
    description: 'Creative ways to build products with minimal resources',
    duration: '20 min',
    status: 'locked',
  },
  {
    id: '5',
    title: 'Leveraging Social Media',
    description: 'Use free platforms to reach your target audience',
    duration: '16 min',
    status: 'locked',
  },
  {
    id: '6',
    title: 'Bootstrapping Fundamentals',
    description: 'Growing your business using its own revenue',
    duration: '22 min',
    status: 'locked',
  },
];

export default function LessonsScreen() {
  const handleLessonPress = (lesson: Lesson) => {
    // Skip locked lessons
    if (lesson.status === 'locked') return;
    
    // Provide haptic feedback on iOS/Android
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    // Navigate to lesson detail
    // router.push(`/lessons/${lesson.id}`);
  };

  const renderStatusIcon = (status: Lesson['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={22} color={COLORS.success} />;
      case 'in-progress':
        return <Circle size={22} color={COLORS.primary} />;
      case 'locked':
        return <Lock size={22} color={COLORS.textMuted} />;
    }
  };

  const renderLessonItem = ({ item }: { item: Lesson }) => (
    <TouchableOpacity 
      style={[
        styles.lessonCard,
        item.status === 'locked' && styles.lessonCardLocked
      ]}
      onPress={() => handleLessonPress(item)}
      activeOpacity={item.status === 'locked' ? 0.6 : 0.8}
    >
      <View style={styles.lessonInfo}>
        <Text style={styles.lessonTitle}>{item.title}</Text>
        <Text style={styles.lessonDescription}>{item.description}</Text>
        <View style={styles.lessonMeta}>
          <Text style={styles.lessonDuration}>{item.duration}</Text>
        </View>
      </View>
      <View style={styles.lessonStatus}>
        {renderStatusIcon(item.status)}
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
          <Text style={styles.headerTitle}>Lessons</Text>
        </View>
        
        <FlatList
          data={lessonsData}
          renderItem={renderLessonItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.lessonsList}
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
  lessonsList: {
    padding: SIZES.m,
    paddingBottom: 100, // Extra space for tab bar
  },
  lessonCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: SIZES.borderRadius,
    padding: SIZES.m,
    marginBottom: SIZES.m,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  lessonCardLocked: {
    opacity: 0.7,
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    ...FONTS.bodyBold,
    fontSize: SIZES.large,
    color: COLORS.text,
    marginBottom: SIZES.xs,
  },
  lessonDescription: {
    ...FONTS.body,
    fontSize: SIZES.medium,
    color: COLORS.textSecondary,
    marginBottom: SIZES.s,
  },
  lessonMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lessonDuration: {
    ...FONTS.body,
    fontSize: SIZES.small,
    color: COLORS.textMuted,
  },
  lessonStatus: {
    marginLeft: SIZES.m,
  },
});