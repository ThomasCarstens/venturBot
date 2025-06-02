import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Tab, TabView, Card, Button, Icon, Avatar } from '@rneui/themed';
import { Calendar } from 'react-native-calendars';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
// import React from 'react';
// import { View, Text, ScrollView, StyleSheet } from 'react-native';
// import { Card, Avatar } from '@rneui/themed';
const MachineScreen = ({ route }) => {
  const [index, setIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState('Cola');
  const [isRestockModalVisible, setRestockModalVisible] = useState(false);
  const [restockItem, setRestockItem] = useState(null);
  const { machine } = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: `${machine.name}`,
      headerStyle: {
        backgroundColor: '#1a53ff',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    });
  }, [navigation]);

  const stockItems = [
    { name: 'Cola', current: 15, total: 60, extra: 20 },
    { name: 'Chips', current: 8, total: 15, extra: 0 },
    { name: 'Candy', current: 12, total: 25, extra: 35 },
  ];

  const popularityData = {
    Cola: {
      '2024-10-15': { marked: true, dotColor: 'red' },
      '2024-10-20': { marked: true, dotColor: 'red' },
    },
    Chips: {
      '2024-10-18': { marked: true, dotColor: 'blue' },
      '2024-10-25': { marked: true, dotColor: 'blue' },
    },
    Candy: {
      '2024-10-12': { marked: true, dotColor: 'green' },
      '2024-10-22': { marked: true, dotColor: 'green' },
    },
  };

  const upcomingRestocks = [
    { date: 'October 15, 2024', type: 'Full Restock', message: 'Time for a complete refresh!', time: '10:30 PM', moneyRemoved: 500 },
    // { date: 'October 30, 2024', type: 'Partial Restock (Beverages)', message: 'Quench their thirst!', time: '11:00 PM', moneyRemoved: 200 },
    // { date: 'November 15, 2024', type: 'Full Restock', message: 'Keep it stocked for the holidays!', time: '10:45 PM', moneyRemoved: 550 },
  ];

  const pastRestocks = [
    { date: 'September 30, 2024', type: 'Full Restock', message: 'Maintenance was a little late, please be careful next time', time: '10:15 PM', moneyRemoved: 480 },
    { date: 'September 15, 2024', type: 'Partial Restock (Snacks)', message: 'Car refill cost R800', time: '11:30 PM', moneyRemoved: 150 },
  ];

  const InventoryTab = () => (
    <ScrollView style={styles.tabContent}>
      <View style={styles.imageContainer}>
        <Image source={machine.image} style={styles.image} />
        <LinearGradient
          colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0)']}
          style={styles.gradient}
        />
        <Text style={styles.imageText}>{machine.photoTime}</Text>
      </View>
      
      {stockItems.map((item, index) => (
        <Card key={index} containerStyle={styles.card}>
          <View style={styles.stockRow}>
            <Text style={styles.stockName}>{item.name}</Text>
            <View style={styles.stockInfo}>
              <Text style={styles.stockCurrent}>{item.current}</Text>
              <Text style={styles.stockSeparator}>/</Text>
              <Text style={styles.stockTotal}>{item.total}</Text>
            </View>
          </View>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progress, { width: `${(item.current / item.total) * 100}%` }]} />
            </View>
            <TouchableOpacity 
              style={styles.restockButton}
              onPress={() => {
                setRestockItem(item);
                setRestockModalVisible(true);
              }}
            >
              <Icon name="refresh" type="ionicon" color="white" size={20} />
            </TouchableOpacity>
          </View>
          <Text style={styles.extraStock}>Extra Stock: {item.extra} in Machine, 30 at HQ</Text>
        </Card>
      ))}
    </ScrollView>
  );

  const PopularTab = () => (
    <ScrollView style={styles.tabContent}>
      <View style={styles.itemSelector}>
        {Object.keys(popularityData).map((item) => (
          <TouchableOpacity
            key={item}
            style={[styles.itemButton, selectedItem === item && styles.selectedItemButton]}
            onPress={() => setSelectedItem(item)}
          >
            <Text style={[styles.itemButtonText, selectedItem === item && styles.selectedItemButtonText]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Card containerStyle={styles.card}>
        <Text style={styles.cardTitle}>Popularity Calendar for {selectedItem}</Text>
        <Calendar
          markedDates={popularityData[selectedItem]}
          theme={{
            backgroundColor: '#ffffff',
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#00adf5',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e1e8',
            dotColor: '#00adf5',
            selectedDotColor: '#ffffff',
            arrowColor: '#00adf5',
            monthTextColor: '#2d4150',
            indicatorColor: '#00adf5',
          }}
        />
      </Card>
    </ScrollView>
  );


  
  const Message = ({ sender, content, time, isUser }) => (
    <View style={[styles.messageContainer, isUser ? styles.userMessage : styles.botMessage]}>
      <Avatar
        rounded
        icon={{ name: isUser ? 'user' : 'android', type: 'font-awesome' }}
        containerStyle={[styles.avatar, isUser ? styles.userAvatar : styles.botAvatar]}
      />
      <View style={styles.messageContent}>
        <Text style={styles.senderName}>{sender}</Text>
        <Text style={styles.messageText}>{content}</Text>
        <Text style={styles.messageTime}>{time}</Text>
      </View>
    </View>
  );
  
  const RestockTab = () => {
    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };
  
    return (
      <ScrollView style={styles.container}>
        <Card containerStyle={styles.card}>
          <Card.Title style={styles.cardTitle}>Restock Employee Chat</Card.Title>
          <Card.Divider />
          
          {/* <Message
            sender="RestockBot"
            content="Hello! Let me update you on our upcoming and past restocks."
            time="Now"
            isUser={false}
          /> */}
  
          {upcomingRestocks.map((restock, index) => (
            <React.Fragment key={`upcoming-${index}`}>
              <Message
                sender="RestockBot"
                content={`We have an upcoming ${restock.type} scheduled for 11 November at 13:00.`}
                time="Now"
                isUser={false}
              />
              <Message
                sender="Employee"
                content={`Great! What time is the ${restock.type} scheduled for?`}
                time="Now"
                isUser={true}
              />
              <Message
                sender="RestockBot"
                content={`The ${restock.type} is scheduled for ${restock.time}. ${restock.message}`}
                time="Now"
                isUser={false}
              />
              <Message
                sender="Employee"
                content="How much money will be removed for this restock?"
                time="Now"
                isUser={true}
              />
              <Message
                sender="RestockBot"
                content={`R${restock.moneyRemoved} will be removed for this restock.`}
                time="Now"
                isUser={false}
              />
            </React.Fragment>
          ))}
  
          {/* <Message
            sender="RestockBot"
            content="Would you like to know about our past restocks as well?"
            time="Now"
            isUser={false}
          />
          <Message
            sender="You"
            content="Yes, please tell me about the recent past restocks."
            time="Now"
            isUser={true}
          />
  
          {pastRestocks.map((restock, index) => (
            <React.Fragment key={`past-${index}`}>
              <Message
                sender="RestockBot"
                content={`We had a ${restock.type} on ${formatDate(restock.date)}.`}
                time="Now"
                isUser={false}
              />
              <Message
                sender="You"
                content={`How did the ${restock.type} go?`}
                time="Now"
                isUser={true}
              />
              <Message
                sender="RestockBot"
                content={`${restock.message} It was completed at ${restock.time}, and R${restock.moneyRemoved} was removed.`}
                time="Now"
                isUser={false}
              />
            </React.Fragment>
          ))}
  
          <Message
            sender="RestockBot"
            content="That's all the restock information I have for now. Is there anything else you'd like to know?"
            time="Now"
            isUser={false}
          /> */}
        </Card>
      </ScrollView>
    );
  };

  const RestockConfirmationModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isRestockModalVisible}
      onRequestClose={() => setRestockModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{restockItem?.name} Restock</Text>
          <Text style={styles.modalText}>
            Automatic Machine Restock or rotate it from a different machine?
          </Text>
          <View style={styles.modalButtonContainer}>
            <Button
              title="Cancel"
              onPress={() => setRestockModalVisible(false)}
              buttonStyle={styles.modalCancelButton}
            />
            <Button
              title="From Machine: 30 left (10PM)"
              onPress={() => {
                setRestockModalVisible(false);
                setIndex(1); // Switch to Restock tab
              }}
              buttonStyle={styles.modalOkButton}
            />
            <Button
              title="From Inventory: 5 left (tomorrow 10PM)"
              onPress={() => {
                setRestockModalVisible(false);
                setIndex(1); // Switch to Restock tab
              }}
              buttonStyle={styles.modalOkButton}
            />
                        <Button
              title="From Other Machine: Select Machine"
              onPress={() => {
                setRestockModalVisible(false);
                setIndex(1); // Switch to Restock tab
              }}
              buttonStyle={styles.modalOkButton}
            />
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <Tab
        value={index}
        onChange={setIndex}
        indicatorStyle={styles.tabIndicator}
        variant="primary"
      >
        <Tab.Item
          title="Inventory"
          titleStyle={styles.tabTitle}
          icon={{ name: 'cube-outline', type: 'ionicon', color: 'white' }}
        />

        <Tab.Item
          title="Restock"
          titleStyle={styles.tabTitle}
          icon={{ name: 'refresh', type: 'ionicon', color: 'white' }}
        />

        <Tab.Item
          title="Popular"
          titleStyle={styles.tabTitle}
          icon={{ name: 'trending-up', type: 'ionicon', color: 'white' }}
        />
      </Tab>
      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={{ width: '100%' }}>
          <InventoryTab />
        </TabView.Item>

        <TabView.Item style={{ width: '100%' }}>
          <RestockTab />
        </TabView.Item>
        <TabView.Item style={{ width: '100%' }}>
          <PopularTab />
        </TabView.Item>
      </TabView>
      <RestockConfirmationModal />
    </View>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#1E1E1E',
  // },
  tabContent: {
    flex: 1,
    padding: 10,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '30%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  imageText: {
    position: 'absolute',
    top: 10,
    left: 10,
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // card: {
  //   backgroundColor: '#2A2A2A',
  //   borderRadius: 10,
  //   marginBottom: 10,
  //   padding: 15,
  // },
  stockRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  stockName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  stockInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stockCurrent: {
    color: '#00ADF5',
    fontSize: 18,
    fontWeight: 'bold',
  },
  stockSeparator: {
    color: '#FFFFFF',
    fontSize: 18,
    marginHorizontal: 5,
  },
  stockTotal: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  progressBar: {
    flex: 1,
    height: 5,
    backgroundColor: '#3A3A3A',
    borderRadius: 5,
    overflow: 'hidden',
    marginRight: 10,
  },
  progress: {
    height: '100%',
    backgroundColor: '#00ADF5',
  },
  restockButton: {
    backgroundColor: '#00ADF5',
    padding: 5,
    borderRadius: 15,
  },
  extraStock: {
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 5,
  },
  tabIndicator: {
    backgroundColor: '#00ADF5',
    height: 3,
  },
  tabTitle: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  itemSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  itemButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#2A2A2A',
  },
  selectedItemButton: {
    backgroundColor: '#00ADF5',
  },
  itemButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  selectedItemButtonText: {
    color: '#1E1E1E',
  },
  // cardTitle: {
  //   color: '#FFFFFF',
  //   fontSize: 18,
  //   fontWeight: 'bold',
  //   marginBottom: 10,
  // },
  restockTab: {
    backgroundColor: '#1E1E1E',
  },
  // restockCard: {
  //   backgroundColor: '#2A2A2A',
  //   borderRadius: 10,
  //   padding: 20,
  //   marginBottom: 15,
  // },
  restockIcon: {
    backgroundColor: '#00ADF5',
    padding: 10,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 10,
  },
  // restockTitle: {
  //   color: '#FFFFFF',
  //   fontSize: 22,
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  //   marginBottom: 20,
  // },
  restockItemCard: {
    backgroundColor: '#3A3A3A',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  restockDate: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  // restockMessage: {
  //   color: '#CCCCCC',
  //   fontSize: 16,
  //   marginBottom: 10,
  // },
  // restockDetails: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   marginBottom: 5,
  // },
  restockDetailText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginLeft: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#2A2A2A',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtonContainer: {
    // marginTop: 20,
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '100%',
  },
  modalCancelButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  modalOkButton: {
    marginTop: 10,
    backgroundColor: '#00ADF5',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    padding: 10,
  },
  // card: {
  //   backgroundColor: '#2A2A2A',
  //   borderRadius: 10,
  //   padding: 15,
  //   marginBottom: 15,
  // },
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
  // container: {
  //   flex: 1,
  //   backgroundColor: '#1E1E1E',
  // },
  card: {
    backgroundColor: '#2A2A2A',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  userMessage: {
    justifyContent: 'flex-end',
  },
  botMessage: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 40,
    height: 40,
  },
  userAvatar: {
    backgroundColor: '#00ADF5',
  },
  botAvatar: {
    backgroundColor: '#FF6B6B',
  },
  messageContent: {
    maxWidth: '80%',
    backgroundColor: '#3A3A3A',
    borderRadius: 10,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  senderName: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  messageText: {
    color: '#FFFFFF',
  },
  messageTime: {
    color: '#CCCCCC',
    fontSize: 12,
    alignSelf: 'flex-end',
    marginTop: 5,
  },
});


export default MachineScreen;