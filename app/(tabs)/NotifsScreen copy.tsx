import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { ref as ref_d, onValue } from 'firebase/database';
import { database } from '../../firebase';
import { useNavigation } from '@react-navigation/native';
import { Clock } from 'lucide-react';

const NotificationList = ({ userId, isAdmin, isFormateur }) => {
  const [notifications, setNotifications] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const notificationsRef = ref_d(database, '/notification-panel/');
    const unsubscribe = onValue(notificationsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const filteredNotifications = Object.entries(data)
          .filter(([_, notification]) => notification.received && notification.received[userId])
          .map(([id, notification]) => ({
            id,
            ...notification,
            formationId: notification.body.match(/\d+/)?.[0] || null,
          }))
          .sort((a, b) => b.timestamp - a.timestamp);
        setNotifications(filteredNotifications);
      }
    });

    return () => unsubscribe();
  }, [userId]);

  const handleNotificationPress = (item) => {
    if (item.formationId) {
      navigation.navigate('Formation', {
        formationId: item.formationId,
        role: { isAdmin, isFormateur },
      });
    }
  };

  const renderNotification = ({ item }) => (
    <TouchableOpacity
      style={styles.notificationItem}
      onPress={() => handleNotificationPress(item)}
    >
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationBody}>{item.body}</Text>
        <View style={styles.timeContainer}>
          <Clock size={12} color="#888" />
          <Text style={styles.notificationTime}>
            {new Date(item.timestamp).toLocaleString()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={notifications}
      renderItem={renderNotification}
      keyExtractor={(item) => item.id}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  notificationItem: {
    backgroundColor: 'white',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  notificationBody: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationTime: {
    fontSize: 12,
    color: '#888',
    marginLeft: 4,
  },
});

export default NotificationList;