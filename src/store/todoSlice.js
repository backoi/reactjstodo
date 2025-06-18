import { createSlice } from "@reduxjs/toolkit";
import { dataFake } from "../DataFake";

const initialState = {
  todos: [],
  filter: "all",
  currentPage: 1,
  pageSize: 4,
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },

    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        text: action.payload,
        completed: false,
      };
      state.todos.unshift(newTodo);
    },
    updateTodo: (state, action) => {
      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      if (index !== -1) {
        state.todos[index] = action.payload;
      }
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    clearCompleted: (state) => {
      state.todos = state.todos.filter((todo) => !todo.completed);
    },
    toggleAll: (state) => {
      const completedAll = state.todos.every((todo) => todo.completed);
      state.todos.forEach((todo) => {
        todo.completed = !completedAll;
      });
    },
  },
});

export const {
  setTodos,
  setFilter,
  setCurrentPage,

  addTodo,
  updateTodo,
  deleteTodo,
  toggleTodo,
  clearCompleted,
  toggleAll,
} = todoSlice.actions;

export default todoSlice.reducer;
