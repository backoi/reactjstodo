import React from "react";
import TodoItem from "./TodoItem";
import withScrollLoadMore from "../HOC/withScrollLoadMore";
import useScrollLoadMore from "../hooks/useScrollLoadMore";
const Main = ({
  todos,
  filter,
  handleEditTodo,
  colors,
  handleDeleteTodo,
  handleToggleStatus,
  getData,
  handleLoadMore,
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
  const { containerRef, loading, hasMore } = useScrollLoadMore(
    getData,
    handleLoadMore
  );

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
    <div ref={containerRef} className="px-2 py-1 h-[200px] overflow-y-auto">
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

      {(loading || (!hasMore && todos.length > 0)) && (
        <div className="flex justify-center py-2 border-t border-gray-200">
          {loading ? (
            <div className="flex items-center">
              <div className="w-5 h-5 border-t-transparent border-solid rounded-full animate-spin border-blue-500 border-2 mr-2"></div>
              <span className="text-sm text-gray-500">Loading...</span>
            </div>
          ) : (
            <div className="text-center text-gray-500 text-sm">
              No more items to load
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Main;
