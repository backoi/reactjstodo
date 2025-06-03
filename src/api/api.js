import axios from "axios";
import { TODO_STATUS } from "../App";
const API_URL = "http://localhost:5000/api/todos";
const api = {
  getAll: async () => {
    try {
      const res = await axios.get(API_URL);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
  getMore: async (limit, skip, filter) => {
    try {
      const res = await axios.get(`${API_URL}?limit=${limit}&skip=${skip}`);
      if (filter === TODO_STATUS.ALL) {
        return res.data;
      } else {
        return res.data.todos.filter(
          (todo) => todo.completed === (filter === TODO_STATUS.COMPLETED)
        );
      }
    } catch (error) {
      console.log(error);
    }
  },
  addTodo: async (todo) => {
    try {
      const res = await axios.post(`${API_URL}/add`, {
        title: todo.text,
        completed: todo.completed,
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
  updateTodo: async (id, todo) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, {
        title: todo.text,
        completed: todo.completed,
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
  deleteTodo: async (id) => {
    try {
      const res = await axios.delete(`${API_URL}/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  },
  clearCompleted: async (ids) => {
    try {
      // const allTodos = await axios.get(API_URL);
      // const completedTodos = allTodos.data.todos.filter(
      //   (todo) => todo.completed
      // );
      const deletePromises = ids.map((id) => axios.delete(`${API_URL}/${id}`));

      await Promise.all(deletePromises);
      return { success: true, message: "Completed todos cleared successfully" };
    } catch (error) {
      console.error("Error clearing completed todos:", error);
      return { success: false, error: error.message };
    }
  },
};
export default api;
