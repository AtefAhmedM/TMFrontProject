import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';

const NotificationsOverlay = ({ isVisible, onClose }) => {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
    >
      <View style={styles.overlayContainer}>
        <View style={styles.overlayContent}>
          <Text style={styles.overlayTitle}>Notifications</Text>
          {/* Add your notification content here */}
          <Text>Notification 1</Text>
          <Text>Notification 2</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  overlayContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    backgroundColor: '#F9F9F9',
    elevation: 5,
  },
  overlayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: 'tomato',
    borderRadius: 5,
    padding: 10,
  },
  closeButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default NotificationsOverlay;
