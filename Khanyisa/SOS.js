import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert, TextInput } from 'react-native';
import { Mic, Lock, UserPlus, Shield, ChevronRight, ChevronDown, CheckCircle, XCircle } from 'lucide-react-native';
import Voice from '@react-native-voice/voice';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { PorcupineManager } from '@picovoice/porcupine-react-native';
import { Alert } from 'react-native';
import RNFS from 'react-native-fs';

const SOSSection = () => {

    let porcupineManager = null;

  const initWakeWord = async () => {
    try {
      const keywordPath = `${RNFS.DocumentDirectoryPath}/magic_app.ppn`;
      const modelPath = `${RNFS.DocumentDirectoryPath}/porcupine_params.pv`;

      // Copy assets to DocumentDirectoryPath if they aren't there yet
      const copyFile = async (assetPath, destPath) => {
        const exists = await RNFS.exists(destPath);
        if (!exists) {
          await RNFS.copyFileAssets(assetPath, destPath);
        }
      };

      await copyFile('magic_app.ppn', keywordPath);
      await copyFile('porcupine_params.pv', modelPath);

      porcupineManager = await PorcupineManager.fromKeywordPaths(
        modelPath,
        [keywordPath],
        (keywordIndex) => {
          if (keywordIndex === 0) {
            Alert.alert("Wake Word Detected", "Magic App is now active 🚨");
            // Trigger anything here — like navigation, alert, etc.
          }
        }
      );

      await porcupineManager.start();
      console.log('Porcupine started 🚀');
    } catch (error) {
      console.error("Wake word error:", error);
    }

    // Cleanup on unmount
    return () => {
      if (porcupineManager) {
        porcupineManager.stop();
        porcupineManager.delete();
      }
    };
  };

  initWakeWord();
  
  const [activeTab, setActiveTab] = useState('magicWord');
  const [magicWord, setMagicWord] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [emergencyContacts, setEmergencyContacts] = useState([
    { name: 'Sarah Johnson', relation: 'Spouse', phone: '+27 83 456 7890' },
    { name: 'Cape Town Police', relation: 'Local Authority', phone: '10111' }
  ]);
  const navigation = useNavigation();

  // Voice recognition setup
  useEffect(() => {
    Voice.onSpeechResults = (e) => {
      const spokenText = e.value[0].toLowerCase();
      if (spokenText.includes(magicWord.toLowerCase())) {
        triggerEmergencyProtocol();
      }
    };

    return () => Voice.destroy();
  }, [magicWord]);

  const startRecording = async () => {
    try {
      await Voice.start('en-US');
      setIsRecording(true);
    } catch (e) {
      console.error(e);
    }
  };

  const stopRecording = async () => {
    await Voice.stop();
    setIsRecording(false);
  };

  const triggerEmergencyProtocol = () => {
    Alert.alert(
      'EMERGENCY ACTIVATED',
      'Your location and audio are being shared with emergency contacts.',
      [
        { text: 'Cancel (10s)', onPress: () => console.log('Cancelled') },
        { text: 'Call Police', onPress: () => Linking.openURL('tel:10111') }
      ],
      { cancelable: false }
    );
    // In real app: Send alerts to contacts + start location/audio sharing
  };

  const changeMagicWord = () => {
    auth().currentUser.reauthenticateWithCredential(
      // Example: Firebase auth flow
    ).then(() => {
      navigation.navigate('MagicWordSetup');
    }).catch(error => {
      Alert.alert('Authentication Failed', 'Please verify your identity');
    });
  };

  const MagicWordSection = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Magic Word Activation</Text>
      
      {!magicWord ? (
        <>
          <Text style={styles.description}>
            Set a whisper-activated word that triggers emergency alerts without drawing attention.
          </Text>
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => navigation.navigate('MagicWordSetup')}
          >
            <Mic size={20} color="white" />
            <Text style={styles.buttonText}>Set Up Magic Word</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <View style={styles.statusCard}>
            <CheckCircle size={24} color="#10B981" />
            <Text style={styles.statusText}>Your magic word is active</Text>
          </View>

          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={changeMagicWord}
          >
            <Lock size={18} color="#6E56CF" />
            <Text style={styles.secondaryButtonText}>Change Magic Word</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.testButton}
            onPressIn={startRecording}
            onPressOut={stopRecording}
          >
            <Mic size={24} color="white" />
            <Text style={styles.buttonText}>
              {isRecording ? 'Whisper Now...' : 'Hold to Test'}
            </Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity 
        style={styles.tipsHeader}
        onPress={() => setShowTips(!showTips)}
      >
        <Text style={styles.tipsTitle}>Tips for Choosing a Magic Word</Text>
        <ChevronDown size={20} color="#6E56CF" />
      </TouchableOpacity>

      {showTips && (
        <View style={styles.tipsContainer}>
          <View style={styles.tipItem}>
            <XCircle size={18} color="#EF4444" />
            <Text style={styles.tipText}>Avoid common words like "help" or "stop"</Text>
          </View>
          <View style={styles.tipItem}>
            <CheckCircle size={18} color="#10B981" />
            <Text style={styles.tipText}>Use unusual combos like "velvet toaster"</Text>
          </View>
          <View style={styles.tipItem}>
            <XCircle size={18} color="#EF4444" />
            <Text style={styles.tipText}>Don't use personal names or locations</Text>
          </View>
        </View>
      )}
    </View>
  );

  const EmergencyContactsSection = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Emergency Contacts</Text>
      <Text style={styles.description}>
        These contacts will receive alerts when your magic word is triggered.
      </Text>

      <ScrollView style={styles.contactsScroll}>
        {emergencyContacts.map((contact, index) => (
          <View key={index} style={styles.contactCard}>
            <View style={styles.contactInfo}>
              <Text style={styles.contactName}>{contact.name}</Text>
              <Text style={styles.contactRelation}>{contact.relation}</Text>
            </View>
            <Text style={styles.contactPhone}>{contact.phone}</Text>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => navigation.navigate('AddContact')}
      >
        <UserPlus size={18} color="white" />
        <Text style={styles.buttonText}>Add Emergency Contact</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'magicWord' && styles.activeTab]}
          onPress={() => setActiveTab('magicWord')}
        >
          <Shield size={20} color={activeTab === 'magicWord' ? 'white' : '#6E56CF'} />
          <Text style={[styles.tabText, activeTab === 'magicWord' && styles.activeTabText]}>
            Magic Word
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'contacts' && styles.activeTab]}
          onPress={() => setActiveTab('contacts')}
        >
          <Users size={20} color={activeTab === 'contacts' ? 'white' : '#6E56CF'} />
          <Text style={[styles.tabText, activeTab === 'contacts' && styles.activeTabText]}>
            Contacts
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'magicWord' ? <MagicWordSection /> : <EmergencyContactsSection />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB'
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#E5E7EB'
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    gap: 8
  },
  activeTab: {
    backgroundColor: '#6E56CF',
    borderBottomWidth: 2,
    borderColor: '#4F46E5'
  },
  activeTabText: {
    color: 'white'
  },
  tabText: {
    fontWeight: '600',
    color: '#6E56CF'
  },
  sectionContainer: {
    flex: 1,
    padding: 20
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 10
  },
  description: {
    color: '#64748B',
    marginBottom: 20,
    lineHeight: 22
  },
  primaryButton: {
    backgroundColor: '#6E56CF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 10,
    marginBottom: 20
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 10,
    marginBottom: 15
  },
  secondaryButtonText: {
    color: '#6E56CF',
    fontWeight: '600'
  },
  testButton: {
    backgroundColor: '#EF4444',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 10,
    marginBottom: 20
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16
  },
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    padding: 15,
    borderRadius: 12,
    gap: 10,
    marginBottom: 20
  },
  statusText: {
    color: '#065F46',
    fontWeight: '600'
  },
  tipsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: '#E5E7EB'
  },
  tipsTitle: {
    color: '#6E56CF',
    fontWeight: '600'
  },
  tipsContainer: {
    marginBottom: 20
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 8
  },
  tipText: {
    color: '#475569'
  },
  contactsScroll: {
    flex: 1,
    marginBottom: 15
  },
  contactCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  contactInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  contactName: {
    fontWeight: '600',
    color: '#1E293B'
  },
  contactRelation: {
    color: '#64748B',
    fontSize: 12
  },
  contactPhone: {
    color: '#6E56CF',
    fontWeight: '500'
  },
  addButton: {
    backgroundColor: '#6E56CF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 10
  }
});

export default SOSSection;