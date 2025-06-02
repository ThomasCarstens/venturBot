import { useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
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
// App.tsx
// import { useEffect } from 'react';
// import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

// export const App = () => {
	

// 	return (<div></div>);
// };
const VentureLabDashboard = () => {

  const navigation = useNavigation();
  
  // useEffect(() => {
	// 	createChat({
	// 		webhookUrl: 'https://rocketpen.app.n8n.coud/webhook/09c12f4a-3664-467f-bded-08b05b4be441/chat'//YOUR_PRODUCTION_WEBHOOK_URL
	// 	});
	// }, []);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: `VentureBot Professional`,
      headerStyle: {
        backgroundColor: '#4F46E5',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    });
  }, [navigation]);
  // <View style={styles.headerContent}>
  //           <Text style={styles.headerTitle}>Venture Lab Professional</Text>
  //           <Text style={styles.headerSubtitle}>Systematic Intelligence & Data Capture</Text>
  //         </View>
  const [chatMessages, setChatMessages] = useState([
    { 
      id: 1, 
      text: "Welcome to VentureBot Professional! 🚀\n\nI help you:\n📊 Capture meeting insights systematically\n🔍 Access startup intelligence instantly\n📋 Track action items across portfolio\n\nTry: 'Tell me about TechFlow Labs' or 'Log new meeting'", 
      isBot: true 
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [activeTab, setActiveTab] = useState('chat');
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [processingModal, setProcessingModal] = useState(false);

  // Professional startup database
  const startupDatabase = {
    'techflow-labs': {
      name: 'TechFlow Labs',
      stage: 'Series A',
      sector: 'B2B SaaS',
      valuation: '$12M',
      raised: '$3.2M',
      founded: '2023',
      founders: ['Sarah Chen (CEO)', 'David Park (CTO)', 'Maria Santos (COO)'],
      lastMeeting: {
        date: 'May 20, 2025',
        type: 'Due Diligence Review',
        attendees: ['Sarah Chen', 'David Park', 'Investment Committee'],
        duration: '90 min',
        keyPoints: [
          '• Revenue growth: 340% YoY, ARR now $1.8M',
          '• Customer retention: 94% (industry avg: 85%)',
          '• Team scaling from 12 to 35 employees by Q4',
          '• Microsoft Azure partnership confirmed'
        ],
        actionItems: [
          { item: 'Send term sheet draft', owner: 'Legal Team', due: 'May 23', status: 'pending' },
          { item: 'Schedule customer reference calls', owner: 'Sarah Chen', due: 'May 25', status: 'pending' },
          { item: 'Technical architecture review', owner: 'David Park', due: 'May 27', status: 'pending' }
        ],
        nextSteps: 'Final partner vote scheduled for May 30th'
      },
      metrics: {
        mrr: '$150K',
        growth: '+28% MoM',
        customers: '47',
        churn: '2.1%'
      }
    },
    'quantum-ai': {
      name: 'Quantum AI Solutions',
      stage: 'Seed',
      sector: 'AI/ML Infrastructure',
      valuation: '$8M',
      raised: '$1.5M',
      founded: '2024',
      founders: ['Dr. Alex Rivera (CEO)', 'Jennifer Wu (CTO)'],
      lastMeeting: {
        date: 'May 18, 2025',
        type: 'Technical Deep Dive',
        attendees: ['Dr. Alex Rivera', 'Jennifer Wu', 'Technical Advisory'],
        duration: '120 min',
        keyPoints: [
          '• Breakthrough in quantum-classical ML hybrid',
          '• Processing speed 15x faster than competitors',
          '• Patent applications filed for core algorithms',
          '• 3 Fortune 500 pilot programs confirmed'
        ],
        actionItems: [
          { item: 'Patent filing completion', owner: 'Legal Team', due: 'May 30', status: 'pending' },
          { item: 'Pilot program metrics report', owner: 'Dr. Rivera', due: 'June 1', status: 'pending' }
        ],
        nextSteps: 'Seed funding round launch targeted for June 2025'
      },
      metrics: {
        mrr: '$25K',
        growth: '+67% MoM',
        customers: '8',
        churn: '0%'
      }
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
  
    const userMessage = {
      id: chatMessages.length + 1,
      text: inputMessage,
      isBot: false,
      sessionId: 333
    };
  
    const postedMessage = {
      id: chatMessages.length + 1,
      chatInput: inputMessage,
      isBot: false,
      sessionId: 333
    };
  
    setChatMessages(prev => [...prev, userMessage]);
    setInputMessage('');
  
    // Get bot response
    try {
      const botResponseText = await getBotResponse(postedMessage);
      
      const botResponse = {
        id: chatMessages.length + 2,
        text: botResponseText,
        isBot: true
      };
      
      setChatMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error getting bot response:', error);
      
      const errorResponse = {
        id: chatMessages.length + 2,
        text: 'Sorry, I encountered an error. Please try again.',
        isBot: true
      };
      
      setChatMessages(prev => [...prev, errorResponse]);
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
      
      // Return the result, with a fallback if it's null/undefined
      return data.result || 'No response received';
      
    } catch (error) {
      console.error('Error:', error);
      return 'Error occurred, please try again';
    }
  };
    



    // const lowerMessage = message.toLowerCase();
    
    // // Startup intelligence queries
    // if (lowerMessage.includes('techflow') || lowerMessage.includes('tech flow')) {
    //   setSelectedStartup('techflow-labs');
    //   setTimeout(() => setActiveTab('startup'), 500);
    //   return "📊 **TechFlow Labs Intelligence Retrieved**\n\n✅ Latest Meeting: Due Diligence Review (May 20)\n✅ Status: Series A stage, $12M valuation  \n✅ Key Metrics: $1.8M ARR, 340% YoY growth\n✅ Action Items: 3 pending, term sheet due May 23\n\n🎯 **Professional Impact:** Complete deal context enables informed investment decisions. Switching to full startup profile...\n\nThis systematic intelligence capture is essential for professional venture operations.";
    // }
    
    // if (lowerMessage.includes('quantum') || lowerMessage.includes('ai solutions')) {
    //   setSelectedStartup('quantum-ai');
    //   setTimeout(() => setActiveTab('startup'), 500);
    //   return "🔬 **Quantum AI Solutions Intelligence**\n\n✅ Latest: Technical Deep Dive (May 18)\n✅ Stage: Seed, $8M valuation\n✅ Breakthrough: 15x processing speed improvement\n✅ Status: Seed round prep for June launch\n\n🚀 **Venture Value:** Technical due diligence insights instantly accessible. Loading complete startup profile...\n\nStructured data prevents critical details from being lost across portfolio.";
    // }

    // // Professional data collection scenarios
    // if (lowerMessage.includes('new meeting') || lowerMessage.includes('log meeting')) {
    //   return "🎯 **Professional Meeting Capture System**\n\n**Systematic Data Collection:**\n📅 Meeting metadata (date, attendees, duration)\n💡 Key discussion points & strategic insights\n📋 Action items with owners & deadlines\n📈 Metrics updates & milestone tracking\n🔄 Next steps & follow-up requirements\n\n**Professional Impact:**\n• Transforms informal conversations into institutional knowledge\n• Prevents critical information loss\n• Enables data-driven investment decisions\n• Maintains complete deal context\n\nWhich startup is this meeting about? I'll structure the capture accordingly.";
    // }

    // if (lowerMessage.includes('voice') || lowerMessage.includes('record')) {
    //   return "🎤 **Voice-Powered Professional Capture**\n\n**Advanced Processing:**\n• Real-time meeting transcription\n• Automatic key point extraction\n• Action item identification with deadlines\n• Strategic insight categorization\n• Participant tracking & role assignment\n\n**Venture Lab Benefits:**\n✅ Capture insights during/after meetings\n✅ Transform conversations into searchable data\n✅ Maintain institutional memory\n✅ Accelerate deal flow processes\n\nReady to start professional voice capture? Tap the microphone to begin systematic data collection.";
    // }

    // if (lowerMessage.includes('action items') || lowerMessage.includes('follow up')) {
    //   return "📋 **Portfolio Action Items Dashboard**\n\n**TechFlow Labs (Series A):**\n• Term sheet draft → Legal Team (Due: May 23) 🔴\n• Customer reference calls → Sarah Chen (Due: May 25) 🟡\n• Architecture review → David Park (Due: May 27) 🟡\n\n**Quantum AI (Seed):**\n• Patent filing → Legal Team (Due: May 30) 🟡\n• Pilot metrics → Dr. Rivera (Due: June 1) 🟡\n\n🎯 **Professional Value:** Systematic tracking prevents critical items from falling through cracks - essential for institutional venture management.\n\nNeed to update any action items or add new ones?";
    // }

    // if (lowerMessage.includes('metrics') || lowerMessage.includes('performance')) {
    //   return "📈 **Professional Portfolio Dashboard**\n\n**Growth Metrics:**\n🚀 TechFlow Labs: $150K MRR (+28% MoM)\n⚡ Quantum AI: $25K MRR (+67% MoM)\n\n**Key Performance Indicators:**\n✅ Average customer retention: 94%\n✅ Portfolio revenue growth: +35% average\n✅ Zero churn in AI/ML investments\n✅ 12 active due diligence processes\n\n**Investment Committee Impact:**\nReal-time metrics enable proactive portfolio management and data-driven investment decisions. This professional tracking transforms venture operations from relationship-based to intelligence-driven.";
    // }

    // return "💼 **VentureBot Professional Capabilities**\n\n🔍 **Startup Intelligence Hub:**\n\"Tell me about [company name]\" → Complete profiles with meeting history, metrics, action items\n\n📊 **Professional Data Capture:**\n\"Log new meeting\" or use voice notes → Systematic conversion of conversations into structured intelligence\n\n📋 **Portfolio Management:**\n\"Show action items\" → Track deliverables across entire portfolio\n\n🎯 **Professional Impact:**\nTransforms ad-hoc venture processes into systematic, data-driven operations essential for institutional investment management.";
  // };

  const handleVoiceNote = () => {
    if (isRecording) {
      setIsRecording(false);
      setProcessingModal(true);
      
      setTimeout(() => {
        setProcessingModal(false);
        const voiceMessage = {
          id: chatMessages.length + 1,
          text: "🎤 **Professional Voice Capture Processed**\n\nJust finished Series A committee meeting for TechFlow Labs. Key insights captured:\n\n📊 Revenue metrics exceeded projections - $1.8M ARR\n🤝 Microsoft partnership deal confirmed  \n✅ Unanimous committee vote to proceed\n📋 Action items: Legal drafts terms by May 23, customer reference calls by May 25\n💰 Investment thesis validated with strong unit economics",
          isBot: false
        };
        setChatMessages(prev => [...prev, voiceMessage]);
        
        setTimeout(() => {
          const botResponse = {
            id: chatMessages.length + 2,
            text: "✅ **Professional Data Processing Complete**\n\n**Automatically Structured:**\n📅 Meeting Type: Series A Investment Committee\n💡 Key Insights: Revenue growth, strategic partnerships\n📊 Metrics Update: $1.8M ARR milestone achieved\n🎯 Decision: Unanimous proceed vote recorded\n📋 Action Items: Legal (May 23), Customer calls (May 25)\n\n**Added to TechFlow Labs Intelligence Profile**\n\n🚀 **Professional Impact:** This systematic capture ensures your venture lab maintains complete institutional knowledge. Critical deal context is now preserved and searchable for future investment decisions.\n\nYour professional venture operations just got more intelligent.",
            isBot: true
          };
          setChatMessages(prev => [...prev, botResponse]);
        }, 1500);
      }, 3000);
    } else {
      setIsRecording(true);
    }
  };

  const renderStartupProfile = () => {
    if (!selectedStartup || !startupDatabase[selectedStartup]) return null;
    
    const startup = startupDatabase[selectedStartup];

    return (
      <ScrollView style={styles.startupProfile} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.startupHeader}>
          <View style={styles.startupHeaderContent}>
            <Text style={styles.startupName}>{startup.name}</Text>
            <View style={styles.startupBadges}>
              <View style={styles.stageBadge}>
                <Text style={styles.stageBadgeText}>{startup.stage}</Text>
              </View>
              <View style={styles.sectorBadge}>
                <Text style={styles.sectorBadgeText}>{startup.sector}</Text>
              </View>
            </View>
            <Text style={styles.startupValuation}>Valuation: {startup.valuation} • Raised: {startup.raised}</Text>
          </View>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => setActiveTab('chat')}
          >
            <Text style={styles.backButtonText}>← Chat</Text>
          </TouchableOpacity>
        </View>

        {/* Key Metrics */}
        <View style={styles.metricsSection}>
          <Text style={styles.sectionTitle}>📊 Current Metrics</Text>
          <View style={styles.metricsGrid}>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>MRR</Text>
              <Text style={styles.metricValue}>{startup.metrics.mrr}</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Growth</Text>
              <Text style={[styles.metricValue, styles.growthValue]}>{startup.metrics.growth}</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Customers</Text>
              <Text style={styles.metricValue}>{startup.metrics.customers}</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Churn</Text>
              <Text style={styles.metricValue}>{startup.metrics.churn}</Text>
            </View>
          </View>
        </View>

        {/* Latest Meeting */}
        <View style={styles.meetingSection}>
          <Text style={styles.sectionTitle}>📅 Latest Meeting: {startup.lastMeeting.type}</Text>
          <View style={styles.meetingCard}>
            <View style={styles.meetingHeader}>
              <Text style={styles.meetingDate}>{startup.lastMeeting.date}</Text>
              <Text style={styles.meetingDuration}>{startup.lastMeeting.duration}</Text>
            </View>
            <Text style={styles.meetingAttendees}>
              👥 {startup.lastMeeting.attendees.join(', ')}
            </Text>
            
            <Text style={styles.subsectionTitle}>💡 Key Discussion Points:</Text>
            {startup.lastMeeting.keyPoints.map((point, idx) => (
              <Text key={idx} style={styles.keyPoint}>{point}</Text>
            ))}
            
            <Text style={styles.subsectionTitle}>📋 Action Items:</Text>
            {startup.lastMeeting.actionItems.map((action, idx) => (
              <View key={idx} style={styles.actionItem}>
                <View style={styles.actionItemHeader}>
                  <Text style={styles.actionItemText}>{action.item}</Text>
                  <View style={[styles.statusDot, action.status === 'completed' ? styles.completedDot : styles.pendingDot]} />
                </View>
                <Text style={styles.actionItemDetails}>
                  👤 {action.owner} • 📅 Due: {action.due}
                </Text>
              </View>
            ))}
            
            <View style={styles.nextStepsSection}>
              <Text style={styles.subsectionTitle}>🎯 Next Steps:</Text>
              <Text style={styles.nextStepsText}>{startup.lastMeeting.nextSteps}</Text>
            </View>
          </View>
        </View>

        {/* Founders */}
        <View style={styles.foundersSection}>
          <Text style={styles.sectionTitle}>👥 Leadership Team</Text>
          <View style={styles.foundersCard}>
            {startup.founders.map((founder, idx) => (
              <Text key={idx} style={styles.founderName}>{founder}</Text>
            ))}
            <Text style={styles.foundedYear}>Founded: {startup.founded}</Text>
          </View>
        </View>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View style={styles.header}>
          
          <View style={styles.tabContainer}>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'chat' && styles.activeTab]}
              onPress={() => setActiveTab('chat')}
            >
              <Text style={[styles.tabText, activeTab === 'chat' && styles.activeTabText]}>
                💬 Data Capture
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'startup' && styles.activeTab]}
              onPress={() => setActiveTab('startup')}
            >
              <Text style={[styles.tabText, activeTab === 'startup' && styles.activeTabText]}>
                🔍 Intelligence
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {activeTab === 'chat' ? (
          <View style={styles.chatSection}>
            <View style={styles.chatHeader}>
              <Text style={styles.chatTitle}>🤖 Structured Intel from Conversations</Text>
              <Text style={styles.chatSubtitle}>Transform conversations into company data</Text>
              {/* <Text style={styles.chatTitle}>🤖 Instant Data Retrieval System</Text>
              <Text style={styles.chatSubtitle}>Transform conversations into structured venture intelligence</Text> */}

            </View>
            
            <ScrollView style={styles.chatMessages} showsVerticalScrollIndicator={false}>
              {chatMessages.map((message) => (
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
                placeholder="Ask about startups, log meetings, capture insights..."
                placeholderTextColor="#999"
                multiline={false}
                onSubmitEditing={handleSendMessage}
              />
              <TouchableOpacity 
                style={[styles.voiceButton, isRecording && styles.voiceButtonRecording]} 
                onPress={handleVoiceNote}
              >
                <Text style={styles.voiceButtonText}>
                  {isRecording ? '⏹️' : '🎤'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
                <Text style={styles.sendButtonText}>Send</Text>
              </TouchableOpacity>
            </View>

            
          </View>
        ) : (
          <View style={styles.startupSection}>
            {selectedStartup ? (
              renderStartupProfile()
            ) : (
              <View style={styles.startupSelector}>
                <Text style={styles.selectorTitle}>🔍 Startup Intelligence Hub</Text>
                <Text style={styles.selectorSubtitle}>
                  Access comprehensive profiles with meeting history, metrics, and action items
                </Text>
                <View style={styles.startupButtons}>
                  <TouchableOpacity
                    style={styles.startupButton}
                    onPress={() => setSelectedStartup('techflow-labs')}
                  >
                    <Text style={styles.startupButtonTitle}>TechFlow Labs</Text>
                    <Text style={styles.startupButtonSubtitle}>Series A • B2B SaaS • $12M</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.startupButton}
                    onPress={() => setSelectedStartup('quantum-ai')}
                  >
                    <Text style={styles.startupButtonTitle}>Quantum AI Solutions</Text>
                    <Text style={styles.startupButtonSubtitle}>Seed • AI/ML • $8M</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        )}

        {/* Processing Modal */}
        <Modal
          visible={processingModal}
          transparent={true}
          animationType="fade"
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <ActivityIndicator size="large" color="#4F46E5" />
              <Text style={styles.processingText}>Processing Professional Voice Capture</Text>
              <Text style={styles.processingSubtext}>Converting to structured venture intelligence...</Text>
            </View>
          </View>
        </Modal>

        {/* Professional Features Footer */}
        <View style={styles.featuresFooter}>
          <View style={styles.featureItem}>
            <Text style={styles.featureTitle}>📊 Data Capture</Text>
            <Text style={styles.featureText}>Systematic intelligence from conversations</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureTitle}>🔍 Startup Intel</Text>
            <Text style={styles.featureText}>Complete profiles on command</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: '#4F46E5',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerContent: {
    marginBottom: 16,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  headerSubtitle: {
    color: '#C7D2FE',
    fontSize: 12,
    marginTop: 2,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  tabText: {
    color: '#C7D2FE',
    fontSize: 12,
    fontWeight: '500',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: '600',
  },
  chatSection: {
    flex: 1,
    margin: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  chatHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  chatTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  chatSubtitle: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  chatMessages: {
    flex: 1,
    padding: 16,
  },
  messageContainer: {
    marginBottom: 12,
  },
  botMessageContainer: {
    alignItems: 'flex-start',
  },
  userMessageContainer: {
    alignItems: 'flex-end',
  },
  messageBubble: {
    maxWidth: '85%',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 16,
  },
  botMessage: {
    backgroundColor: '#f1f5f9',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  userMessage: {
    backgroundColor: '#4F46E5',
  },
  messageText: {
    fontSize: 13,
    lineHeight: 18,
  },
  botMessageText: {
    color: '#1e293b',
  },
  userMessageText: {
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginRight: 8,
    backgroundColor: '#fff',
    fontSize: 14,
  },
  voiceButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 8,
  },
  voiceButtonRecording: {
    backgroundColor: '#EF4444',
  },
  voiceButtonText: {
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#4F46E5',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  startupSection: {
    flex: 1,
    margin: 16,
  },
  startupSelector: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  selectorTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  selectorSubtitle: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  startupButtons: {
    width: '100%',
  },
  startupButton: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  startupButtonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  startupButtonSubtitle: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
  },
  startupProfile: {
    flex: 1,
  },
  startupHeader: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  startupHeaderContent: {
    marginBottom: 12,
  },
  startupName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
  },
  startupBadges: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  stageBadge: {
    backgroundColor: '#dbeafe',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  stageBadgeText: {
    color: '#1d4ed8',
    fontSize: 12,
    fontWeight: '600',
  },
  sectorBadge: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  sectorBadgeText: {
    color: '#166534',
    fontSize: 12,
    fontWeight: '600',
  },
  startupValuation: {
    fontSize: 14,
    color: '#64748b',
  },
  backButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#4F46E5',
    fontSize: 14,
    fontWeight: '500',
  },
  metricsSection: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 12,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricCard: {
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 8,
    width: '48%',
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 4
  },
  metricValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
  },
  growthValue: {
    color: '#10B981',
  },
  meetingSection: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  meetingCard: {
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  meetingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  meetingDate: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  meetingDuration: {
    fontSize: 12,
    color: '#64748b',
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  meetingAttendees: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 16,
  },
  subsectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginTop: 16,
    marginBottom: 8,
  },
  keyPoint: {
    fontSize: 13,
    color: '#374151',
    lineHeight: 18,
    marginBottom: 4,
  },
  actionItem: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  actionItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  actionItemText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#1e293b',
    flex: 1,
    marginRight: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 4,
  },
  completedDot: {
    backgroundColor: '#10B981',
  },
  pendingDot: {
    backgroundColor: '#F59E0B',
  },
  actionItemDetails: {
    fontSize: 11,
    color: '#64748b',
  },
  nextStepsSection: {
    marginTop: 8,
  },
  nextStepsText: {
    fontSize: 13,
    color: '#374151',
    lineHeight: 18,
    fontStyle: 'italic',
  },
  foundersSection: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  foundersCard: {
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  founderName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1e293b',
    marginBottom: 4,
  },
  foundedYear: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 8,
    fontStyle: 'italic',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  processingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginTop: 16,
    textAlign: 'center',
  },
  processingSubtext: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
    textAlign: 'center',
  },
  featuresFooter: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  featureItem: {
    flex: 1,
    alignItems: 'center',
  },
  featureTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1e293b',
  },
  featureText: {
    fontSize: 10,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 2,
  },
});

export default VentureLabDashboard;