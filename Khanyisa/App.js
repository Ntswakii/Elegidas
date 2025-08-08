import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SafetyAppHome from './screens/SafetyAppHome';
import CommunityWatchHub from './screens/CommunityWatchHub';
import CommunityFeed from './screens/CommunityFeed';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SafetyAppHome">
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
          options={{ 
            title: 'Community Feed',
            headerStyle: {
              backgroundColor: 'black',
            },
<<<<<<< HEAD
            headerTintColor: 'white',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
=======
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
>>>>>>> c08132a46490ddf25cc0aaae74faf128a112b820
  );
}