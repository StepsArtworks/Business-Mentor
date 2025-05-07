import React from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, Switch } from 'react-native';
import { User, Moon, Download, Bell, BookOpen, MessageCircle, Info, ChevronRight } from 'lucide-react-native';
import { videos } from '@/data/videos';
import Colors from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  
  // Calculate progress
  const totalVideos = videos.length;
  const completedVideos = videos.filter(v => v.isCompleted).length;
  const progressPercentage = totalVideos > 0 
    ? Math.round((completedVideos / totalVideos) * 100) 
    : 0;

  // Mock data
  const userName = "Aspiring Entrepreneur";
  const isDarkMode = colorScheme === 'dark';
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [offlineEnabled, setOfflineEnabled] = React.useState(false);
  
  const menuItems = [
    {
      icon: <BookOpen size={20} color={colors.secondary} />,
      label: 'Learning Progress',
      value: `${progressPercentage}% complete`,
      hasChevron: true
    },
    {
      icon: <MessageCircle size={20} color={colors.secondary} />,
      label: 'Chat History',
      hasChevron: true
    },
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
        { borderBottomColor: colors.border },
        index === menuItems.length - 1 && styles.lastMenuItem
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
        {item.value && !item.isSwitch && (
          <Text style={[styles.menuItemValue, { color: colors.secondary }]}>
            {item.value}
          </Text>
        )}
        
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
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
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
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.accent }]}>
              {completedVideos}
            </Text>
            <Text style={[styles.statLabel, { color: colors.secondary }]}>
              Lessons Completed
            </Text>
          </View>
          
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.accent }]}>
              {totalVideos - completedVideos}
            </Text>
            <Text style={[styles.statLabel, { color: colors.secondary }]}>
              Lessons Remaining
            </Text>
          </View>
        </View>
      </View>

      <View style={[styles.menuContainer, { backgroundColor: colors.card }]}>
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
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  profileHeader: {
    alignItems: 'center',
    padding: 24,
    borderRadius: 12,
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
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 24,
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'DMSans-Regular',
    fontSize: 14,
  },
  divider: {
    width: 1,
    height: '80%',
    alignSelf: 'center',
  },
  menuContainer: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  lastMenuItem: {
    borderBottomWidth: 0,
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
  menuItemValue: {
    fontFamily: 'DMSans-Regular',
    fontSize: 14,
    marginRight: 8,
  },
  appVersion: {
    textAlign: 'center',
    fontFamily: 'DMSans-Regular',
    fontSize: 12,
    marginTop: 24,
  },
});