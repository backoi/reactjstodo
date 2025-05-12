import React from "react";
import TodoItem from "./TodoItem";
import { TODO_STATUS, ThemeContext } from "../App";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listItems: [],
      page: 1,
      loading: false,
      hasMore: true,
    };
    this.containerRef = React.createRef();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.todos !== this.props.todos ||
      nextProps.filter !== this.props.filter ||
      nextProps.currentPage !== this.props.currentPage ||
      nextState.listItems !== this.state.listItems ||
      nextState.loading !== this.state.loading
    );
  }

  getListFilter = () => {
    const { filter, todos } = this.props;
    if (!todos || !todos.length) return [];

    switch (filter) {
      case TODO_STATUS.ACTIVE:
        return todos.filter((todo) => !todo.completed);
      case TODO_STATUS.COMPLETED:
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  };

  loadMore = () => {
    // Don't proceed if already loading or no more items
    if (this.state.loading || !this.state.hasMore) return;

    // Set loading state first
    this.setState({ loading: true }, () => {
      console.log("loadMore - loading:", this.state.loading);
      const filteredList = this.getListFilter();

      const pageSize = 4;
      const startIndex = (this.state.page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      console.log(startIndex, endIndex);

      // Filter out items that are already in the list to prevent duplicate keys
      // const existingIds = new Set(this.state.listItems.map((item) => item.id));
      // const newList = filteredList
      //   .slice(startIndex, endIndex)
      //   .filter((item) => !existingIds.has(item.id));
      const newList = filteredList.slice(startIndex, endIndex); //bị trùng do bật strict mode

      // Check if there are no more items to load
      if (newList.length === 0) {
        this.setState({
          loading: false,
          hasMore: false,
        });
        return;
      }

      // Update the list and reset loading state
      setTimeout(() => {
        this.setState((prevState) => ({
          listItems: [...prevState.listItems, ...newList],
          loading: false,
        }));
      }, 1000); // Small delay to show loading indicator
    });
  };

  componentDidMount() {
    console.log("componentDidMount");
    if (this.containerRef.current) {
      this.containerRef.current.addEventListener("scroll", this.handleScroll);
    }
    this.loadMore();
  }

  componentDidUpdate(prevProps) {
    // Reload when filter changes or todos are updated
    console.log("componentDidUpdate");
    if (
      prevProps.filter !== this.props.filter ||
      prevProps.todos !== this.props.todos
    ) {
      this.setState(
        {
          listItems: [],
          page: 1,
          hasMore: true,
          loading: false,
        },
        this.loadMore
      );
    }
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
    if (this.containerRef.current) {
      this.containerRef.current.removeEventListener(
        "scroll",
        this.handleScroll
      );
    }
  }

  handleScroll = (e) => {
    console.log("handleScroll");
    const container = e.target;
    const { scrollTop, scrollHeight, clientHeight } = container;

    // Add buffer for scroll trigger (20px before bottom)
    if (
      scrollTop + clientHeight >= scrollHeight - 20 &&
      !this.state.loading &&
      this.state.hasMore
    ) {
      this.setState(
        (prevState) => ({
          page: prevState.page + 1,
        }),
        () => {
          this.loadMore();
        }
      );
    }
  };

  render() {
    console.log("main render");
    const { handleDeleteTodo, toggleStatus, handleEditTodo } = this.props;

    return (
      <ThemeContext.Consumer>
        {({ colors }) => (
          <div
            ref={this.containerRef}
            className="h-[200px] overflow-y-auto border border-gray-200 rounded-md shadow-sm"
            style={{ scrollBehavior: "smooth" }}
          >
            <div className="px-2 py-1">
              {this.state.listItems.length > 0 ? (
                this.state.listItems.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    handleDeleteTodo={handleDeleteTodo}
                    toggleStatus={toggleStatus}
                    handleEditTodo={handleEditTodo}
                  />
                ))
              ) : (
                <div className="text-center py-4 text-gray-500">
                  No items to display
                </div>
              )}
            </div>

            {(this.state.loading ||
              (!this.state.hasMore && this.state.listItems.length > 0)) && (
              <div className="flex justify-center py-2 border-t border-gray-200">
                {this.state.loading ? (
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
        )}
      </ThemeContext.Consumer>
    );
  }
}

export default Main;
