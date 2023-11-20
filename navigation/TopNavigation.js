import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import NotificationsOverlay from '../screens/NotificationsScreen';


const CustomTopNavigation = ({ onNotificationsPress }) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const navigateToHome = () => {
    navigation.navigate('Home');
  };

  const goBackToHome = () => {
    navigation.goBack(); 
  };

  return (
    <View style={{paddingTop: insets.top,paddingBottom: insets.bottom,paddingLeft: insets.left, paddingRight: insets.right,
      }}>
    <View style={styles.container} >
      <TouchableOpacity onPress={navigation.canGoBack() ? goBackToHome : navigateToHome} >
      <View style={styles.titleContainer} > 
        <Text style={styles.title}>{navigation.canGoBack() ? 'Task Manager' : 'Task Manager'}</Text>
      </View>  
      </TouchableOpacity>
      <TouchableOpacity onPress={onNotificationsPress}>
      <View style={styles.notificationSymbol}>
        <Ionicons name="notifications" size={24} color="#000" />
        </View>
      </TouchableOpacity>
    </View>
    </View>
  );
};
const TopNavigation = () => {
  const [isNotificationsVisible, setNotificationsVisible] = React.useState(false);
  const insets = useSafeAreaInsets();

  const toggleNotificationsOverlay = () => {
    setNotificationsVisible(!isNotificationsVisible);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomTopNavigation onNotificationsPress={toggleNotificationsOverlay} />
      <NotificationsOverlay
        isVisible={isNotificationsVisible}
        onClose={toggleNotificationsOverlay}
        insets={insets}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 0,
    backgroundColor: 'white',
    elevation: 5,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    justifyContent: "center",
  },
  titleContainer: {
    flex: 0,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontFamily: 'KottaOne',
    textAlign: 'center',
  },
  notificationSymbol: {
    position: "absolute",
    right: -110,
    top: -10
  },
});

export default TopNavigation;
