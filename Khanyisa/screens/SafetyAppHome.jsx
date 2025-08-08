import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  PanResponder,
  Platform,
  Animated,
  Easing
} from 'react-native';
import Video from 'react-native-video';
import { 
  Shield, 
  AlertTriangle, 
  MapPin, 
  Heart, 
  Phone, 
  Users, 
  Navigation, 
  MessageCircle, 
  Settings, 
  Bell, 
  User, 
  Moon, 
  Sun 
} from 'react-native-feather';
import { useNavigation } from '@react-navigation/native';

const SafetyAppHome = () => {
  const navigation = useNavigation();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const pulseAnim = new Animated.Value(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true
        })
      ])
    ).start();
  }, []);

  const features = [
    {
      id: 'sos',
      title: 'SOS Emergency',
      subtitle: 'Instant help when needed',
      icon: AlertTriangle,
      color: ['#fee2e2', '#fce7f3', '#ffe4e6'],
      iconColor: '#ef4444',
      urgent: true
    },
    {
      id: 'travel',
      title: 'Travel Safe',
      subtitle: 'Share your journey',
      icon: Navigation,
      color: ['#dbeafe', '#e0f2fe', '#cffafe'],
      iconColor: '#3b82f6'
    },
    {
      id: 'community',
      title: 'Community Watch',
      subtitle: 'Report & stay informed',
      icon: Users,
      color: ['#f3e8ff', '#ede9fe', '#f3e8ff'],
      iconColor: '#9333ea',
      screen: 'CommunityWatchHub'
    },
    {
      id: 'support',
      title: 'Emotional Support',
      subtitle: 'Chat & resources',
      icon: Heart,
      color: ['#fce7f3', '#ffe4e6', '#fce7f3'],
      iconColor: '#ec4899'
    }
  ];

  const quickActions = [
    { icon: Phone, label: 'Call 911', color: '#ef4444' },
    { icon: MessageCircle, label: 'Text Help', color: '#3b82f6' },
    { icon: MapPin, label: 'Share Location', color: '#22c55e' },
    { icon: Shield, label: 'Safe Mode', color: '#9333ea' }
  ];

  const getBackgroundStyle = () => {
    return isDarkMode 
      ? styles.darkBackground 
      : styles.lightBackground;
  };

  const getTextColor = () => {
    return isDarkMode 
      ? styles.darkText 
      : styles.lightText;
  };

  const getCardStyle = () => {
    return isDarkMode 
      ? styles.darkCard 
      : styles.lightCard;
  };

  const getBorderColor = () => {
    return isDarkMode 
      ? styles.darkBorder 
      : styles.lightBorder;
  };

  return (
    <SafeAreaView style={[styles.container, getBackgroundStyle()]}>
      {/* Header */}
      <View style={[styles.header, getCardStyle(), getBorderColor()]}>
        <View style={styles.headerContent}>
          <View style={styles.headerTitleContainer}>
            <View style={styles.appIcon}>
              <Shield width={24} height={24} color="white" />
            </View>
            <View>
              <Text style={[styles.appTitle, getTextColor()]}>Khanyisa</Text>
              <Text style={[styles.appSubtitle, isDarkMode ? styles.darkSubtext : styles.lightSubtext]}>
                Your safety companion
              </Text>
            </View>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity
              onPress={() => setIsDarkMode(!isDarkMode)}
              style={[styles.themeToggle, isDarkMode ? styles.darkToggle : styles.lightToggle]}
            >
              {isDarkMode ? <Sun width={16} height={16} color="#d1d5db" /> : <Moon width={16} height={16} color="#9333ea" />}
            </TouchableOpacity>
            <Bell width={20} height={20} color={isDarkMode ? '#9ca3af' : '#4b5563'} />
            <User width={20} height={20} color={isDarkMode ? '#9ca3af' : '#4b5563'} />
          </View>
        </View>
      </View>

      <ScrollView style={styles.scrollContainer}>
        {/* Greeting Section */}
        <View style={[styles.greetingCard, getCardStyle(), getBorderColor()]}>
          <View style={styles.greetingContent}>
            <Text style={[styles.greetingTitle, getTextColor()]}>
              {greeting}! 👋
            </Text>
            <Text style={[styles.greetingDate, isDarkMode ? styles.darkSubtext : styles.lightSubtext]}>
              {currentTime.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })}
            </Text>
            <Animated.View 
              style={[
                styles.protectedBadge,
                { transform: [{ scale: pulseAnim }] }
              ]}
            >
              <Shield width={16} height={16} color="white" />
              <Text style={styles.protectedText}>Protected Mode: Active</Text>
            </Animated.View>
          </View>
        </View>

        {/* Main Features */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, getTextColor()]}>Safety Features</Text>
          <View style={styles.featuresGrid}>
            {features.map((feature) => {
              const IconComponent = feature.icon;

              return (
                <TouchableOpacity
                  key={feature.id}
                  onPress={() => {
                    if (feature.screen) {
                      navigation.navigate(feature.screen);
                    }
                  }}
                  style={[
                    styles.featureCard,
                    {
                      backgroundColor: isDarkMode ? '#1f2937' : 'white',
                      borderColor: isDarkMode ? '#374151' : 'rgba(255, 255, 255, 0.5)'
                    },
                    feature.urgent && styles.urgentFeature
                  ]}
                >
                  <View style={styles.featureContent}>
                    <View style={[
                      styles.featureIconContainer,
                      { backgroundColor: isDarkMode ? '#111827' : 'rgba(255, 255, 255, 0.8)' }
                    ]}>
                      <IconComponent width={24} height={24} color={feature.iconColor} />
                    </View>
                    <Text style={[styles.featureTitle, getTextColor()]}>
                      {feature.title}
                    </Text>
                    <Text style={[styles.featureSubtitle, isDarkMode ? styles.darkSubtext : styles.lightSubtext]}>
                      {feature.subtitle}
                    </Text>
                    {feature.urgent && (
                      <View style={styles.urgentBadge}>
                        <Text style={styles.urgentBadgeText}>Emergency</Text>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}

          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, getTextColor()]}>Quick Actions</Text>
          <View style={[styles.quickActionsCard, getCardStyle(), getBorderColor()]}>
            <View style={styles.quickActionsGrid}>
              {quickActions.map((action, index) => {
                const IconComponent = action.icon;
                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.quickActionButton,
                      isDarkMode ? styles.darkQuickAction : styles.lightQuickAction
                    ]}
                  >
                    <View style={[
                      styles.quickActionIcon,
                      { backgroundColor: isDarkMode ? '#1f2937' : 'white' }
                    ]}>
                      <IconComponent width={16} height={16} color={action.color} />
                    </View>
                    <Text style={[
                      styles.quickActionLabel,
                      isDarkMode ? styles.darkSubtext : styles.lightSubtext
                    ]}>
                      {action.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>

        {/* Safety Tips */}
        <View style={[
          styles.safetyTipCard,
          isDarkMode ? styles.darkSafetyTip : styles.lightSafetyTip,
          getBorderColor()
        ]}>
          <View style={styles.safetyTipContent}>
            <View style={[
              styles.safetyTipIcon,
              { backgroundColor: isDarkMode ? '#5b21b6' : 'white' }
            ]}>
              <Shield width={16} height={16} color={isDarkMode ? '#a78bfa' : '#9333ea'} />
            </View>
            <View style={styles.safetyTipText}>
              <Text style={[styles.safetyTipTitle, getTextColor()]}>
                Daily Safety Tip
              </Text>
              <Text style={[styles.safetyTipDescription, isDarkMode ? styles.darkSubtext : styles.lightSubtext]}>
                Always let someone know your location when traveling alone. Use the Travel Safe feature to automatically share your journey.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={[
        styles.bottomNav,
        isDarkMode ? styles.darkBottomNav : styles.lightBottomNav,
        getBorderColor()
      ]}>
        <View style={styles.navContainer}>
          <TouchableOpacity style={styles.navButton}>
            <Shield width={20} height={20} color="#9333ea" />
            <Text style={styles.activeNavLabel}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.navButton}
            onPress={() => navigation.navigate('CommunityFeed')}
          >
            <Users width={20} height={20} color="#9ca3af" />
            <Text style={styles.inactiveNavLabel}>Feed</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton}>
            <Users width={20} height={20} color="#9ca3af" />
            <Text style={styles.inactiveNavLabel}>Community</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton}>
            <Settings width={20} height={20} color="#9ca3af" />
            <Text style={styles.inactiveNavLabel}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lightBackground: {
    backgroundColor: '#f5f3ff',
  },
  darkBackground: {
    backgroundColor: '#111827',
  },
  lightText: {
    color: '#1f2937',
  },
  darkText: {
    color: '#f9fafb',
  },
  lightSubtext: {
    color: '#6b7280',
  },
  darkSubtext: {
    color: '#9ca3af',
  },
  lightCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  darkCard: {
    backgroundColor: 'rgba(31, 41, 55, 0.7)',
  },
  lightBorder: {
    borderColor: '#e9d5ff',
  },
  darkBorder: {
    borderColor: '#4b5563',
  },
  header: {
    borderBottomWidth: 1,
    paddingTop: Platform.OS === 'android' ? 16 : 0,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxWidth: 480,
    width: '100%',
    marginHorizontal: 'auto',
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  appIcon: {
    padding: 8,
    backgroundColor: '#9333ea',
    borderRadius: 999,
  },
  appTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  appSubtitle: {
    fontSize: 14,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  themeToggle: {
    padding: 8,
    borderRadius: 999,
  },
  lightToggle: {
    backgroundColor: '#ede9fe',
  },
  darkToggle: {
    backgroundColor: '#374151',
  },
  scrollContainer: {
    flex: 1,
    paddingBottom: 80,
  },
  greetingCard: {
    margin: 16,
    borderRadius: 24,
    borderWidth: 1,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  greetingContent: {
    alignItems: 'center',
  },
  greetingTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  greetingDate: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  protectedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#9333ea',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
  },
  protectedText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 14,
  },
  sectionContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
    marginBottom: 24,
  },
  featureCard: {
    width: '48%',
    borderRadius: 20,
    borderWidth: 1,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  urgentFeature: {
    borderColor: '#fecaca',
    borderWidth: 2,
  },
  featureContent: {
    alignItems: 'center',
  },
  featureIconContainer: {
    padding: 12,
    borderRadius: 999,
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  featureSubtitle: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 8,
  },
  urgentBadge: {
    backgroundColor: '#fee2e2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  urgentBadgeText: {
    color: '#dc2626',
    fontSize: 12,
    fontWeight: '500',
  },
  quickActionsCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 24,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  quickActionButton: {
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 12,
    flex: 1,
  },
  lightQuickAction: {
    backgroundColor: 'transparent',
  },
  darkQuickAction: {
    backgroundColor: 'transparent',
  },
  quickActionIcon: {
    padding: 8,
    borderRadius: 999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  quickActionLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  safetyTipCard: {
    marginHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
  },
  lightSafetyTip: {
    backgroundColor: '#f3e8ff',
  },
  darkSafetyTip: {
    backgroundColor: 'rgba(76, 29, 149, 0.3)',
  },
  safetyTipContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  safetyTipIcon: {
    padding: 8,
    borderRadius: 999,
  },
  safetyTipText: {
    flex: 1,
  },
  safetyTipTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  safetyTipDescription: {
    fontSize: 12,
  },
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

export default SafetyAppHome;