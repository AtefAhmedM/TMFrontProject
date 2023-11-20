import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons';


const ListOverlay = ({  onClose, navigateToSettings }) => {

  const handleSettingsPress = (screenName) => {
    // Use the passed function to navigate to the specified screen (Settings or Favorite)
    navigateToSettings(screenName);
  };
  return (
    <View style={styles.overlay}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <MaterialIcons name="close" size={36} color="black" style={styles.closeIcon} />
      </TouchableOpacity>
      <View style={styles.overlayContent}>
        <Text style={styles.overlayTitle}>Menu</Text>
        <MenuItem iconName="favorite" text="Favorite Tasks" onPress={() => navigateToSettings('FavoriteTasksScreen')}  />
        <View style={styles.line} />
        <MenuItem iconName="settings" text="Settings" onPress={() => handleSettingsPress('SettingsScreen')}  />
        <View style={styles.line} />
        <MenuItem iconName="feedback" text="Feedback" onPress={onClose} />
        <View style={styles.line} />
        <MenuItem iconName="help" text="FAQ" onPress={onClose} />
        <View style={styles.line} />
      </View>
    </View>
  );
};

const MenuItem = ({ iconName, text, onPress, navigation }) => {
  const handlePress = () => {
    if (navigation && !onPress) {
      if (text === 'Settings') {
        navigation.navigate('SettingsScreen');
      } else if (text === 'Favorite Tasks') {
        navigation.navigate('FavoriteTasksScreen'); 
      } 
    } else {
      onPress && onPress();
    }
  };
  return (
    <TouchableOpacity style={styles.menuItem} onPress={handlePress}>
      <MaterialIcons name={iconName} size={24} color="#6EB8C9" style={styles.icon} />
      <Text style={styles.menuItemText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: "100%",
    height: "100%",
    backgroundColor: '#F9F9F9',
    elevation: 5,
    borderRadius: 30,
  },
  closeButton: {
    position: "relative",
    top: 20,
    right: -150,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  closeIcon: {
    fontSize: 36,
    
  },
  overlayContent: {
    padding: 20,
  },
  overlayTitle: {
    fontFamily: 'KottaOne',
    fontSize: 24,
    marginBottom: 50,
    marginLeft: 10
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  icon: {
    marginRight: 10,
    marginLeft: 10
  },
  menuItemText: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'NotoSans',
    marginLeft: 10
  },
  line: {
    alignSelf: 'center', 
    height: 1,
    width: 200,
    backgroundColor: 'gray',
    marginTop: 15,
    marginBottom: 15,
    shadowColor: 'black', 
    shadowOpacity: 1,
    shadowRadius: 2,
  },
});

export default ListOverlay;
