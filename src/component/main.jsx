import React from "react";
import TodoItem from "./TodoItem";
import { TODO_STATUS } from "../App";
import { ThemeContext } from "./ThemeContext";
import withScrollLoadMore from "../HOC/withScrollLoadMore";
class Main extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     listItems: [],
  //     page: 1,
  //     loading: false,
  //     hasMore: true,
  //   };
  //   this.containerRef = React.createRef();
  // }

  shouldComponentUpdate(nextProps, nextState) {
    // trả về có nên re-render hay không-1 trong các điều kiện sau đúng thì re-render
    return (
      nextProps.todos !== this.props.todos ||
      nextProps.filter !== this.props.filter ||
      nextProps.displayTodos !== this.props.displayTodos
    );
  }

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

  componentDidUpdate(prevProps) {
    if (
      prevProps.filter !== this.props.filter ||
      prevProps.todos !== this.props.todos
    ) {
      this.setState({
        page: 1,
        hasMore: true,
        loading: false,
      });
    }
  }

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

  render() {
    //console.log("main render");
    //console.log("this.props", this.props);
    const {
      handleDeleteTodo,
      toggleStatus,
      handleEditTodo,
      colors,
      displayTodos,
    } = this.props;
    console.log("listItems hehe", displayTodos);

    // if (!displayTodos || !Array.isArray(displayTodos)) {
    //   return <div className="px-2 py-1">Không có dữ liệu</div>;
    // }

    return (
      <div className="px-2 py-1">
        {displayTodos.map((todos, index) => (
          <div key={index}>
            {Array.isArray(todos) &&
              todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  handleEditTodo={handleEditTodo}
                  colors={colors}
                />
              ))}
          </div>
        ))}
      </div>
    );
  }
}

export default withScrollLoadMore(Main);
