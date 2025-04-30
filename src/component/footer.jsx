import React from "react";
import { TODO_STATUS } from "../App";
class Footer extends React.Component {
  handleClearCompleted = () => {
    const newList = this.props.todos.filter((todo) => !todo.completed);
    this.props.handleClearCompleted(newList);
  };
  render() {
    //console.log(this.props.listTodos);
    const { todos, togleFilter, filter } = this.props;
    return (
      todos.length > 0 && ( //this.state.filterList
        <div className="flex justify-between mt-4 w-full ">
          <div className="text-gray-500">
            {todos.filter((todo) => !todo.completed).length} item left
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => togleFilter(TODO_STATUS.ALL)}
              className={`${
                filter == TODO_STATUS.ALL
                  ? " border-red-600"
                  : "border-transparent"
              } rounded-sm px-2 cursor-pointer hover:border-red-600 border-2 `}
            >
              All
            </button>
            <button
              onClick={() => togleFilter(TODO_STATUS.ACTIVE)}
              className={`${
                filter == TODO_STATUS.ACTIVE
                  ? " border-red-600"
                  : "border-transparent"
              } rounded-sm px-2 cursor-pointer hover:border-red-600 border-2`}
            >
              Active
            </button>
            <button
              onClick={() => togleFilter(TODO_STATUS.COMPLETED)}
              className={`${
                filter == TODO_STATUS.COMPLETED
                  ? "border-2 border-red-600"
                  : "border-transparent"
              } rounded-sm px-2 cursor-pointer hover:border-red-600 border-2  `}
            >
              Completed
            </button>
          </div>
          <div
            onClick={this.handleClearCompleted}
            className="text-black hover:underline cursor-pointer"
          >
            Clear completed
          </div>
        </div>
      )
    );
  }
}
export default Footer;
