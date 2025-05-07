import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { mentorAvatarUrl } from '@/assets/images/avatar';

type MentorAvatarProps = {
  size?: number;
  showBorder?: boolean;
};

export default function MentorAvatar({ size = 80, showBorder = true }: MentorAvatarProps) {
  return (
    <View style={[
      styles.container,
      showBorder && styles.border,
      { width: size, height: size, borderRadius: size / 2 }
    ]}>
      <Image
        source={{ uri: mentorAvatarUrl }}
        style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: '#D9D9D9',
  },
  border: {
    borderWidth: 2,
    borderColor: '#B85C38',
  },
  avatar: {
    resizeMode: 'cover',
  },
});