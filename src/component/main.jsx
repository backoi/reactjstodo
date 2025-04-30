import React from "react";
import TodoItem from "./TodoItem";
import { TODO_STATUS } from "../App";
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editingTodo: null,
    };
  }
  handleEditTodo = (id) => {
    const todoToEdit = this.props.todos.find((todo) => todo.id == id);
    console.log(todoToEdit);
    this.setState({
      editingTodo: todoToEdit,
    });
  };
  handleEditTextChange = (e) => {
    this.setState({
      editingTodo: {
        ...this.state.editingTodo,
        text: e.target.value,
      },
    });
  };

  handleUpdate = (e) => {
    if (e.key !== "Enter") {
      return;
    }

    this.setState({
      editingTodo: null,
    });
    const newList = this.props.todos.map((todo) =>
      todo.id == this.state.editingTodo.id
        ? { ...todo, text: this.state.editingTodo.text }
        : todo
    );
    this.props.handleUpdateTodo(newList);
  };
  handleFilter = () => {
    switch (this.props.filter) {
      case TODO_STATUS.ACTIVE:
        console.log("vao active");
        return this.props.todos.filter((todo) => !todo.completed);
      case TODO_STATUS.COMPLETED:
        console.log("vao completed");
        return this.props.todos.filter((todo) => todo.completed);
      default:
        console.log("vao all");
        return this.props.todos;
    }
  };
  handleDeleteTodo = (id) => {
    const newList = this.props.todos.filter((todo) => todo.id !== id);
    this.props.handleDeleteTodo(newList);
  };
  togleStatus = (id) => {
    const updatedTodos = this.props.todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    this.props.togleStatus(updatedTodos);
  };
  render() {
    const { editingTodo } = this.state;
    const listTodos = this.handleFilter();
    return (
      <>
        {listTodos?.map((todo) => (
          <div
            key={`key${todo.id}`}
            onDoubleClick={() => !editingTodo && this.handleEditTodo(todo.id)}
            className={`flex group relative w-full items-center justify-between p-4 border-b ${
              todo.completed ? "bg-green-100" : "bg-white"
            }`}
          >
            {editingTodo && editingTodo.id === todo.id ? (
              <input
                value={editingTodo.text}
                onChange={this.handleEditTextChange}
                onKeyDown={this.handleUpdate}
                type="text"
                className="p-2 border rounded"
              />
            ) : (
              <div className="todoitem flex items-center">
                <label className="relative flex items-center">
                  <input
                    type="checkbox"
                    onChange={() => this.togleStatus(todo.id)}
                    checked={todo.completed}
                    className="absolute h-0 w-0 opacity-0"
                  />

                  <div className="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center peer-checked:border-green-500">
                    {/* Checkmark */}
                    <div
                      className={`w-2 h-3 border-b-2 border-r-2 border-green-500 transform -translate-y-px rotate-45 ${
                        todo.completed ? "block" : "hidden"
                      }`}
                    ></div>
                  </div>
                </label>
                <span
                  className={`ml-2 ${todo.completed ? "line-through" : ""}`}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => this.handleDeleteTodo(todo.id)}
                  className="text-gray-500 text-4xl ml-2 absolute hidden group-hover:block right-0 hover:text-[#c18585]"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        ))}
      </>
    );
  }
}
export default Main;
