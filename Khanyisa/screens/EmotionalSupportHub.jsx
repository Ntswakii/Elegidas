import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
import {
  Heart,
  MessageCircle,
  Headphones,
  User,
  Phone,
  Video,
  Star,
  Clock,
  Shield,
  ArrowLeft,
  Send,
  Mic,
  MicOff,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Calendar,
  MapPin,
  Award,
  CheckCircle,
  Sparkles,
  Wind,
  Moon,
  Sun,
  Book,
  PenTool
} from 'react-native-feather';

const { width, height } = Dimensions.get('window');

const EmotionalSupportHub = () => {
  const [activeTab, setActiveTab] = useState('companion');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm here to listen and support you. How are you feeling right now?",
      sender: 'ai',
      timestamp: new Date(Date.now() - 5000)
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState('inhale');
  const [breathCount, setBreathCount] = useState(0);
  const [audioPlaying, setAudioPlaying] = useState(null);
  const [journalEntry, setJournalEntry] = useState('');
  const messagesEndRef = useRef(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const professionals = [
    {
      id: 1,
      name: "Dr. Sarah Martinez",
      specialty: "Trauma & PTSD Specialist",
      rating: 4.9,
      reviews: 127,
      experience: "8 years",
      languages: ["English", "Spanish"],
      availability: "Available now",
      price: "$80/session",
      verified: true,
      gradient: ['#a78bfa', '#ec4899']
    },
    {
      id: 2,
      name: "Dr. Amara Johnson",
      specialty: "Anxiety & Depression",
      rating: 4.8,
      reviews: 89,
      experience: "12 years",
      languages: ["English", "French"],
      availability: "Next: Today 3:00 PM",
      price: "$75/session",
      verified: true,
      gradient: ['#60a5fa', '#4f46e5']
    },
    {
      id: 3,
      name: "Dr. Maya Patel",
      specialty: "Relationship & Family Therapy",
      rating: 4.9,
      reviews: 156,
      experience: "10 years",
      languages: ["English", "Hindi"],
      availability: "Next: Tomorrow 10:00 AM",
      price: "$70/session",
      verified: true,
      gradient: ['#4ade80', '#14b8a6']
    },
    {
      id: 4,
      name: "Dr. Lisa Chen",
      specialty: "Crisis Intervention",
      rating: 5.0,
      reviews: 203,
      experience: "15 years",
      languages: ["English", "Mandarin"],
      availability: "24/7 Crisis Support",
      price: "Crisis: Free",
      verified: true,
      gradient: ['#f87171', '#f97316']
    }
  ];

  const selfHelpTools = [
    {
      id: 'breathing',
      title: '4-7-8 Breathing',
      description: 'Calm your nervous system with guided breathing',
      icon: Wind,
      gradient: ['#60a5fa', '#22d3ee'],
      duration: '5 min'
    },
    {
      id: 'meditation',
      title: 'Guided Meditation',
      description: 'Find peace with mindfulness exercises',
      icon: Moon,
      gradient: ['#a78bfa', '#7c3aed'],
      duration: '10 min'
    },
    {
      id: 'journaling',
      title: 'Emotion Journal',
      description: 'Process your feelings through writing',
      icon: PenTool,
      gradient: ['#f472b6', '#fb7185'],
      duration: 'Self-paced'
    },
    {
      id: 'affirmations',
      title: 'Daily Affirmations',
      description: 'Build self-compassion and confidence',
      icon: Sparkles,
      gradient: ['#fbbf24', '#f97316'],
      duration: '3 min'
    }
  ];

  const audioTracks = [
    { id: 1, title: "Ocean Waves", duration: "15:00", playing: false },
    { id: 2, title: "Rain Sounds", duration: "20:00", playing: false },
    { id: 3, title: "Forest Birds", duration: "12:00", playing: false },
    { id: 4, title: "Gentle Piano", duration: "18:00", playing: false }
  ];

  const journalPrompts = [
    "What are three things you're grateful for today?",
    "How are you feeling right now, and what might have contributed to this feeling?",
    "What would you tell a friend who was going through what you're experiencing?",
    "What small act of self-care could you do for yourself today?",
    "What progress have you made recently, no matter how small?"
  ];

  useEffect(() => {
    if (messagesEndRef.current) {
        messagesEndRef.current.scrollToEnd({ animated: true });
    }
    }, [messages]);

  useEffect(() => {
    let interval;
    if (breathingActive) {
      interval = setInterval(() => {
        setBreathingPhase(prev => {
          if (prev === 'inhale') {
            Animated.timing(scaleAnim, {
              toValue: 1.25,
              duration: 4000,
              useNativeDriver: true
            }).start();
            return 'hold';
          }
          if (prev === 'hold') {
            return 'exhale';
          }
          Animated.timing(scaleAnim, {
            toValue: 0.75,
            duration: 4000,
            useNativeDriver: true
          }).start();
          setBreathCount(c => c + 1);
          return 'inhale';
        });
      }, 4000);
    } else {
      scaleAnim.setValue(1);
    }
    return () => clearInterval(interval);
  }, [breathingActive]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponses = [
        "I hear you, and your feelings are completely valid. It's okay to feel this way.",
        "Thank you for sharing that with me. What you're experiencing sounds really difficult.",
        "You're being so brave by reaching out. What would help you feel a little bit safer right now?",
        "I'm here with you. Sometimes just having someone listen can make a difference.",
        "It sounds like you're going through a lot. Would it help to talk about what's worrying you most?"
      ];
      
      const aiMessage = {
        id: Date.now(),
        text: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleToolSelect = (toolId) => {
    setSelectedExercise(toolId);
    if (toolId === 'breathing') {
      setBreathingActive(true);
      setBreathCount(0);
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderCompanionTab = () => (
    <View style={styles.chatContainer}>
      {/* Chat Header */}
      <View style={styles.chatHeader}>
        <View style={styles.chatHeaderContent}>
          <View style={styles.aiAvatar}>
            <Heart stroke="white" width={20} height={20} />
          </View>
          <View>
            <Text style={styles.aiName}>Emma - AI Companion</Text>
            <View style={styles.aiStatus}>
              <View style={styles.statusIndicator} />
              <Text style={styles.statusText}>Always here to listen</Text>
            </View>
          </View>
        </View>
        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>
            💜 I'm trained in crisis support, but I'm not a replacement for professional help. 
            If you're in immediate danger, please contact emergency services or a crisis helpline.
          </Text>
        </View>
      </View>

      {/* Messages */}
      <ScrollView 
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        ref={messagesEndRef}
        onContentSizeChange={() => messagesEndRef.current.scrollToEnd({ animated: true })}
        >
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageBubble,
              message.sender === 'user' ? styles.userMessage : styles.aiMessage
            ]}
          >
            <Text style={message.sender === 'user' ? styles.userMessageText : styles.aiMessageText}>
              {message.text}
            </Text>
            <Text style={message.sender === 'user' ? styles.userMessageTime : styles.aiMessageTime}>
              {formatTime(message.timestamp)}
            </Text>
          </View>
        ))}
        
        {isTyping && (
          <View style={styles.typingIndicator}>
            <View style={styles.typingDot} />
            <View style={[styles.typingDot, { animationDelay: '0.1s' }]} />
            <View style={[styles.typingDot, { animationDelay: '0.2s' }]} />
          </View>
        )}
        <View ref={messagesEndRef} />
      </ScrollView>

      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.messageInput}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Share what's on your mind..."
          placeholderTextColor="#9ca3af"
          multiline
        />
        <TouchableOpacity
          onPress={handleSendMessage}
          style={styles.sendButton}
        >
          <Send stroke="white" width={20} height={20} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSelfHelpTab = () => {
    if (!selectedExercise) {
      return (
        <ScrollView style={styles.tabContent}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Self-Care Tools</Text>
            <Text style={styles.sectionSubtitle}>Take a moment to care for yourself</Text>
          </View>

          <View style={styles.toolsGrid}>
            {selfHelpTools.map((tool) => {
              const IconComponent = tool.icon;
              return (
                <TouchableOpacity
                  key={tool.id}
                  onPress={() => handleToolSelect(tool.id)}
                  style={[styles.toolCard, { backgroundColor: tool.gradient[0] }]}
                >
                  <IconComponent stroke="white" width={32} height={32} />
                  <Text style={styles.toolTitle}>{tool.title}</Text>
                  <Text style={styles.toolDescription}>{tool.description}</Text>
                  <View style={styles.toolDuration}>
                    <Text style={styles.toolDurationText}>{tool.duration}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Calming Audio */}
          <View style={styles.audioSection}>
            <View style={styles.sectionHeader}>
              <Headphones stroke="#7e22ce" width={24} height={24} />
              <Text style={styles.sectionTitle}>Calming Sounds</Text>
            </View>
            <View style={styles.audioList}>
              {audioTracks.map((track) => (
                <View key={track.id} style={styles.audioTrack}>
                  <TouchableOpacity
                    onPress={() => setAudioPlaying(audioPlaying === track.id ? null : track.id)}
                    style={styles.playButton}
                  >
                    {audioPlaying === track.id ? 
                      <Pause stroke="#7e22ce" width={16} height={16} /> : 
                      <Play stroke="#7e22ce" width={16} height={16} />
                    }
                  </TouchableOpacity>
                  <View style={styles.trackInfo}>
                    <Text style={styles.trackTitle}>{track.title}</Text>
                    <Text style={styles.trackDuration}>{track.duration}</Text>
                  </View>
                  <Volume2 stroke="#9ca3af" width={16} height={16} />
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      );
    } else if (selectedExercise === 'breathing') {
      return (
        <View style={styles.exerciseContainer}>
          <TouchableOpacity
            onPress={() => setSelectedExercise(null)}
            style={styles.backButton}
          >
            <ArrowLeft stroke="#7e22ce" width={20} height={20} />
            <Text style={styles.backButtonText}>Back to tools</Text>
          </TouchableOpacity>
          
          <Text style={styles.exerciseTitle}>4-7-8 Breathing</Text>
          <Text style={styles.exerciseSubtitle}>Follow the circle to regulate your breathing</Text>
          
          <Animated.View 
            style={[
              styles.breathingCircle,
              { 
                transform: [{ scale: scaleAnim }],
                borderColor: breathingPhase === 'inhale' ? '#60a5fa' :
                           breathingPhase === 'hold' ? '#fbbf24' : '#4ade80'
              }
            ]}
          >
            <View style={styles.breathingContent}>
              <Text style={styles.breathingPhase}>{breathingPhase}</Text>
              <Text style={styles.breathCount}>Breath {breathCount}</Text>
            </View>
          </Animated.View>
          
          <View style={styles.exerciseControls}>
            <TouchableOpacity
              onPress={() => setBreathingActive(!breathingActive)}
              style={[
                styles.breathingButton,
                breathingActive ? styles.stopButton : styles.startButton
              ]}
            >
              <Text style={styles.breathingButtonText}>
                {breathingActive ? 'Stop Exercise' : 'Start Breathing'}
              </Text>
            </TouchableOpacity>
            
            <Text style={styles.breathingInstructions}>
              Inhale for 4 seconds, hold for 7 seconds, exhale for 8 seconds. 
              This helps activate your parasympathetic nervous system.
            </Text>
          </View>
        </View>
      );
    } else if (selectedExercise === 'journaling') {
      return (
        <ScrollView style={styles.journalContainer}>
          <TouchableOpacity
            onPress={() => setSelectedExercise(null)}
            style={styles.backButton}
          >
            <ArrowLeft stroke="#7e22ce" width={20} height={20} />
            <Text style={styles.backButtonText}>Back to tools</Text>
          </TouchableOpacity>
          
          <View style={styles.journalHeader}>
            <PenTool stroke="#7e22ce" width={24} height={24} />
            <Text style={styles.journalTitle}>Emotion Journal</Text>
          </View>
          <Text style={styles.journalSubtitle}>Writing can help you process your feelings</Text>
          
          <View style={styles.journalPrompt}>
            <Text style={styles.promptLabel}>Today's Prompt:</Text>
            <Text style={styles.promptText}>
              "{journalPrompts[Math.floor(Math.random() * journalPrompts.length)]}"
            </Text>
          </View>
          
          <TextInput
            style={styles.journalInput}
            value={journalEntry}
            onChangeText={setJournalEntry}
            placeholder="Start writing your thoughts here..."
            placeholderTextColor="#9ca3af"
            multiline
            numberOfLines={10}
          />
          
          <View style={styles.journalFooter}>
            <Text style={styles.characterCount}>
              {journalEntry.length} characters
            </Text>
            <TouchableOpacity style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save Entry</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      );
    } else {
      return (
        <View style={styles.exerciseContainer}>
          <TouchableOpacity
            onPress={() => setSelectedExercise(null)}
            style={styles.backButton}
          >
            <ArrowLeft stroke="#7e22ce" width={20} height={20} />
            <Text style={styles.backButtonText}>Back to tools</Text>
          </TouchableOpacity>
          <Text style={styles.exerciseSubtitle}>Exercise content for {selectedExercise}</Text>
        </View>
      );
    }
  };

  const renderProfessionalsTab = () => (
    <ScrollView style={styles.tabContent}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Professional Support</Text>
        <Text style={styles.sectionSubtitle}>Connect with licensed therapists and counselors</Text>
      </View>

      <View style={styles.professionalsList}>
        {professionals.map((professional) => (
          <View key={professional.id} style={styles.professionalCard}>
            <View style={styles.professionalHeader}>
              <View style={[styles.professionalAvatar, { backgroundColor: professional.gradient[0] }]}>
                <User stroke="white" width={24} height={24} />
              </View>
              <View style={styles.professionalInfo}>
                <View style={styles.professionalName}>
                  <Text style={styles.professionalNameText}>{professional.name}</Text>
                  {professional.verified && <CheckCircle stroke="#3b82f6" width={16} height={16} />}
                </View>
                <Text style={styles.professionalSpecialty}>{professional.specialty}</Text>
                <View style={styles.professionalMeta}>
                  <View style={styles.ratingContainer}>
                    <Star stroke="#fbbf24" width={12} height={12} />
                    <Text style={styles.ratingText}>{professional.rating} ({professional.reviews})</Text>
                  </View>
                  <View style={styles.experienceContainer}>
                    <Award stroke="#7e22ce" width={12} height={12} />
                    <Text style={styles.experienceText}>{professional.experience}</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.professionalDetails}>
              <View style={styles.availabilityContainer}>
                <Clock stroke="#10b981" width={16} height={16} />
                <Text style={styles.availabilityText}>{professional.availability}</Text>
                <Text style={styles.priceText}>{professional.price}</Text>
              </View>

              <View style={styles.languagesContainer}>
                <MapPin stroke="#6b7280" width={12} height={12} />
                <Text style={styles.languagesText}>Languages: {professional.languages.join(', ')}</Text>
              </View>

              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.messageButton}>
                  <MessageCircle stroke="white" width={16} height={16} />
                  <Text style={styles.messageButtonText}>Message</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bookButton}>
                  <Video stroke="#7e22ce" width={16} height={16} />
                  <Text style={styles.bookButtonText}>Book Call</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* Crisis Support Banner */}
      <View style={styles.crisisBanner}>
        <View style={styles.crisisHeader}>
          <Phone stroke="white" width={20} height={20} />
          <Text style={styles.crisisTitle}>Crisis Support Available 24/7</Text>
        </View>
        <Text style={styles.crisisText}>
          If you're in immediate danger or having thoughts of self-harm, please reach out immediately.
        </Text>
        <View style={styles.crisisButtons}>
          <TouchableOpacity style={styles.emergencyButton}>
            <Text style={styles.emergencyButtonText}>Emergency: 911</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.textButton}>
            <Text style={styles.textButtonText}>Crisis Text: 741741</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity>
            <ArrowLeft stroke="#4b5563" width={24} height={24} />
          </TouchableOpacity>
          <View style={styles.headerTitle}>
            <Heart stroke="#ec4899" width={24} height={24} />
            <Text style={styles.headerTitleText}>Support Hub</Text>
          </View>
          <Shield stroke="#7e22ce" width={20} height={20} />
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          onPress={() => setActiveTab('companion')}
          style={[styles.tabButton, activeTab === 'companion' && styles.activeTab]}
        >
          <Text style={[styles.tabText, activeTab === 'companion' && styles.activeTabText]}>
            AI Companion
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('selfhelp')}
          style={[styles.tabButton, activeTab === 'selfhelp' && styles.activeTab]}
        >
          <Text style={[styles.tabText, activeTab === 'selfhelp' && styles.activeTabText]}>
            Self-Help
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('professionals')}
          style={[styles.tabButton, activeTab === 'professionals' && styles.activeTab]}
        >
          <Text style={[styles.tabText, activeTab === 'professionals' && styles.activeTabText]}>
            Professionals
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {activeTab === 'companion' && renderCompanionTab()}
        {activeTab === 'selfhelp' && renderSelfHelpTab()}
        {activeTab === 'professionals' && renderProfessionalsTab()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f3ff'
  },
  header: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderBottomWidth: 1,
    borderBottomColor: '#e9d5ff',
    paddingTop: Platform.OS === 'android' ? 16 : 0
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  headerTitleText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937'
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderBottomWidth: 1,
    borderBottomColor: '#e9d5ff'
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#7e22ce'
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280'
  },
  activeTabText: {
    color: '#7e22ce'
  },
  content: {
    flex: 1,
    paddingBottom: Platform.OS === 'ios' ? 80 : 60
  },
  chatContainer: {
    flex: 1
  },
  chatHeader: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e9d5ff'
  },
  chatHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12
  },
  aiAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#a78bfa',
    justifyContent: 'center',
    alignItems: 'center'
  },
  aiName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937'
  },
  aiStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10b981'
  },
  statusText: {
    fontSize: 12,
    color: '#6b7280'
  },
  disclaimer: {
    backgroundColor: '#ede9fe',
    borderRadius: 8,
    padding: 12
  },
  disclaimerText: {
    fontSize: 12,
    color: '#7e22ce'
  },
  messagesContainer: {
    flex: 1,
    padding: 16
  },
  messagesContent: {
    paddingBottom: 16
  },
  messageBubble: {
    maxWidth: '80%',
    borderRadius: 16,
    padding: 12,
    marginBottom: 8
  },
  aiMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    borderBottomLeftRadius: 4
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#7e22ce',
    borderBottomRightRadius: 4
  },
  aiMessageText: {
    fontSize: 14,
    color: '#1f2937'
  },
  userMessageText: {
    fontSize: 14,
    color: 'white'
  },
  aiMessageTime: {
    fontSize: 10,
    color: '#6b7280',
    marginTop: 4,
    textAlign: 'right'
  },
  userMessageTime: {
    fontSize: 10,
    color: '#e9d5ff',
    marginTop: 4,
    textAlign: 'right'
  },
  typingIndicator: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginBottom: 8
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#6b7280',
    marginHorizontal: 2
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderTopWidth: 1,
    borderTopColor: '#e9d5ff'
  },
  messageInput: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#e9d5ff'
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#7e22ce',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8
  },
  tabContent: {
    flex: 1,
    padding: 16
  },
  sectionHeader: {
    alignItems: 'center',
    marginBottom: 24
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6b7280'
  },
  toolsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24
  },
  toolCard: {
    width: '48%',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  toolTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginTop: 8
  },
  toolDescription: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 4,
    marginBottom: 8
  },
  toolDuration: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start'
  },
  toolDurationText: {
    fontSize: 10,
    color: 'white'
  },
  audioSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e9d5ff'
  },
  audioList: {
    marginTop: 12
  },
  audioTrack: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8
  },
  playButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e9d5ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },
  trackInfo: {
    flex: 1
  },
  trackTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937'
  },
  trackDuration: {
    fontSize: 12,
    color: '#6b7280'
  },
  exerciseContainer: {
    flex: 1,
    padding: 24,
    alignItems: 'center'
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 24
  },
  backButtonText: {
    fontSize: 14,
    color: '#7e22ce',
    marginLeft: 4
  },
  exerciseTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8
  },
  exerciseSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 24,
    textAlign: 'center'
  },
  breathingCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24
  },
  breathingContent: {
    alignItems: 'center'
  },
  breathingPhase: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    textTransform: 'capitalize'
  },
  breathCount: {
    fontSize: 12,
    color: '#6b7280'
  },
  exerciseControls: {
    alignItems: 'center'
  },
  breathingButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    marginBottom: 16
  },
  startButton: {
    backgroundColor: '#7e22ce'
  },
  stopButton: {
    backgroundColor: '#ef4444'
  },
  breathingButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white'
  },
  breathingInstructions: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    maxWidth: 300
  },
  journalContainer: {
    flex: 1,
    padding: 16
  },
  journalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  journalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginLeft: 8
  },
  journalSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16
  },
  journalPrompt: {
    backgroundColor: '#ede9fe',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16
  },
  promptLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#7e22ce',
    marginBottom: 4
  },
  promptText: {
    fontSize: 14,
    color: '#7e22ce',
    fontStyle: 'italic'
  },
  journalInput: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e9d5ff',
    fontSize: 14,
    textAlignVertical: 'top',
    minHeight: 200
  },
  journalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16
  },
  characterCount: {
    fontSize: 12,
    color: '#6b7280'
  },
  saveButton: {
    backgroundColor: '#7e22ce',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white'
  },
  professionalsList: {
    marginBottom: 16
  },
  professionalCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e9d5ff'
  },
  professionalHeader: {
    flexDirection: 'row',
    marginBottom: 12
  },
  professionalAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },
  professionalInfo: {
    flex: 1
  },
  professionalName: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4
  },
  professionalNameText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginRight: 4
  },
  professionalSpecialty: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8
  },
  professionalMeta: {
    flexDirection: 'row',
    gap: 16
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  ratingText: {
    fontSize: 12,
    color: '#6b7280'
  },
  experienceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  experienceText: {
    fontSize: 12,
    color: '#6b7280'
  },
  professionalDetails: {
    marginTop: 12
  },
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  availabilityText: {
    fontSize: 14,
    color: '#10b981',
    fontWeight: '500',
    flex: 1,
    marginLeft: 8
  },
  priceText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7e22ce'
  },
  languagesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 12
  },
  languagesText: {
    fontSize: 12,
    color: '#6b7280'
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8
  },
  messageButton: {
    flex: 1,
    backgroundColor: '#7e22ce',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8
  },
  messageButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white'
  },
  bookButton: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#7e22ce',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8
  },
  bookButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#7e22ce'
  },
  crisisBanner: {
    backgroundColor: '#ef4444',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16
  },
  crisisHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8
  },
  crisisTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white'
  },
  crisisText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 12
  },
  crisisButtons: {
    flexDirection: 'row',
    gap: 8
  },
  emergencyButton: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12
  },
  emergencyButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ef4444',
    textAlign: 'center'
  },
  textButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 12
  },
  textButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center'
  }
});

export default EmotionalSupportHub;