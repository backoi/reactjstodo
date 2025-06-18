import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { getTodos } from "../DataFake";
import {
  setTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  toggleTodo,
  clearCompleted,
  toggleAll,
} from "./actions";

// function* fetchUser(action) {
//   try {
//     const user = yield call(Api.fetchUser, action.payload.userId);
//     yield put({ type: "USER_FETCH_SUCCEEDED", user: user });
//   } catch (e) {
//     yield put({ type: "USER_FETCH_FAILED", message: e.message });
//   }
// }

function* fetchTodosSaga(action) {
  try {
    const { currentPage, pageSize, filter } = action.payload;
    const todos = yield call(getTodos, currentPage, pageSize, filter);
    yield put(setTodos(todos));
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
}

function* addTodoSaga(action) {
  try {
    const newTodo = {
      id: Date.now(),
      text: action.payload,
      completed: false,
    };
    yield put(addTodo(newTodo));
  } catch (error) {
    console.error("Error adding todo:", error);
  }
}

function* updateTodoSaga(action) {
  try {
    yield put(updateTodo(action.payload));
  } catch (error) {
    console.error("Error updating todo:", error);
  }
}

function* deleteTodoSaga(action) {
  try {
    yield put(deleteTodo(action.payload));
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
}

function* toggleTodoSaga(action) {
  try {
    yield put(toggleTodo(action.payload));
  } catch (error) {
    console.error("Error toggling todo:", error);
  }
}

function* clearCompletedSaga() {
  try {
    yield put(clearCompleted());
  } catch (error) {
    console.error("Error clearing completed todos:", error);
  }
}

function* toggleAllSaga() {
  try {
    yield put(toggleAll());
  } catch (error) {
    console.error("Error toggling all todos:", error);
  }
}

function* mySaga() {
  yield takeLatest("FETCH_TODOS_REQUEST", fetchTodosSaga);
  yield takeLatest("ADD_TODO_REQUEST", addTodoSaga);
  yield takeLatest("UPDATE_TODO_REQUEST", updateTodoSaga);
  yield takeLatest("DELETE_TODO_REQUEST", deleteTodoSaga);
  yield takeLatest("TOGGLE_TODO_REQUEST", toggleTodoSaga);
  yield takeLatest("CLEAR_COMPLETED_REQUEST", clearCompletedSaga);
  yield takeLatest("TOGGLE_ALL_REQUEST", toggleAllSaga);
}

export default mySaga;
