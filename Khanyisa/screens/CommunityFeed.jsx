import React, { useState, useRef } from 'react';
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
  Alert,
} from 'react-native';

import { 
  Heart,
  MessageCircle,
  Play,
  Pause,
  Volume2,
  VolumeX,
  User,
  CheckCircle as Verified,
  X,
  Send,
  Share,
  Bookmark
} from 'react-native-feather';



const { width, height } = Dimensions.get('window');

const CommunityFeed = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState({});
  const [likedVideos, setLikedVideos] = useState(new Set());
  const [savedVideos, setSavedVideos] = useState(new Set());
  const [isDarkMode, setIsDarkMode] = useState(true); // Feed is typically dark
  const videoRef = useRef(null);

const panResponder = useRef(
  PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) => {
      return Math.abs(gestureState.dy) > Math.abs(gestureState.dx);
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dy < -50) {
        if (currentVideoIndex < videos.length - 1) {
          setCurrentVideoIndex(prev => prev + 1);
          setIsPlaying(true);
        }
      } else if (gestureState.dy > 50) {
        if (currentVideoIndex > 0) {
          setCurrentVideoIndex(prev => prev - 1);
          setIsPlaying(true);
        }
      }
    }
  })
).current;

  const videos = [
    {
      id: 1,
      title: "5 Signs of Financial Abuse & How to Escape",
      creator: "SafetyAdvocate_Sarah",
      verified: true,
      duration: "2:34",
      likes: 15420,
      comments: 847,
      description: "Learn to recognize financial abuse patterns and discover practical steps to regain your financial independence.",
      tags: ["#FinancialAbuse", "#WomenSafety", "#Empowerment"],
      videoPlaceholder: "🎥 Financial Safety Tips Video"
    },
    {
      id: 2,
      title: "From Survivor to CEO: My Journey",
      creator: "EntrepreneurMia",
      verified: true,
      duration: "4:12",
      likes: 28750,
      comments: 1243,
      description: "How I turned my pain into purpose and built a million-dollar business.",
      tags: ["#SurvivorToCEO", "#WomenInBusiness"],
      videoPlaceholder: "🎥 Success Story Video"
    },
    {
      id: 3,
      title: "Self-Defense Techniques Every Woman Should Know",
      creator: "DefenseTrainer_Alex",
      verified: true,
      duration: "3:45",
      likes: 34567,
      comments: 2109,
      description: "Quick and effective self-defense moves that could save your life.",
      tags: ["#SelfDefense", "#WomenSafety"],
      videoPlaceholder: "🎥 Self-Defense Tutorial"
    },
    {
      id: 4,
      title: "Building Confidence After Trauma",
      creator: "TherapistDr_Lisa",
      verified: true,
      duration: "6:21",
      likes: 19834,
      comments: 1567,
      description: "Practical tips for rebuilding self-confidence after trauma.",
      tags: ["#TraumaRecovery", "#Confidence"],
      videoPlaceholder: "🎥 Mental Health Support"
    },
    {
      id: 5,
      title: "Starting Your First Business with $100",
      creator: "SmallBiz_Queen",
      verified: false,
      duration: "5:33",
      likes: 12456,
      comments: 789,
      description: "How I launched my business with just $100 and grew it to 6 figures.",
      tags: ["#SmallBusiness", "#Entrepreneurship"],
      videoPlaceholder: "🎥 Business Tutorial"
    }
  ];

  const currentVideo = videos[currentVideoIndex];

  const handleLike = () => {
    const videoId = currentVideo.id;
    if (likedVideos.has(videoId)) {
      setLikedVideos(prev => {
        const newSet = new Set(prev);
        newSet.delete(videoId);
        return newSet;
      });
    } else {
      setLikedVideos(prev => new Set(prev).add(videoId));
      // Show a brief confirmation
      Alert.alert("💜", "Video liked! Supporting our community creators.", [{ text: "OK" }]);
    }
  };

  const handleSave = () => {
    const videoId = currentVideo.id;
    if (savedVideos.has(videoId)) {
      setSavedVideos(prev => {
        const newSet = new Set(prev);
        newSet.delete(videoId);
        return newSet;
      });
      Alert.alert("📱", "Video removed from saved", [{ text: "OK" }]);
    } else {
      setSavedVideos(prev => new Set(prev).add(videoId));
      Alert.alert("📱", "Video saved for later!", [{ text: "OK" }]);
    }
  };

  const handleShare = () => {
    Alert.alert(
      "Share Video", 
      `Share "${currentVideo.title}" with your safety network?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Share", onPress: () => Alert.alert("✅", "Video shared with your safety contacts!") }
      ]
    );
  };

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      const newComment = {
        id: Date.now(),
        author: "You",
        text: comment,
        time: "Just now"
      };
      
      setComments(prev => ({
        ...prev,
        [currentVideo.id]: [...(prev[currentVideo.id] || []), newComment]
      }));
      
      setComment('');
      Alert.alert("💬", "Your supportive comment has been added!", [{ text: "OK" }]);
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Video Display Area */}
      <View 
        style={styles.videoContainer}
        {...panResponder.panHandlers}
      >
        {/* Video Placeholder */}
        <View style={styles.videoPlaceholder}>
          <Text style={styles.videoPlaceholderText}>
            {currentVideo.videoPlaceholder}
          </Text>
          <Text style={styles.videoPlaceholderSubtext}>
            Swipe up/down to navigate • Tap to play/pause
          </Text>
        </View>
        
        <View style={styles.videoOverlay}>
          <TouchableOpacity
            onPress={() => setIsPlaying(!isPlaying)}
            style={styles.playPauseButton}
          >
            {isPlaying ? (
              <Pause stroke="white" width={30} height={30} />
            ) : (
              <Play stroke="white" width={30} height={30} />
            )}
          </TouchableOpacity>
        </View>

        {/* Mute Button */}
        <TouchableOpacity
          onPress={() => setIsMuted(!isMuted)}
          style={styles.muteButton}
        >
          {isMuted ? (
            <VolumeX stroke="white" width={20} height={20} />
          ) : (
            <Volume2 stroke="white" width={20} height={20} />
          )}
        </TouchableOpacity>

        {/* Video Info Overlay */}
        <View style={styles.videoInfoOverlay}>
          <View style={styles.videoInfoContent}>
            {/* Creator Info */}
            <View style={styles.creatorInfo}>
              <View style={styles.creatorAvatar}>
                <User stroke="white" width={20} height={20} />
              </View>
              <View style={styles.creatorDetails}>
                <View style={styles.creatorName}>
                  <Text style={styles.creatorNameText}>{currentVideo.creator}</Text>
                  {currentVideo.verified && (
                    <Verified stroke="#60a5fa" width={16} height={16} />
                  )}
                </View>
                <Text style={styles.videoDuration}>{currentVideo.duration}</Text>
              </View>
            </View>

            {/* Video Description */}
            <View style={styles.videoDescription}>
              <Text style={styles.videoTitle}>{currentVideo.title}</Text>
              <Text style={styles.videoDescriptionText}>
                {currentVideo.description}
              </Text>
              <View style={styles.tagsContainer}>
                {currentVideo.tags.map((tag, index) => (
                  <Text key={index} style={styles.tagText}>{tag}</Text>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* Side Actions */}
        <View style={styles.sideActions}>
          <View style={styles.actionItem}>
            <TouchableOpacity
              onPress={handleLike}
              style={[
                styles.actionButton,
                likedVideos.has(currentVideo.id) && styles.actionButtonLiked
              ]}
            >
              <Heart 
                stroke={likedVideos.has(currentVideo.id) ? "#ec4899" : "white"} 
                fill={likedVideos.has(currentVideo.id) ? "#ec4899" : "transparent"}
                width={24} 
                height={24} 
              />
            </TouchableOpacity>
            <Text style={styles.actionCount}>{formatNumber(currentVideo.likes)}</Text>
          </View>

          <View style={styles.actionItem}>
            <TouchableOpacity
              onPress={() => setShowComments(true)}
              style={styles.actionButton}
            >
              <MessageCircle stroke="white" width={24} height={24} />
            </TouchableOpacity>
            <Text style={styles.actionCount}>{currentVideo.comments}</Text>
          </View>

          <View style={styles.actionItem}>
            <TouchableOpacity
              onPress={handleSave}
              style={[
                styles.actionButton,
                savedVideos.has(currentVideo.id) && styles.actionButtonSaved
              ]}
            >
              <Bookmark 
                stroke={savedVideos.has(currentVideo.id) ? "#fbbf24" : "white"} 
                fill={savedVideos.has(currentVideo.id) ? "#fbbf24" : "transparent"}
                width={24} 
                height={24} 
              />
            </TouchableOpacity>
            <Text style={styles.actionCount}>Save</Text>
          </View>

          <View style={styles.actionItem}>
            <TouchableOpacity
              onPress={handleShare}
              style={styles.actionButton}
            >
              <Share stroke="white" width={24} height={24} />
            </TouchableOpacity>
            <Text style={styles.actionCount}>Share</Text>
          </View>
        </View>

        {/* Video Navigation Indicator */}
        <View style={styles.videoIndicator}>
          <Text style={styles.videoIndicatorText}>
            {currentVideoIndex + 1} / {videos.length}
          </Text>
        </View>
      </View>

      {/* Comments Modal */}
      <Modal
        visible={showComments}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowComments(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.commentsModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Comments ({currentVideo.comments})</Text>
              <TouchableOpacity
                onPress={() => setShowComments(false)}
                style={styles.closeButton}
              >
                <X stroke="#6b7280" width={20} height={20} />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.commentsList}>
              {/* Sample Comments */}
              <View style={styles.commentItem}>
                <View style={styles.commentAvatar}>
                  <User stroke="white" width={16} height={16} />
                </View>
                <View style={styles.commentContent}>
                  <View style={styles.commentHeader}>
                    <Text style={styles.commentAuthor}>@empowered_woman</Text>
                    <Text style={styles.commentTime}>2h ago</Text>
                  </View>
                  <Text style={styles.commentText}>This is so helpful! Thank you for sharing your story 💜</Text>
                </View>
              </View>

              <View style={styles.commentItem}>
                <View style={styles.commentAvatar}>
                  <User stroke="white" width={16} height={16} />
                </View>
                <View style={styles.commentContent}>
                  <View style={styles.commentHeader}>
                    <Text style={styles.commentAuthor}>@safe_sister</Text>
                    <Text style={styles.commentTime}>1h ago</Text>
                  </View>
                  <Text style={styles.commentText}>You're so strong! This gives me hope 🌟</Text>
                </View>
              </View>
              
              {/* User-submitted comments */}
              {(comments[currentVideo.id] || []).map(comment => (
                <View key={comment.id} style={styles.commentItem}>
                  <View style={styles.commentAvatar}>
                    <User stroke="white" width={16} height={16} />
                  </View>
                  <View style={styles.commentContent}>
                    <View style={styles.commentHeader}>
                      <Text style={styles.commentAuthor}>{comment.author}</Text>
                      <Text style={styles.commentTime}>{comment.time}</Text>
                    </View>
                    <Text style={styles.commentText}>{comment.text}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
            
            <View style={styles.commentInputContainer}>
              <View style={styles.commentInputWrapper}>
                <TextInput
                  style={styles.commentInput}
                  value={comment}
                  onChangeText={setComment}
                  placeholder="Add a supportive comment..."
                  placeholderTextColor="#9ca3af"
                />
                <TouchableOpacity 
                  onPress={handleCommentSubmit}
                  style={styles.sendButton}
                  disabled={!comment.trim()}
                >
                  <Send stroke="white" width={16} height={16} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>

     
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  videoContainer: {
    flex: 1,
    position: 'relative',
  },
  videoPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1f2937',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  videoPlaceholderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12,
  },
  videoPlaceholderSubtext: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    textAlign: 'center',
  },
  videoOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playPauseButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  muteButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 8,
    borderRadius: 20,
  },
  videoInfoOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 48,
    paddingBottom: 100,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  videoInfoContent: {
    paddingHorizontal: 16,
  },
  creatorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  creatorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#9333ea',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  creatorDetails: {
    flex: 1,
  },
  creatorName: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  creatorNameText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  videoDuration: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
  },
  videoDescription: {
    marginBottom: 16,
  },
  videoTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  videoDescriptionText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tagText: {
    color: '#d8b4fe',
    fontSize: 14,
  },
  sideActions: {
    position: 'absolute',
    right: 16,
    bottom: 180,
    gap: 20,
  },
  actionItem: {
    alignItems: 'center',
  },
  actionButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    padding: 12,
  },
  actionButtonLiked: {
    backgroundColor: 'rgba(236, 72, 153, 0.3)',
  },
  actionButtonSaved: {
    backgroundColor: 'rgba(251, 191, 36, 0.3)',
  },
  actionCount: {
    color: 'white',
    fontSize: 12,
    marginTop: 4,
  },
  videoIndicator: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  videoIndicatorText: {
    color: 'white',
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'flex-end',
  },
  commentsModal: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  closeButton: {
    padding: 4,
  },
  commentsList: {
    flex: 1,
    padding: 16,
  },
  commentItem: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  commentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#9333ea',
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  commentAuthor: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  commentTime: {
    fontSize: 12,
    color: '#9ca3af',
  },
  commentText: {
    fontSize: 14,
    color: '#4b5563',
  },
  commentInputContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  commentInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
  },
  sendButton: {
    backgroundColor: '#9333ea',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CommunityFeed;