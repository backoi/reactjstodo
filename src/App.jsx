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
//refactor code daq vị render toàn bộ
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        {
          id: "1",
          text: "sửa giao diện",
          completed: true,
        },
        {
          id: "2",
          text: "tìm việc mới",
          completed: false,
        },
        {
          id: "3",
          text: "ra hà nội",
          completed: true,
        },
        {
          id: "4",
          text: "chức năng lọc",
          completed: false,
        },
        {
          id: "5",
          text: "phân trang",
          completed: true,
        },
        {
          id: "6",
          text: "đi chơi",
          completed: false,
        },
        {
          id: "7",
          text: "về quê",
          completed: false,
        },
      ],
      filter: TODO_STATUS.ALL,
      currentPage: 1,
    };
    this.headerRef = React.createRef();
  }
  handleAddTodo = (text) => {
    const { todos } = this.state;
    this.setState({
      todos: [{ id: new Date(), text, completed: false }, ...todos],
    });
  };
  handleToggleAll = () => {
    const { todos } = this.state;
    const completedAll = todos.every((todo) => todo.completed);
    const updateTodos = todos.map((todo) => ({
      ...todo,
      completed: !completedAll,
    }));
    this.setState({
      todos: updateTodos,
    });
  };
  handleUpdateTodo = (listUpdate) => {
    this.setState({
      todos: listUpdate,
    });
  };
  handleDeleteTodo = (id) => {
    const { todos } = this.state;
    const updateList = todos.filter((todo) => todo.id !== id);
    this.setState({
      todos: updateList,
    });
  };
  handleClearCompleted = () => {
    const { todos } = this.state;
    const newList = todos.filter((todo) => !todo.completed);
    this.setState({
      todos: newList,
    });
  };
  togleFilter = (filter) => {
    this.setState({
      filter,
      currentPage: 1,
    });
  };
  toggleStatus = (id) => {
    const { todos } = this.state;
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    this.setState({
      todos: updatedTodos,
    });
  };
  handleChangePage = (page) => {
    this.setState({
      currentPage: page,
    });
  };
  handleEditTodo = (todo) => {
    this.headerRef.current.setEditingTodo(todo);
  };
  render() {
    const { todos, filter, currentPage, editingTodo } = this.state;

    return (
      <div className="">
        <div
          className="flex flex-col max-w-[550px] mx-auto  min-h-screen bg-gray-200
        "
        >
          <Header
            ref={this.headerRef}
            todos={todos}
            addNewTodo={this.handleAddTodo}
            handleUpdateTodo={this.handleUpdateTodo}
            handleToggleAll={this.handleToggleAll}
          />

          <Main
            currentPage={currentPage}
            todos={todos}
            filter={filter}
            handleChangePage={this.handleChangePage}
            handleDeleteTodo={this.handleDeleteTodo}
            handleUpdateTodo={this.handleUpdateTodo}
            toggleStatus={this.toggleStatus}
            handleEditTodo={this.handleEditTodo}
          />

          <Footer
            todos={todos}
            filter={filter}
            togleFilter={this.togleFilter}
            handleClearCompleted={this.handleClearCompleted}
          />
          <div className="space-x-2 self-center mt-3"></div>
          <Copyright />
        </div>
      </div>
    );
  }
}

export default App;
