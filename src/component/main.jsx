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

  handleFilter = () => {
    const { filter, todos } = this.props;
    switch (filter) {
      case TODO_STATUS.ACTIVE:
        //console.log("vao active");
        return todos.filter((todo) => !todo.completed);
      case TODO_STATUS.COMPLETED:
        //console.log("vao completed");
        return todos.filter((todo) => todo.completed);
      default:
        //console.log("vao all");
        return todos;
    }
  };
  getPaginateList = () => {
    const { todos, filter, currentPage } = this.props;
    const pageSize = 3;
    // const totalPage = todos.length / pageSize;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = currentPage * pageSize;
    // console.log(startIndex, endIndex);
    let newList = todos;
    //loc trang thai truoc
    if (filter === TODO_STATUS.COMPLETED) {
      newList = todos.filter((todo) => todo.completed);
    } else if (filter === TODO_STATUS.ACTIVE) {
      newList = todos.filter((todo) => !todo.completed);
    }
    return newList?.slice(startIndex, endIndex);
  };
  render() {
    const listTodos = this.handleFilter();
    const listPaginate = this.getPaginateList();
    const {
      currentPage,
      handleDeleteTodo,
      handleUpdateTodo,
      toggleStatus,
      handleChangePage,
    } = this.props;

    return (
      <>
        {listPaginate?.map((todo) => (
          <TodoItem
            todos={listTodos}
            key={todo.id}
            todo={todo}
            handleEditNew={this.props.handleEditNew}
            handleDeleteTodo={handleDeleteTodo}
            handleUpdateTodo={handleUpdateTodo}
            toggleStatus={toggleStatus}
          />
        ))}
        <div className="flex space-x-2 justify-center mt-3">
          {Array.from({ length: Math.ceil(listTodos.length / 3) }).map(
            (item, ind) => {
              return (
                <button
                  onClick={() => handleChangePage(ind + 1)}
                  key={ind}
                  className={`${
                    currentPage == ind + 1 ? "bg-red-600" : ""
                  } p-4 bg-amber-200`}
                >
                  {ind + 1}
                </button>
              );
            }
          )}
        </div>
      </>
    );
  }
}
export default Main;
