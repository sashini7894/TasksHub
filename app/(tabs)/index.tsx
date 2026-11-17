import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function DashboardScreen() {
  const [tasks, setTasks] = useState<any[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [])
  );

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks !== null) {
        setTasks(JSON.parse(storedTasks));
      } else {
        setTasks([]);
      }
    } catch (error) {
      console.error('Failed to load tasks', error);
    }
  };

  return (
    <ImageBackground 
      source={{ uri: 'https://img.magnific.com/free-vector/isometric-time-management-concept-illustrated_52683-55534.jpg?semt=ais_hybrid&w=740&q=80' }} 
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Your Tasks</Text>
        
        <ScrollView style={styles.list}>
          {tasks.length === 0 ? (
            <Text style={styles.empty}>No tasks saved yet. Add one!</Text>
          ) : (
            tasks.map((task: any) => (
              <View key={task.id} style={styles.taskCard}>
                <Text style={styles.moduleText}>{task.moduleCode}</Text>
                <Text style={styles.taskTitle}>{task.taskName}</Text>
                <Text>{task.taskDescription}</Text>
              </View>
            ))
          )}
        </ScrollView>

        <TouchableOpacity 
          style={styles.addButton} 
          onPress={() => router.push('/add-task')}
        >
          <Text style={styles.addButtonText}>+ Add New Task</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: { flex: 1, resizeMode: 'cover' },
  container: { flex: 1, padding: 20, paddingTop: 40 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  list: { flex: 1 },
  empty: { textAlign: 'center', color: '#666', marginTop: 20, fontSize: 16 },
  taskCard: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 10, elevation: 2 },
  moduleText: { color: 'blue', fontWeight: 'bold', marginBottom: 3 },
  taskTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  addButton: { backgroundColor: 'green', padding: 15, alignItems: 'center', borderRadius: 8, marginTop: 10 }
,
  addButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});