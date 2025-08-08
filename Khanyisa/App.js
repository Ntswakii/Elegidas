import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SafetyAppHome from './screens/SafetyAppHome';
import CommunityWatchHub from './screens/CommunityWatchHub';
import CommunityFeed from './screens/CommunityFeed';
import { Ionicons } from '@expo/vector-icons';
import { View, Text } from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Stack Navigator for screens that need to be pushed on top
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


const SettingsScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings Screen</Text>
    </View>
  );
};

export default function App() {
  return (
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
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}