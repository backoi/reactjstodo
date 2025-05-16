//checkbox
{
  /* <label class="inline-flex items-center cursor-pointer">
  <input type="checkbox" class="peer hidden">
  <span class="w-6 h-6 rounded-full border-2 border-gray-400 flex items-center justify-center peer-checked:border-teal-500">
    <svg class="w-4 h-4 text-teal-500 hidden peer-checked:block" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  </span>
</label> */
}

import React from "react";
import Footer from "./component/Footer";
import Header from "./component/Header";
import Main from "./component/Main";
import Copyright from "./component/Copyright";
import { dataFake } from "./DataFake";
import { ThemeContext } from "./component/ThemeContext";
import withScrollLoadMore from "./HOC/withScrollLoadMore";
export const TODO_STATUS = {
  ALL: "all",
  COMPLETED: "completed",
  ACTIVE: "active",
};

//refactor code es6, tách provider, HOC cho scroll load more
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: dataFake,
      displayTodos: [],
      filter: TODO_STATUS.ALL,

      colors: {
        light: {
          background: "bg-gray-100",
          text: "text-black",
          todoBackground: "bg-white",
          todoCompleted: "bg-green-50",
          buttonActive: "border-blue-600",
          pagination: "bg-blue-100",
          paginationActive: "bg-blue-500 text-white",
          headerText: "text-blue-700",
        },
        dark: {
          background: "bg-gray-900",
          text: "text-white",
          todoBackground: "bg-gray-800",
          todoCompleted: "bg-emerald-900",
          buttonActive: "border-indigo-500",
          pagination: "bg-gray-700",
          paginationActive: "bg-indigo-600 text-white",
          headerText: "text-indigo-400",
        },
      },
    };
    this.headerRef = React.createRef();
  }
  static contextType = ThemeContext;
  handleChangeTheme = () => {
    const { theme, setTheme } = this.context;
    setTheme(theme === "light" ? "dark" : "light");
  };
  // handleAddTodo = (text) => {
  //   const { todos } = this.state;
  //   this.setState({
  //     todos: [{ id: new Date(), text, completed: false }, ...todos],
  //   });
  // };
  // handleToggleAll = () => {
  //   const { todos } = this.state;
  //   const completedAll = todos.every((todo) => todo.completed);
  //   const updateTodos = todos.map((todo) => ({
  //     ...todo,
  //     completed: !completedAll,
  //   }));
  //   this.setState({
  //     todos: updateTodos,
  //   });
  // };

  //nên để list ở đây hay Main
  getListFilter = () => {
    const { todos, filter } = this.state;
    if (filter === TODO_STATUS.ALL) return todos;
    return todos.filter(
      (todo) => todo.completed === (filter === TODO_STATUS.COMPLETED)
    );
  };
  getData = (page) => {
    const listFilter = this.getListFilter();
    const startIndex = (page - 1) * 4;
    const endIndex = startIndex + 4;
    return listFilter.slice(startIndex, endIndex);
  };
  handleUpdateTodo = (listUpdate) => {
    this.setState({
      todos: listUpdate,
    });
  };
  // handleDeleteTodo = (id) => {
  //   const { todos } = this.state;
  //   const updateList = todos.filter((todo) => todo.id !== id);
  //   this.setState({
  //     todos: updateList,
  //   });
  // };
  // handleClearCompleted = () => {
  //   const { todos } = this.state;
  //   const newList = todos.filter((todo) => !todo.completed);
  //   this.setState({
  //     todos: newList,
  //   });
  // };
  // togleFilter = (filter) => {
  //   this.setState({
  //     filter,
  //     currentPage: 1,
  //   });
  // };
  // toggleStatus = (id) => {
  //   const { todos } = this.state;
  //   const updatedTodos = todos.map((todo) =>
  //     todo.id === id ? { ...todo, completed: !todo.completed } : todo
  //   );
  //   this.setState({
  //     todos: updatedTodos,
  //   });
  // };
  // handleChangePage = (page) => {
  //   this.setState({
  //     currentPage: page,
  //   });
  // };
  handleEditTodo = (todo) => {
    this.headerRef.current.setEditingTodo(todo);
  };
  handleLoadMore = (newData) => {
    console.log("handleLoadMore", newData);
    this.setState({
      displayTodos: [...this.state.displayTodos, newData],
    });
  };
  render() {
    const { todos, filter, colors } = this.state;
    const { theme } = this.context;
    const currentColors = colors[theme];
    console.log("this.state.displayTodos", this.state.displayTodos);
    //const MainComponent = withScrollLoadMore(Main);
    return (
      <div
        className={`${currentColors.background} min-h-screen transition-colors duration-300`}
      >
        <div
          className={`flex flex-col max-w-[550px] mx-auto min-h-screen ${currentColors.background} ${currentColors.text} transition-colors duration-300`}
        >
          <Header
            ref={this.headerRef}
            todos={todos}
            handleUpdateTodo={this.handleUpdateTodo}
            colors={currentColors}
            //addNewTodo={this.handleAddTodo}
            //handleToggleAll={this.handleToggleAll}
          />

          <Main
            displayTodos={this.state.displayTodos}
            filter={filter}
            getData={this.getData}
            handleUpdateTodo={this.handleUpdateTodo}
            handleEditTodo={this.handleEditTodo}
            onLoadMore={this.handleLoadMore}
            colors={currentColors}
            //handleDeleteTodo={this.handleDeleteTodo}
            //handleChangePage={this.handleChangePage}
            //toggleStatus={this.toggleStatus}
          />
          <div className="flex justify-center mt-4">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                onChange={this.handleChangeTheme}
                checked={theme === "dark"}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-blue-200 rounded-full dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
              <span
                className={`ml-3 text-sm font-medium ${currentColors.text}`}
              >
                {theme === "light" ? "Light Mode" : "Dark Mode"}
              </span>
            </label>
          </div>
          <Footer
            todos={todos}
            filter={filter}
            //togleFilter={this.togleFilter}
            //handleClearCompleted={this.handleClearCompleted}
            colors={currentColors}
          />
          <div className="space-x-2 self-center mt-3"></div>
          <Copyright colors={currentColors} />
        </div>
      </div>
    );
  }
}

export default App;
