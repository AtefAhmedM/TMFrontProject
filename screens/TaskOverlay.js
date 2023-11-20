import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, TouchableWithoutFeedback } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/AntDesign';
import Popover from 'react-native-popover-view';

const TaskOverlay = ({ onAddTask, onClose, selectedCategory, onCategorySelect, selectedDate, onSelectDate, 
  isCalendarScreen, calendarDate, homeDate, selectedDateText })  => {

  const [task, setTask] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [repeat, setRepeat] = useState('No');
  const [isRepeatModalVisible, setRepeatModalVisible] = useState(false);
  const [repeatButtonLayout, setRepeatButtonLayout] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [categories, setCategories] = useState([
    'Work',
    'Personal',
    'Wishlist',
    'Birthday',
    'Family',
  ]);
  const [newCategory, setNewCategory] = useState('');
  const [isAddCategoryOverlayVisible, setAddCategoryOverlayVisible] = useState(false);
  

  const handleAddTask = () => {
    if (task.trim() === '' || selectedCategory === null) {
      alert('Please enter task text and select a category.');
      return;
    }

    let taskDate = null;

    if (isCalendarScreen && selectedDateText) {
      taskDate = new Date(selectedDateText); // Use the selected date text
    } else if (!isCalendarScreen && homeDate) {
      taskDate = new Date(homeDate); // Use homeDate when isCalendarScreen is false
    } else {
      taskDate = calendarDate || new Date(); // Use calendarDate or current date as fallback
    }

    onAddTask({
      text: task,
      category: selectedCategory,
      date: taskDate.toISOString(),
      repeat: repeat,
    });

    setTask('');
    onClose();
  };

  useEffect(() => {
    // Set the calendar date when the overlay is opened from the calendar screen
    if (isCalendarScreen && calendarDate) {
      onSelectDate(calendarDate);
    } else if (!isCalendarScreen && selectedDateText) {
      // Set the date from the date picker when not in the calendar screen
      onSelectDate(selectedDate);
    }
  }, [isCalendarScreen, calendarDate, selectedDateText, selectedDate]);

  const handleCategorySelection = (category) => {
    onCategorySelect(category);
  };

  const toggleDatepicker = () => {
    setShowPicker(!showPicker);
  };

  const handleDateSelection = (selectedDate) => {
    setShowPicker(false);
    
    const updatedDate = isCalendarScreen ? selectedDate.dateString : selectedDate.toDateString();
    onSelectDate(updatedDate);
  };

  const toggleRepeatModal = () => {
    setRepeatModalVisible(!isRepeatModalVisible);
  };

  const handleRepeatOption = (option) => {
    setRepeat(option);
    toggleRepeatModal();
  };

  const onRepeatButtonLayout = (event) => {
    if (repeatButtonLayout.width === 0) {
      setRepeatButtonLayout({
        x: event.nativeEvent.layout.x,
        y: event.nativeEvent.layout.y,
        width: event.nativeEvent.layout.width,
        height: event.nativeEvent.layout.height,
      });
    }
  };

  const handleAddCategory = () => {
    if (newCategory.trim() === '') {
      alert('Please enter a category name.');
      return;
    }

    setCategories((prevCategories) => [...prevCategories, newCategory]);
    setNewCategory('');
    setAddCategoryOverlayVisible(false); //
  };

  const handleOverlayClose = () => {
    setAddCategoryOverlayVisible(false);
  };

  const handleDeleteNewCategory = (category) => {
    // Check if the category is a new category
    if (!['Work', 'Personal', 'Wishlist', 'Birthday', 'Family'].includes(category)) {
      // Delete the category only if it's a new category
      setCategories((prevCategories) => prevCategories.filter((c) => c !== category));
    }
  };

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.overlayContainer}>
        <TouchableWithoutFeedback>
          <View style={styles.overlay}>
            <Text style={styles.overlayTitle}>Category</Text>
            <ScrollView horizontal style={styles.categoryScroll}>
              {categories.map((category, index) => (
                <TouchableOpacity
                  key={index}
                  onLongPress={() => handleDeleteNewCategory(category)}
                  style={[
                    styles.categoryButton,
                    selectedCategory === category ? styles.selectedCategory : null,
                  ]}
                  onPress={() => handleCategorySelection(category)}
                >
                  <Text style={styles.categoryText}>{category}</Text>
                </TouchableOpacity>
              ))}
              
              <TouchableOpacity
                style={styles.categoryButton}
                onPress={() => setAddCategoryOverlayVisible(true)}
              >
                <Text style={styles.categoryText}>+</Text>
              </TouchableOpacity>
            </ScrollView>

            <TextInput
              style={styles.input}
              placeholder="Write Task"
              value={task}
              onChangeText={(text) => setTask(text)}
            />

            <Text style={styles.dueDateText}>Due Date</Text>
            <TouchableOpacity style={styles.dropdownButton} onPress={toggleDatepicker}>
              <Text style={styles.buttonText2}>
                {selectedDate
                  ? isCalendarScreen
                    ? new Date(selectedDate).toDateString() 
                    : selectedDate
                  : 'Select Date'}
              </Text>
              <Icon name="down" size={20} color="#000" />
            </TouchableOpacity>
            <Text style={styles.dueDateText}>Repeat</Text>
            <TouchableOpacity
              style={styles.dropdownButton2}
              onPress={toggleRepeatModal}
              onLayout={onRepeatButtonLayout}
            >
              <Text style={styles.buttonText2}>{'Repeat: ' + repeat}</Text>
              <Icon name="down" size={20} color="#000" />
            </TouchableOpacity>

            {showPicker && (
              <DateTimePicker
                mode="date"
                display="spinner"
                value={selectedDate ? new Date(selectedDate) : new Date()}
                onChange={(_, selectedDate) => {
                  if (selectedDate) {
                    handleDateSelection(selectedDate);
                  }
                }}
                maximumDate={new Date('2025-02-01')}
                minimumDate={new Date()}
              />
            )}
            {isRepeatModalVisible && repeatButtonLayout && (
              <Popover
                isVisible={isRepeatModalVisible}
                fromRect={{
                  x: repeatButtonLayout.x,
                  y: repeatButtonLayout.y + repeatButtonLayout.height,
                  width: repeatButtonLayout.width,
                  height: repeatButtonLayout.height,
                }}
                onClose={toggleRepeatModal}
                popoverStyle={styles.repeatModal}
              >
                <View >
                  <TouchableOpacity style={styles.repeatOption} onPress={() => handleRepeatOption('Yes')}>
                    <Text style={styles.repeatOptionText}>Yes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.repeatOption2} onPress={() => handleRepeatOption('No')}>
                    <Text style={styles.repeatOptionText}>No</Text>
                  </TouchableOpacity>
                </View>
              </Popover>
            )}
            
            <Popover
              isVisible={isAddCategoryOverlayVisible}
              fromView={this.addCategoryButton}
              onRequestClose={handleOverlayClose}
              popoverStyle={styles.popoverContent}
            >
              <View >
                <Text style={styles.overlayTitle}>Add New Category</Text>
                <TextInput
                  style={styles.input}
                  placeholder="New Category"
                  value={newCategory}
                  onChangeText={(text) => setNewCategory(text)}
                />
                <TouchableOpacity style={styles.addCategoryButton} onPress={handleAddCategory}>
                  <Text style={styles.buttonText}>Add Category</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.closeButton} onPress={handleOverlayClose}>
                  <Text style={styles.buttonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </Popover>
            <TouchableOpacity style={styles.addTaskButton} onPress={handleAddTask}>
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: '20',
  },
  overlay: {
    backgroundColor: '#F9F9F9',
    elevation: 10,
    padding: 30,
    borderWidth: 2,
    borderBlockColor: '#D9D9D9',
    borderLeftColor: '#D9D9D9',
    borderRightColor: '#D9D9D9',
    borderRadius: 30,
    position: 'absolute', // Position the overlay absolutely
    top: '10%', // Adjust the top position as needed
    left: '2.5%', // Adjust the left position as needed
    paddingHorizontal: 5,
    alignItems: 'center',
    paddingVertical: '50',
    paddingHorizontal: 10,
    maxWidth: '97.8%',
  },
  overlayTitle: {
    fontFamily: 'KottaOne',
    fontSize: 20,
    marginBottom: 15,
  },
  categoryScroll: {
    marginBottom: 15,
  },
  categoryButton: {
    backgroundColor: '#A6BBBF',
    borderRadius: 30,
    borderColor: 'gray',
    padding: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedCategory: {
    backgroundColor: '#6EB8C9',
  },
  categoryText: {
    fontSize: 14,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 30,
    padding: 10,
    marginBottom: 10,
    width: '100%',
    maxWidth: '100%',
  },
  dropdownButton: {
    backgroundColor: '#6EB8C9',
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 30,
    elevation: 7,
    width: 200,
    height: 45,
    justifyContent: 'space-between',
    textAlign: 'center',
    marginBottom: 10,
  },
  dropdownButton2: {
    backgroundColor: '#6EB8C9',
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 30,
    elevation: 7,
    width: 200,
    height: 45,
    justifyContent: 'space-between',
    textAlign: 'center',
    marginBottom: 25,
  },
  dueDateText: {
    fontFamily: 'KottaOne',
    fontSize: 16,
    marginBottom: 10,
    marginTop: 10,
  },
  addTaskButton: {
    backgroundColor: '#C1FD18',
    padding: 10,
    alignItems: 'center',
    borderRadius: 30,
    elevation: 7,
    width: 144,
  },
  addCategoryButton: {
    backgroundColor: '#C1FD18',
    padding: 10,
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 30,
    elevation: 7,
    width: 144,
  },
  buttonText: {
    fontFamily: 'NotoSans',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonText2: {
    fontFamily: 'NotoSans',
    fontSize: 14,
  },
  repeatText: {
    fontFamily: 'KottaOne',
    fontSize: 16,
    marginBottom: 10,
  },
  repeatModal: {
    backgroundColor: '#F9F9F9',
    padding: 10,
    width: 144,
    borderRadius: 30,
    alignItems: 'center',
  },
  repeatOption: {
    paddingVertical: 10,
    width: 144,
    alignItems: 'center',
  },
  repeatOption2: {
    paddingVertical: 10,
    borderTopWidth: 1,
    width: 144,
    alignItems: 'center',
  },
  repeatOptionText: {
    fontFamily: 'NotoSans',
    fontSize: 16,
  },
  popoverContent: {
    backgroundColor: '#F9F9F9',
    padding: 30,
    borderRadius: 30,
  },
  popoverArrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#F9F9F9',
    borderWidth: 10,
    borderRadius: 30,
    alignContent: 'center',
  },
  closeButton: {
    marginTop: 10,
    alignSelf: 'center',
  },
});

export default TaskOverlay;
