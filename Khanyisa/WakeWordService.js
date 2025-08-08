import { useEffect, useRef } from 'react';
import { Alert, Platform } from 'react-native';
import { PorcupineManager } from '@picovoice/porcupine-react-native';

const keywordPath = Platform.select({
  android: 'magic_app_android.ppn',
  ios: 'magic_app_ios.ppn', // if you have this
});

const modelPath = Platform.select({
  android: 'porcupine_params.pv',
  ios: 'porcupine_params.pv',
});

export const useWakeWord = () => {
  const porcupineManagerRef = useRef(null);

  useEffect(() => {
    const initWakeWord = async () => {
      try {
        const manager = await PorcupineManager.fromCustomKeywords(
          keywordPath,
          (keywordIndex) => {
            console.log(`Wake word detected!`);
            Alert.alert('Wake Word Detected', 'You said "magic app"!');
          },
          modelPath
        );

        porcupineManagerRef.current = manager;
        await manager.start();
      } catch (err) {
        console.error('Porcupine Init Error:', err);
      }
    };

    initWakeWord();

    return () => {
      if (porcupineManagerRef.current) {
        porcupineManagerRef.current.stop();
        porcupineManagerRef.current.delete();
      }
    };
  }, []);
};
