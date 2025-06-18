import { createSelector } from "reselect";
import { TODO_STATUS } from "../App";
const getTodos = (state) => state.todos;
const getFilter = (state) => state.filter;

export const selectTodos = createSelector(
  [getTodos, getFilter],
  (todos, filter) => {
    switch (filter) {
      case TODO_STATUS.ALL:
        return todos;
      case TODO_STATUS.COMPLETED:
        return todos.filter((todo) => todo.completed);
      case TODO_STATUS.ACTIVE:
        return todos.filter((todo) => !todo.completed);
      default:
        return todos;
    }
  }
);
