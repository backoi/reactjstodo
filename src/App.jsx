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
      ],
      filter: TODO_STATUS.ALL,
    };
  }

  handleUpdateTodo = (listUpdate) => {
    this.setState({
      todos: listUpdate,
    });
  };

  togleFilter = (filter) => {
    this.setState({
      filter,
    });
  };
  render() {
    const { todos, filter } = this.state;

    return (
      <div className="">
        <div
          className="flex flex-col max-w-[550px] mx-auto  min-h-screen bg-gray-200
        "
        >
          <Header
            todos={todos}
            addNewTodo={this.handleUpdateTodo}
            handleToggleAll={this.handleUpdateTodo}
          />

          <Main
            todos={todos}
            filter={filter}
            handleDeleteTodo={this.handleUpdateTodo}
            handleUpdateTodo={this.handleUpdateTodo}
            togleStatus={this.handleUpdateTodo}
          />

          <Footer
            todos={todos}
            filter={filter}
            togleFilter={this.togleFilter}
            handleClearCompleted={this.handleUpdateTodo}
          />
          <Copyright />
        </div>
      </div>
    );
  }
}

export default App;
