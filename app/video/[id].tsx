import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Video, AVPlaybackStatus, ResizeMode } from 'expo-av';
import { ArrowLeft, ChevronUp, ChevronDown, MessageCircle } from 'lucide-react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing
} from 'react-native-reanimated';
import ChatBubble from '@/components/ChatBubble';
import ChatInput from '@/components/ChatInput';
import VideoControls from '@/components/VideoControls';
import { getVideoById, getNextVideo, getPreviousVideo } from '@/data/videos';
import useChat from '@/hooks/useChat';
import Colors from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';

// Define a constant for the minimum expanded chat height
const MIN_CHAT_HEIGHT = 200;
const screenHeight = Dimensions.get('window').height;
const initialChatHeight = screenHeight * 0.3; // 30% of screen height

export default function VideoDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const videoId = Array.isArray(id) ? id[0] : id;
  const video = getVideoById(videoId || '');
  const nextVideo = getNextVideo(videoId || '');
  const previousVideo = getPreviousVideo(videoId || '');
  
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  
  const videoRef = useRef<Video>(null);
  const chatScrollViewRef = useRef<ScrollView>(null);
  const [playbackStatus, setPlaybackStatus] = useState<AVPlaybackStatus>({} as AVPlaybackStatus);
  const [showTranscript, setShowTranscript] = useState(false);
  const { messages, sendMessage, isThinking } = useChat(videoId || '');
  
  // Chat panel animation
  const chatHeight = useSharedValue(initialChatHeight);
  const isDragging = useSharedValue(false);
  const startY = useSharedValue(0);
  
  const animatedChatStyle = useAnimatedStyle(() => {
    return {
      height: chatHeight.value,
    };
  });
  
  const handleExpandChat = () => {
    const newHeight = chatHeight.value > initialChatHeight
      ? initialChatHeight
      : screenHeight * 0.6; // 60% when expanded
      
    chatHeight.value = withSpring(newHeight, {
      damping: 20,
      stiffness: 90
    });
  };

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
      const newPosition = Math.max(0, playbackStatus.positionMillis - 10000); // Back 10 seconds
      videoRef.current.setPositionAsync(newPosition);
    }
  };

  const seekForward = () => {
    if (videoRef.current && playbackStatus.isLoaded) {
      const durationMillis = playbackStatus.durationMillis || 0;
      const newPosition = Math.min(durationMillis, playbackStatus.positionMillis + 10000); // Forward 10 seconds
      videoRef.current.setPositionAsync(newPosition);
    }
  };

  const handleSendMessage = (message: string) => {
    sendMessage(message);
    
    // Scroll to bottom after sending
    setTimeout(() => {
      chatScrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleNavigateBack = () => {
    router.back();
  };

  const handleNavigateToVideo = (targetVideoId: string) => {
    router.replace(`/video/${targetVideoId}`);
  };

  // Handle video completion
  useEffect(() => {
    if (
      playbackStatus.isLoaded &&
      playbackStatus.didJustFinish &&
      !playbackStatus.isLooping
    ) {
      // Mark video as completed
      // In a real app, this would update the user's progress in state/database
      console.log('Video completed:', videoId);
      
      // Could show a completion message or auto-navigate to next video
    }
  }, [playbackStatus, videoId]);

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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 0}
    >
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: colors.card }]}>
          <Pressable 
            style={styles.backButton} 
            onPress={handleNavigateBack}
          >
            <ArrowLeft color={colors.text} size={24} />
          </Pressable>
          <Text 
            style={[styles.headerTitle, { color: colors.text }]}
            numberOfLines={1}
          >
            {video.title}
          </Text>
          <View style={styles.spacer} />
        </View>
        
        {/* Video Player */}
        <View style={styles.videoContainer}>
          <Video
            ref={videoRef}
            style={styles.video}
            source={{ uri: video.videoUrl }}
            resizeMode={ResizeMode.CONTAIN}
            onPlaybackStatusUpdate={handleVideoPlaybackStatusUpdate}
            useNativeControls={false}
          />
        </View>
        
        {/* Video Controls */}
        <VideoControls
          playbackStatus={playbackStatus}
          onTogglePlayback={togglePlayback}
          onSeekBack={seekBack}
          onSeekForward={seekForward}
        />
        
        {/* Navigation buttons */}
        <View style={styles.navigationButtons}>
          <Pressable
            style={[
              styles.navButton,
              { backgroundColor: colors.card, opacity: previousVideo ? 1 : 0.5 }
            ]}
            onPress={() => previousVideo && handleNavigateToVideo(previousVideo.id)}
            disabled={!previousVideo}
          >
            <Text style={[styles.navButtonText, { color: colors.text }]}>
              Previous Lesson
            </Text>
          </Pressable>
          
          <Pressable
            style={[
              styles.navButton,
              { backgroundColor: colors.card, opacity: nextVideo ? 1 : 0.5 }
            ]}
            onPress={() => nextVideo && handleNavigateToVideo(nextVideo.id)}
            disabled={!nextVideo}
          >
            <Text style={[styles.navButtonText, { color: colors.text }]}>
              Next Lesson
            </Text>
          </Pressable>
        </View>
        
        {/* Transcript */}
        <Pressable 
          style={[styles.transcriptHeader, { backgroundColor: colors.card }]}
          onPress={() => setShowTranscript(!showTranscript)}
        >
          <Text style={[styles.transcriptTitle, { color: colors.text }]}>
            Transcript
          </Text>
          {showTranscript ? (
            <ChevronUp color={colors.text} size={20} />
          ) : (
            <ChevronDown color={colors.text} size={20} />
          )}
        </Pressable>
        
        {showTranscript && (
          <ScrollView 
            style={[styles.transcriptContainer, { backgroundColor: colors.card }]}
            contentContainerStyle={styles.transcriptContent}
          >
            <Text style={[styles.transcriptText, { color: colors.text }]}>
              {video.transcript}
            </Text>
          </ScrollView>
        )}
        
        {/* Chat Section */}
        <Pressable
          style={[styles.chatHeader, { backgroundColor: colors.accent }]}
          onPress={handleExpandChat}
        >
          <MessageCircle color="#FFFFFF" size={18} />
          <Text style={styles.chatHeaderText}>Ask About This Lesson</Text>
          {chatHeight.value > initialChatHeight ? (
            <ChevronDown color="#FFFFFF" size={20} />
          ) : (
            <ChevronUp color="#FFFFFF" size={20} />
          )}
        </Pressable>
        
        <Animated.View 
          style={[
            styles.chatContainer, 
            { backgroundColor: colors.card },
            animatedChatStyle
          ]}
        >
          <ScrollView
            ref={chatScrollViewRef}
            style={styles.messagesContainer}
            contentContainerStyle={styles.messagesContent}
            onContentSizeChange={() => 
              chatScrollViewRef.current?.scrollToEnd({ animated: true })
            }
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
                  showAvatar={
                    index === 0 || 
                    (messages[index - 1] && messages[index - 1].type !== 'mentor')
                  }
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
          
          <ChatInput 
            onSend={handleSendMessage} 
            placeholder="Ask about this lesson..."
          />
        </Animated.View>
      </View>
    </KeyboardAvoidingView>
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
    aspectRatio: 16 / 9,
    width: '100%',
    backgroundColor: '#000',
  },
  video: {
    flex: 1,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  navButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    minWidth: '45%',
    alignItems: 'center',
  },
  navButtonText: {
    fontFamily: 'DMSans-Medium',
    fontSize: 14,
  },
  transcriptHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 8,
  },
  transcriptTitle: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 16,
  },
  transcriptContainer: {
    maxHeight: 120,
  },
  transcriptContent: {
    padding: 16,
    paddingTop: 0,
  },
  transcriptText: {
    fontFamily: 'DMSans-Regular',
    fontSize: 15,
    lineHeight: 22,
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    marginTop: 8,
  },
  chatHeaderText: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 16,
    color: '#FFFFFF',
    marginHorizontal: 8,
  },
  chatContainer: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  messagesContainer: {
    flex: 1,
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