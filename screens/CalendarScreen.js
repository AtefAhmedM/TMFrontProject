import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import TopNavigation from '../navigation/TopNavigation';
import TaskOverlay from './TaskOverlay';

const CalendarScreen = ({ route }) => {
  const [taskItems, setTaskItems] = useState({});
  const [isTaskOverlayVisible, setTaskOverlayVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString());
  const [calendarDate, setCalendarDate] = useState(null);
  const [repeat, setRepeat] = useState('No');

  useEffect(() => {
    const { params } = route;
    const tasks = params?.tasks || [];
    const updatedItems = {};

    tasks.forEach((task) => {
      const dateKey = moment(task.date).format('YYYY-MM-DD');
      updatedItems[dateKey] = [...(updatedItems[dateKey] || []), task];
    });

    setTaskItems(updatedItems);
  }, [route.params]);

  const loadItems = (day) => {
    const today = moment().startOf('day');
    const dateString = day.dateString;
    const dateKey = moment(dateString).format('YYYY-MM-DD');
    const selectedDate = moment(dateString).startOf('day');
  
    if (selectedDate.isSameOrAfter(today, 'day')) {
      setTaskItems((prevTaskItems) => ({
        ...prevTaskItems,
        [dateKey]: prevTaskItems[dateKey] || [],
      }));
    } else {
      setTaskItems({});
    }
  };
  const handleSelectDate = (date) => {
    setSelectedDate(date);
  };

  const handleCalendarScreenDateSelection = (selectedDate) => {
    setSelectedDate(selectedDate);
    setCalendarDate(selectedDate);
 
    // Load items only if the selected date is in the future
    const today = moment().startOf('day');
    const selectedDateMoment = moment(selectedDate).startOf('day');
  
    if (selectedDateMoment.isSameOrAfter(today, 'day')) {
  
      const dateKey = selectedDateMoment.format('YYYY-MM-DD');
      setTaskItems((prevTaskItems) => ({
        ...prevTaskItems,
        [dateKey]: prevTaskItems[dateKey] || [],
      }));
  
      setTaskOverlayVisible(true);
    } else {
      setTaskOverlayVisible(false);
    }
  };

  const addTask = (newTask) => {
    setSelectedCategory(null);
    setTaskOverlayVisible(false);
  
    if (newTask.text && newTask.text.trim() !== "") {
      // Only add the date if a non-empty task is added
      setTaskItems((prevTaskItems) => {
        const dateKey = moment(newTask.date).format('YYYY-MM-DD');
        const updatedTaskItems = {
          ...prevTaskItems,
          [dateKey]: [...(prevTaskItems[dateKey] || []), newTask],
        };
        return updatedTaskItems;
      });
    }
  };
  

  const onCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const removeDateAndTasks = (dateKey) => {
    setTaskItems((prevTaskItems) => {
      const updatedTaskItems = { ...prevTaskItems };
      delete updatedTaskItems[dateKey];
      return updatedTaskItems;
    });
  };

  return (
    <>
      <Modal visible={isTaskOverlayVisible} transparent animationType="slide">
        <View style={styles.overlayBackground}>
          <TaskOverlay
            onAddTask={addTask}
            onClose={() => setTaskOverlayVisible(false)}
            selectedCategory={selectedCategory}
            onCategorySelect={onCategorySelect}
            selectedDate={selectedDate}
            onSelectDate={handleSelectDate}
            repeat={repeat}
            isCalendarScreen={true}
            calendarDate={calendarDate}
            selectedDateText={selectedDate}
          />
        </View>
      </Modal>
      <View style={styles.container}>
        <TopNavigation />
        <View style={styles.calendarContainer}>
          <Calendar
            onDayPress={(day) => handleCalendarScreenDateSelection(day.dateString)}
            markedDates={{ [selectedDate]: { selected: true, disableTouchEvent: true } }}
          />
        </View>
        <ScrollView style={styles.taskListContainer}>
          {Object.keys(taskItems)
            .sort((a, b) => new Date(a) - new Date(b)) 
            .map((dateKey) => (
              <TouchableOpacity
                key={dateKey}
                onPress={() => removeDateAndTasks(dateKey)}
              >
                <View style={styles.item}>
                  <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Text style={styles.dateText}>{moment(dateKey).format('DD-MM-YY')}</Text>
                    <View style={styles.taskItemContainer}>
                      {taskItems[dateKey].map((task, index) => (
                        <View key={index} style={styles.taskItem}>
                          <Text style={styles.taskText}>{task.text}</Text>
                          <Text style={styles.categoryText}>{task.category}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
        </ScrollView>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={() => setTaskOverlayVisible(true)}>
        <Text style={styles.buttonText}>Add Task</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  calendarContainer: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    elevation: 5,
    borderRadius: 10,
    margin: 16,
    height: 600,
  },
  taskListContainer: {
    flex: 1,
    marginTop: 16,
    paddingHorizontal: 16,
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
  overlayBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  item: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  taskItemContainer: {
    flex: 1,
  },
  taskItem: {
    backgroundColor: 'rgba(217, 217, 217, 0.2)',
    padding: 15,
    marginVertical: 4,
    borderRadius: 30,
  },
  taskText: {
    fontFamily: 'NotoSans',
    fontSize: 16,
  },
  dateText: {
    fontFamily: 'NotoSans',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  categoryText: {
    fontFamily: 'NotoSans',
    fontSize: 12,
    color: 'gray',
  },
});

export default CalendarScreen;