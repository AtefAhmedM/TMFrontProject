import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Modal } from 'react-native';
import TopNavigation from '../navigation/TopNavigation';
import TaskOverlay from './TaskOverlay';
import { useNavigation } from '@react-navigation/native';
import { LongPressGestureHandler, State, GestureHandlerRootView } from 'react-native-gesture-handler';
import {  } from 'react-native-gesture-handler';

const HomeScreen = () => {
  const [taskItems, setTaskItems] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [isTaskOverlayVisible, setTaskOverlayVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showCompleted, setShowCompleted] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const navigation = useNavigation();
  const [repeat, setRepeat] = useState('No');

  const handleAddTask = () => {
    setTaskOverlayVisible(true);
  };

  const handleCloseOverlay = () => {
    setTaskOverlayVisible(false);
  };

  const handleCompleteTask = (index) => {
    const completedTask = taskItems[index];
    const itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
    setCompletedTasks([...completedTasks, completedTask]);
  };

  const removeCompletedTask = (index) => {
    const completedTaskCopy = [...completedTasks];
    completedTaskCopy.splice(index, 1);
    setCompletedTasks(completedTaskCopy);
  };

  const handleHomeScreenDateSelection = (selectedDate) => {
    setSelectedDate(selectedDate);
  };

  const addTask = (newTask) => {
    setTaskItems([newTask, ...taskItems]);
    setSelectedCategory(null);
    setTaskOverlayVisible(false);
  };

  const onCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const saveTaskToFavorite = (task) => {
    navigation.navigate('FavoriteTasksScreen', { task });
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}> 
      <ScrollView style={styles.container}>
        <TopNavigation />
        <Modal visible={isTaskOverlayVisible} transparent animationType="slide">
        <View style={styles.overlayBackground}> 
          <TaskOverlay
            onAddTask={addTask}
            onClose={handleCloseOverlay}
            selectedCategory={selectedCategory}
            onCategorySelect={onCategorySelect}
            selectedDate={selectedDate}
            onSelectDate={handleHomeScreenDateSelection}
            repeat={repeat}
            isCalendarScreen={false}
            calendarDate={selectedDate}
            homeDate={selectedDate}
          />
          </View>
        </Modal>

        <View style={styles.header}>
          <Text style={styles.textTitle}>Today</Text>
        </View>
        <ScrollView contentContainerStyle={styles.todayContainer}>
          {taskItems.slice(0).reverse().map((item, index) => (
            <LongPressGestureHandler
              key={index}
              onHandlerStateChange={({ nativeEvent }) => {
                if (nativeEvent.state === State.ACTIVE) {
                  // Perform action on long press
                  saveTaskToFavorite(item); // Save the entire task object to favorites
                }
              }}
            >
              <View style={styles.item} key={index}>
                <Text style={styles.text}>{item.text}</Text>
                <View style={styles.taskInfo}>
                  <View style={styles.categoryContainer}>
                    <Text style={styles.categoryHeader}>Category:</Text>
                    <Text style={styles.categoryText}>{item.category}</Text>
                  </View>
                  {item.date && (
                    <View style={styles.dueDateContainer}>
                      <Text style={styles.dueDateText}>Due Date:</Text>
                      <Text style={styles.dateText}>{new Date(item.date).toDateString()}</Text>
                    </View>
                  )}
                </View>
                <View style={styles.actionContainer}>
                  <TouchableOpacity onPress={() => handleCompleteTask(index)}>
                    <View style={styles.circle}></View>
                  </TouchableOpacity>
                </View>
              </View>
            </LongPressGestureHandler>
          ))}
        </ScrollView>

        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => setShowCompleted(!showCompleted)}
            style={{ borderBottomColor: showCompleted ? '#FEC0C0' : 'blue' }}
          >
            <Text
              style={[
                styles.completedText,
                { color: showCompleted ? '#FEC0C0' : 'blue' },
                { textDecorationLine: showCompleted ? 'none' : 'underline' },
              ]}
            >
              Completed Today
            </Text>
          </TouchableOpacity>
        </View>
        {showCompleted && (
          <ScrollView contentContainerStyle={styles.completedTasksContainer}>
          {completedTasks.map((item, index) => (
            <View key={index} style={styles.item2}>
              <Text style={styles.text}>{item.text}</Text>
              <View style={styles.taskInfo}>
                <View style={styles.categoryContainer}>
                  <Text style={styles.categoryHeader}>Category:</Text>
                  <Text style={styles.categoryText}>{item.category}</Text>
                </View>
                {item.date && (
                  <View style={styles.dueDateContainer}>
                    <Text style={styles.dueDateText}>Due Date:</Text>
                    <Text style={styles.dateText}>{new Date(item.date).toDateString()}</Text>
                  </View>
                )}
              </View>
              <View style={styles.actionContainer}>
                <TouchableOpacity onPress={() => removeCompletedTask(index)}>
                  <View style={styles.circle2}></View>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
        )}
      </ScrollView>

      <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
        <Text style={styles.buttonText}>Add Task</Text>
      </TouchableOpacity>
      </GestureHandlerRootView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  todayContainer: {
    marginTop: 20, 
  },
  completedTasksContainer: {
    marginTop: 20,
  },
  textTitle: {
    fontFamily: 'KottaOne',
    fontSize: 20,
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  text: {
    fontFamily: 'NotoSans',
    fontSize: 16,
    maxWidth: '70%',
    maxHeight: '70%',
  },
  addButton: {
    borderRadius: 30,
    backgroundColor: '#C1FD18',
    width: 144,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 16, 
    left: 16,
    shadowColor: 'black',
    elevation: 7,
  },
  buttonText: {
    fontFamily: 'NotoSans',
    fontSize: 20,
    fontWeight: 'bold',
  },
  items: {
    flex: 1,
  },
  inputContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  dueDateContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    top: 10,
  },
  writeTaskWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    fontFamily: 'NotoSans',
    fontSize: 16,
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 30,
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addInput: {
    fontSize: 20,
    fontWeight: '100',
  },
  item: {
    flexDirection: 'column', 
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginHorizontal : 10,
    marginBottom: 20,
    backgroundColor: '#F9F9F9',
    elevation: 5,
    borderRadius: 30,
    padding: 20,
  },
  item2: {
    flexDirection: 'column', 
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginHorizontal : 10,
    marginBottom: 20,
    backgroundColor: '#F7C5C5',
    elevation: 5,
    borderRadius: 30,
    padding: 20,
  },
  circle: {
    width: 28,
    height: 28,
    backgroundColor: 'transparent',
    borderRadius: 30,
    position: 'absolute', 
    top: -26, 
    right: -360, 
    transform: [{ translateY: -12 }],
    borderColor: '#6EB8C9',   
    borderWidth: 2
  },
  circle2:{
    width: 28,
    height: 28,
    backgroundColor: '#EFB8F0',
    borderRadius: 30,
    position: 'absolute', 
    top: -26, 
    right: -360, 
    transform: [{ translateY: -12 }],
  },
  overlayBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  categoryHeader: {
    fontFamily: 'NotoSans',
    fontWeight: 'bold',
    fontSize: 14,
    color: 'black', 
    textDecorationLine: 'underline',
  },
  taskInfo: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  titleContainer: {
    flex: 1,
  },
  categoryContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'flex-start',
    top: 10,
  },
  categoryText: {
    fontFamily: 'NotoSans',
    fontSize: 14,
    marginLeft: 5,
    marginRight: 25, 
  },
  header: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  clickableText: {
    borderBottomWidth: 1,
    borderBottomColor: 'blue', 
  },
  completedText: {
    fontFamily: 'KottaOne',
    fontSize: 20,
    alignSelf: 'center',
    marginTop: 10,
  },
  dueDateText:{
    fontFamily: 'NotoSans',
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    textDecorationLine: 'underline',
    marginRight: 5,
  },
  dateText: {
    fontFamily: 'NotoSans',
    fontSize: 14,
  },
  completedTasks: {},
  actionContainer: {},
});

export default HomeScreen;