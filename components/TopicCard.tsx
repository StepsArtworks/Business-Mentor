import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTS, SIZES } from '@/constants/Colors';

interface TopicCardProps {
  title: string;
  description: string;
  progress: number; // 0 to 1
  onPress: () => void;
}

const TopicCard: React.FC<TopicCardProps> = ({ 
  title, 
  description, 
  progress, 
  onPress 
}) => {
  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressBackground}>
            <View 
              style={[
                styles.progressFill,
                { width: `${progress * 100}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>
            {progress > 0 
              ? `${Math.round(progress * 100)}% complete` 
              : 'Not started'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 240,
    height: 160,
    marginRight: SIZES.m,
    backgroundColor: COLORS.cardBackground,
    borderRadius: SIZES.borderRadius,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  content: {
    flex: 1,
    padding: SIZES.m,
    justifyContent: 'space-between',
  },
  title: {
    ...FONTS.bodyBold,
    fontSize: SIZES.large,
    color: COLORS.text,
    marginBottom: SIZES.xs,
  },
  description: {
    ...FONTS.body,
    fontSize: SIZES.medium,
    color: COLORS.textSecondary,
    marginBottom: SIZES.m,
  },
  progressContainer: {
    marginTop: 'auto',
  },
  progressBackground: {
    height: 4,
    backgroundColor: COLORS.backgroundDark,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
  },
  progressText: {
    ...FONTS.body,
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    marginTop: SIZES.xs,
  },
});

export default TopicCard;