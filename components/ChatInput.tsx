import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Pressable, Platform } from 'react-native';
import { Send } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';

type ChatInputProps = {
  onSend: (message: string) => void;
  placeholder?: string;
};

export default function ChatInput({ onSend, placeholder = 'Ask a question...' }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage('');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <View style={[styles.inputContainer, { backgroundColor: colors.inputBackground }]}>
        <TextInput
          style={[styles.input, { color: colors.text }]}
          value={message}
          onChangeText={setMessage}
          placeholder={placeholder}
          placeholderTextColor={colors.muted}
          multiline
          maxLength={200}
          autoCorrect={true}
          returnKeyType="send"
          onSubmitEditing={handleSend}
          blurOnSubmit={Platform.OS === 'ios'}
        />
        <Pressable
          onPress={handleSend}
          style={({ pressed }) => [
            styles.sendButton,
            { backgroundColor: message.trim() ? colors.accent : colors.muted },
            pressed && { opacity: 0.8 }
          ]}
          disabled={!message.trim()}
        >
          <Send color="#FFFFFF" size={18} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 24,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    maxHeight: 100,
    fontFamily: 'DMSans-Regular',
  },
  sendButton: {
    height: 36,
    width: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});