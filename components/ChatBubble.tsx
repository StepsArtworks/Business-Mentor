import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';
import MentorAvatar from './MentorAvatar';

export type MessageType = 'user' | 'mentor';

type ChatBubbleProps = {
  message: string;
  type: MessageType;
  showAvatar?: boolean;
};

export default function ChatBubble({ message, type, showAvatar = true }: ChatBubbleProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  return (
    <View style={[
      styles.container,
      type === 'user' ? styles.userContainer : styles.mentorContainer
    ]}>
      {type === 'mentor' && showAvatar && (
        <View style={styles.avatarContainer}>
          <MentorAvatar size={36} showBorder={false} />
        </View>
      )}
      <View style={[
        styles.bubble,
        type === 'user' 
          ? [styles.userBubble, { backgroundColor: colors.userBubble }] 
          : [styles.mentorBubble, { backgroundColor: colors.mentorBubble }]
      ]}>
        <Text style={[
          styles.text,
          type === 'user' 
            ? { color: colors.userText }
            : { color: colors.mentorText }
        ]}>
          {message}
        </Text>
      </View>
      {type === 'user' && <View style={styles.spacer} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 8,
    paddingHorizontal: 16,
    maxWidth: '100%',
  },
  userContainer: {
    justifyContent: 'flex-end',
  },
  mentorContainer: {
    justifyContent: 'flex-start',
  },
  bubble: {
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxWidth: '80%',
  },
  userBubble: {
    borderTopRightRadius: 4,
    marginLeft: 'auto',
  },
  mentorBubble: {
    borderTopLeftRadius: 4,
    marginRight: 'auto',
  },
  text: {
    fontSize: 16,
    fontFamily: 'DMSans-Regular',
    lineHeight: 22,
  },
  avatarContainer: {
    marginRight: 8,
    alignSelf: 'flex-end',
    marginBottom: 4,
  },
  spacer: {
    width: 44, // To balance the avatar space
  }
});