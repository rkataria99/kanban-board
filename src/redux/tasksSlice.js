import { createSlice } from '@reduxjs/toolkit';

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('tasks');
    return serializedState ? JSON.parse(serializedState) : [];
  } catch (e) {
    return [];
  }
};

const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('tasks', serializedState);
  } catch (e) {}
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: loadFromLocalStorage(),
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: Date.now(),
        title: action.payload.title,
        description: action.payload.description,
        status: 'todo',
      };
      state.push(newTask);
      saveToLocalStorage(state);
    },
    updateTaskStatus: (state, action) => {
      const { id, status } = action.payload;
      const task = state.find((task) => task.id === id);
      if (task) {
        task.status = status;
        saveToLocalStorage(state);
      }
    },
    deleteTask: (state, action) => {
      const filteredState = state.filter((task) => task.id !== action.payload);
      saveToLocalStorage(filteredState);
      return filteredState;
    },
    editTask: (state, action) => {
      const { id, title, description } = action.payload;
      const task = state.find((task) => task.id === id);
      if (task) {
        task.title = title;
        task.description = description;
        saveToLocalStorage(state);
      }
    },
  },
});

export const { addTask, updateTaskStatus, deleteTask, editTask } = tasksSlice.actions;
export default tasksSlice.reducer;
