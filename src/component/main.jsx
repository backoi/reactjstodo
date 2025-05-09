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
    const { todos, filter, currentPage } = this.props;
    const pageSize = 3;
    // const totalPage = todos.length / pageSize;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = currentPage * pageSize;
    // console.log(startIndex, endIndex);
    //loc trang thai truoc
    let newList = this.getListFilter();
    return newList?.slice(startIndex, endIndex);
  };
  render() {
    const listFilter = this.getListFilter(); //cần để tính trang
    const listPaginate = this.getPaginateList();
    const {
      todos,
      currentPage,
      handleDeleteTodo,
      handleUpdateTodo,
      toggleStatus,
      handleChangePage,
      handleEditNew,
    } = this.props;

    return (
      <>
        {listPaginate?.map((todo) => (
          <TodoItem
            todos={listPaginate}
            key={todo.id}
            todo={todo}
            handleEditNew={handleEditNew}
            handleDeleteTodo={handleDeleteTodo}
            handleUpdateTodo={handleUpdateTodo}
            toggleStatus={toggleStatus}
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
