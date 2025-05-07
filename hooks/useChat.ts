import { useState, useCallback } from 'react';
import { getResponseForQuestion } from '@/data/mentorResponses';
import { QuestionHistoryItem } from '@/types/videoData';
import debounce from 'lodash.debounce';

export default function useChat(videoId: string) {
  const [messages, setMessages] = useState<Array<{id: string, text: string, type: 'user' | 'mentor'}>>([]);
  const [history, setHistory] = useState<QuestionHistoryItem[]>([]);
  const [isThinking, setIsThinking] = useState(false);

  // Simulate mentor thinking with a slight delay
  const debouncedMentorResponse = useCallback(
    debounce((question: string, videoId: string) => {
      const answer = getResponseForQuestion(question, videoId);
      const responseMsg = {
        id: Date.now().toString(),
        text: answer,
        type: 'mentor' as const
      };
      
      setMessages(prev => [...prev, responseMsg]);
      
      // Add to history
      const historyItem: QuestionHistoryItem = {
        id: Date.now().toString(),
        videoId,
        question,
        answer,
        timestamp: new Date()
      };
      
      setHistory(prev => [historyItem, ...prev]);
      setIsThinking(false);
    }, 1500), // 1.5 seconds delay to simulate thinking
    []
  );

  const sendMessage = useCallback((message: string) => {
    // Add user message immediately
    const userMsg = {
      id: Date.now().toString(),
      text: message,
      type: 'user' as const
    };
    
    setMessages(prev => [...prev, userMsg]);
    
    // Show typing indicator
    setIsThinking(true);
    
    // Get response after "thinking"
    debouncedMentorResponse(message, videoId);
  }, [videoId, debouncedMentorResponse]);

  const clearChat = useCallback(() => {
    setMessages([]);
  }, []);

  return { 
    messages, 
    sendMessage, 
    clearChat, 
    isThinking,
    history
  };
}