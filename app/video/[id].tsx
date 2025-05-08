import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Platform,
  Pressable,
  ActivityIndicator,
  Dimensions,
  Keyboard
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Video, AVPlaybackStatus, ResizeMode } from 'expo-av';
import { ArrowLeft, ChevronUp, ChevronDown, MessageCircle } from 'lucide-react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate
} from 'react-native-reanimated';
import ChatBubble from '@/components/ChatBubble';
import ChatInput from '@/components/ChatInput';
import VideoControls from '@/components/VideoControls';
import { getVideoById } from '@/data/categories';
import useChat from '@/hooks/useChat';
import Colors from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');
const EXPANDED_VIDEO_HEIGHT = SCREEN_HEIGHT * 0.35;
const COLLAPSED_VIDEO_HEIGHT = SCREEN_HEIGHT * 0.15;

export default function VideoDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const videoId = Array.isArray(id) ? id[0] : id;
  const video = getVideoById(videoId || '');
  
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  
  const videoRef = useRef<Video>(null);
  const chatScrollViewRef = useRef<ScrollView>(null);
  const [playbackStatus, setPlaybackStatus] = useState<AVPlaybackStatus>({} as AVPlaybackStatus);
  const { messages, sendMessage, isThinking } = useChat(videoId || '');
  
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const videoHeight = useSharedValue(EXPANDED_VIDEO_HEIGHT);
  
  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
        setIsKeyboardVisible(true);
        videoHeight.value = withSpring(COLLAPSED_VIDEO_HEIGHT);
      }
    );

    const keyboardWillHide = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
        setIsKeyboardVisible(false);
        videoHeight.value = withSpring(EXPANDED_VIDEO_HEIGHT);
      }
    );

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, []);

  const animatedVideoStyle = useAnimatedStyle(() => ({
    height: videoHeight.value,
  }));

  const handleVideoPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    setPlaybackStatus(status);
  };

  const togglePlayback = () => {
    if (videoRef.current) {
      if (playbackStatus.isLoaded && playbackStatus.isPlaying) {
        videoRef.current.pauseAsync();
      } else {
        videoRef.current.playAsync();
      }
    }
  };

  const seekBack = () => {
    if (videoRef.current && playbackStatus.isLoaded) {
      const newPosition = Math.max(0, playbackStatus.positionMillis - 10000);
      videoRef.current.setPositionAsync(newPosition);
    }
  };

  const seekForward = () => {
    if (videoRef.current && playbackStatus.isLoaded) {
      const durationMillis = playbackStatus.durationMillis || 0;
      const newPosition = Math.min(durationMillis, playbackStatus.positionMillis + 10000);
      videoRef.current.setPositionAsync(newPosition);
    }
  };

  const handleSendMessage = (message: string) => {
    sendMessage(message);
    setTimeout(() => {
      chatScrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleNavigateBack = () => {
    router.back();
  };

  if (!video) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.error }]}>Video not found</Text>
        <Pressable
          style={[styles.backButton, { backgroundColor: colors.accent }]}
          onPress={handleNavigateBack}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.card }]}>
        <Pressable onPress={handleNavigateBack} style={styles.backButton}>
          <ArrowLeft color={colors.text} size={24} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.text }]} numberOfLines={1}>
          {video.title}
        </Text>
        <View style={styles.spacer} />
      </View>
      
      <Animated.View style={[styles.videoContainer, animatedVideoStyle]}>
        <Video
          ref={videoRef}
          style={styles.video}
          source={{ uri: video.videoUrl }}
          resizeMode={ResizeMode.CONTAIN}
          onPlaybackStatusUpdate={handleVideoPlaybackStatusUpdate}
          useNativeControls={false}
        />
        
        {!isKeyboardVisible && (
          <VideoControls
            playbackStatus={playbackStatus}
            onTogglePlayback={togglePlayback}
            onSeekBack={seekBack}
            onSeekForward={seekForward}
          />
        )}
      </Animated.View>
      
      <View style={[styles.chatContainer, { flex: 1 }]}>
        <Pressable
          style={[styles.chatHeader, { backgroundColor: colors.accent }]}
          onPress={() => Keyboard.dismiss()}
        >
          <MessageCircle color="#FFFFFF" size={18} />
          <Text style={styles.chatHeaderText}>Ask About This Lesson</Text>
          {isKeyboardVisible ? (
            <ChevronDown color="#FFFFFF" size={20} />
          ) : (
            <ChevronUp color="#FFFFFF" size={20} />
          )}
        </Pressable>
        
        <ScrollView
          ref={chatScrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          onContentSizeChange={() => chatScrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.length === 0 ? (
            <Text style={[styles.chatPrompt, { color: colors.secondary }]}>
              Ask a question about this lesson. Your mentor will provide personalized guidance.
            </Text>
          ) : (
            messages.map((message, index) => (
              <ChatBubble
                key={message.id}
                message={message.text}
                type={message.type}
                showAvatar={index === 0 || 
                  (messages[index - 1] && messages[index - 1].type !== 'mentor')}
              />
            ))
          )}
          
          {isThinking && (
            <View style={styles.thinkingContainer}>
              <View style={[styles.thinkingBubble, { backgroundColor: colors.mentorBubble }]}>
                <ActivityIndicator size="small" color="#FFFFFF" />
              </View>
            </View>
          )}
        </ScrollView>
        
        <ChatInput onSend={handleSendMessage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 18,
    marginLeft: 8,
  },
  spacer: {
    width: 40,
  },
  videoContainer: {
    width: '100%',
    backgroundColor: '#000',
  },
  video: {
    flex: 1,
  },
  chatContainer: {
    backgroundColor: 'transparent',
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  chatHeaderText: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 16,
    color: '#FFFFFF',
    marginHorizontal: 8,
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 8,
  },
  chatPrompt: {
    fontFamily: 'DMSans-Regular',
    fontSize: 16,
    textAlign: 'center',
    padding: 16,
  },
  thinkingContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  thinkingBubble: {
    padding: 12,
    borderRadius: 16,
    borderTopLeftRadius: 4,
    minWidth: 60,
    alignItems: 'center',
  },
  errorText: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 40,
  },
  backButtonText: {
    fontFamily: 'DMSans-Medium',
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});