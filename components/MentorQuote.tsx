import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { COLORS, FONTS, SIZES } from '@/constants/Colors';

interface MentorQuoteProps {
  quote: string;
  typingSpeed?: number;
}

const MentorQuote: React.FC<MentorQuoteProps> = ({ 
  quote, 
  typingSpeed = 35 
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let index = 0;
    setDisplayedText('');
    
    // Reset typing animation when quote changes
    if (quote !== displayedText) {
      setIsTyping(true);
      
      const interval = setInterval(() => {
        if (index < quote.length) {
          setDisplayedText((prev) => prev + quote.charAt(index));
          index++;
        } else {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, typingSpeed);
      
      return () => clearInterval(interval);
    }
  }, [quote, typingSpeed]);

  return (
    <View style={styles.container}>
      <Text style={styles.quoteText}>
        {displayedText}
        {isTyping && <Text style={styles.cursor}>|</Text>}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.xs,
  },
  quoteText: {
    ...FONTS.subheading,
    fontSize: SIZES.medium,
    color: COLORS.text,
    lineHeight: 22,
  },
  cursor: {
    opacity: 1,
    color: COLORS.primary,
  },
});

export default MentorQuote;