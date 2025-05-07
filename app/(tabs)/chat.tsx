import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { MessageCircle } from 'lucide-react-native';
import ChatBubble from '@/components/ChatBubble';
import ChatInput from '@/components/ChatInput';
import MentorAvatar from '@/components/MentorAvatar';
import useChat from '@/hooks/useChat';
import Colors from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';

export default function ChatScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const scrollViewRef = useRef<ScrollView>(null);
  
  // For general chat, we're using 'general' as the videoId
  const { messages, sendMessage, isThinking } = useChat('general');

  const handleSend = (message: string) => {
    sendMessage(message);
    
    // Scroll to bottom after sending
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 0}
    >
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {messages.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <MentorAvatar size={120} />
            <Text style={[styles.emptyStateTitle, { color: colors.text }]}>
              Ask Your Mentor
            </Text>
            <Text style={[styles.emptyStateDescription, { color: colors.secondary }]}>
              Your mentor is ready to answer your business questions. Ask anything about starting or growing a business with limited resources.
            </Text>
            <View style={[styles.exampleContainer, { backgroundColor: colors.card }]}>
              <Text style={[styles.exampleTitle, { color: colors.text }]}>
                Example Questions:
              </Text>
              <View style={styles.exampleBubble}>
                <MessageCircle size={16} color={colors.accent} />
                <Text style={[styles.exampleText, { color: colors.text }]}>
                  How do I find my first customers?
                </Text>
              </View>
              <View style={styles.exampleBubble}>
                <MessageCircle size={16} color={colors.accent} />
                <Text style={[styles.exampleText, { color: colors.text }]}>
                  What business can I start with less than $100?
                </Text>
              </View>
              <View style={styles.exampleBubble}>
                <MessageCircle size={16} color={colors.accent} />
                <Text style={[styles.exampleText, { color: colors.text }]}>
                  How do I compete with bigger companies?
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <ScrollView
            ref={scrollViewRef}
            style={styles.chatContainer}
            contentContainerStyle={styles.chatContent}
            onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
          >
            {messages.map((message, index) => (
              <ChatBubble
                key={message.id}
                message={message.text}
                type={message.type}
                showAvatar={index === 0 || 
                  (messages[index - 1] && messages[index - 1].type !== 'mentor')}
              />
            ))}
            
            {isThinking && (
              <View style={styles.thinkingContainer}>
                <MentorAvatar size={36} showBorder={false} />
                <View style={[styles.thinkingBubble, { backgroundColor: colors.mentorBubble }]}>
                  <ActivityIndicator size="small" color="#FFFFFF" />
                </View>
              </View>
            )}
          </ScrollView>
        )}

        <ChatInput onSend={handleSend} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyStateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyStateTitle: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 24,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateDescription: {
    fontFamily: 'DMSans-Regular',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  exampleContainer: {
    width: '100%',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  exampleTitle: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 16,
    marginBottom: 12,
  },
  exampleBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  exampleText: {
    fontFamily: 'DMSans-Regular',
    fontSize: 15,
    marginLeft: 8,
  },
  chatContainer: {
    flex: 1,
  },
  chatContent: {
    paddingVertical: 16,
  },
  thinkingContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginHorizontal: a16,
    marginVertical: 8,
  },
  thinkingBubble: {
    marginLeft: 8,
    padding: 12,
    borderRadius: 16,
    borderTopLeftRadius: 4,
    minWidth: 60,
    alignItems: 'center',
  },
});