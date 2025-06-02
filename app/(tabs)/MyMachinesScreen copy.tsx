import React, { useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
const machines = [
  {
    name: 'Seapoint FNB',
    image: require('../../assets/images/spoofMachines/seapoint-fnb.png'),
    stockStatus: '75% full',
    popularItem: 'Cola, Redbull',
    moneyMade: 'R500',
    lastService: '2024-09-15',
    photoTime: '2024-09-10 14:30'
  },
  {
    name: 'Protea Hotel',
    image: require('../../assets/images/spoofMachines/protea-hotel.png'),
    stockStatus: '60% full',
    popularItem: 'None',
    moneyMade: 'R750',
    lastService: '2024-09-10',
    photoTime: '2024-09-10 14:30'
  },
  {
    name: 'Trevor',
    image: require('../../assets/images/spoofMachines/trevor.png'),
    stockStatus: '90% full',
    popularItem: 'Lays, Doritos',
    moneyMade: 'R300',
    lastService: '2024-09-20',
    photoTime: '2024-09-10 14:30'
  },
];



const MyMachinesScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Machines',
      headerStyle: {
        backgroundColor: '#1a53ff',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const MachineCard = ({ machine }) => (
    <Card style={styles.card} onPress={() => navigation.navigate("Machine", {machine: machine})}>
      <Card.Content>
        <Text style={styles.cardTitle}>{machine.name}</Text>
        <View style={styles.imageContainer}>
          <Image source={machine.image} style={styles.machineImage} />
          <View style={styles.overlay}>
            <Text style={styles.overlayText}>{machine.photoTime}</Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoTextBold}>Running low: {machine.popularItem}</Text>
          <Text style={styles.infoText}>In Machine: {machine.moneyMade}</Text>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {machines.map((machine, index) => (
          <MachineCard key={index} machine={machine} />
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("AjoutMachine")}>
        <AntDesign name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9D9D7',
  },
  scrollContent: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  imageContainer: {
    position: 'relative',
  },
  machineImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 8,
    borderRadius: 8,
  },
  overlay: {
    position: 'absolute',
    bottom: 8,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 5,
  },
  overlayText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'left',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#555',
  },
  infoTextBold: {
    fontSize: 14,
    color: '#555',
    fontWeight: 'bold'
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#007AFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  backButton: {
    marginLeft: 15,
  },
});

export default MyMachinesScreen;