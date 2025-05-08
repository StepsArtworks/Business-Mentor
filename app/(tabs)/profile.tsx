import React from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, Switch } from 'react-native';
import { User, Moon, Download, Bell, BookOpen, MessageCircle, Info, ChevronRight } from 'lucide-react-native';
import CourseTimeline from '@/components/CourseTimeline';
import Colors from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  
  // Mock data
  const userName = "Aspiring Entrepreneur";
  const isDarkMode = colorScheme === 'dark';
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [offlineEnabled, setOfflineEnabled] = React.useState(false);
  
  const menuItems = [
    {
      icon: <Bell size={20} color={colors.secondary} />,
      label: 'Notifications',
      isSwitch: true,
      value: notificationsEnabled,
      onToggle: () => setNotificationsEnabled(!notificationsEnabled)
    },
    {
      icon: <Download size={20} color={colors.secondary} />,
      label: 'Offline Access',
      isSwitch: true,
      value: offlineEnabled,
      onToggle: () => setOfflineEnabled(!offlineEnabled)
    },
    {
      icon: <Moon size={20} color={colors.secondary} />,
      label: 'Dark Mode',
      isSwitch: true,
      value: isDarkMode,
      // Dark mode toggle would be implemented here
    },
    {
      icon: <Info size={20} color={colors.secondary} />,
      label: 'About',
      hasChevron: true
    },
  ];

  const renderMenuItem = (item: any, index: number) => (
    <Pressable
      key={index}
      style={[
        styles.menuItem,
        { 
          backgroundColor: colors.card,
          borderBottomColor: colors.border,
          borderBottomWidth: index === menuItems.length - 1 ? 0 : StyleSheet.hairlineWidth
        }
      ]}
      onPress={() => {
        if (item.isSwitch) return;
        // Handle navigation or action
      }}
    >
      <View style={styles.menuItemLeft}>
        {item.icon}
        <Text style={[styles.menuItemLabel, { color: colors.text }]}>
          {item.label}
        </Text>
      </View>
      
      <View style={styles.menuItemRight}>
        {item.isSwitch ? (
          <Switch
            value={item.value}
            onValueChange={item.onToggle}
            trackColor={{ false: colors.muted, true: colors.accent }}
            thumbColor="#FFFFFF"
          />
        ) : item.hasChevron ? (
          <ChevronRight size={20} color={colors.secondary} />
        ) : null}
      </View>
    </Pressable>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.profileHeader, { backgroundColor: colors.card }]}>
        <View style={[styles.avatarContainer, { backgroundColor: colors.primary }]}>
          <User size={40} color="#FFFFFF" />
        </View>
        <Text style={[styles.userName, { color: colors.text }]}>
          {userName}
        </Text>
        <Text style={[styles.userSubtitle, { color: colors.secondary }]}>
          Business Student
        </Text>
      </View>

      <View style={[styles.settingsContainer, { backgroundColor: colors.card }]}>
        <Text style={[styles.settingsTitle, { color: colors.text }]}>Settings</Text>
        {menuItems.map(renderMenuItem)}
      </View>

      <Text style={[styles.appVersion, { color: colors.muted }]}>
        Version 1.0.0
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    padding: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 16,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  userName: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 20,
    marginBottom: 4,
  },
  userSubtitle: {
    fontFamily: 'DMSans-Regular',
    fontSize: 16,
  },
  settingsContainer: {
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
  },
  settingsTitle: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 18,
    padding: 16,
    paddingBottom: 8,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemLabel: {
    fontFamily: 'DMSans-Medium',
    fontSize: 16,
    marginLeft: 12,
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appVersion: {
    textAlign: 'center',
    fontFamily: 'DMSans-Regular',
    fontSize: 12,
    marginBottom: 24,
  },
});