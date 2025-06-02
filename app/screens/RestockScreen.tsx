import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Icon } from '@rneui/themed';

const RestockScreen = ({ upcomingRestocks, pastRestocks }) => {
  return (
    <View style={styles.container}>
      <Card containerStyle={styles.card}>
        <Icon
          name="calendar-refresh"
          type="material-community"
          color="#00ADF5"
          size={40}
          containerStyle={styles.icon}
        />
        <Text style={styles.title}>Upcoming Restocks</Text>
        {upcomingRestocks.map((restock, index) => (
          <Card key={index} containerStyle={styles.restockCard}>
            <Text style={styles.restockTitle}>{restock.date} - {restock.type}</Text>
            <Text style={styles.restockMessage}>{restock.message}</Text>
            <View style={styles.restockDetails}>
              <Icon name="time" type="ionicon" color="#00ADF5" size={16} />
              <Text style={styles.detailText}>{restock.time}</Text>
            </View>
            <View style={styles.restockDetails}>
              <Icon name="cash" type="ionicon" color="#00ADF5" size={16} />
              <Text style={styles.detailText}>R{restock.moneyRemoved} removed</Text>
            </View>
          </Card>
        ))}
      </Card>

      <Card containerStyle={styles.card}>
        <Icon
          name="history"
          type="material"
          color="#00ADF5"
          size={40}
          containerStyle={styles.icon}
        />
        <Text style={styles.title}>Past Restocks</Text>
        {pastRestocks.map((restock, index) => (
          <Card key={index} containerStyle={styles.restockCard}>
            <Text style={styles.restockTitle}>{restock.date} - {restock.type}</Text>
            <Text style={styles.restockMessage}>{restock.message}</Text>
            <View style={styles.restockDetails}>
              <Icon name="time" type="ionicon" color="#00ADF5" size={16} />
              <Text style={styles.detailText}>{restock.time}</Text>
            </View>
            <View style={styles.restockDetails}>
              <Icon name="cash" type="ionicon" color="#00ADF5" size={16} />
              <Text style={styles.detailText}>R{restock.moneyRemoved} removed</Text>
            </View>
          </Card>
        ))}
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    padding: 10,
  },
  card: {
    backgroundColor: '#2A2A2A',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  icon: {
    backgroundColor: '#1E1E1E',
    padding: 10,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 10,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  restockCard: {
    backgroundColor: '#3A3A3A',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  restockTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  restockMessage: {
    color: '#CCCCCC',
    fontSize: 14,
    marginBottom: 8,
  },
  restockDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailText: {
    color: '#FFFFFF',
    fontSize: 12,
    marginLeft: 5,
  },
});

export default RestockScreen;