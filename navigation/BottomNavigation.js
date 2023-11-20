import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import { Image } from 'react-native'; 
import { useNavigation } from '@react-navigation/native'; 

import HomeScreen from '../screens/HomeScreen';
import AccountScreen from '../screens/AccountScreen';
import CalendarScreen from '../screens/CalendarScreen';
import ListOverlay from '../screens/ListOverlay';


const BottomTab = createBottomTabNavigator();

const BottomNavigation = () => {
  const [isListModalVisible, setListModalVisible] = useState(false);
  const navigation = useNavigation();

  const toggleListModal = () => {
    setListModalVisible(!isListModalVisible);
  };
  
  const navigateToSettings = (screenName) => {
   
    navigation.navigate(screenName);
    toggleListModal();
  };

  return (
    <>
      <BottomTab.Navigator initialRouteName="Home">
        <BottomTab.Screen
          name="ListTab"
          component={HomeScreen} 
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              e.preventDefault();
              toggleListModal();
            },
          })}
          options={{
            tabBarLabel: '',
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require('../assets/List.png')}
                style={{ top:6 ,width: 34, height: 34 }}
              />
            ),
          }}
        />
        <BottomTab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
          }}
        />
        <BottomTab.Screen
          name="Calendar"
          component={CalendarScreen}
          options={{
            tabBarLabel: 'Calendar',
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calendar" color={color} size={size} />
            ),
          }}
        />
        <BottomTab.Screen
          name="Account"
          component={AccountScreen}
          options={{
            tabBarLabel: 'Account',
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" color={color} size={size} />
            ),
          }}
        />
      </BottomTab.Navigator>

      <Modal isVisible={isListModalVisible}>
      <ListOverlay visible={isListModalVisible} onClose={toggleListModal} navigateToSettings={navigateToSettings} />
      </Modal>
    </>
  );
};

export default BottomNavigation;
