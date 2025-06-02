import React, { useState, useEffect } from 'react';
import { Image, Button, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth, firebase, storage, database } from '../firebase'
import { ref as ref_d, set, get, onValue } from 'firebase/database'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons'; //https://ionic.io/ionicons/v4
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import your screen components
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import PasswordResetScreen from './screens/PasswordResetScreen';
import BackgroundInfoScreen from './screens/BackgroundInfoScreen';
import InscriptionScreen from './(tabs)/InscriptionScreen';
import MyMachinesScreen from './(tabs)/MyMachinesScreen';
import NotifsScreen from './(tabs)/NotifsScreen';
import InventoryScreen from './(tabs)/InventoryScreen';
import AjoutMachineScreen from './screens/AjoutMachineScreen';
import DemandesFormationsScreen from './(tabs)/DemandesFormationsScreen';
import DemandesProfilsScreen from './(tabs)/DemandesProfilsScreen';
import UnderConstructionScreen from './screens/UnderConstructionScreen';
import MachineScreen from './screens/MachineScreen';
// import OrganizationsPartenairesScreen from './screens/OrganizationsPartenairesScreen';
// import InscriptionMachineScreen from './screens/InscriptionMachineScreen';
import ValidationProfilScreen from './screens/ValidationProfilScreen';
import AjoutFormateurScreen from './screens/AjoutFormateurScreen';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();



function App() {
  const [gameFileContext, setGameFile] =   React.useState({"isFormateur":"true", "isValidated":"true"}) //ouch
  const [isAdmin, setIsAdmin] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // In case user already logged in - else same in Login component.
  React.useMemo(()=>{
    const userLoggedIn = (auth.currentUser)
    // console.log(userLoggedIn.uid)  
    if (userLoggedIn !== null) {
      // User Roles loaded from Firebase Realtime Database.
      const gameFileRef = ref_d(database, "userdata/"+String(userLoggedIn.uid) );

      onValue(gameFileRef, (snapshot) =>  {
            const data = snapshot.val();
            if (data){
              console.log('Userdata downloaded in App.js'+ data)
              setGameFile(data)
            }
          })

    }
    
      }, [])


  
  function UserTabs() {
    return (
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarStyle:  {
          backgroundColor: '#1a53ff',
      },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
  
          if (route.name === 'MyMachines') {
            iconName = focused ? 'search' : 'search';
          } else if (route.name === 'Notifications') {
            iconName = focused ? 'notifications-outline' : 'notifications-outline';
          } else if (route.name === 'Inventory') {
            iconName = focused ? 'person' : 'person';
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'white',
      })}>
        <Tab.Screen name="MyMachines" component={MyMachinesScreen} initialParams={{spoofLoggedIn: true, spoofFormateur: false, spoofAdmin: false, spoofValidated: true}}/>
        <Tab.Screen name="Notifications" component={NotifsScreen} initialParams={{"gameFileContext": gameFileContext}}/>
        <Tab.Screen name="Inventory" component={InventoryScreen} initialParams={{"gameFileContext": gameFileContext}}/>
      </Tab.Navigator>
    );
  }

  function RestrainedTabs() {
    return (
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarStyle:  {
          backgroundColor: '#1a53ff',
      },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
  
          if (route.name === 'MyMachines') {
            iconName = focused ? 'build' : 'build';
          } else if (route.name === 'Notifications') {
            iconName = focused ? 'notifications-outline' : 'notifications-outline';
          } else if (route.name === 'Inventory') {
            iconName = focused ? 'cube' : 'cube';
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'black',
      })}>
        <Tab.Screen name="MyMachines" component={MyMachinesScreen} initialParams={{spoofLoggedIn: false, spoofFormateur: false, spoofAdmin: false, spoofValidated: true}}/>
        {/* <Tab.Screen name="Notifications" component={NotifsScreen} initialParams={{"gameFileContext": gameFileContext}}/> */}
        <Tab.Screen name="Inventory" component={InventoryScreen} initialParams={{"gameFileContext": gameFileContext}}/>
      </Tab.Navigator>
    );
  }

  

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>

        <Stack.Screen name="Login"          component={LoginScreen} options={{headerShown: false}} initialParams={{"gameFileContext": gameFileContext}}  />
        <Stack.Screen name="Signup"         component={SignupScreen} />
        <Stack.Screen name="PasswordReset"  component={PasswordResetScreen} />
        {/* <Stack.Screen name="OrganizationsPartenaires" component={OrganizationsPartenairesScreen} /> */}


        
        <Stack.Screen name="AjoutMachine"       component={AjoutMachineScreen} />
        <Stack.Screen name="Machine"       component={MachineScreen} />
        <Stack.Screen name="MyMachines"  component={MyMachinesScreen} options={{ headerShown: true, headerBackTitleVisible: true }}/>
        {/* <Stack.Screen name="InscriptionMachine" component={InscriptionMachineScreen} /> */}

        {/* tabs if ADMIN */}
        {/* <Stack.Screen name="AdminTabs"            component={AdminTabs} options={{ headerShown: false }}  /> */}
        <Stack.Screen name="ValidationProfil" component={ValidationProfilScreen} />
        <Stack.Screen name="AjoutFormateur"       component={AjoutFormateurScreen} />

        {/* tabs if NEW */}
        {/* <Stack.Screen name="NewUserTabs" component={NewUserTabs} options={{ headerShown: false }} /> */}

        {/* tabs if ETUDIANT */}
        <Stack.Screen name="UserTabs" component={UserTabs} options={{ headerShown: false }}  />

        {/* tabs if FORMATEUR */}
        {/* <Stack.Screen name="FormateurTabs" component={FormateurTabs} options={{ headerShown: false }}  /> */}
        
        {/* Restrained Functionality */}
        <Stack.Screen name="RestrainedTabs"            component={RestrainedTabs} options={{ headerShown: false }}  />

        <Stack.Screen name="UnderConstruction" component={UnderConstructionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;