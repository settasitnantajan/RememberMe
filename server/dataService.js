// /Users/duke/Documents/GitHub/RememberMe/server/dataService.js

let todos = [
    { id: 1, text: 'Learn React Native', completed: false },
    { id: 2, text: 'Build a To-Do App', completed: true },
    { id: 3, text: 'Prepare for presentation', completed: false }, // Fixed typo in 'presentation'
  ];
  let nextId = 4;
  
  const getAllTodos = () => {
    return todos;
  };
  
  const addTodo = (text) => {
    const newTodo = {
      id: nextId++,
      text: text.trim(),
      completed: false,
    };
    todos.push(newTodo);
    return newTodo;
  };
  
  const findTodoById = (id) => {
    return todos.find(todo => todo.id === id);
  };
  
  const updateTodo = (id, completedStatus) => {
    const todo = findTodoById(id);
    if (todo) {
      todo.completed = completedStatus;
      return todo;
    }
    return null;
  };
  
  const editTodoText = (id, newText) => {
    const todo = findTodoById(id);
    if (todo) {
      todo.text = newText.trim();
      return todo;
    }
    return null;
  };
  
  const deleteTodo = (id) => {
    const todoIndex = todos.findIndex(todo => todo.id === id);
    if (todoIndex !== -1) {
      todos.splice(todoIndex, 1);
      return true;
    }
    return false;
  };
  
  module.exports = {
    getAllTodos,
    addTodo,
    findTodoById,
    updateTodo,
    editTodoText,
    deleteTodo,
  };