import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, SIZES } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowUp } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

// Message type definition
interface Message {
  id: string;
  text: string;
  isMentor: boolean;
  timestamp: Date;
}

// Sample initial messages
const initialMessages: Message[] = [
  {
    id: '1',
    text: "So, you're looking for some business advice, eh? What's on your mind?",
    isMentor: true,
    timestamp: new Date(Date.now() - 60000),
  },
];

// Sample responses based on keywords
const mentorResponses: Record<string, string> = {
  'money': "Listen here, kid. Money ain't the problem. It's your mindset. You don't need a fortune, just enough to get started. Bootstrap, barter, borrow if you must, but don't let lack of cash be your excuse. The hungrier you are, the more creative you'll get. That's business 101.",
  'idea': "Ideas are a dime a dozen. Execution is everything. Don't waste time perfecting your idea in a vacuum. Get it out there, test it, fail fast, learn faster. A mediocre idea with brilliant execution beats a brilliant idea with mediocre execution every single time.",
  'customer': "Your first customers are gold. Treat 'em like royalty. Don't chase numbers, chase relationships. One satisfied customer who sings your praises is worth more than a thousand lukewarm ones. Focus on solving real problems, and word will spread.",
  'marketing': "Forget fancy marketing if you're just starting out. Talk to people. Solve problems. The best marketing is a product so good people can't shut up about it. Everything else is just noise until you've got that right.",
};

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const handleSend = () => {
    if (inputText.trim() === '') return;
    
    // Provide haptic feedback on iOS/Android
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isMentor: false,
      timestamp: new Date(),
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputText('');
    
    // Simulate typing indicator by waiting
    setTimeout(() => {
      // Generate mentor response based on keywords or default
      let mentorReply = "Hmm, interesting question. Let me think on that for a moment... The key is to stay focused and keep moving forward. What specific challenge are you facing?";
      
      // Check for keywords in user input
      const lowerInput = inputText.toLowerCase();
      Object.keys(mentorResponses).forEach(keyword => {
        if (lowerInput.includes(keyword)) {
          mentorReply = mentorResponses[keyword];
        }
      });
      
      // Add mentor response
      const mentorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: mentorReply,
        isMentor: true,
        timestamp: new Date(),
      };
      
      setMessages(prevMessages => [...prevMessages, mentorMessage]);
      
      // Scroll to the bottom
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }, 1500);
    
    // Scroll to bottom after user message
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[
      styles.messageBubble,
      item.isMentor ? styles.mentorBubble : styles.userBubble
    ]}>
      {item.isMentor && (
        <Image 
          source={require('@/assets/images/mentor.jpg')}
          style={styles.mentorAvatar}
        />
      )}
      <View style={[
        styles.messageContent,
        item.isMentor ? styles.mentorContent : styles.userContent
      ]}>
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.timestamp}>
          {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    </View>
  );

  return (
    <LinearGradient 
      colors={[COLORS.gradientStart, COLORS.gradientEnd]} 
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Ask The Mentor</Text>
        </View>
        
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.keyboardAvoid}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.messageList}
            showsVerticalScrollIndicator={false}
          />
          
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Ask a question..."
              placeholderTextColor={COLORS.textMuted}
              value={inputText}
              onChangeText={setInputText}
              multiline
            />
            <TouchableOpacity 
              style={[
                styles.sendButton,
                !inputText.trim() && styles.sendButtonDisabled
              ]}
              onPress={handleSend}
              disabled={!inputText.trim()}
            >
              <ArrowUp size={20} color={!inputText.trim() ? COLORS.textMuted : COLORS.backgroundDark} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
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
  keyboardAvoid: {
    flex: 1,
  },
  messageList: {
    paddingHorizontal: SIZES.m,
    paddingTop: SIZES.m,
    paddingBottom: SIZES.xl,
  },
  messageBubble: {
    marginBottom: SIZES.m,
    maxWidth: '80%',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  mentorBubble: {
    alignSelf: 'flex-start',
  },
  userBubble: {
    alignSelf: 'flex-end',
    flexDirection: 'row-reverse',
  },
  mentorAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: SIZES.xs,
  },
  messageContent: {
    borderRadius: SIZES.borderRadius,
    padding: SIZES.m,
    paddingBottom: SIZES.s,
  },
  mentorContent: {
    backgroundColor: COLORS.cardBackground,
  },
  userContent: {
    backgroundColor: COLORS.primary,
  },
  messageText: {
    ...FONTS.body,
    fontSize: SIZES.medium,
    color: COLORS.text,
    lineHeight: 20,
  },
  timestamp: {
    ...FONTS.body,
    fontSize: SIZES.xSmall,
    color: COLORS.textMuted,
    marginTop: SIZES.xs,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.m,
    paddingVertical: SIZES.s,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.divider,
    backgroundColor: COLORS.backgroundDark,
  },
  input: {
    flex: 1,
    ...FONTS.body,
    fontSize: SIZES.medium,
    color: COLORS.text,
    backgroundColor: COLORS.backgroundLight,
    borderRadius: SIZES.borderRadiusLarge,
    paddingHorizontal: SIZES.m,
    paddingVertical: SIZES.s,
    maxHeight: 100,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SIZES.s,
    alignSelf: 'flex-end',
  },
  sendButtonDisabled: {
    backgroundColor: COLORS.backgroundLight,
  },
});