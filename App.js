import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import HomeScreen from './screens/HomeScreen';
import BottomNavigation from './navigation/BottomNavigation';
import TopNavigation from './navigation/TopNavigation';
import SettingsScreen from './screens2/SettingsScreen';
import FavoriteTasksScreen from './screens2/FavoriteTasksScreen';
import signInScreen from './ProfileForms/signInScreen';
import signUpScreen from './ProfileForms/signUpScreen';
import landingScreen from './ProfileForms/landingScreen';

const Stack = createNativeStackNavigator();

const customFonts = {
  'KottaOne': require('./assets/fonts/KottaOne-Regular.ttf'),
  'NotoSans': require('./assets/fonts/NotoSans-Regular.ttf')
};

export const globalStyles = StyleSheet.create({
  text: {
    fontFamily: 'NotoSans',
    fontSize: 16,
  },
  kottaOneText: {
    fontFamily: 'KottaOne',
    fontSize: 24,
  },
});

export default function App() {
  const [isFontLoaded, setIsFontLoaded] = useState(false);
  

  const loadCustomFonts = async () => {
    await Font.loadAsync(customFonts);
    setIsFontLoaded(true);
  }

  useEffect(() => {
    loadCustomFonts();
  }, []);

  return(
     <SafeAreaProvider>
      <NavigationContainer>
        {isFontLoaded && (
          <Stack.Navigator initialRouteName='landingScreen'>
            
            <Stack.Screen name="BottomNavigation" component={BottomNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="TopNavigation" component={TopNavigation} options={{ headerShown: false }} />
            <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="FavoriteTasksScreen" component={FavoriteTasksScreen} options={{ headerShown: false }} />
            

            <Stack.Screen name="signInScreen" component={signInScreen} options={{ headerShown: false }} />
            <Stack.Screen name="landingScreen" component={landingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="signUpScreen" component={signUpScreen} options={{ headerShown: false}} />
            
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
