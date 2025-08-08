import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Modal, 
  TextInput, 
  StyleSheet, 
  Image,
  Platform,
  SafeAreaView,
  FlatList,
  Switch
} from 'react-native';
import { 
  Shield, 
  MapPin, 
  Users, 
  Camera, 
  Eye, 
  AlertTriangle, 
  Send, 
  Plus, 
  X, 
  User, 
  Clock, 
  Bell 
} from 'react-native-feather';

const CommunityWatchHub = () => {
  const [activeTab, setActiveTab] = useState('reports');
  const [showReportModal, setShowReportModal] = useState(false);
  const [showSketchModal, setShowSketchModal] = useState(false);
  const [reportForm, setReportForm] = useState({
    type: 'suspicious',
    description: '',
    location: '',
    urgency: 'medium',
    anonymous: true
  });
  const [sketchDescription, setSketchDescription] = useState('');
  const [generatedSketch, setGeneratedSketch] = useState(null);
  const [isGeneratingSketch, setIsGeneratingSketch] = useState(false);

  const reports = [
    {
      id: 1,
      type: 'suspicious',
      location: 'Main Street & 5th Ave',
      time: '2 hours ago',
      description: 'Person following women near bus stop',
      urgency: 'high',
      hasSketch: true
    },
    {
      id: 2,
      type: 'incident',
      location: 'Central Park Area',
      time: '5 hours ago',
      description: 'Attempted approach of child at playground',
      urgency: 'high',
      hasSketch: false
    },
    {
      id: 3,
      type: 'suspicious',
      location: 'University District',
      time: '1 day ago',
      description: 'Vehicle circling residential area repeatedly',
      urgency: 'medium',
      hasSketch: false
    }
  ];

  const handleGenerateSketch = async () => {
    if (!sketchDescription.trim()) return;
    
    setIsGeneratingSketch(true);
    
    // Simulate AI sketch generation
    setTimeout(() => {
      setGeneratedSketch({
        description: sketchDescription,
        confidence: 85,
        timestamp: new Date().toISOString()
      });
      setIsGeneratingSketch(false);
    }, 3000);
  };

  const handleSubmitReport = () => {
    console.log('Submitting report:', { ...reportForm, sketch: generatedSketch });
    setShowReportModal(false);
    setShowSketchModal(false);
    setReportForm({
      type: 'suspicious',
      description: '',
      location: '',
      urgency: 'medium',
      anonymous: true
    });
    setSketchDescription('');
    setGeneratedSketch(null);
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return { color: '#ef4444', backgroundColor: '#fef2f2' };
      case 'medium': return { color: '#f97316', backgroundColor: '#fff7ed' };
      case 'low': return { color: '#22c55e', backgroundColor: '#f0fdf4' };
      default: return { color: '#6b7280', backgroundColor: '#f9fafb' };
    }
  };

  const renderReportItem = ({ item }) => {
    const urgencyStyles = getUrgencyColor(item.urgency);
    
    return (
      <View style={styles.reportCard}>
        <View style={styles.reportHeader}>
          <View style={styles.reportTypeContainer}>
            <AlertTriangle width={16} height={16} color="#f97316" />
            <Text style={styles.reportTypeText}>{item.type} Activity</Text>
            {item.hasSketch && (
              <View style={styles.sketchBadge}>
                <Text style={styles.sketchBadgeText}>AI Sketch</Text>
              </View>
            )}
          </View>
          <View style={[styles.urgencyBadge, { backgroundColor: urgencyStyles.backgroundColor }]}>
            <Text style={[styles.urgencyText, { color: urgencyStyles.color }]}>
              {item.urgency}
            </Text>
          </View>
        </View>
        
        <Text style={styles.reportDescription}>{item.description}</Text>
        
        <View style={styles.reportFooter}>
          <View style={styles.reportFooterItem}>
            <MapPin width={12} height={12} color="#6b7280" />
            <Text style={styles.reportFooterText}>{item.location}</Text>
          </View>
          <View style={styles.reportFooterItem}>
            <Clock width={12} height={12} color="#6b7280" />
            <Text style={styles.reportFooterText}>{item.time}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerTitleContainer}>
            <Shield width={24} height={24} color="#9333ea" />
            <Text style={styles.headerTitle}>Community Watch</Text>
          </View>
          <Bell width={20} height={20} color="#4b5563" />
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'reports' && styles.activeTab]}
          onPress={() => setActiveTab('reports')}
        >
          <Text style={[styles.tabText, activeTab === 'reports' && styles.activeTabText]}>
            Recent Reports
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'map' && styles.activeTab]}
          onPress={() => setActiveTab('map')}
        >
          <Text style={[styles.tabText, activeTab === 'map' && styles.activeTabText]}>
            Safety Map
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'community' && styles.activeTab]}
          onPress={() => setActiveTab('community')}
        >
          <Text style={[styles.tabText, activeTab === 'community' && styles.activeTabText]}>
            Community
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content Area */}
      <ScrollView style={styles.contentContainer}>
        {activeTab === 'reports' && (
          <View style={styles.tabContent}>
            <View style={styles.reportsHeader}>
              <Text style={styles.sectionTitle}>Recent Reports</Text>
              <Text style={styles.reportCount}>{reports.length} active</Text>
            </View>
            
            <FlatList
              data={reports}
              renderItem={renderReportItem}
              keyExtractor={item => item.id.toString()}
              scrollEnabled={false}
              ItemSeparatorComponent={() => <View style={styles.reportSeparator} />}
            />
          </View>
        )}

        {activeTab === 'map' && (
          <View style={styles.tabContent}>
            <View style={styles.mapPlaceholder}>
              <MapPin width={48} height={48} color="#9333ea" />
              <Text style={styles.mapTitle}>Interactive Safety Map</Text>
              <Text style={styles.mapDescription}>
                View incident reports and safety alerts in your area on an interactive map.
              </Text>
              <View style={styles.mapFeatures}>
                <Text style={styles.featuresTitle}>Map Features:</Text>
                <View style={styles.featureItem}>
                  <Text style={styles.featureText}>• Heat map of incident reports</Text>
                </View>
                <View style={styles.featureItem}>
                  <Text style={styles.featureText}>• Safe zone markers</Text>
                </View>
                <View style={styles.featureItem}>
                  <Text style={styles.featureText}>• Real-time location sharing</Text>
                </View>
                <View style={styles.featureItem}>
                  <Text style={styles.featureText}>• Community patrol routes</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {activeTab === 'community' && (
          <View style={styles.tabContent}>
            <View style={styles.communityPlaceholder}>
              <Users width={48} height={48} color="#22c55e" />
              <Text style={styles.communityTitle}>Community Network</Text>
              <Text style={styles.communityDescription}>
                Connect with local safety volunteers and community watch groups.
              </Text>
              <View style={styles.communityStats}>
                <Text style={styles.statsTitle}>Community Stats:</Text>
                <View style={styles.statsContainer}>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>247</Text>
                    <Text style={styles.statLabel}>Active Members</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>15</Text>
                    <Text style={styles.statLabel}>Watch Groups</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setShowReportModal(true)}
      >
        <Plus width={24} height={24} color="white" />
      </TouchableOpacity>

      {/* Report Modal */}
      <Modal
        visible={showReportModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowReportModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Submit Report</Text>
              <TouchableOpacity onPress={() => setShowReportModal(false)}>
                <X width={20} height={20} color="#6b7280" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalContent}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Report Type</Text>
                <View style={styles.selectInput}>
                  <Text style={styles.selectText}>{reportForm.type.charAt(0).toUpperCase() + reportForm.type.slice(1)}</Text>
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Description</Text>
                <TextInput
                  style={[styles.textInput, styles.textArea]}
                  value={reportForm.description}
                  onChangeText={(text) => setReportForm({...reportForm, description: text})}
                  placeholder="Describe what happened or what you observed..."
                  placeholderTextColor="#9ca3af"
                  multiline
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Location</Text>
                <TextInput
                  style={styles.textInput}
                  value={reportForm.location}
                  onChangeText={(text) => setReportForm({...reportForm, location: text})}
                  placeholder="Street address or landmark"
                  placeholderTextColor="#9ca3af"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Urgency Level</Text>
                <View style={styles.urgencyButtons}>
                  {['low', 'medium', 'high'].map((level) => (
                    <TouchableOpacity
                      key={level}
                      style={[
                        styles.urgencyButton,
                        reportForm.urgency === level && {
                          backgroundColor: getUrgencyColor(level).backgroundColor
                        }
                      ]}
                      onPress={() => setReportForm({...reportForm, urgency: level})}
                    >
                      <Text style={[
                        styles.urgencyButtonText,
                        reportForm.urgency === level && {
                          color: getUrgencyColor(level).color
                        }
                      ]}>
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.anonymousToggle}>
                <View style={styles.toggleContent}>
                  <User width={20} height={20} color="#3b82f6" />
                  <Text style={styles.toggleText}>Submit Anonymously</Text>
                </View>
                <Switch
                  value={reportForm.anonymous}
                  onValueChange={(value) => setReportForm({...reportForm, anonymous: value})}
                  trackColor={{ false: '#e5e7eb', true: '#93c5fd' }}
                  thumbColor={reportForm.anonymous ? '#3b82f6' : '#f3f4f6'}
                />
              </View>

              <TouchableOpacity
                style={styles.sketchButton}
                onPress={() => setShowSketchModal(true)}
              >
                <Camera width={20} height={20} color="#9333ea" />
                <Text style={styles.sketchButtonText}>Add AI Suspect Sketch</Text>
              </TouchableOpacity>

              {generatedSketch && (
                <View style={styles.sketchGenerated}>
                  <View style={styles.sketchGeneratedHeader}>
                    <Eye width={16} height={16} color="#16a34a" />
                    <Text style={styles.sketchGeneratedText}>AI Sketch Generated</Text>
                  </View>
                  <Text style={styles.sketchGeneratedSubtext}>
                    Confidence: {generatedSketch.confidence}% • Ready to attach to report
                  </Text>
                </View>
              )}

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setShowReportModal(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleSubmitReport}
                >
                  <Send width={16} height={16} color="white" />
                  <Text style={styles.submitButtonText}>Submit Report</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* AI Sketch Modal */}
      <Modal
        visible={showSketchModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowSketchModal(false)}
      >
        <View style={styles.sketchModalOverlay}>
          <View style={styles.sketchModalContainer}>
            <View style={styles.sketchModalHeader}>
              <Text style={styles.sketchModalTitle}>AI Suspect Sketch</Text>
              <TouchableOpacity onPress={() => setShowSketchModal(false)}>
                <X width={20} height={20} color="#6b7280" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.sketchModalContent}>
              <View style={styles.sketchFormGroup}>
                <Text style={styles.sketchFormLabel}>Describe the person's appearance</Text>
                <TextInput
                  style={[styles.sketchTextInput, styles.sketchTextArea]}
                  value={sketchDescription}
                  onChangeText={setSketchDescription}
                  placeholder="E.g., Male, mid-30s, short brown hair, pale skin, scar on left cheek, wearing a dark hoodie..."
                  placeholderTextColor="#9ca3af"
                  multiline
                />
              </View>

              <View style={styles.sketchTips}>
                <Text style={styles.sketchTipsTitle}>💡 Helpful Tips:</Text>
                <View style={styles.tipItem}>
                  <Text style={styles.tipText}>• Include age range, gender, and ethnicity</Text>
                </View>
                <View style={styles.tipItem}>
                  <Text style={styles.tipText}>• Mention hair color, style, and length</Text>
                </View>
                <View style={styles.tipItem}>
                  <Text style={styles.tipText}>• Describe facial features (eyes, nose, mouth)</Text>
                </View>
                <View style={styles.tipItem}>
                  <Text style={styles.tipText}>• Note any scars, tattoos, or unique marks</Text>
                </View>
                <View style={styles.tipItem}>
                  <Text style={styles.tipText}>• Include clothing or accessories</Text>
                </View>
              </View>

              {generatedSketch && (
                <View style={styles.sketchPreview}>
                  <View style={styles.sketchImagePlaceholder}>
                    <Camera width={32} height={32} color="#9ca3af" />
                    <Text style={styles.sketchPlaceholderText}>AI-Generated Sketch</Text>
                    <Text style={styles.sketchPlaceholderSubtext}>Based on your description</Text>
                  </View>
                  <Text style={styles.sketchConfidence}>
                    Generation Complete • {generatedSketch.confidence}% Match Confidence
                  </Text>
                </View>
              )}

              <View style={styles.sketchModalButtons}>
                <TouchableOpacity
                  style={styles.sketchCancelButton}
                  onPress={() => setShowSketchModal(false)}
                >
                  <Text style={styles.sketchCancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.sketchGenerateButton,
                    (!sketchDescription.trim() || isGeneratingSketch) && styles.disabledButton
                  ]}
                  onPress={handleGenerateSketch}
                  disabled={!sketchDescription.trim() || isGeneratingSketch}
                >
                  <Text style={styles.sketchGenerateButtonText}>
                    {isGeneratingSketch ? 'Generating...' : 'Generate Sketch'}
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb'
  },
  header: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 16 : 0
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: 480,
    width: '100%',
    marginHorizontal: 'auto',
    paddingVertical: 12
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827'
  },
  tabContainer: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    flexDirection: 'row'
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#9333ea'
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280'
  },
  activeTabText: {
    color: '#9333ea'
  },
  contentContainer: {
    flex: 1,
    maxWidth: 480,
    width: '100%',
    marginHorizontal: 'auto',
    paddingBottom: 80
  },
  tabContent: {
    padding: 16
  },
  reportsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827'
  },
  reportCount: {
    fontSize: 14,
    color: '#6b7280'
  },
  reportCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1
  },
  reportHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  reportTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  reportTypeText: {
    fontSize: 14,
    fontWeight: '500',
    textTransform: 'capitalize'
  },
  sketchBadge: {
    backgroundColor: '#f3e8ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12
  },
  sketchBadgeText: {
    fontSize: 12,
    color: '#9333ea'
  },
  urgencyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12
  },
  urgencyText: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'capitalize'
  },
  reportDescription: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 12
  },
  reportFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  reportFooterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  reportFooterText: {
    fontSize: 12,
    color: '#6b7280'
  },
  reportSeparator: {
    height: 12
  },
  mapPlaceholder: {
    backgroundColor: '#f0f9ff',
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    gap: 16
  },
  mapTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center'
  },
  mapDescription: {
    fontSize: 14,
    color: '#4b5563',
    textAlign: 'center',
    marginBottom: 16
  },
  mapFeatures: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    width: '100%'
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 8
  },
  featureItem: {
    marginBottom: 4
  },
  featureText: {
    fontSize: 14,
    color: '#4b5563'
  },
  communityPlaceholder: {
    backgroundColor: '#f0fdf4',
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    gap: 16
  },
  communityTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center'
  },
  communityDescription: {
    fontSize: 14,
    color: '#4b5563',
    textAlign: 'center',
    marginBottom: 16
  },
  communityStats: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    width: '100%'
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 12
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 16
  },
  statItem: {
    flex: 1
  },
  statValue: {
    fontSize: 20,
    fontWeight: '600',
    color: '#22c55e'
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280'
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#9333ea',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end'
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '80%'
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb'
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827'
  },
  modalContent: {
    padding: 16
  },
  formGroup: {
    marginBottom: 16
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8
  },
  selectInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    width: '100%'
  },
  selectText: {
    fontSize: 16
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16
  },
  textArea: {
    height: 96,
    textAlignVertical: 'top'
  },
  urgencyButtons: {
    flexDirection: 'row',
    gap: 12
  },
  urgencyButton: {
    flex: 1,
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#f3f4f6'
  },
  urgencyButtonText: {
    fontSize: 14,
    fontWeight: '500'
  },
  anonymousToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#eff6ff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16
  },
  toggleContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1e40af'
  },
  sketchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#f3e8ff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16
  },
  sketchButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#9333ea'
  },
  sketchGenerated: {
    backgroundColor: '#f0fdf4',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16
  },
  sketchGeneratedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4
  },
  sketchGeneratedText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#166534'
  },
  sketchGeneratedSubtext: {
    fontSize: 12,
    color: '#166534'
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    paddingTop: 8
  },
  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center'
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151'
  },
  submitButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#9333ea',
    borderRadius: 8,
    padding: 12
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white'
  },
  sketchModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16
  },
  sketchModalContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    width: '100%',
    maxWidth: 480,
    maxHeight: '80%'
  },
  sketchModalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb'
  },
  sketchModalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827'
  },
  sketchModalContent: {
    padding: 16
  },
  sketchFormGroup: {
    marginBottom: 16
  },
  sketchFormLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8
  },
  sketchTextInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16
  },
  sketchTextArea: {
    height: 120,
    textAlignVertical: 'top'
  },
  sketchTips: {
    backgroundColor: '#f5f3ff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16
  },
  sketchTipsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7c3aed',
    marginBottom: 8
  },
  tipItem: {
    marginBottom: 4
  },
  tipText: {
    fontSize: 12,
    color: '#7c3aed'
  },
  sketchPreview: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16
  },
  sketchImagePlaceholder: {
    height: 192,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12
  },
  sketchPlaceholderText: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 8
  },
  sketchPlaceholderSubtext: {
    fontSize: 12,
    color: '#9ca3af'
  },
  sketchConfidence: {
    fontSize: 14,
    fontWeight: '500',
    color: '#16a34a',
    textAlign: 'center'
  },
  sketchModalButtons: {
    flexDirection: 'row',
    gap: 12
  },
  sketchCancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center'
  },
  sketchCancelButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151'
  },
  sketchGenerateButton: {
    flex: 1,
    backgroundColor: '#9333ea',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center'
  },
  disabledButton: {
    backgroundColor: '#d1d5db'
  },
  sketchGenerateButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white'
  }
});

export default CommunityWatchHub;