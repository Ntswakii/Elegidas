import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SafetyAppHome from './screens/SafetyAppHome';
import CommunityWatchHub from './screens/CommunityWatchHub';
import CommunityFeed from './screens/CommunityFeed';

const Stack = createNativeStackNavigator();

export default function App() {
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
            headerTintColor: 'white',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}