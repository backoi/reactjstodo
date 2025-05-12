import React from "react";
import TodoItem from "./TodoItem";
import { TODO_STATUS } from "../App";

class Main extends React.Component {
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.todos !== this.props.todos ||
      nextProps.filter !== this.props.filter ||
      nextProps.currentPage !== this.props.currentPage
    );
  }

  getListFilter = () => {
    const { filter, todos } = this.props;
    switch (filter) {
      case TODO_STATUS.ACTIVE:
        return todos.filter((todo) => !todo.completed);
      case TODO_STATUS.COMPLETED:
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  };

  getPaginateList = () => {
    const { currentPage } = this.props;
    const pageSize = 3;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = currentPage * pageSize;
    let newList = this.getListFilter();
    return newList?.slice(startIndex, endIndex);
  };

  render() {
    console.log("Main rendered");
    const listFilter = this.getListFilter();
    const listPaginate = this.getPaginateList();
    const {
      currentPage,
      handleDeleteTodo,
      toggleStatus,
      handleChangePage,
      handleEditTodo,
    } = this.props;

    return (
      <>
        {listPaginate?.map((todo) => (
          <TodoItem
            todos={listPaginate}
            key={todo.id}
            todo={todo}
            handleDeleteTodo={handleDeleteTodo}
            toggleStatus={toggleStatus}
            handleEditTodo={handleEditTodo}
          />
        ))}
        <div className="flex space-x-2 justify-center mt-3">
          {Array.from({ length: Math.ceil(listFilter.length / 3) }).map(
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
