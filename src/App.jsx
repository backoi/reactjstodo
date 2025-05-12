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
export const TODO_STATUS = {
  ALL: "all",
  COMPLETED: "completed",
  ACTIVE: "active",
};
export const ThemeContext = React.createContext({
  theme: "light",
});
//refactor code daq vị render toàn bộ
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        {
          id: "1",
          text: "1 sửa giao diện",
          completed: true,
        },
        {
          id: "2",
          text: "2 học bài react",
          completed: false,
        },
        {
          id: "3",
          text: "3 ra hà nội",
          completed: true,
        },
        {
          id: "4",
          text: "4 chức năng lọc",
          completed: false,
        },
        {
          id: "5",
          text: "5 phân trang",
          completed: true,
        },
        {
          id: "6",
          text: "6 đi chơi",
          completed: false,
        },
        {
          id: "7",
          text: "7 về quê",
          completed: false,
        },
        {
          id: "8",
          text: "8 theme bằng context",
          completed: true,
        },
        {
          id: "9",
          text: "9 refactor code",
          completed: true,
        },
        {
          id: "10",
          text: "10 làm bài tập",
          completed: true,
        },
        {
          id: "11",
          text: "11 phân trang bằng scroll",
          completed: true,
        },
        {
          id: "12",
          text: "12 code splitting",
          completed: false,
        },
        {
          id: "13",
          text: "13 error boundary",
          completed: true,
        },
        {
          id: "14",
          text: "14 high order component",
          completed: false,
        },
        {
          id: "15",
          text: "15 custom hook",
          completed: true,
        },
        {
          id: "16",
          text: "16 portal",
          completed: false,
        },
        {
          id: "17",
          text: "17 search",
          completed: false,
        },
      ],
      filter: TODO_STATUS.ALL,
      currentPage: 1,
      theme: "light",
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
  handleChangeTheme = () => {
    this.setState({
      theme: this.state.theme === "light" ? "dark" : "light",
    });
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
  render() {
    const { todos, filter, currentPage, theme, colors } = this.state;
    const currentColors = colors[theme];

    return (
      <ThemeContext.Provider
        value={{
          theme: theme,
          colors: currentColors,
          handleChangeTheme: this.handleChangeTheme,
        }}
      >
        <div
          className={`${currentColors.background} min-h-screen transition-colors duration-300`}
        >
          <div
            className={`flex flex-col max-w-[550px] mx-auto min-h-screen ${currentColors.background} ${currentColors.text} transition-colors duration-300`}
          >
            <Header
              ref={this.headerRef}
              todos={todos}
              //addNewTodo={this.handleAddTodo}
              handleUpdateTodo={this.handleUpdateTodo}
              //handleToggleAll={this.handleToggleAll}
            />

            <Main
              //currentPage={currentPage}
              todos={todos}
              filter={filter}
              //handleChangePage={this.handleChangePage}
              //handleDeleteTodo={this.handleDeleteTodo}
              handleUpdateTodo={this.handleUpdateTodo}
              //toggleStatus={this.toggleStatus}
              handleEditTodo={this.handleEditTodo}
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
            />
            <div className="space-x-2 self-center mt-3"></div>
            <Copyright />
          </div>
        </div>
      </ThemeContext.Provider>
    );
  }
}

export default App;
