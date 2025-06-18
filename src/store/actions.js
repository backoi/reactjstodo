// Action Types
export const SET_TODOS = "SET_TODOS";
export const ADD_TODO = "ADD_TODO";
export const UPDATE_TODO = "UPDATE_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const TOGGLE_TODO = "TOGGLE_TODO";
export const CLEAR_COMPLETED = "CLEAR_COMPLETED";
export const TOGGLE_ALL = "TOGGLE_ALL";
export const SET_FILTER = "SET_FILTER";

// Request Action Types
export const FETCH_TODOS_REQUEST = "FETCH_TODOS_REQUEST";
export const ADD_TODO_REQUEST = "ADD_TODO_REQUEST";
export const UPDATE_TODO_REQUEST = "UPDATE_TODO_REQUEST";
export const DELETE_TODO_REQUEST = "DELETE_TODO_REQUEST";
export const TOGGLE_TODO_REQUEST = "TOGGLE_TODO_REQUEST";
export const CLEAR_COMPLETED_REQUEST = "CLEAR_COMPLETED_REQUEST";
export const TOGGLE_ALL_REQUEST = "TOGGLE_ALL_REQUEST";

// Action Creators
export const setTodos = (todos) => ({
  type: SET_TODOS,
  payload: todos,
});

export const addTodo = (todo) => ({
  type: ADD_TODO,
  payload: todo,
});

export const updateTodo = (todo) => ({
  type: UPDATE_TODO,
  payload: todo,
});

export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  payload: id,
});

export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  payload: id,
});

export const clearCompleted = () => ({
  type: CLEAR_COMPLETED,
});

export const toggleAll = () => ({
  type: TOGGLE_ALL,
});

export const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: filter,
});

// Request Action Creators
export const fetchTodosRequest = (currentPage, pageSize, filter) => ({
  type: FETCH_TODOS_REQUEST,
  payload: { currentPage, pageSize, filter },
});

export const addTodoRequest = (text) => ({
  type: ADD_TODO_REQUEST,
  payload: text,
});

export const updateTodoRequest = (todo) => ({
  type: UPDATE_TODO_REQUEST,
  payload: todo,
});

export const deleteTodoRequest = (id) => ({
  type: DELETE_TODO_REQUEST,
  payload: id,
});

export const toggleTodoRequest = (id) => ({
  type: TOGGLE_TODO_REQUEST,
  payload: id,
});

export const clearCompletedRequest = () => ({
  type: CLEAR_COMPLETED_REQUEST,
});

export const toggleAllRequest = () => ({
  type: TOGGLE_ALL_REQUEST,
});
