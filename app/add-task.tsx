import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function AddTaskScreen() {
  const [moduleCode, setModuleCode] = useState('');
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setDescription] = useState('');

  const saveTask = async () => {
    if (!moduleCode || !taskName) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      const existingTasks = await AsyncStorage.getItem('tasks');
      let tasksArray = existingTasks ? JSON.parse(existingTasks) : [];

      const newTask = { id: Date.now().toString(), moduleCode, taskName, taskDescription };
      tasksArray.push(newTask);

      await AsyncStorage.setItem('tasks', JSON.stringify(tasksArray));

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Task Saved Successfully! 📚",
          body: `Don't forget to complete your ${moduleCode}.`,
        },
        trigger: null,
      });

      router.back();
    } catch (error) {
      console.error('Failed to save task', error);
    }
  };

  return (
    <ImageBackground 
      source={{ uri: 'https://img.magnific.com/free-vector/isometric-time-management-concept-illustrated_52683-55534.jpg?semt=ais_hybrid&w=740&q=80' }} 
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Image 
          source={{ uri: 'https://static.vecteezy.com/system/resources/previews/016/921/110/non_2x/business-task-management-illustration-concept-on-white-background-vector.jpg' }} 
          style={styles.banner} 
        />
        
        <Text style={styles.label}>Module Code</Text>
        <TextInput 
          style={styles.input} 
          placeholder="e.g., SCSC 3212" 
          value={moduleCode} 
          onChangeText={setModuleCode} 
        />

        <Text style={styles.label}>Task Name</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Enter task name" 
          value={taskName} 
          onChangeText={setTaskName} 
        />

        <Text style={styles.label}>Task Description</Text>
        <TextInput 
          style={[styles.input, styles.textArea]} 
          placeholder="Enter description" 
          value={taskDescription} 
          onChangeText={setDescription} 
          multiline={true} 
          numberOfLines={4} 
          textAlignVertical="top" 
        />

        <TouchableOpacity style={styles.saveButton} onPress={saveTask}>
          <Text style={styles.saveButtonText}>Save Task</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: { flex: 1, resizeMode: 'cover' },
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  banner: { width: '100%', height: 150, resizeMode: 'contain', marginBottom: 20 },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 5, color: '#333' },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginBottom: 15 },
  textArea: { height: 100 },
  saveButton: { backgroundColor: 'green', padding: 15, alignItems: 'center', borderRadius: 5 },
  saveButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});