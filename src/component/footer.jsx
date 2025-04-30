import React from "react";
class Footer extends React.Component {
  render() {
    //console.log(this.props.listTodos);
    return (
      this.props.todos.length > 0 && ( //this.state.filterList
        <div className="flex justify-between mt-4 w-full ">
          <div className="text-gray-500">
            {this.props.todos.filter((todo) => !todo.completed).length} item
            left
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => this.props.togleFilter("all")}
              className={`${
                this.props.filter == "all"
                  ? " border-red-600"
                  : "border-transparent"
              } rounded-sm px-2 cursor-pointer hover:border-red-600 border-2 `}
            >
              All
            </button>
            <button
              onClick={() => this.props.togleFilter("active")}
              className={`${
                this.props.filter == "active"
                  ? " border-red-600"
                  : "border-transparent"
              } rounded-sm px-2 cursor-pointer hover:border-red-600 border-2`}
            >
              Active
            </button>
            <button
              onClick={() => this.props.togleFilter("completed")}
              className={`${
                this.props.filter == "completed"
                  ? "border-2 border-red-600"
                  : "border-transparent"
              } rounded-sm px-2 cursor-pointer hover:border-red-600 border-2  `}
            >
              Completed
            </button>
          </div>
          <div
            onClick={this.props.handleClearCompleted}
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
