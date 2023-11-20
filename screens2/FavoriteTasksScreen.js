import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import TopNavigation from '../navigation/TopNavigation';

const FavoriteTasksScreen = ({ route }) => {
  const navigation = useNavigation();
  const { task } = route.params;
  const [favoriteTasks, setFavoriteTasks] = useState([]);

  useEffect(() => {
    setFavoriteTasks((prevTasks) => [...prevTasks, task]);
  }, [task]);

  const removeCompletedTask = (index) => {
    const updatedFavoriteTasks = [...favoriteTasks];
    updatedFavoriteTasks.splice(index, 1);
    setFavoriteTasks(updatedFavoriteTasks);
  };

  return (
    <ScrollView style={styles.container}>
      <TopNavigation />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FeatherIcon name="arrow-left" size={24} color="#1f1f1f" />
        </TouchableOpacity>
        <Text style={styles.textTitle}>Favorite Tasks</Text>
      </View>
      <ScrollView contentContainerStyle={styles.todayContainer}>
        {favoriteTasks.map((favoriteTask, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.text}>{favoriteTask.text}</Text>
            <View style={styles.taskInfo}>
              <View style={styles.categoryContainer}>
                <Text style={styles.categoryHeader}>Category:</Text>
                <Text style={styles.categoryText}>{favoriteTask.category}</Text>
              </View>
              {favoriteTask.date && (
                <View style={styles.dueDateContainer}>
                  <Text style={styles.dueDateText}>Due Date:</Text>
                  <Text style={styles.dateText}>
                    {new Date(favoriteTask.date).toDateString()}
                  </Text>
                </View>
              )}
            </View>
            <View style={styles.actionContainer}>
              <TouchableOpacity onPress={() => removeCompletedTask(index)}>
                <View style={styles.circle}></View>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 12,
    paddingLeft: 12,
  },
  backButton: {
    marginRight: 105,
  },
  textTitle: {
    fontFamily: 'KottaOne',
    fontSize: 20,
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  todayContainer: {
    marginTop: 20,
  },
  item: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#F9F9F9',
    elevation: 5,
    borderRadius: 30,
    padding: 20,
  },
  text: {
    fontFamily: 'NotoSans',
    fontSize: 16,
    maxWidth: '70%',
    maxHeight: '70%',
  },
  taskInfo: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    top: 10,
  },
  categoryHeader: {
    fontFamily: 'NotoSans',
    fontWeight: 'bold',
    fontSize: 14,
    color: 'black',
    textDecorationLine: 'underline',
  },
  categoryText: {
    fontFamily: 'NotoSans',
    fontSize: 14,
    marginLeft: 5,
    marginRight: 25,
  },
  dueDateContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    top: 10,
  },
  dueDateText: {
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
  actionContainer: {},
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
    borderWidth: 2,
  },
});

export default FavoriteTasksScreen;
