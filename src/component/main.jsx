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

  handleUpdate = (list) => {
    this.props.handleUpdateTodo(list);
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

  render() {
    const listTodos = this.handleFilter();
    return (
      <>
        {listTodos?.map((todo) => (
          <TodoItem
            todos={listTodos}
            key={todo.id}
            todo={todo}
            handleUpdate={this.handleUpdate}
            togleStatus={this.handleUpdate}
          />
        ))}
      </>
    );
  }
}
export default Main;
