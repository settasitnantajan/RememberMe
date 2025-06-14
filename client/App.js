import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Import icon library
import {
  fetchTodosAPI,
  addTodoAPI,
  toggleTodoAPI,
  deleteTodoAPI,
  editTodoTextAPI,
} from './api/todoService'; 
import styles from './styles'; 
import HomeScreen from './HomeScreen';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [appReady, setAppReady] = useState(false);
  const [editingTodoId, setEditingTodoId] = useState(null); // ID of the todo being edited
  const [editText, setEditText] = useState(''); // Text for the todo being edited


  // Fetch todos when the app is ready (i.e., after home screen)
  useEffect(() => {
    if (appReady) {
      fetchTodos();
    }
  }, [appReady]);

  const handleHomeLoadingComplete = () => {
    setAppReady(true); // เมื่อ Home screen โหลดเสร็จ ให้ตั้งค่า appReady เป็น true
  };

  const fetchTodos = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTodosAPI();
      setTodos(data);
    } catch (err){
      const errorMessage = err.message || 'Failed to fetch todos.';
      setError(errorMessage);
      Alert.alert("Error Fetching Todos", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async () => {
    if (!newTodoText.trim()) {
      Alert.alert("Validation", "Todo text cannot be empty.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const newTodo = await addTodoAPI(newTodoText);
      setTodos([...todos, newTodo]);
      setNewTodoText('');
    } catch (err) {
      const errorMessage = err.message || 'Failed to add todo.';
      setError(errorMessage);
      Alert.alert("Error Adding Todo", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const toggleTodo = async (id, currentCompletedStatus) => {
    setLoading(true);
    setError(null);
    try {
      const updatedTodo = await toggleTodoAPI(id, !currentCompletedStatus);
      setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
    } catch (err) {
      const errorMessage = err.message || 'Failed to update todo.';
      setError(errorMessage);
      Alert.alert("Error Updating Todo", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const deleteTodo = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const deletedId = await deleteTodoAPI(id);
      setTodos(todos.filter(todo => todo.id !== deletedId));
    } catch (err) {
      const errorMessage = err.message || 'Failed to delete todo.';
      setError(errorMessage);
      Alert.alert("Error Deleting Todo", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (todo) => {
    setEditingTodoId(todo.id);
    setEditText(todo.text);
  };

  const handleSaveEdit = async (id) => {
    if (!editText.trim()) {
      Alert.alert("Validation", "Todo text cannot be empty.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const updatedTodo = await editTodoTextAPI(id, editText);
      setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
      setEditingTodoId(null); // Exit edit mode
      setEditText('');      // Clear edit text
    } catch (err) {
      const errorMessage = err.message || 'Failed to save edit.';
      setError(errorMessage);
      Alert.alert("Error Saving Edit", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setEditingTodoId(null);
    setEditText('');
  };


  if (!appReady) {
    return <HomeScreen onLoadingComplete={handleHomeLoadingComplete} />;

  }

  const renderItem = ({ item }) => {
    if (editingTodoId === item.id) {
      return (
        <View style={styles.todoItem}>
          <TextInput
            style={[styles.input, { flex: 1, marginRight: 5 }]} // Reuse input style, adjust as needed
            value={editText}
            onChangeText={setEditText}
            autoFocus
          />
          <TouchableOpacity onPress={() => handleSaveEdit(item.id)} style={styles.saveButton}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={cancelEdit} style={styles.cancelButton}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View style={styles.todoItem}>
        <TouchableOpacity onPress={() => toggleTodo(item.id, item.completed)} onLongPress={() => handleEdit(item)} style={styles.todoTextContainer}>
          <Text style={[styles.todoText, item.completed && styles.todoCompleted]}>
            {item.text}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteTodo(item.id)} style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.appLoginIconContainer} onPress={() => console.log('Login icon on App.js pressed')}>
        <MaterialIcons name="account-circle" size={30} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>To-Do List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add new todo..."
          value={newTodoText}
          onChangeText={setNewTodoText}
        />
        <TouchableOpacity onPress={addTodo} style={styles.addButton} disabled={loading}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      {loading && <ActivityIndicator size="large" color="blue" />}
      {error && <Text style={styles.errorText}>{error}</Text>}
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        style={styles.list}
        ListEmptyComponent={<Text style={styles.listEmptyText}>No todos yet. Add some!</Text>}
      />
      <StatusBar style="dark" />
    </View>
  );
}
