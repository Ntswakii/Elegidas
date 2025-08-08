import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform
} from 'react-native';
import { 
  Shield, 
  Users, 
  Settings 
} from 'react-native-feather';
import { useNavigation } from '@react-navigation/native';

const BottomBar = ({ isDarkMode, activeTab = 'Home' }) => {
  const navigation = useNavigation();

  const getBottomNavStyle = () => {
    return isDarkMode 
      ? styles.darkBottomNav 
      : styles.lightBottomNav;
  };

  const getBorderColor = () => {
    return isDarkMode 
      ? styles.darkBorder 
      : styles.lightBorder;
  };

  const navItems = [
    {
      key: 'Home',
      icon: Shield,
      label: 'Home',
      screen: 'SafetyAppHome'
    },
    {
      key: 'Feed',
      icon: Users,
      label: 'Feed',
      screen: 'CommunityFeed'
    },
    {
      key: 'Community',
      icon: Users,
      label: 'Community',
      screen: 'Community'
    },
    {
      key: 'Settings',
      icon: Settings,
      label: 'Settings',
      screen: 'Settings'
    }
  ];

  return (
    <View style={[
      styles.bottomNav,
      getBottomNavStyle(),
      getBorderColor()
    ]}>
      <View style={styles.navContainer}>
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeTab === item.key;
          
          return (
            <TouchableOpacity 
              key={item.key}
              style={styles.navButton}
              onPress={() => {
                if (item.screen && !isActive) {
                  navigation.navigate(item.screen);
                }
              }}
            >
              <IconComponent 
                width={20} 
                height={20} 
                color={isActive ? '#9333ea' : '#9ca3af'} 
              />
              <Text style={isActive ? styles.activeNavLabel : styles.inactiveNavLabel}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    paddingBottom: Platform.OS === 'ios' ? 16 : 8,
  },
  lightBottomNav: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  darkBottomNav: {
    backgroundColor: 'rgba(31, 41, 55, 0.9)',
  },
  lightBorder: {
    borderColor: '#e9d5ff',
  },
  darkBorder: {
    borderColor: '#4b5563',
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    maxWidth: 480,
    width: '100%',
    marginHorizontal: 'auto',
  },
  navButton: {
    alignItems: 'center',
    gap: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  activeNavLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#9333ea',
  },
  inactiveNavLabel: {
    fontSize: 12,
    color: '#9ca3af',
  },
});

export default BottomBar;