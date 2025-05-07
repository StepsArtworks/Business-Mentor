import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, SIZES } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics';
import { User, Bell, Moon, Download, CircleHelp as HelpCircle, LogOut, ChevronRight } from 'lucide-react-native';

export default function ProfileScreen() {
  const [darkMode, setDarkMode] = React.useState(true);
  const [notifications, setNotifications] = React.useState(true);

  const toggleSwitch = (setting: 'darkMode' | 'notifications') => {
    // Provide haptic feedback on iOS/Android
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    if (setting === 'darkMode') {
      setDarkMode(previous => !previous);
    } else {
      setNotifications(previous => !previous);
    }
  };

  const handleNavigation = (screen: string) => {
    // Provide haptic feedback on iOS/Android
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    // Navigate to corresponding screen
    // router.push(`/${screen}`);
  };

  return (
    <LinearGradient 
      colors={[COLORS.gradientStart, COLORS.gradientEnd]} 
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>
        
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.profileSection}>
            <View style={styles.profileIcon}>
              <User size={32} color={COLORS.text} />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Guest User</Text>
              <Text style={styles.profileEmail}>Create an account to save your progress</Text>
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferences</Text>
            
            <View style={styles.settingRow}>
              <Bell size={22} color={COLORS.textSecondary} />
              <Text style={styles.settingText}>Notifications</Text>
              <Switch
                trackColor={{ false: COLORS.backgroundLight, true: COLORS.primaryDark }}
                thumbColor={notifications ? COLORS.primary : COLORS.textSecondary}
                onValueChange={() => toggleSwitch('notifications')}
                value={notifications}
              />
            </View>
            
            <View style={styles.settingRow}>
              <Moon size={22} color={COLORS.textSecondary} />
              <Text style={styles.settingText}>Dark Mode</Text>
              <Switch
                trackColor={{ false: COLORS.backgroundLight, true: COLORS.primaryDark }}
                thumbColor={darkMode ? COLORS.primary : COLORS.textSecondary}
                onValueChange={() => toggleSwitch('darkMode')}
                value={darkMode}
              />
            </View>
            
            <TouchableOpacity 
              style={styles.settingRow}
              onPress={() => handleNavigation('downloads')}
            >
              <Download size={22} color={COLORS.textSecondary} />
              <Text style={styles.settingText}>Offline Content</Text>
              <ChevronRight size={18} color={COLORS.textSecondary} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Support</Text>
            
            <TouchableOpacity 
              style={styles.settingRow}
              onPress={() => handleNavigation('help')}
            >
              <HelpCircle size={22} color={COLORS.textSecondary} />
              <Text style={styles.settingText}>Help & FAQ</Text>
              <ChevronRight size={18} color={COLORS.textSecondary} />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={() => {
              if (Platform.OS !== 'web') {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              }
              // Logout logic here
            }}
          >
            <LogOut size={20} color={COLORS.error} />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
          
          <View style={styles.versionInfo}>
            <Text style={styles.versionText}>Version 1.0.0</Text>
          </View>
        </ScrollView>
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
  content: {
    flex: 1,
    padding: SIZES.m,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.xl,
    backgroundColor: COLORS.cardBackground,
    padding: SIZES.m,
    borderRadius: SIZES.borderRadius,
  },
  profileIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.m,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    ...FONTS.bodyBold,
    fontSize: SIZES.large,
    color: COLORS.text,
    marginBottom: SIZES.xs,
  },
  profileEmail: {
    ...FONTS.body,
    fontSize: SIZES.medium,
    color: COLORS.textSecondary,
  },
  section: {
    marginBottom: SIZES.xl,
  },
  sectionTitle: {
    ...FONTS.bodyBold,
    fontSize: SIZES.medium,
    color: COLORS.textSecondary,
    marginBottom: SIZES.s,
    paddingHorizontal: SIZES.xs,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SIZES.m,
    paddingHorizontal: SIZES.m,
    backgroundColor: COLORS.cardBackground,
    marginBottom: StyleSheet.hairlineWidth,
    borderRadius: SIZES.borderRadius,
  },
  settingText: {
    ...FONTS.body,
    fontSize: SIZES.medium,
    color: COLORS.text,
    flex: 1,
    marginLeft: SIZES.m,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZES.m,
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
    borderRadius: SIZES.borderRadius,
    marginBottom: SIZES.xl,
  },
  logoutText: {
    ...FONTS.bodyMedium,
    fontSize: SIZES.medium,
    color: COLORS.error,
    marginLeft: SIZES.s,
  },
  versionInfo: {
    alignItems: 'center',
    marginBottom: 100, // Extra space for tab bar
  },
  versionText: {
    ...FONTS.body,
    fontSize: SIZES.small,
    color: COLORS.textMuted,
  },
});