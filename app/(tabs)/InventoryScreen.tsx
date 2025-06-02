import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const locations = ['Home', 'Machine 1', 'Machine 2', 'Machine 3'];

const inventory = [
  { id: '1', name: 'Screwdriver', quantity: 2, location: 'Home' },
  { id: '2', name: 'Hammer', quantity: 1, location: 'Machine 1' },
  { id: '3', name: 'Wrench', quantity: 3, location: 'Machine 2' },
  { id: '4', name: 'Pliers', quantity: 2, location: 'Machine 3' },
  { id: '5', name: 'Drill', quantity: 1, location: 'Home' },
  { id: '6', name: 'Saw', quantity: 1, location: 'Machine 1' },
  { id: '7', name: 'Measuring Tape', quantity: 2, location: 'Machine 2' },
  { id: '8', name: 'Level', quantity: 1, location: 'Machine 3' },
];

const InventoryScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');

  const filteredInventory = inventory.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedLocation === 'All' || item.location === selectedLocation)
  );

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemDetails}>Quantity: {item.quantity}</Text>
      <Text style={styles.itemDetails}>Location: {item.location}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inventory</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search inventory..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Picker
        selectedValue={selectedLocation}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedLocation(itemValue)}
      >
        <Picker.Item label="All Locations" value="All" />
        {locations.map(location => (
          <Picker.Item key={location} label={location} value={location} />
        ))}
      </Picker>
      <FlatList
        data={filteredInventory}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    marginBottom: 10,
  },
  list: {
    flex: 1,
  },
  item: {
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDetails: {
    fontSize: 14,
    color: '#666',
  },
});

export default InventoryScreen;