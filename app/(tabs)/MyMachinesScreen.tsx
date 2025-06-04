import { useNavigation } from 'expo-router';
import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Modal,
  ActivityIndicator,
} from 'react-native';

const VentureLabDashboard = () => {
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: `VentureBot`,
      headerStyle: {
        backgroundColor: '#1a1a2e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    });
  }, [navigation]);

  // Separate chat states for each tab
  const [queryChatMessages, setQueryChatMessages] = useState([
    { 
      id: 1, 
      text: "Welcome to VentureBot Query! 🔍\n\nI help you instantly retrieve data:\n📊 Get startup metrics and intelligence\n🔍 Access meeting history and insights\n📋 Find action items across portfolio\n\nTry: 'Tell me about TechFlow Labs' or 'Show latest metrics'", 
      isBot: true 
    }
  ]);

  const [notifyChatMessages, setNotifyChatMessages] = useState([
    { 
      id: 1, 
      text: "Welcome to VentureBot Notify! 📝\n\nI help you capture and structure:\n📊 Meeting notes and key insights\n🔍 Convert conversations to data\n📋 Log action items and follow-ups\n\nTry: 'Log new meeting' or use voice notes to capture insights", 
      isBot: true 
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [activeTab, setActiveTab] = useState('query');
  const [isRecording, setIsRecording] = useState(false);
  const [processingModal, setProcessingModal] = useState(false);

  // Auto-scroll to bottom function
  const scrollToBottom = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      isBot: false,
      sessionId: 333
    };

    const postedMessage = {
      id: Date.now(),
      chatInput: inputMessage,
      isBot: false,
      sessionId: 333,
      requestType: activeTab // Add requestType based on active tab
    };

    // Update the appropriate chat state
    if (activeTab === 'query') {
      setQueryChatMessages(prev => [...prev, userMessage]);
    } else {
      setNotifyChatMessages(prev => [...prev, userMessage]);
    }
    
    setInputMessage('');
    scrollToBottom(); // Auto-scroll after user message

    // Get bot response
    try {
      const botResponseText = await getBotResponse(postedMessage);
      
      const botResponse = {
        id: Date.now() + 1,
        text: botResponseText,
        isBot: true
      };
      
      // Update the appropriate chat state
      if (activeTab === 'query') {
        setQueryChatMessages(prev => [...prev, botResponse]);
      } else {
        setNotifyChatMessages(prev => [...prev, botResponse]);
      }
      scrollToBottom(); // Auto-scroll after bot response
    } catch (error) {
      console.error('Error getting bot response:', error);
      
      const errorResponse = {
        id: Date.now() + 1,
        text: 'Sorry, I encountered an error. Please try again.',
        isBot: true
      };
      
      // Update the appropriate chat state
      if (activeTab === 'query') {
        setQueryChatMessages(prev => [...prev, errorResponse]);
      } else {
        setNotifyChatMessages(prev => [...prev, errorResponse]);
      }
      scrollToBottom(); // Auto-scroll after error response
    }
  };

  const getBotResponse = async (message) => {
    try {
      const response = await fetch('https://rocketpen.app.n8n.cloud/webhook/7863eb39-faa4-4308-b649-28ad2b6ca676', {
        method: 'POST',
        body: JSON.stringify(message),
        headers: {'Content-Type': 'application/json'}
      });

      const data = await response.json();
      console.log('Response data:', data);
      console.log('Result:', data.result);
      
      return data.result || 'No response received';
      
    } catch (error) {
      console.error('Error:', error);
      return 'Error occurred, please try again';
    }
  };

  const handleVoiceNote = () => {
    if (isRecording) {
      setIsRecording(false);
      setProcessingModal(true);
      
      setTimeout(() => {
        setProcessingModal(false);
        const voiceMessage = {
          id: Date.now(),
          text: "🎤 **Voice Note Captured**\n\nJust finished Series A committee meeting for TechFlow Labs. Key insights:\n\n📊 Revenue exceeded projections - $1.8M ARR\n🤝 Microsoft partnership confirmed\n✅ Committee voted to proceed\n📋 Next steps: Legal terms by May 23",
          isBot: false
        };
        
        if (activeTab === 'query') {
          setQueryChatMessages(prev => [...prev, voiceMessage]);
        } else {
          setNotifyChatMessages(prev => [...prev, voiceMessage]);
        }
        scrollToBottom(); // Auto-scroll after voice message
        
        setTimeout(() => {
          const botResponse = {
            id: Date.now() + 1,
            text: "✅ **Voice Note Processed**\n\n**Structured Data Captured:**\n📅 Meeting: Series A Investment Committee\n💡 Key Insights: Revenue growth, partnerships\n📊 Metrics: $1.8M ARR milestone\n🎯 Decision: Proceed vote recorded\n\n**Added to Company Intelligence**\n\nYour conversation has been converted into structured venture data.",
            isBot: true
          };
          
          if (activeTab === 'query') {
            setQueryChatMessages(prev => [...prev, botResponse]);
          } else {
            setNotifyChatMessages(prev => [...prev, botResponse]);
          }
          scrollToBottom(); // Auto-scroll after bot response
        }, 1500);
      }, 3000);
    } else {
      setIsRecording(true);
    }
  };

  const getCurrentChatMessages = () => {
    return activeTab === 'query' ? queryChatMessages : notifyChatMessages;
  };

  const getChatHeaderContent = () => {
    if (activeTab === 'query') {
      return {
        title: "Instant Data Retrieval",
        subtitle: "Transform conversations into structured venture intelligence"
      };
    } else {
      return {
        title: "Intelligence Structuring",
        subtitle: "Convert conversations into actionable data"
      };
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Modern Header */}
        <View style={styles.modernHeader}>
          <View style={styles.headerContent}>
            <View style={styles.logoContainer}>
              {/* <View style={styles.logoIcon} /> */}
              <Text style={styles.headerTitle}>🤖 VentureBot</Text>
            </View>
            <View style={styles.statusIndicator}>
              <View style={styles.onlineIndicator} />
              <Text style={styles.statusText}>Online</Text>
            </View>
          </View>
        </View>

        {/* Chat Section */}
        <View style={styles.chatSection}>
          <View style={styles.chatHeader}>
            <Text style={styles.chatTitle}>{getChatHeaderContent().title}</Text>
            <Text style={styles.chatSubtitle}>{getChatHeaderContent().subtitle}</Text>
          </View>
          
          <ScrollView 
            ref={scrollViewRef}
            style={styles.chatMessages} 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.chatMessagesContent}
          >
            {getCurrentChatMessages().map((message) => (
              <View key={message.id} style={[
                styles.messageContainer,
                message.isBot ? styles.botMessageContainer : styles.userMessageContainer
              ]}>
                <View style={[
                  styles.messageBubble,
                  message.isBot ? styles.botMessage : styles.userMessage
                ]}>
                  <Text style={[
                    styles.messageText,
                    message.isBot ? styles.botMessageText : styles.userMessageText
                  ]}>
                    {message.text}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
          
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              value={inputMessage}
              onChangeText={setInputMessage}
              placeholder={activeTab === 'query' ? "Ask about startups, metrics, insights..." : "Log meetings, capture insights, voice notes..."}
              placeholderTextColor="#94a3b8"
              multiline={false}
              onSubmitEditing={handleSendMessage}
            />
            {/* <TouchableOpacity 
              style={[styles.voiceButton, isRecording && styles.voiceButtonRecording]} 
              onPress={handleVoiceNote}
            >
              <Text style={styles.voiceButtonText}>
                {isRecording ? '⏹️' : '🎤'}
              </Text>
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Modern Bottom Tabs */}
        <View style={styles.bottomTabs}>
          <TouchableOpacity 
            style={[styles.bottomTab, activeTab === 'query' && styles.activeBottomTab]}
            onPress={() => setActiveTab('query')}
          >
            <View style={styles.tabContent}>
              <Text style={styles.tabIcon}>🔍</Text>
              <Text style={[styles.bottomTabText, activeTab === 'query' && styles.activeBottomTabText]}>
                Query Knowledge Base
              </Text>
            </View>
            {activeTab === 'query' && <View style={styles.activeTabIndicator} />}
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.bottomTab, activeTab === 'notify' && styles.activeBottomTab]}
            onPress={() => setActiveTab('notify')}
          >
            <View style={styles.tabContent}>
              <Text style={styles.tabIcon}>📝</Text>
              <Text style={[styles.bottomTabText, activeTab === 'notify' && styles.activeBottomTabText]}>
                Update Intel, Notify
              </Text>
            </View>
            {activeTab === 'notify' && <View style={styles.activeTabIndicator} />}
          </TouchableOpacity>
        </View>

        {/* Modern Processing Modal */}
        <Modal
          visible={processingModal}
          transparent={true}
          animationType="fade"
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <ActivityIndicator size="large" color="#3b82f6" />
              <Text style={styles.processingText}>Processing Voice Note</Text>
              <Text style={styles.processingSubtext}>Converting to structured data...</Text>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  modernHeader: {
    backgroundColor: '#1a1a2e',
    paddingHorizontal: 20,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'blue',
    borderColor: 'red',
    marginRight: 12,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10b981',
    marginRight: 6,
  },
  statusText: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '500',
  },
  chatSection: {
    flex: 1,
    margin: 35,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
    overflow: 'hidden',
  },
  chatHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    backgroundColor: '#ffffff',
  },
  chatTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  chatSubtitle: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '400',
  },
  chatMessages: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  chatMessagesContent: {
    padding: 20,
    paddingBottom: 10,
  },
  messageContainer: {
    marginBottom: 16,
  },
  botMessageContainer: {
    alignItems: 'flex-start',
  },
  userMessageContainer: {
    alignItems: 'flex-end',
  },
  messageBubble: {
    maxWidth: '85%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  botMessage: {
    backgroundColor: '#f1f5f9',
    borderWidth: 1,
    borderColor: 'red',
    borderTopLeftRadius: 4,
  },
  userMessage: {
    backgroundColor: '#3b82f6',
    borderTopRightRadius: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '400',
  },
  botMessageText: {
    color: '#334155',
  },
  userMessageText: {
    color: '#ffffff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    backgroundColor: 'gray',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    backgroundColor: '#f9fafb',
    fontSize: 15,
    color: '#1f2937',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  voiceButton: {
    backgroundColor: 'blue',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 24,
    marginRight: 8,
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  voiceButtonRecording: {
    backgroundColor: '#ef4444',
  },
  voiceButtonText: {
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  sendButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 15,
    letterSpacing: 0.3,
  },
  bottomTabs: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 8,
  },
  bottomTab: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    position: 'relative',
  },
  activeBottomTab: {
    backgroundColor: '#f8fafc',
  },
  tabContent: {
    alignItems: 'center',
  },
  tabIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  bottomTabText: {
    color: '#64748b',
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  activeBottomTabText: {
    color: '#3b82f6',
    fontWeight: '600',
  },
  activeTabIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#3b82f6',
    borderRadius: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 12,
    minWidth: 280,
  },
  processingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginTop: 16,
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  processingSubtext: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
    textAlign: 'center',
  },
});
export default VentureLabDashboard;