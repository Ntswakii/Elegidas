import React from 'react';
import { View, Text } from 'react-native';
import { useWakeWord } from './WakeWordService';

export default function App() {
  useWakeWord();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Listening for "magic app" 🔊</Text>
    </View>
  );
}
