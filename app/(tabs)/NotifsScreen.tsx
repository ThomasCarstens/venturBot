import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NotificationScreen = () => {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState([]);

  // Sample notifications data with big startup changes
  const sampleNotifications = [
    {
      id: '1',
      memberName: 'Sarah Chen',
      startupName: 'TechFlow Labs',
      action: 'completed Series A funding round ($15M)',
      timestamp: Date.now() - 300000, // 5 minutes ago
      type: 'funding',
      icon: '💰'
    },
    {
      id: '2',
      memberName: 'Michael Rodriguez',
      startupName: 'GreenTech Solutions',
      action: 'entered Y Combinator W24 batch',
      timestamp: Date.now() - 1800000, // 30 minutes ago
      type: 'incubation',
      icon: '🚀'
    },
    {
      id: '3',
      memberName: 'Emily Watson',
      startupName: 'DataVault Inc',
      action: 'changed company name to SecureData Pro',
      timestamp: Date.now() - 3600000, // 1 hour ago
      type: 'rebrand',
      icon: '🏷️'
    },
    {
      id: '4',
      memberName: 'David Kim',
      startupName: 'HealthTrack AI',
      action: 'acquired MedTech Analytics for $8M',
      timestamp: Date.now() - 7200000, // 2 hours ago
      type: 'acquisition',
      icon: '🤝'
    },
    {
      id: '5',
      memberName: 'Lisa Thompson',
      startupName: 'EcoLogistics',
      action: 'launched IPO filing with SEC',
      timestamp: Date.now() - 10800000, // 3 hours ago
      type: 'ipo',
      icon: '📈'
    },
    {
      id: '6',
      memberName: 'James Park',
      startupName: 'CloudNine Systems',
      action: 'pivoted from SaaS to AI infrastructure',
      timestamp: Date.now() - 14400000, // 4 hours ago
      type: 'pivot',
      icon: '🔄'
    },
    {
      id: '7',
      memberName: 'Anna Kowalski',
      startupName: 'FoodTech Innovations',
      action: 'partnered with Walmart for nationwide rollout',
      timestamp: Date.now() - 18000000, // 5 hours ago
      type: 'partnership',
      icon: '🤝'
    },
    {
      id: '8',
      memberName: 'Roberto Silva',
      startupName: 'FinanceFlow',
      action: 'received regulatory approval from FINRA',
      timestamp: Date.now() - 21600000, // 6 hours ago
      type: 'regulatory',
      icon: '✅'
    },
    {
      id: '9',
      memberName: 'Sophie Martin',
      startupName: 'AgriTech Solutions',
      action: 'expanded operations to 15 new countries',
      timestamp: Date.now() - 25200000, // 7 hours ago
      type: 'expansion',
      icon: '🌍'
    },
    {
      id: '10',
      memberName: 'Alex Johnson',
      startupName: 'Neural Networks Inc',
      action: 'appointed new CEO from Google DeepMind',
      timestamp: Date.now() - 28800000, // 8 hours ago
      type: 'leadership',
      icon: '👨‍💼'
    }
  ];

  useEffect(() => {
    // Simulate loading notifications
    setNotifications(sampleNotifications);
  }, []);

  const formatTimeAgo = (timestamp) => {
    const now = Date.now();
    const diff = now - timestamp;
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const handleNotificationPress = (notification) => {
    // Navigate to MyMachinesScreen with notification data
    navigation.navigate('MyMachines', {
      notificationData: notification,
      shouldAskChatbot: true,
      chatbotQuery: `Explain this notification: ${notification.memberName} signaled that ${notification.startupName} ${notification.action}`
    });
  };

  const renderNotification = ({ item }) => (
    <TouchableOpacity
      style={styles.notificationItem}
      onPress={() => handleNotificationPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Text style={styles.notificationIcon}>{item.icon}</Text>
          <View style={styles.headerText}>
            <Text style={styles.memberName}>{item.memberName}</Text>
            <Text style={styles.timeAgo}>{formatTimeAgo(item.timestamp)}</Text>
          </View>
        </View>
        
        <Text style={styles.notificationText}>
          <Text style={styles.boldText}>signaled that </Text>
          <Text style={styles.startupName}>{item.startupName}</Text>
          <Text style={styles.actionText}> {item.action}</Text>
        </Text>
        
        <View style={styles.notificationFooter}>
          <View style={[styles.typeBadge, styles[`${item.type}Badge`]]}>
            <Text style={styles.typeText}>{item.type.toUpperCase()}</Text>
          </View>
          <Text style={styles.tapToExplain}>Tap to explain →</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Portfolio Updates</Text>
        <Text style={styles.headerSubtitle}>
          {notifications.length} recent signals from your network
        </Text>
      </View>

      {/* Notifications List */}
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
        style={styles.notificationsList}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2d2d4a',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    color: '#94a3b8',
    fontSize: 14,
    fontWeight: '400',
  },
  notificationsList: {
    flex: 1,
  },
  listContainer: {
    padding: 16,
    paddingBottom: 20,
  },
  notificationItem: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  notificationContent: {
    padding: 16,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  notificationIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  headerText: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  memberName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    letterSpacing: 0.3,
  },
  timeAgo: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
  notificationText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#334155',
    marginBottom: 12,
  },
  boldText: {
    fontWeight: '400',
  },
  startupName: {
    fontWeight: '700',
    color: '#3b82f6',
  },
  actionText: {
    fontWeight: '500',
  },
  notificationFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  typeText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  tapToExplain: {
    fontSize: 12,
    color: '#3b82f6',
    fontWeight: '500',
  },
  // Type-specific badge styles
  fundingBadge: {
    backgroundColor: '#dcfce7',
  },
  incubationBadge: {
    backgroundColor: '#dbeafe',
  },
  rebrandBadge: {
    backgroundColor: '#fef3c7',
  },
  acquisitionBadge: {
    backgroundColor: '#e0e7ff',
  },
  ipoBadge: {
    backgroundColor: '#f3e8ff',
  },
  pivotBadge: {
    backgroundColor: '#fed7d7',
  },
  partnershipBadge: {
    backgroundColor: '#d1fae5',
  },
  regulatoryBadge: {
    backgroundColor: '#ecfccb',
  },
  expansionBadge: {
    backgroundColor: '#cffafe',
  },
  leadershipBadge: {
    backgroundColor: '#fde68a',
  },
});

export default NotificationScreen;