import React from 'react';
import { Tabs } from 'expo-router';
import { Chrome as Home, MessageCircle, User } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.secondary,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarLabelStyle: {
          fontFamily: 'DMSans-Medium',
          fontSize: 12,
          marginBottom: 4,
        },
        headerStyle: {
          backgroundColor: colors.card,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        headerTitleStyle: {
          fontFamily: 'SpaceGrotesk-Bold',
          fontSize: 18,
          color: colors.text,
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Learn',
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
          headerTitle: 'Business Mentor',
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Q&A',
          tabBarIcon: ({ color, size }) => <MessageCircle color={color} size={size} />,
          headerTitle: 'Ask Your Mentor',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
          headerTitle: 'Your Profile',
        }}
      />
    </Tabs>
  );
}