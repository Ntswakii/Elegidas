import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SafetyAppHome from './screens/SafetyAppHome';
import CommunityWatchHub from './screens/CommunityWatchHub';
import CommunityFeed from './screens/CommunityFeed';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, Linking, Alert } from 'react-native';
import React, { useRef } from 'react';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="SafetyAppHome" 
        component={SafetyAppHome} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="CommunityWatchHub" 
        component={CommunityWatchHub} 
        options={{ title: 'Community Watch' }}
      />
      <Stack.Screen 
        name="CommunityFeed" 
        component={CommunityFeed} 
        options={{ title: 'Community Feed' }}
      />
    </Stack.Navigator>
  );
};

const SettingsScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Settings Screen</Text>
  </View>
);

export default function App() {
  const clickCount = useRef(0);
  const timeoutRef = useRef(null);

  const handleVolumeUpTap = () => {
    clickCount.current += 1;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      if (clickCount.current === 3) {
        Alert.alert(
          'Emergency Call',
          'You tapped 3 times. Do you want to call emergency services?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Call', onPress: () => Linking.openURL('tel:911') },
          ]
        );
      }
      clickCount.current = 0;
    }, 1000); // Reset if delay between taps is more than 1s
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Invisible Volume Up Button Area (top right corner) */}
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 100,
          height: 100,
          zIndex: 1000,
          opacity: 0.01, // almost invisible but tappable
        }}
        onPress={handleVolumeUpTap}
      />

      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'shield' : 'shield-outline';
              } else if (route.name === 'Feed') {
                iconName = focused ? 'people' : 'people-outline';
              } else if (route.name === 'Community') {
                iconName = focused ? 'people-circle' : 'people-circle-outline';
              } else if (route.name === 'Settings') {
                iconName = focused ? 'settings' : 'settings-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#9333ea',
            tabBarInactiveTintColor: '#9ca3af',
            tabBarStyle: {
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderTopColor: '#e9d5ff',
              paddingBottom: 10,
              height: 80,
            },
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: '500',
            },
          })}
        >
          <Tab.Screen 
            name="Home" 
            component={HomeStack}
            options={{ headerShown: false }}
          />
          <Tab.Screen 
            name="Feed" 
            component={CommunityFeed}
            options={{ 
              title: 'Community Feed',
              headerStyle: {
                backgroundColor: 'black',
              },
              headerTintColor: 'white',
            }}
          />
          <Tab.Screen 
            name="Community" 
            component={CommunityWatchHub}
            options={{ title: 'Community' }}
          />
          <Tab.Screen 
            name="Settings" 
            component={SettingsScreen}
            options={{ title: 'Settings' }}
            // testing 
          />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}