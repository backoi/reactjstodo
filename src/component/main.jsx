import React from "react";
import TodoItem from "./TodoItem";
import withScrollLoadMore from "../HOC/withScrollLoadMore";
const Main = ({
  todos,
  filter,
  handleEditTodo,
  colors,
  handleDeleteTodo,
  handleToggleStatus,
}) => {
  // getListFilter = () => {
  //   const { filter, todos } = this.props;
  //   if (!todos || !todos.length) return [];

  //   switch (filter) {
  //     case TODO_STATUS.ACTIVE:
  //       return todos.filter((todo) => !todo.completed);
  //     case TODO_STATUS.COMPLETED:
  //       return todos.filter((todo) => todo.completed);
  //     default:
  //       return todos;
  //   }
  // };
  //đưa logic lên cha quản lý, Main chỉ hiển thị dữ liệu, HOC xử lý scroll
  // componentDidMount() {
  //   //console.log("componentDidMount");
  //   if (this.containerRef.current) {
  //     this.containerRef.current.addEventListener("scroll", this.handleScroll);
  //   }
  //   this.loadMore();
  // }

  // componentWillUnmount() {
  //   //console.log("componentWillUnmount");
  //   if (this.containerRef.current) {
  //     this.containerRef.current.removeEventListener(
  //       "scroll",
  //       this.handleScroll
  //     );
  //   }
  // }

  // handleScroll = (e) => {
  //   //console.log("handleScroll");
  //   const container = e.target;
  //   const { scrollTop, scrollHeight, clientHeight } = container;

  //   if (
  //     scrollTop + clientHeight >= scrollHeight - 20 &&
  //     !this.state.loading &&
  //     this.state.hasMore
  //   ) {
  //     this.setState(
  //       (prevState) => ({
  //         page: prevState.page + 1,
  //       }),
  //       () => {
  //         this.loadMore();
  //       }
  //     );
  //   }
  // };
  //console.log(displayTodos);
  //console.log("displayTodos", displayTodos);
  return (
    <div className="px-2 py-1">
      {todos.length > 0 &&
        todos.map((todo, index) => {
          return (
            <div key={index}>
              <TodoItem
                key={todo.id}
                todo={todo}
                handleEditTodo={handleEditTodo}
                handleDeleteTodo={handleDeleteTodo}
                toggleStatus={handleToggleStatus}
                colors={colors}
              />
            </div>
          );
        })}
    </div>
  );
};

export default withScrollLoadMore(Main);
